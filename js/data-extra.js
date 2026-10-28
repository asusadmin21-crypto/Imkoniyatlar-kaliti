/* ==========================================================================
   IMKONIYATLAR KALITI - Extended Modules:
   1. Barcha Tillar Cheksiz Lug'ati (Boshlang'ich A1 dan Oxirigacha C2)
      Alohida Tojik, Turk, Afg'on (Dari/Pushtu) hamda Ingliz, Rus, Arab,
      Nemis, Xitoy, Koreys, Fransuz tillari
   2. Bog'cha Bolalari va O'qituvchi-Tarbiyachilar Uchun Tugamaydigan She'rlar
   3. Boshlang'ich Maktabga Tayyorgarlik Eng Zo'r Interaktiv Darsliklari
   4. Barcha Sayt va Ijtimoiy Tarmoqlarda Reklama va Ulashish Markazi
   Sayt Admini: Usmonov Azimjon Akmaljon o'g'li
   ========================================================================== */

const SITE_ADMIN_NAME = "Usmonov Azimjon Akmaljon o'g'li";

/* ==========================================================================
   1. BARCHA TILLAR CHEKSIZ LUG'ATI MA'LUMOTLAR BAZASI VA GENERATORI
   ========================================================================== */
const DICTIONARY_LANGUAGES = [
  { id: "tajik", name: "Tojik tili (Тоҷикӣ)", flag: "🇹🇯", badge: "Alohida Qo'shilgan ★", speechLang: "ru-RU", isFeatured: true },
  { id: "turkish", name: "Turk tili (Türkçe)", flag: "🇹🇷", badge: "Alohida Qo'shilgan ★", speechLang: "tr-TR", isFeatured: true },
  { id: "afghan", name: "Afg'on tili (Dari / Pushtu - دری / پښتو)", flag: "🇦🇫", badge: "Alohida Qo'shilgan ★", speechLang: "fa-IR", isFeatured: true },
  { id: "english", name: "Ingliz tili (English)", flag: "🇬🇧", badge: "A1–C2 IELTS", speechLang: "en-US", isFeatured: false },
  { id: "russian", name: "Rus tili (Русский)", flag: "🇷🇺", badge: "A1–C2 ТРКИ", speechLang: "ru-RU", isFeatured: false },
  { id: "arabic", name: "Arab tili (العربية)", flag: "🇸🇦", badge: "A1–C2", speechLang: "ar-SA", isFeatured: false },
  { id: "german", name: "Nemis tili (Deutsch)", flag: "🇩🇪", badge: "A1–C2 Goethe", speechLang: "de-DE", isFeatured: false },
  { id: "chinese", name: "Xitoy tili (中文)", flag: "🇨🇳", badge: "HSK 1–6", speechLang: "zh-CN", isFeatured: false },
  { id: "korean", name: "Koreys tili (한국어)", flag: "🇰🇷", badge: "TOPIK 1–6", speechLang: "ko-KR", isFeatured: false },
  { id: "french", name: "Fransuz tili (Français)", flag: "🇫🇷", badge: "DELF A1–C2", speechLang: "fr-FR", isFeatured: false }
];

