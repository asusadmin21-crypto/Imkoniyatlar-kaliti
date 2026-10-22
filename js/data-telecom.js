/* ==========================================================================
   IMKONIYATLAR KALITI - Telecommunications, IP, Hardware, Ports & OSI Model
   Includes interactive SVG Schematics, OSI Layers, Protocols & Connection Maps
   ========================================================================== */

const TELECOM_DEVICES = [
  {
    id: "l1-l2-l3-switches",
    title: "L1, L2 va L3 Switchlar (Kommutatorlar) — To'liq Arxitektura",
    category: "Switch va Marshrutlash",
    osiLayer: "L1 (Fizik), L2 (Kanal - Data Link), L3 (Tarmoq - Network)",
    networkType: "LAN / Enterprise Campus / Data Center",
    protocols: "IEEE 802.3 Ethernet, 802.1Q VLAN, STP/RSTP (802.1D/w), LACP (802.3ad), OSPF, RIP, VRRP, SNMP",
    media: "UTP/FTP Cat5e/Cat6/Cat6a (RJ-45) hamda Optik tolali LC/SC (SFP/SFP+/QSFP28)",
    connectsTo: "Kompyuterlar, IP Kameralar (PoE orqali), IP Telefonlar, Wi-Fi Access Pointlar, Serverlar, Routerlar",
    portsDetail: "24/48 ta Gigabit RJ-45 (10/100/1000Base-T, PoE/PoE+ 802.3af/at), 4 ta SFP+ (10G Uplink), 1 ta Console (RJ-45/USB-C)",
    summary: "L1 qurilmalar (Hub/Repeater/Media Converter) signalni faqat fizik bit ko'rinishida kuchaytiradi. L2 Switchlar MAC-manzillar jadvali (CAM Table) asosida kadrlarni (Frames) uzatadi va VLAN hamda Spanning Tree (STP) orqali tarmoqni boshqaradi. L3 Switchlar esa apparat darajasida (ASIC) IP paketlarni marshrutlaydi (Inter-VLAN Routing, SVI, OSPF).",
    svgDiagram: `<svg viewBox="0 0 680 230" xmlns="http://www.w3.org/2000/svg">
      <rect width="680" height="230" rx="12" fill="#071022"/>
      <text x="20" y="26" fill="#fbbf24" font-size="13" font-weight="bold">CHIZMA: L2 / L3 PoE SWITCH ULanish Topologiyasi va Portlari</text>
      <!-- Switch Chassis -->
      <rect x="20" y="42" width="640" height="68" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
      <text x="35" y="62" fill="#38bdf8" font-size="11" font-weight="bold">CORE L3 / L2+ GIGABIT PoE+ SWITCH (48x RJ-45 + 4x 10G SFP+)</text>
      <!-- Console port -->
      <rect x="35" y="72" width="28" height="24" rx="3" fill="#0ea5e9"/>
      <text x="37" y="88" fill="#082f49" font-size="8" font-weight="bold">CON</text>
      <!-- RJ45 Ports -->
      <g fill="#10b981" stroke="#052e16" stroke-width="1">
        <rect x="80" y="72" width="22" height="22" rx="2"/><rect x="108" y="72" width="22" height="22" rx="2"/>
        <rect x="136" y="72" width="22" height="22" rx="2"/><rect x="164" y="72" width="22" height="22" rx="2"/>
        <rect x="192" y="72" width="22" height="22" rx="2"/><rect x="220" y="72" width="22" height="22" rx="2"/>
        <rect x="248" y="72" width="22" height="22" rx="2"/><rect x="276" y="72" width="22" height="22" rx="2"/>
      </g>
      <text x="82" y="105" fill="#cbd5e1" font-size="9">Port 1-8: Access / PoE+ (802.3at 30W) — VLAN 10, 20, 30</text>
      <!-- SFP+ Uplink Ports -->
      <g fill="#f59e0b" stroke="#451a03" stroke-width="1">
        <rect x="490" y="72" width="32" height="22" rx="2"/><rect x="528" y="72" width="32" height="22" rx="2"/>
        <rect x="566" y="72" width="32" height="22" rx="2"/><rect x="604" y="72" width="32" height="22" rx="2"/>
      </g>
      <text x="490" y="105" fill="#fde68a" font-size="9">SFP+ 49-52 (10Gbps Optik LC Uplink)</text>
      <!-- Connected End Devices -->
      <line x1="91" y1="94" x2="91" y2="155" stroke="#34d399" stroke-width="2"/>
      <rect x="35" y="155" width="115" height="52" rx="6" fill="#0f172a" stroke="#10b981"/>
      <text x="45" y="175" fill="#34d399" font-size="10" font-weight="bold">💻 Kompyuter (PC)</text>
      <text x="45" y="192" fill="#94a3b8" font-size="9">Cat6 RJ-45 | VLAN 10</text>

      <line x1="175" y1="94" x2="230" y2="155" stroke="#34d399" stroke-width="2"/>
      <rect x="170" y="155" width="125" height="52" rx="6" fill="#0f172a" stroke="#10b981"/>
      <text x="180" y="175" fill="#34d399" font-size="10" font-weight="bold">📹 IP Kamera (PoE)</text>
      <text x="180" y="192" fill="#94a3b8" font-size="9">Cat5e/6 | VLAN 20 CCTV</text>

      <line x1="260" y1="94" x2="375" y2="155" stroke="#34d399" stroke-width="2"/>
      <rect x="315" y="155" width="130" height="52" rx="6" fill="#0f172a" stroke="#10b981"/>
      <text x="325" y="175" fill="#34d399" font-size="10" font-weight="bold">☎️ IP Telefon + Wi-Fi</text>
      <text x="325" y="192" fill="#94a3b8" font-size="9">PoE Voice VLAN 30</text>

      <line x1="544" y1="94" x2="555" y2="155" stroke="#fbbf24" stroke-width="2.5" stroke-dasharray="4 2"/>
      <rect x="470" y="155" width="185" height="52" rx="6" fill="#0f172a" stroke="#fbbf24"/>
      <text x="480" y="175" fill="#fbbf24" font-size="10" font-weight="bold">🌐 Core Router / Server</text>
      <text x="480" y="192" fill="#94a3b8" font-size="9">10G Single-Mode Optik LC</text>
    </svg>`
  },
  {
    id: "routers-wifi-generations",
    title: "Marshrutizatorlar (Routerlar) va Barcha Avlod Wi-Fi (Wi-Fi 4/5/6/6E/7) Qurilmalari",
    category: "Router va Simsiz Tarmoq",
    osiLayer: "L3 (Network - IP Marshrutlash) + L1/L2 (IEEE 802.11 Radio/MAC)",
    networkType: "WAN / LAN / WLAN / SOHO / Enterprise",
    protocols: "IPv4, IPv6, NAT/PAT, DHCP, DNS, BGP, OSPF, IPSec/WireGuard VPN, WPA2/WPA3, 802.11n/ac/ax/be (OFDMA, MU-MIMO)",
    media: "WAN porti (Optik SFP yoki RJ-45 Ethernet), LAN portlari (Gigabit/2.5G RJ-45), Simsiz radio to'lqinlar (2.4 GHz, 5 GHz, 6 GHz)",
    connectsTo: "ISP Provayder modemi/OLT, L2/L3 Switchlar, Noutbuklar, Smartfonlar, Smart TV, IoT qurilmalar",
    portsDetail: "1x WAN (RJ-45 yoki SFP GPON), 4x LAN (RJ-45 1G/2.5G), 1x USB 3.0 (4G/5G Modem yoki FTP Server uchun), Reset/WPS",
    summary: "Marshrutizator (Router) turli IP tarmoqlarni (masalan, Provayder WAN tarmog'i va ichki LAN 192.168.1.0/24 tarmog'ini) bir-biriga bog'laydi. Wi-Fi avlodlari: Wi-Fi 4 (802.11n, 2.4/5GHz, 600 Mbps), Wi-Fi 5 (802.11ac, 5GHz, 3.5 Gbps), Wi-Fi 6/6E (802.11ax, 2.4/5/6GHz, 9.6 Gbps, OFDMA), Wi-Fi 7 (802.11be, 320MHz kanal, MLO, 46 Gbps).",
    svgDiagram: `<svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg">
      <rect width="680" height="220" rx="12" fill="#071022"/>
      <text x="20" y="25" fill="#38bdf8" font-size="13" font-weight="bold">CHIZMA: ISP WAN -&gt; MARSHRUTIZATOR (ROUTER) -&gt; WI-FI 6/7 VA LAN TARMOQ</text>
      <!-- ISP Cloud -->
      <rect x="20" y="75" width="125" height="75" rx="10" fill="#0f172a" stroke="#f59e0b" stroke-width="2"/>
      <text x="34" y="103" fill="#fbbf24" font-size="11" font-weight="bold">🌍 INTERNET (ISP)</text>
      <text x="34" y="122" fill="#cbd5e1" font-size="9">Public IP / BGP</text>
      <text x="34" y="136" fill="#94a3b8" font-size="8">Optik tolali liniya</text>
      <!-- Arrow WAN -->
      <line x1="145" y1="112" x2="235" y2="112" stroke="#f59e0b" stroke-width="3"/>
      <text x="155" y="103" fill="#fde68a" font-size="9">WAN Port (RJ45/SFP)</text>
      <!-- Router -->
      <rect x="235" y="60" width="195" height="105" rx="12" fill="#1e293b" stroke="#38bdf8" stroke-width="2.5"/>
      <!-- Antennas -->
      <line x1="265" y1="60" x2="255" y2="30" stroke="#38bdf8" stroke-width="3"/>
      <line x1="332" y1="60" x2="332" y2="26" stroke="#38bdf8" stroke-width="3"/>
      <line x1="400" y1="60" x2="410" y2="30" stroke="#38bdf8" stroke-width="3"/>
      <text x="250" y="85" fill="#38bdf8" font-size="11" font-weight="bold">📡 WI-FI 6/7 ROUTER (L3)</text>
      <text x="250" y="103" fill="#e2e8f0" font-size="9">NAT + DHCP (192.168.1.1/24)</text>
      <text x="250" y="119" fill="#34d399" font-size="9">🔵 WAN | 🟡 LAN 1-4 | 🟣 USB</text>
      <text x="250" y="135" fill="#cbd5e1" font-size="9">2.4GHz + 5GHz + 6GHz MLO</text>
      <!-- Outputs -->
      <line x1="430" y1="90" x2="515" y2="65" stroke="#10b981" stroke-width="2.5" stroke-dasharray="5 3"/>
      <rect x="515" y="38" width="145" height="55" rx="8" fill="#0f172a" stroke="#10b981"/>
      <text x="525" y="58" fill="#34d399" font-size="10" font-weight="bold">📱 Simsiz (WLAN)</text>
      <text x="525" y="75" fill="#94a3b8" font-size="9">Noutbuk, Smartfon, TV</text>

      <line x1="430" y1="135" x2="515" y2="160" stroke="#38bdf8" stroke-width="2.5"/>
      <rect x="515" y="130" width="145" height="58" rx="8" fill="#0f172a" stroke="#38bdf8"/>
      <text x="525" y="150" fill="#38bdf8" font-size="10" font-weight="bold">🖧 LAN Port 1-4 (Cat6)</text>
      <text x="525" y="167" fill="#94a3b8" font-size="9">Switch, Kompyuter, NVR</text>
    </svg>`
  },
  {
    id: "sim-lte-5g-wireless",
    title: "Sim-kartali (4G LTE / 5G NR) Wi-Fi Routerlar va Simsiz Radio Ko'priklar (PtP/PtMP)",
    category: "Simsiz Aloqa va Mobil Internet",
    osiLayer: "L1 (RF / LTE / 5G NR Physical), L2 (MAC/PDCP), L3 (IP/NAT/GTP)",
    networkType: "WWAN (Wireless WAN) / WLAN / WISP",
    protocols: "3GPP LTE Cat4/Cat6/Cat12, 5G NR (Sub-6GHz), PPP, QMI, MBIM, NAT, DHCP, WPA3, TDMA/AirMax",
    media: "Nano/Micro SIM-karta (Uyali aloqa bazaviy stansiyasi eNodeB/gNodeB bilan radio aloqa), SMA tashqi MIMO antennalar, RJ-45 LAN",
    connectsTo: "Uyali aloqa operatorlari (Uztelecom, Beeline, Ucell, Mobiuz), NVR/IP kameralar (uzoq obyektlarda), Kompyuter va Smartfonlar",
    portsDetail: "1x SIM Slot (Nano-SIM / eSIM), 2x SMA (4G/5G tashqi antenna ulagichi), 1x WAN/LAN RJ-45, 3x LAN RJ-45, 12V DC quvvat",
    summary: "Optik kabel yetib bormagan hududlarda, dala obyektlarida, qurilish va transportda SIM-kartali 4G/5G CPE Wi-Fi routerlar ishlatiladi. SIM-karta orqali operatorning mobil bazaviy stansiyasidan (3G/4G/5G) internet qabul qilinib, ichki modem orqali IP paketga aylantiriladi va bir vaqtda ham Wi-Fi orqali, ham RJ-45 LAN portlari orqali kompyuter hamda NVR/kameralarga tarqatiladi.",
    svgDiagram: `<svg viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg">
      <rect width="680" height="220" rx="12" fill="#071022"/>
      <text x="20" y="25" fill="#a855f7" font-size="13" font-weight="bold">CHIZMA: SIM-KARTALI 4G/5G CPE ROUTER ISHLASH VA ULANISH SXEMASI</text>
      <!-- Cell Tower -->
      <rect x="25" y="55" width="130" height="125" rx="8" fill="#0f172a" stroke="#a855f7" stroke-width="2"/>
      <text x="38" y="82" fill="#c084fc" font-size="11" font-weight="bold">🗼 4G/5G Baza Stansiya</text>
      <text x="38" y="102" fill="#cbd5e1" font-size="9">eNodeB / gNodeB</text>
      <text x="38" y="120" fill="#94a3b8" font-size="9">Chastota: 800/1800/2600</text>
      <text x="38" y="138" fill="#94a3b8" font-size="9">yoki 3.5 GHz (5G NR)</text>
      <!-- Radio waves -->
      <path d="M165 110 Q 195 85, 225 110" fill="none" stroke="#c084fc" stroke-width="2.5" stroke-dasharray="4 3"/>
      <path d="M165 125 Q 195 150, 225 125" fill="none" stroke="#c084fc" stroke-width="2.5" stroke-dasharray="4 3"/>
      <text x="165" y="85" fill="#e9d5ff" font-size="9">MIMO Radio Signal</text>
      <!-- 4G/5G SIM Router -->
      <rect x="235" y="55" width="200" height="125" rx="10" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
      <text x="250" y="80" fill="#38bdf8" font-size="11" font-weight="bold">📶 4G/5G SIM WI-FI ROUTER</text>
      <rect x="250" y="90" width="75" height="24" rx="4" fill="#f59e0b"/>
      <text x="258" y="106" fill="#0f172a" font-size="9" font-weight="bold">💳 NANO SIM</text>
      <text x="250" y="132" fill="#cbd5e1" font-size="9">APN: internet | NAT/DHCP</text>
      <text x="250" y="150" fill="#34d399" font-size="9">Portlar: 4x RJ-45 LAN + Wi-Fi</text>
      <text x="250" y="166" fill="#94a3b8" font-size="8">2x SMA Tashqi 4G/5G Antenna</text>
      <!-- Output connections -->
      <line x1="435" y1="90" x2="505" y2="75" stroke="#10b981" stroke-width="2"/>
      <rect x="505" y="48" width="155" height="55" rx="7" fill="#0f172a" stroke="#10b981"/>
      <text x="515" y="70" fill="#34d399" font-size="10" font-weight="bold">💻 Wi-Fi &amp; Ofis LAN</text>
      <text x="515" y="87" fill="#94a3b8" font-size="9">Kompyuter, Kassalar, POS</text>

      <line x1="435" y1="145" x2="505" y2="155" stroke="#38bdf8" stroke-width="2"/>
      <rect x="505" y="125" width="155" height="55" rx="7" fill="#0f172a" stroke="#38bdf8"/>
      <text x="515" y="147" fill="#38bdf8" font-size="10" font-weight="bold">📹 NVR va IP Kameralar</text>
      <text x="515" y="164" fill="#94a3b8" font-size="9">P2P Cloud / Masofaviy ko'rish</text>
    </svg>`
  },
  {
    id: "ip-cameras-nvr-cctv",
    title: "Barcha Modelli IP va Wi-Fi Kameralar hamda NVR / XVR Videoregistratorlar",
    category: "Video Kuzatuv (CCTV / IP Surveillance)",
    osiLayer: "L1-L7 (Fizik PoE uzatishdan tortib L7 RTSP/ONVIF/HTTP ilova qatlamigacha)",
    networkType: "LAN / CCTV VLAN / Cloud P2P",
    protocols: "RTSP, ONVIF (Profile S/G/T), H.265+/H.264, TCP/IP, UDP, HTTP/HTTPS, NTP, DHCP, IEEE 802.3af/at (PoE)",
    media: "UTP Cat5e/Cat6 (RJ-45 PoE — ham quvvat 48V, ham video bir kabelda) yoki Wi-Fi (2.4/5GHz)",
    connectsTo: "PoE Switch yoki NVR ning o'z PoE portlari, Monitor/TV (HDMI/VGA orqali), Router (Internetga chiqish uchun)",
    portsDetail: "IP Kamera: RJ-45 (PoE 48V) + 12V DC Jack + MicroSD slot. NVR: 8/16/32x PoE RJ-45, 1x LAN Uplink, HDMI (4K), VGA, 2-8x SATA HDD, USB, Audio In/Out, Alarm I/O",
    summary: "IP kameralar (Dome — gumbazli ichki, Bullet — silindrsimon tashqi, PTZ — 360° aylanuvchi, ANPR — avtoraqam aniqlovchi, Thermal — issiqlik kamerasi, Wi-Fi PT kameralar) tasvirni raqamli H.265+ kodekda siqib, RTSP/ONVIF protokoli orqali NVR (Network Video Recorder) ga uzatadi. NVR ichiga maxsus 24/7 ishlaydigan Surveillance SATA HDD (masalan, WD Purple / Seagate SkyHawk) o'rnatiladi.",
    svgDiagram: `<svg viewBox="0 0 680 230" xmlns="http://www.w3.org/2000/svg">
      <rect width="680" height="230" rx="12" fill="#071022"/>
      <text x="20" y="25" fill="#10b981" font-size="13" font-weight="bold">CHIZMA: IP KAMERALAR + PoE SWITCH + NVR + HDD + MONITOR ULANISHI</text>
      <!-- Cameras -->
      <rect x="20" y="45" width="135" height="48" rx="6" fill="#0f172a" stroke="#38bdf8"/>
      <text x="30" y="66" fill="#38bdf8" font-size="10" font-weight="bold">📹 Bullet/Dome IP</text>
      <text x="30" y="81" fill="#94a3b8" font-size="8">PoE 802.3af (48V) | H.265+</text>

      <rect x="20" y="105" width="135" height="48" rx="6" fill="#0f172a" stroke="#38bdf8"/>
      <text x="30" y="126" fill="#38bdf8" font-size="10" font-weight="bold">🔭 PTZ 360° Kamera</text>
      <text x="30" y="141" fill="#94a3b8" font-size="8">PoE+ 802.3at (30W) | ONVIF</text>

      <rect x="20" y="165" width="135" height="48" rx="6" fill="#0f172a" stroke="#10b981"/>
      <text x="30" y="186" fill="#34d399" font-size="10" font-weight="bold">📡 Wi-Fi Kamera</text>
      <text x="30" y="201" fill="#94a3b8" font-size="8">2.4GHz + 12V DC + MicroSD</text>

      <!-- PoE Switch -->
      <line x1="155" y1="69" x2="220" y2="95" stroke="#38bdf8" stroke-width="2"/>
      <line x1="155" y1="129" x2="220" y2="115" stroke="#38bdf8" stroke-width="2"/>
      <rect x="220" y="75" width="145" height="75" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
      <text x="232" y="100" fill="#38bdf8" font-size="11" font-weight="bold">🔌 PoE SWITCH (L2)</text>
      <text x="232" y="118" fill="#cbd5e1" font-size="9">1 kabelda: Video + 48V</text>
      <text x="232" y="134" fill="#fbbf24" font-size="8">Cat6 UTP (100m-250m Extend)</text>

      <!-- NVR -->
      <line x1="365" y1="112" x2="430" y2="112" stroke="#10b981" stroke-width="3"/>
      <rect x="430" y="55" width="230" height="150" rx="10" fill="#1e293b" stroke="#10b981" stroke-width="2.5"/>
      <text x="445" y="80" fill="#34d399" font-size="12" font-weight="bold">🖴 NVR VIDEOREGISTRATOR</text>
      <text x="445" y="98" fill="#e2e8f0" font-size="9">• LAN Port: RTSP oqimlarni yozib oladi</text>
      <text x="445" y="115" fill="#fbbf24" font-size="9">• Ichki SATA: 2x/4x Surveillance HDD (10TB)</text>
      <text x="445" y="132" fill="#38bdf8" font-size="9">• HDMI 4K / VGA -&gt; Monitor / TV</text>
      <text x="445" y="149" fill="#cbd5e1" font-size="9">• USB Port -&gt; Sichqoncha va Fleshka (Arxiv)</text>
      <text x="445" y="166" fill="#c084fc" font-size="9">• Router orqali -&gt; Telefondan 24/7 ko'rish</text>
    </svg>`
  },
  {
    id: "sfp-modules-fiber-lan-cables",
    title: "Barcha SFP / SFP+ / QSFP Modullar, Optik Tolalar va LAN (Cat5e/6/6a/7/8) Kabellar",
    category: "Kabel Tizimlari va Optik Transiverlar",
    osiLayer: "L1 (Physical Layer — Fizik muhit va optik/elektr signal konvertatsiyasi)",
    networkType: "LAN / MAN / WAN / Data Center Interconnect",
    protocols: "1000BASE-SX/LX/ZX, 10GBASE-SR/LR/ER/ZR, BiDi WDM (1310nm/1550nm), 1000BASE-T, 10GBASE-T",
    media: "Single-Mode (OS2, sariq, 9/125 µm, 2km–120km), Multi-Mode (OM3/OM4, feruza, 50/125 µm, 300m–550m), UTP/FTP/S-FTP mis kabel",
    connectsTo: "Switchlarning SFP/SFP+ slotlari, Routerlar, Media Converterlar, OLT/ONT va Server tarmoq kartalari (NIC)",
    portsDetail: "LC Duplex, SC Simplex (BiDi WDM), RJ-45 (SFP-Copper moduli), MPO/MTP (40G/100G QSFP28 uchun)",
    summary: "SFP (Small Form-factor Pluggable — 1 Gbps), SFP+ (10 Gbps), SFP28 (25 Gbps) va QSFP28 (100 Gbps) — bu switch va routerlarga o'rnatiladigan issiq almashtiriluvchi (hot-swappable) transiver modullardir. LAN kabellar T568B standarti bo'yicha 8 ta rangli simdan (Oq-apelsin, Apelsin, Oq-yashil, Ko'k, Oq-ko'k, Yashil, Oq-jigarrang, Jigarrang) RJ-45 konnektoriga qisiladi.",
    svgDiagram: `<svg viewBox="0 0 680 225" xmlns="http://www.w3.org/2000/svg">
      <rect width="680" height="225" rx="12" fill="#071022"/>
      <text x="20" y="25" fill="#fbbf24" font-size="13" font-weight="bold">CHIZMA: SFP/SFP+ MODULLAR VA RJ-45 (T568B) LAN KABEL STANDARTLARI</text>
      <!-- SFP Module diagram -->
      <rect x="20" y="45" width="305" height="160" rx="8" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
      <text x="35" y="68" fill="#38bdf8" font-size="11" font-weight="bold">1. OPTIK SFP / SFP+ TRANSIVER MODULI</text>
      <rect x="35" y="82" width="135" height="42" rx="4" fill="#334155" stroke="#fbbf24" stroke-width="2"/>
      <text x="45" y="102" fill="#fde68a" font-size="10" font-weight="bold">SFP+ 10G LR</text>
      <text x="45" y="116" fill="#cbd5e1" font-size="8">1310nm | 10km | LC</text>
      <line x1="170" y1="95" x2="295" y2="95" stroke="#fbbf24" stroke-width="3"/>
      <line x1="170" y1="110" x2="295" y2="110" stroke="#fbbf24" stroke-width="3"/>
      <text x="180" y="88" fill="#fbbf24" font-size="8">TX / RX Single-Mode OS2</text>
      <text x="35" y="148" fill="#cbd5e1" font-size="9">• Multi-Mode (850nm): 300-550m (LC)</text>
      <text x="35" y="166" fill="#cbd5e1" font-size="9">• Single-Mode (1310/1550nm): 2km - 120km</text>
      <text x="35" y="184" fill="#34d399" font-size="9">• BiDi WDM SFP: 1 ta tola orqali TX/RX!</text>

      <!-- T568B LAN Pinout -->
      <rect x="345" y="45" width="315" height="160" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="1.5"/>
      <text x="360" y="68" fill="#34d399" font-size="11" font-weight="bold">2. LAN KABEL (Cat5e/Cat6/Cat7/Cat8) T568B</text>
      <text x="360" y="88" fill="#e2e8f0" font-size="9">1. Oq-Apelsin (TX+)   | 5. Oq-Ko'k</text>
      <text x="360" y="105" fill="#fb923c" font-size="9">2. Apelsin (TX-)      | 6. Yashil (RX-)</text>
      <text x="360" y="122" fill="#86efac" font-size="9">3. Oq-Yashil (RX+)    | 7. Oq-Jigarrang</text>
      <text x="360" y="139" fill="#60a5fa" font-size="9">4. Ko'k               | 8. Jigarrang</text>
      <text x="360" y="162" fill="#fde68a" font-size="9">• Cat5e: 1 Gbps (100m) | Cat6: 1-10 Gbps</text>
      <text x="360" y="180" fill="#38bdf8" font-size="9">• Cat6a: 10 Gbps (100m) | Cat8: 25/40 Gbps</text>
    </svg>`
  },
  {
    id: "computers-os-office-ports",
    title: "Kompyuterlar: Operatsion Tizim (OS), Ofis Dasturlari va Har Bir Portning Vazifasi",
    category: "Kompyuter Arxitekturasi va Portlar",
    osiLayer: "L1–L7 (To'liq 7 pog'onali OSI modeli yakuniy tuguni — End Host)",
    networkType: "Workstation / Client / Host",
    protocols: "TCP/IP, HTTP/HTTPS, SMB, RDP, SSH, DHCP, DNS, USB 3.2/4.0, PCIe 4.0/5.0, SATA III, NVMe",
    media: "RJ-45 Ethernet, Wi-Fi adapter, HDMI/DisplayPort video, USB periferiya",
    connectsTo: "L2 Switch / Wi-Fi Router, Monitor, Printer, Proyektor, Tashqi SSD, Klaviatura/Sichqoncha, Audio garnitura",
    portsDetail: "RJ-45 (LAN tarmoq), HDMI 2.1 & DisplayPort (Monitor/Proyektor), USB-A 3.2 & USB-C / Thunderbolt 4 (Fleshka, Dok-stansiya, Quvvat), 3.5mm Audio, M.2 NVMe & SATA III (Ichki SSD/HDD)",
    summary: "Kompyuterga Operatsion Tizim (Windows 10/11 Pro, Linux Ubuntu/Debian/Fedora, macOS) BIOS/UEFI orqali Bootable USB fleshkadan (GPT/UEFI rejimda) o'rnatiladi. So'ngra chipset/video drayverlar va Ofis dasturlari (Microsoft Office: Word, Excel, PowerPoint, Access yoki LibreOffice, brauzerlar, antivirus va IDElar) o'rnatiladi.",
    svgDiagram: `<svg viewBox="0 0 680 230" xmlns="http://www.w3.org/2000/svg">
      <rect width="680" height="230" rx="12" fill="#071022"/>
      <text x="20" y="25" fill="#38bdf8" font-size="13" font-weight="bold">CHIZMA: KOMPYUTER PORTLARI, QURILMALARGA ULANISHI VA OS O'RNATISH</text>
      <!-- Motherboard I/O Panel -->
      <rect x="20" y="42" width="640" height="170" rx="10" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
      <!-- Port boxes -->
      <rect x="35" y="58" width="140" height="65" rx="6" fill="#1e293b" stroke="#10b981"/>
      <text x="45" y="78" fill="#34d399" font-size="10" font-weight="bold">🖧 RJ-45 (LAN Port)</text>
      <text x="45" y="94" fill="#cbd5e1" font-size="8">Vazifasi: Tarmoq va Internet</text>
      <text x="45" y="108" fill="#94a3b8" font-size="8">Ulanadi: Switch/Router (Cat6)</text>

      <rect x="190" y="58" width="145" height="65" rx="6" fill="#1e293b" stroke="#f59e0b"/>
      <text x="200" y="78" fill="#fbbf24" font-size="10" font-weight="bold">🖥️ HDMI / DisplayPort</text>
      <text x="200" y="94" fill="#cbd5e1" font-size="8">Vazifasi: 4K/8K Video+Audio</text>
      <text x="200" y="108" fill="#94a3b8" font-size="8">Ulanadi: Monitor, TV, Proyektor</text>

      <rect x="350" y="58" width="145" height="65" rx="6" fill="#1e293b" stroke="#38bdf8"/>
      <text x="360" y="78" fill="#38bdf8" font-size="10" font-weight="bold">⚡ USB-A / USB-C (TB4)</text>
      <text x="360" y="94" fill="#cbd5e1" font-size="8">Vazifasi: 10-40Gbps Ma'lumot</text>
      <text x="360" y="108" fill="#94a3b8" font-size="8">Ulanadi: Fleshka, Printer, SSD</text>

      <rect x="510" y="58" width="135" height="65" rx="6" fill="#1e293b" stroke="#c084fc"/>
      <text x="520" y="78" fill="#c084fc" font-size="10" font-weight="bold">🎧 Audio &amp; PCIe/NVMe</text>
      <text x="520" y="94" fill="#cbd5e1" font-size="8">3.5mm: Karnay/Mikrofon</text>
      <text x="520" y="108" fill="#94a3b8" font-size="8">M.2 NVMe: Tezkor SSD disk</text>

      <!-- OS & Office Workflow -->
      <rect x="35" y="138" width="610" height="58" rx="6" fill="#172554" stroke="#60a5fa"/>
      <text x="48" y="159" fill="#93c5fd" font-size="10" font-weight="bold">💿 SISTEMA VA OFIS O'RNATISH KETMA-KETLIGI:</text>
      <text x="48" y="178" fill="#e2e8f0" font-size="9">1) Rufus/Ventoy USB -&gt; 2) BIOS/UEFI Boot (GPT) -&gt; 3) Windows 11 / Ubuntu Linux -&gt; 4) Driverlar -&gt; 5) MS Office (Word, Excel, PowerPoint)</text>
    </svg>`
  },
  {
    id: "ip-telephony-servers-osi",
    title: "Barcha IP Telefoniyalar (VoIP/SIP) va Serverlar (Web, DB, DNS, Virtualizatsiya) + OSI 7 Pog'onasi",
    category: "IP Telefoniya va Server Infratuzilmasi",
    osiLayer: "OSI Modelining barcha 7 pog'onasi (L1 Fizik -> L7 Ilova)",
    networkType: "Enterprise Data Center / VoIP Network / Cloud",
    protocols: "SIP (UDP/TCP 5060/5061), RTP/RTCP, G.711/G.729, HTTP/HTTPS (80/443), SSH (22), DNS (53), DHCP (67/68), SQL",
    media: "10G/25G/100G SFP+/QSFP28 Optik tolalar va Cat6/Cat6a RJ-45 (PoE IP telefonlar uchun)",
    connectsTo: "Core/Access Switchlar, IP-PBX (Asterisk/3CX/CUCM), FXO/FXS Shlyuzlar, kompyuterlar (PC port pass-through)",
    portsDetail: "IP Telefon: 2x RJ-45 (1x LAN PoE in, 1x PC out), RJ-9 (Go'shak). Server: 2-4x 10G/25G SFP+, 1x iDRAC/iLO/IPMI Management RJ-45, RAID SAS/NVMe",
    summary: "IP Telefoniya ovozni raqamlashtirib, SIP protokoli orqali chaqiruvni o'rnatadi va RTP protokoli orqali ovoz oqimini real vaqtda uzatadi. IP telefon orqasidagi 2 ta RJ-45 port bitta kabel orqali ham telefonni (Voice VLAN), ham xodim kompyuterini (Data VLAN) ulash imkonini beradi. Serverlar esa 24/7 rejimda Web, Ma'lumotlar bazasi (PostgreSQL/MySQL), Active Directory, DNS/DHCP va Virtualizatsiya (VMware ESXi, Proxmox) xizmatlarini bajaradi.",
    svgDiagram: `<svg viewBox="0 0 680 230" xmlns="http://www.w3.org/2000/svg">
      <rect width="680" height="230" rx="12" fill="#071022"/>
      <text x="20" y="25" fill="#fbbf24" font-size="13" font-weight="bold">CHIZMA: OSI 7 POG'ONASI + IP TELEFONIYA VA SERVERLAR ARXITEKTURASI</text>
      <!-- OSI 7 Layers Column -->
      <rect x="20" y="40" width="245" height="175" rx="8" fill="#0f172a" stroke="#f59e0b"/>
      <text x="32" y="60" fill="#fbbf24" font-size="10" font-weight="bold">OSI MODELI 7 POG'ONASI:</text>
      <text x="32" y="78" fill="#34d399" font-size="9">L7 Application: HTTP, DNS, SIP, RTSP</text>
      <text x="32" y="95" fill="#34d399" font-size="9">L6 Presentation: TLS/SSL, H.265, G.711</text>
      <text x="32" y="112" fill="#34d399" font-size="9">L5 Session: NetBIOS, SIP Session, RPC</text>
      <text x="32" y="129" fill="#38bdf8" font-size="9">L4 Transport: TCP (Segment), UDP (Port)</text>
      <text x="32" y="146" fill="#60a5fa" font-size="9">L3 Network: IP, ICMP, OSPF (Router/L3)</text>
      <text x="32" y="163" fill="#c084fc" font-size="9">L2 Data Link: MAC, VLAN, STP (L2 Switch)</text>
      <text x="32" y="180" fill="#f87171" font-size="9">L1 Physical: Kabel, SFP, Hub, Bitlar</text>
      <text x="32" y="200" fill="#fde68a" font-size="8">Tarmoq turlari: PAN, LAN, WLAN, MAN, WAN</text>

      <!-- IP Phone + PC Daisy Chain & Server -->
      <rect x="285" y="40" width="375" height="82" rx="8" fill="#1e293b" stroke="#38bdf8"/>
      <text x="300" y="62" fill="#38bdf8" font-size="10" font-weight="bold">☎️ IP TELEFON ULanishi (1 ta kabelda Telefon + PC):</text>
      <text x="300" y="82" fill="#e2e8f0" font-size="9">[PoE Switch] ===(Cat6 Trunk: Voice VLAN + Data VLAN)===&gt; [IP Telefon LAN]</text>
      <text x="300" y="102" fill="#34d399" font-size="9">[IP Telefon PC Porti] ===(Patch-kord)===&gt; [Kompyuter RJ-45] + [SIP PBX Server]</text>

      <rect x="285" y="133" width="375" height="82" rx="8" fill="#1e293b" stroke="#10b981"/>
      <text x="300" y="155" fill="#34d399" font-size="10" font-weight="bold">🖥️ RACK / BLADE SERVERLAR (24/7 Data Center):</text>
      <text x="300" y="175" fill="#e2e8f0" font-size="9">• 2x Xeon/EPYC CPU | ECC RAM | RAID 10 NVMe | 2x Redundant PSU</text>
      <text x="300" y="193" fill="#fbbf24" font-size="9">• Portlar: 2x 10G/25G SFP+ (LACP Bonding) + 1x IPMI/iLO/iDRAC</text>
    </svg>`
  }
];
