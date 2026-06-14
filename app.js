import { curriculum, headlineRules } from "./data/curriculum.js";
import {
  dataDetectiveChallenges,
  marketReactionDrills,
  sampleNewsBreakdowns,
  scenarioSimulations
} from "./data/advanced-labs.js";

const STORAGE_KEY = "financeCoachProgress.v1";
const levels = ["All", "Beginner", "Intermediate", "Advanced"];
let cachedEconomicData = null;

const state = {
  activeLessonId: curriculum[0].id,
  activeLevel: "All",
  activeScenarioId: scenarioSimulations[0].id,
  activeReactionId: marketReactionDrills[0].id,
  activeDetectiveId: dataDetectiveChallenges[0].id,
  completed: {},
  quizScores: {},
  advancedScores: {
    scenarios: {},
    reactions: {},
    detective: {}
  },
  missedTags: {},
  studyDays: [],
  newsAnalyses: 0,
  journalEntries: []
};

const nodes = {
  tabs: document.querySelectorAll(".tab-button"),
  panels: {
    learn: document.querySelector("#learn-panel"),
    data: document.querySelector("#data-panel"),
    news: document.querySelector("#news-panel"),
    advanced: document.querySelector("#advanced-panel")
  },
  currentLevel: document.querySelector("#current-level"),
  masteryScore: document.querySelector("#mastery-score"),
  lessonsCompleted: document.querySelector("#lessons-completed"),
  studyDays: document.querySelector("#study-days"),
  levelFilters: document.querySelector("#level-filters"),
  lessonList: document.querySelector("#lesson-list"),
  lessonLevel: document.querySelector("#lesson-level"),
  lessonTime: document.querySelector("#lesson-time"),
  lessonTitle: document.querySelector("#lesson-title"),
  lessonConcept: document.querySelector("#lesson-concept"),
  lessonWhy: document.querySelector("#lesson-why"),
  lessonExample: document.querySelector("#lesson-example"),
  keyTerms: document.querySelector("#key-terms"),
  quizForm: document.querySelector("#quiz-form"),
  submitQuiz: document.querySelector("#submit-quiz"),
  resetQuiz: document.querySelector("#reset-quiz"),
  quizResult: document.querySelector("#quiz-result"),
  weakSpots: document.querySelector("#weak-spots"),
  nextLesson: document.querySelector("#next-lesson"),
  resetProgress: document.querySelector("#reset-progress"),
  indicatorGrid: document.querySelector("#indicator-grid"),
  dataUpdated: document.querySelector("#data-updated"),
  headlineInput: document.querySelector("#headline-input"),
  articleInput: document.querySelector("#article-input"),
  analyzeHeadline: document.querySelector("#analyze-headline"),
  headlineOutput: document.querySelector("#headline-output"),
  sampleHeadlines: document.querySelector("#sample-headlines"),
  adaptiveReview: document.querySelector("#adaptive-review"),
  scenarioSimulator: document.querySelector("#scenario-simulator"),
  reactionTrainer: document.querySelector("#reaction-trainer"),
  dataDetective: document.querySelector("#data-detective"),
  companyRevenue: document.querySelector("#company-revenue"),
  companyGrossProfit: document.querySelector("#company-gross-profit"),
  companyOperatingIncome: document.querySelector("#company-operating-income"),
  companyNetIncome: document.querySelector("#company-net-income"),
  companyCash: document.querySelector("#company-cash"),
  companyDebt: document.querySelector("#company-debt"),
  companyMarketCap: document.querySelector("#company-market-cap"),
  loadCompanySample: document.querySelector("#load-company-sample"),
  analyzeCompany: document.querySelector("#analyze-company"),
  companyOutput: document.querySelector("#company-output"),
  journalDecision: document.querySelector("#journal-decision"),
  journalConfidence: document.querySelector("#journal-confidence"),
  journalRationale: document.querySelector("#journal-rationale"),
  loadJournalSample: document.querySelector("#load-journal-sample"),
  saveJournalEntry: document.querySelector("#save-journal-entry"),
  journalList: document.querySelector("#journal-list")
};

function loadProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);
    Object.assign(state, parsed);
    state.advancedScores = {
      scenarios: {},
      reactions: {},
      detective: {},
      ...(parsed.advancedScores ?? {})
    };
    state.journalEntries = Array.isArray(parsed.journalEntries) ? parsed.journalEntries : [];
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function markStudyDay() {
  const today = new Date().toISOString().slice(0, 10);
  if (!state.studyDays.includes(today)) {
    state.studyDays.push(today);
    saveProgress();
  }
}

function getActiveLesson() {
  return curriculum.find((lesson) => lesson.id === state.activeLessonId) ?? curriculum[0];
}

function getStats() {
  const completedLessons = curriculum.filter((lesson) => state.completed[lesson.id]);
  const totalQuizQuestions = curriculum.reduce((sum, lesson) => sum + lesson.quiz.length, 0);
  const answeredCorrectly = Object.values(state.quizScores).reduce((sum, score) => sum + score.correct, 0);
  const mastery = totalQuizQuestions ? Math.round((answeredCorrectly / totalQuizQuestions) * 100) : 0;
  const currentLevel =
    completedLessons.length >= 10 && mastery >= 70
      ? "Advanced"
      : completedLessons.length >= 5 && mastery >= 45
        ? "Intermediate"
        : "Beginner";

  return {
    completedLessons,
    mastery,
    currentLevel
  };
}

function renderStats() {
  const stats = getStats();
  nodes.currentLevel.textContent = stats.currentLevel;
  nodes.masteryScore.textContent = `${stats.mastery}%`;
  nodes.lessonsCompleted.textContent = `${stats.completedLessons.length} / ${curriculum.length}`;
  nodes.studyDays.textContent = String(state.studyDays.length);

  const next = curriculum.find((lesson) => !state.completed[lesson.id]);
  nodes.nextLesson.textContent = next ? next.title : "All lessons complete";
}

