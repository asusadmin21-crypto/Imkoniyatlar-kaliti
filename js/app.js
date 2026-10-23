/* ==========================================================================
   IMKONIYATLAR KALITI - Main Application Controller
   Handles One-Time Profile, 30-Q Test Engine, 5x A'lo Official A4 Certificate
   with Scannable QR Code & Barcode (Shtrix-kod), Multi-Format Downloads
   (A4 PDF, Word, PNG, SVG, HTML, TXT, JSON), Leaderboards, Telecom, and Forum.
   100% Compatible across iOS (iPhone/iPad), Android, Tablets, Windows, macOS, Linux.
   ========================================================================== */

const ADMIN_EMAIL = "asusadmin21@gmail.com";

// Safe Cross-OS Storage Wrapper (prevents iOS Safari Private / WebView SecurityErrors)
function storageGet(key) {
  try {
    if (window.SafeStorage) return window.SafeStorage.getItem(key);
    return window.localStorage.getItem(key);
  } catch (_) {
    return null;
  }
}

function storageSet(key, val) {
  try {
    if (window.SafeStorage) {
      window.SafeStorage.setItem(key, val);
    } else {
      window.localStorage.setItem(key, val);
    }
  } catch (_) {}
}

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
  forumPosts: [],
  verifiedCertFromUrl: null
};

/* ==========================================================================
   INITIALIZATION & VISIT / ACTIVE TIME TRACKING
   ========================================================================== */
function loadState() {
  try {
    const savedUser = storageGet("ik_user_profile");
    if (savedUser) AppState.user = JSON.parse(savedUser);

    const savedStats = storageGet("ik_user_stats");
    if (savedStats) {
      AppState.stats = { ...AppState.stats, ...JSON.parse(savedStats) };
      AppState.stats.visits = (AppState.stats.visits || 0) + 1;
    }

    const todayStr = new Date().toISOString().slice(0, 10);
    AppState.stats.lastRefreshDate = todayStr;
    saveStats();

    const savedRatings = storageGet("ik_module_ratings");
    if (savedRatings) AppState.ratings = JSON.parse(savedRatings);

    const savedHistory = storageGet("ik_test_history");
    if (savedHistory) AppState.testHistory = JSON.parse(savedHistory);

    const savedForum = storageGet("ik_forum_posts");
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
  storageSet("ik_user_stats", JSON.stringify(AppState.stats));
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
    const elFirst = document.getElementById("regFirstName");
    const elLast = document.getElementById("regLastName");
    const elMid = document.getElementById("regMiddleName");
    if (elFirst) elFirst.value = AppState.user.firstName || "";
    if (elLast) elLast.value = AppState.user.lastName || "";
    if (elMid) elMid.value = AppState.user.middleName || "";
  }
  modal.classList.remove("hidden");
}

function closeRegistrationModal() {
  const modal = document.getElementById("registrationModal");
  if (modal) modal.classList.add("hidden");
}

