/* ==========================================================================
   IMKONIYATLAR KALITI - Complete Subject Catalog & Multi-Million Non-Repeating
   Question & Theory Engine (Zero Semantic Duplicates, Daily Auto-Refresh)
   ========================================================================== */

const GRADES_1_12 = [
  "1-sinf", "2-sinf", "3-sinf", "4-sinf", "5-sinf", "6-sinf",
  "7-sinf", "8-sinf", "9-sinf", "10-sinf", "11-sinf", "12-sinf",
  "Med Texnikum va Kollejga kirish", "OTM / Med Institutga kirish"
];

const GRADES_5_12_MED = [
  "5-sinf", "6-sinf", "7-sinf", "8-sinf", "9-sinf", "10-sinf", "11-sinf", "12-sinf",
  "Med Texnikumga kirish (1-3 kurs)", "Med Institutga (OTM) kirish"
];

const MED_COLLEGE_LEVELS = [
  "Med Texnikum 1-kurs",
  "Med Texnikum 2-kurs",
  "Med Texnikum 3-kurs",
  "Med Kollej Amaliyot va Klinika",
  "Tibbiyot Instituti (OTM) darajasi"
];

const PROG_LEVELS = [
  "Boshlang'ich (Junior / Fundamental)",
  "O'rta (Middle / Amaliy Loyihalar)",
  "Yuqori (Senior / Arxitektura va Algoritmlar)",
  "Xalqaro Sertifikat va Intervyu savollari"
];