function renderFilters() {
  nodes.levelFilters.innerHTML = "";
  levels.forEach((level) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-button${level === state.activeLevel ? " is-active" : ""}`;
    button.textContent = level;
    button.addEventListener("click", () => {
      state.activeLevel = level;
      render();
    });
    nodes.levelFilters.append(button);
  });
}

function renderLessonList() {
  nodes.lessonList.innerHTML = "";

  const filtered = curriculum.filter((lesson) => {
    return state.activeLevel === "All" || lesson.level === state.activeLevel;
  });

  filtered.forEach((lesson, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `lesson-button${lesson.id === state.activeLessonId ? " is-active" : ""}`;
    button.innerHTML = `
      <span>
        <strong>${index + 1}. ${lesson.title}</strong>
        <span>${lesson.level} - ${lesson.minutes} min</span>
      </span>
      <span class="status-dot${state.completed[lesson.id] ? " done" : ""}" aria-hidden="true"></span>
    `;
    button.addEventListener("click", () => {
      state.activeLessonId = lesson.id;
      nodes.quizResult.innerHTML = "";
      renderLesson();
      renderLessonList();
    });
    nodes.lessonList.append(button);
  });
}

function renderLesson() {
  const lesson = getActiveLesson();
  nodes.lessonLevel.textContent = lesson.level;
  nodes.lessonTime.textContent = `${lesson.minutes} min`;
  nodes.lessonTitle.textContent = lesson.title;
  nodes.lessonConcept.textContent = lesson.concept;
  nodes.lessonWhy.textContent = lesson.why;
  nodes.lessonExample.textContent = lesson.example;

  nodes.keyTerms.innerHTML = "";
  lesson.terms.forEach((term) => {
    const chip = document.createElement("span");
    chip.className = "term-chip";
    chip.textContent = term;
    nodes.keyTerms.append(chip);
  });

  renderQuiz(lesson);
}

function renderQuiz(lesson) {
  nodes.quizForm.innerHTML = "";

  lesson.quiz.forEach((item, questionIndex) => {
    const block = document.createElement("fieldset");
    block.className = "question-block";
    const options = item.options
      .map(
        (option, optionIndex) => `
          <label class="answer-option">
            <input type="radio" name="question-${questionIndex}" value="${optionIndex}" />
            <span>${option}</span>
          </label>
        `
      )
      .join("");

    block.innerHTML = `
      <p>${questionIndex + 1}. ${item.question}</p>
      ${options}
    `;
    nodes.quizForm.append(block);
  });
}

function submitQuiz() {
  const lesson = getActiveLesson();
  let correct = 0;
  const feedback = [];

  lesson.quiz.forEach((item, index) => {
    const selected = nodes.quizForm.querySelector(`input[name="question-${index}"]:checked`);
    const selectedIndex = selected ? Number(selected.value) : -1;
    const isCorrect = selectedIndex === item.answer;

    if (isCorrect) {
      correct += 1;
    } else {
      item.tags.forEach((tag) => {
        state.missedTags[tag] = (state.missedTags[tag] ?? 0) + 1;
      });
    }

    feedback.push({
      isCorrect,
      text: item.explanation
    });
  });

  state.quizScores[lesson.id] = {
    correct,
    total: lesson.quiz.length,
    updatedAt: new Date().toISOString()
  };
  state.completed[lesson.id] = true;
  markStudyDay();
  saveProgress();
  renderQuizResult(correct, lesson.quiz.length, feedback);
  renderStats();
  renderLessonList();
  renderWeakSpots();
}

function renderQuizResult(correct, total, feedback) {
  const percent = Math.round((correct / total) * 100);
  const cards = feedback
    .map(
      (item, index) => `
        <div class="feedback-card${item.isCorrect ? "" : " incorrect"}">
          <strong>Question ${index + 1}: ${item.isCorrect ? "Correct" : "Review"}</strong>
          <div>${item.text}</div>
        </div>
      `
    )
    .join("");

  nodes.quizResult.innerHTML = `
    <span class="score-pill">${correct} / ${total} correct - ${percent}%</span>
    ${cards}
  `;
}

function resetQuiz() {
  renderQuiz(getActiveLesson());
  nodes.quizResult.innerHTML = "";
}

function renderWeakSpots() {
  const missed = Object.entries(state.missedTags).sort((a, b) => b[1] - a[1]).slice(0, 5);
  nodes.weakSpots.innerHTML = "";

  if (!missed.length) {
    nodes.weakSpots.innerHTML = '<p class="muted">Missed quiz topics will appear here.</p>';
    return;
  }

  missed.forEach(([tag, count]) => {
    const item = document.createElement("div");
    item.className = "weak-spot";
    item.innerHTML = `<strong>${tag}</strong><span>Missed ${count} time${count === 1 ? "" : "s"}</span>`;
    nodes.weakSpots.append(item);
  });
}

function resetProgress() {
  const confirmed = window.confirm("Reset your saved progress for this browser?");
  if (!confirmed) return;

  localStorage.removeItem(STORAGE_KEY);
  Object.assign(state, {
    activeLessonId: curriculum[0].id,
    activeLevel: "All",
    activeScenarioId: scenarioSimulations[0].id,
    activeReactionId: marketReactionDrills[0].id,
    activeDetectiveId: dataDetectiveChallenges[0].id,
    completed: {},
    quizScores: {},
    advancedScores: {
      scenarios: {},
      reactions: {},
      detective: {}
    },
    missedTags: {},
    studyDays: [],
    newsAnalyses: 0,
    journalEntries: []
  });
  render();
}

function switchTab(tab) {
  nodes.tabs.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === tab);
  });

  Object.entries(nodes.panels).forEach(([key, panel]) => {
    panel.classList.toggle("is-active", key === tab);
  });

  if (tab === "data") {
    loadIndicators();
  }
  if (tab === "advanced") {
    renderAdvancedLab();
  }
}

async function loadIndicators() {
  nodes.indicatorGrid.innerHTML = '<p class="muted">Loading economic indicators...</p>';

  try {
    const data = await fetchIndicatorData();
    renderIndicators(data);
  } catch (error) {
    nodes.indicatorGrid.innerHTML = `
      <article class="indicator-card">
        <h3>Data unavailable</h3>
        <p>${error.message}</p>
        <p>Run <strong>npm run refresh:data</strong> from this project folder to regenerate the local FRED data file.</p>
      </article>
    `;
  }
}

async function fetchIndicatorData() {
  if (cachedEconomicData) return cachedEconomicData;

  const response = await fetch("data/economic-indicators.json", { cache: "no-store" });
  if (!response.ok) throw new Error("Indicator file could not be loaded.");
  cachedEconomicData = await response.json();
  return cachedEconomicData;
}

function renderIndicators(data) {
  nodes.dataUpdated.textContent = data.updatedAt
    ? `Updated ${new Date(data.updatedAt).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short"
      })}`
    : "";
  nodes.indicatorGrid.innerHTML = "";

  data.series.forEach((series) => {
    const card = document.createElement("article");
    card.className = "indicator-card";
    const changeClass = series.changeFromPrevious >= 0 ? "up" : "down";
    const latest = formatValue(series.latest.value, series.unit);
    const change = formatChange(series.changeFromPrevious, series.unit);
    card.innerHTML = `
      <div>
        <h3>${series.name}</h3>
        <div class="indicator-meta">${series.category} - ${series.latest.date}</div>
      </div>
      <div class="indicator-value">${latest}</div>
      <div class="indicator-change ${changeClass}">${change} from previous reading</div>
      ${sparkline(series.observations)}
      <p>${series.interpretation}</p>
      <a href="${series.sourceUrl}" target="_blank" rel="noreferrer">View source</a>
    `;
    nodes.indicatorGrid.append(card);
  });
}

function formatValue(value, unit) {
  if (unit === "percent") return `${value.toFixed(2)}%`;
  if (unit === "billions") return `$${value.toLocaleString(undefined, { maximumFractionDigits: 1 })}B`;
  return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function formatChange(value, unit) {
  const sign = value > 0 ? "+" : "";
  if (unit === "percent") return `${sign}${value.toFixed(2)} pts`;
  if (unit === "billions") return `${sign}${value.toLocaleString(undefined, { maximumFractionDigits: 1 })}B`;
  return `${sign}${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

function sparkline(observations) {
  const points = observations.slice(-24).filter((point) => Number.isFinite(point.value));
  if (points.length < 2) return "";

  const width = 240;
  const height = 68;
  const values = points.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const spread = max - min || 1;
  const path = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((point.value - min) / spread) * height;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  return `
    <svg class="sparkline" viewBox="0 0 ${width} ${height}" role="img" aria-label="Recent trend">
      <path d="${path}" fill="none" stroke="#35e6b6" stroke-width="4" stroke-linecap="round" />
    </svg>
  `;
}

function analyzeHeadline() {
  const text = `${nodes.headlineInput.value} ${nodes.articleInput.value}`.trim().toLowerCase();
  if (!text) {
    nodes.headlineOutput.innerHTML = '<p class="muted">Paste a headline or short note first.</p>';
    return;
  }

  const matches = headlineRules.filter((rule) =>
    rule.keywords.some((keyword) => text.includes(keyword))
  );

  state.newsAnalyses += 1;
  markStudyDay();
  saveProgress();
  renderStats();

  if (!matches.length) {
    nodes.headlineOutput.innerHTML = `
      <article class="analysis-card">
        <h3>Start with the basic questions</h3>
        <ul>
          <li>What changed compared with the last report?</li>
          <li>Was it better or worse than expectations?</li>
          <li>Who is affected first: consumers, businesses, borrowers, savers, or investors?</li>
          <li>Which official data source could confirm the claim?</li>
        </ul>
      </article>
    `;
    return;
  }

  const assetMap = buildNewsAssetMap(matches);

  nodes.headlineOutput.innerHTML = `
    ${assetMap}
    ${matches
    .map(
      (match) => `
        <article class="analysis-card">
          <h3>${capitalize(match.term)}</h3>
          <p>${match.meaning}</p>
          <strong>Questions to ask</strong>
          <ul>${match.questions.map((question) => `<li>${question}</li>`).join("")}</ul>
          <strong>Indicators to check</strong>
          <ul>${match.indicators.map((indicator) => `<li>${indicator}</li>`).join("")}</ul>
        </article>
      `
    )
    .join("")}
  `;
}

function buildNewsAssetMap(matches) {
  if (!matches.length) return "";

  const terms = matches.map((match) => match.term);
  const effects = [];
  if (terms.includes("inflation") || terms.includes("interest rates")) {
    effects.push("Check bonds, mortgage rates, rate-sensitive stocks, and cash yields.");
  }
  if (terms.includes("jobs") || terms.includes("growth")) {
    effects.push("Check consumer spending, earnings expectations, credit stress, and recession risk.");
  }
  if (terms.includes("companies")) {
    effects.push("Check revenue quality, margins, cash flow, debt, and valuation.");
  }
  if (terms.includes("credit")) {
    effects.push("Check defaults, bank lending standards, spreads, and exposed borrowers.");
  }

  return `
    <article class="analysis-card">
      <h3>Market map</h3>
      <ul>${effects.map((effect) => `<li>${effect}</li>`).join("")}</ul>
    </article>
  `;
}

function renderSampleHeadlines() {
  nodes.sampleHeadlines.innerHTML = "";
  sampleNewsBreakdowns.forEach((sample) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "secondary-button";
    button.textContent = sample.focus;
    button.addEventListener("click", () => {
      nodes.headlineInput.value = sample.headline;
      nodes.articleInput.value = sample.excerpt;
      analyzeHeadline();
    });
    nodes.sampleHeadlines.append(button);
  });
}