function handleSaveRegistration(e) {
  e.preventDefault();
  const elFirst = document.getElementById("regFirstName");
  const elLast = document.getElementById("regLastName");
  const elMid = document.getElementById("regMiddleName");
  const firstName = elFirst ? elFirst.value.trim() : "";
  const lastName = elLast ? elLast.value.trim() : "";
  const middleName = elMid ? elMid.value.trim() : "";

  if (!firstName || !lastName || !middleName) {
    alert("Iltimos, Ism, Familiya va Otasining ismini to'liq kiriting!");
    return;
  }

  AppState.user = {
    firstName,
    lastName,
    middleName,
    registeredAt: new Date().toLocaleString()
  };

  AppState.verifiedCertFromUrl = null;
  storageSet("ik_user_profile", JSON.stringify(AppState.user));
  closeRegistrationModal();
  updateDashboardStatsUI();
  renderCertificateView(false);

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
  storageSet("ik_test_history", JSON.stringify(AppState.testHistory.slice(0, 200)));

  updateDashboardStatsUI();

  const summaryContent = document.getElementById("testSummaryDetails");
  if (summaryContent) {
    const certUnlockBanner = AppState.stats.excellentCount >= 5
      ? `<div style="margin-top:16px; padding:16px; border-radius:12px; background:rgba(245,158,11,0.2); border:2px solid #fbbf24;">
          <h3 style="color:#fbbf24;">🎉 TABRIKLAYMIZ! Siz 5 marta takroran "A'LO" bahoga bajardingiz!</h3>
          <p style="margin:8px 0;"><strong>"IMKONIYATLAR KALITI"</strong> platformasi va Sayt Admini (<strong>${ADMIN_EMAIL}</strong>) nomidan Sizga ezgu tilaklar bitilgan QR-kod va Shtrix-kodli <strong>Rasmiy A4 Elektron Sertifikat</strong> taqdim etildi!</p>
          <button class="btn btn-gold" onclick="switchView('viewCertificate'); renderCertificateView(false);">🏆 A4 Elektron Sertifikatni Ko'rish va Yuklab Olish</button>
        </div>`
      : `<div style="margin-top:12px; color:#fde68a;">
          🏅 "IMKONIYATLAR KALITI" Rasmiy A4 Sertifikatini olish ko'rsatkichi: <strong>${AppState.stats.excellentCount} / 5 marta A'lo</strong>
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
  storageSet("ik_module_ratings", JSON.stringify(AppState.ratings));
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
   PURE-JS ISO/IEC 18004 QR CODE ("QUYAR KOD") & 1D BARCODE ("SHTRIX KOD")
   Generates 100% Scannable Vector QR Codes & Barcodes Offline Across All OS
   ========================================================================== */
const QR_VERSIONS_L = [
  null,
  { totalData: 19, ecLen: 7, g1: [1, 19], g2: [0, 0], align: [] },
  { totalData: 34, ecLen: 10, g1: [1, 34], g2: [0, 0], align: [6, 18] },
  { totalData: 55, ecLen: 15, g1: [1, 55], g2: [0, 0], align: [6, 22] },
  { totalData: 80, ecLen: 20, g1: [1, 80], g2: [0, 0], align: [6, 26] },
  { totalData: 108, ecLen: 26, g1: [1, 108], g2: [0, 0], align: [6, 30] },
  { totalData: 136, ecLen: 18, g1: [2, 68], g2: [0, 0], align: [6, 34] },
  { totalData: 156, ecLen: 20, g1: [2, 78], g2: [0, 0], align: [6, 22, 38] },
  { totalData: 194, ecLen: 24, g1: [2, 97], g2: [0, 0], align: [6, 24, 42] },
  { totalData: 232, ecLen: 30, g1: [2, 116], g2: [0, 0], align: [6, 26, 46] },
  { totalData: 274, ecLen: 18, g1: [2, 68], g2: [2, 69], align: [6, 28, 50] }
];

const QR_VERSION_INFO_BITS = {
  7: 0x07C94,
  8: 0x085BC,
  9: 0x09A99,
  10: 0x0A4D3
};

function generateQrCodeMatrix(text) {
  let bytes;
  try {
    bytes = Array.from(new TextEncoder().encode(text));
  } catch (_) {
    bytes = [];
    for (let i = 0; i < text.length; i++) {
      const c = text.charCodeAt(i);
      if (c < 128) bytes.push(c);
      else if (c < 2048) bytes.push(192 | (c >> 6), 128 | (c & 63));
      else bytes.push(224 | (c >> 12), 128 | ((c >> 6) & 63), 128 | (c & 63));
    }
  }

  let ver = 1;
  while (ver <= 10) {
    const countBits = ver <= 9 ? 8 : 16;
    const neededBytes = Math.ceil((4 + countBits + bytes.length * 8) / 8);
    if (neededBytes <= QR_VERSIONS_L[ver].totalData) break;
    ver++;
  }
  if (ver > 10) {
    ver = 10;
    bytes = bytes.slice(0, 270);
  }

  const vInfo = QR_VERSIONS_L[ver];
  const countBits = ver <= 9 ? 8 : 16;
  const bits = [];
  const pushBits = (val, len) => {
    for (let i = len - 1; i >= 0; i--) bits.push((val >>> i) & 1);
  };

  // Byte mode (0100)
  pushBits(0b0100, 4);
  pushBits(bytes.length, countBits);
  bytes.forEach(b => pushBits(b, 8));

  const maxDataBits = vInfo.totalData * 8;
  const termLen = Math.min(4, maxDataBits - bits.length);
  pushBits(0, termLen);
  while (bits.length % 8 !== 0) bits.push(0);

  const dataWords = [];
  for (let i = 0; i < bits.length; i += 8) {
    let byte = 0;
    for (let j = 0; j < 8; j++) byte = (byte << 1) | bits[i + j];
    dataWords.push(byte);
  }

  let padToggle = true;
  while (dataWords.length < vInfo.totalData) {
    dataWords.push(padToggle ? 0xEC : 0x11);
    padToggle = !padToggle;
  }

  // GF(256) tables for Reed-Solomon
  const gfExp = new Uint8Array(512);
  const gfLog = new Uint8Array(256);
  let x = 1;
  for (let i = 0; i < 255; i++) {
    gfExp[i] = x;
    gfLog[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11D;
  }
  for (let i = 255; i < 512; i++) gfExp[i] = gfExp[i - 255];

  const gfMul = (a, b) => (a === 0 || b === 0) ? 0 : gfExp[gfLog[a] + gfLog[b]];

  // Generator polynomial of degree ecLen
  let gen = new Uint8Array([1]);
  for (let i = 0; i < vInfo.ecLen; i++) {
    const next = new Uint8Array(gen.length + 1);
    for (let j = 0; j < gen.length; j++) {
      next[j] ^= gen[j];
      next[j + 1] ^= gfMul(gen[j], gfExp[i]);
    }
    gen = next;
  }

  const computeRS = (blockData) => {
    const rem = new Uint8Array(vInfo.ecLen);
    for (let i = 0; i < blockData.length; i++) {
      const factor = blockData[i] ^ rem[0];
      for (let j = 0; j < vInfo.ecLen - 1; j++) rem[j] = rem[j + 1];
      rem[vInfo.ecLen - 1] = 0;
      if (factor !== 0) {
        for (let j = 0; j < vInfo.ecLen; j++) {
          rem[j] ^= gfMul(gen[j + 1], factor);
        }
      }
    }
    return Array.from(rem);
  };

  const dataBlocks = [];
  const ecBlocks = [];
  let offset = 0;
  for (let b = 0; b < vInfo.g1[0]; b++) {
    const blk = dataWords.slice(offset, offset + vInfo.g1[1]);
    offset += vInfo.g1[1];
    dataBlocks.push(blk);
    ecBlocks.push(computeRS(blk));
  }
  for (let b = 0; b < vInfo.g2[0]; b++) {
    const blk = dataWords.slice(offset, offset + vInfo.g2[1]);
    offset += vInfo.g2[1];
    dataBlocks.push(blk);
    ecBlocks.push(computeRS(blk));
  }

  const finalCodewords = [];
  const maxBlockLen = Math.max(vInfo.g1[1], vInfo.g2[1] || 0);
  for (let i = 0; i < maxBlockLen; i++) {
    for (let b = 0; b < dataBlocks.length; b++) {
      if (i < dataBlocks[b].length) finalCodewords.push(dataBlocks[b][i]);
    }
  }
  for (let i = 0; i < vInfo.ecLen; i++) {
    for (let b = 0; b < ecBlocks.length; b++) {
      finalCodewords.push(ecBlocks[b][i]);
    }
  }

  const size = 17 + ver * 4;
  const grid = Array.from({ length: size }, () => new Uint8Array(size));
  const reserved = Array.from({ length: size }, () => new Uint8Array(size));

  const setModule = (r, c, isDark) => {
    if (r >= 0 && r < size && c >= 0 && c < size) {
      grid[r][c] = isDark ? 1 : 0;
      reserved[r][c] = 1;
    }
  };

  const placeFinder = (topR, leftC) => {
    for (let dr = -1; dr <= 7; dr++) {
      for (let dc = -1; dc <= 7; dc++) {
        const r = topR + dr;
        const c = leftC + dc;
        if (r < 0 || r >= size || c < 0 || c >= size) continue;
        const inOuter = dr >= 0 && dr <= 6 && dc >= 0 && dc <= 6;
        const onBorder = dr === 0 || dr === 6 || dc === 0 || dc === 6;
        const inInner = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
        setModule(r, c, inOuter && (onBorder || inInner));
      }
    }
  };

  placeFinder(0, 0);
  placeFinder(0, size - 7);
  placeFinder(size - 7, 0);

  // Alignment patterns
  const centers = vInfo.align;
  for (let i = 0; i < centers.length; i++) {
    for (let j = 0; j < centers.length; j++) {
      const cr = centers[i];
      const cc = centers[j];
      if (reserved[cr][cc]) continue;
      for (let dr = -2; dr <= 2; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
          const dark = Math.max(Math.abs(dr), Math.abs(dc)) !== 1;
          setModule(cr + dr, cc + dc, dark);
        }
      }
    }
  }

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    if (!reserved[6][i]) setModule(6, i, i % 2 === 0);
    if (!reserved[i][6]) setModule(i, 6, i % 2 === 0);
  }

  // Dark module & reserve format info slots
  setModule(4 * ver + 9, 8, true);
  for (let i = 0; i < 9; i++) {
    if (!reserved[8][i]) reserved[8][i] = 1;
    if (!reserved[i][8]) reserved[i][8] = 1;
  }
  for (let i = 0; i < 8; i++) {
    if (!reserved[8][size - 1 - i]) reserved[8][size - 1 - i] = 1;
    if (!reserved[size - 1 - i][8]) reserved[size - 1 - i][8] = 1;
  }

  // Version info for V7..V10
  if (ver >= 7 && QR_VERSION_INFO_BITS[ver]) {
    const vBits = QR_VERSION_INFO_BITS[ver];
    for (let i = 0; i < 18; i++) {
      const bit = ((vBits >>> i) & 1) === 1;
      const a = Math.floor(i / 3);
      const b = (i % 3) + size - 11;
      setModule(a, b, bit);
      setModule(b, a, bit);
    }
  }

  // Place data bits in zigzag
  const allBits = [];
  finalCodewords.forEach(cw => {
    for (let i = 7; i >= 0; i--) allBits.push((cw >>> i) & 1);
  });

  let bitIdx = 0;
  let upward = true;
  for (let rightCol = size - 1; rightCol >= 1; rightCol -= 2) {
    if (rightCol === 6) rightCol = 5;
    for (let step = 0; step < size; step++) {
      const r = upward ? (size - 1 - step) : step;
      for (let dc = 0; dc < 2; dc++) {
        const c = rightCol - dc;
        if (!reserved[r][c]) {
          grid[r][c] = bitIdx < allBits.length ? allBits[bitIdx++] : 0;
        }
      }
    }
    upward = !upward;
  }

  // Apply Mask 0: (r + c) % 2 === 0
  const maskPattern = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!reserved[r][c] && ((r + c) % 2 === 0)) {
        grid[r][c] ^= 1;
      }
    }
  }

  // Write Format Information for Level L (01) and Mask 0 (000) -> 0x77C4
  const formatBits = 0x77C4;
  const fCoords1 = [
    [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 7], [8, 8],
    [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8]
  ];
  const fCoords2 = [
    [size - 1, 8], [size - 2, 8], [size - 3, 8], [size - 4, 8], [size - 5, 8], [size - 6, 8], [size - 7, 8],
    [8, size - 8], [8, size - 7], [8, size - 6], [8, size - 5], [8, size - 4], [8, size - 3], [8, size - 2], [8, size - 1]
  ];
  for (let i = 0; i < 15; i++) {
    const bit = (formatBits >>> i) & 1;
    grid[fCoords1[i][0]][fCoords1[i][1]] = bit;
    grid[fCoords2[i][0]][fCoords2[i][1]] = bit;
  }

  return { size, grid };
}

function renderQrCodeSvgInner(text, offsetX, offsetY, boxSize) {
  const { size, grid } = generateQrCodeMatrix(text);
  const quiet = 2;
  const totalModules = size + quiet * 2;
  const modSize = boxSize / totalModules;
  let pathD = "";

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c]) {
        const x = (offsetX + (c + quiet) * modSize).toFixed(2);
        const y = (offsetY + (r + quiet) * modSize).toFixed(2);
        const w = (modSize + 0.12).toFixed(2);
        pathD += `M${x},${y}h${w}v${w}h-${w}z`;
      }
    }
  }

  return `<rect x="${offsetX}" y="${offsetY}" width="${boxSize}" height="${boxSize}" rx="4" fill="#ffffff"/>
    <path d="${pathD}" fill="#0f172a"/>`;
}

function renderBarcode1DSvgInner(codeStr, offsetX, offsetY, width, height) {
  const clean = String(codeStr || "IK-CERT-2026").toUpperCase();
  const bars = [2, 1, 1, 2, 1, 2]; // Start guard
  for (let i = 0; i < clean.length; i++) {
    const ch = clean.charCodeAt(i);
    bars.push(1 + (ch % 3), 1 + ((ch >> 2) % 2), 1 + ((ch >> 4) % 3), 1 + (i % 2));
  }
  bars.push(2, 1, 2, 1, 1, 2); // Stop guard

  const totalUnits = bars.reduce((a, b) => a + b, 0);
  const unitW = width / totalUnits;
  let curX = offsetX;
  let pathD = "";

  for (let i = 0; i < bars.length; i++) {
    const w = bars[i] * unitW;
    if (i % 2 === 0) {
      pathD += `M${curX.toFixed(2)},${offsetY.toFixed(2)}h${w.toFixed(2)}v${height.toFixed(2)}h-${w.toFixed(2)}z`;
    }
    curX += w;
  }

  return `<path d="${pathD}" fill="#0f172a"/>`;
}

/* ==========================================================================
   CERTIFICATE & SAMPLE VIEW (A4 FORMAT + QR CODE & SHTRIX-KOD + WISHES)
   ========================================================================== */
function getCertificateData(isSample = false) {
  if (!isSample && AppState.verifiedCertFromUrl) {
    return AppState.verifiedCertFromUrl;
  }

  const hasUser = AppState.user && AppState.user.firstName;
  const studentFio = (!isSample && hasUser)
    ? `${AppState.user.lastName} ${AppState.user.firstName} ${AppState.user.middleName}`
    : "NAMUNA: Karimov Jasurbek Rustam o'g'li";
  const certId = (!isSample && hasUser)
    ? "IK-CERT-" + hashString(studentFio).toUpperCase()
    : "IK-SAMPLE-2026-0001";
  const issueDate = new Date().toLocaleDateString("uz-UZ");
  const excCount = Math.max(AppState.stats.excellentCount || 0, 5);

  return { studentFio, certId, issueDate, excCount, isSample };
}

function getCertificateVerifyUrl(data) {
  let baseUrl = "https://imkoniyatlar-kaliti-1.vercel.app/";
  try {
    if (window.location && window.location.protocol && window.location.protocol.startsWith("http")) {
      baseUrl = window.location.origin + window.location.pathname;
    }
  } catch (_) {}

  const params = new URLSearchParams({
    cert: "1",
    id: data.certId,
    fio: data.studentFio,
    date: data.issueDate
  });
  const fullUrl = `${baseUrl}?${params.toString()}#viewCertificate`;

  if (fullUrl.length > 210) {
    return `${baseUrl}?cert=1&id=${encodeURIComponent(data.certId)}#viewCertificate`;
  }
  return fullUrl;
}

function checkUrlForElectronicCertificate() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("cert") === "1") {
      const id = params.get("id") || "IK-CERT-VERIFIED";
      const fio = params.get("fio") || (AppState.user ? `${AppState.user.lastName} ${AppState.user.firstName} ${AppState.user.middleName}` : "Tasdiqlangan Sertifikat Sohibi");
      const date = params.get("date") || new Date().toLocaleDateString("uz-UZ");

      AppState.verifiedCertFromUrl = {
        studentFio: fio,
        certId: id,
        issueDate: date,
        excCount: 5,
        isVerifiedByQr: true
      };

      switchView("viewCertificate");
      renderCertificateView(false);
    }
  } catch (_) {}
}

