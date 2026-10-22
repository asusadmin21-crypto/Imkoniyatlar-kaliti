/* ==========================================================================
   IMKONIYATLAR KALITI - Main Application Controller
   Handles One-Time Profile, 30-Q Test Engine, 5x A'lo Parent Certificate,
   Multi-Format Downloads (PDF, Word, PNG, SVG, HTML, TXT, JSON),
   Leaderboards (Daily/Weekly/Monthly), Telecom Schematics, and Forum/Q&A
   ========================================================================== */

const ADMIN_EMAIL = "asusadmin21@gmail.com";

// Application State
const AppState = {
  user: null,
  stats: {
    visits: 1,
    solvedTests: 0,
    excellentCount: 0,
    activeSeconds: 0,
    lastRefreshDate: ""
  },
  currentCategory: "all",
  searchQuery: "",
  activeTest: null,
  testTimerInterval: null,
  pendingActionAfterReg: null,
  ratings: {},
  testHistory: [],
  forumPosts: []
};

/* ==========================================================================
   INITIALIZATION & VISIT / ACTIVE TIME TRACKING
   ========================================================================== */
function loadState() {
  try {
    const savedUser = localStorage.getItem("ik_user_profile");
    if (savedUser) AppState.user = JSON.parse(savedUser);

    const savedStats = localStorage.getItem("ik_user_stats");
    if (savedStats) {
      AppState.stats = { ...AppState.stats, ...JSON.parse(savedStats) };
      AppState.stats.visits = (AppState.stats.visits || 0) + 1;
    }

    const todayStr = new Date().toISOString().slice(0, 10);
    AppState.stats.lastRefreshDate = todayStr;
    saveStats();

    const savedRatings = localStorage.getItem("ik_module_ratings");
    if (savedRatings) AppState.ratings = JSON.parse(savedRatings);

    const savedHistory = localStorage.getItem("ik_test_history");
    if (savedHistory) AppState.testHistory = JSON.parse(savedHistory);

    const savedForum = localStorage.getItem("ik_forum_posts");
    if (savedForum) {
      AppState.forumPosts = JSON.parse(savedForum);
    } else {
      seedInitialForumPosts();
    }
  } catch (e) {
    console.error("State load error:", e);
  }
}

function saveStats() {
  try {
    localStorage.setItem("ik_user_stats", JSON.stringify(AppState.stats));
  } catch (_) {}
}

function updateDashboardStatsUI() {
  const elVisits = document.getElementById("statVisitsVal");
  const elSolved = document.getElementById("statSolvedVal");
  const elExc = document.getElementById("statExcellentVal");
  const elTime = document.getElementById("statActiveTimeVal");
  const elUserBadge = document.getElementById("headerUserBadge");

  if (elVisits) elVisits.textContent = `${AppState.stats.visits} marta`;
  if (elSolved) elSolved.textContent = `${AppState.stats.solvedTests} ta`;
  if (elExc) elExc.textContent = `${AppState.stats.excellentCount} / 5 A'lo 🏆`;

  if (elTime) {
    const mins = Math.floor(AppState.stats.activeSeconds / 60);
    const secs = AppState.stats.activeSeconds % 60;
    elTime.textContent = `${mins} daq ${secs} soniya`;
  }

  if (elUserBadge) {
    if (AppState.user && AppState.user.firstName) {
      elUserBadge.innerHTML = `👤 <strong>${escapeHtml(AppState.user.lastName)} ${escapeHtml(AppState.user.firstName)}</strong>`;
      elUserBadge.title = `${AppState.user.lastName} ${AppState.user.firstName} ${AppState.user.middleName} (Ma'lumot saqlangan)`;
    } else {
      elUserBadge.innerHTML = `👤 <span>Ro'yxatdan o'tish (1 marta)</span>`;
    }
  }
}

/* ==========================================================================
   ONE-TIME USER REGISTRATION (First Name, Last Name, Patronymic, Parents)
   Never asks again once entered!
   ========================================================================== */
function ensureUserRegistered(callback) {
  if (AppState.user && AppState.user.firstName && AppState.user.lastName && AppState.user.middleName) {
    callback();
    return;
  }
  AppState.pendingActionAfterReg = callback;
  openRegistrationModal();
}

function openRegistrationModal() {
  const modal = document.getElementById("registrationModal");
  if (!modal) return;
  if (AppState.user) {
    document.getElementById("regFirstName").value = AppState.user.firstName || "";
    document.getElementById("regLastName").value = AppState.user.lastName || "";
    document.getElementById("regMiddleName").value = AppState.user.middleName || "";
    document.getElementById("regParentsNames").value = AppState.user.parentsNames || "";
  }
  modal.classList.remove("hidden");
}

function closeRegistrationModal() {
  const modal = document.getElementById("registrationModal");
  if (modal) modal.classList.add("hidden");
}

function handleSaveRegistration(e) {
  e.preventDefault();
  const firstName = document.getElementById("regFirstName").value.trim();
  const lastName = document.getElementById("regLastName").value.trim();
  const middleName = document.getElementById("regMiddleName").value.trim();
  const parentsNames = document.getElementById("regParentsNames").value.trim() || "Muhtaram Ota-onasi";

  if (!firstName || !lastName || !middleName) {
    alert("Iltimos, Ism, Familiya va Otasining ismini to'liq kiriting!");
    return;
  }

  AppState.user = {
    firstName,
    lastName,
    middleName,
    parentsNames,
    registeredAt: new Date().toLocaleString()
  };

  localStorage.setItem("ik_user_profile", JSON.stringify(AppState.user));
  closeRegistrationModal();
  updateDashboardStatsUI();
  renderCertificateView();

  if (typeof AppState.pendingActionAfterReg === "function") {
    const fn = AppState.pendingActionAfterReg;
    AppState.pendingActionAfterReg = null;
    fn();
  }
}

/* ==========================================================================
   VIEW NAVIGATION & INTERNAL BACK / EXIT BUTTONS
   ========================================================================== */
function switchView(viewId) {
  const views = [
    "viewHome",
    "viewTestEngine",
    "viewTheory",
    "viewTelecom",
    "viewLeaderboard",
    "viewCertificate",
    "viewForum"
  ];
  views.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle("hidden", id !== viewId);
  });

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.target === viewId);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ==========================================================================
   SUBJECTS GRID RENDERING & FILTERING
   ========================================================================== */