function renderAdvancedLab() {
  renderAdaptiveReview();
  renderScenarioSimulator();
  renderReactionTrainer();
  renderDataDetective();
  renderJournalEntries();
}

function renderAdaptiveReview() {
  const stats = getStats();
  const missed = Object.entries(state.missedTags).sort((a, b) => b[1] - a[1]);
  const focus = missed[0]?.[0] ?? getNextFocusTopic(stats.currentLevel);
  const matchingLessons = curriculum
    .filter((lesson) => lesson.terms.includes(focus) || lesson.quiz.some((item) => item.tags.includes(focus)))
    .slice(0, 3);
  const matchingDrills = [
    ...scenarioSimulations.filter((item) => item.focus.includes(focus)),
    ...marketReactionDrills.filter((item) => item.focus.includes(focus)),
    ...dataDetectiveChallenges.filter((item) => item.focus.includes(focus))
  ].slice(0, 3);

  nodes.adaptiveReview.innerHTML = `
    <article class="focus-card">
      <span>Recommended focus</span>
      <strong>${focus}</strong>
      <p class="muted">Based on missed tags, quiz progress, and your current level.</p>
    </article>
    <article class="focus-card">
      <span>What to do next</span>
      <strong>${matchingLessons[0]?.title ?? "Run a scenario drill"}</strong>
      <p>${buildAdaptiveText(stats, matchingLessons, matchingDrills)}</p>
    </article>
  `;
}