const DICTIONARY_SEED = {
  tajik: [
    { level: "A1", cat: "Salomlashish", word: "Ассалому алайкум / Салом", pron: "Assalomu alaykum / Salom", uz: "Assalomu alaykum / Salom", example: "Салом, ҳоли шумо чӣ тавр аст? — Salom, ahvolingiz qanday?" },
    { level: "A1", cat: "Salomlashish", word: "Субҳи бахайр / Рӯзи бахайр", pron: "Subhi bakhayr / Ruzi bakhayr", uz: "Xayrli tong / Xayrli kun", example: "Субҳи бахайр, устози азиз! — Xayrli tong, aziz ustoz!" },
    { level: "A1", cat: "Minnatdorchilik", word: "Ташаккур / Раҳмати калон", pron: "Tashakkur / Rahmati kalon", uz: "Tashakkur / Katta rahmat", example: "Барои кӯмакатон ташаккури зиёд! — Yordamingiz uchun katta rahmat!" },
    { level: "A1", cat: "Oila", word: "Падар ва Модар", pron: "Padar va Modar", uz: "Ota va Ona", example: "Падар ва модари ман меҳрубон ҳастанд. — Otam va onam mehribondirlar." },
    { level: "A1", cat: "Oila", word: "Бародар ва Хоҳар", pron: "Barodar va Khohar", uz: "Aka-uka va Opa-singil", example: "Бародари ман дар донишгоҳ мехонад. — Akam universitetda o'qiydi." },
    { level: "A1", cat: "Maktab va Bog'cha", word: "Кӯдакистон ва Мактаб", pron: "Kudakiston va Maktab", uz: "Bolalar bog'chasi va Maktab", example: "Кӯдакон дар кӯдакистон шеър мехонанд. — Bolalar bog'chada she'r o'qiydilar." },
    { level: "A2", cat: "Ta'lim", word: "Омӯзгор ва Хонанда", pron: "Omuzgor va Khonanda", uz: "O'qituvchi va O'quvchi", example: "Омӯзгор ба хонандагон дарс медиҳад. — O'qituvchi o'quvchilarga dars beradi." },
    { level: "A2", cat: "Ta'lim", word: "Китобхона ва Луғат", pron: "Kitobkhona va Lug'at", uz: "Kutubxona va Lug'at", example: "Ин луғати беохир барои ҳамаи забонҳост. — Bu cheksiz lug'at barcha tillar uchundir." },
    { level: "A2", cat: "Kundalik hayot", word: "Нон, Об ва Меваҳои ширин", pron: "Non, Ob va Mevahoi shirin", uz: "Non, Suv va Shirin mevalar", example: "Нони гарм ва оби соф неъмати бузург аст. — Issiq non va zilol suv ulug' ne'matdir." },
    { level: "B1", cat: "Jamiyat", word: "Калиди имкониятҳо", pron: "Kalidi imkoniyatho", uz: "Imkoniyatlar kaliti", example: "Дониш калиди ҳамаи имкониятҳо мебошад. — Bilim barcha imkoniyatlar kalitidir." },
    { level: "B1", cat: "Tibbiyot", word: "Беморхона ва Табиб", pron: "Bemorkhona va Tabib", uz: "Shifoxona va Shifokor", example: "Табибон барои саломатии мардум хизмат мекунанд. — Shifokorlar xalq salomatligi uchun xizmat qiladilar." },
    { level: "B2", cat: "Ilm-fan", word: "Технологияи иттилоотӣ", pron: "Tekhnologiyai ittilooti", uz: "Axborot texnologiyalari", example: "Технологияи муосир ҷаҳонро тағйир медиҳад. — Zamonaviy texnologiya dunyoni o'zgartirmoqda." },
    { level: "C1", cat: "Madaniyat", word: "Дӯстии абадии халқҳо", pron: "Dustii abadii khalqho", uz: "Xalqlarning abadiy do'stligi", example: "Дӯстии халқҳои ӯзбек ва тоҷик қадимист. — O'zbek va tojik xalqlari do'stligi qadimiydir." },
    { level: "C2", cat: "Akademik", word: "Инкишофи устувори илмию фарҳангӣ", pron: "Inkishofi ustuvori ilmiyu farhangi", uz: "Ilmiy va madaniy barqaror taraqqiyot", example: "Ҳамкории илмӣ заминаи пешрафт аст. — Ilmiy hamkorlik taraqqiyot poydevoridir." }
  ],
  turkish: [
    { level: "A1", cat: "Salomlashish", word: "Merhaba / Günaydın", pron: "Merhaba / Gunaydin", uz: "Salom / Xayrli tong", example: "Günaydın arkadaşlar, nasılsınız? — Xayrli tong do'stlar, qalaysizlar?" },
    { level: "A1", cat: "Salomlashish", word: "İyi akşamlar / Hoş geldiniz", pron: "Iyi akshamlar / Hosh geldiniz", uz: "Xayrli kech / Xush kelibsiz", example: "Sitemize hoş geldiniz! — Saytimizga xush kelibsiz!" },
    { level: "A1", cat: "Minnatdorchilik", word: "Teşekkür ederim / Sağ olun", pron: "Teshekkur ederim / Sag' olun", uz: "Katta rahmat / Sog' bo'ling", example: "Yardımınız için çok teşekkür ederim. — Yordamingiz uchun juda katta rahmat." },
    { level: "A1", cat: "Oila", word: "Anne, Baba ve Kardeş", pron: "Anne, Baba ve Kardesh", uz: "Ona, Ota va Aka-uka/Opa-singil", example: "Ailemizi çok seviyoruz. — Oilamizni juda yaxshi ko'ramiz." },
    { level: "A1", cat: "Maktab va Bog'cha", word: "Anaokulu ve İlkokul", pron: "Anaokulu ve Ilkokul", uz: "Bolalar bog'chasi va Boshlang'ich maktab", example: "Çocuklar anaokulunda şiir öğreniyor. — Bolalar bog'chada she'r o'rganmoqda." },
    { level: "A2", cat: "Ta'lim", word: "Öğretmen, Öğrenci ve Sözlük", pron: "O'g'retmen, O'g'renji ve So'zluk", uz: "O'qituvchi, O'quvchi va Lug'at", example: "Bu sözlük başlangıçtan ileri seviyeye kadardır. — Bu lug'at boshlang'ichdan yuqori darajagachadir." },
    { level: "B1", cat: "Motivatsiya", word: "Fırsatların Anahtarı", pron: "Firsatlarin Anahtari", uz: "Imkoniyatlar kaliti", example: "Eğitim ve bilgi fırsatların anahtarıdır. — Ta'lim va bilim imkoniyatlar kalitidir." },
    { level: "B1", cat: "Tibbiyot", word: "Hastane, Doktor ve Hemşire", pron: "Hastane, Doktor ve Hemshire", uz: "Shifoxona, Shifokor va Hamshira", example: "Hemşire hastanın tansiyonunu ölçtü. — Hamshira bemorning qon bosimini o'lchadi." },
    { level: "B2", cat: "Texnologiya", word: "Bilişim ve İletişim Teknolojileri", pron: "Bilishim ve Iletishim Teknolojileri", uz: "Axborot va telekommunikatsiya texnologiyalari", example: "Fiber optik ağlar yüksek hız sağlar. — Optik tolali tarmoqlar yuqori tezlik beradi." },
    { level: "C1", cat: "Akademik", word: "Uluslararası Bilimsel İşbirliği", pron: "Uluslararasi Bilimsel Ishbirligi", uz: "Xalqaro ilmiy hamkorlik", example: "Üniversiteler arası işbirliği gelişiyor. — Universitetlararo hamkorlik rivojlanmoqda." },
    { level: "C2", cat: "Mukammal", word: "Sürdürülebilir Kalkınma ve İnovasyon", pron: "Surdurulebilir Kalkinma ve Inovasyon", uz: "Barqaror rivojlanish va innovatsiya", example: "Gelecek nesiller için kaliteli eğitim şarttır. — Kelajak avlod uchun sifatli ta'lim shartdir." }
  ],
  afghan: [
    { level: "A1", cat: "Salomlashish", word: "سلام علیکم / ستړی مشی", pron: "Salom alaykum / Stary mashay", uz: "Assalomu alaykum / Charchamang (Dari va Pushtu)", example: "سلام، حال شما چطور است؟ / څنګه یاست؟ — Salom, ahvolingiz qanday?" },
    { level: "A1", cat: "Salomlashish", word: "سهار په خیر / صبح بخیر", pron: "Sahar pa khayr / Subh bakhayr", uz: "Xayrli tong (Pushtu va Dari)", example: "سهار په خیر استاد محترم! — Xayrli tong, muhtaram ustoz!" },
    { level: "A1", cat: "Minnatdorchilik", word: "مننه / تشکر زیاد", pron: "Manana / Tashakor ziyod", uz: "Rahmat / Katta tashakkur", example: "ستاسو له مرستې څخه ډیره مننه — Yordamingiz uchun katta rahmat!" },
    { level: "A1", cat: "Oila", word: "مور او پلار / مادر و پدر", pron: "Mor aw Plar / Modar va Padar", uz: "Ona va Ota", example: "مور او پلار د ژوند رڼا دي — Ota va ona hayot nuridir." },
    { level: "A1", cat: "Maktab va Bog'cha", word: "وړکتون او ښوونځی / کودکستان و مکتب", pron: "Wruktoon aw Shovunzay / Kudakiston va Maktab", uz: "Bog'cha va Maktab", example: "ماشومان په ښوونځي کې درس وايي — Bolalar maktabda dars o'qiydilar." },
    { level: "A2", cat: "Ta'lim", word: "ښوونکی او زده کوونکی / معلم و شاگرد", pron: "Shovunkay aw Zdakuvunkay / Muallim va Shogird", uz: "O'qituvchi va O'quvchi", example: "کتاب او قلم د پوهې وسیله ده — Kitob va qalam bilim vositasidir." },
    { level: "B1", cat: "Jamiyat", word: "د فرصتونو کیلي / کلید امکانات", pron: "Da Fursatuno Kili / Kalidi Imkonot", uz: "Imkoniyatlar kaliti", example: "پوهنه د بریالیتوب او فرصتونو کیلي ده — Bilim muvaffaqiyat va imkoniyatlar kalitidir." },
    { level: "B2", cat: "Tibbiyot", word: "روغتون او ډاکټر / شفاخانه و طبیب", pron: "Roghtoon aw Daktar / Shifokhona va Tabib", uz: "Shifoxona va Shifokor", example: "روغتیا تر هر څه مهمه ده — Salomatlik hamma narsadan muhimdir." },
    { level: "C1", cat: "Madaniyat", word: "سوله، ورورولي او فرهنګ", pron: "Sola, Wrorwali aw Farhang", uz: "Tinchlik, Birodarlik va Madaniyat", example: "د ګاونډیو ملتونو دوستي تلپاتې ده — Qo'shni xalqlar do'stligi abadiydir." },
    { level: "C2", cat: "Mukammal", word: "نړیواله علمي او تخنیکي پرمختیا", pron: "Nariwala Ilmi aw Tekhniki Parmakhtiya", uz: "Xalqaro ilmiy va texnik taraqqiyot", example: "عصري ټکنالوژي د هیوادونو پرمختګ چټکوي — Zamonaviy texnologiya mamlakatlar rivojini tezlashtiradi." }
  ],
  english: [
    { level: "A1", cat: "Salomlashish", word: "Hello / Good morning", pron: "he-lou / gud mor-ning", uz: "Salom / Xayrli tong", example: "Good morning, teacher and students! — Xayrli tong, ustoz va o'quvchilar!" },
    { level: "A1", cat: "Maktab va Bog'cha", word: "Kindergarten & Primary School", pron: "kin-der-gar-tn end pray-me-ri skul", uz: "Bolalar bog'chasi va Boshlang'ich maktab", example: "Children learn poems in kindergarten. — Bolalar bog'chada she'rlar o'rganadilar." },
    { level: "A2", cat: "Ta'lim", word: "Key of Opportunities", pron: "ki ov op-er-tyu-ni-tiz", uz: "Imkoniyatlar kaliti", example: "Knowledge is the key of opportunities. — Bilim imkoniyatlar kalitidir." },
    { level: "B1", cat: "IT va Dasturlash", word: "Software Engineering & Networks", pron: "soft-ver en-ji-ni-ring end net-vorks", uz: "Dasturiy injiniring va Tarmoqlar", example: "Modern routers forward IP packets efficiently. — Zamonaviy routerlar IP paketlarni samarali yo'naltiradi." },
    { level: "B2", cat: "Tibbiyot", word: "Emergency Medical Care", pron: "i-mer-jen-si me-di-kl ker", uz: "Shoshilinch tez tibbiy yordam", example: "First aid saves human lives. — Birinchi yordam inson hayotini saqlab qoladi." },
    { level: "C1", cat: "Akademik", word: "Comprehensive Curriculum", pron: "kom-pri-hen-siv ka-ri-kyu-lam", uz: "Keng qamrovli o'quv dasturi", example: "Our platform offers a comprehensive curriculum. — Platformamiz keng qamrovli dasturni taqdim etadi." },
    { level: "C2", cat: "Mukammal", word: "Interdisciplinary Excellence", pron: "in-ter-di-si-pli-ne-ri ek-se-lens", uz: "Fanlararo yuksak mukammallik", example: "Achieving 5x excellence unlocks your official certificate. — 5 marta A'lo natija rasmiy sertifikat eshigini ochadi." }
  ],
  russian: [
    { level: "A1", cat: "Salomlashish", word: "Здравствуйте / Доброе утро", pron: "Zdravstvuyte / Dobroye utro", uz: "Assalomu alaykum / Xayrli tong", example: "Доброе утро, дорогие ученики! — Xayrli tong, aziz o'quvchilar!" },
    { level: "A2", cat: "Maktab va Bog'cha", word: "Детский сад и Начальная школа", pron: "Detskiy sad i Nachalnaya shkola", uz: "Bolalar bog'chasi va Boshlang'ich maktab", example: "Подготовка к начальной школе очень важна. — Boshlang'ich maktabga tayyorgarlik juda muhim." },
    { level: "B1", cat: "Asosiy", word: "Ключ возможностей", pron: "Klyuch vozmojnostey", uz: "Imkoniyatlar kaliti", example: "Образование — это ключ возможностей. — Ta'lim — imkoniyatlar kalitidir." },
    { level: "B2", cat: "Tibbiyot", word: "Неотложная медицинская помощь", pron: "Neotlojnaya meditsinskaya pomosh", uz: "Shoshilinch tibbiy yordam", example: "Измерение артериального давления и пульса. — Arterial qon bosimi va pulsni o'lchash." },
    { level: "C1", cat: "Texnologiya", word: "Телекоммуникационные системы", pron: "Telekommunikatsionniye sistemi", uz: "Telekommunikatsiya tizimlari", example: "Оптоволоконные линии связи и маршрутизаторы. — Optik tolali aloqa liniyalari va marshrutizatorlar." },
    { level: "C2", cat: "Mukammal", word: "Высококвалифицированный специалист", pron: "Visokokvalifitsirovanniy spetsialist", uz: "Yuqori malakali mutaxassis", example: "Пять отличных оценок открывают доступ к сертификату. — Besh marta a'lo baho sertifikatga yo'l ochadi." }
  ],
  arabic: [
    { level: "A1", cat: "Salomlashish", word: "السَّلَامُ عَلَيْكُمْ / صَبَاحُ الْخَيْرِ", pron: "As-salamu alaykum / Sabahul khayr", uz: "Assalomu alaykum / Xayrli tong", example: "صَبَاحُ الْخَيْرِ يَا أُسْتَاذُ — Xayrli tong, ustoz!" },
    { level: "A2", cat: "Ta'lim", word: "مِفْتَاحُ الْفُرَصِ وَالْعِلْمُ", pron: "Miftahul furasi wal-ilmu", uz: "Imkoniyatlar kaliti va ilm", example: "الْعِلْمُ نُورٌ وَمِفْتَاحُ النَّجَاحِ — Ilm nur va muvaffaqiyat kalitidir." },
    { level: "B1", cat: "Maktab", word: "رَوْضَةُ الْأَطْفَالِ وَالْمَدْرَسَةُ", pron: "Rawdatul atfali wal-madrasatu", uz: "Bolalar bog'chasi va Maktab", example: "يَتَعَلَّمُ الْأَطْفَالُ الْقِرَاءَةَ وَالْكِتَابَةَ — Bolalar o'qish va yozishni o'rganadilar." },
    { level: "C1", cat: "Tibbiyot", word: "الطِّبُّ وَالرِّعَايَةُ الصِّحِّيَّةُ", pron: "At-tibbu war-ri'ayatus-sihhiyya", uz: "Tibbiyot va sog'liqni saqlash", example: "الْوِقَايَةُ خَيْرٌ مِنَ الْعِلَاجِ — Kasallikning oldini olish davolashdan afzaldir." },
    { level: "C2", cat: "Mukammal", word: "التَّعَاوُنُ الْعِلْمِيُّ الدَّوْلِيُّ", pron: "At-ta'awunul ilmiyyud-dawliyy", uz: "Xalqaro ilmiy hamkorlik", example: "شَهَادَةُ التَّمَيُّزِ الْأَكَادِيمِيِّ — Akademik a'lochilik sertifikati." }
  ],
  german: [
    { level: "A1", cat: "Salomlashish", word: "Guten Morgen / Herzlich willkommen", pron: "Guten Morgen / Hertslix vilkommen", uz: "Xayrli tong / Xush kelibsiz", example: "Herzlich willkommen auf unserer Bildungsplattform! — Ta'lim platformamizga xush kelibsiz!" },
    { level: "A2", cat: "Maktab va Bog'cha", word: "der Kindergarten und die Grundschule", pron: "der Kindergarten und di Grundshule", uz: "Bolalar bog'chasi va Boshlang'ich maktab", example: "Die Kinder lernen Gedichte im Kindergarten. — Bolalar bog'chada she'r o'rganadilar." },
    { level: "B1", cat: "Asosiy", word: "der Schlüssel der Möglichkeiten", pron: "der Shlyussel der Myoglishkayten", uz: "Imkoniyatlar kaliti", example: "Bildung ist der Schlüssel zum Erfolg. — Ta'lim muvaffaqiyat kalitidir." },
    { level: "B2", cat: "Tibbiyot", word: "die Krankenpflege und das Krankenhaus", pron: "di Krankenpflege und das Krankenhaus", uz: "Hamshiralik parvarishi va Shifoxona", example: "Arbeiten als Pflegefachkraft in Deutschland. — Germaniyada hamshira bo'lib ishlash." },
    { level: "C2", cat: "Mukammal", word: "Wissenschaftliche Spitzenleistung", pron: "Vissenshaftlihe Shpitsenlaystung", uz: "Yuqori ilmiy natija va mahorat", example: "Fünfmal Note Sehr Gut für das Zertifikat. — Sertifikat uchun besh marta A'lo baho." }
  ],
  chinese: [
    { level: "A1", cat: "Salomlashish", word: "你好 / 早上好 / 谢谢", pron: "Nǐ hǎo / Zǎoshang hǎo / Xièxie", uz: "Salom / Xayrli tong / Rahmat", example: "老师早上好！ — Ustoz, xayrli tong!" },
    { level: "A2", cat: "Maktab", word: "幼儿园 和 小学", pron: "Yòu'éryuán hé Xiǎoxué", uz: "Bolalar bog'chasi va Boshlang'ich maktab", example: "孩子们在学校学习读书。 — Bolalar maktabda kitob o'qishni o'rganadilar." },
    { level: "B1", cat: "Asosiy", word: "机遇之钥 (Imkoniyatlar kaliti)", pron: "Jīyù zhī yào", uz: "Imkoniyatlar kaliti", example: "知识是打开未来之门的钥匙。 — Bilim kelajak eshigini ochuvchi kalitdir." },
    { level: "C2", cat: "Mukammal", word: "科技创新与国际教育", pron: "Kējì chuàngxīn yǔ guójì jiàoyù", uz: "Texnologik innovatsiya va xalqaro ta'lim", example: "五次优秀成绩可获得荣誉证书。 — 5 marta a'lo natija faxriy sertifikat beradi." }
  ],
  korean: [
    { level: "A1", cat: "Salomlashish", word: "안녕하세요 / 감사합니다", pron: "Annyeonghaseyo / Kamsahamnida", uz: "Assalomu alaykum / Katta rahmat", example: "선생님, 안녕하세요! — Ustoz, assalomu alaykum!" },
    { level: "A2", cat: "Maktab", word: "유치원 및 초등학교", pron: "Yuchiwon mit Chodeunghakgyo", uz: "Bolalar bog'chasi va Boshlang'ich maktab", example: "아이들이 동시를 배웁니다. — Bolajonlar bolalar she'rlarini o'rganadilar." },
    { level: "B1", cat: "Asosiy", word: "기회의 열쇠", pron: "Gihoe-ui Yeolsoe", uz: "Imkoniyatlar kaliti", example: "배움은 미래를 여는 기회의 열쇠입니다. — Bilim kelajakni ochuvchi imkoniyatlar kalitidir." },
    { level: "C2", cat: "Mukammal", word: "미래지향적 글로벌 인재 양성", pron: "Mirae-jihyangjeok geullobeol injae yangseong", uz: "Kelajakka yo'naltirilgan xalqaro kadrlar tayyorlash", example: "5회 우수 성적 달성 시 수료증 발급. — 5 marta a'lo baho olganda sertifikat taqdim etiladi." }
  ],
  french: [
    { level: "A1", cat: "Salomlashish", word: "Bonjour / Merci beaucoup", pron: "Bonjur / Mersi boku", uz: "Assalomu alaykum / Katta rahmat", example: "Bonjour tout le monde ! — Barchaga xayrli kun!" },
    { level: "B1", cat: "Asosiy", word: "La Clé des Opportunités", pron: "La Kle dez Oportyunite", uz: "Imkoniyatlar kaliti", example: "Le savoir est la clé de la réussite. — Bilim muvaffaqiyat kalitidir." },
    { level: "C2", cat: "Mukammal", word: "Excellence Académique et Scientifique", pron: "Ekselans Akademik e Syantifik", uz: "Akademik va ilmiy mukammallik", example: "Cinq notes excellentes pour obtenir le certificat. — Sertifikat olish uchun 5 marta a'lo baho." }
  ]
};

