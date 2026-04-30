// TurboNOS — Exhibition Car Data
// 4 sections: American, German, Italian, Japanese

export const carSections = [
  {
    id: "american",
    label: "American",
    tagline: "Built on asphalt, baptized in fire.",
    accentColor: "#E24B4A",
    cars: [
      {
        id: "am-01",
        model: "Charger R/T",
        brand: "Dodge",
        year: 1970,
        brief:
          "The beast that started it all. A 426 Hemi thunders beneath a hood that was never meant to be tamed — Dom Toretto's Charger doesn't race, it devours. Raw, relentless, and built when Detroit still believed in brute force as poetry.",
        imagePath: "/cars/charger-rt.jfif",
        accentColor: "#1a1a1a",
        tag: "Dom's Weapon",
      },
      {
        id: "am-02",
        model: "Challenger SRT Hellcat",
        brand: "Dodge",
        year: 2020,
        brief:
          "707 horsepower crammed into a body that still looks like a fist. The Hellcat is Detroit's refusal to apologize — supercharged, wide-bodied, and loud enough to rattle your fillings. American excess at its most glorious.",
        imagePath: "/cars/challenger-hellcat.jfif",
        accentColor: "#E24B4A",
        tag: "The Hellcat",
      },
      {
        id: "am-03",
        model: "GT40 Mk II",
        brand: "Ford",
        year: 1966,
        brief:
          "The car Henry Ford II built specifically to humiliate Ferrari at Le Mans — and did, three years in a row. Low enough to slide under your ego, fast enough to rewrite history. The GT40 is revenge engineered into 40 inches of pure legend.",
        imagePath: "/cars/ford-gt40.jfif",
        accentColor: "#0A3161",
        tag: "Le Mans Legend",
      },
      {
        id: "am-04",
        model: "Mustang Shelby GT500",
        brand: "Ford",
        year: 1967,
        brief:
          "Carroll Shelby took the Mustang and turned it into something that could genuinely scare you. 355 horsepower in 1967 was not a number — it was a threat. The GT500 is the original pony car that grew fangs and never looked back.",
        imagePath: "/cars/mustang-gt500.jfif",
        accentColor: "#C8A951",
        tag: "Shelby's Stallion",
      },
    ],
  },

  {
    id: "german",
    label: "German",
    tagline: "Engineered beyond reason.",
    accentColor: "#378ADD",
    cars: [
      {
        id: "de-01",
        model: "M4 Competition",
        brand: "BMW",
        year: 2023,
        brief:
          "The kidney grille divides opinions but the S58 engine silences them all — 503hp of twin-turbo fury wrapped in a track weapon that still obeys on a Monday morning. BMW's M4 Competition is the autobahn's sharpest argument.",
        imagePath: "/cars/bmw-m4-comp.jfif",
        accentColor: "#0066B1",
        tag: "The Argument",
      },
      {
        id: "de-02",
        model: "RS6 Avant",
        brand: "Audi",
        year: 2022,
        brief:
          "A station wagon that will outrun your excuses. The RS6 Avant hides 621 horsepower behind school-run respectability — quattro all-wheel drive launching it to 100 km/h before you've finished your coffee. The most dangerous estate car ever made.",
        imagePath: "/cars/audi-rs6.jfif",
        accentColor: "#BB0A21",
        tag: "Wolf in Wool",
      },
      {
        id: "de-03",
        model: "RS3 Sportback",
        brand: "Audi",
        year: 2022,
        brief:
          "Five cylinders, one obsession. The RS3's inline-5 makes a sound that other engines can only dream about — a banshee wail that announces 400hp before the revs even climb. Small body, no mercy, quintessential Audi Sport.",
        imagePath: "/cars/audi-rs3.jfif",
        accentColor: "#BB0A21",
        tag: "Five-Cylinder Fury",
      },
      {
        id: "de-04",
        model: "E63 S AMG",
        brand: "Mercedes-AMG",
        year: 2022,
        brief:
          "The most unhinged luxury saloon in production. 612hp, 4MATIC+ all-wheel drive, and a drift mode that lets you slide a full-size executive car sideways across a runway. AMG built this for the person who needs to arrive — and arrive violently.",
        imagePath: "/cars/amg-e63s.jfif",
        accentColor: "#2D2D2D",
        tag: "Executive Madness",
      },
      {
        id: "de-05",
        model: "300 SEL 6.8 AMG",
        brand: "Mercedes-AMG",
        year: 1971,
        brief:
          "Before AMG had a badge, it had a red pig. The 6.8-litre hand-built monster that finished second at Spa in 1971 proved the lunatics had taken over the garage. The grandfather of every AMG ever made — a racing car that looked like your grandfather's sedan.",
        imagePath: "/cars/amg-300sel.jfif",
        accentColor: "#8B0000",
        tag: "The Red Pig",
      },
      {
        id: "de-06",
        model: "G63 AMG",
        brand: "Mercedes-AMG",
        year: 2023,
        brief:
          "A military vehicle handed a twin-turbo V8 and a six-figure price tag. The G63 is absurd by design — boxy, brick-like, and faster than anything that shape has any right to be. It exists because some people refuse to choose between capability and excess.",
        imagePath: "/cars/g63-amg.jfif",
        accentColor: "#1C3A1C",
        tag: "Armed & Expensive",
      },
      {
        id: "de-07",
        model: "E36 M3",
        brand: "BMW",
        year: 1995,
        brief:
          "The purist's obsession. No turbos, no electronic safety nets — just a naturally aspirated 3.2-litre straight-six screaming to 8,000 rpm and a chassis that communicates in complete sentences. The E36 M3 is the benchmark every modern M car is still chasing.",
        imagePath: "/cars/bmw-e36-m3.jfif",
        accentColor: "#0A0A0A",
        tag: "The Purist",
      },
      {
        id: "de-08",
        model: "911 GT3 RS",
        brand: "Porsche",
        year: 2023,
        brief:
          "Weissach Package, swan-neck wing, naturally aspirated flat-six to 9,000 rpm. The GT3 RS is Porsche admitting they don't need turbos when they have obsession. A road-legal race car that laps the Nürburgring faster than your dreams.",
        imagePath: "/cars/porsche-gt3rs.jfif",
        accentColor: "#D5001C",
        tag: "Nürburgring's Lap Record",
      },
    ],
  },

  {
    id: "italian",
    label: "Italian",
    tagline: "Where art becomes velocity.",
    accentColor: "#EF9F27",
    cars: [
      {
        id: "it-01",
        model: "SF90 Stradale",
        brand: "Ferrari",
        year: 2021,
        brief:
          "Ferrari's first plug-in hybrid is also its most violent. 986hp from a twin-turbo V8 plus three electric motors — four-wheel drive, no soul lost in translation. The SF90 is the Prancing Horse acknowledging the future and then immediately trying to outrun it.",
        imagePath: "/cars/ferrari-sf90.jfif",
        accentColor: "#CC0000",
        tag: "Prancing Into Tomorrow",
      },
      {
        id: "it-02",
        model: "Aventador SVJ",
        brand: "Lamborghini",
        year: 2019,
        brief:
          "The last naturally aspirated V12 supercar from Sant'Agata — 770hp, ALA active aerodynamics, and a sound that doesn't belong in this century. The Aventador SVJ held the Nürburgring production car record and carries that weight on a spine of pure carbon fiber.",
        imagePath: "/cars/lambo-aventador-svj.jfif",
        accentColor: "#F5A623",
        tag: "The Last V12 Scream",
      },
      {
        id: "it-03",
        model: "Huayra R",
        brand: "Pagani",
        year: 2022,
        brief:
          "Horacio Pagani builds cars the way Michelangelo painted ceilings — with a titanium pen and no concept of compromise. The Huayra R is track-only, AMG V12-powered, and so detailed you could spend a week studying the exposed mechanical art of its interior. Forty units. No road use. Pure.",
        imagePath: "/cars/pagani-huayra-r.jfif",
        accentColor: "#C0A060",
        tag: "Mechanical Masterpiece",
      },
    ],
  },

  {
    id: "japanese",
    label: "Japanese",
    tagline: "Precision that borders on spiritual.",
    accentColor: "#9FE1CB",
    cars: [
      {
        id: "jp-01",
        model: "Skyline GT-R R32",
        brand: "Nissan",
        year: 1989,
        brief:
          "They called it Godzilla because it arrived at Bathurst and destroyed everything in its path. The RB26DETT twin-turbo and ATTESA E-TS all-wheel drive made the R32 so dominant in touring car racing they banned it. The car that made the world take Japan seriously.",
        imagePath: "/cars/skyline-r32.jfif",
        accentColor: "#C8C8C8",
        tag: "Godzilla",
      },
      {
        id: "jp-02",
        model: "Supra MK4",
        brand: "Toyota",
        year: 1994,
        brief:
          "Born in Japan, immortalized in orange. The 2JZ-GTE is a myth in engine form — a cast-iron block so overbuilt that tuners routinely coax 1,000hp from a power unit Toyota rated at 280. Brian O'Conner drove one into history. The rest of us just watched.",
        imagePath: "/cars/supra-mk4.jfif",
        accentColor: "#FF6600",
        tag: "2JZ or Die",
      },
      {
        id: "jp-03",
        model: "GT-R R35",
        brand: "Nissan",
        year: 2009,
        brief:
          "The supercomputer wearing a body kit. Nissan's R35 GT-R launched with a 3.8-litre twin-turbo V6 and lap times that made Ferraris uncomfortable — at half the price. It is the most data-driven supercar ever built: every component chosen to win numbers, not hearts. It wins both.",
        imagePath: "/cars/nissan-gtr-r35.jfif",
        accentColor: "#E8E8E8",
        tag: "The Supercomputer",
      },
    ],
  },
];

export default carSections;
