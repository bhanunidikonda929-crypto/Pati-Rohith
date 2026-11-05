import { SubstitutionItem } from '../types/recipe';

export const TRADITIONAL_SUBSTITUTIONS: SubstitutionItem[] = [
  {
    id: "sub-tamarind",
    original: {
      en: "Tamarind (Imli / Chintapandu)",
      hi: "इमली",
      te: "చింతపండు"
    },
    substitute: {
      en: "Dried Mango Powder (Amchur) or Kokum petals",
      hi: "अमचूर पाउडर या कोकम",
      te: "ఆమ్‌చూర్ పొడి లేదా కోకుం రేకులు లేదా పచ్చి మామిడికాయ"
    },
    ratio: "1 tbsp tamarind paste = 1 tsp Amchur OR 2-3 Kokum petals",
    flavorImpact: {
      en: "Amchur adds fruity sourness without darkening the gravy; Kokum gives deep ruby hue and sharp tang.",
      hi: "अमचूर बिना रंग बदले खटास देता है; कोकम गहरा लाल रंग और तीखा खट्टापन देता है।",
      te: "ఆమ్‌చూర్ పులుపుతో పాటు మంచి సువాసన ఇస్తుంది; కోకుం చక్కటి ఎరుపు రంగునిస్తుంది."
    },
    dietaryBenefit: "Pantry Friendly / Low Histamine"
  },
  {
    id: "sub-ghee",
    original: {
      en: "Pure Desi Ghee (Neyyi)",
      hi: "शुद्ध देशी घी",
      te: "స్వచ్ఛమైన నెయ్యి"
    },
    substitute: {
      en: "Cold-Pressed Sesame (Til) Oil or Mustard Oil",
      hi: "कच्ची घानी तिल का तेल या सरसों का तेल",
      te: "నువ్వుల నూనె లేదా వేరుశెనగ నూనె"
    },
    ratio: "1:1 swap",
    flavorImpact: {
      en: "Cold-pressed sesame oil enhances traditional Andhra & South dishes with nutty richness; 100% plant-based.",
      hi: "तिल का तेल दक्षिण भारतीय व्यंजनों में बेहतरीन सुगंध लाता है और पूरी तरह शाकाहारी है।",
      te: "నువ్వుల నూనె సాంప్రదాయ ఆంధ్రా రుచులకు అదనపు బలాన్ని మరియు సువాసనను ఇస్తుంది (100% శాకాహార ప్రత్యామ్నాయం)."
    },
    dietaryBenefit: "100% Vegan & Dairy-Free"
  },
  {
    id: "sub-paneer",
    original: {
      en: "Dairy Paneer",
      hi: "दूध का पनीर",
      te: "పాల పనీర్"
    },
    substitute: {
      en: "Pressed Extra Firm Tofu or Cooked Chickpeas",
      hi: "सोया टोफू या उबले काबुली चने",
      te: "టోఫు (సోయా పనీర్) లేదా ఉడికించిన శనగలు"
    },
    ratio: "1:1 swap",
    flavorImpact: {
      en: "Absorbs curries just like paneer while keeping it low cholesterol, high protein, and dairy-free.",
      hi: "पनीर की तरह ही ग्रेवी को सोख लेता है, कोलेस्ट्रॉल कम और प्रोटीन अधिक होता है।",
      te: "మసాలా పులుసులను చక్కగా పీల్చుకుంటుంది, కొలెస్ట్రాల్ లేని ప్రోటీన్ ఆహారం."
    },
    dietaryBenefit: "Vegan & Heart-Healthy"
  },
  {
    id: "sub-malai",
    original: {
      en: "Heavy Cream / Malai",
      hi: "ताज़ी मलाई या क्रीम",
      te: "తాజా మీగడ / పాల క్రీమ్"
    },
    substitute: {
      en: "Blended Soaked Cashew Paste or Thick Coconut Milk",
      hi: "काजू का पेस्ट या गाढ़ा नारियल का दूध",
      te: "నానబెట్టిన జీడిపప్పు పేస్ట్ లేదా చిక్కటి కొబ్బరి పాలు"
    },
    ratio: "1/4 cup cream = 2 tbsp soaked cashew paste + 2 tbsp warm water",
    flavorImpact: {
      en: "Creates identical velvety restaurant gloss in Dal Makhani & Curries with sweet nutty undertones.",
      hi: "दाल मखनी और कढ़ी में मलाई जैसा ही गाढ़ापन और शाही स्वाद देता है।",
      te: "వంటకాలకు రాజసపు చిక్కదనాన్ని, అద్భుతమైన రుచిని ఇస్తుంది."
    },
    dietaryBenefit: "Vegan & Lactose-Free"
  },
  {
    id: "sub-rice",
    original: {
      en: "Polished White Rice",
      hi: "सफेद पॉलिश चावल",
      te: "తెల్ల బియ్యం"
    },
    substitute: {
      en: "Foxtail Millet (Korralu) or Barnyard Millet (Udalu)",
      hi: "कंगनी बाजरा (मिलेट्स)",
      te: "కొర్రలు లేదా సామలు (సిరిధాన్యాలు)"
    },
    ratio: "1:1 cooking ratio with 2.25x water",
    flavorImpact: {
      en: "Earthy, rustic ancient Indian texture; low glycemic index, 3x higher fiber and minerals.",
      hi: "प्राचीन भारतीय अनाज, कम ग्लाइसेमिक इंडेक्स, स्वास्थ्य और शुगर के लिए अत्यंत लाभकारी।",
      te: "షుగర్ వ్యాధిగ్రస్తులకు ఉత్తమమైనది, ఫైబర్ అధికంగా ఉండే ప్రాచీన సిరిధాన్యాలు."
    },
    dietaryBenefit: "Diabetic Friendly & High Fiber"
  },
  {
    id: "sub-onion-garlic",
    original: {
      en: "Onion & Garlic (Satvik / Jain restriction)",
      hi: "प्याज और लहसुन",
      te: "ఉల్లిపాయ & వెల్లుల్లి"
    },
    substitute: {
      en: "Pure Asafoetida (Compounded Hing) + Grated Ginger",
      hi: "शुद्ध हींग और कद्दूकस अदरक",
      te: "స్వచ్ఛమైన ఇంగువ మరియు అల్లం తురుము"
    },
    ratio: "1 medium onion = 1/4 tsp strong Hing bloomed in hot ghee",
    flavorImpact: {
      en: "Blooming pure hing in hot ghee duplicates sulfurous savory umami notes while remaining strictly Satvik.",
      hi: "गर्म घी में हींग पकाने से प्याज-लहसुन जैसा ही गहरा उमामी स्वाद मिलता है।",
      te: "వేడి నూనె/నెయ్యిలో ఇంగువ వేస్తే ఉల్లిపాయ, వెల్లుల్లి లేకపోయినా అద్భుతమైన సువాసన వస్తుంది."
    },
    dietaryBenefit: "Strict Jain & Satvik Fasting"
  },
  {
    id: "sub-gongura",
    original: {
      en: "Red Gongura (Sorrel Leaves)",
      hi: "गोंगुरा (अम्बाडी) पत्ता",
      te: "ఎర్ర గోంగూర ఆకులు"
    },
    substitute: {
      en: "Baby Spinach leaves + Raw Green Mango / Lemon",
      hi: "पालक के पत्ते + कच्चा आम या नींबू का रस",
      te: "పాలకూర ఆకులు + పచ్చి మామిడికాయ ముక్కలు లేదా నిమ్మరసం"
    },
    ratio: "250g spinach + 1/2 raw green mango diced fine",
    flavorImpact: {
      en: "Spinach replicates the leafy texture while grated green mango matches the distinctive punchy tartness.",
      hi: "पालक पत्तेदार बनावट देती है और कच्चा आम असली गोंगुरा जैसा खट्टापन देता है।",
      te: "పాలకూర ఆకు తీరుని, మామిడికాయ గోంగూర లాంటి అసలైన పులుపును అందిస్తాయి."
    },
    dietaryBenefit: "Available Globally"
  }
];