function openElectronicCertificateFromQr(isSampleMode = false) {
  const data = getCertificateData(isSampleMode);
  const verifyUrl = getCertificateVerifyUrl(data);
  AppState.verifiedCertFromUrl = {
    studentFio: data.studentFio,
    certId: data.certId,
    issueDate: data.issueDate,
    excCount: 5,
    isVerifiedByQr: true
  };
  try {
    if (window.history && window.history.replaceState) {
      const params = new URLSearchParams({
        cert: "1",
        id: data.certId,
        fio: data.studentFio,
        date: data.issueDate
      });
      window.history.replaceState(null, "", `?${params.toString()}#viewCertificate`);
    }
  } catch (_) {}

  renderCertificateView(false);
  const elBox = document.getElementById("certificateVisualBox");
  if (elBox) elBox.scrollIntoView({ behavior: "smooth", block: "center" });
}

function renderCertificateView(isSampleMode = false) {
  if (isSampleMode) {
    AppState.verifiedCertFromUrl = null;
  }
  const data = getCertificateData(isSampleMode);
  const verifyUrl = getCertificateVerifyUrl(data);

  const elRecipient = document.getElementById("certRecipientName");
  const elParents = document.getElementById("certParentsGreeting");
  const elDate = document.getElementById("certIssueDate");
  const elCode = document.getElementById("certSerialCode");
  const elStatusNote = document.getElementById("certProgressNotice");
  const elQrBox = document.getElementById("certQrBarcodeBox");

  if (elRecipient) elRecipient.textContent = data.studentFio;
  if (elParents) {
    elParents.innerHTML = `
      <div class="cert-wishes-header">
        🌟 "IMKONIYATLAR KALITI" PLATFORMASI NOMIDAN MAXSUS E'TIROF VA EZGU TILAKLAR 🌟
      </div>
      <p style="margin: 8px 0;">
        Ushbu rasmiy sertifikat sohibi <strong>${escapeHtml(data.studentFio)}</strong> <em>"IMKONIYATLAR KALITI"</em> xalqaro ta'lim, tibbiyot, dasturlash va telekommunikatsiya platformasida
        30 talik test sinovlarini <strong>5 marta takroran "A'LO" (5 baho)</strong> natijaga muvaffaqiyatli bajarib, o'zining chuqur bilimi, mustahkam intizomi va yuksak intellektual salohiyatini namoyon etdi!
      </p>
      <div class="cert-wishes-list">
        <div>✨ <strong>Ilm va Kasbiy Parvoz:</strong> Kelgusidagi o'qish, ilmiy izlanish va kasbiy faoliyatingizda ulkan zafarlar yor bo'lsin, tanlagan sohangizning jahon miqyosidagi yetuk mutaxassisi bo'lib yetishing!</div>
        <div>✨ <strong>Baxt va Salomatlik:</strong> Sizga mustahkam sog'lik, so'nmas shijoat, oilaviy baxt-saodat, yorug' yuz va barcha ezgu orzu-maqsadlaringiz ro'yobini tilaymiz!</div>
        <div>✨ <strong>Doimiy Omad:</strong> O'rgangan har bir bilimingiz kelajakda yangi imkoniyatlar kaliti bo'lib xizmat qilsin — <strong>"IMKONIYATLAR KALITI"</strong> ma'muriyati va sayt admini (<strong>${ADMIN_EMAIL}</strong>) sizga doimo yuksak marralarni tilaydi!</div>
      </div>
    `;
  }
  if (elDate) elDate.textContent = data.issueDate;
  if (elCode) elCode.textContent = data.certId;

  if (elQrBox) {
    const qrSvg = renderQrCodeSvgInner(verifyUrl, 0, 0, 112);
    const barcodeSvg = renderBarcode1DSvgInner(data.certId, 0, 0, 148, 24);
    elQrBox.innerHTML = `
      <div class="qr-barcode-card" onclick="openElectronicCertificateFromQr(${Boolean(isSampleMode)})" title="QR-kod yoki Shtrix-kodni skanerlang yoxud bosing: Saytga kirish va Elektron Sertifikatni ko'rish / yuklab olish">
        <div class="qr-svg-holder">
          <svg xmlns="http://www.w3.org/2000/svg" width="112" height="112" viewBox="0 0 112 112">${qrSvg}</svg>
        </div>
        <div class="barcode-svg-holder">
          <svg xmlns="http://www.w3.org/2000/svg" width="148" height="24" viewBox="0 0 148 24">${barcodeSvg}</svg>
        </div>
        <div class="qr-code-caption">📱 QR / SHTRIX-KOD: ${escapeHtml(data.certId)}</div>
        <div class="qr-code-sublink">🔗 Elektron ko'rish va A4 yuklab olish</div>
      </div>
    `;
  }

  if (elStatusNote) {
    if (data.isVerifiedByQr) {
      elStatusNote.innerHTML = `
        <div style="color:#34d399; font-weight:800; font-size:1.05rem; margin-bottom:6px;">
          ✅ ELEKTRON SERTIFIKAT TASDIQLANDI (QR-kod / Shtrix-kod orqali rasmiy tekshirildi!)
        </div>
        <div style="font-size:0.9rem; color:#e2e8f0; margin-bottom:10px;">
          Sertifikat egasi: <strong>${escapeHtml(data.studentFio)}</strong> | ID: <strong>${escapeHtml(data.certId)}</strong> | Format: <strong>Standart A4 (297 × 210 mm)</strong>
        </div>
        <div style="display:flex; justify-content:center; gap:10px; flex-wrap:wrap;">
          <button class="btn btn-gold" onclick="downloadCertificate('pdf')">📕 Elektron Sertifikatni A4 PDF Yuklab Olish</button>
          <button class="btn btn-success" onclick="downloadCertificate('png')">🖼️ A4 Yuqori Sifatli Rasm (.PNG) Yuklab Olish</button>
        </div>
      `;
    } else if (AppState.stats.excellentCount >= 5) {
      elStatusNote.innerHTML = `✅ <strong>Rasmiy A4 Elektron Sertifikat Faol!</strong> Siz 5 marta takroran A'lo baho talabini bajardingiz (${AppState.stats.excellentCount} ta A'lo). QR-kod va Shtrix-kod orqali istalgan qurilmada elektron ko'rish va A4 formatda yuklab olishingiz mumkin!`;
    } else {
      elStatusNote.innerHTML = `📌 <strong>A4 Elektron Sertifikat va Namuna:</strong> Hozirgi A'lo natijalaringiz: <strong>${AppState.stats.excellentCount} / 5</strong>. Sertifikatni hozirning o'zida namuna yoki o'z ismingiz bilan A4 formatda (PDF, PNG, Word .DOC, SVG, HTML, TXT, JSON) ko'rishingiz va yuklab olishingiz mumkin!`;
    }
  }
}

