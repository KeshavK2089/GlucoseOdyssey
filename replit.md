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
  - Professional medical aesthetic inspired by Insulet.com
  - Light mode only with purple/navy color palette (#5941A9, #7F56D9, #2F3A60)
  - Typography: Source Serif (headings) + Inter (body text)
  - Clean, clinical design with subtle fade animations
  - Professional medical photography and lifestyle imagery

- **Key Components:**
  - Navigation - Clean header with mobile support
  - LoadingSpinner - Professional loading indicator  
  - SimulatorChart - Canvas-based glucose/insulin visualization with clinical colors
  - AlgorithmLog - Professional algorithm activity log display

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
- **2024-11-18:** GitHub Pages deployment optimization
  - Converted simulator to run entirely client-side (works on static hosting)
  - Added vite.config.github.ts with correct base path for GitHub Pages
  - Simulator now runs in browser without backend API calls (405 errors fixed)
  - Added fancy CGM logo and creator attribution to About page
  - Ready for deployment at https://KeshavK2089.github.io/GlucoseOdyssey/

- **2024-11-17:** Professional redesign and critical bug fixes
  - Transformed to Insulet-inspired professional medical design (purple/navy palette, Source Serif typography)
  - Removed dark mode entirely - light mode only
  - Fixed critical apiRequest bug: now returns parsed JSON instead of raw Response (was causing empty data {})
  - Added robust empty/undefined data handling in AlgorithmLog and SimulatorChart
  - Verified via e2e testing: Research displays 10 articles, Simulator shows chart + 11 algorithm logs
  - All components follow professional medical aesthetic with subtle animations

## User Preferences
- Light mode only - professional medical aesthetic
- Purple/navy color scheme (#5941A9, #7F56D9, #2F3A60)
- Source Serif for headings
- Inter for body text
- Clean, clinical design inspired by Insulet.com
- Subtle fade animations (no futuristic effects)