// Combinatorial stem bank for generating unlimited A1..C2 vocabulary entries on demand
const INFINITE_WORD_ROOTS = {
  tajik: [
    { w: "Дӯстии самимӣ", p: "Dustii samimi", u: "Samimiy do'stlik", c: "Muloqot" },
    { w: "Китоби дарсӣ", p: "Kitobi darsi", u: "Darslik kitob", c: "Ta'lim" },
    { w: "Ватани обод", p: "Vatani obod", u: "Obod Vatan", c: "Vatan" },
    { w: "Табиати дилфиреб", p: "Tabiati dilfireb", u: "Maftunkor tabiat", c: "Tabiat" },
    { w: "Меҳнати ҳалол", p: "Mehnati halol", u: "Halol mehnat", c: "Kasb" },
    { w: "Оилаи хушбахт", p: "Oilai khushbakht", u: "Baxtli oila", c: "Oila" },
    { w: "Шаҳри бостонӣ", p: "Shahri bostoni", u: "Qadimiy shahar", c: "Sayohat" },
    { w: "Донишҷӯи пешқадам", p: "Donishjui peshqadam", u: "Peshqadam talaba", c: "Ta'lim" },
    { w: "Шифохонаи марказӣ", p: "Shifokhonai markazi", u: "Markaziy shifoxona", c: "Tibbiyot" },
    { w: "Шабакаи ҷаҳонӣ", p: "Shabakai jahoni", u: "Jahon tarmog'i (Internet)", c: "IT va Texnologiya" }
  ],
  turkish: [
    { w: "Samimi Dostluk", p: "Samimi Dostluk", u: "Samimiy do'stlik", c: "Muloqot" },
    { w: "Ders Kitabı", p: "Ders Kitabi", u: "Darslik kitobi", c: "Ta'lim" },
    { w: "Güzel Vatan", p: "Guzel Vatan", u: "Go'zal Vatan", c: "Vatan" },
    { w: "Mutlu Çocuklar", p: "Mutlu Chojuklar", u: "Baxtli bolajonlar", c: "Bog'cha va Maktab" },
    { w: "Bilgisayar Programlama", p: "Bilgisayar Programlama", u: "Kompyuter dasturlash", c: "IT va Texnologiya" },
    { w: "Sağlıklı Yaşam", p: "Sag'likli Yasham", u: "Sog'lom turmush tarzi", c: "Tibbiyot" },
    { w: "Başarı Sertifikası", p: "Bashari Sertifikasi", u: "Muvaffaqiyat sertifikati", c: "Ta'lim" },
    { w: "Kültürel Miras", p: "Kulturel Miras", u: "Madaniy meros", c: "Madaniyat" }
  ],
  afghan: [
    { w: "ریښتینې ملګرتیا / دوستی صمیمی", p: "Rishtine Malgartiya / Dusti Samimi", u: "Chin do'stlik", c: "Muloqot" },
    { w: "تدریسي کتاب / کتاب درسی", p: "Tadrisi Kitob / Kitobi Darsi", u: "O'quv darsligi", c: "Ta'lim" },
    { w: "آباد وطن / وطن آباد", p: "Obod Watan", u: "Obod Vatan", c: "Vatan" },
    { w: "د ماشومانو شعرونه", p: "Da Mashumano Sheruna", u: "Bolalar she'rlari", c: "Bog'cha va Maktab" },
    { w: "روغتیایي پاملرنه", p: "Roghtiyayi Pamlarana", u: "Tibbiy parvarish", c: "Tibbiyot" },
    { w: "معلوماتی ټکنالوژي", p: "Ma'lumati Tekhnaloji", u: "Axborot texnologiyalari", c: "IT va Texnologiya" },
    { w: "د بریالیتوب تصدیق پاڼه", p: "Da Baryalitob Tasdiq Pana", u: "Muvaffaqiyat sertifikati", c: "Ta'lim" }
  ]
};