function renderSubjectsGrid() {
  const grid = document.getElementById("subjectsGridContainer");
  if (!grid) return;

  const q = AppState.searchQuery.toLowerCase().trim();
  const filtered = SUBJECTS_CATALOG.filter(sub => {
    const matchesCat = AppState.currentCategory === "all" || sub.category === AppState.currentCategory;
    const matchesQuery = !q ||
      sub.title.toLowerCase().includes(q) ||
      sub.desc.toLowerCase().includes(q) ||
      sub.levels.some(l => l.toLowerCase().includes(q));
    return matchesCat && matchesQuery;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="theory-block" style="grid-column: 1 / -1; text-align:center;">
      <h3>Qidiruv bo'yicha fan topilmadi</h3>
      <p>Boshqa kalit so'z kiriting yoki "Barchasi" bo'limini tanlang.</p>
    </div>`;
    return;
  }

  grid.innerHTML = filtered.map(sub => {
    const savedStar = AppState.ratings[sub.id] || 5;
    const starsDisplay = "★".repeat(savedStar) + "☆".repeat(5 - savedStar);
    const optionsHtml = sub.levels.map(lvl => `<option value="${escapeHtml(lvl)}">${escapeHtml(lvl)}</option>`).join("");

    return `<div class="subject-card" data-subject-id="${sub.id}">
      <div>
        <div class="subject-header">
          <div class="subject-icon">${sub.icon}</div>
          <span class="subject-tag">${escapeHtml(sub.tag)}</span>
        </div>
        <h3 class="subject-title" style="margin-top:10px;">${escapeHtml(sub.title)}</h3>
        <p class="subject-desc">${escapeHtml(sub.desc)}</p>
      </div>

      <div>
        <div class="level-selector-wrap" style="margin-bottom: 12px;">
          <label class="level-label" data-i18n="lblSelectLevel">${t("lblSelectLevel")}</label>
          <select id="levelSelect_${sub.id}" class="level-select">
            ${optionsHtml}
          </select>
        </div>

        <div class="card-actions">
          <button class="btn btn-primary" onclick="initiateSubjectTest('${sub.id}')">
            🚀 30 talik Test
          </button>
          <button class="btn btn-secondary" onclick="openSubjectTheory('${sub.id}')">
            📖 Nazariya &amp; Amaliyot
          </button>
        </div>

        <div class="subject-meta" style="margin-top: 10px;">
          <span>🔄 Kunlik yangilangan (${AppState.stats.lastRefreshDate})</span>
          <span style="color:#fbbf24;" title="Foydalanuvchilar bahosi">${starsDisplay}</span>
        </div>
      </div>
    </div>`;
  }).join("");
}

/* ==========================================================================
   30-QUESTION TEST ENGINE (NON-REPEATING, INSTANT LOCK, TIMESTAMPS, DOWNLOAD)
   ========================================================================== */
function initiateSubjectTest(subjectId) {
  const selectEl = document.getElementById(`levelSelect_${subjectId}`);
  const chosenLevel = selectEl ? selectEl.value : "";

  ensureUserRegistered(() => {
    start30QuestionTestSession(subjectId, chosenLevel);
  });
}

function start30QuestionTestSession(subjectId, level) {
  if (AppState.testTimerInterval) clearInterval(AppState.testTimerInterval);

  const bundle = build30QuestionTest(subjectId, level);
  const startDate = new Date();

  AppState.activeTest = {
    subject: bundle.subject,
    level: bundle.level,
    questions: bundle.questions,
    currentIndex: 0,
    startTime: startDate,
    startTimeFormatted: startDate.toLocaleTimeString(),
    endTimeFormatted: "Jarayonda...",
    elapsedSeconds: 0,
    completed: false,
    correctCount: 0,
    wrongCount: 0
  };

  switchView("viewTestEngine");
  renderActiveTestUI();

  AppState.testTimerInterval = setInterval(() => {
    if (!AppState.activeTest || AppState.activeTest.completed) return;
    AppState.activeTest.elapsedSeconds++;
    const elElapsed = document.getElementById("testElapsedTimeVal");
    if (elElapsed) {
      elElapsed.textContent = formatDuration(AppState.activeTest.elapsedSeconds);
    }
  }, 1000);
}

function formatDuration(totalSec) {
  const hrs = Math.floor(totalSec / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;
  return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function renderActiveTestUI() {
  const test = AppState.activeTest;
  if (!test) return;

  document.getElementById("testHeaderTitle").textContent = `${test.subject.icon} ${test.subject.title} — ${test.level}`;
  document.getElementById("testUserFullname").textContent = AppState.user
    ? `${AppState.user.lastName} ${AppState.user.firstName} ${AppState.user.middleName}`
    : "";
  document.getElementById("testStartTimeVal").textContent = test.startTimeFormatted;
  document.getElementById("testElapsedTimeVal").textContent = formatDuration(test.elapsedSeconds);
  document.getElementById("testEndTimeVal").textContent = test.endTimeFormatted;
  document.getElementById("testLiveScoreVal").textContent = `${test.correctCount} / 30 (${Math.round((test.correctCount / 30) * 100)}%)`;

  // Progress pills (1..30)
  const pillsContainer = document.getElementById("questionProgressPills");
  pillsContainer.innerHTML = test.questions.map((q, idx) => {
    let cls = "q-dot";
    if (idx === test.currentIndex) cls += " current";
    if (q.isLocked) {
      const chosen = q.options[q.userChoice];
      cls += (chosen && chosen.isCorrect) ? " correct" : " wrong";
    }
    return `<button class="${cls}" onclick="jumpToQuestion(${idx})">${idx + 1}</button>`;
  }).join("");

  const curQ = test.questions[test.currentIndex];
  const letters = ["A", "B", "C", "D"];

  const qContainer = document.getElementById("activeQuestionBox");
  qContainer.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; color:var(--text-dim); font-size:0.84rem;">
      <span>Savol ${curQ.index} / 30 (Takrorlanmas ID: #${curQ.hash})</span>
      <span>${curQ.isLocked ? "🔒 Javob belgilangan va qulflangan" : "🟢 Javobni tanlang"}</span>
    </div>
    <div class="question-text">${escapeHtml(curQ.question)}</div>
    <div class="options-list">
      ${curQ.options.map((opt, oIdx) => {
        let btnClass = "option-btn";
        if (curQ.isLocked) {
          if (opt.isCorrect) btnClass += " opt-correct";
          else if (curQ.userChoice === oIdx) btnClass += " opt-wrong";
        }
        return `<button class="${btnClass}" ${curQ.isLocked ? "disabled" : ""} onclick="selectTestOption(${oIdx})">
          <span class="option-letter">${letters[oIdx]}</span>
          <span>${escapeHtml(opt.text)}</span>
        </button>`;
      }).join("")}
    </div>
    ${curQ.isLocked ? `
      <div class="explanation-box">
        <strong>${curQ.options[curQ.userChoice].isCorrect ? "✅ " + t("msgCorrect") : "❌ " + t("msgWrong")}</strong>
        <div style="margin-top:6px;">💡 <strong>Izoh va To'g'ri Yechim:</strong> ${escapeHtml(curQ.explanation)}</div>
      </div>
    ` : ""}
  `;

  // Navigation buttons & Finish panel
  const summaryBox = document.getElementById("testResultSummaryPanel");
  summaryBox.classList.toggle("hidden", !test.completed);

  renderStarRatingWidget("testStarRatingMount", test.subject.id);
}

function selectTestOption(optionIndex) {
  const test = AppState.activeTest;
  if (!test) return;
  const curQ = test.questions[test.currentIndex];
  if (curQ.isLocked) return; // Selection strictly locked after first answer

  curQ.userChoice = optionIndex;
  curQ.isLocked = true;

  if (curQ.options[optionIndex].isCorrect) {
    test.correctCount++;
  } else {
    test.wrongCount++;
  }

  // Check if all 30 questions are answered
  const allAnswered = test.questions.every(q => q.isLocked);
  if (allAnswered && !test.completed) {
    finalize30QuestionTest();
  }

  renderActiveTestUI();
}

function jumpToQuestion(idx) {
  if (!AppState.activeTest) return;
  AppState.activeTest.currentIndex = idx;
  renderActiveTestUI();
}

function nextTestQuestion() {
  if (!AppState.activeTest) return;
  if (AppState.activeTest.currentIndex < 29) {
    AppState.activeTest.currentIndex++;
    renderActiveTestUI();
  } else if (!AppState.activeTest.completed) {
    finalize30QuestionTest();
    renderActiveTestUI();
  }
}

function prevTestQuestion() {
  if (!AppState.activeTest) return;
  if (AppState.activeTest.currentIndex > 0) {
    AppState.activeTest.currentIndex--;
    renderActiveTestUI();
  }
}

function finalize30QuestionTest() {
  const test = AppState.activeTest;
  if (!test || test.completed) return;

  test.completed = true;
  if (AppState.testTimerInterval) clearInterval(AppState.testTimerInterval);

  const finishDate = new Date();
  test.endTimeFormatted = finishDate.toLocaleTimeString();

  const pct = Math.round((test.correctCount / 30) * 100);
  const isExcellent = test.correctCount >= 26; // >= 86% is A'lo (5 baho)
  let gradeLabel = "Qoniqarli (3)";
  if (test.correctCount >= 26) gradeLabel = "A'LO (5 baho) 🌟";
  else if (test.correctCount >= 21) gradeLabel = "Yaxshi (4 baho) 👍";

  test.percentage = pct;
  test.gradeLabel = gradeLabel;

  AppState.stats.solvedTests++;
  if (isExcellent) {
    AppState.stats.excellentCount++;
  }
  saveStats();

  // Save to history & leaderboard
  const record = {
    id: "RES-" + Date.now(),
    fio: AppState.user ? `${AppState.user.lastName} ${AppState.user.firstName} ${AppState.user.middleName}` : "Foydalanuvchi",
    parents: AppState.user ? AppState.user.parentsNames : "Ota-onasi",
    subjectTitle: test.subject.title,
    level: test.level,
    score: test.correctCount,
    total: 30,
    percentage: pct,
    grade: gradeLabel,
    startTime: test.startTimeFormatted,
    elapsedTime: formatDuration(test.elapsedSeconds),
    endTime: test.endTimeFormatted,
    dateISO: finishDate.toISOString(),
    dateHuman: finishDate.toLocaleDateString()
  };

  AppState.testHistory.unshift(record);
  try {
    localStorage.setItem("ik_test_history", JSON.stringify(AppState.testHistory.slice(0, 200)));
  } catch (_) {}

  updateDashboardStatsUI();

  const summaryContent = document.getElementById("testSummaryDetails");
  if (summaryContent) {
    const certUnlockBanner = AppState.stats.excellentCount >= 5
      ? `<div style="margin-top:16px; padding:16px; border-radius:12px; background:rgba(245,158,11,0.2); border:2px solid #fbbf24;">
          <h3 style="color:#fbbf24;">🎉 TABRIKLAYMIZ! Siz 5 marta "A'LO" bahoga bajardingiz!</h3>
          <p style="margin:8px 0;">Sayt Admini (<strong>${ADMIN_EMAIL}</strong>) va <strong>"IMKONIYATLAR KALITI"</strong> nomidan Sizga va Ota-onangizga Minnatdorchilik Sertifikati taqdim etildi!</p>
          <button class="btn btn-gold" onclick="switchView('viewCertificate'); renderCertificateView();">🏆 Sertifikatni Ko'rish va Barcha Formatlarda Yuklab Olish</button>
        </div>`
      : `<div style="margin-top:12px; color:#fde68a;">
          🏅 Ota-onangizga Minnatdorchilik Sertifikati olish ko'rsatkichi: <strong>${AppState.stats.excellentCount} / 5 marta A'lo</strong>
        </div>`;

    summaryContent.innerHTML = `
      <h3 style="color:#34d399; font-size:1.35rem;">🏁 Test Yakunlandi! Natija: ${test.correctCount} / 30 (${pct}%) — ${gradeLabel}</h3>
      <p style="margin-top:6px;">👤 F.I.Sh.: <strong>${escapeHtml(record.fio)}</strong></p>
      <p>⏱️ Boshlanish vaqti: <strong>${record.startTime}</strong> | Bajarilgan vaqti: <strong>${record.elapsedTime}</strong> | Tugatgan vaqti: <strong>${record.endTime}</strong></p>
      ${certUnlockBanner}
    `;
  }
}

/* ==========================================================================
   DOWNLOAD INDIVIDUAL TEST RESULTS (PDF/Print, Word .doc, TXT, JSON, CSV)
   ========================================================================== */
function downloadCurrentTestResult(format) {
  const test = AppState.activeTest;
  if (!test) return;

  const fio = AppState.user
    ? `${AppState.user.lastName} ${AppState.user.firstName} ${AppState.user.middleName}`
    : "Foydalanuvchi";
  const pct = Math.round((test.correctCount / 30) * 100);

  const lines = [
    "======================================================================",
    "          IMKONIYATLAR KALITI - RASMIY TEST NATIJALARI VARAQASI       ",
    "======================================================================",
    `F.I.Sh.:               ${fio}`,
    `Ota-onasi:             ${AppState.user ? AppState.user.parentsNames : ""}`,
    `Fan va Yo'nalish:      ${test.subject.title} (${test.level})`,
    `Boshlanish vaqti:      ${test.startTimeFormatted}`,
    `Sarflangan vaqt:       ${formatDuration(test.elapsedSeconds)}`,
    `Tugatgan vaqti:        ${test.endTimeFormatted}`,
    `To'g'ri javoblar:      ${test.correctCount} / 30 (${pct}%)`,
    `Admin bilan aloqa:     ${ADMIN_EMAIL}`,
    "======================================================================",
    ""
  ];

  test.questions.forEach(q => {
    const chosen = q.userChoice !== null ? q.options[q.userChoice].text : "Belgilanmagan";
    const right = q.options.find(o => o.isCorrect).text;
    const status = (q.userChoice !== null && q.options[q.userChoice].isCorrect) ? "[TO'G'RI]" : "[XATO]";
    lines.push(`${q.index}. ${q.question}`);
    lines.push(`   Sizning javobingiz: ${chosen} ${status}`);
    lines.push(`   To'g'ri javob:      ${right}`);
    lines.push("");
  });

  const baseFilename = `Imkoniyatlar_Kaliti_Natija_${test.subject.id}_${Date.now()}`;

  if (format === "txt") {
    triggerBlobDownload(lines.join("\r\n"), `${baseFilename}.txt`, "text/plain;charset=utf-8");
  } else if (format === "json") {
    triggerBlobDownload(JSON.stringify({ user: AppState.user, test }, null, 2), `${baseFilename}.json`, "application/json;charset=utf-8");
  } else if (format === "csv") {
    const csvRows = [
      ["No", "Savol", "Foydalanuvchi Javobi", "Togri Javob", "Holati"].join(","),
      ...test.questions.map(q => {
        const ch = q.userChoice !== null ? q.options[q.userChoice].text : "";
        const rt = q.options.find(o => o.isCorrect).text;
        const st = (q.userChoice !== null && q.options[q.userChoice].isCorrect) ? "Togri" : "Xato";
        return [q.index, `"${q.question.replace(/"/g, '""')}"`, `"${ch.replace(/"/g, '""')}"`, `"${rt.replace(/"/g, '""')}"`, st].join(",");
      })
    ];
    triggerBlobDownload("\uFEFF" + csvRows.join("\r\n"), `${baseFilename}.csv`, "text/csv;charset=utf-8");
  } else if (format === "doc") {
    const docHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Test Natijasi</title></head>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="color:#1d4ed8;">IMKONIYATLAR KALITI — TEST NATIJASI</h1>
        <p><strong>F.I.Sh.:</strong> ${escapeHtml(fio)}</p>
        <p><strong>Fan va Kurs/Sinf:</strong> ${escapeHtml(test.subject.title)} — ${escapeHtml(test.level)}</p>
        <p><strong>Vaqt ko'rsatkichlari:</strong> Boshlandi: ${test.startTimeFormatted} | Davomiyligi: ${formatDuration(test.elapsedSeconds)} | Tugatildi: ${test.endTimeFormatted}</p>
        <p><strong>Natija:</strong> ${test.correctCount} / 30 (${pct}%)</p>
        <hr/>
        <ol>
          ${test.questions.map(q => {
            const ch = q.userChoice !== null ? q.options[q.userChoice].text : "Belgilanmagan";
            const rt = q.options.find(o => o.isCorrect).text;
            return `<li style="margin-bottom:10px;">
              <strong>${escapeHtml(q.question)}</strong><br/>
              Javobingiz: ${escapeHtml(ch)} | <em>To'g'ri javob: ${escapeHtml(rt)}</em>
            </li>`;
          }).join("")}
        </ol>
      </body></html>`;
    triggerBlobDownload(docHtml, `${baseFilename}.doc`, "application/msword;charset=utf-8");
  } else if (format === "pdf") {
    window.print();
  }
}

/* ==========================================================================
   THEORY & PRACTICAL LAB VIEW (WITH TIMESTAMPS & 5-STAR RATING)
   ========================================================================== */
function openSubjectTheory(subjectId) {
  const subject = SUBJECTS_CATALOG.find(s => s.id === subjectId) || SUBJECTS_CATALOG[0];
  const selectEl = document.getElementById(`levelSelect_${subjectId}`);
  const level = selectEl ? selectEl.value : subject.levels[0];

  switchView("viewTheory");

  const startStr = new Date().toLocaleTimeString();
  const container = document.getElementById("theoryContentContainer");

  const theoryBlocksHtml = (subject.theory || []).map((th, idx) => `
    <div class="theory-block">
      <h3>📌 ${idx + 1}. ${escapeHtml(th.title)} (${escapeHtml(level)})</h3>
      <p>${escapeHtml(th.body)}</p>
      ${th.code ? `<pre class="code-sample"><code>${escapeHtml(th.code)}</code></pre>` : ""}
    </div>
  `).join("");

  // Also generate level-specific non-repeating practical examples
  const sampleQuestions = build30QuestionTest(subjectId, level).questions.slice(0, 5);
  const practicalHtml = sampleQuestions.map((sq, i) => {
    const rightAns = sq.options.find(o => o.isCorrect).text;
    return `<div class="theory-block">
      <h3>🔬 Amaliy Mashg'ulot va Tahlil №${i + 1}</h3>
      <p><strong>Masala / Vazifa:</strong> ${escapeHtml(sq.question)}</p>
      <p style="color:#34d399; margin-top:6px;"><strong>✅ To'g'ri Yechim:</strong> ${escapeHtml(rightAns)}</p>
      <p style="color:#cbd5e1; margin-top:4px;"><em>Izoh: ${escapeHtml(sq.explanation)}</em></p>
    </div>`;
  }).join("");

  container.innerHTML = `
    <div class="test-timestamps-bar">
      <div class="timestamp-box">
        <span class="timestamp-label">Fan va Yo'nalish</span>
        <span class="timestamp-val">${subject.icon} ${escapeHtml(subject.title)}</span>
      </div>
      <div class="timestamp-box">
        <span class="timestamp-label">Tanlangan Sinf / Kurs</span>
        <span class="timestamp-val">${escapeHtml(level)}</span>
      </div>
      <div class="timestamp-box">
        <span class="timestamp-label">Mutolaa boshlangan vaqt</span>
        <span class="timestamp-val">${startStr}</span>
      </div>
    </div>

    ${theoryBlocksHtml}
    ${practicalHtml}

    <div style="text-align:center; margin: 22px 0;">
      <button class="btn btn-primary" onclick="initiateSubjectTest('${subject.id}')">
        🚀 Shu mavzu bo'yicha 30 talik Testni Boshlash
      </button>
    </div>

    <div id="theoryStarRatingMount"></div>
  `;

  renderStarRatingWidget("theoryStarRatingMount", subject.id);
}

/* ==========================================================================
   5-STAR RATING WIDGET FOR ALL TESTS AND THEORIES
   ========================================================================== */
function renderStarRatingWidget(mountId, moduleId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  const currentStars = AppState.ratings[moduleId] || 0;

  mount.innerHTML = `
    <div class="star-rating-card">
      <h4 data-i18n="lblRateModule">${t("lblRateModule")}</h4>
      <div class="stars-row">
        ${[1, 2, 3, 4, 5].map(star => `
          <button class="star-btn ${star <= currentStars ? "active" : ""}" onclick="submitModuleRating('${mountId}', '${moduleId}', ${star})" title="${star} yulduz">
            ★
          </button>
        `).join("")}
      </div>
      <p style="font-size:0.84rem; color:var(--text-muted);">
        ${currentStars > 0
          ? `✅ Sizning bahoyingiz: <strong>${currentStars} / 5 yulduzcha</strong> — Fikringiz uchun rahmat!`
          : "Yulduzchalardan birini bosib o'z bahoyingizni qoldiring!"}
      </p>
    </div>
  `;
}

function submitModuleRating(mountId, moduleId, starValue) {
  AppState.ratings[moduleId] = starValue;
  try {
    localStorage.setItem("ik_module_ratings", JSON.stringify(AppState.ratings));
  } catch (_) {}
  renderStarRatingWidget(mountId, moduleId);
  renderSubjectsGrid();
}

/* ==========================================================================
   TELECOM & HARDWARE ENCYCLOPEDIA VIEW
   ========================================================================== */
function renderTelecomEncyclopedia() {
  const container = document.getElementById("telecomHardwareGrid");
  if (!container) return;

  container.innerHTML = TELECOM_DEVICES.map(dev => `
    <div class="hardware-card">
      <div>
        <span class="subject-tag">${escapeHtml(dev.category)}</span>
        <h3 style="margin-top:8px; font-size:1.15rem; color:#38bdf8;">${escapeHtml(dev.title)}</h3>
      </div>

      <div class="schematic-box">
        ${dev.svgDiagram}
      </div>

      <p style="font-size:0.88rem; color:var(--text-muted);">${escapeHtml(dev.summary)}</p>

      <table class="specs-table">
        <tr><th>OSI Modeli Pog'onasi:</th><td>${escapeHtml(dev.osiLayer)}</td></tr>
        <tr><th>Tarmoq Turi:</th><td>${escapeHtml(dev.networkType)}</td></tr>
        <tr><th>Ishlash Protokollari:</th><td>${escapeHtml(dev.protocols)}</td></tr>
        <tr><th>Ulanish Vositasi (Kabel/Media):</th><td>${escapeHtml(dev.media)}</td></tr>
        <tr><th>Qaysi Qurilmalarga Ulanadi:</th><td>${escapeHtml(dev.connectsTo)}</td></tr>
        <tr><th>Portlari va Vazifasi:</th><td>${escapeHtml(dev.portsDetail)}</td></tr>
      </table>

      <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-top:auto;">
        <button class="btn btn-primary" onclick="initiateSubjectTest('telecom-networks')">
          🚀 Telekom 30 talik Testni Yechish
        </button>
      </div>
    </div>
  `).join("");

  renderStarRatingWidget("telecomStarRatingMount", "telecom-networks");
}

/* ==========================================================================
   CERTIFICATE & SAMPLE VIEW + MULTI-FORMAT DOWNLOADER
   (PDF, WORD .DOC, PNG, SVG, HTML, TXT, JSON)
   ========================================================================== */
function getCertificateData(isSample = false) {
  const hasUser = AppState.user && AppState.user.firstName;
  const studentFio = (!isSample && hasUser)
    ? `${AppState.user.lastName} ${AppState.user.firstName} ${AppState.user.middleName}`
    : "NAMUNA: Karimov Jasurbek Rustam o'g'li";
  const parentsName = (!isSample && hasUser && AppState.user.parentsNames)
    ? AppState.user.parentsNames
    : "Muhtaram Ota-onasi: Rustam aka va Dilfuza opaga";
  const certId = (!isSample && hasUser)
    ? "IK-CERT-" + hashString(studentFio).toUpperCase()
    : "IK-SAMPLE-2026-0001";
  const issueDate = new Date().toLocaleDateString("uz-UZ");
  const excCount = AppState.stats.excellentCount || 0;

  return { studentFio, parentsName, certId, issueDate, excCount };
}

function renderCertificateView(isSampleMode = false) {
  const data = getCertificateData(isSampleMode);
  const elRecipient = document.getElementById("certRecipientName");
  const elParents = document.getElementById("certParentsGreeting");
  const elDate = document.getElementById("certIssueDate");
  const elCode = document.getElementById("certSerialCode");
  const elStatusNote = document.getElementById("certProgressNotice");

  if (elRecipient) elRecipient.textContent = data.studentFio;
  if (elParents) {
    elParents.innerHTML = `
      <strong>OTA-ONAGA MINNATDORCHILIK NOMASI:</strong><br/>
      Muhtaram <strong>${escapeHtml(data.parentsName)}</strong>!<br/>
      Sizning farzandingiz <strong>${escapeHtml(data.studentFio)}</strong> <em>"IMKONIYATLAR KALITI"</em> xalqaro ta'lim platformasida
      30 talik test sinovlarini <strong>5 marta "A'LO"</strong> bahoga muvaffaqiyatli yakunlab, yuksak bilim va intizom namunasini ko'rsatdi.
      Vatanimiz kelajagi bo'lgan shunday zukko, bilimli va salohiyatli farzandni tarbiyalab voyaga yetkazganingiz uchun
      <strong>"IMKONIYATLAR KALITI"</strong> ma'muriyati va sayt admini (<strong>${ADMIN_EMAIL}</strong>) nomidan Sizga chuqur minnatdorchilik bildiramiz!
    `;
  }
  if (elDate) elDate.textContent = data.issueDate;
  if (elCode) elCode.textContent = data.certId;

  if (elStatusNote) {
    if (AppState.stats.excellentCount >= 5) {
      elStatusNote.innerHTML = `✅ <strong>Rasmiy Sertifikat Faol!</strong> Siz 5 marta A'lo baho talabini bajardingiz (${AppState.stats.excellentCount} ta A'lo). Barcha formatlarda yuklab olishingiz mumkin!`;
    } else {
      elStatusNote.innerHTML = `📌 <strong>Sertifikat Namunasi va Shaxsiy Ko'rinish:</strong> Hozirgi A'lo natijalaringiz: <strong>${AppState.stats.excellentCount} / 5</strong>. Sertifikatni hozirning o'zida namuna yoki o'z ismingiz bilan PDF, Word (.doc), PNG, SVG, HTML, TXT va JSON ko'rinishlarida yuklab olishingiz mumkin!`;
    }
  }
}

