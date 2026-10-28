/* ==========================================================================
   IMKONIYATLAR KALITI - Extended Modules:
   1. Barcha Tillar Cheksiz Lug'ati (Boshlang'ich A1 dan Oxirigacha C2)
      Alohida Tojik, Turk, Afg'on (Dari/Pushtu) hamda Arab, Ingliz, Rus,
      Nemis, Xitoy, Koreys, Fransuz, Ispan, Yapon tillari (Doimiy yangilanib turadi)
   2. Bog'cha Bolalari va O'qituvchi-Tarbiyachilar Uchun Tugamaydigan She'rlar
   3. Boshlang'ich Maktabga Tayyorgarlik va Barcha Qo'shimcha Tillar Darsliklari
      (Avtomatik va tugma orqali doimiy yangilanib turadigan interaktiv darsliklar)
   4. Barcha Sayt va Ijtimoiy Tarmoqlarda Reklama va Ulashish Markazi
   Sayt Admini: Usmonov Azimjon Akmaljon o'g'li
   ========================================================================== */

const SITE_ADMIN_NAME = "Usmonov Azimjon Akmaljon o'g'li";

/* ==========================================================================
   1. BARCHA TILLAR CHEKSIZ LUG'ATI MA'LUMOTLAR BAZASI VA GENERATORI
   ========================================================================== */
const DICTIONARY_LANGUAGES = [
  { id: "tajik", name: "Tojik tili (Тоҷикӣ)", flag: "🇹🇯", badge: "Alohida Qo'shilgan ★", speechLang: "ru-RU", isFeatured: true, testId: "tojik-tili" },
  { id: "turkish", name: "Turk tili (Türkçe)", flag: "🇹🇷", badge: "Alohida Qo'shilgan ★", speechLang: "tr-TR", isFeatured: true, testId: "turk-tili" },
  { id: "afghan", name: "Afg'on tili (Dari / Pushtu - دری / پښتو)", flag: "🇦🇫", badge: "Alohida Qo'shilgan ★", speechLang: "fa-IR", isFeatured: true, testId: "afgon-tili" },
  { id: "arabic", name: "Arab tili (العربية)", flag: "🇸🇦", badge: "Qo'shimcha Til ★ A1–C2", speechLang: "ar-SA", isFeatured: true, testId: "arab-tili" },
  { id: "english", name: "Ingliz tili (English)", flag: "🇬🇧", badge: "A1–C2 IELTS", speechLang: "en-US", isFeatured: false, testId: "ingliz-tili" },
  { id: "russian", name: "Rus tili (Русский)", flag: "🇷🇺", badge: "A1–C2 ТРКИ", speechLang: "ru-RU", isFeatured: false, testId: "rus-tili" },
  { id: "german", name: "Nemis tili (Deutsch)", flag: "🇩🇪", badge: "A1–C2 Goethe", speechLang: "de-DE", isFeatured: false, testId: "nemis-tili" },
  { id: "chinese", name: "Xitoy tili (中文)", flag: "🇨🇳", badge: "HSK 1–6", speechLang: "zh-CN", isFeatured: false, testId: "xitoy-tili" },
  { id: "korean", name: "Koreys tili (한국어)", flag: "🇰🇷", badge: "TOPIK 1–6", speechLang: "ko-KR", isFeatured: false, testId: "koreys-tili" },
  { id: "french", name: "Fransuz tili (Français)", flag: "🇫🇷", badge: "Qo'shimcha ★ DELF A1–C2", speechLang: "fr-FR", isFeatured: true, testId: "fransuz-tili" },
  { id: "spanish", name: "Ispan tili (Español)", flag: "🇪🇸", badge: "Qo'shimcha ★ DELE A1–C2", speechLang: "es-ES", isFeatured: true, testId: "ispan-tili" },
  { id: "japanese", name: "Yapon tili (日本語)", flag: "🇯🇵", badge: "Qo'shimcha ★ JLPT N5–N1", speechLang: "ja-JP", isFeatured: true, testId: "yapon-tili" }
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
  arabic: [
    { level: "A1", cat: "Salomlashish", word: "السَّلَامُ عَلَيْكُمْ / صَبَاحُ الْخَيْرِ", pron: "As-salamu alaykum / Sabahul khayr", uz: "Assalomu alaykum / Xayrli tong", example: "صَبَاحُ الْخَيْرِ يَا أُسْتَاذُ — Xayrli tong, ustoz!" },
    { level: "A1", cat: "Minnatdorchilik", word: "شُكْرًا جَزِيلًا / جَزَاكَ اللَّهُ خَيْرًا", pron: "Shukran jazilan / Jazakallahu khayran", uz: "Katta rahmat / Alloh yaxshilik bilan mukofotlasin", example: "شُكْرًا جَزِيلًا عَلَى مُسَاعَدَتِكَ — Yordamingiz uchun katta rahmat!" },
    { level: "A2", cat: "Ta'lim", word: "مِفْتَاحُ الْفُرَصِ وَالْعِلْمُ", pron: "Miftahul furasi wal-ilmu", uz: "Imkoniyatlar kaliti va ilm", example: "الْعِلْمُ نُورٌ وَمِفْتَاحُ النَّجَاحِ — Ilm nur va muvaffaqiyat kalitidir." },
    { level: "B1", cat: "Maktab", word: "رَوْضَةُ الْأَطْفَالِ وَالْمَدْرَسَةُ", pron: "Rawdatul atfali wal-madrasatu", uz: "Bolalar bog'chasi va Maktab", example: "يَتَعَلَّمُ الْأَطْفَالُ الْقِرَاءَةَ وَالْكِتَابَةَ — Bolalar o'qish va yozishni o'rganadilar." },
    { level: "B2", cat: "Tibbiyot", word: "الْمُسْتَشْفَى وَالطَّبِيبُ الْمَاهِرُ", pron: "Al-mustashfa wat-tabibul mahir", uz: "Shifoxona va mohir shifokor", example: "الْوِقَايَةُ خَيْرٌ مِنَ الْعِلَاجِ — Kasallikning oldini olish davolashdan afzaldir." },
    { level: "C1", cat: "Akademik", word: "اللُّغَةُ الْعَرَبِيَّةُ الْفُصْحَى", pron: "Al-lug'atul arabiyyatul fusha", uz: "Adabiy (Fusha) Arab tili", example: "نَتَعَلَّمُ قَوَاعِدَ النَّحْوِ وَالصَّرْفِ — Nahv va Sarf qoidalarini o'rganamiz." },
    { level: "C2", cat: "Mukammal", word: "التَّعَاوُنُ الْعِلْمِيُّ الدَّوْلِيُّ", pron: "At-ta'awunul ilmiyyud-dawliyy", uz: "Xalqaro ilmiy hamkorlik", example: "شَهَادَةُ التَّمَيُّزِ الْأَكَادِيمِيِّ — Akademik a'lochilik sertifikati." }
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
    { level: "A2", cat: "Maktab", word: "L'école maternelle et primaire", pron: "Lekol maternel e primer", uz: "Bolalar bog'chasi va Boshlang'ich maktab", example: "Les enfants lisent des livres à l'école. — Bolalar maktabda kitob o'qiydilar." },
    { level: "B1", cat: "Asosiy", word: "La Clé des Opportunités", pron: "La Kle dez Oportyunite", uz: "Imkoniyatlar kaliti", example: "Le savoir est la clé de la réussite. — Bilim muvaffaqiyat kalitidir." },
    { level: "C2", cat: "Mukammal", word: "Excellence Académique et Scientifique", pron: "Ekselans Akademik e Syantifik", uz: "Akademik va ilmiy mukammallik", example: "Cinq notes excellentes pour obtenir le certificat. — Sertifikat olish uchun 5 marta a'lo baho." }
  ],
  spanish: [
    { level: "A1", cat: "Salomlashish", word: "¡Hola! / ¡Buenos días! / ¡Muchas gracias!", pron: "Ola / Buenos dias / Muchas grasyas", uz: "Salom / Xayrli tong / Katta rahmat", example: "¡Buenos días, querido profesor! — Xayrli tong, aziz ustoz!" },
    { level: "A2", cat: "Maktab", word: "El jardín de infancia y la escuela primaria", pron: "El xardin de infansiya i la eskuela primarya", uz: "Bolalar bog'chasi va Boshlang'ich maktab", example: "Los niños aprenden poemas y matemáticas. — Bolalar she'rlar va matematikani o'rganadilar." },
    { level: "B1", cat: "Asosiy", word: "La Llave de las Oportunidades", pron: "La Lyave de las Oportunidades", uz: "Imkoniyatlar kaliti", example: "La educación es la llave del futuro. — Ta'lim kelajak kalitidir." },
    { level: "C2", cat: "Mukammal", word: "Excelencia Académica Internacional", pron: "Ekselensiya Akademika Internasyonal", uz: "Xalqaro akademik mukammallik", example: "Cinco calificaciones excelentes para el certificado oficial. — Rasmiy sertifikat uchun 5 marta a'lo baho." }
  ],
  japanese: [
    { level: "A1", cat: "Salomlashish", word: "おはようございます / こんにちは / ありがとう", pron: "Ohayou gozaimasu / Konnichiwa / Arigatou", uz: "Xayrli tong / Salom / Rahmat", example: "先生、おはようございます！ — Ustoz, xayrli tong!" },
    { level: "A2", cat: "Maktab", word: "幼稚園 (Yōchien) と 小学校 (Shōgakkō)", pron: "Youchien to Shougakkou", uz: "Bolalar bog'chasi va Boshlang'ich maktab", example: "学校で新しい言葉を学びます。 — Maktabda yangi so'zlarni o'rganamiz." },
    { level: "B1", cat: "Asosiy", word: "機会の鍵 (Kikai no Kagi)", pron: "Kikai no Kagi", uz: "Imkoniyatlar kaliti", example: "知識は未来を開く機会の鍵です。 — Bilim kelajakni ochuvchi imkoniyatlar kalitidir." },
    { level: "C2", cat: "Mukammal", word: "国際的な学術および技術革新", pron: "Kokusai-teki na gakujutsu oyobi gijutsu kakushin", uz: "Xalqaro ilmiy va texnologik innovatsiya", example: "5回の優秀な成績で公式証明書を取得できます。 — 5 marta a'lo natija bilan rasmiy sertifikat olinadi." }
  ]
};