let dictionaryGeneratedCounter = 1;

function generateMoreDictionaryItems(langId, count = 24) {
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  if (!DICTIONARY_SEED[langId]) DICTIONARY_SEED[langId] = [];
  const roots = INFINITE_WORD_ROOTS[langId] || INFINITE_WORD_ROOTS.tajik;

  for (let i = 0; i < count; i++) {
    const r = roots[(dictionaryGeneratedCounter + i) % roots.length];
    const lv = levels[(dictionaryGeneratedCounter + i) % levels.length];
    DICTIONARY_SEED[langId].push({
      level: lv,
      cat: r.c,
      word: `${r.w} (${lv} • #${dictionaryGeneratedCounter})`,
      pron: `${r.p} [${lv} talaffuz mashqi]`,
      uz: `${r.u} — ${lv} bosqich amaliy so'z va birikmasi (#${dictionaryGeneratedCounter})`,
      example: `${r.w} — O'quv dasturining ${lv} darajasi uchun maxsus amaliy misol (#${dictionaryGeneratedCounter}).`
    });
    dictionaryGeneratedCounter++;
  }
}

/* ==========================================================================
   2. BOG'CHA BOLALARIGA O'RGATISH UCHUN TUGAMAYDIGAN SHE'RLAR BAZASI
   ========================================================================== */