function getNextFocusTopic(currentLevel) {
  if (currentLevel === "Advanced") return "valuation";
  if (currentLevel === "Intermediate") return "bond";
  return "inflation";
}

function buildAdaptiveText(stats, lessons, drills) {
  const lessonText = lessons.length
    ? `Review ${lessons.map((lesson) => lesson.title).join(", ")}.`
    : "You are ready for applied practice.";
  const drillText = drills.length
    ? ` Then try ${drills.map((drill) => drill.title ?? drill.event).join(", ")}.`
    : " Then use the Data Detective to connect the concept to real indicators.";

  return `${lessonText}${drillText} Current mastery is ${stats.mastery}%.`;
}

function renderScenarioSimulator() {
  const scenario = scenarioSimulations.find((item) => item.id === state.activeScenarioId) ?? scenarioSimulations[0];
  nodes.scenarioSimulator.innerHTML = buildTrainerMarkup(
    scenarioSimulations,
    scenario,
    "activeScenarioId",
    scenario.title,
    scenario.setup,
    scenario.prompt,
    scenario.options,
    state.advancedScores.scenarios[scenario.id]
  );
  bindTrainer(nodes.scenarioSimulator, scenarioSimulations, "activeScenarioId", scenario, "scenarios");
}

function renderReactionTrainer() {
  const drill = marketReactionDrills.find((item) => item.id === state.activeReactionId) ?? marketReactionDrills[0];
  nodes.reactionTrainer.innerHTML = buildTrainerMarkup(
    marketReactionDrills,
    drill,
    "activeReactionId",
    drill.event,
    drill.bestRead,
    drill.quiz.question,
    drill.quiz.options,
    state.advancedScores.reactions[drill.id],
    drill.impacts
  );
  bindTrainer(nodes.reactionTrainer, marketReactionDrills, "activeReactionId", drill, "reactions");
}