function buildCertificateSVGString() {
  const data = getCertificateData(false);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="820" viewBox="0 0 1200 820">
    <defs>
      <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0b132b"/>
        <stop offset="50%" stop-color="#1c2541"/>
        <stop offset="100%" stop-color="#0b132b"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="820" rx="24" fill="url(#bgGrad)" stroke="#fbbf24" stroke-width="12"/>
    <rect x="28" y="28" width="1144" height="764" rx="16" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8 4"/>
    <text x="600" y="95" text-anchor="middle" fill="#fbbf24" font-family="Arial, sans-serif" font-size="34" font-weight="bold">IMKONIYATLAR KALITI — FAXRIY SERTIFIKAT VA TASHAKKURNOMA</text>
    <text x="600" y="135" text-anchor="middle" fill="#cbd5e1" font-family="Arial, sans-serif" font-size="18">5 MARTA "A'LO" BAHOGA BAJARGANLIGI HAMDA OTA-ONASIGA MINNATDORCHILIK SERTIFIKATI</text>
    <text x="600" y="205" text-anchor="middle" fill="#94a3b8" font-family="Arial, sans-serif" font-size="18">Ushbu sertifikat bilan taqdirlanadi:</text>
    <text x="600" y="260" text-anchor="middle" fill="#38bdf8" font-family="Arial, sans-serif" font-size="38" font-weight="bold">${escapeXml(data.studentFio)}</text>
    <line x1="250" y1="280" x2="950" y2="280" stroke="#fbbf24" stroke-width="2"/>
    <rect x="110" y="315" width="980" height="230" rx="14" fill="#111c38" stroke="#f59e0b" stroke-width="2"/>
    <text x="600" y="360" text-anchor="middle" fill="#fbbf24" font-family="Arial, sans-serif" font-size="22" font-weight="bold">MUHTARAM OTA-ONASIGA MINNATDORCHILIK:</text>
    <text x="600" y="400" text-anchor="middle" fill="#fef3c7" font-family="Arial, sans-serif" font-size="20">${escapeXml(data.parentsName)}</text>
    <text x="600" y="445" text-anchor="middle" fill="#e2e8f0" font-family="Arial, sans-serif" font-size="17">Farzandingiz "IMKONIYATLAR KALITI" platformasida 30 talik testlarni 5 marta A'LO bahoga</text>
    <text x="600" y="475" text-anchor="middle" fill="#e2e8f0" font-family="Arial, sans-serif" font-size="17">bajarib, yuksak bilim va intizom namoyon etdi. Shunday bilimli farzand tarbiyalaganingiz uchun</text>
    <text x="600" y="505" text-anchor="middle" fill="#34d399" font-family="Arial, sans-serif" font-size="18" font-weight="bold">IMKONIYATLAR KALITI Admini (${ADMIN_EMAIL}) nomidan chuqur minnatdorchilik bildiramiz!</text>
    <text x="220" y="650" text-anchor="middle" fill="#fbbf24" font-family="Arial, sans-serif" font-size="18" font-weight="bold">Sertifikat ID: ${escapeXml(data.certId)}</text>
    <text x="220" y="680" text-anchor="middle" fill="#cbd5e1" font-family="Arial, sans-serif" font-size="16">Sana: ${escapeXml(data.issueDate)}</text>
    <circle cx="600" cy="655" r="58" fill="#fbbf24" stroke="#ffffff" stroke-width="3"/>
    <text x="600" y="650" text-anchor="middle" fill="#0f172a" font-family="Arial, sans-serif" font-size="13" font-weight="bold">IMKONIYATLAR</text>
    <text x="600" y="670" text-anchor="middle" fill="#0f172a" font-family="Arial, sans-serif" font-size="13" font-weight="bold">KALITI 5x A'LO</text>
    <text x="960" y="650" text-anchor="middle" fill="#38bdf8" font-family="Arial, sans-serif" font-size="18" font-weight="bold">Sayt Admini Imzosi</text>
    <text x="960" y="680" text-anchor="middle" fill="#cbd5e1" font-family="Arial, sans-serif" font-size="16">${ADMIN_EMAIL}</text>
  </svg>`;
}

function downloadCertificate(format) {
  const data = getCertificateData(false);
  const svgStr = buildCertificateSVGString();
  const baseName = `Imkoniyatlar_Kaliti_Sertifikat_${data.certId}`;

  if (format === "svg") {
    triggerBlobDownload(svgStr, `${baseName}.svg`, "image/svg+xml;charset=utf-8");
  } else if (format === "png") {
    const img = new Image();
    const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 820;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      canvas.toBlob(blob => {
        const pngUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = pngUrl;
        a.download = `${baseName}.png`;
        a.click();
        URL.revokeObjectURL(pngUrl);
      }, "image/png");
    };
    img.src = url;
  } else if (format === "doc") {
    const wordHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Minnatdorchilik Sertifikati</title></head>
      <body style="font-family: 'Times New Roman', serif; text-align:center; padding:30px; border: 8px double #d97706;">
        <h1 style="color:#b45309; font-size:28pt;">IMKONIYATLAR KALITI</h1>
        <h2 style="color:#1e3a8a;">FAXRIY SERTIFIKAT VA OTA-ONAGA MINNATDORCHILIK NOMASI</h2>
        <p style="font-size:14pt;">Ushbu sertifikat egasi:</p>
        <h2 style="color:#0284c7; font-size:22pt; text-decoration:underline;">${escapeHtml(data.studentFio)}</h2>
        <p style="font-size:14pt; line-height:1.6;">
          <strong>Muhtaram ${escapeHtml(data.parentsName)}!</strong><br/>
          Sizning farzandingiz <strong>${escapeHtml(data.studentFio)}</strong> "IMKONIYATLAR KALITI" ta'lim platformasida 30 talik test sinovlarini
          <strong>5 marta "A'LO" bahoga</strong> muvaffaqiyatli yakunladi. Shunday bilimli va zukko farzandni tarbiyalaganingiz uchun
          <strong>IMKONIYATLAR KALITI</strong> ma'muriyati va sayt admini (<strong>${ADMIN_EMAIL}</strong>) nomidan Sizga chuqur minnatdorchilik bildiramiz!
        </p>
        <hr/>
        <p><strong>Sertifikat raqami:</strong> ${data.certId} | <strong>Berilgan sana:</strong> ${data.issueDate} | <strong>Admin:</strong> ${ADMIN_EMAIL}</p>
      </body></html>`;
    triggerBlobDownload(wordHtml, `${baseName}.doc`, "application/msword;charset=utf-8");
  } else if (format === "html") {
    const standaloneHtml = `<!DOCTYPE html><html lang="uz"><head><meta charset="utf-8"><title>${escapeHtml(data.studentFio)} - Sertifikat</title></head>
      <body style="margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#070d19;">${svgStr}</body></html>`;
    triggerBlobDownload(standaloneHtml, `${baseName}.html`, "text/html;charset=utf-8");
  } else if (format === "txt") {
    const txt = [
      "====================================================================",
      "         IMKONIYATLAR KALITI - FAXRIY MINNATDORCHILIK SERTIFIKATI   ",
      "====================================================================",
      `Taqdirlanuvchi F.I.Sh.: ${data.studentFio}`,
      `Muhtaram Ota-onasi:     ${data.parentsName}`,
      `Yutuq ko'rsatkichi:     30 talik testlarni 5 marta A'LO bahoga bajargan`,
      `Minnatdorchilik:        IMKONIYATLAR KALITI Admini (${ADMIN_EMAIL}) nomidan`,
      `Sertifikat ID:          ${data.certId}`,
      `Berilgan sana:          ${data.issueDate}`,
      "===================================================================="
    ].join("\r\n");
    triggerBlobDownload(txt, `${baseName}.txt`, "text/plain;charset=utf-8");
  } else if (format === "json") {
    triggerBlobDownload(JSON.stringify({ platform: "IMKONIYATLAR KALITI", admin: ADMIN_EMAIL, certificate: data }, null, 2), `${baseName}.json`, "application/json;charset=utf-8");
  } else if (format === "pdf") {
    const printWin = window.open("", "_blank", "width=1100,height=800");
    if (printWin) {
      printWin.document.write(`<!DOCTYPE html><html><head><title>Sertifikat PDF - ${escapeHtml(data.studentFio)}</title>
        <style>@page { size: landscape; margin: 10mm; } body { margin:0; display:flex; justify-content:center; align-items:center; background:#fff; } svg { width:100%; max-width:1100px; height:auto; }</style>
        </head><body>${svgStr}<script>window.onload=function(){setTimeout(function(){window.print();},300);};<\/script></body></html>`);
      printWin.document.close();
    } else {
      window.print();
    }
  }
}

