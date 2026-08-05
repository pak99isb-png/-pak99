const UMRAH_PACKAGES = [
  // =============================================
  // FAISALABAD PACKAGES (LYP-JED, flydubai)
  // =============================================
  {
    id: "PKG-236",
    city: "Faisalabad",
    tier: "Economy",
    departureDate: "09 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LYP - JED (FZ 807 / FZ 808)",
    airline: "flydubai",
    hotels: {
      makkah: "RAWAFED AL ASMIAH SHUTTLE HOTEL MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "255,999", quad: "260,999", triple: "268,999", double: "283,999" },
    seatsAvailable: 20
  },
  {
    id: "PKG-235",
    city: "Faisalabad",
    tier: "Star",
    departureDate: "09 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LYP - JED (FZ 807 / FZ 808)",
    airline: "flydubai",
    hotels: {
      makkah: "AL MASAR AJYAD MAKKAH",
      madinah: "DIYAR SAFA MADINA"
    },
    pricing: { sharing: "274,999", quad: "284,999", triple: "300,999", double: "332,999" },
    seatsAvailable: 19
  },
  {
    id: "PKG-240",
    city: "Faisalabad",
    tier: "Star",
    departureDate: "22 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LYP - JED (FZ 807 / FZ 808)",
    airline: "flydubai",
    hotels: {
      makkah: "AL MASAR AJYAD MAKKAH",
      madinah: "DIYAR SAFA MADINA"
    },
    pricing: { sharing: "274,999", quad: "284,999", triple: "299,999", double: "332,999" },
    seatsAvailable: 20
  },
  {
    id: "PKG-241",
    city: "Faisalabad",
    tier: "Economy",
    departureDate: "25 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LYP - JED (FZ 807 / FZ 808)",
    airline: "flydubai",
    hotels: {
      makkah: "RAWAFED AL ASMIAH SHUTTLE HOTEL MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "255,999", quad: "260,999", triple: "268,999", double: "283,999" },
    seatsAvailable: 20
  },
  {
    id: "PKG-242",
    city: "Faisalabad",
    tier: "Star",
    departureDate: "25 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LYP - JED (FZ 807 / FZ 808)",
    airline: "flydubai",
    hotels: {
      makkah: "EMAAR AL KHAIR GOLDEN HOTEL MAKKAH",
      madinah: "NOZOL FALAH AWALI HOTEL MADINA"
    },
    pricing: { sharing: "282,999", quad: "293,999", triple: "312,999", double: "351,999" },
    seatsAvailable: 20
  },
  // =============================================
  // MULTAN PACKAGES (MUX-JED, flydubai)
  // =============================================
  {
    id: "PKG-207",
    city: "Multan",
    tier: "Economy",
    departureDate: "15 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "MUX - JED (SV 801 / SV 800)",
    airline: "Saudia",
    hotels: {
      makkah: "RAWAFED AL ASMIAH SHUTTLE HOTEL MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "273,999", quad: "275,999", triple: "288,999", double: "306,999" },
    seatsAvailable: 15
  },
  {
    id: "PKG-208",
    city: "Multan",
    tier: "Economy",
    departureDate: "25 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "MUX - JED (SV 801 / SV 800)",
    airline: "Saudia",
    hotels: {
      makkah: "RAWAFED AL ASMIAH SHUTTLE HOTEL MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "273,999", quad: "275,999", triple: "288,999", double: "306,999" },
    seatsAvailable: 10
  },
  // =============================================
  // ISLAMABAD PACKAGES (ISB-JED, Saudia / PIA)
  // =============================================
  {
    id: "PKG-247",
    city: "Islamabad",
    tier: "Economy",
    departureDate: "09 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "ISB - JED (SV 727 / SV 722)",
    airline: "Saudia",
    hotels: {
      makkah: "RAWAFED AL ASMIAH SHUTTLE HOTEL MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "273,999", quad: "279,999", triple: "288,999", double: "306,999" },
    seatsAvailable: 49
  },
  {
    id: "PKG-303",
    city: "Islamabad",
    tier: "Economy",
    departureDate: "13 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "ISB - JED (PK 841 / PK 742)",
    airline: "PIA",
    hotels: {
      makkah: "ANWAR AL RAYAN MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "280,999", quad: "288,999", triple: "301,999", double: "328,999" },
    seatsAvailable: 30
  },
  {
    id: "PKG-249",
    city: "Islamabad",
    tier: "Star",
    departureDate: "16 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "ISB - JED (SV 727 / SV 726)",
    airline: "Saudia",
    hotels: {
      makkah: "AL JUHANI AJYAD MAKKAH / SHABAB DELMA 2",
      madinah: "NOZOL FALAH AWALI HOTEL MADINA"
    },
    pricing: { sharing: "308,999", quad: "322,999", triple: "346,999", double: "393,999" },
    seatsAvailable: 20
  },
  {
    id: "PKG-245",
    city: "Islamabad",
    tier: "Star",
    departureDate: "08 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "ISB - JED (SV 727 / SV 722)",
    airline: "Saudia",
    hotels: {
      makkah: "AL MASAR AJYAD MAKKAH",
      madinah: "DIYAR SAFA MADINA"
    },
    pricing: { sharing: "293,999", quad: "304,999", triple: "322,999", double: "357,999" },
    seatsAvailable: 48
  },
  {
    id: "PKG-246",
    city: "Islamabad",
    tier: "Star",
    departureDate: "08 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "ISB - JED (SV 727 / SV 722)",
    airline: "Saudia",
    hotels: {
      makkah: "EMAAR AL KHAIR GOLDEN HOTEL MAKKAH",
      madinah: "NOZOL FALAH AWALI HOTEL MADINA"
    },
    pricing: { sharing: "302,999", quad: "315,999", triple: "336,999", double: "378,999" },
    seatsAvailable: 50
  },
  // =============================================
  // LAHORE ECONOMY PACKAGES (LHE-JED)
  // =============================================
  {
    id: "PKG-199",
    city: "Lahore",
    tier: "Economy",
    departureDate: "07 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "AL MASAR AJYAD MAKKAH",
      madinah: "DIYAR SAFA MADINA"
    },
    pricing: { sharing: "293,999", quad: "304,999", triple: "322,999", double: "357,999" },
    seatsAvailable: 50
  },
  {
    id: "PKG-308",
    city: "Lahore",
    tier: "Economy",
    departureDate: "07 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "AL MASAR AJYAD MAKKAH",
      madinah: "DIYAR SAFA MADINA"
    },
    pricing: { sharing: "297,999", quad: "308,999", triple: "326,999", double: "361,999" },
    seatsAvailable: 46
  },
  {
    id: "PKG-210",
    city: "Lahore",
    tier: "Economy",
    departureDate: "08 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 735 / SV 738)",
    airline: "Saudia",
    hotels: {
      makkah: "AL JUHANI AJYAD MAKKAH / SHABAB DELMA 2",
      madinah: "NOZOL FALAH AWALI HOTEL MADINA"
    },
    pricing: { sharing: "301,999", quad: "313,999", triple: "334,999", double: "376,999" },
    seatsAvailable: 30
  },
  {
    id: "PKG-223",
    city: "Lahore",
    tier: "Economy",
    departureDate: "08 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (9P 586 / 9P 587)",
    airline: "Airblue",
    hotels: {
      makkah: "RAWAFED AL ASMIAH SHUTTLE HOTEL MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "265,999", quad: "271,999", triple: "280,999", double: "298,999" },
    seatsAvailable: 28
  },
  {
    id: "PKG-227",
    city: "Lahore",
    tier: "Economy",
    departureDate: "08 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (9P 586 / 9P 587)",
    airline: "Airblue",
    hotels: {
      makkah: "AL JUHANI AJYAD MAKKAH / SHABAB DELMA 2",
      madinah: "ALKERAM ALJADID / ALKRAM ALFIDI"
    },
    pricing: { sharing: "300,999", quad: "314,999", triple: "338,999", double: "385,999" },
    seatsAvailable: 40
  },
  {
    id: "PKG-211",
    city: "Lahore",
    tier: "Economy",
    departureDate: "09 Aug 2026",
    durationText: "21 Nights (Makkah: 13 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 735 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "AL MASAR AJYAD MAKKAH",
      madinah: "DIYAR SAFA MADINA"
    },
    pricing: { sharing: "296,999", quad: "307,999", triple: "326,999", double: "363,999" },
    seatsAvailable: 30
  },
  {
    id: "PKG-309",
    city: "Lahore",
    tier: "Economy",
    departureDate: "09 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "AL JUHANI AJYAD MAKKAH / SHABAB DELMA 2",
      madinah: "NOZOL FALAH AWALI HOTEL MADINA"
    },
    pricing: { sharing: "305,999", quad: "317,999", triple: "338,999", double: "380,999" },
    seatsAvailable: 42
  },
  {
    id: "PKG-201",
    city: "Lahore",
    tier: "Economy",
    departureDate: "09 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "EMAAR AL KHAIR GOLDEN HOTEL MAKKAH",
      madinah: "NOZOL FALAH AWALI HOTEL MADINA"
    },
    pricing: { sharing: "302,999", quad: "315,999", triple: "336,999", double: "378,999" },
    seatsAvailable: 30
  },
  {
    id: "PKG-213",
    city: "Lahore",
    tier: "Economy",
    departureDate: "10 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 735 / SV 738)",
    airline: "Saudia",
    hotels: {
      makkah: "ANWAR AL RAYAN MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "282,999", quad: "290,999", triple: "303,999", double: "330,999" },
    seatsAvailable: 21
  },
  {
    id: "PKG-224",
    city: "Lahore",
    tier: "Economy",
    departureDate: "11 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (9P 586 / 9P 587)",
    airline: "Airblue",
    hotels: {
      makkah: "RAWAFED AL ASMIAH SHUTTLE HOTEL MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "265,999", quad: "271,999", triple: "280,999", double: "298,999" },
    seatsAvailable: 20
  },
  {
    id: "PKG-202",
    city: "Lahore",
    tier: "Economy",
    departureDate: "11 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "EMAAR AL KHAIR GOLDEN HOTEL MAKKAH",
      madinah: "NOZOL FALAH AWALI HOTEL MADINA"
    },
    pricing: { sharing: "302,999", quad: "315,999", triple: "336,999", double: "378,999" },
    seatsAvailable: 50
  },
  {
    id: "PKG-214",
    city: "Lahore",
    tier: "Economy",
    departureDate: "11 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 735 / SV 738)",
    airline: "Saudia",
    hotels: {
      makkah: "AL JUHANI AJYAD MAKKAH / SHABAB DELMA 2",
      madinah: "ALKERAM ALJADID / ALKRAM ALFIDI"
    },
    pricing: { sharing: "308,999", quad: "322,999", triple: "346,999", double: "393,999" },
    seatsAvailable: 30
  },
  {
    id: "PKG-203",
    city: "Lahore",
    tier: "Economy",
    departureDate: "12 Aug 2026",
    durationText: "15 Nights (Makkah: 9 Nights | Madinah: 6 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "AL MASAR AJYAD MAKKAH",
      madinah: "DIYAR SAFA MADINA"
    },
    pricing: { sharing: "281,999", quad: "288,999", triple: "301,999", double: "325,999" },
    seatsAvailable: 46
  },
  {
    id: "PKG-216",
    city: "Lahore",
    tier: "Economy",
    departureDate: "12 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 735 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "RAWAFED AL ASMIAH SHUTTLE HOTEL MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "273,999", quad: "279,999", triple: "288,999", double: "306,999" },
    seatsAvailable: 24
  },
  {
    id: "PKG-310",
    city: "Lahore",
    tier: "Economy",
    departureDate: "12 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 735 / SV 738)",
    airline: "Saudia",
    hotels: {
      makkah: "AL JUHANI AJYAD MAKKAH / SHABAB DELMA 2",
      madinah: "NOZOL FALAH AWALI HOTEL MADINA"
    },
    pricing: { sharing: "305,999", quad: "317,999", triple: "338,999", double: "380,999" },
    seatsAvailable: 45
  },
  {
    id: "PKG-322",
    city: "Lahore",
    tier: "Economy",
    departureDate: "13 Aug 2026",
    durationText: "14 Nights (Makkah: 8 Nights | Madinah: 6 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "AL JUHANI AJYAD MAKKAH / SHABAB DELMA 2",
      madinah: "ALKERAM ALJADID / ALKRAM ALFIDI"
    },
    pricing: { sharing: "291,999", quad: "301,999", triple: "318,999", double: "351,999" },
    seatsAvailable: 25
  },
  {
    id: "PKG-217",
    city: "Lahore",
    tier: "Economy",
    departureDate: "13 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 735 / SV 738)",
    airline: "Saudia",
    hotels: {
      makkah: "ANWAR AL RAYAN MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "282,999", quad: "290,999", triple: "303,999", double: "330,999" },
    seatsAvailable: 19
  },
  {
    id: "PKG-311",
    city: "Lahore",
    tier: "Economy",
    departureDate: "14 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "RAWAFED AL ASMIAH SHUTTLE HOTEL MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "277,999", quad: "283,999", triple: "292,999", double: "310,999" },
    seatsAvailable: 45
  },
  {
    id: "PKG-218",
    city: "Lahore",
    tier: "Economy",
    departureDate: "14 Aug 2026",
    durationText: "15 Nights (Makkah: 9 Nights | Madinah: 6 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "AL JUHANI AJYAD MAKKAH / SHABAB DELMA 2",
      madinah: "ALKERAM ALJADID / ALKRAM ALFIDI"
    },
    pricing: { sharing: "291,999", quad: "301,999", triple: "318,999", double: "351,999" },
    seatsAvailable: 26
  },
  {
    id: "PKG-225",
    city: "Lahore",
    tier: "Economy",
    departureDate: "14 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (9P 586 / 9P 587)",
    airline: "Airblue",
    hotels: {
      makkah: "RAWAFED AL ASMIAH SHUTTLE HOTEL MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "265,999", quad: "271,999", triple: "280,999", double: "298,999" },
    seatsAvailable: 20
  },
  {
    id: "PKG-220",
    city: "Lahore",
    tier: "Economy",
    departureDate: "15 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 735 / SV 738)",
    airline: "Saudia",
    hotels: {
      makkah: "EMAAR AL KHAIR GOLDEN HOTEL MAKKAH",
      madinah: "NOZOL FALAH AWALI HOTEL MADINA"
    },
    pricing: { sharing: "302,999", quad: "315,999", triple: "336,999", double: "378,999" },
    seatsAvailable: 25
  },
  {
    id: "PKG-228",
    city: "Lahore",
    tier: "Economy",
    departureDate: "15 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (9P 586 / 9P 587)",
    airline: "Airblue",
    hotels: {
      makkah: "AL MASAR AJYAD MAKKAH",
      madinah: "DIYAR SAFA MADINA"
    },
    pricing: { sharing: "285,999", quad: "296,999", triple: "314,999", double: "349,999" },
    seatsAvailable: 40
  },
  {
    id: "PKG-312",
    city: "Lahore",
    tier: "Economy",
    departureDate: "15 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 735 / SV 738)",
    airline: "Saudia",
    hotels: {
      makkah: "AL JUHANI AJYAD MAKKAH / SHABAB DELMA 2",
      madinah: "ALKERAM ALJADID / ALKRAM ALFIDI"
    },
    pricing: { sharing: "312,999", quad: "326,999", triple: "350,999", double: "397,999" },
    seatsAvailable: 45
  },
  {
    id: "PKG-271",
    city: "Lahore",
    tier: "Economy",
    departureDate: "16 Aug 2026",
    durationText: "21 Nights (Makkah: 13 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 735 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "AL JUHANI AJYAD MAKKAH / SHABAB DELMA 2",
      madinah: "NOZOL FALAH AWALI HOTEL MADINA"
    },
    pricing: { sharing: "303,999", quad: "317,999", triple: "338,999", double: "382,999" },
    seatsAvailable: 25
  },
  {
    id: "PKG-264",
    city: "Lahore",
    tier: "Economy",
    departureDate: "17 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (9P 586 / 9P 587)",
    airline: "Airblue",
    hotels: {
      makkah: "AL MASAR AJYAD MAKKAH",
      madinah: "DIYAR SAFA MADINA"
    },
    pricing: { sharing: "286,999", quad: "297,999", triple: "315,999", double: "350,999" },
    seatsAvailable: 17
  },
  {
    id: "PKG-273",
    city: "Lahore",
    tier: "Economy",
    departureDate: "17 Aug 2026",
    durationText: "21 Nights (Makkah: 13 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 735 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "AL JUHANI AJYAD MAKKAH / SHABAB DELMA 2",
      madinah: "ALKERAM ALJADID / ALKRAM ALFIDI"
    },
    pricing: { sharing: "310,999", quad: "325,999", triple: "350,999", double: "399,999" },
    seatsAvailable: 28
  },
  {
    id: "PKG-272",
    city: "Lahore",
    tier: "Economy",
    departureDate: "17 Aug 2026",
    durationText: "15 Nights (Makkah: 9 Nights | Madinah: 6 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "AL JUHANI AJYAD MAKKAH / SHABAB DELMA 2",
      madinah: "ALKERAM ALJADID / ALKRAM ALFIDI"
    },
    pricing: { sharing: "291,999", quad: "301,999", triple: "318,999", double: "351,999" },
    seatsAvailable: 30
  },
  {
    id: "PKG-274",
    city: "Lahore",
    tier: "Economy",
    departureDate: "18 Aug 2026",
    durationText: "15 Nights (Makkah: 9 Nights | Madinah: 6 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "AL JUHANI AJYAD MAKKAH / SHABAB DELMA 2",
      madinah: "ALKERAM ALJADID / ALKRAM ALFIDI"
    },
    pricing: { sharing: "291,999", quad: "301,999", triple: "318,999", double: "351,999" },
    seatsAvailable: 30
  },
  {
    id: "PKG-229",
    city: "Lahore",
    tier: "Economy",
    departureDate: "18 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (9P 586 / 9P 587)",
    airline: "Airblue",
    hotels: {
      makkah: "RAWAFED AL ASMIAH SHUTTLE HOTEL MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "265,999", quad: "271,999", triple: "280,999", double: "298,999" },
    seatsAvailable: 39
  },
  {
    id: "PKG-313",
    city: "Lahore",
    tier: "Economy",
    departureDate: "18 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 735 / SV 738)",
    airline: "Saudia",
    hotels: {
      makkah: "AL JUHANI AJYAD MAKKAH / SHABAB DELMA 2",
      madinah: "ALKERAM ALJADID / ALKRAM ALFIDI"
    },
    pricing: { sharing: "312,999", quad: "326,999", triple: "350,999", double: "397,999" },
    seatsAvailable: 45
  },
  {
    id: "PKG-291",
    city: "Lahore",
    tier: "Economy",
    departureDate: "18 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "ANWAR AL RAYAN MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "282,999", quad: "290,999", triple: "303,999", double: "330,999" },
    seatsAvailable: 50
  },
  {
    id: "PKG-275",
    city: "Lahore",
    tier: "Economy",
    departureDate: "19 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 735 / SV 738)",
    airline: "Saudia",
    hotels: {
      makkah: "AL MASAR AJYAD MAKKAH",
      madinah: "DIYAR SAFA MADINA"
    },
    pricing: { sharing: "293,999", quad: "304,999", triple: "322,999", double: "357,999" },
    seatsAvailable: 27
  },
  {
    id: "PKG-314",
    city: "Lahore",
    tier: "Economy",
    departureDate: "19 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 735 / SV 738)",
    airline: "Saudia",
    hotels: {
      makkah: "EMAAR AL KHAIR GOLDEN HOTEL MAKKAH",
      madinah: "NOZOL FALAH AWALI HOTEL MADINA"
    },
    pricing: { sharing: "306,999", quad: "319,999", triple: "340,999", double: "382,999" },
    seatsAvailable: 45
  },
  {
    id: "PKG-292",
    city: "Lahore",
    tier: "Economy",
    departureDate: "20 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 735 / SV 738)",
    airline: "Saudia",
    hotels: {
      makkah: "EMAAR AL KHAIR GOLDEN HOTEL MAKKAH",
      madinah: "NOZOL FALAH AWALI HOTEL MADINA"
    },
    pricing: { sharing: "302,999", quad: "315,999", triple: "336,999", double: "378,999" },
    seatsAvailable: 50
  },
  {
    id: "PKG-276",
    city: "Lahore",
    tier: "Economy",
    departureDate: "20 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 735 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "AL MASAR AJYAD MAKKAH",
      madinah: "DIYAR SAFA MADINA"
    },
    pricing: { sharing: "293,999", quad: "304,999", triple: "322,999", double: "357,999" },
    seatsAvailable: 25
  },
  {
    id: "PKG-230",
    city: "Lahore",
    tier: "Economy",
    departureDate: "20 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (9P 586 / 9P 587)",
    airline: "Airblue",
    hotels: {
      makkah: "EMAAR AL KHAIR GOLDEN HOTEL MAKKAH",
      madinah: "NOZOL FALAH AWALI HOTEL MADINA"
    },
    pricing: { sharing: "294,999", quad: "307,999", triple: "328,999", double: "370,999" },
    seatsAvailable: 40
  },
  {
    id: "PKG-265",
    city: "Lahore",
    tier: "Economy",
    departureDate: "20 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (9P 586 / 9P 587)",
    airline: "Airblue",
    hotels: {
      makkah: "ANWAR AL RAYAN MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "275,999", quad: "283,999", triple: "296,999", double: "323,999" },
    seatsAvailable: 40
  },
  {
    id: "PKG-315",
    city: "Lahore",
    tier: "Economy",
    departureDate: "21 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 735 / SV 738)",
    airline: "Saudia",
    hotels: {
      makkah: "RAWAFED AL ASMIAH SHUTTLE HOTEL MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "277,999", quad: "283,999", triple: "292,999", double: "310,999" },
    seatsAvailable: 45
  },
  {
    id: "PKG-293",
    city: "Lahore",
    tier: "Economy",
    departureDate: "21 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "RAWAFED AL ASMIAH SHUTTLE HOTEL MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "273,999", quad: "279,999", triple: "288,999", double: "306,999" },
    seatsAvailable: 50
  },
  {
    id: "PKG-277",
    city: "Lahore",
    tier: "Economy",
    departureDate: "21 Aug 2026",
    durationText: "15 Nights (Makkah: 9 Nights | Madinah: 6 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "AL JUHANI AJYAD MAKKAH / SHABAB DELMA 2",
      madinah: "ALKERAM ALJADID / ALKRAM ALFIDI"
    },
    pricing: { sharing: "291,999", quad: "301,999", triple: "318,999", double: "351,999" },
    seatsAvailable: 30
  },
  {
    id: "PKG-278",
    city: "Lahore",
    tier: "Economy",
    departureDate: "22 Aug 2026",
    durationText: "15 Nights (Makkah: 9 Nights | Madinah: 6 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "EMAAR AL KHAIR GOLDEN HOTEL MAKKAH",
      madinah: "NOZOL FALAH AWALI HOTEL MADINA"
    },
    pricing: { sharing: "287,999", quad: "295,999", triple: "310,999", double: "340,999" },
    seatsAvailable: 30
  },
  {
    id: "PKG-266",
    city: "Lahore",
    tier: "Economy",
    departureDate: "22 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (9P 586 / 9P 587)",
    airline: "Airblue",
    hotels: {
      makkah: "RAWAFED AL ASMIAH SHUTTLE HOTEL MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "266,999", quad: "272,999", triple: "281,999", double: "299,999" },
    seatsAvailable: 30
  },
  {
    id: "PKG-231",
    city: "Lahore",
    tier: "Economy",
    departureDate: "22 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (9P 586 / 9P 587)",
    airline: "Airblue",
    hotels: {
      makkah: "ANWAR AL RAYAN MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "274,999", quad: "282,999", triple: "295,999", double: "322,999" },
    seatsAvailable: 40
  },
  {
    id: "PKG-316",
    city: "Lahore",
    tier: "Economy",
    departureDate: "23 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "AL JUHANI AJYAD MAKKAH / SHABAB DELMA 2",
      madinah: "ALKERAM ALJADID / ALKRAM ALFIDI"
    },
    pricing: { sharing: "312,999", quad: "326,999", triple: "350,999", double: "397,999" },
    seatsAvailable: 45
  },
  {
    id: "PKG-279",
    city: "Lahore",
    tier: "Economy",
    departureDate: "23 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 735 / SV 738)",
    airline: "Saudia",
    hotels: {
      makkah: "ANWAR AL RAYAN MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "282,999", quad: "290,999", triple: "303,999", double: "330,999" },
    seatsAvailable: 30
  },
  {
    id: "PKG-294",
    city: "Lahore",
    tier: "Economy",
    departureDate: "23 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "AL MASAR AJYAD MAKKAH",
      madinah: "DIYAR SAFA MADINA"
    },
    pricing: { sharing: "293,999", quad: "304,999", triple: "322,999", double: "357,999" },
    seatsAvailable: 50
  },
  {
    id: "PKG-232",
    city: "Lahore",
    tier: "Economy",
    departureDate: "24 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (9P 586 / 9P 587)",
    airline: "Airblue",
    hotels: {
      makkah: "AL MASAR AJYAD MAKKAH",
      madinah: "DIYAR SAFA MADINA"
    },
    pricing: { sharing: "285,999", quad: "296,999", triple: "314,999", double: "349,999" },
    seatsAvailable: 40
  },
  {
    id: "PKG-267",
    city: "Lahore",
    tier: "Economy",
    departureDate: "24 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (9P 586 / 9P 587)",
    airline: "Airblue",
    hotels: {
      makkah: "RAWAFED AL ASMIAH SHUTTLE HOTEL MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "266,999", quad: "272,999", triple: "281,999", double: "299,999" },
    seatsAvailable: 40
  },
  {
    id: "PKG-281",
    city: "Lahore",
    tier: "Economy",
    departureDate: "24 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 735 / SV 738)",
    airline: "Saudia",
    hotels: {
      makkah: "AL JUHANI AJYAD MAKKAH / SHABAB DELMA 2",
      madinah: "NOZOL FALAH AWALI HOTEL MADINA"
    },
    pricing: { sharing: "301,999", quad: "313,999", triple: "334,999", double: "376,999" },
    seatsAvailable: 30
  },
  {
    id: "PKG-317",
    city: "Lahore",
    tier: "Economy",
    departureDate: "24 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 735 / SV 738)",
    airline: "Saudia",
    hotels: {
      makkah: "EMAAR AL KHAIR GOLDEN HOTEL MAKKAH",
      madinah: "NOZOL FALAH AWALI HOTEL MADINA"
    },
    pricing: { sharing: "306,999", quad: "319,999", triple: "340,999", double: "382,999" },
    seatsAvailable: 45
  },
  {
    id: "PKG-301",
    city: "Lahore",
    tier: "Economy",
    departureDate: "24 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (PK 759 / PK 960)",
    airline: "PIA",
    hotels: {
      makkah: "AL JUHANI AJYAD MAKKAH / SHABAB DELMA 2",
      madinah: "NOZOL FALAH AWALI HOTEL MADINA"
    },
    pricing: { sharing: "299,999", quad: "311,999", triple: "332,999", double: "374,999" },
    seatsAvailable: 30
  },
  {
    id: "PKG-280",
    city: "Lahore",
    tier: "Economy",
    departureDate: "24 Aug 2026",
    durationText: "15 Nights (Makkah: 9 Nights | Madinah: 6 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "AL JUHANI AJYAD MAKKAH / SHABAB DELMA 2",
      madinah: "ALKERAM ALJADID / ALKRAM ALFIDI"
    },
    pricing: { sharing: "291,999", quad: "301,999", triple: "318,999", double: "351,999" },
    seatsAvailable: 30
  },
  {
    id: "PKG-295",
    city: "Lahore",
    tier: "Economy",
    departureDate: "25 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "AL MASAR AJYAD MAKKAH",
      madinah: "DIYAR SAFA MADINA"
    },
    pricing: { sharing: "293,999", quad: "304,999", triple: "322,999", double: "357,999" },
    seatsAvailable: 50
  },
  {
    id: "PKG-268",
    city: "Lahore",
    tier: "Economy",
    departureDate: "25 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (9P 586 / 9P 587)",
    airline: "Airblue",
    hotels: {
      makkah: "ANWAR AL RAYAN MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "275,999", quad: "283,999", triple: "296,999", double: "323,999" },
    seatsAvailable: 40
  },
  {
    id: "PKG-282",
    city: "Lahore",
    tier: "Economy",
    departureDate: "26 Aug 2026",
    durationText: "14 Nights (Makkah: 8 Nights | Madinah: 6 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "AL JUHANI AJYAD MAKKAH / SHABAB DELMA 2",
      madinah: "NOZOL FALAH AWALI HOTEL MADINA"
    },
    pricing: { sharing: "286,999", quad: "295,999", triple: "309,999", double: "339,999" },
    seatsAvailable: 30
  },
  {
    id: "PKG-296",
    city: "Lahore",
    tier: "Economy",
    departureDate: "26 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "ANWAR AL RAYAN MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "282,999", quad: "290,999", triple: "303,999", double: "330,999" },
    seatsAvailable: 50
  },
  {
    id: "PKG-283",
    city: "Lahore",
    tier: "Economy",
    departureDate: "26 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 735 / SV 738)",
    airline: "Saudia",
    hotels: {
      makkah: "RAWAFED AL ASMIAH SHUTTLE HOTEL MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "273,999", quad: "279,999", triple: "288,999", double: "306,999" },
    seatsAvailable: 30
  },
  {
    id: "PKG-319",
    city: "Lahore",
    tier: "Economy",
    departureDate: "27 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 735 / SV 738)",
    airline: "Saudia",
    hotels: {
      makkah: "RAWAFED AL ASMIAH SHUTTLE HOTEL MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "277,999", quad: "283,999", triple: "292,999", double: "310,999" },
    seatsAvailable: 45
  },
  {
    id: "PKG-297",
    city: "Lahore",
    tier: "Economy",
    departureDate: "27 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "EMAAR AL KHAIR GOLDEN HOTEL MAKKAH",
      madinah: "NOZOL FALAH AWALI HOTEL MADINA"
    },
    pricing: { sharing: "302,999", quad: "315,999", triple: "336,999", double: "378,999" },
    seatsAvailable: 50
  },
  {
    id: "PKG-320",
    city: "Lahore",
    tier: "Economy",
    departureDate: "28 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "AL JUHANI AJYAD MAKKAH / SHABAB DELMA 2",
      madinah: "NOZOL FALAH AWALI HOTEL MADINA"
    },
    pricing: { sharing: "305,999", quad: "317,999", triple: "338,999", double: "380,999" },
    seatsAvailable: 45
  },
  {
    id: "PKG-269",
    city: "Lahore",
    tier: "Economy",
    departureDate: "28 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (9P 586 / 9P 587)",
    airline: "Airblue",
    hotels: {
      makkah: "RAWAFED AL ASMIAH SHUTTLE HOTEL MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "266,999", quad: "272,999", triple: "281,999", double: "299,999" },
    seatsAvailable: 40
  },
  {
    id: "PKG-286",
    city: "Lahore",
    tier: "Economy",
    departureDate: "29 Aug 2026",
    durationText: "15 Nights (Makkah: 9 Nights | Madinah: 6 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "AL JUHANI AJYAD MAKKAH / SHABAB DELMA 2",
      madinah: "ALKERAM ALJADID / ALKRAM ALFIDI"
    },
    pricing: { sharing: "291,999", quad: "301,999", triple: "322,999", double: "357,999" },
    seatsAvailable: 30
  },
  {
    id: "PKG-298",
    city: "Lahore",
    tier: "Economy",
    departureDate: "29 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "ANWAR AL RAYAN MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "282,999", quad: "290,999", triple: "303,999", double: "330,999" },
    seatsAvailable: 50
  },
  {
    id: "PKG-287",
    city: "Lahore",
    tier: "Economy",
    departureDate: "29 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 735 / SV 738)",
    airline: "Saudia",
    hotels: {
      makkah: "AL MASAR AJYAD MAKKAH",
      madinah: "DIYAR SAFA MADINA"
    },
    pricing: { sharing: "293,999", quad: "304,999", triple: "322,999", double: "357,999" },
    seatsAvailable: 30
  },
  {
    id: "PKG-288",
    city: "Lahore",
    tier: "Economy",
    departureDate: "30 Aug 2026",
    durationText: "15 Nights (Makkah: 9 Nights | Madinah: 6 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "AL JUHANI AJYAD MAKKAH / SHABAB DELMA 2",
      madinah: "ALKERAM ALJADID / ALKRAM ALFIDI"
    },
    pricing: { sharing: "291,999", quad: "301,999", triple: "318,999", double: "351,999" },
    seatsAvailable: 30
  },
  {
    id: "PKG-270",
    city: "Lahore",
    tier: "Economy",
    departureDate: "31 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (9P 588 / 9P 587)",
    airline: "Airblue",
    hotels: {
      makkah: "RAWAFED AL ASMIAH SHUTTLE HOTEL MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "266,999", quad: "272,999", triple: "281,999", double: "299,999" },
    seatsAvailable: 40
  },
  {
    id: "PKG-300",
    city: "Lahore",
    tier: "Economy",
    departureDate: "31 Aug 2026",
    durationText: "15 Nights (Makkah: 9 Nights | Madinah: 6 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "ANWAR AL RAYAN MAKKAH",
      madinah: "MANAZIL AL MARJHAAN AL MADINA"
    },
    pricing: { sharing: "273,999", quad: "278,999", triple: "288,999", double: "306,999" },
    seatsAvailable: 50
  },
  {
    id: "PKG-290",
    city: "Lahore",
    tier: "Economy",
    departureDate: "31 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 735 / SV 738)",
    airline: "Saudia",
    hotels: {
      makkah: "AL JUHANI AJYAD MAKKAH / SHABAB DELMA 2",
      madinah: "ALKERAM ALJADID / ALKRAM ALFIDI"
    },
    pricing: { sharing: "339,999", quad: "361,999", triple: "398,999", double: "471,999" },
    seatsAvailable: 30
  },
  // =============================================
  // LAHORE STAR PACKAGES (LHE-JED)
  // =============================================
  {
    id: "PKG-250",
    city: "Lahore",
    tier: "Star",
    departureDate: "08 Aug 2026",
    durationText: "20 Nights (Makkah: 12 Nights | Madinah: 8 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "MATHAR AL JEWAR MAKKAH",
      madinah: "ARJWAN AL MADINAH"
    },
    pricing: { sharing: "339,999", quad: "361,999", triple: "398,999", double: "471,999" },
    seatsAvailable: 43
  },
  {
    id: "PKG-325",
    city: "Lahore",
    tier: "Star",
    departureDate: "12 Aug 2026",
    durationText: "15 Nights (Makkah: 9 Nights | Madinah: 6 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "MATHAR AL JEWAR MAKKAH",
      madinah: "ARJWAN AL MADINAH"
    },
    pricing: { sharing: "313,999", quad: "328,999", triple: "354,999", double: "405,999" },
    seatsAvailable: 26
  },
  {
    id: "PKG-105",
    city: "Lahore",
    tier: "Star",
    departureDate: "17 Aug 2026",
    durationText: "15 Nights (Makkah: 8 Nights | Madinah: 7 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "VOCO HOTEL",
      madinah: "NUSK AL MADINAH"
    },
    pricing: { sharing: "326,999", quad: "326,999", triple: "348,999", double: "392,999" },
    seatsAvailable: 25
  },
  {
    id: "PKG-108",
    city: "Lahore",
    tier: "Star",
    departureDate: "18 Aug 2026",
    durationText: "14 Nights (Makkah: 8 Nights | Madinah: 6 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "VOCO HOTEL",
      madinah: "NUSK AL MADINAH"
    },
    pricing: { sharing: "324,999", quad: "324,999", triple: "347,999", double: "389,999" },
    seatsAvailable: 46
  },
  {
    id: "PKG-284",
    city: "Lahore",
    tier: "Star",
    departureDate: "27 Aug 2026",
    durationText: "15 Nights (Makkah: 9 Nights | Madinah: 6 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "MATHAR AL JEWAR MAKKAH",
      madinah: "ARJWAN AL MADINAH"
    },
    pricing: { sharing: "313,999", quad: "328,999", triple: "354,999", double: "405,999" },
    seatsAvailable: 30
  },
  {
    id: "PKG-285",
    city: "Lahore",
    tier: "Star",
    departureDate: "28 Aug 2026",
    durationText: "15 Nights (Makkah: 9 Nights | Madinah: 6 Nights)",
    flightRoute: "LHE - JED (SV 739 / SV 734)",
    airline: "Saudia",
    hotels: {
      makkah: "MATHAR AL JEWAR MAKKAH",
      madinah: "ARJWAN AL MADINAH"
    },
    pricing: { sharing: "313,999", quad: "328,999", triple: "354,999", double: "405,999" },
    seatsAvailable: 30
  }
];
export {
  UMRAH_PACKAGES
};