function buildTrainerMarkup(items, active, activeKey, title, setup, prompt, options, score, impacts = []) {
  const setupMarkup = setup.trim().startsWith("<")
    ? setup
    : `<p>${setup}</p>`;
  const buttons = items
    .map(
      (item) => `
        <button class="filter-button${item.id === active.id ? " is-active" : ""}" type="button" data-switch="${item.id}">
          ${item.title ?? item.event}
        </button>
      `
    )
    .join("");
  const optionButtons = options
    .map(
      (option, index) => `
        <button class="secondary-button full-width" type="button" data-answer="${index}">
          ${option}
        </button>
      `
    )
    .join("");
  const impactMarkup = impacts.length
    ? `
      <div class="impact-list">
        ${impacts
          .map(
            ([label, text]) => `
              <article>
                <strong>${label}</strong>
                <p>${text}</p>
              </article>
            `
          )
          .join("")}
      </div>
    `
    : "";
  const scoreMarkup =
    score === undefined
      ? ""
      : `<div class="advanced-result${score.correct ? "" : " incorrect"}">${score.correct ? "Correct" : "Review"}: ${score.explanation}</div>`;

  return `
    <div class="level-filters">${buttons}</div>
    <article class="trainer-card" data-active-key="${activeKey}">
      <span>${active.difficulty ?? "Applied drill"}</span>
      <strong>${title}</strong>
      ${setupMarkup}
      ${impactMarkup}
      <p><strong>${prompt}</strong></p>
      <div class="quiz-result">${optionButtons}</div>
      ${scoreMarkup}
    </article>
  `;
}

function bindTrainer(container, items, activeKey, active, scoreBucket) {
  container.querySelectorAll("[data-switch]").forEach((button) => {
    button.addEventListener("click", () => {
      state[activeKey] = button.dataset.switch;
      saveProgress();
      renderAdvancedLab();
    });
  });

  container.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const selected = Number(button.dataset.answer);
      const correctAnswer = active.quiz ? active.quiz.answer : active.answer;
      const explanation = active.explanation ?? active.bestRead;
      const correct = selected === correctAnswer;
      state.advancedScores[scoreBucket][active.id] = {
        correct,
        explanation,
        updatedAt: new Date().toISOString()
      };
      if (!correct) {
        active.focus.forEach((tag) => {
          state.missedTags[tag] = (state.missedTags[tag] ?? 0) + 1;
        });
      }
      markStudyDay();
      saveProgress();
      renderAdvancedLab();
    });
  });
}

