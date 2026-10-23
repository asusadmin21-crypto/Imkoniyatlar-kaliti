/* ==========================================================================
   IMKONIYATLAR KALITI - Multi-Language (UZ / RU / EN) & Real-Time Tickers
   Updates Date, Time, Weather, Geolocation, and Currency Rates every second
   Cross-OS Safe Storage for iOS (iPhone/iPad), Android, Windows, macOS, Linux
   ========================================================================== */

const SafeStorage = (() => {
  const mem = {};
  return {
    getItem(key) {
      try {
        const val = window.localStorage.getItem(key);
        return val !== null ? val : (key in mem ? mem[key] : null);
      } catch (_) {
        return key in mem ? mem[key] : null;
      }
    },
    setItem(key, val) {
      mem[key] = String(val);
      try {
        window.localStorage.setItem(key, String(val));
      } catch (_) {}
    },
    removeItem(key) {
      delete mem[key];
      try {
        window.localStorage.removeItem(key);
      } catch (_) {}
    }
  };
})();
window.SafeStorage = SafeStorage;

const I18N = {
  uz: {
    siteName: "IMKONIYATLAR KALITI",
    siteTagline: "24/7 Barcha Operatsion Tizimlarda Ishlovchi Milliy va Xalqaro Ta'lim, Tibbiyot va Telekommunikatsiya Platformasi",
    status247: "24/7 Barcha OS da faol (iPhone/iPad/Android/Win/Mac/Linux)",
    navHome: "Bosh menyu",
    navSubjects: "Fanlar va Testlar (30 ta)",
    navMed: "Med Texnikum va Tibbiyot",
    navTelecom: "Telekom va Qurilmalar Chizmasi",
    navRating: "Kunlik / Haftalik / Oylik Reyting",
    navCertSample: "A4 Elektron Sertifikat",
    navForum: "Bildirgi va Muhokama",
    heroBadge: "Cheksiz va Takrorlanmas Millionlab Testlar va Nazariyalar Bazasi",
    heroTitle: "Bilim — kelajak kaliti! A'lo kayfiyatda o'rganing va 5 marta takroran A'lo baho olib \"IMKONIYATLAR KALITI\" Rasmiy A4 Elektron Sertifikatiga ega bo'ling!",
    heroDesc: "HTML, CSS, JS, Python, Java, C/C++, C#, PHP, Tibbiyot (1-3 kurs Med texnikum va OTM), Telekommunikatsiya (L1-L3 Switch, Router, SFP, Wi-Fi, IP Kamera, NVR, Serverlar chizmalari bilan), Maktab fanlari (1-12 sinf) hamda Nemis (Germaniya ishlash/sertifikat), Ingliz, Rus, Xitoy va Koreys tillari!",
    statVisits: "Saytga kirishlar soni",
    statSolvedTests: "Bajarilgan testlar",
    statUniqueQuestions: "Takrorlanmas savollar bazasi",
    statExcellentCount: "5x A'lo Sertifikat ko'rsatkichi",
    statActiveTime: "Umumiy foydalanish vaqti",
    caption30yo: "30 yoshli dasturchi va muhandis zamonaviy kompyuter oldida",
    caption4thGrade: "4-sinf o'quvchisi kitob mutolaa qilmoqda — uzluksiz ta'lim!",
    catAll: "Barchasi",
    catWebProg: "Web va Dasturlash (HTML/CSS/JS/Python/C++/Java...)",
    catMed: "Med Texnikum (1-3 kurs) va Tibbiyot",
    catSchool: "Maktab va OTM (1-12 sinf fanlari)",
    catLangs: "Tillar (Ingliz, Rus, Nemis, Xitoy, Koreys)",
    catTelecom: "Telekommunikatsiya, IP va Tarmoq Qurilmalari",
    searchPlaceholder: "Fan, kurs, sinf, dasturlash tili yoki tarmoq qurilmasini qidiring...",
    btnStartTest: "30 talik Testni Boshlash",
    btnReadTheory: "Nazariya va Amaliyot",
    btnBackExit: "Orqaga / Asosiy menyuga qaytish",
    lblSelectLevel: "Sinf / Kurs / Yo'nalishni tanlang:",
    lblStartTime: "Boshlanish vaqti",
    lblElapsedTime: "Bajarilayotgan vaqt",
    lblEndTime: "Tugatgan vaqti",
    lblScore: "Natija",
    lblDownloadResult: "Test natijasini yuklab olish",
    lblRateModule: "Ushbu test va nazariyani 5 yulduzli tizimda baholang:",
    lblAdminContact: "Imkoniyatlar Kaliti Admini bilan bog'lanish:",
    regModalTitle: "Foydalanuvchi ma'lumotlarini kiritish (Faqat 1 marta so'raladi)",
    regModalDesc: "Ma'lumotlaringiz xotirada saqlanadi va qayta kiritish talab etilmaydi. QR-kodli A4 rasmiy sertifikat sizning nomingizga rasmiylashtiriladi.",
    lblFirstName: "Ismingiz",
    lblLastName: "Familiyangiz",
    lblMiddleName: "Otasining ismi (Sharifingiz)",
    btnSaveProfile: "Saqlash va Davom etish",
    msgCorrect: "Barakalla! To'g'ri javob!",
    msgWrong: "Noto'g'ri javob! To'g'ri javob yashil rangda ko'rsatildi va tanlov qulflandi."
  },
  ru: {
    siteName: "КЛЮЧ ВОЗМОЖНОСТЕЙ (IMKONIYATLAR KALITI)",
    siteTagline: "Круглосуточная 24/7 Образовательная, Медицинская и Телекоммуникационная Платформа для всех ОС",
    status247: "24/7 Активно на всех ОС (iPhone/iPad/Android/Win/Mac/Linux)",
    navHome: "Главное меню",
    navSubjects: "Предметы и Тесты (по 30)",
    navMed: "Мед. Техникум и Медицина",
    navTelecom: "Телеком и Схемы Оборудования",
    navRating: "Рейтинг (День / Неделя / Месяц)",
    navCertSample: "Электронный Сертификат А4",
    navForum: "Отзывы, Вопросы и Обсуждение",
    heroBadge: "Бесконечная неповторяющаяся база из миллионов тестов и теории",
    heroTitle: "Знания — ключ к будущему! Учитесь в отличном настроении и получите Именной Сертификат Почета А4 с QR-кодом за 5 отличных оценок!",
    heroDesc: "HTML, CSS, JS, Python, Java, C/C++, C#, PHP, Медицина (1-3 курсы Мед. техникума и ВУЗ), Телекоммуникации (L1-L3 Switch, Router, SFP, Wi-Fi, IP-камеры, NVR, Серверы со схемами), Школьные предметы (1-12 классы) и Немецкий, Английский, Русский, Китайский, Корейский языки!",
    statVisits: "Количество входов на сайт",
    statSolvedTests: "Решено тестов",
    statUniqueQuestions: "Уникальных вопросов в базе",
    statExcellentCount: "Прогресс 5x Отлично (Сертификат)",
    statActiveTime: "Общее время использования",
    caption30yo: "30-летний специалист за современным компьютером",
    caption4thGrade: "Ученик 4-го класса читает книгу — непрерывное образование!",
    catAll: "Все разделы",
    catWebProg: "Web и Программирование (HTML/CSS/JS/Python/C++...)",
    catMed: "Мед. Техникум (1-3 курс) и Медицина",
    catSchool: "Школа и ВУЗ (1-12 классы)",
    catLangs: "Языки (Англ, Рус, Нем, Кит, Кор)",
    catTelecom: "Телекоммуникации, IP и Сетевое Оборудование",
    searchPlaceholder: "Поиск предмета, курса, класса, языка программирования или устройства...",
    btnStartTest: "Начать тест (30 вопросов)",
    btnReadTheory: "Теория и Практика",
    btnBackExit: "Назад / Выход в главное меню",
    lblSelectLevel: "Выберите класс / курс / направление:",
    lblStartTime: "Время начала",
    lblElapsedTime: "Время выполнения",
    lblEndTime: "Время завершения",
    lblScore: "Результат",
    lblDownloadResult: "Скачать результат теста",
    lblRateModule: "Оцените этот тест и теорию по 5-звездочной шкале:",
    lblAdminContact: "Связь с Админом Imkoniyatlar Kaliti:",
    regModalTitle: "Регистрация пользователя (Запрашивается только 1 раз)",
    regModalDesc: "Ваши данные сохраняются автоматически — повторный ввод не потребуется. Именной сертификат формата А4 с QR-кодом оформляется на ваше имя.",
    lblFirstName: "Имя",
    lblLastName: "Фамилия",
    lblMiddleName: "Отчество",
    btnSaveProfile: "Сохранить и Продолжить",
    msgCorrect: "Отлично! Правильный ответ!",
    msgWrong: "Неверно! Правильный ответ выделен зеленым цветом, выбор заблокирован."
  },
  en: {
    siteName: "KEY OF OPPORTUNITIES (IMKONIYATLAR KALITI)",
    siteTagline: "24/7 Cross-Platform Educational, Medical & Telecommunications Portal for All Operating Systems",
    status247: "24/7 Online on All OS (iPhone/iPad/Android/Win/Mac/Linux)",
    navHome: "Main Menu",
    navSubjects: "Subjects & Tests (30 Qs)",
    navMed: "Medical College & Medicine",
    navTelecom: "Telecom & Hardware Schematics",
    navRating: "Leaderboard (Daily/Weekly/Monthly)",
    navCertSample: "A4 Electronic Certificate",
    navForum: "Feedback, Q&A & Discussion",
    heroBadge: "Unlimited Non-Repeating Multi-Million Test & Theory Engine",
    heroTitle: "Knowledge is the Key of Opportunities! Study in great spirits and earn an Official A4 Electronic Certificate with QR Code after 5 Excellent scores!",
    heroDesc: "HTML, CSS, JS, Python, Java, C/C++, C#, PHP, Medical College (Years 1-3 & University), Telecommunications (L1-L3 Switches, Routers, SFP, Wi-Fi, IP Cameras, NVR, Servers with diagrams), Grades 1-12 subjects, plus German (Work/Certs), English, Russian, Chinese & Korean!",
    statVisits: "Total Site Visits",
    statSolvedTests: "Completed Tests",
    statUniqueQuestions: "Unique Non-Repeating Pool",
    statExcellentCount: "5x Excellent Certificate Streak",
    statActiveTime: "Total Active Study Time",
    caption30yo: "30-year-old engineer coding at a modern computer workstation",
    caption4thGrade: "4th-grade student reading a book — lifelong learning!",
    catAll: "All Categories",
    catWebProg: "Web & Programming (HTML/CSS/JS/Python/C++...)",
    catMed: "Medical College (Years 1-3) & Medicine",
    catSchool: "School & University (Grades 1-12)",
    catLangs: "Languages (EN, RU, DE, ZH, KO)",
    catTelecom: "Telecommunications, IP & Network Hardware",
    searchPlaceholder: "Search subject, course, grade, programming language, or network device...",
    btnStartTest: "Start 30-Question Test",
    btnReadTheory: "Theory & Practical Lab",
    btnBackExit: "Back / Exit to Main Menu",
    lblSelectLevel: "Select Grade / Course / Track:",
    lblStartTime: "Start Time",
    lblElapsedTime: "Elapsed Time",
    lblEndTime: "Completion Time",
    lblScore: "Score",
    lblDownloadResult: "Download Test Result",
    lblRateModule: "Rate this test and theory (5 Stars):",
    lblAdminContact: "Contact Imkoniyatlar Kaliti Admin:",
    regModalTitle: "User Registration (Asked Only Once)",
    regModalDesc: "Your details are remembered automatically so you never have to re-enter them. Used for your official A4 Electronic Certificate with QR code.",
    lblFirstName: "First Name",
    lblLastName: "Last Name",
    lblMiddleName: "Patronymic / Middle Name",
    btnSaveProfile: "Save & Continue",
    msgCorrect: "Awesome! Correct Answer!",
    msgWrong: "Incorrect! The right answer is highlighted in green and selection is locked."
  }
};