const PRESCHOOL_POEMS = [
  {
    id: "poem-1",
    title: "Ona Vatanim — O'zbekistonim",
    category: "Vatan va Ona",
    age: "4–7 yosh (O'rta va Tayyorlov guruhi)",
    poem: `Bog'laringda gullar ochilar chaman,\nSeni jonimdayin sevaman, Vatan!\nQuyosh kulib boqar musaffo osmon,\nBaxtiyor bolangga quchog'ing kengdir har on!\nТоg'laring viqorli, daryolaring sho'x,\nSenday aziz diyor dunyoda hech yo'q!`,
    teacherTip: "Tarbiyachi-o'qituvchi uchun metodika: She'rni o'rgatishda O'zbekiston bayrog'i va tabiati tasvirlangan ko'rgazmali rasmlardan foydalaning. Bolalar o'ng qo'lini ko'ksiga qo'yib ifodali aytishiga e'tibor bering."
  },
  {
    id: "poem-2",
    title: "Mehribonim Onajon",
    category: "Vatan va Ona",
    age: "3–6 yosh (Kichik va O'rta guruh)",
    poem: `Alla aytib uxlatgan,\nOq yuvib, oq taragan.\nKo'zlarimga qaragan,\nMehribonim Onajon!\nSizga guldek kulaman,\nDastyor bo'lib yuraman,\nBesh baholar olaman,\nJonajonim Onajon!`,
    teacherTip: "Tarbiyachi-o'qituvchi uchun metodika: 8-mart va onalar bayrami ertaliklari uchun eng sevimli she'r. Bolalarga onaga mehr va yordam haqida suhbat o'tkazing."
  },
  {
    id: "poem-3",
    title: "Alifbe — Oltin Kalit",
    category: "Harflar va Sanash",
    age: "5–7 yosh (Maktabga tayyorlov guruhi)",
    poem: `A harfidan boshlanar,\nAnor, Olma va Odob.\nB harfidan Bilimdir,\nBizning do'stimiz Kitob!\nHar bir harfni o'rgansak,\nOchilar ming imkoniyat,\nImkoniyatlar kaliti —\nIlm bilan saodat!`,
    teacherTip: "Tarbiyachi-o'qituvchi uchun metodika: Harflarni kartochkada ko'rsatib, xor bo'lib takrorlash savodxonlikni 2 barobar tezlashtiradi."
  },
  {
    id: "poem-4",
    title: "Quvnoq Sanash (1 dan 10 gacha)",
    category: "Harflar va Sanash",
    age: "3–7 yosh (Barcha guruhlar)",
    poem: `Bir — bilimli bo'lamiz,\nIkki — ilm olamiz,\nUch — uchqur hayolimiz,\nTo'rt — to'kis kamolimiz,\nBesh — besh baho olamiz,\nOlti — olg'a boramiz,\nYetti — yetuk bo'lamiz,\nSakkiz — sarishta doim,\nTo'qqiz — to'la quvonchmiz,\nO'n — o'qiymiz har kuni!`,
    teacherTip: "Tarbiyachi-o'qituvchi uchun metodika: Mayda qo'l motorikasini rivojlantirish uchun har bir son aytilganda barmoqlarni navbat bilan ochib ko'rsatish mashqini bajaring."
  },
  {
    id: "poem-5",
    title: "Tozalik va Ozodalik",
    category: "Odob va Tozalik",
    age: "3–5 yosh (Kichik guruh)",
    poem: `Erta turib yuvaman,\nYuz-qo'limni sovunlab.\nTishlarimni tozalab,\nBog'cham tomon chopaman!\nSochim taroq ko'radi,\nKiyimlarim top-toza,\nOzoda bo'lgan bola —\nBo'lar doim a'lochi va toza!`,
    teacherTip: "Tarbiyachi-o'qituvchi uchun metodika: Ertalabki badantarbiya va gigiyena daqiqalarida harakatlar bilan birga ijro etiladi."
  },
  {
    id: "poem-6",
    title: "Salom — Odob Boshidir",
    category: "Odob va Tozalik",
    age: "3–7 yosh",
    poem: `Bog'chamizga kirganda,\n«Assalom!» deb aytamiz.\nUstozimiz kulganda,\nBilimlarga qaytamiz!\nKattalarga hurmatda,\nKichiklarga izzatda,\nOdobli farzand bo'lish —\nBizning oliy niyatda!`,
    teacherTip: "Tarbiyachi-o'qituvchi uchun metodika: Ertalabki qabul va davra suhbatini boshlash uchun ajoyib motivatsion she'r."
  },
  {
    id: "poem-7",
    title: "To'rt Fasl Mo'jizasi",
    category: "Fasllar va Tabiat",
    age: "4–7 yosh",
    poem: `Bahor kelar gul bilan,\nQaldirg'ochu bulbullar.\nYoz keladi nur bilan,\nPishar shirin qovunlar.\nKuzda oltin yaproqlar,\nTo'lar meva-uzumga,\nQishda oppoq qor yog'ar,\nZavq ulashar ko'zimga!`,
    teacherTip: "Tarbiyachi-o'qituvchi uchun metodika: Tabiat burchagi mashg'ulotida 4 fasl rasmlarini ko'rsatib yod oldiring."
  },
  {
    id: "poem-8",
    title: "Quyoncham va Olmaxon",
    category: "Hayvonot va Tabiat",
    age: "3–6 yosh",
    poem: `Uzun quloq quyoncham,\nSabzi yeydi har qachon.\nDaraxtlarning shoxida,\nYong'oq terar olmaxon!\nAsalarim gul terar,\nBolalarimga bol berar,\nTabiatni asrasak —\nBizga ming quvonch berar!`,
    teacherTip: "Tarbiyachi-o'qituvchi uchun metodika: Sahnalashtirilgan o'yinlarda bolalarga rollar bo'lib berilsa, nutq va artistlik qobiliyati o'sadi."
  },
  {
    id: "poem-9",
    title: "Svetofor — Yo'l Do'stimiz",
    category: "Odob va Tozalik",
    age: "4–7 yosh",
    poem: `Qizil chiroq yonganda,\nTo'xtab turing, bolajon!\nSariq chiroq yonganda,\nTayyor turing har qachon!\nYashil chiroq kulganda,\nYo'ldan o'ting bemalol,\nQoidani bilsangiz —\nYurasiz sog'u xushhol!`,
    teacherTip: "Tarbiyachi-o'qituvchi uchun metodika: Yo'l harakati xavfsizligi burchagida qizil, sariq, yashil doirachalar bilan o'rgatiladi."
  }
];