/* ==========================================================================
   DAILY, WEEKLY, MONTHLY LEADERBOARD (REYTING)
   ========================================================================== */
const DEFAULT_LEADERS = [
  { fio: "Xolmatov Sardorbek Ulug'bek o'g'li", subject: "HTML, CSS, JS & Telekom", score: 30, pct: 100, period: "daily", badge: "🏆 5x A'lo Sertifikat sohibi" },
  { fio: "Qodirova Madinabonu Anvar qizi", subject: "Med Texnikum 2-kurs & Anatomiya", score: 29, pct: 97, period: "daily", badge: "🌟 A'lochi" },
  { fio: "Abdullayev Javohir Bahodir o'g'li", subject: "Nemis tili B2 & Biologiya", score: 29, pct: 97, period: "weekly", badge: "🏆 5x A'lo Sertifikat sohibi" },
  { fio: "Tursunova Dilnoza Rustam qizi", subject: "Kimyo, Biokimyo va Farmakologiya", score: 28, pct: 93, period: "weekly", badge: "🌟 A'lochi" },
  { fio: "Yo'ldoshev Bekzod Shavkat o'g'li", subject: "Python, C++ & L3 Switch/Router", score: 30, pct: 100, period: "monthly", badge: "🏆 5x A'lo Sertifikat sohibi" }
];

