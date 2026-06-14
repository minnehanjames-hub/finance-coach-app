import { curriculum, headlineRules } from "./data/curriculum.js";

const STORAGE_KEY = "financeCoachProgress.v1";
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

const state = {
  activeLessonId: curriculum[0].id,
  activeLevel: "All",
  completed: {},
  quizScores: {},
  missedTags: {},
  studyDays: [],
  newsAnalyses: 0
};

const nodes = {
  tabs: document.querySelectorAll(".tab-button"),
  panels: {
    learn: document.querySelector("#learn-panel"),
    data: document.querySelector("#data-panel"),
    news: document.querySelector("#news-panel")
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
  headlineOutput: document.querySelector("#headline-output")
};

function loadProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    Object.assign(state, JSON.parse(saved));
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
    completed: {},
    quizScores: {},
    missedTags: {},
    studyDays: [],
    newsAnalyses: 0
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
}

async function loadIndicators() {
  nodes.indicatorGrid.innerHTML = '<p class="muted">Loading economic indicators...</p>';

  try {
    const response = await fetch("data/economic-indicators.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Indicator file could not be loaded.");
    const data = await response.json();
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
      <path d="${path}" fill="none" stroke="#0f766e" stroke-width="4" stroke-linecap="round" />
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

  nodes.headlineOutput.innerHTML = matches
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
    .join("");
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

loadProgress();
render();