let extraPoemCounter = 1;
const POEM_GENERATOR_TEMPLATES = [
  {
    cat: "Vatan va Ona",
    titleBase: "Baxtiyor Bolalik Qo'shig'i",
    verses: `Osmonimiz musaffo,\nQuyosh sochar zar nurin.\nBog'chamizda har kuni,\nO'rganamiz ilm sirin!\nUstozimiz mehribon,\nO'rgatar harf va odob,\nKelajakning kaliti —\nQo'limizdagi Kitob!`
  },
  {
    cat: "Harflar va Sanash",
    titleBase: "Bilimdon Bolajon",
    verses: `Harflarni teramiz,\nBo'g'inlarni tuzamiz.\nBirga qo'shsak ikkini,\nUch bo'lishin sezammiz!\nMaktab sari qadamlar,\nIshonch bilan boramiz,\nBesh bahoga o'qishga,\nBugun va'da beramiz!`
  },
  {
    cat: "Fasllar va Tabiat",
    titleBase: "Tabiatni Sevamiz",
    verses: `Bog'da ochildi lola,\nShudring tushdi bargiga.\nSuv quyamiz har kuni,\nKo'chatlarning tagiga.\nQushchalarga don sepib,\nMehr bilan boqamiz,\nYashil tabiat bilan,\nDilga quvonch yoqamiz!`
  },
  {
    cat: "Hayvonot va Tabiat",
    titleBase: "Do'stlik Karvoni",
    verses: `Qo'zichoq der: «Ma-a, ma-a»,\nBuzoqcha der: «Mo'-o', mo'-o'».\nToychoq chopar qir osha,\nSuv ichadi daryocha.\nBarcha jonivorlarga,\nMehr ko'rsatar bola,\nShunda yashnab ketadi,\nBizning go'zal mahalla!`
  }
];