function renderLeaderboard(period = "all") {
  const tbody = document.getElementById("leaderboardTableBody");
  if (!tbody) return;

  const userRows = AppState.testHistory.map(h => ({
    fio: h.fio,
    subject: `${h.subjectTitle} (${h.level})`,
    score: h.score,
    pct: h.percentage,
    period: "daily",
    badge: h.score >= 26 ? "🌟 Sizning A'lo natijangiz" : "✅ Sizning natijangiz"
  }));

  const combined = [...userRows, ...DEFAULT_LEADERS]
    .filter(r => period === "all" || r.period === period || period === "daily")
    .sort((a, b) => b.score - a.score);

  tbody.innerHTML = combined.map((row, idx) => `
    <tr>
      <td><strong>#${idx + 1}</strong></td>
      <td><strong>${escapeHtml(row.fio)}</strong></td>
      <td>${escapeHtml(row.subject)}</td>
      <td><span style="color:#34d399; font-weight:800;">${row.score} / 30 (${row.pct}%)</span></td>
      <td><span class="subject-tag">${escapeHtml(row.badge)}</span></td>
    </tr>
  `).join("");
}

/* ==========================================================================
   COMMUNITY FEEDBACK, Q&A & ADMIN DISCUSSION (BILDIRGI VA MUHOKAMA)
   Includes Task Start / Elapsed / End Timestamps & Admin Reply Capability
   ========================================================================== */