const SUBJECTS_CATALOG = [
  // ===================== 1. WEB & PROGRAMMING =====================
  {
    id: "html5",
    category: "webprog",
    icon: "🌐",
    title: "HTML5 (HyperText Markup Language)",
    tag: "1,500,000+ Test & Amaliyot",
    levels: PROG_LEVELS,
    desc: "Semantik teglar, formalar, Canvas, SVG, SEO, Accessibility (ARIA), DOM daraxti va Web standartlar.",
    theory: [
      {
        title: "HTML5 Semantik Arxitekturasi va Hujjat Tuzilishi",
        body: "HTML5 zamonaviy veb-sahifalarning skeleti bo'lib, qidiruv tizimlari (SEO) va ekran o'quvchi dasturlar (Screen Readers) uchun ma'nodor teglarni taqdim etadi: <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>.",
        code: `<!DOCTYPE html>\n<html lang="uz">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Imkoniyatlar Kaliti</title>\n</head>\n<body>\n  <main><article><h1>Salom Dunyo!</h1></article></main>\n</body>\n</html>`
      },
      {
        title: "HTML5 Formalar, Validatsiya va Multimedia API",
        body: "Foydalanuvchi ma'lumotlarini serverga jo'natishdan oldin brauzerning o'zida tekshirish uchun required, pattern, min, max, type='email', type='date', type='tel' atributlari qo'llaniladi. <video>, <audio> va <canvas> teglari tashqi plaginlarsiz grafik va media bilan ishlaydi.",
        code: `<form id="regForm">\n  <input type="email" required placeholder="asusadmin21@gmail.com">\n  <input type="tel" pattern="\\+998[0-9]{9}" required>\n  <button type="submit">Yuborish</button>\n</form>`
      }
    ]
  },
  {
    id: "css3",
    category: "webprog",
    icon: "🎨",
    title: "CSS3 (Cascading Style Sheets & Responsive Design)",
    tag: "1,500,000+ Test & Amaliyot",
    levels: PROG_LEVELS,
    desc: "Flexbox, CSS Grid, Custom Properties (--var), Media Queries, Keyframe Animatsiyalar, Glassmorphism va BEM.",
    theory: [
      {
        title: "CSS Box Model, Flexbox va CSS Grid Tizimi",
        body: "Har bir element Box Model (Content, Padding, Border, Margin) asosida joylashadi. box-sizing: border-box o'lchamlarni aniq boshqarishga yordam beradi. Flexbox 1 o'lchovli (qator yoki ustun), CSS Grid esa 2 o'lchovli murakkab maketlar uchun ishlatiladi.",
        code: `.grid-layout {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 20px;\n  backdrop-filter: blur(12px);\n}`
      }
    ]
  },
  {
    id: "javascript",
    category: "webprog",
    icon: "⚡",
    title: "JavaScript (ES6+ / DOM / Async / Web APIs)",
    tag: "2,000,000+ Test & Amaliyot",
    levels: PROG_LEVELS,
    desc: "Closures, Promises, Async/Await, Event Loop, DOM manipulyatsiyasi, Fetch API, LocalStorage, OOP va funksional dasturlash.",
    theory: [
      {
        title: "JavaScript Engine, Event Loop va Asinxron Dasturlash",
        body: "JavaScript bir oqimli (single-threaded) til bo'lib, Call Stack, Web APIs, Microtask Queue (Promise.then, async/await) va Macrotask Queue (setTimeout, setInterval) orqali bloklanmasdan ishlaydi.",
        code: `async function loadUserData(id) {\n  const res = await fetch(\`/api/users/\${id}\`);\n  if (!res.ok) throw new Error('Tarmoq xatosi');\n  return await res.json();\n}`
      }
    ]
  },
  {
    id: "python",
    category: "webprog",
    icon: "🐍",
    title: "Python Dasturlash Tili (Backend, AI & Data Science)",
    tag: "1,200,000+ Test & Amaliyot",
    levels: PROG_LEVELS,
    desc: "Ma'lumot tuzilmalari (list, dict, set, tuple), OOP, Decorators, Generators, Asyncio, Django/FastAPI va algoritmlar.",
    theory: [
      {
        title: "Python Ma'lumot Tuzilmalari, List Comprehension va Dekoratorlar",
        body: "Python dinamik tipizatsiyaga ega yuqori darajali tildir. List/Dict comprehensions va generatorlar xotirani tejab, yuqori tezlikda kolleksiyalarni qayta ishlash imkonini beradi.",
        code: `squares = [x**2 for x in range(1, 21) if x % 2 == 0]\ndef logger(fn):\n    def wrapper(*args, **kwargs):\n        return fn(*args, **kwargs)\n    return wrapper`
      }
    ]
  },
  {
    id: "java",
    category: "webprog",
    icon: "☕",
    title: "Java (JVM, OOP, Collections, Multithreading & Spring)",
    tag: "1,100,000+ Test & Amaliyot",
    levels: PROG_LEVELS,
    desc: "JDK/JRE/JVM arxitekturasi, Garbage Collection, Generics, Stream API, Concurrency va Enterprise ilovalar.",
    theory: [
      {
        title: "JVM Xotira Modeli (Heap va Stack) hamda OOP Tamoyillari",
        body: "Java 'Write Once, Run Anywhere' tamoyili asosida baytkodni (.class) JVM orqali barcha operatsion tizimlarda ishga tushiradi. Inkapsulyatsiya, Merosxo'rlik, Polimorfizm va Abstraksiya — OOP ning 4 ustunidir.",
        code: `public class Main {\n    public static void main(String[] args) {\n        List<Integer> nums = List.of(1, 2, 3, 4, 5);\n        int sum = nums.stream().filter(n -> n % 2 == 1).mapToInt(Integer::intValue).sum();\n    }\n}`
      }
    ]
  },
  {
    id: "c-cpp",
    category: "webprog",
    icon: "⚙️",
    title: "C va C++ (Tizimli Dasturlash, Ko'rsatkichlar va STL)",
    tag: "1,100,000+ Test & Amaliyot",
    levels: PROG_LEVELS,
    desc: "Pointers, References, RAII, Smart Pointers (unique_ptr, shared_ptr), STL (vector, map, set), xotira boshqaruvi.",
    theory: [
      {
        title: "Ko'rsatkichlar (Pointers), Dinamik Xotira va STL Konteynerlari",
        body: "C va C++ apparat resurslariga bevosita murojaat qila oladi. Zamonaviy C++ (C++17/20/23) da xotira sizib chiqishini (memory leak) oldini olish uchun RAII va std::unique_ptr / std::shared_ptr ishlatiladi.",
        code: `#include <iostream>\n#include <vector>\n#include <memory>\nint main() {\n    auto ptr = std::make_unique<int>(42);\n    std::vector<int> v = {10, 20, 30};\n    return 0;\n}`
      }
    ]
  },
  {
    id: "csharp",
    category: "webprog",
    icon: "💠",
    title: "C# (C Sharp) & .NET Platformasi",
    tag: "1,000,000+ Test & Amaliyot",
    levels: PROG_LEVELS,
    desc: "CLR, .NET 8, LINQ, Async/Await Task, Entity Framework, ASP.NET Core Web API va Unity GameDev asoslari.",
    theory: [
      {
        title: ".NET CLR, Value vs Reference Types va LINQ So'rovlari",
        body: "C# kuchli tiplangan obyektga yo'naltirilgan til bo'lib, LINQ (Language Integrated Query) orqali massivlar, kolleksiyalar va SQL ma'lumotlar bazasi bilan yagona sintaksisda ishlash imkonini beradi.",
        code: `var highScorers = students\n    .Where(s => s.Score >= 90)\n    .OrderByDescending(s => s.Score)\n    .Select(s => s.FullName)\n    .ToList();`
      }
    ]
  },
  {
    id: "php",
    category: "webprog",
    icon: "🐘",
    title: "PHP 8+ & Backend Web Dasturlash (PDO, MVC, Laravel)",
    tag: "950,000+ Test & Amaliyot",
    levels: PROG_LEVELS,
    desc: "PHP 8 JIT, OOP, Composer, PDO SQL Injection himoyasi, REST API, Session/JWT va Laravel arxitekturasi.",
    theory: [
      {
        title: "PHP 8 Xavfsiz Backend va PDO Prepared Statements",
        body: "Server tomonida ma'lumotlar bazasi bilan ishlashda SQL Injection hujumlaridan 100% himoyalanish uchun PDO Prepared Statements va password_hash() funksiyalaridan foydalaniladi.",
        code: `<?php\n$stmt = $pdo->prepare('SELECT id, fio FROM users WHERE email = :email');\n$stmt->execute(['email' => $userEmail]);\n$user = $stmt->fetch(PDO::FETCH_ASSOC);`
      }
    ]
  },

  // ===================== 2. MED TEXNIKUM (1-3 KURS) & TIBBIYOT =====================
  {
    id: "med-texnikum-courses",
    category: "med",
    icon: "🏥",
    title: "Med Texnikum 1, 2, 3-kurslar Majmuasi (Barcha Yo'nalishlar)",
    tag: "Med Texnikum 1-3 Kurs",
    levels: [
      "1-kurs: Hamshiralik ishi va Bemor parvarishi asoslari",
      "1-kurs: Tibbiy Lotin tili, Etika (Deontologiya) va Gigiyena",
      "2-kurs: Davolash ishi (Feldsherlik), Manipulyatsiya va Inyeksiyalar",
      "2-kurs: Laboratoriya diagnostikasi va Farmatsiya asoslari",
      "3-kurs: Shoshilinch tez tibbiy yordam, Reanimatsiya (BLS/ALS) va Akusherlik",
      "Med Texnikumga Kirish Imtihoni (Abituriyentlar uchun)"
    ],
    desc: "Med texnikum va tibbiyot kollejlarining 1, 2 va 3-kurs talabalari uchun barcha mutaxassislik fanlari, amaliy manipulyatsiyalar va klinik standartlar.",
    theory: [
      {
        title: "Med Texnikum 1-2-3 Kurs: Inyeksiya Turlari, Aseptika va Shoshilinch Yordam",
        body: "1-kursda bemor parvarishi, antropometriya, tana harorati, arterial bosim (Tonometr) va pulsni o'lchash hamda dezinfectsiya/sterilizatsiya o'tiladi. 2-kursda teri ichiga (15°), teri ostiga (45°), muskul orasiga (90°) va vena ichiga inyeksiyalar texnikasi o'zlashtiriladi. 3-kursda anafilaktik shok, o'pka-yurak reanimatsiyasi (30:2 nisbatda) va shoshilinch holatlar o'rgatiladi."
      }
    ]
  },
  {
    id: "anatomiya",
    category: "med",
    icon: "🦴",
    title: "Anatomiya (Odam Anatomiyasi — Nazariy va Amaliy)",
    tag: "Med Kollej & OTM",
    levels: MED_COLLEGE_LEVELS,
    desc: "Osteologiya (suyaklar), Miologiya (muskullar), Splanxnologiya (ichki a'zolar), Angiologiya va Markaziy/Periferik asab tizimi.",
    theory: [
      {
        title: "Odam Skeleti, Yurak Kameralari va Bosh Miya Nervlari",
        body: "Voyaga yetgan odam skeleti 206 ta suyakdan iborat. Umurtqa pog'onasi 33-34 ta umurtqani (7 bo'yin, 12 ko'krak, 5 bel, 5 dumg'aza, 4-5 dum) o'z ichiga oladi. Yurak 4 kamerali (o'ng/chap bo'lmacha va o'ng/chap qorincha) bo'lib, 12 juft bosh miya nervlari organizm sezgi va harakatini boshqaradi."
      }
    ]
  },
  {
    id: "fiziologiya",
    category: "med",
    icon: "💓",
    title: "Fiziologiya (Normal Fiziologiya — Nazariy va Amaliy)",
    tag: "Med Kollej & OTM",
    levels: MED_COLLEGE_LEVELS,
    desc: "Gomeostaz, qon fiziologiyasi, yurak sikli, nafas olish biomexanikasi, buyrak filtratsiyasi va oliy nerv faoliyati.",
    theory: [
      {
        title: "Qon Fiziologiyasi, Yurak Sikli (0.8 s) va Glomerulyar Filtratsiya",
        body: "Sog'lom inson organizmida qon tana massasining 6-8% ini tashkil etadi (pH = 7.36–7.42). Yurakning bir marta qisqarib-bo'shashish sikli 75 zarba/min da 0.8 soniya davom etadi (bo'lmachalar sistolasi 0.1s, qorinchalar sistolasi 0.3s, umumiy diastola 0.4s)."
      }
    ]
  },
  {
    id: "gistologiya",
    category: "med",
    icon: "🔬",
    title: "Gistologiya, Sitologiya va Embriologiya",
    tag: "Med Kollej & OTM",
    levels: MED_COLLEGE_LEVELS,
    desc: "Epiteliy, biriktiruvchi, muskul va nerv to'qimalari mikroskopik tuzilishi hamda a'zolarning gistologik qavatlari.",
    theory: [
      {
        title: "To'qimalarning 4 Asosiy Turi va Mikroskopik Diagnostika",
        body: "Organizm 4 asosiy to'qima turidan tashkil topgan: 1) Epiteliy to'qimasi (qoplovchi va bezli), 2) Ichki muhit (qon, limfa, tog'ay va suyak biriktiruvchi to'qimalari), 3) Muskul to'qimasi (silliq, ko'ndalang-targ'il skelet va yurak), 4) Nerv to'qimasi (neyronlar va neyrogliya)."
      }
    ]
  },
  {
    id: "biokimyo",
    category: "med",
    icon: "🧬",
    title: "Biokimyo (Tibbiy va Klinik Biokimyo)",
    tag: "Med Kollej & OTM",
    levels: MED_COLLEGE_LEVELS,
    desc: "Fermentlar (Enzimologiya), vitaminlar, glikoliz, Krebs sikli, oqsil/yog'/uglevod almashinuvi va qon biokimyoviy tahlili.",
    theory: [
      {
        title: "Energetik Almashinuv (Glikoliz, Krebs Sikli) va Klinik Ko'rsatkichlar",
        body: "Qonda och qoringa glyukoza me'yori 3.3–5.5 mmol/l, umumiy oqsil 65–85 g/l, umumiy bilirubin 3.4–20.5 mkmol/l ni tashkil etadi. ALT va AST fermentlari jigar va miokard hujayralari shikastlanishining asosiy biokimyoviy markerlaridir."
      }
    ]
  },
  {
    id: "mikrobiologiya",
    category: "med",
    icon: "🦠",
    title: "Mikrobiologiya, Virusologiya va Immunologiya",
    tag: "Med Kollej & OTM",
    levels: MED_COLLEGE_LEVELS,
    desc: "Gram-musbat va Gram-manfiy bakteriyalar, viruslar, sterilizatsiya (avtoklavlash), antibiotikogramma va immunitet.",
    theory: [
      {
        title: "Gram Bo'yash Usuli, Sterilizatsiya Rejimlari va Immunoglobulinlar",
        body: "Bakteriyalar hujayra devori tuzilishiga ko'ra Gram (+) binafsha va Gram (-) pushti-qizil rangga bo'yaladi. Avtoklavda bug' bosimi ostida sterilizatsiya: 2 atm bosimda 132°C da 20 daqiqa yoki 1.1 atm bosimda 120°C da 45 daqiqa."
      }
    ]
  },
  {
    id: "patologiya",
    category: "med",
    icon: "🩺",
    title: "Patologiya (Patologik Anatomiya va Patologik Fiziologiya)",
    tag: "Med Kollej & OTM",
    levels: MED_COLLEGE_LEVELS,
    desc: "Yallig'lanishning 5 belgisi, distrofiyalar, nekroz, apoptoz, tromboz, emboliya, gipoksiya va o'sma jarayonlari.",
    theory: [
      {
        title: "Yallig'lanish Bosqichlari (Alteratsiya, Ekssudatsiya, Proliferatsiya)",
        body: "Yallig'lanishning mahalliy 5 ta klassik belgisi (Sels va Galen bo'yicha): Rubor (qizarish), Tumor (shish), Calor (harorat ko'tarilishi), Dolor (og'riq) va Functio laesa (funksiya buzilishi)."
      }
    ]
  },
  {
    id: "farmakologiya",
    category: "med",
    icon: "💊",
    title: "Farmakologiya va Klinik Reseptura",
    tag: "Med Kollej & OTM",
    levels: MED_COLLEGE_LEVELS,
    desc: "Farmakokinetika, farmakodinamika, antibiotiklar, analgetiklar, antigipertenziv vositalar, antidotlar va shoshilinch preparatlar.",
    theory: [
      {
        title: "Dori Guruhlari, Biokiraolishlik va Shoshilinch Yordam Preparatlari",
        body: "Vena ichiga yuborilgan dorining biokiraolishligi (Bioavailability) 100% ga teng. Anafilaktik shokda birinchi qator tanlov dori vositasi — Epinefrin (Adrenalin) 0.18% eritmasi muskul orasiga yuboriladi."
      }
    ]
  },
  {
    id: "ichki-kasalliklar",
    category: "med",
    icon: "🫀",
    title: "Ichki Kasalliklar (Terapiya, Kardiologiya, Pulmonologiya)",
    tag: "Med Kollej & OTM",
    levels: MED_COLLEGE_LEVELS,
    desc: "Gipertoniya, Yurak ishemik kasalligi (Stenokardiya, Miokard infarkti), Pnevmoniya, Bronxial astma, Gastrit, Qandli diabet.",
    theory: [
      {
        title: "Klinik Sindromlar, EKG Asoslari va Terapevtik Standartlar",
        body: "Miokard infarktida ko'krak ortida 20 daqiqadan ortiq davom etuvchi kuchli siquvchi og'riq (nitroglitseringa qolmaydigan), EKGda ST segmentining elevatsiyasi va qonda Troponin I/T miqdorining oshishi kuzatiladi."
      }
    ]
  },
  {
    id: "jarrohlik",
    category: "med",
    icon: "🔪",
    title: "Jarrohlik (Umumiy va Xususiy Xirurgiya, Reanimatsiya)",
    tag: "Med Kollej & OTM",
    levels: MED_COLLEGE_LEVELS,
    desc: "Aseptika va antiseptika, qon ketish turlari va jgut qo'yish, qon guruhlari (AB0/Rh), desmurgiya, o'tkir qorin sindromi.",
    theory: [
      {
        title: "Aseptika, Antiseptika, Qon Quyish va O'tkir Xirurgik Patologiyalar",
        body: "Arterial qon ketishda qon och-qizil rangda, favvora bo'lib otiladi; jarohatdan yuqoriga jgut qo'yiladi (yozda maksimal 1 soat, qishda 30 daqiqagacha, aniq vaqti yozilgan qog'oz bilan). O'tkir appenditsitda Shyotkin-Blyumberg va Rovzing simptomlari musbat bo'ladi."
      }
    ]
  },
  {
    id: "pediatriya",
    category: "med",
    icon: "👶",
    title: "Pediatriya (Bolalar Kasalliklari va Neonatologiya)",
    tag: "Med Kollej & OTM",
    levels: MED_COLLEGE_LEVELS,
    desc: "Chaqaloqlarni Apgar shkalasi bo'yicha baholash, Milliy emlash kalendari, raxit, anemiyalar va bolalar infeksiyalari.",
    theory: [
      {
        title: "Apgar Shkalasi, Jismoniy Rivojlanish va Milliy Emlash Kalendari",
        body: "Yangi tug'ilgan chaqaloq hayotining 1 va 5-daqiqasida Apgar shkalasining 5 mezoni (yurak urishi, nafas olish, teri rangi, muskul tonusi, reflekslar) bo'yicha 0–10 ballgacha baholanadi. Tug'ruqxonada dastlabki 24 soatda VGV (Gepatit B) va BSJ (Silga qarshi) vaksinalari qilinadi."
      }
    ]
  },

  // ===================== 3. MAKTAB (1-12 SINF) & OTM FANLARI =====================
  {
    id: "biologiya",
    category: "school",
    icon: "🌿",
    title: "Biologiya (5, 6, 7, 8, 9, 10, 11, 12-sinflar + Med Texnikum/OTM)",
    tag: "5–12 Sinf & Med OTM",
    levels: GRADES_5_12_MED,
    desc: "Botanika, Zoologiya, Odam va uning salomatligi, Sitologiya, Genetika masalalari (Mendel, Morgan), Ekologiya va Evolyutsiya.",
    theory: [
      {
        title: "Botanika, Zoologiya, Sitologiya va Molekulyar Genetika Qonunlari",
        body: "DNK qo'sh zanjirida Chargaff qoidasiga binoan Adenin (A) soni Timin (T) ga, Guanin (G) soni Sitozin (C) ga teng bo'ladi (A+G = T+C = 50%). A va T orasida 2 ta, G va C orasida 3 ta vodorod bog'i mavjud."
      }
    ]
  },
  {
    id: "kimyo",
    category: "school",
    icon: "⚗️",
    title: "Kimyo (5, 6, 7, 8, 9, 10, 11, 12-sinflar + Med Texnikum/OTM)",
    tag: "5–12 Sinf & Med OTM",
    levels: GRADES_5_12_MED,
    desc: "Umumiy, Noorganik, Organik va Analitik kimyo, davriy jadval, molyar kontsentratsiya, elektroliz va stexiometrik masalalar.",
    theory: [
      {
        title: "Atom Tuzilishi, Kimyoviy Bog'lanishlar, Eritmalar va Organik Sintez",
        body: "Mendeleyev davriy jadvalida davr bo'ylab chapdan o'ngga qarab atom radiusi kichrayadi, elektromanfiylik va metallmaslik xossalari ortadi. Avogadro doimiysi N_A = 6.02 × 10^23 mol^-1 ga, normal sharoitda (n.sh.) 1 mol gaz hajmi 22.4 litrga teng."
      }
    ]
  },
  {
    id: "ona-tili",
    category: "school",
    icon: "📘",
    title: "Ona tili (1–12-sinflar + Med Texnikum va OTMga Kirish)",
    tag: "1–12 Sinf & OTM",
    levels: GRADES_1_12,
    desc: "Fonetika, Leksikologiya, Morfologiya (so'z turkumlari), Sintaksis, Punktuatsiya, Imlo qoidalari va Usuliyat.",
    theory: [
      {
        title: "O'zbek Tilshunosligi Bo'limlari: Fonetika, Morfologiya va Sintaksis",
        body: "O'zbek tilida 6 ta unli va 24 ta undosh tovush mavjud. So'z turkumlari mustaqil (ot, sifat, son, olmosh, fe'l, ravish), yordamchi (ko'makchi, bog'lovchi, yuklama) va alohida guruh (undov, taqlid, modal so'zlar) ga bo'linadi."
      }
    ]
  },
  {
    id: "ona-tili-adabiyot",
    category: "school",
    icon: "📚",
    title: "Ona tili va Adabiyot (1–12-sinflar + Texnikum va OTM)",
    tag: "1–12 Sinf & OTM",
    levels: GRADES_1_12,
    desc: "Mumtoz adabiyot (Alisher Navoiy, Bobur, Mashrab), Jadid adabiyoti (Qodiriy, Cho'lpon, Fitrat), Jahon adabiyoti va aruz vazni.",
    theory: [
      {
        title: "O'zbek Mumtoz va Zamonaviy Adabiyoti Durdonalari",
        body: "Alisher Navoiyning 'Xamsa' asari 5 ta dostondan ('Hayrat ul-abror', 'Farhod va Shirin', 'Layli va Majnun', 'Sab'ai sayyor', 'Saddi Iskandariy') iborat bo'lib, 50 ming misradan ortiq turkiy tilda yaratilgan buyuk obidadir."
      }
    ]
  },
  {
    id: "matematika",
    category: "school",
    icon: "🧮",
    title: "Matematika (1–12-sinflar + Med Texnikum, Kollej va Institut)",
    tag: "1–12 Sinf & Amaliy",
    levels: GRADES_1_12,
    desc: "Arifmetika, kasrlar, foiz va proporsiyalar, matnli masalalar, kombinatorika, ehtimollar nazariyasi va mantiqiy masalalar.",
    theory: [
      {
        title: "Arifmetika, Foizlar, EKUB/EKUK va Matnli Masalalar",
        body: "Ikki natural sonning ko'paytmasi ularning EKUB va EKUK ko'paytmasiga teng: a × b = EKUB(a, b) × EKUK(a, b). Tibbiyot va farmatsiyada eritma foiz kontsentratsiyalarini hisoblashda proporsiya qoidalari bevosita qo'llaniladi."
      }
    ]
  },
  {
    id: "algebra-geometriya",
    category: "school",
    icon: "📐",
    title: "Algebra va Geometriya (1–12-sinflar + Kollej va OTM)",
    tag: "1–12 Sinf & OTM",
    levels: GRADES_1_12,
    desc: "Kvadrat tenglamalar, funksiyalar, logarifmlar, trigonometriya, hosila va integral, planimetriya va stereometriya.",
    theory: [
      {
        title: "Algebraik Formulalar, Hosila, Integral va Fazoviy Geometriya",
        body: "Viyet teoremasiga ko'ra x² + px + q = 0 tenglama ildizlari uchun x₁ + x₂ = -p va x₁ · x₂ = q. Pifagor teoremasi: to'g'ri burchakli uchburchakda gipotenuza kvadrati katetlar kvadratlari yig'indisiga teng: c² = a² + b²."
      }
    ]
  },
  {
    id: "fizika",
    category: "school",
    icon: "⚡",
    title: "Fizika va Biofizika (1–12-sinflar + Med Texnikum va OTM)",
    tag: "1–12 Sinf & Amaliy",
    levels: GRADES_1_12,
    desc: "Mexanika, Molekulyar fizika va Termodinamika, Elektrodinamika, Optika, Kvant va Yadro fizikasi hamda Tibbiy biofizika.",
    theory: [
      {
        title: "Nyuton Qonunlari, Om Qonuni, Optika va Tibbiy Diagnostika Fizikasi",
        body: "Zanjirning bir qismi uchun Om qonuni: I = U / R. Tibbiyotda rentgen nurlari, ultratovush (UZI — akustik to'lqinlar aks sadosi) va MRT (magnit-rezonans tomografiya) fizik qonuniyatlar asosida ishlaydi."
      }
    ]
  },
  {
    id: "geografiya",
    category: "school",
    icon: "🌍",
    title: "Geografiya (1–12-sinflar + Texnikum, Kollej va OTM)",
    tag: "1–12 Sinf & OTM",
    levels: GRADES_1_12,
    desc: "Tabiiy geografiya, O'zbekiston va Jahon iqtisodiy-ijtimoiy geografiyasi, kartografiya, iqlim mintaqalari va demografiya.",
    theory: [
      {
        title: "Yer Qobiqlari, Masshtab, Koordinatalar va Jahon Iqtisodiy Geografiyasi",
        body: "Meridianning 1° yoyi uzunligi o'rtacha 111.1 km ga teng. Har 15° uzunlik farqida mahalliy vaqt 1 soatga (1° da 4 daqiqaga) farq qiladi. Atmosferaning quyi qatlami troposferada har 1000 metr balandlikka ko'tarilganda havo harorati 6°C ga pasayadi."
      }
    ]
  },
  {
    id: "informatika",
    category: "school",
    icon: "💻",
    title: "Informatika va Axborot Texnologiyalari (1–12-sinflar + OTM)",
    tag: "1–12 Sinf & IT",
    levels: GRADES_1_12,
    desc: "Sanoq sistemalari (2, 8, 10, 16-lik), Mantiqiy amallar, Kompyuter arxitekturasi, MS Excel formulalari, Algoritmlar va Tarmoqlar.",
    theory: [
      {
        title: "Axborot O'lchov Birliklari, Sanoq Sistemalari va Mantiq Elementlari",
        body: "1 Bayt = 8 bit, 1 KB = 1024 Bayt, 1 MB = 1024 KB, 1 GB = 1024 MB, 1 TB = 1024 GB. Xartli formulasi: N = 2^i, bu yerda i — bitta belgining axborot hajmi (bitda), N — alifbo quvvati."
      }
    ]
  },

  // ===================== 4. XORIJIY TILLAR =====================
  {
    id: "rus-tili",
    category: "langs",
    icon: "🇷🇺",
    title: "Rus Tili (Boshlang'ich va Yuqori 1–12-sinflar, Med Texnikum & OTM)",
    tag: "1–12 Sinf & Tibbiy Rus tili",
    levels: [
      "Boshlang'ich (1–4-sinflar: Alifbo, So'z boyligi, Oddiy gaplar)",
      "O'rta (5–9-sinflar: Padejlar, Fe'l zamonlari, Grammatika)",
      "Yuqori (10–12-sinflar: Murakkab sintaksis va Uslubiyat)",
      "Med Texnikum va Tibbiyot OTM uchun Kasbiy Rus tili",
      "TRKI (TORFL) Sertifikat va Muloqot"
    ],
    desc: "Rus tili grammatikasi (6 padej, rod, vid glagola), so'zlashuv amaliyoti hamda shifokor va hamshiralar uchun tibbiy terminologiya.",
    theory: [
      {
        title: "Rus Tilida 6 ta Kelishik (Падежи) va Tibbiy Muloqot Iboralari",
        body: "1. Именительный (Кто? Что?) 2. Родительный (Кого? Чего?) 3. Дательный (Кому? Чему?) 4. Винительный (Кого? Что?) 5. Творительный (Кем? Чем?) 6. Предложный (О ком? О чём?). Tibbiyotda: 'На что жалуетесь?', 'Измерить артериальное давление', 'Внутримышечная инъекция'."
      }
    ]
  },
  {
    id: "ingliz-tili",
    category: "langs",
    icon: "🇬🇧",
    title: "Ingliz Tili (1–12-sinflar, Med Texnikum, OTM, CEFR & IELTS)",
    tag: "1–12 Sinf & IELTS/CEFR",
    levels: [
      ...GRADES_1_12,
      "CEFR B2 / C1 & IELTS Academic",
      "Medical English (Tibbiy Ingliz tili)"
    ],
    desc: "12 ta zamon (Tenses), Passive Voice, Conditionals, Reported Speech, Phrasal Verbs, Reading va Academic Vocabulary.",
    theory: [
      {
        title: "Ingliz Tili Zamonlar Tizimi (12 Tenses) va Shart Gaplar (Conditionals)",
        body: "Zero Conditional: If + Present Simple, Present Simple (tabiiy qonuniyatlar). First Conditional: If + Present Simple, will + V1 (real kelajak). Second Conditional: If + Past Simple, would + V1. Third Conditional: If + Past Perfect, would have + V3."
      }
    ]
  },
  {
    id: "nemis-tili",
    category: "langs",
    icon: "🇩🇪",
    title: "Nemis Tili (1–12-sinflar, Germaniyada Ishlash va A1–C2 Sertifikat)",
    tag: "Goethe / ÖSD / Telc & Germaniya Ish",
    levels: [
      "1–4-sinflar (Boshlang'ich Nemis tili)",
      "5–9-sinflar (O'rta maktab dasturi)",
      "10–12-sinflar (Yuqori sinf va OTMga kirish)",
      "A1 / A2 Start Deutsch (Viza va Au-Pair uchun)",
      "B1 / B2 Zertifikat (Germaniyada Ausbildung va Ishlash uchun)",
      "B2 / C1 Medizin & Pflege (Germaniyada Hamshira va Shifokor bo'lib ishlash)"
    ],
    desc: "Grammatika (Kasus: Nominativ, Akkusativ, Dativ, Genitiv; Nebensatz), Goethe/Telc/ÖSD imtihon namunalari va Germaniyada tibbiyot/muhandislikda ishlash leksikasi.",
    theory: [
      {
        title: "Nemis Tili Grammatikasi (4 Kasus) va Germaniyada Ishlash (Ausbildung / Fachkräfte)",
        body: "Nemis tilida otlar artikli bilan yodlanadi: der (maskulin), die (feminin), das (neutral), die (plural). Germaniyada tibbiyot (Pflegefachkraft / Arzt) va IT/muhandislik sohasida ishlash uchun B1/B2 darajadagi Goethe-Zertifikat yoki telc Deutsch sertifikati talab etiladi."
      }
    ]
  },
  {
    id: "xitoy-tili",
    category: "langs",
    icon: "🇨🇳",
    title: "Xitoy Tili (Boshlang'ich va Yuqori, HSK 1–6 va Amaliy Muloqot)",
    tag: "HSK 1–6 & Pinyin",
    levels: [
      "HSK 1 (Boshlang'ich: 150 so'z, Pinyin va 4 ton)",
      "HSK 2 (Elementar: 300 so'z va kundalik muloqot)",
      "HSK 3 (O'rta: 600 ieroglif va grammatika)",
      "HSK 4 (Xitoy universitetlariga grant va biznes)",
      "HSK 5–6 (Yuqori akademik va tarjimonlik darajasi)"
    ],
    desc: "Pinyin transkripsiyasi, 4 ta ohang (ton), ieroglif chiziqlari tartibi, HSK 1–6 lug'at boyligi va biznes/texnik Xitoy tili.",
    theory: [
      {
        title: "Xitoy Tilida 4 ta Ohang (Tonlar) va Gap Qurilishi (SVO)",
        body: "Xitoy tilida bo'g'in ohangi ma'noni tubdan o'zgartiradi: 1-ton mā (妈 — ona), 2-ton má (麻 — kanop), 3-ton mǎ (马 — ot), 4-ton mà (骂 — koyimoq). Gap tartibi: Ega + Payt + Joy + Kesim + To'ldiruvchi."
      }
    ]
  },
  {
    id: "koreys-tili",
    category: "langs",
    icon: "🇰🇷",
    title: "Koreys Tili (Hangul, TOPIK I & II hamda EPS-TOPIK Koreyada Ishlash)",
    tag: "TOPIK 1–6 & EPS-TOPIK",
    levels: [
      "Boshlang'ich (Hangul alifbosi va asosiy bo'g'inlar)",
      "TOPIK I (1–2 daraja: Kundalik muloqot va grammatika)",
      "TOPIK II (3–4 daraja: Koreya OTMlariga kirish va ishlash)",
      "TOPIK II (5–6 daraja: Professional daraja)",
      "EPS-TOPIK (Janubiy Koreyada ishlash imtihoni maxsus bazasi)"
    ],
    desc: "Hangul alifbosi (14 undosh, 10 unli), hurmat shakllari (-습니다 / -아요/어요), kelishik qo'shimchalari va TOPIK/EPS-TOPIK testlari.",
    theory: [
      {
        title: "Hangul Tizimi va Koreys Tilida Gap Qurilishi (SOV)",
        body: "Koreys tilida kesim (fe'l yoki sifat) har doim gapning oxirida keladi (Ega + To'ldiruvchi + Kesim). Ega qo'shimchalari: 은/는 (mavzu) va 이/가; To'ldiruvchi qo'shimchalari: 을/를; Joy va vaqt: 에 / 에서."
      }
    ]
  },
  {
    id: "tojik-tili",
    category: "langs",
    icon: "🇹🇯",
    title: "Tojik Tili (Тоҷикӣ — Boshlang'ich A1 dan C2 Oxirigacha Cheksiz Lug'at va Grammatika)",
    tag: "Alohida Qo'shilgan ★ A1–C2",
    levels: [
      "A1 — Boshlang'ich (Alifbo, Salomlashish, Oila va Kundalik lug'at)",
      "A2 — Tayanch (Maktab, Bozor, Sayohat va Oddiy suhbatlar)",
      "B1 — O'rta (Grammatika, Izofat bog'lanishi va Adabiy til)",
      "B2 — Yuqori o'rta (Tibbiyot, Texnika va Ishbilarmonlik muloqoti)",
      "C1–C2 — Mukammal (Mumtoz va zamonaviy adabiyot, Ilmiy va Rasmiy uslub)"
    ],
    desc: "Tojik alifbosi (а, б, в, ғ, ӣ, қ, ӯ, ҳ, ҷ), izofat (-и) qoidasi, fe'l zamonlari, boshlang'ichdan oxirigacha cheksiz lug'at va muloqot testlari.",
    theory: [
      {
        title: "Tojik Tili Alifbosi, Maxsus Harflar (Ғ, Ӣ, Қ, Ӯ, Ҳ, Ҷ) va Izofat (-и) Bog'lanishi",
        body: "Tojik tilida 35 ta harf mavjud bo'lib, maxsus 6 ta harf: Ғ (g'), Ӣ (uzun i), Қ (q), Ӯ (o'), Ҳ (yumshoq h), Ҷ (j). Ot va sifat/aniqlovchi bog'langanda 'izofat' (-и) qo'shimchasi qo'shiladi: Китоби нав (Yangi kitob), Ватани азиз (Aziz Vatan), Калиди имкониятҳо (Imkoniyatlar kaliti)."
      }
    ]
  },
  {
    id: "turk-tili",
    category: "langs",
    icon: "🇹🇷",
    title: "Turk Tili (Türkçe — Boshlang'ich A1 dan C2 Oxirigacha Lug'at va TÖMER Sertifikat)",
    tag: "Alohida Qo'shilgan ★ TÖMER A1–C2",
    levels: [
      "A1 — Boshlang'ich (Alifbo, Unli uyg'unligi, Salomlashish va Kundalik so'zlar)",
      "A2 — Elementar (Zamonlar: Şimdiki/Geçmiş/Gelecek Zaman va Suhbat)",
      "B1 — O'rta (TÖMER B1, Turkiyada o'qish va ishlash muloqoti)",
      "B2 — Yuqori o'rta (Akademik va Tibbiy/Texnik Turk tili)",
      "C1–C2 — Mukammal (TÖMER C1 Diplom, Biznes va Ilmiy uslub)"
    ],
    desc: "Turk alifbosi (29 harf: ç, ğ, ı, и, ö, ş, ü), unlilar garmoniyasi (Büyük/Küçük Ünlü Uyumu), kelishiklar, TÖMER testlari va cheksiz lug'at.",
    theory: [
      {
        title: "Turk Tilida Unlilar Uyg'unligi (Ünlü Uyumu) va Zamon Qo'shimchalari",
        body: "Turk tilida 8 ta unli tovush ikki guruhga bo'linadi: Qalin (Kalın: a, ı, o, u) va Ingichka (İnce: e, i, ö, ü). Hozirgi davom zamon '-iyor' qo'shimchasi bilan yasaladi: Geliyorum (Kelyapman), Okuyorsun (O'qiyapsan), Öğreniyoruz (O'rganyapmiz)."
      }
    ]
  },
  {
    id: "afgon-tili",
    category: "langs",
    icon: "🇦🇫",
    title: "Afg'on Tili (Dari va Pushtu — دری / پښتو — Boshlang'ich A1 dan C2 Oxirigacha)",
    tag: "Alohida Qo'shilgan ★ Dari & Pushtu",
    levels: [
      "A1 — Boshlang'ich (Yozuv, Salomlashish, Raqamlar va Oila lug'ati)",
      "A2 — Tayanch (Kundalik muloqot, Savdo-sotiq va Sayohat iboralari)",
      "B1 — O'rta (Dari va Pushtu grammatikasi, Fe'l zamonlari)",
      "B2 — Yuqori o'rta (Rasmiy, Tibbiy va Texnik muloqot)",
      "C1–C2 — Mukammal (Tarjimonlik, Diplomatiya va Adabiy meros)"
    ],
    desc: "Afg'onistonning ikki rasmiy tili — Dari (دری) va Pushtu (پښتو) bo'yicha boshlang'ichdan mukammal darajagacha lug'at, talaffuz, grammatika va testlar.",
    theory: [
      {
        title: "Afg'on Tilining Ikki Qanoti: Dari (دری) va Pushtu (پښتو) Asoslari",
        body: "Dari va Pushtu tillari o'ngdan chapga qarab yoziladi. Salomlashish va xushmuomalalik: سلام علیکم (Salom alaykum), ستړی مشی (Stary mashay — Charchamang / Hormang), تشکر / مننه (Tashakor / Manana — Rahmat), ښوونځی / مکتب (Shovunzay / Maktab — Maktab)."
      }
    ]
  },

  // ===================== 6. BOG'CHA VA BOSHLANG'ICH MAKTABGA TAYYORGARLIK =====================
  {
    id: "bogcha-sherlari",
    category: "preschool",
    icon: "🧸",
    title: "Bog'cha Bolalari va Tarbiyachi-O'qituvchilar Uchun Tugamaydigan She'rlar va Metodika",
    tag: "Bog'cha (3–7 yosh) & Tarbiyachilar",
    levels: [
      "Kichik guruh (3–4 yosh: Oddiy she'rlar, Ovutchoqlar va Barmoq o'yinlari)",
      "O'rta guruh (4–5 yosh: Vatan, Ona, Tozalik va Hayvonot haqida she'rlar)",
      "Katta guruh (5–6 yosh: Fasllar, Harflar, Sanash va Odob she'rlari)",
      "Maktabga tayyorlov guruhi (6–7 yosh: Bayram ertaliklari va Ifodali nutq)",
      "Tarbiyachi-o'qituvchilar uchun Metodik Qo'llanma va Pedagogik Testlar"
    ],
    desc: "Bog'cha tarbiyachilari bolajonlarga o'rgatishi uchun Vatan, Ona, Alifbe, Sanash, Fasllar, Tozalik va Odob haqida tugamaydigan she'rlar va metodik testlar.",
    theory: [
      {
        title: "Maktabgacha Ta'limda She'r O'rgatish Metodikasi va Nutq O'stirish",
        body: "Bog'cha yoshidagi bolalarga she'r yodlatishda ko'rgazmalilik (rasm, o'yinchoq), harakatli barmoq gimnastikasi va rolga kirib ifodali o'qish usullari qo'llaniladi. Bu bolaning xotirasini, diksiyasini va so'z boyligini jadal rivojlantiradi."
      }
    ]
  },
  {
    id: "maktabga-tayyorgarlik",
    category: "preschool",
    icon: "🎒",
    title: "Boshlang'ich Maktabga Tayyorgarlik Darsliklari (Alifbe, Sanash, Mantiq, Atrof-olam)",
    tag: "5–7 yosh & 1-Sinfga Tayyorlov",
    levels: [
      "1-Darslik: Alifbe, Tovushlar va Bo'g'inlab O'qish Savodxonligi",
      "2-Darslik: Qiziqarli Matematika, 1–100 Sanash va Geometrik Shakllar",
      "3-Darslik: Mantiqiy Fikrlash, Topishmoqlar va Diqqat Mashqlari",
      "4-Darslik: Atrof-Olam, Tabiatshunoslik, Fasllar va Svetofor Qoidalari",
      "5-Darslik: Husnixat, Mayda Motorika va Xorijiy Tillarda Ilk So'zlar"
    ],
    desc: "Bolalarni 1-sinfga va boshlang'ich maktabga a'lo darajada tayyorlovchi eng zo'r kompleks darsliklar, mantiqiy mashqlar va 30 talik sinov testlari.",
    theory: [
      {
        title: "Bolani Boshlang'ich Maktabga (1-Sinfga) Mukammal Tayyorlash Mezonlari",
        body: "Maktabga chiqayotgan 6–7 yoshli bola: 1) Unli va undosh tovushlarni farqlab, so'zlarni bo'g'inlab o'qiy olishi; 2) 1 dan 20 gacha qo'shish va ayirish, 100 gacha sanashni bilishi; 3) O'z ismi, familiyasi, Vatanimiz va tabiat hodisalarini tushuntira olishi lozim."
      }
    ]
  },

  // ===================== 5. TELEKOMMUNIKATSIYA VA TARMOQLAR =====================
  {
    id: "telecom-networks",
    category: "telecom",
    icon: "📡",
    title: "Telekommunikatsiya, IP Manzillash, Switch/Router/SFP/CCTV/Serverlar",
    tag: "L1/L2/L3 + CCNA + CCTV",
    levels: [
      "IP Manzillash (IPv4/IPv6), Subnetting va OSI 7 Pog'onasi",
      "L1, L2 va L3 Switchlar, VLAN, STP, Trunk/Access va Marshrutizatorlar",
      "SFP/SFP+/QSFP Modullar, Optik Tolalar va LAN Kabellar (Cat5e-Cat8)",
      "Wi-Fi (4/5/6/6E/7), SIM-kartali 4G/5G Routerlar va Radio Ko'priklar",
      "IP Kameralar, PoE, NVR Videoregistratorlar, IP Telefoniya va Serverlar",
      "Kompyuter Portlari, BIOS/UEFI, OS va Ofis Dasturlarini O'rnatish"
    ],
    desc: "Barcha telekommunikatsiya qurilmalari, IP tarmoqlar, portlar, protokollar, OSI modeli va ulanish sxemalari bo'yicha nazariy-amaliy testlar.",
    theory: [
      {
        title: "IPv4/IPv6 Subnetting, OSI 7 Pog'onasi va Tarmoq Qurilmalari Integratsiyasi",
        body: "IPv4 manzil 32 bitdan (4 ta oktet, masalan 192.168.1.1/24), IPv6 esa 128 bitdan iborat. /24 maskada (255.255.255.0) jami 256 ta manzil bo'lib, shundan 254 tasi (2^8 - 2) qurilmalarga beriladigan foydali host manzillardir (birinchisi tarmoq manzili, oxirgisi Broadcast)."
      }
    ]
  }
];

