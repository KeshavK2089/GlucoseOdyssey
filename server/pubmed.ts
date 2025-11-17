import { summarizeResearchArticle } from "./openai";
import type { ResearchArticle } from "@shared/schema";

interface PubMedArticle {
  pmid: string;
  title: string;
  authors: string[];
  abstract: string;
  pubdate: string;
  source: string;
}

export async function fetchPubMedArticles(
  query: string = "diabetes automated insulin delivery",
  maxResults: number = 10
): Promise<ResearchArticle[]> {
  try {
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retmax=${maxResults}&retmode=json&sort=date`;
    
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    
    const pmids = searchData.esearchresult?.idlist || [];
    
    if (pmids.length === 0) {
      return [];
    }

    const fetchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${pmids.join(',')}&retmode=xml`;
    
    const fetchResponse = await fetch(fetchUrl);
    const xmlText = await fetchResponse.text();
    
    const articles = parsePubMedXML(xmlText);
    
    const enrichedArticles = await Promise.all(
      articles.map(async (article) => {
        const aiSummary = await summarizeResearchArticle(article.title, article.abstract);
        
        return {
          id: article.pmid,
          title: article.title,
          authors: article.authors,
          source: article.source,
          pubDate: article.pubdate,
          abstract: article.abstract,
          summary: aiSummary.summary,
          whyItMatters: aiSummary.whyItMatters,
          url: `https://pubmed.ncbi.nlm.nih.gov/${article.pmid}/`,
          topics: extractTopics(article.title + " " + article.abstract),
        };
      })
    );
    
    return enrichedArticles;
  } catch (error) {
    console.error("Error fetching PubMed articles:", error);
    return [];
  }
}

function parsePubMedXML(xml: string): PubMedArticle[] {
  const articles: PubMedArticle[] = [];
  
  const articleMatches = xml.matchAll(/<PubmedArticle>([\s\S]*?)<\/PubmedArticle>/g);
  
  for (const match of articleMatches) {
    const articleXml = match[1];
    
    const pmidMatch = articleXml.match(/<PMID[^>]*>(\d+)<\/PMID>/);
    const pmid = pmidMatch ? pmidMatch[1] : '';
    
    const titleMatch = articleXml.match(/<ArticleTitle>(.*?)<\/ArticleTitle>/s);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'Untitled';
    
    const abstractMatch = articleXml.match(/<AbstractText[^>]*>(.*?)<\/AbstractText>/s);
    const abstract = abstractMatch ? abstractMatch[1].replace(/<[^>]+>/g, '').trim() : 'Abstract not available';
    
    const authorMatches = articleXml.matchAll(/<Author[^>]*>[\s\S]*?<LastName>(.*?)<\/LastName>[\s\S]*?<\/Author>/g);
    const authors = Array.from(authorMatches).map(m => m[1]).slice(0, 5);
    
    const dateMatch = articleXml.match(/<PubDate>[\s\S]*?<Year>(\d{4})<\/Year>[\s\S]*?<Month>(\w+)<\/Month>/);
    const pubdate = dateMatch ? `${dateMatch[1]}-${monthToNumber(dateMatch[2])}-01` : new Date().toISOString().split('T')[0];
    
    const sourceMatch = articleXml.match(/<Title>(.*?)<\/Title>/);
    const source = sourceMatch ? sourceMatch[1].trim() : 'Unknown Journal';
    
    articles.push({
      pmid,
      title,
      authors,
      abstract,
      pubdate,
      source,
    });
  }
  
  return articles;
}

function monthToNumber(month: string): string {
  const months: { [key: string]: string } = {
    'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
    'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
    'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
  };
  return months[month] || '01';
}

function extractTopics(text: string): string[] {
  const topics: string[] = [];
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('closed-loop') || lowerText.includes('automated insulin') || lowerText.includes('aid')) {
    topics.push('AID Systems');
  }
  if (lowerText.includes('cgm') || lowerText.includes('continuous glucose')) {
    topics.push('CGM');
  }
  if (lowerText.includes('pump') || lowerText.includes('insulin pump')) {
    topics.push('Insulin Pumps');
  }
  if (lowerText.includes('type 1')) {
    topics.push('Type 1');
  }
  if (lowerText.includes('type 2')) {
    topics.push('Type 2');
  }
  if (lowerText.includes('trial') || lowerText.includes('rct') || lowerText.includes('randomized')) {
    topics.push('Clinical Trials');
  }
  
  return topics.length > 0 ? topics : ['General'];
}