let forumDraftStartTime = new Date();

function seedInitialForumPosts() {
  AppState.forumPosts = [
    {
      id: "POST-101",
      author: "Rustamov Abrorbek Jamshid o'g'li",
      role: "Talaba (Med Texnikum 2-kurs)",
      category: "Sayt haqida bildirgi va minnatdorchilik",
      content: "Assalomu alaykum! Imkoniyatlar Kaliti sayti juda ajoyib chiqibdi. Anatomiya, Farmakologiya va Biologiyadan 5 marta A'lo baho olib, ota-onam uchun Minnatdorchilik Sertifikatini PDF va Word formatda yuklab oldim!",
      startTime: "14:10:05",
      elapsedTime: "00:12:40",
      endTime: "14:22:45",
      createdAt: "Bugun",
      replies: [
        {
          author: `Imkoniyatlar Kaliti Admini (${ADMIN_EMAIL})`,
          isAdmin: true,
          text: "Va alaykum assalom, Abrorbek! Yuksak natijangiz bilan tabriklaymiz! Ota-onangizga ham bizning nomimizdan samimiy salom va tashakkurimizni yetkazing. O'qishlaringizda omad!",
          time: "14:25:10"
        }
      ]
    },
    {
      id: "POST-102",
      author: "Ergashev Sardorbek Karim o'g'li",
      role: "Tarmoq Muhandisi",
      category: "Savol-javob (Telekommunikatsiya va IT)",
      content: "L3 Switch, SFP+ modullar, PoE IP kameralar va NVR ulanish chizmalari juda tushunarli qilib berilgan ekan. Hamkasblar, uzoq masofali 20 km optik liniyaga qaysi SFP modulni tavsiya qilasizlar?",
      startTime: "15:02:11",
      elapsedTime: "00:08:19",
      endTime: "15:10:30",
      createdAt: "Bugun",
      replies: [
        {
          author: "Mahmudov Dilshod (Foydalanuvchi)",
          isAdmin: false,
          text: "20 km masofa uchun Single-Mode OS2 optik kabel va 1310nm/1550nm BiDi WDM SFP+ (20km LR) modul eng maqbul yechim!",
          time: "15:14:00"
        },
        {
          author: `Imkoniyatlar Kaliti Admini (${ADMIN_EMAIL})`,
          isAdmin: true,
          text: "To'ppa-to'g'ri! Saytimizning 'Telekom va Qurilmalar Chizmasi' bo'limida SFP/SFP+ va BiDi modullarning to'liq sxemasi ham keltirilgan.",
          time: "15:18:22"
        }
      ]
    }
  ];
  saveForumPosts();
}