function generateMorePreschoolPoems(amount = 6) {
  for (let i = 0; i < amount; i++) {
    const tpl = POEM_GENERATOR_TEMPLATES[(extraPoemCounter + i) % POEM_GENERATOR_TEMPLATES.length];
    PRESCHOOL_POEMS.push({
      id: "poem-gen-" + extraPoemCounter,
      title: `${tpl.titleBase} (To'plam #${extraPoemCounter})`,
      category: tpl.cat,
      age: "3–7 yosh (Bog'cha va Maktabga tayyorlov)",
      poem: tpl.verses,
      teacherTip: `Tarbiyachi-o'qituvchi uchun metodik tavsiya #${extraPoemCounter}: Bolalar bilan davra bo'lib, ohang va imo-ishoralar yordamida 3 marta takrorlab yod oling.`
    });
    extraPoemCounter++;
  }
}

/* ==========================================================================
   3. BOSHLANG'ICH MAKTABGA TAYYORGARLIK DARSLIKLARI (ENG ZO'R INTERAKTIV TO'PLAM)
   ========================================================================== */
const PRESCHOOL_TEXTBOOKS = [
  {
    id: "tb-alifbe",
    icon: "🔤",
    title: "1-Darslik: Alifbe, Tovush va Bo'g'inlab O'qish Savodxonligi",
    levelBadge: "5–7 yosh va 1-sinfga tayyorgarlik",
    summary: "O'zbek alifbosidagi 29 ta harf, 6 ta unli va 24 ta undosh tovush, bo'g'in tuzish hamda ravon o'qishga o'rgatuvchi mukammal darslik.",
    lessons: [
      "1-dars: Unli tovushlar (A, O, I, E, U, O') — cho'zib aytiladigan ovozli tovushlar.",
      "2-dars: Bo'g'in hosil qilish qoidasi: Har bir bo'g'inda bitta unli tovush bo'ladi (O-NA, O-TA, VA-TAN, KI-TOB).",
      "3-dars: Harflarni qo'shib o'qish mashqi: B + O = BO, L + A = LA -> BO-LA; M + A + K + T + A + B -> MAK-TAB.",
      "4-dars: Bosh harf bilan yoziladigan so'zlar: Kishi ismlari, shahar va davlat nomlari (Azimjon, Toshkent, O'zbekiston)."
    ],
    interactiveTask: "Amaliy topshiriq: «IMKONIYAT» so'zini bo'g'inlarga ajrating -> IM-KO-NI-YAT (4 ta bo'g'in, 9 ta harf).",
    subjectTestId: "maktabga-tayyorgarlik"
  },
  {
    id: "tb-math",
    icon: "🧮",
    title: "2-Darslik: Qiziqarli Matematika, Sanash va Mantiqiy Fikrlash",
    levelBadge: "5–7 yosh va 1-sinfga tayyorgarlik",
    summary: "1 dan 100 gacha to'g'ri va teskari sanash, qo'shish (+), ayirish (-), taqqoslash (>, <, =) va geometrik shakllar darsligi.",
    lessons: [
      "1-dars: 1 dan 20 gacha va o'nliklar (10, 20, 30, 40, 50, 60, 70, 80, 90, 100) bilan sanash.",
      "2-dars: Sonning tarkibi: 5 = 4+1 = 3+2; 10 = 9+1 = 8+2 = 7+3 = 6+4 = 5+5.",
      "3-dars: Taqqoslash belgilari: Katta (>), Kichik (<) va Teng (=). Masalan: 8 > 5, 4 < 9, 7 = 7.",
      "4-dars: Geometrik shakllar olami: Doira, Uchburchak (3 ta burchak), Kvadrat (4 ta teng tomon), To'rtburchak."
    ],
    interactiveTask: "Amaliy masala: Savatda 7 ta qizil olma va 5 ta sariq olma bor. Jami nechta olma bor? Yechim: 7 + 5 = 12 ta olma.",
    subjectTestId: "maktabga-tayyorgarlik"
  },
  {
    id: "tb-world",
    icon: "🌍",
    title: "3-Darslik: Atrof-Olam, Tabiatshunoslik va Xavfsizlik Qoidalari",
    levelBadge: "4–7 yosh va 1-sinfga tayyorgarlik",
    summary: "Yilning 4 fasli, 12 oy, 7 hafta kuni, jonli va jonsiz tabiat, uy va yovvoyi hayvonlar hamda yo'l harakati xavfsizligi.",
    lessons: [
      "1-dars: Yil fasllari (Bahor, Yoz, Kuz, Qish) va hafta kunlari (Dushanba, Seshanba, Chorshanba, Payshanba, Juma, Shanba, Yakshanba).",
      "2-dars: Jonli tabiat (odamlar, hayvonlar, o'simliklar — o'sadi va nafas oladi) hamda Jonsiz tabiat (quyosh, suv, tosh, havo).",
      "3-dars: Uy hayvonlari (sigir, qo'y, ot, mushuk, it) va Yovvoyi hayvonlar (sher, ayiq, bo'ri, tulki, kiyik).",
      "4-dars: Svetofor va ko'cha qoidalari: Qizil — to'xta, Sariq — tayyorlan, Yashil — yo'ldan o't!"
    ],
    interactiveTask: "Savol: Qaysi faslda kunlar eng uzun bo'lib, bolalar yozgi ta'tilga chiqadilar? Javob: Yoz faslida.",
    subjectTestId: "maktabga-tayyorgarlik"
  },
  {
    id: "tb-speech",
    icon: "🗣️",
    title: "4-Darslik: Nutq O'stirish, Topishmoqlar, Maqollar va Odobnoma",
    levelBadge: "4–7 yosh va 1-sinfga tayyorgarlik",
    summary: "Bolaning so'z boyligini oshirish, tez aytishlar, xalq topishmoqlari, odob-axloq qoidalari va rasm asosida hikoya tuzish.",
    lessons: [
      "1-dars: Tez aytishlar (Diksiya mashqi): «Oq choynakka oq qopqoq, ko'k choynakka ko'k qopqoq».",
      "2-dars: Eng sara topishmoqlar: «Qat-qat to'nli, qarich bo'yli» (Karam), «Yer tagida oltin qoziq» (Sabzi), «Tilim-tilim tilinar, yeganlar xursand bo'lar» (Qovun).",
      "3-dars: Oltin maqollar: «Bilagi zo'r birni yiqar, bilimi zo'r mingni yiqar», «Kitob — bilim bulog'i».",
      "4-dars: Sehrli so'zlar odobi: «Assalomu alaykum», «Marhamat», «Katta rahmat», «Kechirasiz», «Sog' bo'ling»."
    ],
    interactiveTask: "Topishmoqni toping: «O'zi kichkina, dumi uzun, pishloq desa yugurar tunu kun» -> Javob: Sichqoncha.",
    subjectTestId: "bogcha-sherlari"
  },
  {
    id: "tb-kids-langs",
    icon: "🌐",
    title: "5-Darslik: Bolajonlar Uchun Xorijiy Tillar (Tojik, Turk, Afg'on, Ingliz, Rus)",
    levelBadge: "4–7 yosh • Ko'p tilli tayyorgarlik",
    summary: "Bog'cha va boshlang'ich maktab yoshidagi bolalar uchun 5 ta tilda ranglar, raqamlar, oila a'zolari va salomlashish darsligi.",
    lessons: [
      "1-dars: Salomlashish: O'zbekcha: Salom | Tojikcha: Салом | Turkcha: Merhaba | Afg'oncha: سلام | Inglizcha: Hello | Ruscha: Привет.",
      "2-dars: Ota va Ona: Tojikcha: Падар ва Модар | Turkcha: Baba ve Anne | Afg'oncha: پلار او مور | Inglizcha: Father & Mother | Ruscha: Папа и Мама.",
      "3-dars: 1 dan 5 gacha sanash: Inglizcha (One, Two, Three, Four, Five) | Turkcha (Bir, İki, Üç, Dört, Beş) | Tojikcha (Як, Ду, Се, Чор, Панҷ).",
      "4-dars: Ranglar olami: Qizil (Red / Kırmızı / Сурх), Yashil (Green / Yeşil / Сабз), Oq (White / Beyaz / Сафед)."
    ],
    interactiveTask: "Amaliy mashq: 5 ta tilda «Rahmat» so'zini ayting: Rahmat • Ташаккур • Teşekkürler • مننه • Thank you • Спасибо!",
    subjectTestId: "tojik-tili"
  },
  {
    id: "tb-motorika",
    icon: "🎨",
    title: "6-Darslik: Husnixatga Tayyorlov, Mayda Motorika va Tasviriy San'at",
    levelBadge: "4–7 yosh • Yozuv mashqlari",
    summary: "Qo'l barmoqlari mushaklarini chiniqtirish, qalamni to'g'ri ushlash, katak daftar chiziqlari va rasm chizish asoslari.",
    lessons: [
      "1-dars: Ruchka va qalamni 3 barmoq orasida to'g'ri ushlash hamda partada gavdani tik tutib o'tirish qoidasi (ko'z bilan daftar orasi 30 sm).",
      "2-dars: Barmoq gimnastikasi: «Bosh barmog'im — bobom, ko'rsatkichim — buvim, o'rta barmoq — otam, nomsiz barmoq — onam, jimjilog'im — o'zim!»",
      "3-dars: Grafik diktant: 1 katak o'ngga, 1 katak yuqoriga, 1 katak o'ngga, 1 katak pastga chizish.",
      "4-dars: Asosiy va hosila ranglar: Sariq + Ko'k = Yashil; Qizil + Sariq = Zarg'aldoq."
    ],
    interactiveTask: "Mashq: Havoda ko'rsatkich barmoq bilan «O», «A», «S» harflarini va 5 qirrali yulduzchani chizing.",
    subjectTestId: "maktabga-tayyorgarlik"
  }
];