async function renderDataDetective() {
  const challenge =
    dataDetectiveChallenges.find((item) => item.id === state.activeDetectiveId) ?? dataDetectiveChallenges[0];

  nodes.dataDetective.innerHTML = '<p class="muted">Loading real indicator context...</p>';

  try {
    const data = await fetchIndicatorData();
    const readings = challenge.indicators
      .map((id) => data.series.find((series) => series.id === id))
      .filter(Boolean);
    const readingMarkup = readings
      .map(
        (series) => `
          <article class="metric-card">
            <span>${series.category}</span>
            <strong>${series.name}</strong>
            <p>${formatValue(series.latest.value, series.unit)} as of ${series.latest.date}</p>
          </article>
        `
      )
      .join("");
    nodes.dataDetective.innerHTML = buildTrainerMarkup(
      dataDetectiveChallenges,
      challenge,
      "activeDetectiveId",
      challenge.title,
      `<div class="metric-grid">${readingMarkup}</div>`,
      challenge.question,
      challenge.options,
      state.advancedScores.detective[challenge.id]
    );
    bindTrainer(nodes.dataDetective, dataDetectiveChallenges, "activeDetectiveId", challenge, "detective");
  } catch (error) {
    nodes.dataDetective.innerHTML = `<p class="muted">${error.message}</p>`;
  }
}

function analyzeCompany() {
  const revenue = readNumber(nodes.companyRevenue);
  const grossProfit = readNumber(nodes.companyGrossProfit);
  const operatingIncome = readNumber(nodes.companyOperatingIncome);
  const netIncome = readNumber(nodes.companyNetIncome);
  const cash = readNumber(nodes.companyCash);
  const debt = readNumber(nodes.companyDebt);
  const marketCap = readNumber(nodes.companyMarketCap);

  if (!revenue || revenue <= 0) {
    nodes.companyOutput.innerHTML = '<p class="muted">Enter revenue first. The other fields can be rough numbers.</p>';
    return;
  }

  const grossMargin = grossProfit / revenue;
  const operatingMargin = operatingIncome / revenue;
  const netMargin = netIncome / revenue;
  const netDebt = debt - cash;
  const priceToSales = marketCap > 0 ? marketCap / revenue : null;
  const priceToEarnings = marketCap > 0 && netIncome > 0 ? marketCap / netIncome : null;
  const flags = buildCompanyFlags({ grossMargin, operatingMargin, netMargin, netDebt, revenue, priceToSales, priceToEarnings });

  nodes.companyOutput.innerHTML = `
    <article class="analysis-card">
      <h3>Company read</h3>
      <div class="metric-grid">
        <article class="metric-card"><span>Gross margin</span><strong>${formatPercent(grossMargin)}</strong></article>
        <article class="metric-card"><span>Operating margin</span><strong>${formatPercent(operatingMargin)}</strong></article>
        <article class="metric-card"><span>Net margin</span><strong>${formatPercent(netMargin)}</strong></article>
        <article class="metric-card"><span>Net debt</span><strong>${formatNumber(netDebt)}</strong></article>
        <article class="metric-card"><span>Price / sales</span><strong>${priceToSales ? priceToSales.toFixed(2) : "N/A"}</strong></article>
        <article class="metric-card"><span>Price / earnings</span><strong>${priceToEarnings ? priceToEarnings.toFixed(2) : "N/A"}</strong></article>
      </div>
    </article>
    <article class="analysis-card">
      <h3>Questions to ask</h3>
      <ul>${flags.map((flag) => `<li>${flag}</li>`).join("")}</ul>
    </article>
  `;
}

function loadCompanySample() {
  nodes.companyRevenue.value = "1000";
  nodes.companyGrossProfit.value = "420";
  nodes.companyOperatingIncome.value = "180";
  nodes.companyNetIncome.value = "120";
  nodes.companyCash.value = "250";
  nodes.companyDebt.value = "300";
  nodes.companyMarketCap.value = "2400";
}

