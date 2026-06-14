export const curriculum = [
  {
    id: "scarcity-incentives",
    level: "Beginner",
    title: "Scarcity, Incentives, and Tradeoffs",
    minutes: 10,
    concept:
      "Economics starts with scarcity: people have unlimited wants, but time, money, labor, and resources are limited. Because resources are limited, every choice has a tradeoff.",
    why:
      "Once you can spot tradeoffs, news about prices, jobs, taxes, debt, and business decisions becomes easier to understand. Most economic arguments are really arguments about incentives and opportunity cost.",
    example:
      "If you spend $100 on shoes, you cannot also invest that same $100 or use it for gas. The opportunity cost is the best alternative you gave up.",
    terms: ["scarcity", "incentives", "tradeoffs", "opportunity cost"],
    quiz: [
      {
        question: "What does scarcity mean in economics?",
        options: [
          "Resources are limited compared with people's wants.",
          "Prices always rise over time.",
          "Only poor countries face economic choices.",
          "Money is the only resource that matters."
        ],
        answer: 0,
        explanation:
          "Scarcity means limited resources force choices. It applies to people, businesses, and governments.",
        tags: ["scarcity", "tradeoffs"]
      },
      {
        question: "The opportunity cost of a choice is:",
        options: [
          "The sticker price of the item.",
          "The best alternative you give up.",
          "Any choice that makes money.",
          "A cost only businesses have."
        ],
        answer: 1,
        explanation:
          "Opportunity cost is the value of the best alternative you did not choose.",
        tags: ["opportunity cost"]
      }
    ]
  },
  {
    id: "supply-demand",
    level: "Beginner",
    title: "Supply and Demand",
    minutes: 12,
    concept:
      "Demand is how much buyers want at different prices. Supply is how much sellers are willing to offer at different prices. Prices move toward the point where buyers and sellers agree.",
    why:
      "Supply and demand explain everyday price changes: rent, gas, wages, concert tickets, stocks, and even used cars.",
    example:
      "If a storm damages orange crops, the supply of oranges falls. If demand stays the same, orange prices usually rise.",
    terms: ["demand", "supply", "equilibrium", "shortage", "surplus"],
    quiz: [
      {
        question: "If supply falls and demand stays the same, price will usually:",
        options: ["Fall", "Rise", "Stay fixed forever", "Become meaningless"],
        answer: 1,
        explanation:
          "Less supply with the same demand usually pushes prices higher.",
        tags: ["supply", "demand"]
      },
      {
        question: "A shortage happens when:",
        options: [
          "Quantity demanded is greater than quantity supplied at the current price.",
          "Quantity supplied is greater than quantity demanded.",
          "No one wants the product.",
          "The government reports GDP."
        ],
        answer: 0,
        explanation:
          "A shortage means buyers want more than sellers are offering at the current price.",
        tags: ["shortage", "equilibrium"]
      }
    ]
  },
  {
    id: "inflation",
    level: "Beginner",
    title: "Inflation and Purchasing Power",
    minutes: 12,
    concept:
      "Inflation is a broad rise in prices across the economy. When inflation is high, each dollar buys less than it did before.",
    why:
      "Inflation affects groceries, rent, wages, savings, interest rates, and investment returns. It is one of the most important topics in economic news.",
    example:
      "If your savings earn 2% interest but prices rise 5%, your money grew in dollars but lost purchasing power.",
    terms: ["inflation", "purchasing power", "CPI", "real return"],
    quiz: [
      {
        question: "If inflation is 5% and your savings earn 2%, your real return is roughly:",
        options: ["7%", "5%", "-3%", "2%"],
        answer: 2,
        explanation:
          "A rough real return is nominal return minus inflation, so 2% - 5% = -3%.",
        tags: ["inflation", "real return"]
      },
      {
        question: "The CPI is commonly used to measure:",
        options: ["Stock prices", "Consumer price changes", "Company profit", "Bond default risk"],
        answer: 1,
        explanation:
          "The Consumer Price Index tracks price changes for a basket of consumer goods and services.",
        tags: ["CPI", "inflation"]
      }
    ]
  },
  {
    id: "interest-rates",
    level: "Beginner",
    title: "Interest Rates",
    minutes: 12,
    concept:
      "An interest rate is the price of borrowing money and the reward for lending or saving money. Rates connect today's money with future money.",
    why:
      "Interest rates influence credit cards, mortgages, car loans, savings accounts, business investment, bonds, and stock valuations.",
    example:
      "When mortgage rates rise, monthly payments become more expensive, so some buyers can afford less house.",
    terms: ["interest rate", "principal", "borrower", "lender", "compound interest"],
    quiz: [
      {
        question: "Higher interest rates usually make borrowing:",
        options: ["Cheaper", "More expensive", "Illegal", "Unrelated to monthly payments"],
        answer: 1,
        explanation:
          "Higher rates increase the cost of borrowing and usually raise loan payments.",
        tags: ["interest rate", "borrowing"]
      },
      {
        question: "Compound interest means:",
        options: [
          "You earn interest on both your original money and past interest.",
          "Interest rates never change.",
          "Borrowing has no cost.",
          "Only banks can invest."
        ],
        answer: 0,
        explanation:
          "Compounding happens when interest earns more interest over time.",
        tags: ["compound interest"]
      }
    ]
  },
  {
    id: "personal-finance-basics",
    level: "Beginner",
    title: "Personal Finance Foundations",
    minutes: 14,
    concept:
      "Personal finance is about using income, spending, saving, borrowing, and investing in a way that improves your long-term options.",
    why:
      "Strong personal finance habits make future choices easier. Cash flow, emergency savings, and debt management are the base layer before more advanced investing.",
    example:
      "A person with high-interest credit card debt usually benefits more from paying that down than from chasing risky investments.",
    terms: ["cash flow", "emergency fund", "debt", "net worth", "budget"],
    quiz: [
      {
        question: "Net worth is calculated as:",
        options: ["Income minus taxes", "Assets minus liabilities", "Spending plus savings", "Debt divided by income"],
        answer: 1,
        explanation:
          "Net worth equals what you own minus what you owe.",
        tags: ["net worth", "debt"]
      },
      {
        question: "Why is high-interest debt usually dangerous?",
        options: [
          "It can compound against you quickly.",
          "It always improves credit scores.",
          "It has no effect on future choices.",
          "It only matters for businesses."
        ],
        answer: 0,
        explanation:
          "High-interest balances can grow fast and crowd out saving or investing.",
        tags: ["debt", "compound interest"]
      }
    ]
  },
  {
    id: "gdp-growth",
    level: "Intermediate",
    title: "GDP and Economic Growth",
    minutes: 14,
    concept:
      "Gross Domestic Product measures the value of final goods and services produced in an economy over a period of time. Real GDP adjusts for inflation.",
    why:
      "GDP helps people understand whether the economy is expanding or contracting, but it does not measure everything that matters.",
    example:
      "If nominal GDP rises because prices rose, real GDP may show less growth after adjusting for inflation.",
    terms: ["GDP", "real GDP", "nominal GDP", "productivity", "recession"],
    quiz: [
      {
        question: "Real GDP differs from nominal GDP because real GDP:",
        options: [
          "Adjusts for inflation.",
          "Only counts stock prices.",
          "Excludes consumer spending.",
          "Measures government debt."
        ],
        answer: 0,
        explanation:
          "Real GDP removes the effect of price changes to better measure actual output.",
        tags: ["GDP", "inflation"]
      },
      {
        question: "Long-term economic growth is strongly connected to:",
        options: ["Productivity", "Lottery winnings", "Daily stock moves", "One company's ad campaign"],
        answer: 0,
        explanation:
          "Productivity growth lets an economy produce more with its resources.",
        tags: ["GDP", "productivity"]
      }
    ]
  },
  {
    id: "labor-market",
    level: "Intermediate",
    title: "Jobs and the Labor Market",
    minutes: 14,
    concept:
      "The labor market connects workers and employers. Unemployment, wages, job openings, and labor-force participation all show different parts of the jobs picture.",
    why:
      "Jobs data can affect consumer spending, inflation expectations, interest rates, and market reactions.",
    example:
      "A low unemployment rate may signal strength, but if wage growth is very high, investors may wonder whether inflation pressure will continue.",
    terms: ["unemployment", "labor force", "wages", "participation rate"],
    quiz: [
      {
        question: "The unemployment rate counts people who are:",
        options: [
          "Not working and actively looking for work.",
          "Retired and not looking for work.",
          "Children under 16.",
          "Anyone without a high salary."
        ],
        answer: 0,
        explanation:
          "The unemployment rate focuses on people in the labor force who are jobless and actively looking.",
        tags: ["unemployment", "labor force"]
      },
      {
        question: "Strong wage growth can be good for workers but may also affect:",
        options: ["Inflation pressure", "The definition of GDP", "Whether bonds exist", "The number of shares a company has"],
        answer: 0,
        explanation:
          "Fast wage growth can support spending and may contribute to inflation pressure if productivity does not keep up.",
        tags: ["wages", "inflation"]
      }
    ]
  },
  {
    id: "stocks-business-ownership",
    level: "Intermediate",
    title: "Stocks and Business Ownership",
    minutes: 15,
    concept:
      "A stock represents ownership in a company. Stock investors care about future cash flows, growth, risk, competition, and the price paid for ownership.",
    why:
      "Stocks are not just ticker symbols. They are claims on businesses, and business quality does not automatically make any price a good deal.",
    example:
      "A great company can still be a poor investment if the stock price already assumes nearly perfect future results.",
    terms: ["stock", "shareholder", "earnings", "valuation", "dividend"],
    quiz: [
      {
        question: "A share of stock represents:",
        options: ["A loan to the company", "Ownership in the company", "A guaranteed return", "A government bond"],
        answer: 1,
        explanation:
          "Common stock is an ownership claim on a business.",
        tags: ["stock", "shareholder"]
      },
      {
        question: "Why can a strong company still be an expensive investment?",
        options: [
          "The price may already reflect very optimistic expectations.",
          "Strong companies cannot sell products.",
          "Stock prices never respond to expectations.",
          "Earnings do not matter."
        ],
        answer: 0,
        explanation:
          "Investment returns depend on both business results and the price paid.",
        tags: ["valuation", "earnings"]
      }
    ]
  },
  {
    id: "bonds-yields",
    level: "Intermediate",
    title: "Bonds, Yields, and Prices",
    minutes: 15,
    concept:
      "A bond is a loan. The borrower promises interest payments and repayment of principal. Bond prices and yields usually move in opposite directions.",
    why:
      "Bond yields influence mortgage rates, government borrowing costs, portfolio returns, and stock valuations.",
    example:
      "If new bonds offer higher interest rates, older bonds with lower coupons become less attractive, so their prices often fall.",
    terms: ["bond", "yield", "coupon", "principal", "duration"],
    quiz: [
      {
        question: "When market interest rates rise, prices of existing bonds usually:",
        options: ["Rise", "Fall", "Never change", "Turn into stocks"],
        answer: 1,
        explanation:
          "Existing lower-rate bonds become less attractive when new bonds pay higher rates.",
        tags: ["bond", "yield"]
      },
      {
        question: "A bond's yield is best described as:",
        options: ["A measure of expected return based on price and payments", "Company ownership", "A stock dividend", "A tax form"],
        answer: 0,
        explanation:
          "Yield connects the bond's price with the income and repayment an investor expects.",
        tags: ["yield", "bond"]
      }
    ]
  },
  {
    id: "financial-statements",
    level: "Intermediate",
    title: "Financial Statements",
    minutes: 16,
    concept:
      "The income statement, balance sheet, and cash flow statement show different views of a business: profit, financial position, and cash movement.",
    why:
      "Financial statements help you separate a company's story from its actual economics.",
    example:
      "A company can report accounting profit while still burning cash if customers have not paid yet or inventory is piling up.",
    terms: ["revenue", "profit", "assets", "liabilities", "cash flow"],
    quiz: [
      {
        question: "Revenue is:",
        options: ["Total sales before expenses", "Profit after all expenses", "Debt owed by a company", "Cash in a savings account only"],
        answer: 0,
        explanation:
          "Revenue is the top-line amount a company earns from selling goods or services before expenses.",
        tags: ["revenue", "profit"]
      },
      {
        question: "The balance sheet shows:",
        options: [
          "Assets, liabilities, and equity at a point in time.",
          "Only daily stock price moves.",
          "Only next year's GDP.",
          "A list of every customer."
        ],
        answer: 0,
        explanation:
          "A balance sheet is a snapshot of what a company owns, owes, and what remains for owners.",
        tags: ["assets", "liabilities"]
      }
    ]
  },
  {
    id: "central-banks",
    level: "Advanced",
    title: "Central Banks and Monetary Policy",
    minutes: 16,
    concept:
      "Central banks influence short-term interest rates and financial conditions. In the United States, the Federal Reserve aims for maximum employment and stable prices.",
    why:
      "Monetary policy affects borrowing costs, inflation expectations, currency values, and asset prices.",
    example:
      "If inflation is above target, the Fed may keep rates higher to slow demand and reduce price pressure.",
    terms: ["Federal Reserve", "monetary policy", "federal funds rate", "stable prices"],
    quiz: [
      {
        question: "The Federal Reserve's policy rate most directly influences:",
        options: ["Short-term interest rates", "The number of shares a company has", "A company's logo", "The legal age to work"],
        answer: 0,
        explanation:
          "The federal funds rate is a short-term rate that affects broader financial conditions.",
        tags: ["Federal Reserve", "interest rate"]
      },
      {
        question: "If inflation is too high, tighter monetary policy tries to:",
        options: ["Slow demand", "Guarantee stock gains", "Eliminate all taxes", "Increase scarcity"],
        answer: 0,
        explanation:
          "Higher rates can reduce borrowing and spending, which may reduce inflation pressure.",
        tags: ["monetary policy", "inflation"]
      }
    ]
  },
  {
    id: "recession-signals",
    level: "Advanced",
    title: "Recession Signals",
    minutes: 16,
    concept:
      "A recession is a broad decline in economic activity. No single indicator proves one is coming, so economists watch a dashboard of signals.",
    why:
      "Recession fears affect hiring, consumer confidence, credit markets, business investment, and investor behavior.",
    example:
      "Rising unemployment, falling real income, weak industrial production, and tighter credit together can signal stress.",
    terms: ["recession", "yield curve", "credit spreads", "real income", "consumer confidence"],
    quiz: [
      {
        question: "Why should you avoid relying on one recession indicator?",
        options: [
          "The economy is complex, and indicators can give false signals.",
          "All data is fake.",
          "Only stock prices matter.",
          "GDP is updated every minute."
        ],
        answer: 0,
        explanation:
          "Economic indicators are useful but imperfect, so a dashboard is stronger than a single signal.",
        tags: ["recession", "indicators"]
      },
      {
        question: "A yield curve inversion is often discussed because it may signal:",
        options: ["Expectations of slower future growth", "Guaranteed inflation of 0%", "A company stock split", "That jobs data no longer matters"],
        answer: 0,
        explanation:
          "An inverted yield curve can reflect expectations that future rates and growth may be lower.",
        tags: ["yield curve", "recession"]
      }
    ]
  },
  {
    id: "valuation-risk",
    level: "Advanced",
    title: "Valuation, Risk, and Diversification",
    minutes: 17,
    concept:
      "Valuation is the price paid relative to expected future results. Risk includes the chance of permanent loss, bad timing, poor assumptions, and concentration.",
    why:
      "Good investing is not just finding exciting assets. It is balancing potential return, uncertainty, time horizon, and the risk of being wrong.",
    example:
      "Diversification can reduce the damage from one bad investment, but it cannot remove all market risk.",
    terms: ["valuation", "risk", "diversification", "margin of safety", "time horizon"],
    quiz: [
      {
        question: "Diversification mainly helps by:",
        options: [
          "Reducing dependence on any single investment.",
          "Guaranteeing no losses.",
          "Making every investment cheap.",
          "Replacing the need to understand risk."
        ],
        answer: 0,
        explanation:
          "Diversification spreads exposure so one mistake is less likely to dominate the whole portfolio.",
        tags: ["diversification", "risk"]
      },
      {
        question: "A margin of safety means:",
        options: [
          "Leaving room for your assumptions to be wrong.",
          "Buying only the most popular stock.",
          "Ignoring valuation.",
          "Avoiding all uncertainty."
        ],
        answer: 0,
        explanation:
          "A margin of safety gives you some protection if the future is worse than expected.",
        tags: ["margin of safety", "valuation"]
      }
    ]
  },
  {
    id: "news-interpretation",
    level: "Advanced",
    title: "Reading Economic News",
    minutes: 18,
    concept:
      "Good news reading separates what happened, why it matters, what data supports it, and what could change the conclusion.",
    why:
      "Markets react not only to facts but also to expectations. A report can be good in absolute terms but bad compared with what investors expected.",
    example:
      "If inflation falls from 4% to 3.4% but investors expected 3.1%, markets may still react negatively.",
    terms: ["expectations", "consensus", "surprise", "indicator", "narrative"],
    quiz: [
      {
        question: "Why can markets fall after a report that looks good?",
        options: [
          "The report may be worse than expectations.",
          "Markets never use data.",
          "Good reports are illegal.",
          "Only company logos matter."
        ],
        answer: 0,
        explanation:
          "Markets often move based on the difference between actual results and expectations.",
        tags: ["expectations", "surprise"]
      },
      {
        question: "A strong way to read a headline is to ask:",
        options: [
          "What happened, what changed, and which data supports it?",
          "How can I react before understanding it?",
          "Which opinion is loudest?",
          "Can I ignore the source?"
        ],
        answer: 0,
        explanation:
          "Good interpretation starts with facts, change, evidence, and uncertainty.",
        tags: ["indicator", "narrative"]
      }
    ]
  }
];