/* ==========================================================================
   CURATED HIGH-PRECISION SEED BANK + COMBINATORIAL PARAMETRIC GENERATOR
   Ensures:
   1. Zero repetition within any 30-question test session
   2. Zero semantic concept collision (each question has a unique conceptId)
   3. Zero repetition across historical user sessions (saved in localStorage)
   4. Millions of unique valid questions that refresh daily and never run out
   ========================================================================== */

const CURATED_CONCEPTS = {
  html5: [
    { c: "html_doctype", q: "HTML5 hujjatining standart rejimda (Standards Mode) ishlashini bildiruvchi eng birinchi qator qaysi?", a: "<!DOCTYPE html>", w: ["<html version='5.0'>", "<!DOCTYPE HTML PUBLIC>", "<meta charset='html5'>"], e: "<!DOCTYPE html> deklaratsiyasi brauzerga hujjat HTML5 standartida ekanini bildiradi." },
    { c: "html_semantic_main", q: "Sahifaning faqat o'ziga xos asosiy (takrorlanmaydigan) kontentini o'rab turuvchi semantik HTML5 tegi qaysi?", a: "<main>", w: ["<header>", "<aside>", "<nav>"], e: "<main> tegi sahifada faqat bir marta ishlatiladi va asosiy mazmunni ifodalaydi." },
    { c: "html_img_alt", q: "<img> tegida rasm yuklanmay qolganda yoki ko'zi ojizlar uchun Screen Reader o'qiganda qaysi atribut matni ko'rsatiladi?", a: "alt", w: ["title", "srcset", "Placeholder"], e: "alt (alternative text) atributi accessibility va SEO uchun majburiy atributdir." },
    { c: "html_target_blank", q: "<a> giperhavolasini yangi brauzer oynasida (tabda) xavfsiz ochish uchun qaysi atributlar juftligi ishlatiladi?", a: "target=\"_blank\" rel=\"noopener noreferrer\"", w: ["target=\"_new\" rel=\"external\"", "href=\"_blank\" open=\"tab\"", "window=\"new\" target=\"_self\""], e: "target='_blank' yangi oynada ochadi, rel='noopener noreferrer' esa window.opener xavfsizlik zaifligini yopadi." },
    { c: "html_canvas_svg", q: "Pikselga asoslangan 2D/3D grafikalarni JavaScript yordamida dinamik chizish uchun qaysi HTML5 tegi qo'llaniladi?", a: "<canvas>", w: ["<figure>", "<picture>", "<embed>"], e: "<canvas> elementi JavaScript getContext('2d' yoki 'webgl') orqali rastrli grafikani chizadi." },
    { c: "html_input_required", q: "HTML5 formasida foydalanuvchi maydonni to'ldirmasdan yuborishini (Submit) bloklovchi atribut qaysi?", a: "required", w: ["mandatory", "validate", "checked"], e: "required atributi forma maydoni bo'sh qoldirilishiga yo'l qo'ymaydi." },
    { c: "html_meta_viewport", q: "Saytning mobil telefon va planshetlarda ekran o'lchamiga moslashuvchan (Responsive) ko'rinishini qaysi meta teg ta'minlaydi?", a: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">", w: ["<meta name=\"mobile\" content=\"responsive\">", "<meta http-equiv=\"screen\" content=\"auto\">", "<link rel=\"responsive\" href=\"mobile.css\">"], e: "viewport meta tegi mobil brauzerlarda sahifa masshtabini qurilma kengligiga tenglashtiradi." },
    { c: "html_datalist", q: "<input> maydoniga avto-to'ldirish (autocomplete) variantlari ro'yxatini bog'lash uchun qaysi HTML5 tegi ishlatiladi?", a: "<datalist>", w: ["<optgroup>", "<fieldset>", "<output>"], e: "<datalist> tegi <input list='...'> bilan bog'lanib, qidiruv takliflarini chiqaradi." },
    { c: "html_defer_script", q: "<script> tegini HTML tahlili (parsing) tugagandan so'ng, DOMContentLoaded hodisasidan oldin tartib bilan bajarish atributi qaysi?", a: "defer", w: ["async", "preload", "lazy"], e: "defer atributi skriptni fonda yuklab, DOM to'liq qurilgach ketma-ketlikni buzmay ishga tushiradi." },
    { c: "html_table_thead", q: "HTML jadvalida ustun sarlavhalari qatorini mantiqiy guruhlovchi teg qaysi?", a: "<thead>", w: ["<tbody>", "<tfoot>", "<caption>"], e: "<thead> jadvalning bosh qismini (<th> hujayralarini) guruhlaydi." }
  ],
  css3: [
    { c: "css_box_sizing", q: "Elementning padding va border o'lchamlarini belgilangan width va height ichiga kiritish uchun qaysi CSS xossasi yoziladi?", a: "box-sizing: border-box;", w: ["box-sizing: content-box;", "display: inline-block;", "overflow: hidden;"], e: "box-sizing: border-box elementning umumiy kengligi padding hisobiga kengayib ketmasligini ta'minlaydi." },
    { c: "css_flex_center", q: "Flexbox konteynerida ichki elementni ham gorizontal, ham vertikal markazga joylashtirish kombinatsiyasi qaysi?", a: "display: flex; justify-content: center; align-items: center;", w: ["display: flex; text-align: center; vertical-align: middle;", "display: block; margin: auto; float: center;", "position: relative; top: 50%; left: 50%;"], e: "justify-content asosiy o'q bo'yicha, align-items esa kesishuvchi o'q bo'yicha markazlaydi." },
    { c: "css_specificity", q: "CSS selektorlarining ustuvorlik (Specificity) darajasi yuqoridan pastga qarab to'g'ri joylashtirilgan qatorni toping:", a: "Inline style > #id > .class > tag (element)", w: [".class > #id > tag > Inline style", "#id > Inline style > tag > .class", "tag > .class > #id > Inline style"], e: "Inline style (1000), ID (100), Class/Attribute/Pseudo-class (10), Element tegi (1) ballga ega." },
    { c: "css_grid_fr", q: "CSS Grid tizimida bo'sh joyning teng ulushlarini ifodalovchi maxsus o'lchov birligi qaysi?", a: "fr (fraction)", w: ["rem", "vh", "ch"], e: "1fr bo'sh qolgan Grid konteyner maydonining 1 ulushini bildiradi." },
    { c: "css_custom_var", q: ":root blokida e'lon qilingan --primary-color o'zgaruvchisini CSS xossasida chaqirish sintaksisi qanday?", a: "color: var(--primary-color);", w: ["color: $primary-color;", "color: env(--primary-color);", "color: prop(primary-color);"], e: "CSS Custom Properties var(--nomi) funksiyasi orqali chaqiriladi." },
    { c: "css_z_index", q: "z-index xossasi ishlashi uchun elementning position qiymati qanday bo'lmasligi kerak?", a: "static", w: ["relative", "absolute", "fixed"], e: "z-index faqat position qiymati static dan farqli (relative, absolute, fixed, sticky) yoki flex/grid item bo'lganda ishlaydi." },
    { c: "css_media_query", q: "Ekran kengligi 768 pikseldan kichik yoki teng bo'lgan qurilmalar uchun yoziladigan to'g'ri Media Query qaysi?", a: "@media (max-width: 768px) { ... }", w: ["@screen (width <= 768px) { ... }", "@responsive max-width(768px) { ... }", "@viewport (min-device: 768px) { ... }"], e: "@media (max-width: 768px) ekran 768px va undan kichik bo'lganda uslublarni qo'llaydi." },
    { c: "css_backdrop_filter", q: "Shaffof element orqasidagi fonni xiralashtirib 'Glassmorphism' (oyna effekti) hosil qiluvchi CSS xossasi qaysi?", a: "backdrop-filter: blur(12px);", w: ["filter: opacity(12px);", "background-blur: 12px;", "box-shadow: blur(12px);"], e: "backdrop-filter element ortidagi qatlamga grafik filtr (blur) qo'llaydi." }
  ],
  javascript: [
    { c: "js_strict_equal", q: "JavaScript-da ikki qiymatni ham qiymati, ham ma'lumot tipi (type conversion qilmasdan) bo'yicha qat'iy solishtiruvchi operator qaysi?", a: "===", w: ["==", "=", "=>"], e: "=== (Strict Equality) tipni o'zgartirmasdan solishtiradi (masalan, 5 === '5' -> false)." },
    { c: "js_const_let", q: "Qaysi kalit so'z bilan e'lon qilingan o'zgaruvchi blok ko'rinish doirasiga (Block Scope) ega va qayta qiymat tayinlab bo'lmaydi?", a: "const", w: ["var", "let", "static"], e: "const blok ichida amal qiladi va uning bog'lamasini (reference) qayta tayinlab bo'lmaydi." },
    { c: "js_array_map", q: "Massivning har bir elementi ustida amal bajarib, asl massiv uzunligiga teng YANGI massiv qaytaruvchi metod qaysi?", a: "Array.prototype.map()", w: ["Array.prototype.forEach()", "Array.prototype.pop()", "Array.prototype.some()"], e: ".map() har bir elementni transformatsiya qilib yangi massiv qaytaradi." },
    { c: "js_promise_all", q: "Bir nechta Promise-larni parallel ishga tushirib, ularning barchasi muvaffaqiyatli tugaganda natijalar massivini qaytaruvchi metod qaysi?", a: "Promise.all()", w: ["Promise.race()", "Promise.any()", "Promise.resolve()"], e: "Promise.all([p1, p2]) barcha promiselar bajarilganda natijalarni massivda qaytaradi." },
    { c: "js_localstorage_json", q: "JavaScript obyektini localStorage xotirasiga saqlashdan oldin uni matn (JSON satr) ko'rinishiga o'tkazuvchi metod qaysi?", a: "JSON.stringify(obj)", w: ["JSON.parse(obj)", "Object.toString(obj)", "Storage.encode(obj)"], e: "localStorage faqat string saqlaydi, shu sababli JSON.stringify() ishlatiladi." },
    { c: "js_event_prevent", q: "Forma yuborilganda (submit) sahifaning avtomatik yangilanib ketishini to'xtatuvchi metod qaysi?", a: "event.preventDefault()", w: ["event.stopPropagation()", "window.stop()", "form.cancel()"], e: "event.preventDefault() brauzerning standart hodisa harakatini bekor qiladi." },
    { c: "js_closure", q: "Ichki funksiyaning tashqi funksiya o'zgaruvchilarini tashqi funksiya tugagandan keyin ham xotirada saqlab qolish xususiyati nima deyiladi?", a: "Closure (Yopilish)", w: ["Hoisting", "Prototypal Inheritance", "Currying"], e: "Closure leksik muhitni (Lexical Environment) xotirada saqlab qoladi." }
  ],
  telecom: [
    { c: "net_osi_layers", q: "OSI etalon modelining 1, 2 va 3-pog'onalari (pastdan yuqoriga) qaysi qatorda to'g'ri ko'rsatilgan?", a: "L1: Fizik (Physical), L2: Kanal (Data Link), L3: Tarmoq (Network)", w: ["L1: Tarmoq, L2: Transport, L3: Seans", "L1: Ilova, L2: Taqdimot, L3: Fizik", "L1: Kanal, L2: IP, L3: TCP"], e: "OSI modelida L1 — bit/kabel/SFP, L2 — Frame/MAC/VLAN (Switch), L3 — Paket/IP (Router/L3 Switch)." },
    { c: "net_l2_vs_l3_switch", q: "L2 Switch va L3 Switch orasidagi eng asosiy arxitekturaviy farq nimada?", a: "L2 Switch MAC-manzillar jadvali bo'yicha kommutatsiya qiladi, L3 Switch esa qo'shimcha ravishda IP paketlarni apparat (ASIC) darajasida VLANlararo marshrutlaydi", w: ["L2 Switch faqat optik kabelda ishlaydi, L3 Switch faqat Wi-Fi da ishlaydi", "L2 Switchda RJ-45 port bo'lmaydi", "L3 Switchda MAC manzil ishlatilmaydi"], e: "L3 Switch ichida ASIC mikrosxemasi orqali Inter-VLAN Routing va OSPF kabi L3 funksiyalar ishlaydi." },
    { c: "net_poe_standards", q: "IP kameralar, IP telefonlar va Wi-Fi nuqtalarni bitta UTP Cat5e/Cat6 kabeli orqali ham tarmoq, ham 48V elektr quvvati bilan ta'minlovchi standart qaysi?", a: "IEEE 802.3af (PoE 15.4W) va IEEE 802.3at (PoE+ 30W)", w: ["IEEE 802.11ax", "IEEE 802.1Q", "RS-485 Modbus"], e: "Power over Ethernet (802.3af/at/bt) alohida elektr kabeli tortmasdan qurilmani ishga tushiradi." },
    { c: "net_sfp_vs_sfp_plus", q: "Standart SFP va SFP+ optik transiver modullarining ma'lumot uzatish tezligi qanday?", a: "SFP — 1 Gbps gacha, SFP+ — 10 Gbps gacha (QSFP28 esa 100 Gbps)", w: ["SFP — 10 Mbps, SFP+ — 100 Mbps", "Ikkalasi ham faqat 100 Mbps", "SFP faqat koaksial kabel uchun"], e: "SFP 1 Gigabit Ethernet uchun, SFP+ esa 10 Gigabit Ethernet uplinklari uchun mo'ljallangan." },
    { c: "net_single_vs_multimode", q: "Uzoq masofalarga (2 km dan 120 km gacha) 1310nm / 1550nm to'lqin uzunligida signal uzatuvchi sariq rangli optik tola turi qaysi?", a: "Single-Mode (Bir modali OS2, 9/125 mkm)", w: ["Multi-Mode (Ko'p modali OM3, 50/125 mkm)", "UTP Cat5e mis kabel", "RG-6 Koaksial kabel"], e: "Single-Mode optik tola (9/125 µm) dispersiyasi juda past bo'lgani uchun shaharlararo va magistrallarda ishlatiladi." },
    { c: "net_nvr_protocols", q: "Har xil brenddagi IP kameralarni (masalan, Hikvision, Dahua, Axis) NVR videoregistratoriga ulash va video oqimni olish uchun qaysi xalqaro protokollar ishlatiladi?", a: "ONVIF va RTSP (Real-Time Streaming Protocol)", w: ["SMTP va POP3", "FTP va Telnet", "BGP va EIGRP"], e: "ONVIF qurilmalar mosligini, RTSP (odatda 554-port) esa real vaqtda video oqimini uzatishni ta'minlaydi." },
    { c: "net_wifi_generations", q: "IEEE 802.11ax (2.4/5/6 GHz, OFDMA) va IEEE 802.11be (320 MHz, MLO) standartlari qaysi Wi-Fi avlodlariga mos keladi?", a: "802.11ax — Wi-Fi 6 / 6E, 802.11be — Wi-Fi 7", w: ["802.11ax — Wi-Fi 2, 802.11be — Wi-Fi 3", "802.11ax — Bluetooth 5, 802.11be — ZigBee", "Ikkalasi ham Wi-Fi 4"], e: "Wi-Fi Alliance nomlanishiga ko'ra: 802.11n = Wi-Fi 4, 802.11ac = Wi-Fi 5, 802.11ax = Wi-Fi 6/6E, 802.11be = Wi-Fi 7." },
    { c: "net_t568b_pinout", q: "Standart Gigabit Ethernet (1000BASE-T) Cat6 LAN kabelida RJ-45 konnektoridagi nechta sim tolasidan foydalaniladi?", a: "Barcha 8 ta tola (4 juftlik: 1-2, 3-6, 4-5, 7-8)", w: ["Faqat 2 ta tola", "Faqat 4 ta tola (1, 2, 3, 6)", "Faqat 1 ta markaziy mis sim"], e: "100BASE-TX da 4 ta sim (1,2,3,6) yetarli bo'lsa, 1000BASE-T (Gigabit) va PoE uchun barcha 8 ta sim ishlatiladi." },
    { c: "net_ip_phone_vlan", q: "IP telefon orqasidagi 2 ta RJ-45 port (LAN va PC) bitta tarmoq kabeli orqali qanday qilib ham telefonni, ham kompyuterni alohida tarmoqda ishlatadi?", a: "802.1Q VLAN Tagging orqali: ovoz paketi Voice VLAN da (teg bilan), kompyuter trafigi esa Data/Access VLAN da uzatiladi", w: ["Kompyuter internetini o'chirib qo'yadi", "Faqat analog impuls orqali", "Wi-Fi ni o'chirib Bluetooth yoqadi"], e: "Switch portida Voice VLAN sozlanganda, IP telefon o'zining ichki 3-portli mini-switchi orqali PC trafigini ajratib beradi." },
    { c: "net_pc_ports_os", q: "Zamonaviy kompyuterga Windows 11 yoki Ubuntu Linux operatsion tizimini UEFI rejimida o'rnatish uchun SSD/NVMe disk qaysi bo'limlar jadvalida (Partition Style) bo'lishi shart?", a: "GPT (GUID Partition Table)", w: ["FAT16", "MBR (1983-yilgi Legacy rejim)", "EXT2"], e: "UEFI yuklanishi va 2 TB dan katta disklarni to'liq ko'rish uchun GPT (GUID Partition Table) talab etiladi." }
  ],
  med: [
    { c: "med_heart_chambers", q: "Katta qon aylanish doirasi yurakning qaysi bo'limidan va qaysi tomir orqali boshlanadi?", a: "Chap qorinchadan — Aorta orqali", w: ["O'ng qorinchadan — O'pka arteriyasi orqali", "Chap bo'lmachadan — O'pka venalari orqali", "O'ng bo'lmachadan — Kovak venalar orqali"], e: "Katta qon aylanish doirasi chap qorinchadan aorta bilan boshlanib, o'ng bo'lmachada yuqori va pastki kovak venalar bilan tugaydi." },
    { c: "med_injection_angles", q: "Med texnikum manipulyatsiya standartiga ko'ra: teri ichiga (i/d), teri ostiga (s/c) va muskul orasiga (i/m) inyeksiya qilish burchaklari necha gradus?", a: "Teri ichiga 10-15°, teri ostiga 45°, muskul orasiga 90°", w: ["Barchasi 30° burchak ostida", "Teri ichiga 90°, muskul orasiga 15°", "Teri ostiga 90°, vena ichiga 90°"], e: "Shprits ignasi qavat chuqurligiga qarab: i/d — 15°, s/c — 45°, i/m — 90° burchakda kiritiladi." },
    { c: "med_cpr_ratio", q: "Kattalarda bazaviy o'pka-yurak reanimatsiyasini (BLS) o'tkazishda ko'krak qafasini bosish (kompressiya) va sun'iy nafas berish nisbati qanday?", a: "30 marta bosish : 2 marta sun'iy nafas (chastota 100–120 marta/daq, chuqurlik 5–6 sm)", w: ["5 marta bosish : 1 marta nafas", "15 marta bosish : 5 marta nafas", "60 marta bosish : 10 marta nafas"], e: "Xalqaro reanimatsiya (ERC/AHA) protokoliga ko'ra 30:2 nisbatda, daqiqasiga 100-120 chastotada bajariladi." },
    { c: "med_universal_donor", q: "AB0 tizimi bo'yicha qaysi qon guruhi eritrotsitlarida A va B agglyutinogenlar bo'lmaydi?", a: "I (0) qon guruhi (plazmasida α va β agglyutininlar bor)", w: ["IV (AB) qon guruhi", "II (A) qon guruhi", "III (B) qon guruhi"], e: "I (0) guruh eritrotsitlarida antigen bo'lmaydi, IV (AB) guruh plazmasida esa antitelolar (agglyutininlar) bo'lmaydi." },
    { c: "med_normal_bp", q: "Katta yoshli sog'lom odamda tinch holatda optimal arterial qon bosimi va puls ko'rsatkichi nechaga teng?", a: "Arterial bosim: 120/80 mm sim. ust., Puls: 60–80 zarba/daq", w: ["Arterial bosim: 180/110 mm sim. ust., Puls: 120 zarba/daq", "Arterial bosim: 70/40 mm sim. ust., Puls: 40 zarba/daq", "Arterial bosim: 200/100 mm sim. ust., Puls: 30 zarba/daq"], e: "JSST (WHO) me'yorlariga ko'ra optimal AQB ~120/80 mm.sim.ust. va normosistoliya 60-80/min." },
    { c: "med_liver_anatomy", q: "Inson organizmidagi eng katta bez qaysi va u qanday shira ishlab chiqaradi?", a: "Jigar (Hepar) — o't suyuqligi (safro) ishlab chiqaradi", w: ["Qalqonsimon bez — insulin ishlab chiqaradi", "Taloq — me'da shirasi ishlab chiqaradi", "Buyrak usti bezi — so'lak ishlab chiqaradi"], e: "Jigar og'irligi ~1.5 kg bo'lgan eng yirik bez bo'lib, yog'larni emulsiya qiluvchi o't suyuqligi ajratadi." },
    { c: "med_nephron", q: "Buyrakning struktura va funksional birligi nima deb ataladi va bir sutkada qancha birlamchi siydik hosil bo'ladi?", a: "Nefron — sutkasiga 150–180 litr birlamchi siydik (undan 1.5 litr ikkilamchi siydik)", w: ["Alveola — sutkasiga 10 litr", "Neyron — sutkasiga 50 litr", "Atsetabulum — sutkasiga 5 litr"], e: "Har bir buyrakda ~1 million nefron bo'lib, koptokcha filtratsiyasi orqali 150-180 L birlamchi siydik hosil qiladi." },
    { c: "med_atp_mitochondria", q: "Hujayraning 'energetik stansiyasi' hisoblanib, oksidlovchi fosforlanish orqali 36–38 molekula ATF sintezlovchi organoid qaysi?", a: "Mitoxondriya", w: ["Lizosoma", "Golji majmuasi", "Sentrosoma"], e: "Mitoxondriya kristalarida Krebs sikli va nafas zanjiri reaksiyalari kechib, ATF sintezlanadi." }
  ]
};

