export const scenarioSimulations = [
  {
    id: "stagflation-lite",
    title: "Inflation rises while growth slows",
    difficulty: "Advanced",
    setup:
      "CPI is rising faster than expected, unemployment is drifting higher, and real GDP growth is slowing.",
    prompt: "What is the strongest first interpretation?",
    options: [
      "The economy may be facing a difficult mix: inflation pressure plus softer growth.",
      "This is always bullish for every stock because inflation is high.",
      "The Fed can ignore inflation because unemployment moved higher.",
      "Mortgage rates must immediately fall to zero."
    ],
    answer: 0,
    explanation:
      "Higher inflation with weaker growth creates a policy tradeoff. The central bank may want to cool inflation, but higher rates could also pressure jobs and output.",
    focus: ["inflation", "growth", "jobs", "monetary policy"],
    nextQuestion: "Which indicator would you check next: core inflation, payrolls, real GDP, or credit stress?"
  },
  {
    id: "rate-cut-mortgage-lag",
    title: "Fed cuts, mortgage rates stay high",
    difficulty: "Intermediate",
    setup:
      "The Federal Reserve cuts its short-term policy rate, but the 30-year mortgage rate barely moves.",
    prompt: "Why can that happen?",
    options: [
      "Mortgage rates are influenced by long-term yields and risk premiums, not only the Fed's short-term rate.",
      "Mortgage rates are legally required to match the Fed funds rate.",
      "Housing demand no longer responds to interest rates.",
      "This proves bond markets do not exist."
    ],
    answer: 0,
    explanation:
      "The Fed controls a short-term rate. Mortgage rates often track longer-term Treasury yields plus spreads, so expectations and risk premiums matter.",
    focus: ["interest rate", "bond", "housing", "yield"],
    nextQuestion: "Would you check the 10-year Treasury yield, inflation expectations, or lender spreads?"
  },
  {
    id: "consumer-squeeze",
    title: "GDP grows, consumers feel worse",
    difficulty: "Intermediate",
    setup:
      "Real GDP is positive, but consumer sentiment is weak and credit card delinquencies are rising.",
    prompt: "What is the best interpretation?",
    options: [
      "Aggregate growth can hide pressure on households if costs, debt, or income distribution are worsening.",
      "GDP growth means every household is doing well.",
      "Consumer sentiment is never useful.",
      "Credit stress only matters for banks outside the economy."
    ],
    answer: 0,
    explanation:
      "GDP is broad output. Household stress can still rise if debt costs increase, real wages lag, or gains are uneven.",
    focus: ["GDP", "consumer", "credit", "debt"],
    nextQuestion: "Which would you compare: real wage growth, delinquencies, savings rate, or job growth?"
  },
  {
    id: "revenue-margin-squeeze",
    title: "Revenue grows but profit falls",
    difficulty: "Intermediate",
    setup:
      "A company reports higher revenue, but operating profit and cash flow both fall.",
    prompt: "What might be happening?",
    options: [
      "Costs may be rising faster than sales, margins may be shrinking, or growth may require heavy spending.",
      "Higher revenue always means a better business.",
      "Cash flow does not matter if revenue rises.",
      "Profit can only fall when customers disappear."
    ],
    answer: 0,
    explanation:
      "Revenue is only the top line. Margins, working capital, investment needs, and cash conversion determine whether growth is high quality.",
    focus: ["revenue", "profit", "cash flow", "margin"],
    nextQuestion: "Would you inspect gross margin, operating margin, free cash flow, or inventory?"
  }
];

