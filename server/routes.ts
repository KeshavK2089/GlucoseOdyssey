import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { runGlucoseInsulinSimulation } from "./simulator";
import { fetchPubMedArticles } from "./pubmed";
import { simulatorParametersSchema, scenarioSchema, researchFilterSchema } from "@shared/schema";
import { randomUUID } from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/simulate", async (req, res) => {
    try {
      const parameters = simulatorParametersSchema.parse(req.body.parameters);
      const scenario = scenarioSchema.parse(req.body.scenario);
      
      const { dataPoints, logs } = runGlucoseInsulinSimulation(
        parameters,
        scenario,
        240
      );
      
      const simulationResult = {
        id: randomUUID(),
        parameters,
        scenario,
        dataPoints,
        algorithmLogs: logs,
        createdAt: new Date().toISOString(),
      };
      
      await storage.saveSimulation(simulationResult);
      
      res.json(simulationResult);
    } catch (error: any) {
      console.error("Simulation error:", error);
      res.status(400).json({ 
        error: "Failed to run simulation",
        details: error.message 
      });
    }
  });

  app.get("/api/research", async (req, res) => {
    try {
      const query = (req.query.query as string) || "diabetes automated insulin delivery";
      const maxResults = parseInt(req.query.maxResults as string) || 10;
      
      const cachedArticles = await storage.getCachedResearchArticles();
      
      if (cachedArticles.length > 0) {
        console.log("Returning cached research articles");
        return res.json(cachedArticles);
      }
      
      console.log("Fetching fresh research articles from PubMed...");
      const articles = await fetchPubMedArticles(query, maxResults);
      
      if (articles.length > 0) {
        await storage.cacheResearchArticles(articles);
      }
      
      res.json(articles);
    } catch (error: any) {
      console.error("Research fetch error:", error);
      res.status(500).json({ 
        error: "Failed to fetch research articles",
        details: error.message 
      });
    }
  });

  app.get("/api/simulations", async (req, res) => {
    try {
      const simulations = await storage.getAllSimulations();
      res.json(simulations);
    } catch (error: any) {
      res.status(500).json({ 
        error: "Failed to fetch simulations",
        details: error.message 
      });
    }
  });

  app.get("/api/simulations/:id", async (req, res) => {
    try {
      const simulation = await storage.getSimulation(req.params.id);
      
      if (!simulation) {
        return res.status(404).json({ error: "Simulation not found" });
      }
      
      res.json(simulation);
    } catch (error: any) {
      res.status(500).json({ 
        error: "Failed to fetch simulation",
        details: error.message 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
