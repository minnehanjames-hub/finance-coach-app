import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outputPath = path.join(projectRoot, "data", "economic-indicators.json");

const seriesConfig = [
  {
    id: "CPIAUCSL",
    name: "Consumer Price Index",
    category: "Inflation",
    unit: "index",
    sourceUrl: "https://fred.stlouisfed.org/series/CPIAUCSL",
    interpretation:
      "The CPI tracks consumer prices. A rising CPI means the dollar is buying less than before."
  },
  {
    id: "UNRATE",
    name: "Unemployment Rate",
    category: "Jobs",
    unit: "percent",
    sourceUrl: "https://fred.stlouisfed.org/series/UNRATE",
    interpretation:
      "The unemployment rate shows the share of the labor force that is jobless and actively looking for work."
  },
  {
    id: "FEDFUNDS",
    name: "Federal Funds Rate",
    category: "Rates",
    unit: "percent",
    sourceUrl: "https://fred.stlouisfed.org/series/FEDFUNDS",
    interpretation:
      "The federal funds rate is a key short-term interest rate targeted by the Federal Reserve."
  },
  {
    id: "GS10",
    name: "10-Year Treasury Yield",
    category: "Rates",
    unit: "percent",
    sourceUrl: "https://fred.stlouisfed.org/series/GS10",
    interpretation:
      "The 10-year Treasury yield is a benchmark for long-term rates, mortgages, and valuation assumptions."
  },
  {
    id: "GDPC1",
    name: "Real Gross Domestic Product",
    category: "Growth",
    unit: "billions",
    sourceUrl: "https://fred.stlouisfed.org/series/GDPC1",
    interpretation:
      "Real GDP estimates inflation-adjusted economic output, which helps show whether the economy is expanding."
  },
  {
    id: "MORTGAGE30US",
    name: "30-Year Mortgage Rate",
    category: "Housing",
    unit: "percent",
    sourceUrl: "https://fred.stlouisfed.org/series/MORTGAGE30US",
    interpretation:
      "The 30-year mortgage rate affects monthly housing payments and buyer affordability."
  }
];

async function fetchSeries(config) {
  const url = `https://fred.stlouisfed.org/graph/fredgraph.csv?id=${config.id}`;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      console.log(`Fetching ${config.id} from FRED... attempt ${attempt}`);
      const response = await fetch(url, {
        headers: {
          "user-agent": "finance-coach-app/0.1"
        },
        signal: AbortSignal.timeout(15000)
      });
      if (!response.ok) {
        throw new Error(`FRED request failed for ${config.id}: ${response.status}`);
      }

      const csv = await response.text();
      const observations = parseFredCsv(csv);
      const finite = observations.filter((point) => Number.isFinite(point.value));
      const latest = finite.at(-1);
      const previous = finite.at(-2);

      return {
        ...config,
        latest,
        previous,
        changeFromPrevious: latest && previous ? latest.value - previous.value : 0,
        observations: finite.slice(-60)
      };
    } catch (error) {
      if (attempt === 3) {
        throw error;
      }
      await delay(1000 * attempt);
    }
  }
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function parseFredCsv(csv) {
  const lines = csv.trim().split(/\r?\n/);
  const [, ...rows] = lines;

  return rows
    .map((row) => {
      const [date, rawValue] = row.split(",");
      const value = rawValue === "." || rawValue === "" ? Number.NaN : Number(rawValue);
      return { date, value };
    })
    .filter((point) => point.date);
}

async function main() {
  await mkdir(path.dirname(outputPath), { recursive: true });
  const series = [];
  const errors = [];

  for (const config of seriesConfig) {
    try {
      series.push(await fetchSeries(config));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      errors.push({ id: config.id, message });
      console.warn(`Skipped ${config.id}: ${message}`);
    }
  }

  if (!series.length) {
    throw new Error("No FRED series could be refreshed.");
  }

  const payload = {
    updatedAt: new Date().toISOString(),
    source: "Federal Reserve Economic Data (FRED)",
    sourceUrl: "https://fred.stlouisfed.org/",
    series,
    errors
  };

  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(`Wrote ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