export const marketReactionDrills = [
  {
    id: "hot-cpi",
    event: "Inflation comes in hotter than expected.",
    bestRead:
      "Markets may expect tighter policy or fewer rate cuts. Bonds can sell off, yields can rise, and rate-sensitive stocks may feel pressure.",
    impacts: [
      ["Stocks", "Often pressured if higher rates reduce valuations."],
      ["Bonds", "Existing bond prices may fall as yields rise."],
      ["Housing", "Affordability may worsen if mortgage rates rise."],
      ["Savers", "Cash yields may stay attractive for longer."]
    ],
    quiz: {
      question: "Which reaction is most likely in the first pass?",
      options: [
        "Long-term yields rise because investors expect higher inflation or tighter policy.",
        "Bond prices rise automatically because inflation is high.",
        "Mortgage affordability improves immediately.",
        "The event has no connection to interest rates."
      ],
      answer: 0
    },
    focus: ["inflation", "yield", "valuation"]
  },
  {
    id: "weak-payrolls",
    event: "Payroll growth is much weaker than expected and unemployment rises.",
    bestRead:
      "Markets may price slower growth and easier future policy. Defensive assets can look more attractive, but recession fears may pressure stocks.",
    impacts: [
      ["Stocks", "Mixed: lower rates can help valuations, but weaker earnings risk can hurt."],
      ["Bonds", "Yields may fall if investors expect rate cuts."],
      ["Consumers", "Confidence and spending may weaken if job risk rises."],
      ["Banks", "Credit risk can matter more if unemployment keeps rising."]
    ],
    quiz: {
      question: "What is the key tension?",
      options: [
        "Lower rate expectations can help markets, but weaker growth can hurt earnings.",
        "Weak jobs data always guarantees stock gains.",
        "Unemployment has no effect on consumers.",
        "Bond yields cannot move after a jobs report."
      ],
      answer: 0
    },
    focus: ["jobs", "growth", "rates"]
  },
  {
    id: "fed-surprise-hike",
    event: "The Fed raises rates when investors expected no change.",
    bestRead:
      "A surprise hike usually tightens financial conditions. It can pressure stocks and bonds while supporting cash yields.",
    impacts: [
      ["Stocks", "Often pressured by higher discount rates."],
      ["Bonds", "Prices may fall as yields adjust upward."],
      ["Dollar", "Can strengthen if relative rates rise."],
      ["Borrowers", "Debt service can become more expensive."]
    ],
    quiz: {
      question: "Why do surprises matter?",
      options: [
        "Markets price expectations, so unexpected policy changes force repricing.",
        "Only announced facts matter, never expectations.",
        "Rate hikes are always ignored by borrowers.",
        "Fed decisions only affect one company."
      ],
      answer: 0
    },
    focus: ["Federal Reserve", "expectations", "interest rate"]
  }
];

export const dataDetectiveChallenges = [
  {
    id: "inflation-rates-chain",
    title: "Inflation to rates chain",
    indicators: ["CPIAUCSL", "FEDFUNDS", "GS10", "MORTGAGE30US"],
    question:
      "If CPI keeps rising faster than expected, which chain of effects should you watch first?",
    options: [
      "Fed expectations, Treasury yields, mortgage rates, and rate-sensitive assets.",
      "Only company logos and marketing spend.",
      "GDP only, because rates never matter.",
      "Nothing, because inflation is separate from borrowing costs."
    ],
    answer: 0,
    explanation:
      "Inflation can shift rate expectations. Those expectations can move yields, borrowing costs, housing demand, and valuations.",
    focus: ["inflation", "interest rate", "housing"]
  },
  {
    id: "jobs-spending-chain",
    title: "Jobs to spending chain",
    indicators: ["UNRATE", "GDPC1"],
    question:
      "If unemployment rises for several months, what should you check next?",
    options: [
      "Consumer spending, wage growth, credit stress, and business hiring plans.",
      "Only whether CPI has the same exact number.",
      "A single stock ticker with no context.",
      "Nothing, because jobs do not influence spending."
    ],
    answer: 0,
    explanation:
      "A weakening labor market can affect household income, confidence, spending, defaults, and business revenue.",
    focus: ["jobs", "consumer", "credit"]
  },
  {
    id: "growth-quality",
    title: "Quality of growth",
    indicators: ["GDPC1", "UNRATE", "CPIAUCSL"],
    question:
      "Real GDP is growing. What tells you whether growth is healthy?",
    options: [
      "Whether growth is paired with stable inflation, solid jobs, and manageable credit stress.",
      "Only whether nominal prices are higher.",
      "Whether one headline sounds optimistic.",
      "Nothing else; GDP alone answers everything."
    ],
    answer: 0,
    explanation:
      "GDP is useful but incomplete. Healthy growth usually needs context from inflation, employment, income, productivity, and credit conditions.",
    focus: ["GDP", "inflation", "jobs"]
  }
];

export const sampleNewsBreakdowns = [
  {
    headline: "Fed holds rates steady as inflation remains above target",
    excerpt:
      "Officials signaled they want more evidence that price growth is moving lower before cutting rates.",
    focus: "Rates and inflation expectations"
  },
  {
    headline: "Job growth slows while unemployment edges higher",
    excerpt:
      "Payroll gains missed expectations and wage growth cooled from the prior month.",
    focus: "Labor market and consumer spending"
  },
  {
    headline: "Company reports higher sales but lower margins",
    excerpt:
      "Management cited input costs, discounting, and heavier investment spending.",
    focus: "Business quality and profit margins"
  }
];