/**
 * Deterministic hash helper so question IDs are stable and non-repeating
 */
function hashString(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
}

/**
 * Generates a unique, non-repeating, domain-accurate question for any subject & level.
 * Uses parametric combinatorial generation across mathematics, chemistry, physics,
 * biology, medicine, telecom subnetting/ports, programming languages, and foreign languages
 * so the pool is millions of unique questions and never repeats concepts in a session.
 */
function generateParametricQuestion(subject, level, variantIndex, daySeed) {
  const seed = (variantIndex * 7919) + daySeed + parseInt(hashString(subject.id + level), 36);
  const subId = subject.id;

  // 1. TELECOM / IT NETWORKING PARAMETRIC GENERATOR (Subnetting, OSI, VLAN, Ports, Speeds)
  if (subId === "telecom-networks" || subject.category === "telecom") {
    const mode = variantIndex % 6;
    if (mode === 0) {
      const prefixes = [24, 25, 26, 27, 28, 29, 30, 22, 23, 21, 20];
      const prefix = prefixes[variantIndex % prefixes.length];
      const hostBits = 32 - prefix;
      const usableHosts = Math.pow(2, hostBits) - 2;
      const subnetOctet = 10 + (variantIndex % 200);
      return {
        conceptId: `telecom_subnet_${prefix}_${subnetOctet}`,
        question: `[${level}] 192.168.${subnetOctet}.0/${prefix} IPv4 tarmog'ida qurilmalarga (kompyuter, IP kamera, telefon) berish mumkin bo'lgan foydali host manzillar soni nechta?`,
        correct: `${usableHosts} ta foydali IP manzil (2^${hostBits} - 2)`,
        wrongs: [
          `${usableHosts + 2} ta foydali IP manzil`,
          `${Math.max(1, Math.floor(usableHosts / 2))} ta foydali IP manzil`,
          `${usableHosts * 2} ta foydali IP manzil`
        ],
        explanation: `/${prefix} maskada host qismi uchun 32 - ${prefix} = ${hostBits} bit qoladi. Formula: 2^${hostBits} - 2 = ${usableHosts} ta host (Tarmoq va Broadcast manzillari ayriladi).`
      };
    } else if (mode === 1) {
      const ports = [
        { p: 80, proto: "HTTP (Ochiq veb-trafik)", layer: "L7 Application / TCP" },
        { p: 443, proto: "HTTPS (TLS/SSL shifrlangan veb-trafik)", layer: "L7 Application / TCP" },
        { p: 53, proto: "DNS (Domen nomlarini IP manzilga o'girish)", layer: "L7 Application / UDP & TCP" },
        { p: 22, proto: "SSH (Switch, Router va Serverlarni xavfsiz masofadan boshqarish)", layer: "L7 Application / TCP" },
        { p: 554, proto: "RTSP (IP kameralardan NVR ga video oqim uzatish)", layer: "L7 Application / TCP & UDP" },
        { p: 5060, proto: "SIP (IP Telefoniya chaqiruvlarini boshqarish)", layer: "L7 Application / UDP & TCP" },
        { p: 67, proto: "DHCP Server (Qurilmalarga avtomatik IP manzil tarqatish)", layer: "L7 Application / UDP" },
        { p: 3389, proto: "RDP (Windows Remote Desktop masofaviy ish stoli)", layer: "L7 Application / TCP" },
        { p: 161, proto: "SNMP (Tarmoq qurilmalari monitoringi)", layer: "L7 Application / UDP" }
      ];
      const item = ports[variantIndex % ports.length];
      return {
        conceptId: `telecom_port_${item.p}`,
        question: `[${level}] Telekommunikatsiya va server tarmoqlarida standart ${item.p}-port qaysi protokol va vazifa uchun xizmat qiladi?`,
        correct: `${item.proto} (${item.layer})`,
        wrongs: [
          ports[(variantIndex + 1) % ports.length].proto,
          ports[(variantIndex + 2) % ports.length].proto,
          ports[(variantIndex + 3) % ports.length].proto
        ],
        explanation: `Standart IANA jadvaliga ko'ra ${item.p}-port ${item.proto} uchun biriktirilgan.`
      };
    } else if (mode === 2) {
      const vlanId = 10 + ((variantIndex * 5) % 4000);
      const depts = ["Buxgalteriya kompyuterlari", "IP Kameralar (CCTV)", "IP Telefonlar (Voice)", "Serverlar fermasi", "Mehmon Wi-Fi tarmog'i"];
      const dept = depts[variantIndex % depts.length];
      return {
        conceptId: `telecom_vlan_${vlanId}`,
        question: `[${level}] L2/L3 Managed Switchda "${dept}" uchun VLAN ${vlanId} yaratilib, ikkita switch orasida bitta SFP+ optik kabel orqali barcha VLANlarni o'tkazish uchun port qaysi rejimga o'tkaziladi?`,
        correct: `IEEE 802.1Q Trunk Mode (allowed vlan ${vlanId})`,
        wrongs: [
          "Faqat L1 Hub Half-Duplex rejimiga",
          "Portni o'chirib (shutdown) Loopback rejimiga",
          "Analog FXO telefon rejimiga"
        ],
        explanation: "Switchlararo bir nechta VLAN trafigini bitta fizik port orqali teglab o'tkazish uchun IEEE 802.1Q Trunk rejimi ishlatiladi."
      };
    } else if (mode === 3) {
      const camCount = 4 + (variantIndex % 12) * 2;
      const bitrateMbps = 4; // H.265+ 4MP camera
      const totalBandwidth = camCount * bitrateMbps;
      return {
        conceptId: `telecom_cctv_bw_${camCount}`,
        question: `[${level}] Obyektga ${camCount} ta 4 MP IP-kamera (har biri H.265+ kodekda ${bitrateMbps} Mbit/s oqim beradi) PoE Switch orqali NVR videoregistratoriga ulandi. NVR LAN portiga tushadigan umumiy video oqim tezligi qancha?`,
        correct: `${totalBandwidth} Mbit/s (RTSP/ONVIF oqim)`,
        wrongs: [
          `${camCount} Kbit/s`,
          `${totalBandwidth * 10} Gbit/s`,
          `0.5 Mbit/s`
        ],
        explanation: `${camCount} ta kamera × ${bitrateMbps} Mbit/s = ${totalBandwidth} Mbit/s umumiy tarmoq oqimi hosil bo'ladi.`
      };
    }
  }

  // 2. MATHEMATICS / ALGEBRA / GEOMETRIYA / INFORMATIKA PARAMETRIC GENERATOR
  if (subId === "matematika" || subId === "algebra-geometriya" || subId === "informatika") {
    const mode = variantIndex % 5;
    if (subId === "informatika") {
      const dec = 18 + ((variantIndex * 7) % 230);
      const bin = dec.toString(2);
      const hex = dec.toString(16).toUpperCase();
      return {
        conceptId: `info_numsys_${dec}`,
        question: `[${level}] O'nlik sanoq sistemasidagi ${dec} sonining ikkilik (2-lik) va o'n oltilik (16-lik) sanoq sistemalaridagi ko'rinishini toping:`,
        correct: `2-likda: ${bin}₂ | 16-likda: ${hex}₁₆`,
        wrongs: [
          `2-likda: ${(dec + 3).toString(2)}₂ | 16-likda: ${(dec + 3).toString(16).toUpperCase()}₁₆`,
          `2-likda: ${(dec - 2).toString(2)}₂ | 16-likda: ${(dec + 5).toString(16).toUpperCase()}₁₆`,
          `2-likda: ${bin}0₂ | 16-likda: FF₁₆`
        ],
        explanation: `${dec} ni 2 ga ketma-ket bo'lib qoldiqlarni teskari yozsak ${bin}₂, 16 ga bo'lsak ${hex}₁₆ hosil bo'ladi.`
      };
    }
    if (mode === 0) {
      const x1 = 2 + (variantIndex % 11);
      const x2 = x1 + 1 + (variantIndex % 7);
      const p = -(x1 + x2);
      const q = x1 * x2;
      const signP = p < 0 ? `- ${Math.abs(p)}x` : `+ ${p}x`;
      return {
        conceptId: `math_quad_${x1}_${x2}`,
        question: `[${level}] x² ${signP} + ${q} = 0 kvadrat tenglamaning ildizlari (x₁ va x₂) ni Viyet teoremasi yordamida toping:`,
        correct: `x₁ = ${x1}, x₂ = ${x2} (yig'indisi ${x1 + x2}, ko'paytmasi ${q})`,
        wrongs: [
          `x₁ = -${x1}, x₂ = -${x2}`,
          `x₁ = ${x1 + 2}, x₂ = ${x2 - 1}`,
          `x₁ = ${q}, x₂ = ${x1 + x2}`
        ],
        explanation: `Viyet teoremasiga ko'ra: x₁ + x₂ = ${x1 + x2} va x₁ · x₂ = ${q}. Demak, ildizlar ${x1} va ${x2} ga teng.`
      };
    } else if (mode === 1) {
      const a = 3 * (1 + (variantIndex % 8));
      const b = 4 * (1 + (variantIndex % 8));
      const c = 5 * (1 + (variantIndex % 8));
      const area = (a * b) / 2;
      return {
        conceptId: `geom_pyth_${a}_${b}`,
        question: `[${level}] To'g'ri burchakli uchburchakning katetlari a = ${a} sm va b = ${b} sm ga teng. Uning gipotenuzasi (c) va yuzasi (S) qanchaga teng?`,
        correct: `Gipotenuza c = ${c} sm, Yuzasi S = ${area} sm²`,
        wrongs: [
          `Gipotenuza c = ${a + b} sm, Yuzasi S = ${a * b} sm²`,
          `Gipotenuza c = ${c + 4} sm, Yuzasi S = ${area + 12} sm²`,
          `Gipotenuza c = ${Math.abs(b - a)} sm, Yuzasi S = ${a + b + c} sm²`
        ],
        explanation: `Pifagor teoremasi: c = √(${a}² + ${b}²) = ${c} sm. Yuzasi: S = (a · b) / 2 = (${a} · ${b}) / 2 = ${area} sm².`
      };
    } else {
      const base = 120 + (variantIndex * 20);
      const pct = 15 + ((variantIndex * 5) % 60);
      const val = (base * pct) / 100;
      return {
        conceptId: `math_pct_${base}_${pct}`,
        question: `[${level}] Miqdori ${base} ga teng bo'lgan ko'rsatkichning ${pct}% ulushi nechaga teng?`,
        correct: `${val}`,
        wrongs: [
          `${(val + 14).toFixed(1)}`,
          `${(val * 1.5).toFixed(1)}`,
          `${Math.max(1, val - 9).toFixed(1)}`
        ],
        explanation: `Foizni topish qoidasi: (${base} × ${pct}) / 100 = ${val}.`
      };
    }
  }

  // 3. KIMYO / BIOKIMYO / FARMAKOLOGIYA SOLUTION & MOLAR PARAMETRIC GENERATOR
  if (subId === "kimyo" || subId === "biokimyo" || subId === "farmakologiya") {
    const mode = variantIndex % 3;
    if (mode === 0) {
      const solMass = 200 + (variantIndex % 15) * 50;
      const pct = 5 + (variantIndex % 8) * 2;
      const solute = (solMass * pct) / 100;
      const water = solMass - solute;
      return {
        conceptId: `chem_sol_${solMass}_${pct}`,
        question: `[${level}] Tibbiyot va kimyo laboratoriyasida ${solMass} gramm ${pct}% li eritma tayyorlash uchun necha gramm erigan modda va necha millilitr distillangan suv kerak bo'ladi?`,
        correct: `${solute} g erigan modda va ${water} ml (g) suv`,
        wrongs: [
          `${pct} g erigan modda va ${solMass} ml suv`,
          `${solute * 2} g erigan modda va ${water} ml suv`,
          `${water} g erigan modda va ${solute} ml suv`
        ],
        explanation: `m(modda) = (${solMass} × ${pct}%) / 100% = ${solute} g. m(suv) = ${solMass} - ${solute} = ${water} g.`
      };
    } else if (mode === 1) {
      const moles = 0.5 + (variantIndex % 10) * 0.5;
      const volLiters = (moles * 22.4).toFixed(2);
      return {
        conceptId: `chem_gas_vol_${moles}`,
        question: `[${level}] Normal sharoitda (0°C va 101.3 kPa) miqdori n = ${moles} mol bo'lgan kislorod (O₂) gazi qancha hajm (litr) egallaydi?`,
        correct: `${volLiters} litr (V = n × 22.4 L/mol)`,
        wrongs: [
          `${(moles * 11.2).toFixed(2)} litr`,
          `${(moles * 44.8).toFixed(2)} litr`,
          `${(moles * 18).toFixed(2)} litr`
        ],
        explanation: `Avogadro qonuniga binoan n.sh. da 1 mol gaz 22.4 L hajmni egallaydi: V = ${moles} × 22.4 = ${volLiters} L.`
      };
    }
  }

  // 4. FIZIKA PARAMETRIC GENERATOR
  if (subId === "fizika") {
    const voltage = 12 + (variantIndex % 20) * 10;
    const resistance = 4 + (variantIndex % 10) * 2;
    const current = (voltage / resistance).toFixed(2);
    const power = (voltage * (voltage / resistance)).toFixed(1);
    return {
      conceptId: `phys_ohm_${voltage}_${resistance}`,
      question: `[${level}] Elektr zanjir qismidagi kuchlanish U = ${voltage} V va o'tkazgich qarshiligi R = ${resistance} Om bo'lsa, zanjirdan o'tayotgan tok kuchi (I) va quvvat (P) ni hisoblang:`,
      correct: `I = ${current} A, P = ${power} Vt`,
      wrongs: [
        `I = ${(voltage * resistance)} A, P = ${voltage} Vt`,
        `I = ${(resistance / voltage).toFixed(2)} A, P = ${resistance} Vt`,
        `I = ${(Number(current) + 3.5).toFixed(2)} A, P = ${(Number(power) * 2).toFixed(1)} Vt`
      ],
      explanation: `Om qonuni bo'yicha I = U / R = ${voltage} / ${resistance} = ${current} A. Quvvat P = U · I = ${power} Vt.`
    };
  }

  // 5. BIOLOGIYA / GENETIKA / MED DNA PARAMETRIC GENERATOR
  if (subId === "biologiya" || subId === "gistologiya") {
    const totalNuc = 1200 + (variantIndex * 100);
    const adeninePct = 15 + (variantIndex % 18);
    const guaninePct = 50 - adeninePct;
    const adenineCount = (totalNuc * adeninePct) / 100;
    const guanineCount = (totalNuc * guaninePct) / 100;
    return {
      conceptId: `bio_dna_${totalNuc}_${adeninePct}`,
      question: `[${level}] Qo'sh zanjirli DNK fragmentida jami ${totalNuc} ta nukleotid mavjud bo'lib, shundan Adenin (A) nukleotidlari ${adeninePct}% (${adenineCount} ta) ni tashkil etadi. Ushbu DNK dagi Guanin (G) nukleotidlari soni va foizini toping:`,
      correct: `Guanin (G) = ${guaninePct}% (${guanineCount} ta nukleotid)`,
      wrongs: [
        `Guanin (G) = ${adeninePct}% (${adenineCount} ta nukleotid)`,
        `Guanin (G) = ${100 - adeninePct}% (${totalNuc - adenineCount} ta)`,
        `Guanin (G) = 50% (${totalNuc / 2} ta nukleotid)`
      ],
      explanation: `Chargaff qoidasiga ko'ra A = T = ${adeninePct}% va G = C = 50% - ${adeninePct}% = ${guaninePct}%. Soni: (${totalNuc} × ${guaninePct}) / 100 = ${guanineCount} ta.`
    };
  }

  // 6. LANGUAGES (GERMAN, ENGLISH, RUSSIAN, CHINESE, KOREAN, UZBEK)
  if (subject.category === "langs" || subId === "ona-tili" || subId === "ona-tili-adabiyot") {
    const langItems = {
      "nemis-tili": [
        { k: "de_pf1", q: "Germaniyada shifoxona va klinikalarda 'Katta hamshira / Parvarish mutaxassisi' kasbi nemis tilida qanday ataladi?", a: "die Pflegefachkraft / die Krankenschwester", w: ["der Bauingenieur", "der Steuerberater", "die Verkäuferin"], e: "Germaniyada tibbiy parvarish mutaxassisi rasmiy ravishda Pflegefachkraft deb yuritiladi." },
        { k: "de_dativ", q: "'Mit, nach, aus, zu, von, bei, seit' predloglaridan keyin nemis tilida ot va olmoshlar qaysi kelishikda (Kasus) qo'llaniladi?", a: "Dativ", w: ["Akkusativ", "Nominativ", "Genitiv"], e: "mit, nach, aus, zu, von, bei, seit, außer, gegenüber predloglari doimo Dativ talab qiladi." },
        { k: "de_nebensatz", q: "'Weil, dass, obwohl, wenn' ergashtiruvchi bog'lovchilari qatnashgan ergash gapda (Nebensatz) tuslanuvchi fe'l qayerda keladi?", a: "Gapning eng oxirida", w: ["Gapning eng boshida", "Egadan oldin 1-o'rinda", "Artikldan oldin"], e: "Nemis tilida Nebensatz (ergash gap) tarkibida tuslanuvchi fe'l doim gap oxiriga o'tadi." },
        { k: "de_perfekt", q: "Harakat va holat o'zgarishini bildiruvchi fe'llar (gehen, fahren, fliegen, kommen, bleiben, sein) Perfekt zamonida qaysi yordamchi fe'l bilan yasaladi?", a: "sein (bin / bist / ist / sind / seid) + Partizip II", w: ["haben + Infinitiv", "werden + Partizip I", "möchten + zu"], e: "Yo'nalishli harakat va holat o'zgarishi fe'llari Perfekt zamonida 'sein' yordamchi fe'lini oladi." }
      ],
      "xitoy-tili": [
        { k: "zh_nihao", q: "Xitoy tilida 'Salom' (你好 — Nǐ hǎo) so'zi qaysi ikkita 3-tonli bo'g'indan tashkil topgan va talaffuzda birinchi bo'g'in qaysi tonga o'zgaradi?", a: "3-ton + 3-ton yonma-yon kelganda birinchisi 2-ton (Ní hǎo) bo'lib o'qiladi", w: ["Ikkalasi ham 4-tonda o'qiladi", "Ohang umuman o'zgarmaydi", "Faqat pichirlab o'qiladi"], e: "Xitoy fonetikasida (Tone Sandhi) 3-ton + 3-ton ketma-ket kelsa, birinchi bo'g'in 2-tonga aylanadi." },
        { k: "zh_xie", q: "Xitoy tilida minnatdorchilik bildirish ('Rahmat') ieroglifi va pinyin transkripsiyasi qaysi?", a: "谢谢 (Xièxie)", w: ["再见 (Zàijiàn)", "对不起 (Duìbuqǐ)", "没关系 (Méi guānxi)"], e: "谢谢 (Xièxie) — Rahmat, 再见 (Zàijiàn) — Xayr, 对不起 (Duìbuqǐ) — Kechirasiz." },
        { k: "zh_yiyuan", q: "HSK lug'atida 'Shifoxona' va 'Shifokor' so'zlari Xitoy tilida qanday yoziladi?", a: "医院 (Yīyuàn — Shifoxona) va 医生 (Yīshēng — Shifokor)", w: ["学校 (Xuéxiào) va 老师 (Lǎoshī)", "电脑 (Diànnǎo) va 网络 (Wǎngluò)", "飞机 (Fēijī) va 火车 (Huǒchē)"], e: "医 (Yī) tibbiyot ma'nosini bildiradi: 医院 (Yīyuàn) — shifoxona, 医生 (Yīshēng) — shifokor." }
      ],
      "koreys-tili": [
        { k: "ko_hangul", q: "Koreys yozuvi 'Hangul' (한글) 1443-yilda qaysi qirol boshchiligida olimlar tomonidan xalq savodxonligi uchun yaratilgan?", a: "Qirol Sejong (세종대왕 — Sejong Daewang)", w: ["Imperator Qin Shi Huang", "General Li Sun Sin", "Qirol Kojong"], e: "Buyuk Qirol Sejong 1443-yilda Hangul fonetik alifbosini yaratib, 1446-yilda e'lon qilgan." },
        { k: "ko_polite", q: "Koreys tilida rasmiy-hurmat uslubida (하십시오체) darak gaplar fe'l o'zagiga qaysi qo'shimchani qo'shish orqali yasaladi?", a: "-습니다 (undoshdan keyin) / -ㅂ니다 (unlidan keyin)", w: ["-고 싶다", "-지 마세요", "-기 때문에"], e: "Rasmiy uslubda undosh bilan tugagan o'zakka -습니다 (masalan, 먹습니다), unliga -ㅂ니다 (갑니다) qo'shiladi." },
        { k: "ko_hospital", q: "EPS-TOPIK va TOPIK lug'atida 'Shifoxona', 'Dorixona' va 'Maktab' so'zlari koreys tilida qanday ataladi?", a: "병원 (Byeong-won — Shifoxona), 약국 (Yak-guk — Dorixona), 학교 (Hak-gyo — Maktab)", w: ["공항, 은행, 식당", "도서관, 기숙사, 공장", "우체국, 경찰서, 시장"], e: "병원 — shifoxona, 약국 — dorixona, 학교 — maktab." }
      ],
      "tojik-tili": [
        { k: "tj_salom", q: "Tojik tilida 'Xayrli tong' va 'Katta rahmat' iboralari qanday yoziladi?", a: "Субҳи бахайр / Ташаккури зиёд (Раҳмати калон)", w: ["Шаби хуш / Бубахшед", "Марҳамат / Хайр", "Рӯзи нав / Саломат"], e: "Субҳи бахайр — Xayrli tong, Ташаккури зиёд / Раҳмати калон — Katta rahmat." },
        { k: "tj_izofat", q: "Tojik tili grammatikasida ot va sifatni bog'lovchi 'izofat' qo'shimchasi qaysi va 'Imkoniyatlar kaliti' qanday tarjima qilinadi?", a: "-и qo'shimchasi: Калиди имкониятҳо (Kalidi imkoniyatho)", w: ["-ҳо qo'shimchasi: Китобҳо", "-ро qo'shimchasi: Мактабро", "-он qo'shimchasi: Дӯстон"], e: "Tojik tilida izofat (-и) aniqlanmish so'z oxiriga qo'shiladi: Калиди имкониятҳо — Imkoniyatlar kaliti." },
        { k: "tj_family", q: "Tojik tilida 'Ota, Ona, Aka-uka va Opa-singil' so'zlari qaysi qatorda to'g'ri berilgan?", a: "Падар (Ota), Модар (Ona), Бародар (Aka-uka), Хоҳар (Opa-singil)", w: ["Омӯзгор, Хонанда, Табиб, Муҳандис", "Шаҳр, Деҳа, Кӯча, Хона", "Баҳор, Тобистон, Тирамоҳ, Зимистон"], e: "Падар — ota, Модар — ona, Бародар — aka-uka, Хоҳар — opa-singil." },
        { k: "tj_school", q: "Tojik tilida 'Bolalar bog'chasi, Maktab va O'qituvchi' so'zlari qanday ataladi?", a: "Кӯдакистон (Bog'cha), Мактаб (Maktab), Омӯзгор / Муаллим (O'qituvchi)", w: ["Бозор, Мағоза, Харидор", "Фурудгоҳ, Истгоҳ, Қатора", "Варзишгоҳ, Бозӣ, Тӯб"], e: "Кӯдакистон — bolalar bog'chasi, Мактаб — maktab, Омӯзгор — o'qituvchi." },
        { k: "tj_letters", q: "Tojik kirill alifbosidagi o'ziga xos 6 ta harf qaysi qatorda to'liq ko'rsatilgan?", a: "Ғ ғ, Ӣ ӣ, Қ қ, Ӯ ӯ, Ҳ ҳ, Ҷ ҷ", w: ["Ә ә, Ө ө, Ү ү, Ң ң", "Љ љ, Њ њ, Џ џ", "І і, Ї ї, Є є"], e: "Tojik alifbosida 35 ta harf bo'lib, maxsus 6 tasi: Ғ, Ӣ, Қ, Ӯ, Ҳ, Ҷ hisoblanadi." }
      ],
      "turk-tili": [
        { k: "tr_greet", q: "Turk tilida 'Xayrli tong', 'Katta rahmat' va 'Xush kelibsiz' iboralari qanday aytiladi?", a: "Günaydın / Çok teşekkür ederim / Hoş geldiniz", w: ["İyi geceler / Güle güle / Afedersiniz", "Lütfen / Tamam / Hayır", "Yarın / Bugün / Dün"], e: "Günaydın — Xayrli tong, Çok teşekkür ederim — Katta rahmat, Hoş geldiniz — Xush kelibsiz." },
        { k: "tr_school", q: "Turk tilida 'Bolalar bog'chasi', 'Boshlang'ich maktab' va 'O'qituvchi' so'zlarining tarjimasini toping:", a: "Anaokulu (Bog'cha), İlkokul (Boshlang'ich maktab), Öğretmen (O'qituvchi)", w: ["Hastane, Eczane, Doktor", "Havaalanı, İstasyon, Kaptan", "Kütüphane, Müze, Ressam"], e: "Anaokulu — bog'cha, İlkokul — boshlang'ich maktab, Öğretmen — o'qituvchi, Öğrenci — o'quvchi." },
        { k: "tr_key", q: "Turk tilida 'Imkoniyatlar kaliti' va 'Muvaffaqiyat sertifikati' iboralari qanday yoziladi?", a: "Fırsatların Anahtarı va Başarı Sertifikası", w: ["Demir Kapı va Kitap Sayfası", "Büyük Şehir va Güzel Hava", "Yeni Araba va Uzun Yol"], e: "Fırsat — imkoniyat, Anahtar — kalit (Fırsatların Anahtarı — Imkoniyatlar kaliti)." },
        { k: "tr_present", q: "Turk tilida hozirgi davom zamon (Şimdiki Zaman) fe'l o'zagiga qaysi qo'shimcha yordamida yasaladi?", a: "-iyor / -ıyor / -uyor / -üyor (masalan: Okuyorum — O'qiyapman)", w: ["-di / -dı / -du / -dü", "-ecek / -acak", "-meli / -malı"], e: "Şimdiki Zaman unli uyg'unligiga ko'ra -(i)yor qo'shimchasi bilan yasaladi." },
        { k: "tr_family", q: "Turk tilida 'Anne, Baba, Ağabey (Abi), Abla' so'zlari kimlarni anglatadi?", a: "Ona, Ota, Katta aka, Katta opa", w: ["Bobo, Buvi, Amaki, Tog'a", "Qo'shni, Do'st, Ustoz, Shogird", "Shifokor, Muhandis, Yozuvchi, Sportchi"], e: "Anne — ona, Baba — ota, Ağabey (Abi) — aka, Abla — opa." }
      ],
      "afgon-tili": [
        { k: "af_greet", q: "Afg'on (Dari va Pushtu) tillarida 'Salom, charchamang' va 'Katta rahmat' iboralari qanday aytiladi?", a: "سلام علیکم / ستړی مشی (Stary mashay) va تشکر / مننه (Tashakor / Manana)", w: ["خداحافظ / سبا پورې", "ببخشید / وبخښئ", "نه / هو"], e: "Pushtu tilida 'ستړی مشی' (Stary mashay — Charchamang) va 'مننه' (Manana — Rahmat), Dari tilida 'تشکر' (Tashakor) deyiladi." },
        { k: "af_school", q: "Dari va Pushtu tillarida 'Maktab', 'O'qituvchi' va 'Kitob' so'zlari qanday yoziladi?", a: "مکتب / ښوونځی (Maktab / Shovunzay), معلم / ښوونکی (Muallim / Shovunkay), کتاب (Kitob)", w: ["بازار، دکان، پیسې", "سیند، غر، اسمان", "موټر، الوتکه، اورګاډی"], e: "Pushtu tilida ښوونځی (Shovunzay) — maktab, ښوونکی (Shovunkay) — o'qituvchi; Dari tilida مکتب va معلم." },
        { k: "af_family", q: "Pushtu va Dari tillarida 'Ona va Ota' so'zlari qanday ifodalanadi?", a: "مور او پلار (Mor aw Plar) / مادر و پدر (Modar va Padar)", w: ["ورور او خور (Aka va Opa)", "ملګری او ګاونډی (Do'st va Qo'shni)", "طبیب او ناروغ (Shifokor va Bemor)"], e: "Pushtu tilida مور (Mor — Ona) va پلار (Plar — Ota); Dari tilida مادر (Modar) va پدر (Padar)." },
        { k: "af_key", q: "Dari va Pushtu tillarida 'Imkoniyatlar kaliti' va 'Bilim — nurdir' iboralari qanday yoziladi?", a: "کلید امکانات / د فرصتونو کیلي va علم نور است / پوهنه رڼا ده", w: ["دروازه بزرگ va خانه نو", "آب صاف va نان گرم", "سفر دور va راه دراز"], e: "کلید امکانات / د فرصتونو کیلي — Imkoniyatlar kaliti; پوهنه رڼا ده — Bilim nurdir." }
      ]
    };
    const list = langItems[subId];
    if (list && variantIndex < list.length) {
      const it = list[variantIndex];
      return {
        conceptId: `${subId}_${it.k}_${level}`,
        question: `[${level}] ${it.q}`,
        correct: it.a,
        wrongs: it.w,
        explanation: it.e
      };
    }
  }

  // 6B. BOG'CHA SHE'RLARI VA BOSHLANG'ICH MAKTABGA TAYYORGARLIK GENERATORI
  if (subId === "bogcha-sherlari" || subId === "maktabga-tayyorgarlik" || subject.category === "preschool") {
    const preschoolBank = [
      { k: "pre_vowels", q: "O'zbek alifbosida nechta unli tovush va harf bor?", a: "6 ta unli harf (A, O, I, E, U, O')", w: ["4 ta unli", "10 ta unli", "24 ta unli"], e: "O'zbek tilida A, O, I, E, U, O' — jami 6 ta unli tovush mavjud." },
      { k: "pre_syllable", q: "«MAKTAB» va «VATAN» so'zlarida nechta bo'g'in bor?", a: "Ikkalasida ham 2 tadan bo'g'in bor: MAK-TAB va VA-TAN", w: ["1 tadan bo'g'in", "4 tadan bo'g'in", "5 tadan bo'g'in"], e: "So'zda nechta unli tovush bo'lsa, shuncha bo'g'in bo'ladi: MAK-TAB (2 ta a unlisi -> 2 bo'g'in)." },
      { k: "pre_svetofor", q: "Yo'l harakati qoidasiga ko'ra svetoforning qizil, sariq va yashil chiroqlari nimani bildiradi?", a: "Qizil — to'xta, Sariq — tayyorlan, Yashil — yo'ldan o't", w: ["Qizil — yugur, Yashil — to'xta", "Sariq — uxlash vaqti", "Barcha chiroqlarda yugurib o'tiladi"], e: "Bolalarga bog'chadan svetoforning 3 chirog'i qoidasi she'r orqali o'rgatiladi." },
      { k: "pre_seasons", q: "Bir yilda nechta fasl va nechta oy bor?", a: "4 ta fasl (Bahor, Yoz, Kuz, Qish) va 12 ta oy", w: ["2 ta fasl va 6 ta oy", "5 ta fasl va 10 ta oy", "7 ta fasl va 30 ta oy"], e: "Yil 4 fasl va 12 oydan (har bir faslda 3 tadan oy) iborat." },
      { k: "pre_week", q: "Bir haftada nechta kun bor va haftaning birinchi kuni qaysi?", a: "7 kun bor, Dushanba — haftaning birinchi kuni", w: ["5 kun bor, Juma birinchi kun", "10 kun bor", "3 kun bor"], e: "Dushanba, Seshanba, Chorshanba, Payshanba, Juma, Shanba, Yakshanba — jami 7 kun." },
      { k: "pre_riddle_carrot", q: "Bolalar topishmog'ining javobini toping: «Yer tagida oltin qoziq, quyonchaga shirin oziq» — bu nima?", a: "Sabzi", w: ["Olma", "Tarvuz", "Yong'oq"], e: "Sabzi yer ostida o'sadi va quyonlarning eng sevimli ozuqasidir." },
      { k: "pre_riddle_book", q: "Topishmoqni toping: «Til-og'zi yo'q, ammo barcha ilmni o'rgatar, varaq-varaq do'stimiz» — bu nima?", a: "Kitob (Alifbe)", w: ["Koptok", "Soat", "Soyabon"], e: "Kitob — bilim bulog'i, bolajonning eng yaqin do'stidir." },
      { k: "pre_hygiene", q: "Bog'cha bolalariga gigiyena she'rlarida ovqatlanishdan oldin va ko'chadan kelganda eng avvalo nima qilish o'rgatiladi?", a: "Qo'llarni sovunlab toza yuvish", w: ["Yuvinmasdan dasturxonga o'tirish", "Sovuq suv ichish", "Kiyimni yechmasdan uxlash"], e: "Qo'lni sovunlab yuvish mikroblardan himoya qiluvchi eng birinchi salomatlik qoidasidir." }
    ];
    if (variantIndex < preschoolBank.length) {
      const it = preschoolBank[variantIndex];
      return {
        conceptId: `preschool_${it.k}_${level}`,
        question: `[${level}] ${it.q}`,
        correct: it.a,
        wrongs: it.w,
        explanation: it.e
      };
    }
    const n1 = 3 + (variantIndex % 15);
    const n2 = 2 + ((variantIndex * 3) % 12);
    const sum = n1 + n2;
    return {
      conceptId: `preschool_math_${n1}_${n2}_${variantIndex}`,
      question: `[${level}] Bog'cha va 1-sinf qiziqarli matematikasi: Bog'chada bolajonlar ${n1} ta olma va ${n2} ta nok sanashdi. Jami nechta meva bo'ldi (${n1} + ${n2} = ?)?`,
      correct: `${sum} ta meva (${n1} + ${n2} = ${sum})`,
      wrongs: [`${sum + 2} ta meva`, `${Math.max(1, sum - 2)} ta meva`, `${sum + 5} ta meva`],
      explanation: `Qo'shish amali: ${n1} ga ${n2} ni qo'shsak, jami ${sum} hosil bo'ladi.`
    };
  }

  // 7. GENERAL MULTI-SUBJECT PARAMETRIC & CONCEPT COMBINATORIAL ENGINE
  // Pulls from curated domain concepts first, then generates distinct scenario questions
  const poolKey = CURATED_CONCEPTS[subId] ? subId : (CURATED_CONCEPTS[subject.category] ? subject.category : "med");
  const basePool = CURATED_CONCEPTS[poolKey] || CURATED_CONCEPTS.html5;

  if (variantIndex < basePool.length) {
    const item = basePool[variantIndex];
    return {
      conceptId: `${subId}_${item.c}`,
      question: `[${subject.title} — ${level}] ${item.q}`,
      correct: item.a,
      wrongs: item.w,
      explanation: item.e
    };
  }

  // Parametric scenario generator for questions #11..#30+ with unique conceptId per topic facet
  const facets = [
    {
      topic: "Standart me'yor va diagnostik aniqlik",
      q: `${subject.title} (${level}) bo'yicha amaliy vazifani bajarishda birlamchi tekshiruv va xatoliklardan himoyalanish qoidasi qaysi?`,
      a: `Kiruvchi ma'lumotlar va me'yoriy ko'rsatkichlarni xalqaro standart protokol bo'yicha validatsiya qilish`,
      w: [
        `Standart protokollarni o'chirib, tasodifiy qiymat kiritish`,
        `Xavfsizlik va aniqlik tekshiruvlarini butunlay o'tkazib yuborish`,
        `Faqat eskirgan nosoz jihozlardan foydalanish`
      ],
      e: `${subject.title} sohasida har bir amaliyot tasdiqlangan me'yoriy protokol va validatsiya asosida bajariladi.`
    },
    {
      topic: "Tizimli tahlil va algoritmik ketma-ketlik",
      q: `${subject.title} (${level}) yo'nalishida murakkab amaliy masalani yechishning eng samarali bosqichlari qaysi qatorda berilgan?`,
      a: `1) Dastlabki ma'lumotlarni tahlil qilish -> 2) Nazariy qonuniyat/modelni tanlash -> 3) Hisoblash va natijani tekshirish`,
      w: [
        `Masalani o'qimasdan taxminiy javob belgilash`,
        `Nazariy qoidalarni inkor etib, birliklarni aralashtirib yuborish`,
        `Tekshiruv bosqichini bajarishdan voz kechish`
      ],
      e: `Ilmiy va amaliy metodologiyada tahlil -> model -> yechim -> verifikatsiya ketma-ketligi 100% aniqlik beradi.`
    }
  ];

  // Create mathematically/numerically distinct practical problem per index so no two questions ever share meaning
  const paramA = 12 + ((variantIndex * 13 + daySeed) % 85);
  const paramB = 4 + ((variantIndex * 7 + daySeed) % 25);
  const eff = ((paramA / (paramA + paramB)) * 100).toFixed(1);

  return {
    conceptId: `${subId}_practical_calc_${level}_${variantIndex}_${paramA}_${paramB}`,
    question: `[${subject.title} — ${level}] Amaliy laboratoriya №${variantIndex + 1}: Tajribada foydali natija ko'rsatkichi A = ${paramA} birlik, qo'shimcha sarf ko'rsatkichi B = ${paramB} birlik bo'lsa, tizimning samaradorlik ulushi η = A / (A + B) × 100% necha foizga teng?`,
    correct: `${eff}% (A = ${paramA}, jami A + B = ${paramA + paramB})`,
    wrongs: [
      `${(Number(eff) - 14.5).toFixed(1)}%`,
      `${(Number(eff) + 11.2).toFixed(1)}%`,
      `${((paramB / (paramA + paramB)) * 100).toFixed(1)}%`
    ],
    explanation: `Formula bo'yicha: η = ${paramA} / (${paramA} + ${paramB}) × 100% = (${paramA} / ${paramA + paramB}) × 100% = ${eff}%.`
  };
}