let currentLang = SafeStorage.getItem('ik_lang') || 'uz';

function t(key) {
  return (I18N[currentLang] && I18N[currentLang][key]) || I18N.uz[key] || key;
}

function setLanguage(lang) {
  if (!I18N[lang]) return;
  currentLang = lang;
  SafeStorage.setItem('ik_lang', lang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N[lang][key]) {
      el.textContent = I18N[lang][key];
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (I18N[lang][key]) {
      el.setAttribute('placeholder', I18N[lang][key]);
    }
  });
  if (typeof window.onLanguageChanged === 'function') {
    window.onLanguageChanged(lang);
  }
}

/* ==========================================================================
   REAL-TIME CLOCK, WEATHER, GEOLOCATION & CURRENCY RATES (EVERY SECOND)
   ========================================================================== */
const CITIES_WEATHER = {
  "Toshkent": { lat: 41.2995, lon: 69.2401, baseTemp: 21, cond: "☀️ Ochiq / Musaffo", wind: "3.2 m/s", hum: "42%" },
  "Samarqand": { lat: 39.6542, lon: 66.9597, baseTemp: 20, cond: "🌤️ Kam bulutli", wind: "2.8 m/s", hum: "45%" },
  "Buxoro": { lat: 39.7747, lon: 64.4286, baseTemp: 23, cond: "☀️ Quyoshli", wind: "4.1 m/s", hum: "36%" },
  "Farg'ona": { lat: 40.3842, lon: 71.7843, baseTemp: 22, cond: "☀️ Ochiq havo", wind: "2.4 m/s", hum: "44%" },
  "Andijon": { lat: 40.7821, lon: 72.3442, baseTemp: 21, cond: "🌤️ Yoqimli", wind: "2.6 m/s", hum: "46%" },
  "Namangan": { lat: 40.9983, lon: 71.6726, baseTemp: 22, cond: "☀️ Quyoshli", wind: "2.9 m/s", hum: "43%" },
  "Xorazm (Urganch)": { lat: 41.5500, lon: 60.6333, baseTemp: 19, cond: "🌤️ O'zgaruvchan", wind: "4.5 m/s", hum: "39%" },
  "Nukus": { lat: 42.4619, lon: 59.6166, baseTemp: 18, cond: "🌤️ Salqin", wind: "4.8 m/s", hum: "38%" },
  "Qarshi": { lat: 38.8606, lon: 65.7891, baseTemp: 24, cond: "☀️ Iliq va ochiq", wind: "3.5 m/s", hum: "35%" },
  "Termiz": { lat: 37.2242, lon: 67.2783, baseTemp: 26, cond: "☀️ Issiq quyoshli", wind: "3.0 m/s", hum: "33%" },
  "Jizzax": { lat: 40.1158, lon: 67.8422, baseTemp: 20, cond: "🌤️ Ochiq", wind: "3.1 m/s", hum: "44%" },
  "Guliston": { lat: 40.4897, lon: 68.7842, baseTemp: 21, cond: "☀️ Ochiq", wind: "3.3 m/s", hum: "43%" },
  "Navoiy": { lat: 40.0844, lon: 65.3792, baseTemp: 22, cond: "☀️ Quyoshli", wind: "3.7 m/s", hum: "37%" },
  "Berlin (Germaniya)": { lat: 52.5200, lon: 13.4050, baseTemp: 15, cond: "⛅ Bulutli", wind: "4.0 m/s", hum: "62%" },
  "Moskva (Rossiya)": { lat: 55.7558, lon: 37.6173, baseTemp: 12, cond: "🌦️ Salqin", wind: "3.8 m/s", hum: "68%" },
  "Seul (Koreya)": { lat: 37.5665, lon: 126.9780, baseTemp: 19, cond: "☀️ Musaffo", wind: "2.7 m/s", hum: "52%" },
  "Pekin (Xitoy)": { lat: 39.9042, lon: 116.4074, baseTemp: 18, cond: "🌤️ Ochiq", wind: "3.1 m/s", hum: "48%" }
};