export const headlineRules = [
  {
    term: "inflation",
    keywords: ["inflation", "cpi", "prices", "price growth", "core inflation", "pce"],
    meaning:
      "The story may affect purchasing power, interest-rate expectations, and consumer spending.",
    questions: [
      "Is inflation rising or falling compared with the previous period?",
      "Was the report above or below expectations?",
      "Is the change broad or concentrated in one category?"
    ],
    indicators: ["CPI", "PCE inflation", "Federal funds rate"]
  },
  {
    term: "interest rates",
    keywords: ["rates", "fed", "federal reserve", "rate cut", "rate hike", "treasury yield"],
    meaning:
      "The story may affect borrowing costs, bond prices, stock valuations, and housing demand.",
    questions: [
      "Is policy becoming tighter or easier?",
      "Are long-term yields moving with short-term rates?",
      "What does this imply for borrowers and savers?"
    ],
    indicators: ["Federal funds rate", "10-year Treasury yield", "mortgage rates"]
  },
  {
    term: "jobs",
    keywords: ["jobs", "unemployment", "payrolls", "wages", "labor market", "jobless claims"],
    meaning:
      "The story may signal changes in household income, consumer spending, and wage pressure.",
    questions: [
      "Are jobs growing faster or slower?",
      "Is unemployment rising because layoffs increased or because more people are looking for work?",
      "Are wages growing faster than inflation?"
    ],
    indicators: ["Unemployment rate", "nonfarm payrolls", "average hourly earnings"]
  },
  {
    term: "growth",
    keywords: ["gdp", "growth", "recession", "slowdown", "output", "productivity"],
    meaning:
      "The story may describe whether the economy is expanding, slowing, or contracting.",
    questions: [
      "Is the change real growth or mostly inflation?",
      "Which part of the economy is driving the move?",
      "Is the trend broad or isolated?"
    ],
    indicators: ["Real GDP", "industrial production", "real income"]
  },
  {
    term: "companies",
    keywords: ["earnings", "revenue", "profit", "margin", "guidance", "cash flow"],
    meaning:
      "The story may affect a company's expected future cash flows and valuation.",
    questions: [
      "Did revenue grow because of price, volume, or both?",
      "Are margins expanding or shrinking?",
      "Did management change future guidance?"
    ],
    indicators: ["Revenue growth", "operating margin", "free cash flow"]
  },
  {
    term: "credit",
    keywords: ["debt", "default", "credit", "loan", "delinquency", "bank lending"],
    meaning:
      "The story may reveal stress in borrowers, banks, or financial conditions.",
    questions: [
      "Are defaults or delinquencies rising?",
      "Is credit becoming easier or harder to get?",
      "Which borrowers are most exposed?"
    ],
    indicators: ["Credit spreads", "delinquency rates", "bank lending standards"]
  }
];