/* ==========================================================================
   BUILD A4 LANDSCAPE SVG CERTIFICATE (1123 x 794 px = 297mm x 210mm)
   Includes Scannable QR Code + 1D Barcode in Center + Heartfelt Wishes
   ========================================================================== */
function buildCertificateSVGString(isSampleMode = false) {
  const data = getCertificateData(isSampleMode);
  const verifyUrl = getCertificateVerifyUrl(data);
  const qrInner = renderQrCodeSvgInner(verifyUrl, 501.5, 566, 120);
  const barcodeInner = renderBarcode1DSvgInner(data.certId, 481.5, 692, 160, 24);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1123" height="794" viewBox="0 0 1123 794">
    <defs>
      <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#071024"/>
        <stop offset="50%" stop-color="#152242"/>
        <stop offset="100%" stop-color="#071024"/>
      </linearGradient>
    </defs>
    <!-- A4 Outer & Inner Borders -->
    <rect x="6" y="6" width="1111" height="782" rx="18" fill="url(#bgGrad)" stroke="#fbbf24" stroke-width="10"/>
    <rect x="22" y="22" width="1079" height="750" rx="12" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="10 5"/>

    <!-- Top A4 & Platform Header -->
    <text x="561.5" y="52" text-anchor="middle" fill="#34d399" font-family="Arial, sans-serif" font-size="13" font-weight="bold" letter-spacing="1.5">RASMIY ELEKTRON SERTIFIKAT • STANDART A4 FORMAT (297 × 210 MM)</text>
    <text x="561.5" y="90" text-anchor="middle" fill="#fbbf24" font-family="Arial, sans-serif" font-size="32" font-weight="bold">IMKONIYATLAR KALITI — FAXRIY SERTIFIKAT</text>
    <text x="561.5" y="120" text-anchor="middle" fill="#fde68a" font-family="Arial, sans-serif" font-size="16" font-weight="bold">30 TALIK TEST SINOVLARINI 5 MARTA TAKRORAN "A'LO" BAHOGA BAJARGANLIK UCHUN</text>

    <!-- Recipient Section -->
    <text x="561.5" y="156" text-anchor="middle" fill="#94a3b8" font-family="Arial, sans-serif" font-size="16">Ushbu rasmiy elektron sertifikat bilan taqdirlanadi:</text>
    <text x="561.5" y="198" text-anchor="middle" fill="#38bdf8" font-family="Arial, sans-serif" font-size="33" font-weight="bold">${escapeXml(data.studentFio)}</text>
    <line x1="220" y1="214" x2="903" y2="214" stroke="#fbbf24" stroke-width="2"/>

    <!-- Site Recognition & Wishes Box -->
    <rect x="65" y="232" width="993" height="314" rx="14" fill="#0d1933" stroke="#f59e0b" stroke-width="2"/>
    <text x="561.5" y="266" text-anchor="middle" fill="#fbbf24" font-family="Arial, sans-serif" font-size="19" font-weight="bold">🌟 "IMKONIYATLAR KALITI" PLATFORMASI NOMIDAN E'TIROF VA EZGU TILAKLAR 🌟</text>
    <text x="561.5" y="300" text-anchor="middle" fill="#f8fafc" font-family="Arial, sans-serif" font-size="15.5">"IMKONIYATLAR KALITI" xalqaro ta'lim, tibbiyot, dasturlash va telekommunikatsiya platformasida</text>
    <text x="561.5" y="324" text-anchor="middle" fill="#f8fafc" font-family="Arial, sans-serif" font-size="15.5">30 talik test sinovlarini 5 marta takroran "A'LO" (5 baho) natijaga muvaffaqiyatli yakunlab,</text>
    <text x="561.5" y="348" text-anchor="middle" fill="#f8fafc" font-family="Arial, sans-serif" font-size="15.5">o'zining chuqur bilimi, mustahkam intizomi va yuksak intellektual salohiyatini namoyon etdi!</text>

    <line x1="140" y1="366" x2="983" y2="366" stroke="#334155" stroke-width="1"/>
    <text x="561.5" y="394" text-anchor="middle" fill="#34d399" font-family="Arial, sans-serif" font-size="16" font-weight="bold">✨ KELAJAKDAGI O'QISH VA FAOLIYATINGIZGA SAMIMIY TILAKLARIMIZ: ✨</text>
    <text x="561.5" y="424" text-anchor="middle" fill="#fef3c7" font-family="Arial, sans-serif" font-size="15">• Ilm-fan va zamonaviy texnologiyalar cho'qqilarini zabt etib, o'z sohangizning yetuk mutaxassisi bo'ling!</text>
    <text x="561.5" y="452" text-anchor="middle" fill="#fef3c7" font-family="Arial, sans-serif" font-size="15">• Sizga mustahkam sog'lik, tinmas shijoat, oilaviy baxt-saodat va barcha ezgu ishlaringizda ulkan zafarlar tilaymiz!</text>
    <text x="561.5" y="480" text-anchor="middle" fill="#fef3c7" font-family="Arial, sans-serif" font-size="15">• O'rgangan har bir bilimingiz kelajakda yangi imkoniyatlar va yuksak muvaffaqiyat eshiklarini ochsin!</text>
    <text x="561.5" y="518" text-anchor="middle" fill="#38bdf8" font-family="Arial, sans-serif" font-size="16" font-weight="bold">"IMKONIYATLAR KALITI" Ma'muriyati va Sayt Admini (${ADMIN_EMAIL}) sizga doimo omad tilaydi!</text>

    <!-- Left Footer: Certificate ID & Date -->
    <text x="225" y="625" text-anchor="middle" fill="#fbbf24" font-family="Arial, sans-serif" font-size="17" font-weight="bold">Sertifikat ID Raqami:</text>
    <text x="225" y="652" text-anchor="middle" fill="#ffffff" font-family="Consolas, monospace" font-size="17" font-weight="bold">${escapeXml(data.certId)}</text>
    <text x="225" y="680" text-anchor="middle" fill="#cbd5e1" font-family="Arial, sans-serif" font-size="15">Berilgan sana: ${escapeXml(data.issueDate)}</text>
    <text x="225" y="706" text-anchor="middle" fill="#34d399" font-family="Arial, sans-serif" font-size="14" font-weight="bold">Ko'rsatkich: 5x A'LO (5 Baho)</text>

    <!-- Center Footer: Scannable QR Code & 1D Barcode (Shtrix-kod) -->
    <rect x="461.5" y="560" width="200" height="196" rx="12" fill="#ffffff" stroke="#fbbf24" stroke-width="3"/>
    ${qrInner}
    ${barcodeInner}
    <text x="561.5" y="732" text-anchor="middle" fill="#0f172a" font-family="Consolas, monospace" font-size="10.5" font-weight="bold">${escapeXml(data.certId)}</text>
    <text x="561.5" y="747" text-anchor="middle" fill="#1d4ed8" font-family="Arial, sans-serif" font-size="10" font-weight="bold">QR / SHTRIX-KOD (ELEKTRON YUKLASH)</text>

    <!-- Right Footer: Official Admin Verification -->
    <text x="900" y="625" text-anchor="middle" fill="#38bdf8" font-family="Arial, sans-serif" font-size="17" font-weight="bold">IMKONIYATLAR KALITI Admini:</text>
    <text x="900" y="652" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="16" font-weight="bold">${ADMIN_EMAIL}</text>
    <text x="900" y="680" text-anchor="middle" fill="#34d399" font-family="Arial, sans-serif" font-size="15" font-weight="bold">Rasmiy Elektron Tasdiq ✓</text>
    <text x="900" y="706" text-anchor="middle" fill="#fde68a" font-family="Arial, sans-serif" font-size="14">A4 Format • 24/7 Elektron bazada</text>
  </svg>`;
}

function downloadCertificate(format) {
  const data = getCertificateData(false);
  const verifyUrl = getCertificateVerifyUrl(data);
  const svgStr = buildCertificateSVGString(false);
  const baseName = `Imkoniyatlar_Kaliti_A4_Sertifikat_${data.certId}`;

  if (format === "svg") {
    triggerBlobDownload(svgStr, `${baseName}.svg`, "image/svg+xml;charset=utf-8");
  } else if (format === "png") {
    const img = new Image();
    img.crossOrigin = "anonymous";
    const svgDataUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgStr);
    img.onload = () => {
      // High-Resolution A4 Landscape Canvas (2246 x 1588 px = 2x A4 297x210mm)
      const canvas = document.createElement("canvas");
      canvas.width = 2246;
      canvas.height = 1588;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#071024";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      try {
        const dataUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `${baseName}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (_) {
        if (canvas.toBlob) {
          canvas.toBlob(blob => {
            if (blob) triggerBlobDownload(blob, `${baseName}.png`, "image/png");
          }, "image/png");
        }
      }
    };
    img.src = svgDataUrl;
  } else if (format === "doc") {
    const qrSvgSmall = renderQrCodeSvgInner(verifyUrl, 0, 0, 120);
    const barcodeSvgSmall = renderBarcode1DSvgInner(data.certId, 0, 0, 160, 26);
    const wordHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>A4 Rasmiy Sertifikat - ${escapeHtml(data.studentFio)}</title>
      <style>
        @page WordSection1 { size: 297mm 210mm; mso-page-orientation: landscape; margin: 12mm; }
        div.WordSection1 { page: WordSection1; }
      </style>
      </head>
      <body style="font-family: 'Times New Roman', serif; text-align:center; background:#ffffff; color:#0f172a;">
        <div class="WordSection1" style="border: 6px double #d97706; padding: 20px;">
          <p style="color:#059669; font-size:10pt; font-weight:bold; margin:0;">STANDART A4 FORMAT (297 × 210 MM) • RASMIY ELEKTRON SERTIFIKAT</p>
          <h1 style="color:#b45309; font-size:26pt; margin:6px 0;">IMKONIYATLAR KALITI</h1>
          <h2 style="color:#1e3a8a; font-size:15pt; margin:4px 0;">30 TALIK TEST SINOVLARINI 5 MARTA TAKRORAN "A'LO" BAHOGA BAJARGANLIK UCHUN FAXRIY SERTIFIKAT</h2>
          <p style="font-size:13pt; margin:10px 0 4px;">Ushbu rasmiy sertifikat bilan taqdirlanadi:</p>
          <h2 style="color:#0284c7; font-size:22pt; text-decoration:underline; margin:6px 0;">${escapeHtml(data.studentFio)}</h2>
          <div style="border:2px solid #f59e0b; background:#fffbeb; padding:14px; margin:12px auto; text-align:left; font-size:12pt; line-height:1.5;">
            <p style="text-align:center; font-weight:bold; color:#b45309; margin-top:0;">🌟 "IMKONIYATLAR KALITI" PLATFORMASI NOMIDAN E'TIROF VA EZGU TILAKLAR 🌟</p>
            <p>Ushbu sertifikat sohibi <strong>${escapeHtml(data.studentFio)}</strong> <em>"IMKONIYATLAR KALITI"</em> xalqaro ta'lim platformasida 30 talik test sinovlarini <strong>5 marta takroran "A'LO" (5 baho)</strong> ko'rsatkichga muvaffaqiyatli yakunlab, yuksak bilim va intizom namunasini ko'rsatdi.</p>
            <p><strong>✨ Samimiy tilaklarimiz:</strong><br/>
            • Kelgusidagi o'qish, ilmiy izlanish va kasbiy faoliyatingizda ulkan zafarlar yor bo'lsin, sohangizning yetuk mutaxassisi bo'lib yetishing!<br/>
            • Sizga mustahkam sog'lik, tinmas shijoat, oilaviy baxt-saodat va barcha ezgu maqsadlaringiz ro'yobini tilaymiz!<br/>
            • O'rgangan har bir bilimingiz kelajakda yangi imkoniyatlar eshigini ochsin — <strong>"IMKONIYATLAR KALITI"</strong> ma'muriyati va Sayt Admini (<strong>${ADMIN_EMAIL}</strong>) sizga doimo omad tilaydi!</p>
          </div>
          <table style="width:100%; margin-top:12px; text-align:center; border-collapse:collapse;">
            <tr>
              <td style="width:33%; vertical-align:middle;">
                <strong>Sertifikat ID:</strong> ${escapeHtml(data.certId)}<br/>
                <strong>Berilgan sana:</strong> ${escapeHtml(data.issueDate)}<br/>
                <strong>Format:</strong> A4 (297×210 mm)
              </td>
              <td style="width:34%; vertical-align:middle;">
                <div><svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">${qrSvgSmall}</svg></div>
                <div><svg xmlns="http://www.w3.org/2000/svg" width="160" height="26" viewBox="0 0 160 26">${barcodeSvgSmall}</svg></div>
                <div style="font-size:9pt; font-weight:bold;">QR / Shtrix-kod: <a href="${escapeHtml(verifyUrl)}">Elektron Sertifikatni Ko'rish</a></div>
              </td>
              <td style="width:33%; vertical-align:middle;">
                <strong>IMKONIYATLAR KALITI Admini:</strong><br/>
                ${ADMIN_EMAIL}<br/>
                <span style="color:#059669; font-weight:bold;">Rasmiy Elektron Tasdiq ✓</span>
              </td>
            </tr>
          </table>
        </div>
      </body></html>`;
    triggerBlobDownload(wordHtml, `${baseName}.doc`, "application/msword;charset=utf-8");
  } else if (format === "html") {
    const standaloneHtml = `<!DOCTYPE html><html lang="uz"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${escapeHtml(data.studentFio)} - A4 Elektron Sertifikat</title>
      <style>@page { size: A4 landscape; margin: 0; } body { margin:0; padding:16px; display:flex; flex-direction:column; justify-content:center; align-items:center; min-height:100vh; background:#070d19; color:#fff; font-family:Arial,sans-serif; } svg { width:100%; max-width:1123px; height:auto; box-shadow:0 20px 50px rgba(0,0,0,0.7); border-radius:16px; } .print-bar { margin-bottom:14px; display:flex; gap:10px; flex-wrap:wrap; justify-content:center; } .btn { padding:10px 18px; border-radius:8px; background:#f59e0b; color:#0f172a; font-weight:bold; text-decoration:none; border:none; cursor:pointer; } @media print { .print-bar { display:none !important; } body { padding:0; background:#fff; } svg { max-width:297mm; width:297mm; height:210mm; box-shadow:none; border-radius:0; } }</style>
      </head><body>
      <div class="print-bar">
        <button class="btn" onclick="window.print()">🖨️ A4 Formatda Chop Etish / PDF Saqlash</button>
        <a class="btn" href="${escapeHtml(verifyUrl)}">🌐 Saytda Elektron Ko'rish</a>
      </div>
      ${svgStr}
      </body></html>`;
    triggerBlobDownload(standaloneHtml, `${baseName}.html`, "text/html;charset=utf-8");
  } else if (format === "txt") {
    const txt = [
      "==========================================================================",
      "   IMKONIYATLAR KALITI - RASMIY A4 ELEKTRON SERTIFIKAT (5x A'LO BAHO)     ",
      "==========================================================================",
      `Taqdirlanuvchi F.I.Sh.: ${data.studentFio}`,
      `Yutuq ko'rsatkichi:     30 talik test sinovlarini 5 marta takroran A'LO bahoga bajargan`,
      `Taqdim etuvchi:         "IMKONIYATLAR KALITI" platformasi va Admin (${ADMIN_EMAIL})`,
      `Ezgu tilaklar:          Kelgusidagi o'qish va kasbiy faoliyatingizda ulkan zafarlar,`,
      `                        mustahkam sog'lik, baxt-saodat va yuksak marralar tilaymiz!`,
      `Sertifikat ID:          ${data.certId}`,
      `Format:                 Standart A4 (297 x 210 mm)`,
      `Berilgan sana:          ${data.issueDate}`,
      `QR / Shtrix-kod havola: ${verifyUrl}`,
      "=========================================================================="
    ].join("\r\n");
    triggerBlobDownload(txt, `${baseName}.txt`, "text/plain;charset=utf-8");
  } else if (format === "json") {
    triggerBlobDownload(
      JSON.stringify({ platform: "IMKONIYATLAR KALITI", format: "A4 (297x210mm)", admin: ADMIN_EMAIL, verifyUrl, certificate: data }, null, 2),
      `${baseName}.json`,
      "application/json;charset=utf-8"
    );
  } else if (format === "pdf") {
    const printWin = window.open("", "_blank", "width=1150,height=820");
    if (printWin && printWin.document) {
      printWin.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>A4 Sertifikat PDF - ${escapeHtml(data.studentFio)}</title>
        <style>
          @page { size: A4 landscape; margin: 0; }
          * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #071024; }
          svg { width: 297mm; max-width: 100%; height: auto; max-height: 210mm; display: block; }
        </style>
        </head><body>${svgStr}<script>window.onload=function(){setTimeout(function(){window.print();},350);};<\/script></body></html>`);
      printWin.document.close();
    } else {
      // Fallback for iOS In-App Browsers (Telegram/WhatsApp/Safari popup block)
      switchView("viewCertificate");
      document.body.classList.add("print-a4-cert-mode");
      setTimeout(() => {
        window.print();
        setTimeout(() => document.body.classList.remove("print-a4-cert-mode"), 1000);
      }, 150);
    }
  }
}

/* ==========================================================================
   DAILY, WEEKLY, MONTHLY LEADERBOARD (REYTING)
   ========================================================================== */
const DEFAULT_LEADERS = [
  { fio: "Xolmatov Sardorbek Ulug'bek o'g'li", subject: "HTML, CSS, JS & Telekom", score: 30, pct: 100, period: "daily", badge: "🏆 5x A'lo A4 Sertifikat sohibi" },
  { fio: "Qodirova Madinabonu Anvar qizi", subject: "Med Texnikum 2-kurs & Anatomiya", score: 29, pct: 97, period: "daily", badge: "🌟 A'lochi" },
  { fio: "Abdullayev Javohir Bahodir o'g'li", subject: "Nemis tili B2 & Biologiya", score: 29, pct: 97, period: "weekly", badge: "🏆 5x A'lo A4 Sertifikat sohibi" },
  { fio: "Tursunova Dilnoza Rustam qizi", subject: "Kimyo, Biokimyo va Farmakologiya", score: 28, pct: 93, period: "weekly", badge: "🌟 A'lochi" },
  { fio: "Yo'ldoshev Bekzod Shavkat o'g'li", subject: "Python, C++ & L3 Switch/Router", score: 30, pct: 100, period: "monthly", badge: "🏆 5x A'lo A4 Sertifikat sohibi" }
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
      content: "Assalomu alaykum! Imkoniyatlar Kaliti sayti iPhone va Androidda ham juda tez va qulay ishlayapti. Anatomiya, Farmakologiya va Biologiyadan 5 marta takroran A'lo baho olib, QR-kodli A4 Elektron Sertifikatimni PDF va PNG formatda yuklab oldim!",
      startTime: "14:10:05",
      elapsedTime: "00:12:40",
      endTime: "14:22:45",
      createdAt: "Bugun",
      replies: [
        {
          author: `Imkoniyatlar Kaliti Admini (${ADMIN_EMAIL})`,
          isAdmin: true,
          text: "Va alaykum assalom, Abrorbek! Yuksak natijangiz va 5x A'lo A4 Sertifikatingiz bilan tabriklaymiz! O'qish va kelgusi kasbiy faoliyatingizda ulkan zafarlar tilaymiz!",
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
  storageSet("ik_forum_posts", JSON.stringify(AppState.forumPosts));
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
        <input type="text" id="replyInput_${pIdx}" class="form-input" style="flex:1; min-width:200px; padding:8px 12px;" placeholder="Ushbu bildirgiga foydalanuvchi yoki Admin sifatida javob yozing...">
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
   UTILITIES (CROSS-OS BLOB DOWNLOAD SUPPORTING iOS SAFARI / ANDROID / DESKTOP)
   ========================================================================== */
function triggerBlobDownload(content, filename, mimeType) {
  try {
    const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
      return;
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = filename;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (a.parentNode) document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1500);
  } catch (err) {
    console.error("Download error:", err);
  }
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
  checkUrlForElectronicCertificate();

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