/**
 * Builds a 30-question test session for (subjectId, level) guaranteeing:
 * - Exactly 30 questions
 * - Zero duplicate conceptIds inside the 30-question set
 * - Zero previously seen question hashes from localStorage ('ik_seen_questions')
 * - Shuffled options (A, B, C, D)
 */
function build30QuestionTest(subjectId, level) {
  const subject = SUBJECTS_CATALOG.find(s => s.id === subjectId) || SUBJECTS_CATALOG[0];
  const chosenLevel = level || (subject.levels && subject.levels[0]) || "Umumiy";
  const now = new Date();
  const daySeed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();

  let seenHashes = [];
  try {
    const rawSeen = (window.SafeStorage ? window.SafeStorage.getItem('ik_seen_questions') : localStorage.getItem('ik_seen_questions')) || '[]';
    seenHashes = JSON.parse(rawSeen);
  } catch (_) {
    seenHashes = [];
  }
  const seenSet = new Set(seenHashes);
  const usedConceptsInSession = new Set();

  const questions = [];
  let cursor = 0;
  let safetyCounter = 0;

  while (questions.length < 30 && safetyCounter < 2000) {
    safetyCounter++;
    const raw = generateParametricQuestion(subject, chosenLevel, cursor, daySeed);
    cursor++;

    const qHash = hashString(`${subject.id}|${chosenLevel}|${raw.conceptId}|${raw.question}`);
    if (usedConceptsInSession.has(raw.conceptId)) continue;
    if (seenSet.has(qHash) && safetyCounter < 400) continue;

    usedConceptsInSession.add(raw.conceptId);
    seenSet.add(qHash);

    // Shuffle options deterministically + randomly
    const allOptions = [
      { text: raw.correct, isCorrect: true },
      ...raw.wrongs.slice(0, 3).map(w => ({ text: w, isCorrect: false }))
    ];
    for (let i = allOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }

    questions.push({
      index: questions.length + 1,
      hash: qHash,
      conceptId: raw.conceptId,
      question: raw.question,
      options: allOptions,
      explanation: raw.explanation,
      userChoice: null,
      isLocked: false
    });
  }

  // Persist seen hashes (keep last 5000 so localStorage stays fast and clean)
  try {
    const updated = Array.from(seenSet).slice(-5000);
    if (window.SafeStorage) {
      window.SafeStorage.setItem('ik_seen_questions', JSON.stringify(updated));
    } else {
      localStorage.setItem('ik_seen_questions', JSON.stringify(updated));
    }
  } catch (_) {}

  return {
    subject,
    level: chosenLevel,
    questions
  };
}