function saveForumPosts() {
  try {
    localStorage.setItem("ik_forum_posts", JSON.stringify(AppState.forumPosts));
  } catch (_) {}
}

function renderForumPosts() {
  const listEl = document.getElementById("forumPostsContainer");
  if (!listEl) return;

  listEl.innerHTML = AppState.forumPosts.map((post, pIdx) => `
    <div class="forum-post">
      <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
        <div>
          <strong style="color:#38bdf8; font-size:1.02rem;">👤 ${escapeHtml(post.author)}</strong>
          <span class="subject-tag" style="margin-left:8px;">${escapeHtml(post.category)}</span>
        </div>
        <div style="font-size:0.78rem; color:var(--text-dim); font-family:monospace;">
          ⏱️ Boshladi: ${escapeHtml(post.startTime)} | Bajardi: ${escapeHtml(post.elapsedTime)} | Tugatdi: ${escapeHtml(post.endTime)}
        </div>
      </div>

      <p style="margin-bottom:12px;">${escapeHtml(post.content)}</p>

      <div id="replies_${post.id}">
        ${(post.replies || []).map(rep => `
          <div class="forum-reply ${rep.isAdmin ? "admin-reply" : ""}">
            <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:4px;">
              <strong style="color:${rep.isAdmin ? "#fbbf24" : "#34d399"};">
                ${rep.isAdmin ? "👑 " : "💬 "}${escapeHtml(rep.author)}
              </strong>
              <span style="color:var(--text-dim);">${escapeHtml(rep.time)}</span>
            </div>
            <p style="font-size:0.9rem;">${escapeHtml(rep.text)}</p>
          </div>
        `).join("")}
      </div>

      <!-- Reply Form for both Users and Admin -->
      <div style="margin-top:12px; display:flex; gap:8px; flex-wrap:wrap;">
        <input type="text" id="replyInput_${pIdx}" class="form-input" style="flex:1; min-width:220px; padding:8px 12px;" placeholder="Ushbu bildirgiga foydalanuvchi yoki Admin sifatida javob yozing...">
        <button class="btn btn-secondary" onclick="addForumReply(${pIdx}, false)">💬 Foydalanuvchi javobi</button>
        <button class="btn btn-gold" onclick="addForumReply(${pIdx}, true)">👑 Admin (${ADMIN_EMAIL}) javobi</button>
      </div>
    </div>
  `).join("");
}

