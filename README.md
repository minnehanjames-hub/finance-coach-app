# Finance Coach App

A personal economics and finance study coach. It starts with beginner topics and progresses into intermediate and advanced concepts. Progress is saved in the browser with `localStorage`.

## What it does now

- Structured lessons from basic economics to harder finance topics
- Quizzes with explanations and weak-spot tracking
- A level system based on completed lessons and quiz performance
- A data lab powered by FRED economic data
- A headline interpreter for practicing economic news analysis
- Scenario simulator for second-order economic reasoning
- Market reaction trainer for stocks, bonds, housing, consumers, and rates
- Data Detective mode that connects real FRED indicators to interpretation questions
- Company analysis mode for practicing margins, debt, valuation, and quality checks
- Paper decision journal saved locally in the browser

## Real data

The app uses Federal Reserve Economic Data (FRED) CSV endpoints for indicators such as CPI, unemployment, the federal funds rate, the 10-year Treasury yield, real GDP, and mortgage rates.

Refresh the local data file:

```bash
npm run refresh:data
```

The generated file is:

```text
data/economic-indicators.json
```

## News data plan

The current News Lab lets you paste real headlines or excerpts and practice interpreting them. Live news feeds usually require API keys, so those should be fetched through a backend or a GitHub Action using repository secrets. Do not put news API keys directly into a public GitHub Pages frontend.

The built-in sample headlines are static practice prompts. They do not fetch live articles yet.

Good future sources:

- NewsAPI for business headlines
- Finnhub for market news
- Official RSS feeds from agencies and publications where licensing allows it

## Run locally

```bash
npm run refresh:data
npm run serve
```

Then open:

```text
http://localhost:5500
```

## GitHub Pages

This repo includes a GitHub Pages workflow. After the repo is pushed to GitHub, enable Pages with GitHub Actions as the source if needed.