// Combinatorial stem bank for generating unlimited A1..C2 vocabulary entries on demand across ALL languages
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
  ],
  arabic: [
    { w: "الْكِتَابُ الْمَدْرَسِيُّ", p: "Al-kitabul madrasiyyu", u: "Maktab darsligi", c: "Ta'lim" },
    { w: "الصَّدَاقَةُ الْمُخْلِصَةُ", p: "As-sadaqatul mukhlisatu", u: "Samimiy do'stlik", c: "Muloqot" },
    { w: "الْأُسْرَةُ السَّعِيدَةُ", p: "Al-usratus sa'idatu", u: "Baxtli oila", c: "Oila" },
    { w: "التِّكْنُولُوجِيَا الْحَدِيثَةُ", p: "At-tiknulujiyal hadisatu", u: "Zamonaviy texnologiya", c: "IT va Texnologiya" }
  ],
  english: [
    { w: "Interactive Textbook & Practice", p: "in-ter-ak-tiv tekst-buk", u: "Interaktiv darslik va amaliyot", c: "Ta'lim" },
    { w: "Artificial Intelligence & Cloud", p: "ar-ti-fi-shl in-te-li-jens", u: "Sun'iy intellekt va bulutli tizimlar", c: "IT va Texnologiya" },
    { w: "Clinical Diagnosis & Therapy", p: "kli-ni-kl day-ag-nou-sis", u: "Klinik diagnostika va davolash", c: "Tibbiyot" },
    { w: "International Scholarship", p: "in-ter-nash-nl sko-lar-ship", u: "Xalqaro ta'lim granti", c: "Akademik" }
  ],
  russian: [
    { w: "Учебное пособие и практикум", p: "Uchebnoye posobiye i praktikum", u: "O'quv darsligi va amaliyot", c: "Ta'lim" },
    { w: "Цифровые технологии будущего", p: "Tsifroviye texnologii budushego", u: "Kelajak raqamli texnologiyalari", c: "IT va Texnologiya" },
    { w: "Клиническая медицина и уход", p: "Klinicheskaya meditsina i uxod", u: "Klinik tibbiyot va parvarish", c: "Tibbiyot" }
  ],
  german: [
    { w: "das Lehrbuch und die Übung", p: "das Lerbux und di Ubung", u: "Darslik va amaliy mashq", c: "Ta'lim" },
    { w: "die Berufsausbildung in Deutschland", p: "di Berufsausbildung in Doychland", u: "Germaniyada kasbiy ta'lim", c: "Kasb" },
    { w: "die Moderne Medizintechnik", p: "di Moderne Meditsintexnik", u: "Zamonaviy tibbiy texnika", c: "Tibbiyot" }
  ],
  chinese: [
    { w: "现代教材与练习", p: "Xiàndài jiàocái yǔ liànxí", u: "Zamonaviy darslik va mashqlar", c: "Ta'lim" },
    { w: "国际贸易与合作", p: "Guójì màoyì yǔ hézuò", u: "Xalqaro savdo va hamkorlik", c: "Biznes" }
  ],
  korean: [
    { w: "교과서 및 실습 학습", p: "Gyogwaseo mit silseup hakseup", u: "Darslik va amaliy o'quv mashg'uloti", c: "Ta'lim" },
    { w: "정보통신 기술과 네트워크", p: "Jeongbo-tongsin gisul-gwa neteuwokeu", u: "Axborot-kommunikatsiya va tarmoqlar", c: "IT va Texnologiya" }
  ],
  french: [
    { w: "Le manuel scolaire et les exercices", p: "Le manyuel skoler e lez egzersis", u: "O'quv darsligi va mashqlar", c: "Ta'lim" },
    { w: "La recherche scientifique moderne", p: "La reshersh syantifik modern", u: "Zamonaviy ilmiy tadqiqot", c: "Ilm-fan" }
  ],
  spanish: [
    { w: "El libro de texto interactivo", p: "El libro de teksto interaktivo", u: "Interaktiv o'quv darsligi", c: "Ta'lim" },
    { w: "La cooperación internacional", p: "La kooperasyon internasyonal", u: "Xalqaro hamkorlik", c: "Jamiyat" }
  ],
  japanese: [
    { w: "教科書と実践練習 (Kyōkasho to jissen renshū)", p: "Kyoukasho to jissen renshuu", u: "Darslik va amaliy mashg'ulot", c: "Ta'lim" },
    { w: "最先端の情報技術 (Saisentan no jōhō gijutsu)", p: "Saisentan no jouhou gijutsu", u: "Eng ilg'or axborot texnologiyalari", c: "IT va Texnologiya" }
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
    DICTIONARY_SEED[langId].unshift({
      level: lv,
      cat: `${r.c} • Yangi #${dictionaryGeneratedCounter}`,
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
    poem: `Bog'laringda gullar ochilar chaman,\nSeni jonimdayin sevaman, Vatan!\nQuyosh kulib boqar musaffo osmon,\nBaxtiyor bolangga quchog'ing kengdir har on!\nTog'laring viqorli, daryolaring sho'x,\nSenday aziz diyor dunyoda hech yo'q!`,
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
    verses: `Harflarni teramiz,\nBo'g'inlarni tuzamiz.\nBirga qo'shsak ikkini,\nUch bo'lishin sezamiz!\nMaktab sari qadamlar,\nIshonch bilan boramiz,\nBesh bahoga o'qishga,\nBugun va'da beramiz!`
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
    PRESCHOOL_POEMS.unshift({
      id: "poem-gen-" + extraPoemCounter,
      title: `${tpl.titleBase} (Yangi She'r #${extraPoemCounter})`,
      category: tpl.cat,
      age: "3–7 yosh (Bog'cha va Maktabga tayyorlov)",
      poem: tpl.verses,
      teacherTip: `Tarbiyachi-o'qituvchi uchun metodik tavsiya #${extraPoemCounter}: Bolalar bilan davra bo'lib, ohang va imo-ishoralar yordamida 3 marta takrorlab yod oling.`
    });
    extraPoemCounter++;
  }
}

/* ==========================================================================
   3. BOSHLANG'ICH MAKTABGA TAYYORGARLIK VA BARCHA QO'SHIMCHA TILLAR DARSLIKLARI
      (Doimiy yangilanib turadigan interaktiv darsliklar majmuasi)
   ========================================================================== */
const PRESCHOOL_TEXTBOOKS = [
  // --- A. BOSHLANG'ICH MAKTABGA TAYYORGARLIK DARSLIKLARI ---
  {
    id: "tb-alifbe",
    group: "maktab",
    icon: "🔤",
    title: "1-Darslik: Alifbe, Tovush va Bo'g'inlab O'qish Savodxonligi",
    levelBadge: "5–7 yosh va 1-sinfga tayyorgarlik",
    updatedAt: "Jonli yangilanmoqda",
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
    group: "maktab",
    icon: "🧮",
    title: "2-Darslik: Qiziqarli Matematika, Sanash va Mantiqiy Fikrlash",
    levelBadge: "5–7 yosh va 1-sinfga tayyorgarlik",
    updatedAt: "Jonli yangilanmoqda",
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
    group: "maktab",
    icon: "🌍",
    title: "3-Darslik: Atrof-Olam, Tabiatshunoslik va Xavfsizlik Qoidalari",
    levelBadge: "4–7 yosh va 1-sinfga tayyorgarlik",
    updatedAt: "Jonli yangilanmoqda",
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
    group: "maktab",
    icon: "🗣️",
    title: "4-Darslik: Nutq O'stirish, Topishmoqlar, Maqollar va Odobnoma",
    levelBadge: "4–7 yosh va 1-sinfga tayyorgarlik",
    updatedAt: "Jonli yangilanmoqda",
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
    id: "tb-motorika",
    group: "maktab",
    icon: "🎨",
    title: "5-Darslik: Husnixatga Tayyorlov, Mayda Motorika va Tasviriy San'at",
    levelBadge: "4–7 yosh • Yozuv mashqlari",
    updatedAt: "Jonli yangilanmoqda",
    summary: "Qo'l barmoqlari mushaklarini chiniqtirish, qalamni to'g'ri ushlash, katak daftar chiziqlari va rasm chizish asoslari.",
    lessons: [
      "1-dars: Ruchka va qalamni 3 barmoq orasida to'g'ri ushlash hamda partada gavdani tik tutib o'tirish qoidasi (ko'z bilan daftar orasi 30 sm).",
      "2-dars: Barmoq gimnastikasi: «Bosh barmog'im — bobom, ko'rsatkichim — buvim, o'rta barmoq — otam, nomsiz barmoq — onam, jimjilog'im — o'zim!»",
      "3-dars: Grafik diktant: 1 katak o'ngga, 1 katak yuqoriga, 1 katak o'ngga, 1 katak pastga chizish.",
      "4-dars: Asosiy va hosila ranglar: Sariq + Ko'k = Yashil; Qizil + Sariq = Zarg'aldoq."
    ],
    interactiveTask: "Mashq: Havoda ko'rsatkich barmoq bilan «O», «A», «S» harflarini va 5 qirrali yulduzchani chizing.",
    subjectTestId: "maktabga-tayyorgarlik"
  },

  // --- B. QARDOSH VA QO'SHNI TILLAR MAXSUS DARSLIKLARI (TOJIK, TURK, AFG'ON) ---
  {
    id: "tb-lang-tajik",
    group: "featured-langs",
    icon: "🇹🇯",
    title: "6-Darslik: Tojik Tili Darsligi (Тоҷикӣ — Boshlang'ich A1 dan C2 Mukammalgacha)",
    levelBadge: "Alohida Qo'shilgan Til Darsligi ★ A1–C2",
    updatedAt: "Jonli yangilanmoqda",
    summary: "Tojik alifbosi, maxsus harflar (Ғ, Ӣ, Қ, Ӯ, Ҳ, Ҷ), izofat bog'lanishi, jonli dialoglar, bog'cha/maktab va akademik tojik tili darsligi.",
    lessons: [
      "1-dars (A1 — Alifbo va Talaffuz): Tojik kirill alifbosidagi 35 harf va 6 maxsus harf: Ғ (Ғафур), Ӣ (Дӯстӣ), Қ (Қалам), Ӯ (Ӯзбекистон), Ҳ (Ҳаёт), Ҷ (Ҷумҳурӣ).",
      "2-dars (A1–A2 — Salomlashish va Oila): Салом / Субҳи бахайр (Xayrli tong), Ташаккури зиёд (Katta rahmat), Падар (Ota), Модар (Ona), Бародар (Aka-uka), Хоҳар (Opa-singil).",
      "3-dars (B1 — Izofat qoidasi '-и'): Aniqlanmish so'zga '-и' qo'shiladi: Китоби дарсӣ (Darslik kitob), Мактаби миёна (O'rta maktab), Калиди имкониятҳо (Imkoniyatlar kaliti).",
      "4-dars (B2–C2 — Fe'l zamonlari va Rasmiy uslub): Hozirgi-kelasi zamon 'ме-' old qo'shimchasi bilan yasaladi: Ман мехонам (Men o'qiyman), Мо меомӯзем (Biz o'rganamiz)."
    ],
    interactiveTask: "Amaliy mashq: «Men tojik tilini a'lo bahoga o'rganyapman» gapini tojik tilida ayting -> «Ман забони тоҷикиро бо баҳои аъло меомӯзам!»",
    subjectTestId: "tojik-tili"
  },
  {
    id: "tb-lang-turkish",
    group: "featured-langs",
    icon: "🇹🇷",
    title: "7-Darslik: Turk Tili Darsligi (Türkçe — Alifbo, Grammatika va TÖMER A1–C2)",
    levelBadge: "Alohida Qo'shilgan Til Darsligi ★ TÖMER A1–C2",
    updatedAt: "Jonli yangilanmoqda",
    summary: "Turk lotin alifbosi (29 harf), unlilar uyg'unligi (Ünlü Uyumu), kelishik qo'shimchalari, zamonlar va TÖMER sertifikatiga tayyorlov darsligi.",
    lessons: [
      "1-dars (A1 — Alifbo va Unlilar): 29 ta harf (Ç ç, Ğ ğ, I ı, İ i, Ö ö, Ş ş, Ü ü). Qalin unlilar (a, ı, o, u) va Ingichka unlilar (e, i, ö, ü).",
      "2-dars (A1–A2 — Kundalik Muloqot): Merhaba (Salom), Günaydın (Xayrli tong), Hoş geldiniz (Xush kelibsiz), Çok teşekkür ederim (Juda katta rahmat).",
      "3-dars (B1 — Zamonlar): Şimdiki Zaman (-iyor): Okuyorum (O'qiyapman), Yazıyorsun (Yozyapsan); Geçmiş Zaman (-di): Geldim (Keldim); Gelecek Zaman (-ecek): Başaracağız (Muvaffaqiyatga erishamiz).",
      "4-dars (B2–C2 — Akademik va Kasbiy Turk Tili): Fırsatların Anahtarı Eğitim Platformu (Imkoniyatlar kaliti ta'lim platformasi), Başarı Sertifikası (Muvaffaqiyat sertifikati)."
    ],
    interactiveTask: "Amaliy mashq: «Bilim — imkoniyatlar kalitidir» jumlasini turk tilida yozing -> «Bilgi fırsatların anahtarıdır!»",
    subjectTestId: "turk-tili"
  },
  {
    id: "tb-lang-afghan",
    group: "featured-langs",
    icon: "🇦🇫",
    title: "8-Darslik: Afg'on Tili Darsligi (Dari va Pushtu — دری / پښتو — A1 dan C2 gacha)",
    levelBadge: "Alohida Qo'shilgan Til Darsligi ★ Dari & Pushtu",
    updatedAt: "Jonli yangilanmoqda",
    summary: "Afg'onistonning ikki rasmiy tili — Dari (دری) va Pushtu (پښتو) yozuvi, maxsus harflari, kundalik dialoglari va grammatikasi bo'yicha to'liq darslik.",
    lessons: [
      "1-dars (A1 — Yozuv va Maxsus Harflar): O'ngdan chapga yozilishi; Pushtu maxsus harflari: ټ (t), ډ (d), ړ (r), ږ (g/zh), ښ (sh/kh), څ (ts), ځ (dz), ڼ (n).",
      "2-dars (A1–A2 — Salomlashish va Hurmat): سلام علیکم (Salom alaykum), ستړی مشی (Stary mashay — Charchamang!), سهار په خیر / صبح بخیر (Xayrli tong), مننه / تشکر (Rahmat).",
      "3-dars (B1 — Oila va Maktab): مور او پلار / مادر و پدر (Ona va Ota), ښوونځی / مکتب (Shovunzay / Maktab), ښوونکی / معلم (O'qituvchi), کتاب (Kitob).",
      "4-dars (B2–C2 — Rasmiy va Ilmiy Muloqot): د فرصتونو کیلي / کلید امکانات (Imkoniyatlar kaliti), پوهنه رڼا ده / علم نور است (Ilm — nurdir)."
    ],
    interactiveTask: "Amaliy mashq: Dari va Pushtu tillarida «Katta rahmat» deb ayting -> «تشکر زیاد (Tashakor ziyod) / ډیره مننه (Dera manana)!»",
    subjectTestId: "afgon-tili"
  },

  // --- C. QO'SHIMCHA JAHON TILLARI DARSLIKLARI (ARAB, INGLIZ, RUS, NEMIS, XITOY, KOREYS, FRANSUZ, ISPAN, YAPON) ---
  {
    id: "tb-lang-arabic",
    group: "world-langs",
    icon: "🇸🇦",
    title: "9-Darslik: Arab Tili Darsligi (العربية — Harflar, Tajvid, Nahv-Sarf va A1–C2 Muloqot)",
    levelBadge: "Qo'shimcha Til Darsligi ★ A1–C2",
    updatedAt: "Jonli yangilanmoqda",
    summary: "28 ta arab harfining 4 xil yozilishi (alohida, so'z boshi, o'rtasi, oxiri), Fatha/Kasra/Damma harakatlar, Nahv-Sarf qoidalari va jonli muloqot darsligi.",
    lessons: [
      "1-dars (A1 — Harflar va Harakatlar): الف با ت ث ج ح خ... Fatha (ـَ a), Kasra (ـِ i), Damma (ـُ u), Sukun (ـْ) va Tashdid (ـّ).",
      "2-dars (A2 — Salomlashish va Maktab): السَّلَامُ عَلَيْكُمْ (Assalomu alaykum), صَبَاحُ الْخَيْرِ (Xayrli tong), مَدْرَسَةٌ (Maktab), مُعَلِّمٌ (O'qituvchi), كِتَابٌ (Kitob).",
      "3-dars (B1 — Jumlai Ismiya va Fe'liya): الْعِلْمُ نُورٌ (Ilm — nurdir), مِفْتَاحُ الْفُرَصِ (Imkoniyatlar kaliti), يَقْرَأُ الطَّالِبُ الدَّرْسَ (Talaba darsni o'qiyapti).",
      "4-dars (B2–C2 — Adabiy Fusha va Ilmiy Uslub): شَهَادَةُ التَّمَيُّزِ الْأَكَادِيمِيِّ (Akademik a'lochilik sertifikati), التَّعَاوُنُ الْعِلْمِيُّ (Ilmiy hamkorlik)."
    ],
    interactiveTask: "Amaliy mashq: «الْعِلْمُ مِفْتَاحُ الْفُرَصِ» jumlasini o'qing va tarjima qiling -> «Al-ilmu miftahul furas» (Ilm — imkoniyatlar kalitidir).",
    subjectTestId: "arab-tili"
  },
  {
    id: "tb-lang-english",
    group: "world-langs",
    icon: "🇬🇧",
    title: "10-Darslik: Ingliz Tili Darsligi (English — Boshlang'ich, Maktab 1–12 va IELTS A1–C2)",
    levelBadge: "Qo'shimcha Til Darsligi ★ CEFR / IELTS",
    updatedAt: "Jonli yangilanmoqda",
    summary: "Ingliz alifbosi, fonetika, 12 ta zamon (Tenses), Modal fe'llar, Academic Writing, Tibbiy/IT Ingliz tili va IELTS 7.0–9.0 tayyorlov darsligi.",
    lessons: [
      "1-dars (A1–A2 — To Be & Present Simple): I am a student. She learns new words every day. Knowledge is the Key of Opportunities.",
      "2-dars (B1 — Past & Present Perfect): I have completed five excellent tests and earned my official A4 Certificate.",
      "3-dars (B2 — Conditionals & Passive Voice): If you study consistently, you will achieve C2 mastery.",
      "4-dars (C1–C2 — IELTS Academic & Professional English): Cohesive devices (Furthermore, Consequently, Nevertheless), IT & Medical terminology."
    ],
    interactiveTask: "Amaliy mashq: «Education is the key of opportunities» gapini Passive va Academic uslubda qayta ifodalang.",
    subjectTestId: "ingliz-tili"
  },
  {
    id: "tb-lang-russian",
    group: "world-langs",
    icon: "🇷🇺",
    title: "11-Darslik: Rus Tili Darsligi (Русский Язык — Boshlang'ich, Maktab, Tibbiy va A1–C2)",
    levelBadge: "Qo'shimcha Til Darsligi ★ ТРКИ A1–C2",
    updatedAt: "Jonli yangilanmoqda",
    summary: "Rus tili grammatikasi, 3 rod (мужской, женский, средний), 6 ta padej, fe'l tuslanishi hamda maktab va tibbiyot rus tili darsligi.",
    lessons: [
      "1-dars (A1 — Rod va Olmoshlar): Мой учебник (m.r.), Моя книга (j.r.), Моё окно (sr.r.), Ключ возможностей (Imkoniyatlar kaliti).",
      "2-dars (A2–B1 — 6 Padej tizimi): Именительный (Кто? Что?), Родительный (Кого? Чего?), Дательный (Кому?), Винительный, Творительный, Предложный.",
      "3-dars (B2 — Fe'l turlari): Несовершенный вид (читать — o'qimoq) va Совершенный вид (прочитать — o'qib bo'lmoq).",
      "4-dars (C1–C2 — Kasbiy, Tibbiy va Ilmiy Rus tili): Оказание первой медицинской помощи, Информационные и телекоммуникационные технологии."
    ],
    interactiveTask: "Amaliy mashq: «Образование — это ключ возможностей» gapidagi so'zlarning kelishigini aniqlang.",
    subjectTestId: "rus-tili"
  },
  {
    id: "tb-lang-german",
    group: "world-langs",
    icon: "🇩🇪",
    title: "12-Darslik: Nemis Tili Darsligi (Deutsch — Artikllar, 4 Kasus va Goethe A1–C2)",
    levelBadge: "Qo'shimcha Til Darsligi ★ Goethe / Telc A1–C2",
    updatedAt: "Jonli yangilanmoqda",
    summary: "Nemis tili artikllari (der, die, das), 4 kelishik (Nominativ, Akkusativ, Dativ, Genitiv), gap tartibi hamda Germaniyada o'qish va ishlash darsligi.",
    lessons: [
      "1-dars (A1 — Artikllar va Salomlashish): Guten Morgen! der Lehrer (o'qituvchi), die Schule (maktab), das Buch (kitob), der Schlüssel der Möglichkeiten.",
      "2-dars (A2–B1 — 4 Kasus va Predloglar): Akkusativ (durch, für, gegen, ohne, um) va Dativ (mit, nach, aus, zu, von, bei, seit).",
      "3-dars (B2 — Perfekt va Nebensatz): Ich habe fünfmal die Note Sehr Gut erreicht, weil ich fleißig gelernt habe.",
      "4-dars (C1–C2 — Medizin, Pflege & IT in Deutschland): Pflegefachkraft, Facharztprüfung, Softwareentwicklung."
    ],
    interactiveTask: "Amaliy mashq: «Bildung ist der Schlüssel zum Erfolg» gapini tahlil qiling va ovoz chiqarib o'qing.",
    subjectTestId: "nemis-tili"
  },
  {
    id: "tb-lang-chinese",
    group: "world-langs",
    icon: "🇨🇳",
    title: "13-Darslik: Xitoy Tili Darsligi (中文 — Pinyin, 4 Ohang, Ierogliflar va HSK 1–6)",
    levelBadge: "Qo'shimcha Til Darsligi ★ HSK 1–6",
    updatedAt: "Jonli yangilanmoqda",
    summary: "Xitoy fonetikasi (Pinyin), 4 ta asosiy ton (ohang), ieroglif yozish tartibi, HSK 1 dan HSK 6 gacha lug'at va muloqot darsligi.",
    lessons: [
      "1-dars (HSK 1 — 4 ta Ton): 1-ton mā (妈), 2-ton má (麻), 3-ton mǎ (马), 4-ton mà (骂). 你好 (Nǐ hǎo — Salom), 谢谢 (Xièxie — Rahmat).",
      "2-dars (HSK 2–3 — Gap qurilishi SVO): 我学习汉语 (Wǒ xuéxí Hànyǔ — Men xitoy tilini o'rganaman), 学校 (Xuéxiào — Maktab), 老师 (Lǎoshī — Ustoz).",
      "3-dars (HSK 4 — Ta'lim va Imkoniyatlar): 机遇之钥 (Jīyù zhī yào — Imkoniyatlar kaliti), 知识就是力量 (Bilim — kuchdir).",
      "4-dars (HSK 5–6 — Ilmiy va Biznes Xitoy tili): 科技创新与国际合作 (Texnologik innovatsiya va xalqaro hamkorlik)."
    ],
    interactiveTask: "Amaliy mashq: «我爱学习汉语» (Wǒ ài xuéxí Hànyǔ — Men xitoy tilini o'rganishni yaxshi ko'raman) jumlasini yozing.",
    subjectTestId: "xitoy-tili"
  },
  {
    id: "tb-lang-korean",
    group: "world-langs",
    icon: "🇰🇷",
    title: "14-Darslik: Koreys Tili Darsligi (한국어 — Hangul, Grammatika va TOPIK 1–6)",
    levelBadge: "Qo'shimcha Til Darsligi ★ TOPIK & EPS-TOPIK",
    updatedAt: "Jonli yangilanmoqda",
    summary: "Hangul alifbosi (14 undosh va 10 unli), bo'g'in yig'ish qoidasi, hurmat darajalari, TOPIK I/II va Janubiy Koreyada ishlash (EPS-TOPIK) darsligi.",
    lessons: [
      "1-dars (A1 — Hangul Alifbosi): Undoshlar (ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅅ, ㅇ, ㅈ...) va Unlilar (ㅏ, ㅑ, ㅓ, ㅕ, ㅗ, ㅛ, ㅜ, ㅠ, ㅡ, ㅣ).",
      "2-dars (A2 — Salomlashish va SOV tartibi): 안녕하세요 (Annyeonghaseyo), 감사합니다 (Kamsahamnida), 학교 (Maktab), 선생님 (Ustoz).",
      "3-dars (B1–B2 — Qo'shimchalar va Zamonlar): 은/는, 이/가, 을/를, -습니다 / -아요/어요. 기회의 열쇠 (Gihoe-ui Yeolsoe — Imkoniyatlar kaliti).",
      "4-dars (C1–C2 — TOPIK II va Kasbiy Koreys tili): 한국어 능력 시험 (TOPIK), 의료 및 정보기술 (Tibbiyot va IT koreys tili)."
    ],
    interactiveTask: "Amaliy mashq: «배움은 기회의 열쇠입니다» (Bilim — imkoniyatlar kalitidir) jumlasini bo'g'inlab o'qing.",
    subjectTestId: "koreys-tili"
  },
  {
    id: "tb-lang-french",
    group: "world-langs",
    icon: "🇫🇷",
    title: "15-Darslik: Fransuz Tili Darsligi (Français — Talaffuz, Grammatika va DELF A1–C2)",
    levelBadge: "Qo'shimcha Til Darsligi ★ DELF / DALF A1–C2",
    updatedAt: "Jonli yangilanmoqda",
    summary: "Fransuz tili o'qilish qoidalari, burun unlilari, artikllar, Être va Avoir fe'llari, zamonlar va DELF/DALF xalqaro darsligi.",
    lessons: [
      "1-dars (A1 — Talaffuz va Artikllar): ou [u], oi [ua], eau [o], ch [sh]. Aniq artikllar: le, la, l', les. Bonjour ! Merci beaucoup !",
      "2-dars (A2 — Être va Avoir): Je suis étudiant (Men talabaman), Nous avons un livre (Bizda kitob bor), L'école et le professeur.",
      "3-dars (B1–B2 — Zamonlar va Muloqot): Passé Composé, Imparfait, Futur Simple. La Clé des Opportunités (Imkoniyatlar kaliti).",
      "4-dars (C1–C2 — DALF Akademik Uslub): Littérature française, Diplomatie et Sciences modernes."
    ],
    interactiveTask: "Amaliy mashq: «Le savoir est la clé des opportunités» jumlasini fransuzcha talaffuz bilan o'qing.",
    subjectTestId: "fransuz-tili"
  },
  {
    id: "tb-lang-spanish",
    group: "world-langs",
    icon: "🇪🇸",
    title: "16-Darslik: Ispan Tili Darsligi (Español — Ser/Estar, Muloqot va DELE A1–C2)",
    levelBadge: "Qo'shimcha Til Darsligi ★ DELE A1–C2",
    updatedAt: "Jonli yangilanmoqda",
    summary: "Ispan tili fonetikasi (ñ, ll, ch, rr), rod va son kategoriyasi, Ser hamda Estar fe'llari, zamonlar va DELE sertifikat darsligi.",
    lessons: [
      "1-dars (A1 — Alifbo va Salomlashish): ¡Hola! ¡Buenos días! ¡Muchas gracias! Ñ harfi [ny] deb o'qiladi (España, niño).",
      "2-dars (A2 — Ser va Estar): Yo soy médico / estudiante (doimiy), Estoy en la escuela (joylashuv va holat).",
      "3-dars (B1–B2 — Zamonlar va Suhbat): Presente, Pretérito Indefinido, Futuro. La Llave de las Oportunidades (Imkoniyatlar kaliti).",
      "4-dars (C1–C2 — Akademik va Biznes Ispan tili): Cooperación científica, Medicina y Tecnología."
    ],
    interactiveTask: "Amaliy mashq: «La educación es la llave de las oportunidades» gapini tarjima qiling va yod oling.",
    subjectTestId: "ispan-tili"
  },
  {
    id: "tb-lang-japanese",
    group: "world-langs",
    icon: "🇯🇵",
    title: "17-Darslik: Yapon Tili Darsligi (日本語 — Hiragana, Katakana, Kanji va JLPT N5–N1)",
    levelBadge: "Qo'shimcha Til Darsligi ★ JLPT N5–N1",
    updatedAt: "Jonli yangilanmoqda",
    summary: "Yapon yozuvlari (46 ta Hiragana, 46 ta Katakana va asosiy Kanji ierogliflari), ko'makchilar, Desu/Masu uslubi va JLPT N5–N1 darsligi.",
    lessons: [
      "1-dars (N5 / A1 — Hiragana va Salomlashish): あ (a), い (i), う (u), え (e), お (o). おはようございます (Ohayou gozaimasu), こんにちは (Konnichiwa).",
      "2-dars (N4 / A2 — Gap qurilishi va Ko'makchilar): 私は学生です (Watashi wa gakusei desu — Men talabaman), 学校 (Gakkou — Maktab), 先生 (Sensei — Ustoz).",
      "3-dars (N3 / B1 — Kanji va Muloqot): 機会の鍵 (Kikai no Kagi — Imkoniyatlar kaliti), 勉強 (Benkyou — O'qish/tahsil).",
      "4-dars (N2–N1 / C1–C2 — Akademik va IT Yapon tili): 敬語 (Keigo — Oliy hurmat uslubi), 情報技術 (Axborot texnologiyalari)."
    ],
    interactiveTask: "Amaliy mashq: «知識は機会の鍵です» (Chishiki wa kikai no kagi desu — Bilim imkoniyatlar kalitidir) jumlasini o'qing.",
    subjectTestId: "yapon-tili"
  },
  {
    id: "tb-kids-langs",
    group: "featured-langs",
    icon: "🌐",
    title: "18-Darslik: Bolajonlar Uchun 12 Tilda Qiyosiy So'zlashuv Darsligi",
    levelBadge: "4–10 yosh • 12 Tilda Tayyorgarlik",
    updatedAt: "Jonli yangilanmoqda",
    summary: "Bog'cha va boshlang'ich maktab o'quvchilari uchun Tojik, Turk, Afg'on, Arab, Ingliz, Rus, Nemis, Xitoy, Koreys, Fransuz, Ispan va Yapon tillarida qiyosiy darslik.",
    lessons: [
      "1-dars (Salomlashish — 12 tilda): Salom • Салом • Merhaba • سلام • السَّلَامُ عَلَيْكُمْ • Hello • Привет • Hallo • 你好 • 안녕하세요 • Bonjour • ¡Hola! • こんにちは.",
      "2-dars (Rahmat aytish — 12 tilda): Rahmat • Ташаккур • Teşekkürler • مننه • شُكْرًا • Thank you • Спасибо • Danke • 谢谢 • 감사합니다 • Merci • Gracias • ありがとう.",
      "3-dars (Ota va Ona — 12 tilda): Ota-Ona • Падар ва Модар • Baba ve Anne • پلار او مور • أَبٌ وَأُمٌّ • Father & Mother • Папа и Мама • Vater & Mutter.",
      "4-dars (Imkoniyatlar kaliti — 12 tilda): Калиди имкониятҳо • Fırsatların Anahtarı • د فرصتونو کیلي • مِفْتَاحُ الْفُرَصِ • Key of Opportunities • Ключ возможностей."
    ],
    interactiveTask: "Amaliy mashq: 12 ta tilda «Salom» va «Rahmat» so'zlarini ketma-ket aytib ko'ring!",
    subjectTestId: "tojik-tili"
  }
];

// Dynamic Textbook & Lesson Update Engine ("yangilanib tursin")
let textbookUpdateCounter = 1;

const DYNAMIC_TEXTBOOK_LESSONS_BANK = [
  {
    targetId: "tb-lang-tajik",
    lesson: (n) => `Yangi Dars #${n + 4} (Tojik tili • A1–C2): Amaliy suhbat va lug'at boyitish — «Дар мактаб ва донишгоҳ» (Maktab va universitetda): Муаллими мӯҳтарам, ман вазифаи хонагиро пурра иҷро кардам (Muhtaram ustoz, men uy vazifasini to'liq bajardim).`,
    task: (n) => `Yangi Topshiriq #${n}: «Китоб سرчашмаи дониш аст» (Kitob — bilim bulog'idir) maqolini yod oling va 3 ta gap tuzing.`
  },
  {
    targetId: "tb-lang-turkish",
    lesson: (n) => `Yangi Dars #${n + 4} (Turk tili • TÖMER): Dialog va Grammatika — «Eğitim ve Gelecek» (Ta'lim va Kelajak): Her gün yeni kelimeler öğreniyorum ve Türkçe konuşma pratiği yapıyorum (Har kuni yangi so'zlar o'rganyapman va turkcha suhbat mashq qilyapman).`,
    task: (n) => `Yangi Topshiriq #${n}: «Beş kez mükemmel not alarak sertifika kazandım» gapini fe'l zamonlari bo'yicha tahlil qiling.`
  },
  {
    targetId: "tb-lang-afghan",
    lesson: (n) => `Yangi Dars #${n + 4} (Afg'on tili — Dari / Pushtu): Jonli muloqot — «په ښوونځي کې / در مکتب» (Maktabda): موږ هره ورځ نوې کلمې او شعرونه زده کوو (Biz har kuni yangi so'z va she'rlar o'rganamiz).`,
    task: (n) => `Yangi Topshiriq #${n}: Dari va Pushtu tillarida 1 dan 10 gacha sonlarni (یک، دو، سه... / یو، دوه، درې...) yozib mashq qiling.`
  },
  {
    targetId: "tb-lang-arabic",
    lesson: (n) => `Yangi Dars #${n + 4} (Arab tili • Nahv va Muloqot): «فِي الْمَكْتَبَةِ وَالْمَدْرَسَةِ» (Kutubxona va maktabda): أَقْرَأُ كِتَابًا جَدِيدًا كُلَّ يَوْمٍ لِزِيَادَةِ الْمَعْرِفَةِ (Bilimni oshirish uchun har kuni yangi kitob o'qiyman).`,
    task: (n) => `Yangi Topshiriq #${n}: «طَلَبُ الْعِلْمِ فَرِيضَةٌ» hikmatini harakatlari bilan yozing va talaffuz qiling.`
  },
  {
    targetId: "tb-lang-english",
    lesson: (n) => `Yangi Dars #${n + 4} (English • IELTS & Academic): Idioms & Phrasal Verbs — "Go the extra mile", "Pass with flying colours" (Imtihondan a'lo baho bilan o'tmoq).`,
    task: (n) => `Yangi Topshiriq #${n}: "Pass with flying colours" iborasi ishtirokida 2 ta murakkab (C1) gap tuzing.`
  },
  {
    targetId: "tb-lang-russian",
    lesson: (n) => `Yangi Dars #${n + 4} (Rus tili • ТРКИ): Разговорная практика и грамматика — «Культура речи и деловое общение»: Грамотная речь открывает все двери к успеху.`,
    task: (n) => `Yangi Topshiriq #${n}: «Учиться — всегда пригодится» maqolini 6 ta padejda otlar bilan qo'llab ko'ring.`
  },
  {
    targetId: "tb-lang-german",
    lesson: (n) => `Yangi Dars #${n + 4} (Nemis tili • Goethe B1–C1): Redemittel & Wortschatz — «Im Beruf und Studium»: Übung macht den Meister (Mashq ustoz qiladi).`,
    task: (n) => `Yangi Topshiriq #${n}: «Obwohl die Aufgabe schwer war, habe ich sie gelöst» gapidagi ergash gap tartibini tushuntiring.`
  },
  {
    targetId: "tb-lang-chinese",
    lesson: (n) => `Yangi Dars #${n + 4} (Xitoy tili • HSK): 成语 (Chéngyǔ — Hikmatli ibora): 学无止境 (Xué wú zhǐ jìng — Ilm o'rganishning chegarasi yo'q).`,
    task: (n) => `Yangi Topshiriq #${n}: 学无止境 (Xué wú zhǐ jìng) iborasidagi 4 ta ieroglifning ohanglarini ayting.`
  },
  {
    targetId: "tb-lang-korean",
    lesson: (n) => `Yangi Dars #${n + 4} (Koreys tili • TOPIK): 속담과 표현 (Maqol va iboralar): 천리길도 한 걸음부터 (Ming chaqirimlik yo'l ham birinchi qadamdan boshlanadi).`,
    task: (n) => `Yangi Topshiriq #${n}: «열심히 공부해서 자격증을 땄습니다» gapini tarjima qiling.`
  },
  {
    targetId: "tb-lang-french",
    lesson: (n) => `Yangi Dars #${n + 4} (Fransuz tili • DELF): Expressions idiomatiques — «Petit à petit, l'oiseau fait son nid» (Toma-toma ko'l bo'lur).`,
    task: (n) => `Yangi Topshiriq #${n}: Fransuz tilida kelasi zamon (Futur Simple) da 3 ta gap tuzing.`
  },
  {
    targetId: "tb-lang-spanish",
    lesson: (n) => `Yangi Dars #${n + 4} (Ispan tili • DELE): Refranes y Gramática — «El saber no ocupa lugar» (Bilim ortiqchalik qilmaydi).`,
    task: (n) => `Yangi Topshiriq #${n}: Ispan tilida o'zingiz va oilangiz haqida 4 gapdan iborat matn tuzing.`
  },
  {
    targetId: "tb-lang-japanese",
    lesson: (n) => `Yangi Dars #${n + 4} (Yapon tili • JLPT): ことわざ (Maqol): 継続は力なり (Keizoku wa chikara nari — Davomiylik va sabr kuchdir).`,
    task: (n) => `Yangi Topshiriq #${n}: Hiragana va Kanji yordamida «継続は力なり» jumlasini yozing.`
  },
  {
    targetId: "tb-alifbe",
    lesson: (n) => `Yangi Dars #${n + 4} (Alifbe va O'qish): Bo'g'inli matn o'qish mashqi — «О-ДОБ-ЛИ БО-ЛА ЭЛ-ГА МАН-ЗУР» (Odobli bola elga manzur).`,
    task: (n) => `Yangi Topshiriq #${n}: «MAKTABIM» va «USTOZIM» so'zlarida nechta unli va nechta undosh harf borligini sanang.`
  },
  {
    targetId: "tb-math",
    lesson: (n) => `Yangi Dars #${n + 4} (Qiziqarli Matematika): Tezkor og'zaki hisob — (${10 + n} + ${5 + (n % 9)} = ${15 + n + (n % 9)}) va mantiqiy ketma-ketlik: 2, 4, 6, 8, 10, ${12 + (n % 5) * 2}.`,
    task: (n) => `Yangi Topshiriq #${n}: Do'konda ${12 + n} ta daftar bor edi, yana ${6 + (n % 7)} ta daftar keltirildi. Jami: ${18 + n + (n % 7)} ta.`
  }
];

function updateAndGenerateMoreTextbooks(cycles = 1) {
  const timeStr = new Date().toLocaleTimeString();
  for (let c = 0; c < cycles; c++) {
    DYNAMIC_TEXTBOOK_LESSONS_BANK.forEach((entry, idx) => {
      const tb = PRESCHOOL_TEXTBOOKS.find(t => t.id === entry.targetId);
      if (tb) {
        const newLessonText = entry.lesson(textbookUpdateCounter);
        if (!tb.lessons.includes(newLessonText)) {
          tb.lessons.push(newLessonText);
          if (tb.lessons.length > 8) {
            // Keep first 3 core lessons + latest 5 dynamic lessons so card stays readable & fresh
            tb.lessons = [...tb.lessons.slice(0, 3), ...tb.lessons.slice(-5)];
          }
        }
        tb.interactiveTask = entry.task(textbookUpdateCounter);
        tb.updatedAt = `🔄 Yangilandi: ${timeStr} (To'plam #${textbookUpdateCounter})`;
      }
    });

    // Also add 2 new dictionary words to every language so the dictionary keeps growing in sync
    DICTIONARY_LANGUAGES.forEach(l => {
      generateMoreDictionaryItems(l.id, 2);
    });

    textbookUpdateCounter++;
  }
}