function handleNewForumPost(e) {
  e.preventDefault();
  const textEl = document.getElementById("forumMessageInput");
  const catEl = document.getElementById("forumCategorySelect");
  const text = textEl.value.trim();
  if (!text) return;

  const now = new Date();
  const elapsedSec = Math.max(1, Math.floor((now - forumDraftStartTime) / 1000));
  const authorName = (AppState.user && AppState.user.firstName)
    ? `${AppState.user.lastName} ${AppState.user.firstName} ${AppState.user.middleName}`
    : (document.getElementById("forumAuthorInput").value.trim() || "Faol Foydalanuvchi");

  const newPost = {
    id: "POST-" + Date.now(),
    author: authorName,
    role: "Foydalanuvchi",
    category: catEl.value,
    content: text,
    startTime: forumDraftStartTime.toLocaleTimeString(),
    elapsedTime: formatDuration(elapsedSec),
    endTime: now.toLocaleTimeString(),
    createdAt: now.toLocaleDateString(),
    replies: []
  };

  AppState.forumPosts.unshift(newPost);
  saveForumPosts();
  textEl.value = "";
  forumDraftStartTime = new Date();
  renderForumPosts();
}

function addForumReply(postIndex, asAdmin) {
  const input = document.getElementById(`replyInput_${postIndex}`);
  if (!input || !input.value.trim()) return;

  const userAuthor = (AppState.user && AppState.user.firstName)
    ? `${AppState.user.lastName} ${AppState.user.firstName}`
    : "Foydalanuvchi";

  AppState.forumPosts[postIndex].replies.push({
    author: asAdmin ? `Imkoniyatlar Kaliti Admini (${ADMIN_EMAIL})` : userAuthor,
    isAdmin: asAdmin,
    text: input.value.trim(),
    time: new Date().toLocaleTimeString()
  });

  saveForumPosts();
  renderForumPosts();
}

/* ==========================================================================
   UTILITIES
   ========================================================================== */
function triggerBlobDownload(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeXml(str) {
  return escapeHtml(str).replace(/'/g, "&apos;");
}

/* ==========================================================================
   DOM READY BOOTSTRAP
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  initLiveTopbar();
  setLanguage(currentLang);
  updateDashboardStatsUI();
  renderSubjectsGrid();
  renderTelecomEncyclopedia();
  renderLeaderboard("all");
  renderCertificateView(false);
  renderForumPosts();

  // Active study time counter (updates every second)
  setInterval(() => {
    AppState.stats.activeSeconds++;
    if (AppState.stats.activeSeconds % 5 === 0) saveStats();
    const elTime = document.getElementById("statActiveTimeVal");
    if (elTime) {
      const mins = Math.floor(AppState.stats.activeSeconds / 60);
      const secs = AppState.stats.activeSeconds % 60;
      elTime.textContent = `${mins} daq ${secs} soniya`;
    }
  }, 1000);

  // Category filter buttons
  document.querySelectorAll(".cat-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".cat-pill").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      AppState.currentCategory = btn.dataset.cat;
      renderSubjectsGrid();
    });
  });

  // Search box
  const searchInput = document.getElementById("globalSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      AppState.searchQuery = e.target.value;
      renderSubjectsGrid();
    });
  }

  window.onLanguageChanged = () => {
    renderSubjectsGrid();
    if (AppState.activeTest) renderActiveTestUI();
  };
});