function readNumber(input) {
  const value = Number(input.value);
  return Number.isFinite(value) ? value : 0;
}

function formatPercent(value) {
  return `${(value * 100).toFixed(1)}%`;
}

function formatNumber(value) {
  const sign = value < 0 ? "-" : "";
  return `${sign}${Math.abs(value).toLocaleString(undefined, { maximumFractionDigits: 1 })}`;
}

function buildCompanyFlags(metrics) {
  const flags = [];
  if (metrics.grossMargin < 0.25) flags.push("Gross margin is thin, so cost pressure could matter a lot.");
  if (metrics.operatingMargin < 0.1) flags.push("Operating margin is modest; check whether expenses are scaling efficiently.");
  if (metrics.netMargin < 0.05) flags.push("Net margin is low; inspect taxes, interest expense, and one-time costs.");
  if (metrics.netDebt > metrics.revenue * 0.5) flags.push("Net debt is meaningful relative to revenue; check interest costs and maturity schedule.");
  if (metrics.priceToSales && metrics.priceToSales > 8) flags.push("Price-to-sales is high; future growth expectations may already be demanding.");
  if (metrics.priceToEarnings && metrics.priceToEarnings > 35) flags.push("P/E is high; compare growth, margins, and risk before assuming it is cheap.");
  if (!flags.length) flags.push("No obvious red flag from this quick screen. Next step: compare margins, growth, and debt to peers.");
  return flags;
}

function saveJournalEntry() {
  const rationale = nodes.journalRationale.value.trim();
  if (!rationale) {
    nodes.journalList.innerHTML = '<p class="muted">Write a short reason before saving the decision.</p>';
    return;
  }

  state.journalEntries.unshift({
    id: createEntryId(),
    decision: nodes.journalDecision.value,
    confidence: nodes.journalConfidence.value,
    rationale,
    createdAt: new Date().toISOString()
  });
  state.journalEntries = state.journalEntries.slice(0, 12);
  nodes.journalRationale.value = "";
  markStudyDay();
  saveProgress();
  renderJournalEntries();
}

function loadJournalSample() {
  nodes.journalDecision.value = "Balanced allocation";
  nodes.journalConfidence.value = "Medium";
  nodes.journalRationale.value =
    "Inflation and rates are still the main signals, so I would stay balanced and keep watching credit stress before changing exposure.";
}

function createEntryId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function renderJournalEntries() {
  nodes.journalList.innerHTML = "";

  if (!state.journalEntries.length) {
    nodes.journalList.innerHTML = '<p class="muted">Saved practice decisions will appear here.</p>';
    return;
  }

  state.journalEntries.forEach((entry) => {
    const item = document.createElement("article");
    item.className = "journal-entry";

    const title = document.createElement("strong");
    title.textContent = `${entry.decision} - ${entry.confidence} confidence`;
    const meta = document.createElement("span");
    meta.textContent = new Date(entry.createdAt).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short"
    });
    const rationale = document.createElement("p");
    rationale.textContent = entry.rationale;

    item.append(title, meta, rationale);
    nodes.journalList.append(item);
  });
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function render() {
  renderFilters();
  renderStats();
  renderLessonList();
  renderLesson();
  renderWeakSpots();
}

nodes.tabs.forEach((button) => {
  button.addEventListener("click", () => switchTab(button.dataset.tab));
});
nodes.submitQuiz.addEventListener("click", submitQuiz);
nodes.resetQuiz.addEventListener("click", resetQuiz);
nodes.resetProgress.addEventListener("click", resetProgress);
nodes.analyzeHeadline.addEventListener("click", analyzeHeadline);
nodes.loadCompanySample.addEventListener("click", loadCompanySample);
nodes.analyzeCompany.addEventListener("click", analyzeCompany);
nodes.loadJournalSample.addEventListener("click", loadJournalSample);
nodes.saveJournalEntry.addEventListener("click", saveJournalEntry);

loadProgress();
renderSampleHeadlines();
render();
