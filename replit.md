# Glucose Odyssey

## Project Overview
Glucose Odyssey is a next-generation interactive diabetes technology platform combining:
- **Interactive Insulin Simulator** - Real-time glucose-insulin dynamics visualization with PID control algorithm
- **AI Research Vault** - Latest diabetes research with AI-powered summaries and insights

## Architecture

### Frontend (React + TypeScript + TailwindCSS)
- **Pages:**
  - Home - Hero section with DNA helix animation and feature overview
  - Simulator - Interactive parameter controls and real-time glucose/insulin visualization
  - Research Vault - AI-curated diabetes research articles with neural network background
  - About - Platform methodology and technology stack documentation

- **Design System:**
  - Futuristic dark-mode-first theme
  - Cyan (primary) for glucose-related elements
  - Purple (secondary) for insulin-related elements
  - Amber (accent) for carbs and highlights
  - Custom animations: DNA helix, pulse rings, glow effects, floating elements

- **Key Components:**
  - Navigation - Glassmorphism header with mobile support
  - DNALoader - Custom DNA double-helix loading animation
  - SimulatorChart - Canvas-based real-time glucose/insulin visualization
  - AlgorithmLog - Terminal-style algorithm activity display

### Backend (Express + TypeScript)
- API endpoints for simulator calculations
- PubMed integration for research article fetching
- OpenAI integration for research summarization
- In-memory storage for simulation results

### Data Models
- SimulatorParameters: weight, carb intake, insulin sensitivity, basal rate, etc.
- SimulationResult: data points, algorithm logs, timestamps
- ResearchArticle: title, authors, abstract, AI summary, "why it matters" insight

## Development

### Running Locally
```bash
npm run dev
```
Starts both backend (Express) and frontend (Vite) on the same port.

### Tech Stack
- **Frontend:** React, TypeScript, TailwindCSS, Wouter (routing), TanStack Query
- **Backend:** Express, TypeScript, OpenAI (via Replit AI Integrations), PubMed API
- **Design:** Shadcn UI components, custom Canvas visualizations
- **Animations:** CSS animations, SVG graphics, Canvas rendering

## GitHub Pages Deployment

The project is configured for GitHub Pages deployment with:
- Static build output via Vite
- Mock data fallback for research articles
- Fully client-side simulator functionality
- No server-side dependencies in production build

### Build Configuration
```bash
npm run build
```
Generates static files in `dist/` directory ready for GitHub Pages.

### Deployment Steps
1. Build the project: `npm run build`
2. Push to GitHub repository
3. Configure GitHub Pages to use `main` branch `/dist` folder
4. Site will be available at `https://<username>.github.io/<repo-name>`

## Features

### Insulin Simulator
- Adjustable parameters (weight, carb intake, insulin sensitivity, basal rate)
- Real-time glucose-insulin dynamics visualization
- PID control algorithm simulation
- Scenario testing (meals, exercise, stress, missed bolus)
- Algorithm activity log with timestamps
- Export functionality for charts and data

### AI Research Vault
- Latest diabetes research from PubMed
- AI-generated summaries and impact statements
- Topic filtering (AID Systems, CGM, Insulin Pumps, Type 1/2, Clinical Trials)
- Search functionality across titles and abstracts
- Expandable article cards with full abstracts
- Neural network background animation

## Important Notes

### Educational Purpose Only
This simulator is designed for educational purposes and should never be used for actual medical decision-making or insulin dosing. Always consult with qualified healthcare professionals for diabetes management.

### Limitations
- Simplified glucose-insulin model (based on Bergman minimal model)
- AI summaries may not capture all research nuances
- Always refer to original publications for complete information

## Recent Changes
- **2024-11-17:** Initial implementation with complete MVP features
  - All pages implemented with futuristic dark theme
  - Custom Canvas-based chart visualization
  - Full simulator with parameter controls
  - Research vault with mock data and filtering
  - GitHub Pages deployment configuration

## User Preferences
- Dark mode by default (futuristic medical aesthetic)
- Cyan/purple/amber color scheme for glucose/insulin/carbs
- Space Grotesk for display headings
- JetBrains Mono for data values and code
- Inter for body text