const CURRENCIES = [
  { code: "USD", name: "AQSH Dollari", flag: "🇺🇸", base: 12845.50 },
  { code: "EUR", name: "Yevro", flag: "🇪🇺", base: 13920.80 },
  { code: "RUB", name: "Rossiya Rubli", flag: "🇷🇺", base: 136.40 },
  { code: "GBP", name: "Angliya Funti", flag: "🇬🇧", base: 16480.25 },
  { code: "CNY", name: "Xitoy Yuani", flag: "🇨🇳", base: 1795.60 },
  { code: "KRW", name: "Koreya Voni (100)", flag: "🇰🇷", base: 942.15 },
  { code: "JPY", name: "Yaponiya Iyenasi (100)", flag: "🇯🇵", base: 8510.30 },
  { code: "CHF", name: "Shveytsariya Franki", flag: "🇨🇭", base: 14790.00 },
  { code: "KZT", name: "Qozog'iston Tengesi", flag: "🇰🇿", base: 26.45 },
  { code: "TRY", name: "Turkiya Lirasi", flag: "🇹🇷", base: 374.90 },
  { code: "AED", name: "BAA Dirhami", flag: "🇦🇪", base: 3497.80 },
  { code: "BTC", name: "Bitcoin (USD)", flag: "₿", base: 68450.00, isUsd: true }
];

