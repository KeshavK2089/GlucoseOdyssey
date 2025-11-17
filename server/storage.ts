import type { SimulationResult, ResearchArticle } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  saveSimulation(simulation: SimulationResult): Promise<SimulationResult>;
  getSimulation(id: string): Promise<SimulationResult | undefined>;
  getAllSimulations(): Promise<SimulationResult[]>;
  cacheResearchArticles(articles: ResearchArticle[]): Promise<void>;
  getCachedResearchArticles(): Promise<ResearchArticle[]>;
}

export class MemStorage implements IStorage {
  private simulations: Map<string, SimulationResult>;
  private researchCache: ResearchArticle[];
  private cacheTimestamp: number;

  constructor() {
    this.simulations = new Map();
    this.researchCache = [];
    this.cacheTimestamp = 0;
  }

  async saveSimulation(simulation: SimulationResult): Promise<SimulationResult> {
    this.simulations.set(simulation.id, simulation);
    return simulation;
  }

  async getSimulation(id: string): Promise<SimulationResult | undefined> {
    return this.simulations.get(id);
  }

  async getAllSimulations(): Promise<SimulationResult[]> {
    return Array.from(this.simulations.values());
  }

  async cacheResearchArticles(articles: ResearchArticle[]): Promise<void> {
    this.researchCache = articles;
    this.cacheTimestamp = Date.now();
  }

  async getCachedResearchArticles(): Promise<ResearchArticle[]> {
    const cacheAge = Date.now() - this.cacheTimestamp;
    const maxAge = 1000 * 60 * 30;
    
    if (cacheAge > maxAge) {
      return [];
    }
    
    return this.researchCache;
  }
}

export const storage = new MemStorage();