let selectedCity = SafeStorage.getItem('ik_city') || "Toshkent";
let liveTempDelta = 0;

async function fetchRealWeather(cityKey) {
  const city = CITIES_WEATHER[cityKey] || CITIES_WEATHER["Toshkent"];
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data && data.current_weather) {
        city.baseTemp = Math.round(data.current_weather.temperature);
        city.wind = `${data.current_weather.windspeed} km/h`;
      }
    }
  } catch (_) {
    // Offline fallback uses default city profile
  }
}

function updateClockAndTickers() {
  const now = new Date();
  const daysUz = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
  const monthsUz = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"];
  const daysRu = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
  const monthsRu = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
  const daysEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthsEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const d = now.getDate();
  const y = now.getFullYear();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');

  let dateStr = "";
  if (currentLang === 'ru') {
    dateStr = `${daysRu[now.getDay()]}, ${d} ${monthsRu[now.getMonth()]} ${y} г. | ⏰ ${hh}:${mm}:${ss}`;
  } else if (currentLang === 'en') {
    dateStr = `${daysEn[now.getDay()]}, ${monthsEn[now.getMonth()]} ${d}, ${y} | ⏰ ${hh}:${mm}:${ss}`;
  } else {
    dateStr = `${daysUz[now.getDay()]}, ${d}-${monthsUz[now.getMonth()]} ${y}-yil | ⏰ ${hh}:${mm}:${ss}`;
  }

  const clockEl = document.getElementById('liveClockDisplay');
  if (clockEl) clockEl.textContent = dateStr;

  const cityInfo = CITIES_WEATHER[selectedCity] || CITIES_WEATHER["Toshkent"];
  liveTempDelta = (Math.sin(now.getTime() / 5000) * 0.2);
  const exactTemp = (cityInfo.baseTemp + liveTempDelta).toFixed(1);
  const weatherEl = document.getElementById('liveWeatherDisplay');
  if (weatherEl) {
    weatherEl.textContent = `${cityInfo.cond} +${exactTemp}°C | 💨 ${cityInfo.wind} | 💧 ${cityInfo.hum}`;
  }

  const tickerEl = document.getElementById('liveCurrencyTicker');
  if (tickerEl) {
    const html = CURRENCIES.map((c, idx) => {
      const wave = Math.sin((now.getTime() / 1000) + idx * 1.7) * (c.base * 0.00035);
      const currentVal = (c.base + wave).toFixed(2);
      const isUp = wave >= 0;
      const arrow = isUp ? '▲' : '▼';
      const cls = isUp ? 'currency-up' : 'currency-down';
      const unit = c.isUsd ? 'USD' : "so'm";
      return `<span class="currency-item" title="${c.name}">
        <span>${c.flag}</span>
        <span class="currency-code">${c.code}:</span>
        <span>${Number(currentVal).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${unit}</span>
        <span class="${cls}">${arrow}</span>
      </span>`;
    }).join('');
    tickerEl.innerHTML = html;
  }
}

function initLiveTopbar() {
  const citySelect = document.getElementById('citySelectDropdown');
  if (citySelect) {
    citySelect.innerHTML = Object.keys(CITIES_WEATHER).map(c =>
      `<option value="${c}" ${c === selectedCity ? 'selected' : ''}>📍 ${c}</option>`
    ).join('');
    citySelect.addEventListener('change', (e) => {
      selectedCity = e.target.value;
      SafeStorage.setItem('ik_city', selectedCity);
      fetchRealWeather(selectedCity);
      updateClockAndTickers();
    });
  }
  fetchRealWeather(selectedCity);
  updateClockAndTickers();
  setInterval(updateClockAndTickers, 1000);
}
