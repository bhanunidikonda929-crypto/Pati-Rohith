import { Recipe } from '../types/recipe';

export const TRADITIONAL_RECIPES: Recipe[] = [
  {
    id: "gongura-pachadi",
    title: {
      en: "Andhra Gongura Pachadi",
      hi: "आंध्रा गोंगुरा चटनी",
      te: "ఆంధ్రా ఘాటైన గోంగూర పచ్చడి"
    },
    description: {
      en: "The culinary pride of Andhra! Tangy sorrel leaves roasted with dry red chilies, garlic, and coriander seeds, pounded in a traditional stone mortar with raw onions.",
      hi: "आंध्र प्रदेश की प्रसिद्ध खट्टी गोंगुरा (अम्बाडी) चटनी, जिसे लाल मिर्च, लहसुन और साबुत मसालों के साथ पारंपरिक सिलबट्टे पर पीसा जाता है।",
      te: "ఆంధ్రుల అభిమాన వంటకం! పుల్లని గోంగూరను ఎండుమిర్చి, వెల్లుల్లి, ధనియాలతో మగ్గించి, రోట్లో దంచి ఉల్లిపాయలతో కలిపే అచ్చమైన పల్లెటూరి పచ్చడి."
    },
    category: "curry",
    cuisine: "Andhra & Telangana",
    diet: "veg",
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    servings: 4,
    caloriesPerServing: 110,
    spiceLevel: "extra_hot",
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      {
        name: { en: "Fresh Red-stem Gongura leaves", hi: "ताज़ी लाल डंडी वाली गोंगुरा पत्तियां", te: "ఎర్ర గోంగూర ఆకులు" },
        quantity: "3 bunches / 300g"
      },
      {
        name: { en: "Guntur Dry Red Chilies", hi: "गुंटूर सूखी लाल मिर्च", te: "గుంటూరు ఎండు మిరపకాయలు" },
        quantity: "15-18 pcs"
      },
      {
        name: { en: "Coriander Seeds (Dhania)", hi: "साबुत धनिया", te: "ధనియాలు" },
        quantity: "2 tbsp"
      },
      {
        name: { en: "Fenugreek Seeds (Methi)", hi: "मेथी दाना", te: "మెంతులు" },
        quantity: "1/2 tsp"
      },
      {
        name: { en: "Garlic cloves, crushed", hi: "कुचला हुआ लहसुन", te: "వెల్లుల్లి రెబ్బలు" },
        quantity: "10-12 cloves"
      },
      {
        name: { en: "Cold-pressed Sesame Oil", hi: "तिल का तेल", te: "నువ్వుల నూనె" },
        quantity: "3 tbsp"
      },
      {
        name: { en: "Finely chopped Raw Onions", hi: "बारीक कटा कच्चा प्याज", te: "సన్నగా తరిగిన పచ్చి ఉల్లిపాయ ముక్కలు" },
        quantity: "1 medium"
      },
      {
        name: { en: "Rock Salt (Kallu Uppu)", hi: "सेंधा / समुद्री नमक", te: "కల్లుప్పు" },
        quantity: "1.5 tsp"
      }
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: {
          en: "Wash gongura leaves thoroughly in cold water and air-dry completely on a clean cotton cloth. Any moisture will reduce the shelf life of this traditional pickle.",
          hi: "गोंगुरा पत्तियों को धोकर सूती कपड़े पर पूरी तरह सुखा लें। नमी रहने से चटनी जल्दी खराब हो सकती है।",
          te: "గోంగూర ఆకులను శుభ్రంగా కడిగి, కాటన్ వస్త్రంపై ఆరబెట్టండి. తేమ లేకుండా చూసుకోవడం ముఖ్యం."
        },
        tip: {
          en: "Red-stem gongura offers the best balance of tanginess and deep flavor.",
          hi: "लाल डंडी वाली गोंगुरा सबसे बेहतरीन खट्टा स्वाद देती है।",
          te: "ఎర్ర గోంగూర మంచి పులుపును మరియు రుచిని ఇస్తుంది."
        },
        timerMinutes: 5
      },
      {
        stepNumber: 2,
        instruction: {
          en: "Heat 1 tbsp sesame oil in a cast-iron pan. Roast coriander seeds, fenugreek seeds, and Guntur dry red chilies on low flame until aromatic. Grind into a coarse spice powder.",
          hi: "कड़ाही में 1 चम्मच तिल का तेल गरम करें। धनिया, मेथी और सूखी लाल मिर्च को धीमी आंच पर खुशबू आने तक भूनें। ठंडा करके दरदरा पीस लें।",
          te: "బాణలిలో నూనె వేసి ధనియాలు, మెంతులు, ఎండుమిరపకాయలను దోరగా వేయించి పొడి చేసుకోండి."
        },
        timerMinutes: 6
      },
      {
        stepNumber: 3,
        instruction: {
          en: "In the same pan, add 1 tbsp oil and sauté the dried gongura leaves on medium-low flame until they wilt completely and turn olive-green. Let it cool.",
          hi: "उसी कड़ाही में 1 चम्मच तेल डालकर गोंगुरा पत्तियों को नरम और जैतून-हरा होने तक भूनें। ठंडा होने दें।",
          te: "అదే బాణలిలో గోంగూర ఆకులను వేసి మెత్తబడే వరకు మగ్గనిచ్చి చల్లారనివ్వండి."
        },
        timerMinutes: 8
      },
      {
        stepNumber: 4,
        instruction: {
          en: "Pound roasted spices, garlic, wilted gongura, and rock salt together in a mortar or pulse briefly in a mixer. Fold in crunchy chopped raw onions.",
          hi: "भुने मसाले, लहसुन, भुनी गोंगुरा और नमक को सिलबट्टे या मिक्सी में दरदरा पीसें। ऊपर से कच्चे प्याज के टुकड़े मिलाएं।",
          te: "రోట్లో వేయించిన మసాలాలు, వెల్లుల్లి, గోంగూర, కల్లుప్పు వేసి దంచండి. చివరగా పచ్చి ఉల్లిపాయ ముక్కలు కలపండి."
        },
        tip: {
          en: "Never fine-puree gongura; it needs traditional coarse rustic texture.",
          hi: "इसे कभी भी एकदम बारीक पेस्ट न बनाएं, दरदरापन ही इसकी असली पहचान है।",
          te: "గోంగూరను మెత్తగా పేస్ట్ చేయకూడదు, రోటి పచ్చడిలా కాస్త పలుకుగా ఉండాలి."
        },
        timerMinutes: 4
      }
    ],
    traditionalTip: {
      en: "Serve warm with piping hot steamed Sona Masoori rice and generous spoonful of fresh buffalo ghee for heaven on a banana leaf!",
      hi: "गरमा-गरम सादे चावल और शुद्ध देशी घी के साथ परोसें।",
      te: "వేడి వేడి అన్నంలో స్వచ్ఛమైన నెయ్యి వేసుకుని ఈ పచ్చడి కలుపుకుని తింటే ఆ రుచే వేరు!"
    },
    isFavorite: true,
    createdAt: "2026-01-10T10:00:00Z"
  },
  {
    id: "hyderabadi-dum-biryani",
    title: {
      en: "Hyderabadi Dum Biryani",
      hi: "हैदराबादी दम बिरयानी",
      te: "హైదరాబాదీ దమ్ బిర్యానీ"
    },
    description: {
      en: "The jewel of Nizami cuisine. Succulent pieces marinated in whole spices, layered with saffron-infused aged Basmati rice and slow-cooked in sealed pot on 'Dum'.",
      hi: "निज़ामी रसोई का अनमोल रत्न। साबुत मसालों और दही में मैरीनेट किया हुआ गोश्त या सब्जियां, केसरिया बासमती चावल के साथ 'दम' पर पकाई जाती हैं।",
      te: "నిజాంల నవాబీ రుచి! సుగంధ ద్రవ్యాలు, పెరుగుతో మ్యారినేట్ చేసి, కుంకుమపువ్వు బాస్మతి బియ్యంతో దమ్ పెట్టి వండే రారాజు బిర్యానీ."
    },
    category: "biryani",
    cuisine: "Mughlai & Hyderabad",
    diet: "non-veg",
    prepTimeMinutes: 45,
    cookTimeMinutes: 40,
    servings: 6,
    caloriesPerServing: 520,
    spiceLevel: "hot",
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      {
        name: { en: "Aged Long Grain Basmati Rice", hi: "पुराना बासमती चावल", te: "పాత బాస్మతి బియ్యం" },
        quantity: "3 cups / 600g"
      },
      {
        name: { en: "Chicken or Mutton pieces (bone-in)", hi: "चिकन या मटन के टुकड़े", te: "చికెన్ లేదా మటన్ ముక్కలు" },
        quantity: "800g"
      },
      {
        name: { en: "Thick Hung Curd / Yogurt", hi: "गाढ़ा दही", te: "చిక్కటి పెరుగు" },
        quantity: "1.5 cups"
      },
      {
        name: { en: "Fried Crispy Onions (Birista)", hi: "तला हुआ भूरा प्याज (बरिस्ता)", te: "వేయించిన ఉల్లిపాయలు (బిరిస్తా)" },
        quantity: "1.5 cups"
      },
      {
        name: { en: "Pure Desi Ghee", hi: "शुद्ध देशी घी", te: "స్వచ్ఛమైన దేశీ నెయ్యి" },
        quantity: "4 tbsp"
      },
      {
        name: { en: "Kashmiri Saffron strands in warm milk", hi: "दूध में भिगोया कश्मीरी केसर", te: "కుంకుమపువ్వు పాలు" },
        quantity: "1/4 cup"
      },
      {
        name: { en: "Shahi Jeera, Cardamom, Cloves, Star Anise", hi: "शाही जीरा, इलायची, लौंग, चक्रफूल", te: "షాహీ జీరా, యాలకులు, లవంగాలు, బిర్యానీ పువ్వు" },
        quantity: "2 tbsp mixed"
      },
      {
        name: { en: "Fresh Mint & Coriander leaves", hi: "पुदीना और हरा धनिया", te: "తాజా పుదీనా మరియు కొత్తిమీర" },
        quantity: "1 cup chopped"
      }
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: {
          en: "Marinate meat with curd, ginger-garlic paste, red chili powder, turmeric, biryani masala, half the fried onions, mint, and lemon juice. Rest for minimum 1 hour.",
          hi: "दही, अदरक-लहसुन, लाल मिर्च, पुदीना, नींबू और तले प्याज के साथ मैरीनेट करें। कम से कम 1 घंटे रखें।",
          te: "పెరుగు, అల్లం-వెల్లుల్లి పేస్ట్, కారం, పుదీనా, కొత్తిమీర మరియు నిమ్మరసంతో మాంసాన్ని కనీసం ఒక గంట నానబెట్టండి."
        },
        tip: {
          en: "Overnight marination breaks down fibers, producing melt-in-mouth texture.",
          hi: "रात भर मैरीनेट करने से मांस बहुत ही कोमल बनता है।",
          te: "ఎక్కువ సమయం నాననిస్తే ముక్కలు ఎంతో మృదువుగా తయారవుతాయి."
        },
        timerMinutes: 60
      },
      {
        stepNumber: 2,
        instruction: {
          en: "Boil water with whole spices and salt (water must taste salty like sea water). Cook soaked basmati rice until exactly 70% done (firm core). Drain immediately.",
          hi: "खड़े मसालों के साथ पानी उबालें और चावल को सिर्फ 70% तक पकाकर तुरंत छान लें।",
          te: "మసాలా దినుసులు వేసిన నీటిలో బియ్యాన్ని 70% మాత్రమే ఉడికించి వార్చుకోండి."
        },
        timerMinutes: 8
      },
      {
        stepNumber: 3,
        instruction: {
          en: "In a heavy-bottom handi, spread the marinated layer at the bottom. Top with 70% cooked rice, remaining crispy fried onions, fresh mint, coriander, saffron milk, and pure desi ghee.",
          hi: "भारी तले की हांडी में मैरीनेटेड लेयर नीचे बिछाएं। ऊपर चावल, बरिस्ता, पुदीना, केसर का दूध और देशी घी फैलाएं।",
          te: "మందపాటి పాత్రలో కింద మ్యారినేట్ చేసిన చికెన్, పైన బాస్మతి బియ్యం, వేయించిన ఉల్లిపాయలు, కుంకుమపువ్వు పాలు మరియు నెయ్యి పేర్చండి."
        },
        timerMinutes: 5
      },
      {
        stepNumber: 4,
        instruction: {
          en: "Seal handi tightly with wheat dough or foil. Cook on high flame for 8 minutes, then place on a heavy tawa on low flame for 25 minutes on slow 'Dum'. Rest 10 mins before opening.",
          hi: "हांडी को आटे से सील करें। 8 मिनट तेज़ आंच पर, फिर तवे पर रखकर 25 मिनट धीमी आंच पर दम दें। 10 मिनट बाद खोलें।",
          te: "పాత్రపై మూత పెట్టి గోధుమ పిండితో ఆవిరి పోకుండా సీల్ చేయండి. 8 నిమిషాలు ఎక్కువ మంటపై, తర్వాత పెనంపై 25 నిమిషాలు దమ్ చేయండి."
        },
        timerMinutes: 33
      }
    ],
    traditionalTip: {
      en: "Always gently fluff the rice with a flat plate from the edge to keep long grains intact. Serve with Mirchi Ka Salan and onion raita.",
      hi: "चावल के दाने टूटने से बचाने के लिए किनारे से चपटी प्लेट से निकालें। मिर्ची का सालन के साथ परोसें।",
      te: "బియ్యం గింజలు విరగకుండా అంచుల నుండి నెమ్మదిగా వడ్డించండి. మిర్చి కా సాలన్ మరియు పెరుగు పచ్చడితో అద్భుతంగా ఉంటుంది."
    },
    isFavorite: true,
    createdAt: "2026-01-12T12:00:00Z"
  },
  {
    id: "andhra-chepala-pulusu",
    title: {
      en: "Andhra Chepala Pulusu (Fish Curry)",
      hi: "आंध्रा मछली कढ़ी (चेपला पुलुसु)",
      te: "ఘుమఘుమలాడే నెల్లూరు చేపల పులుసు"
    },
    description: {
      en: "Traditional Nellore-style fish curry simmered in aged tamarind extract with fenugreek-mustard powder and raw mango slices. It tastes even better the next day!",
      hi: "नेल्लोर शैली की पारंपरिक मछली कढ़ी जिसे पुरानी इमली, मेथी-राई पाउडर और कच्चे आम के टुकड़ों के साथ पकाया जाता है। बासी होने पर यह और स्वादिष्ट लगती है!",
      te: "నెల్లూరు సాంప్రదాయ చేపల పులుసు! పాత చింతపండు రసం, మెంతులు-ఆవాల పొడి, మామిడికాయ ముక్కలతో మట్టిపాత్రలో మరిగించే అమృతపు పులుసు. మరుసటి రోజుకి మరింత రుచి!"
    },
    category: "curry",
    cuisine: "Andhra & Telangana",
    diet: "non-veg",
    prepTimeMinutes: 20,
    cookTimeMinutes: 25,
    servings: 4,
    caloriesPerServing: 320,
    spiceLevel: "extra_hot",
    imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      {
        name: { en: "Freshwater Murrel / Rohu Fish steaks", hi: "ताज़ी मछली के टुकड़े", te: "తాజా కొరమీను లేదా బొచ్చె చేప ముక్కలు" },
        quantity: "700g"
      },
      {
        name: { en: "Aged Dark Tamarind extract", hi: "पुरानी इमली का गाढ़ा रस", te: "పాత చింతపండు గుజ్జు" },
        quantity: "Lemon sized ball (1.5 cups extract)"
      },
      {
        name: { en: "Roasted Fenugreek & Mustard seed powder", hi: "भुनी मेथी और राई का चूर्ण", te: "వేయించిన మెంతి-ఆవాల పొడి" },
        quantity: "1.5 tsp"
      },
      {
        name: { en: "Guntur Red Chili Powder", hi: "गुंटूर लाल मिर्च पाउडर", te: "గుంటూరు కారం" },
        quantity: "2.5 tbsp"
      },
      {
        name: { en: "Slit Green Chilies", hi: "चीरी हुई हरी मिर्च", te: "నిలువుగా చీల్చిన పచ్చిమిర్చి" },
        quantity: "6 pcs"
      },
      {
        name: { en: "Raw Green Mango slices", hi: "कच्चे आम की फांकें", te: "పచ్చి మామిడికాయ ముక్కలు" },
        quantity: "4-5 slices"
      },
      {
        name: { en: "Curry Leaves & Mustard Seeds", hi: "कढ़ी पत्ता और राई", te: "కరివేపాకు మరియు ఆవాలు" },
        quantity: "2 sprigs"
      }
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: {
          en: "Rub fish steaks with turmeric and sea salt. In a wide clay pot (Matti Kunda), heat groundnut oil, splutter mustard seeds, cumin, fenugreek, and lots of curry leaves.",
          hi: "मछली पर हल्दी और नमक लगाएं। मिट्टी की हांडी में मूंगफली का तेल गरम करके राई, जीरा, मेथी और कढ़ी पत्ता चटकाएं।",
          te: "చేప ముక్కలకు పసుపు, ఉప్పు పట్టించండి. మట్టిపాత్రలో నూనె వేడిచేసి ఆవాలు, జీలకర్ర, మెంతులు, కరివేపాకు తాలింపు పెట్టండి."
        },
        timerMinutes: 4
      },
      {
        stepNumber: 2,
        instruction: {
          en: "Add chopped onions, slit green chilies, and ginger-garlic paste. Sauté until golden brown, then add red chili powder, coriander powder, and extracted tamarind water.",
          hi: "प्याज, हरी मिर्च और अदरक-लहसुन भूनें। लाल मिर्च पाउडर और इमली का रस डालकर उबाल आने दें।",
          te: "ఉల్లిపాయలు, పచ్చిమిర్చి, అల్లం వెల్లుల్లి పేస్ట్ వేయించి, కారం, ధనియాల పొడి మరియు చింతపండు పులుసు పోసి మరగనివ్వండి."
        },
        timerMinutes: 8
      },
      {
        stepNumber: 3,
        instruction: {
          en: "Gently arrange the fish steaks and raw mango slices in a single layer into the boiling gravy. Do not stir with a ladle; swirl the pot gently with two kitchen cloths.",
          hi: "मछली के टुकड़े और कच्चे आम के टुकड़े आराम से डालें। कलछी से न चलाएं, बर्तन को पकड़कर घुमाएं।",
          te: "మరుగుతున్న పులుసులో చేప ముక్కలు, మామిడికాయ ముక్కలను నెమ్మదిగా వేయండి. గరిటె పెట్టకుండా పాత్రను గుడ్డతో పట్టుకుని తిప్పండి."
        },
        tip: {
          en: "Never use a spoon to stir fish after adding; swirling the earthen pot preserves delicate steaks.",
          hi: "मछली डालने के बाद चम्मच न लगाएं ताकि टुकड़े टूटे नहीं।",
          te: "చేప ముక్కలు విరగకుండా ఉండాలంటే గరిటె పెట్టకూడదు, గిన్నెను మాత్రమే అటూ ఇటూ కదపాలి."
        },
        timerMinutes: 10
      },
      {
        stepNumber: 4,
        instruction: {
          en: "Sprinkle the roasted fenugreek-mustard powder and fresh coriander. Simmer on low flame until oil floats on top.",
          hi: "भुना मेथी-राई पाउडर और हरा धनिया छिड़कें। तेल ऊपर तैरने तक धीमी आंच पर पकाएं।",
          te: "చివరగా మెంతి-ఆవాల పొడి, కొత్తిమీర చల్లి నూనె పైకి తేలే వరకు సన్నని సెగపై ఉంచండి."
        },
        timerMinutes: 5
      }
    ],
    traditionalTip: {
      en: "Chepala Pulusu prepared in a clay pot tastes heavenly after 12-24 hours when the fish absorbs the tanginess deeply into its marrow.",
      hi: "मिट्टी के बर्तन में बनी यह कढ़ी 24 घंटे बाद खाने पर अमृत जैसी लगती है।",
      te: "మట్టి పాత్రలో వండిన చేపల పులుసు మరుసటి రోజుకి తింటే ముక్కలకు పులుపు, కారం పట్టి అమృతంలా ఉంటుంది."
    },
    isFavorite: false,
    createdAt: "2026-01-15T09:00:00Z"
  },
  {
    id: "crispy-masala-dosa",
    title: {
      en: "Crispy Mysore Masala Dosa",
      hi: "कुरकुरी मैसूर मसाला डोसा",
      te: "కరకరలాడే మైసూర్ మసాలా దోశ"
    },
    description: {
      en: "Golden crispy fermented crepe smeared with fiery red garlic chutney, stuffed with spiced potato mash, and roasted with aromatic country butter (Benne).",
      hi: "सुनहरा और कुरकुरा डोसा जिस पर तीखी लाल लहसुन की चटनी लगाई जाती है और सुगंधित मक्खन में आलू मसाले के साथ सेंका जाता है।",
      te: "బంగారు వర్ణంలో కరకరలాడే దోశ! లోపల ఘాటైన ఎర్ర కారం చట్నీ, ఆలూ మసాలా కూర, స్వచ్ఛమైన వెన్నతో కాల్చే మైసూర్ రాజసపు రుచి."
    },
    category: "breakfast",
    cuisine: "Karnataka",
    diet: "veg",
    prepTimeMinutes: 30,
    cookTimeMinutes: 15,
    servings: 4,
    caloriesPerServing: 280,
    spiceLevel: "medium",
    imageUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      {
        name: { en: "Naturally fermented Dosa Batter (Idli rice + Urad dal + Poha + Fenugreek)", hi: "किण्वित डोसा घोल", te: "పులియబెట్టిన సాంప్రదాయ దోశ పిండి" },
        quantity: "4 cups"
      },
      {
        name: { en: "Boiled and lightly mashed Potatoes", hi: "उबले और मसले हुए आलू", te: "ఉడికించి చిదిమిన బంగాళాదుంపలు" },
        quantity: "4 large"
      },
      {
        name: { en: "Mysore Spicy Red Garlic Chutney", hi: "मैसूर लाल लहसुन चटनी", te: "మైసూర్ ఎర్ర కారం చట్నీ" },
        quantity: "1/2 cup"
      },
      {
        name: { en: "White Country Butter (Benne) or Ghee", hi: "सफेद मक्खन या देशी घी", te: "వెన్న లేదా నెయ్యి" },
        quantity: "4 tbsp"
      },
      {
        name: { en: "Mustard seeds, Chana dal, Curry leaves, Ginger, Green chilies", hi: "तड़के का सामान", te: "తాలింపు దినుసులు, అల్లం, పచ్చిమిర్చి" },
        quantity: "2 tbsp"
      }
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: {
          en: "Prepare the potato bhaji: Heat oil, add mustard seeds, chana dal, sliced onions, ginger, green chilies, turmeric, and curry leaves. Fold in boiled potatoes and salt with a splash of water.",
          hi: "आलू भाजी तैयार करें: तेल में राई, चना दाल, प्याज, अदरक, हरी मिर्च और हल्दी भूनें। मसले हुए आलू मिलाकर 5 मिनट पकाएं।",
          te: "బాణలిలో తాలింపు పెట్టి ఉల్లిపాయలు, పచ్చిమిర్చి, అల్లం, పసుపు వేయించి, బంగాళాదుంపలు, ఉప్పు వేసి కలిపి ఆలూ కూర చేయండి."
        },
        timerMinutes: 7
      },
      {
        stepNumber: 2,
        instruction: {
          en: "Heat a heavy cast-iron tawa until smoking hot. Sprinkle water drops to sizzle and regulate heat. Pour a ladle of batter and swirl thinly in concentric circles from center outwards.",
          hi: "लोहे के तवे को गरम करें। पानी छिड़ककर तापमान संतुलित करें। घोल डालकर बीच से गोल-गोल फैलाएं।",
          te: "ఇనుప పెనం బాగా వేడిచేసి, నీటి తుంపర్లు చల్లండి. గరిటెడు పిండి వేసి మధ్య నుండి గుండ్రంగా పలుచగా తిప్పండి."
        },
        timerMinutes: 2
      },
      {
        stepNumber: 3,
        instruction: {
          en: "Drizzle white butter around the edges. Smeared 1 tbsp of fiery red garlic chutney over the inner surface of the roasting dosa.",
          hi: "किनारों पर मक्खन डालें। डोसे की ऊपरी सतह पर 1 चम्मच तीखी लाल चटनी फैलाएं।",
          te: "అంచుల వెంట వెన్న లేదా నెయ్యి వేసి, దోశపై చెంచాడు ఎర్ర కారం చట్నీని సమానంగా రాయండి."
        },
        timerMinutes: 3
      },
      {
        stepNumber: 4,
        instruction: {
          en: "Place a scoop of spiced potato bhaji in the middle. When bottom is golden-brown and ultra-crisp, fold like an envelope and serve immediately with fresh coconut chutney.",
          hi: "बीच में आलू मसाला रखें। नीचे से सुनहरा और क्रिस्पी होने पर मोड़ें और ताज़ी नारियल चटनी व सांबर के साथ परोसें।",
          te: "మధ్యలో ఆలూ కూర ఉంచి, కింద ఎర్రగా కరకరలాడే వరకు కాల్చి మడతపెట్టండి. కొబ్బరి చట్నీ మరియు సాంబారుతో వడ్డించండి."
        },
        timerMinutes: 2
      }
    ],
    traditionalTip: {
      en: "Adding a handful of beaten rice (poha) and a pinch of methi while soaking rice creates that signature Mysore restaurant crunch and deep golden color.",
      hi: "दाल-चावल भिगोते समय थोड़ा पोहा और मेथी दाना डालने से डोसा बहुत कुरकुरा बनता है।",
      te: "పిండి రుబ్బేటప్పుడు కొద్దిగా అటుకులు, మెంతులు కలిపితే దోశ మంచి బంగారు రంగులో కరకరలాడుతూ వస్తుంది."
    },
    isFavorite: true,
    createdAt: "2026-01-18T07:30:00Z"
  },
  {
    id: "punjabi-dal-makhani",
    title: {
      en: "Authentic Punjabi Dal Makhani",
      hi: "असली पंजाबी दाल मखनी",
      te: "సాంప్రదాయ పంజాబీ దాల్ మఖానీ"
    },
    description: {
      en: "Slow-cooked overnight black urad lentils and kidney beans simmered with rich Kashmiri chilies, ripe tomatoes, dollops of white butter, and fresh cream.",
      hi: "रात भर धीमी आंच पर पकने वाली काली उड़द और राजमा की मखमली दाल, जिसमें टमाटर प्यूरी, सफेद मक्खन और ताज़ी मलाई का भरपूर स्वाद होता है।",
      te: "రాత్రంతా నిదానంగా ఉడికించిన నల్ల మినుములు మరియు రాజ్మా! కశ్మీరీ కారం, టొమాటో ప్యూరీ, వెన్న మరియు క్రీమ్‌తో చేసే రిచ్ పంజాబీ వంటకం."
    },
    category: "dal",
    cuisine: "Punjab & North",
    diet: "veg",
    prepTimeMinutes: 480, // Overnight soak
    cookTimeMinutes: 60,
    servings: 5,
    caloriesPerServing: 360,
    spiceLevel: "mild",
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      {
        name: { en: "Whole Black Urad Dal (Sabut Urad)", hi: "साबुत काली उड़द दाल", te: "పొట్టు మినప గుండ్లు" },
        quantity: "1.5 cups"
      },
      {
        name: { en: "Rajma (Red Kidney Beans)", hi: "कश्मीरी राजमा", te: "ఎర్ర రాజ్మా గింజలు" },
        quantity: "1/4 cup"
      },
      {
        name: { en: "Fresh Tomato Puree", hi: "ताज़ी टमाटर प्यूरी", te: "తాజా టొమాటో ప్యూరీ" },
        quantity: "2 cups"
      },
      {
        name: { en: "Salt-free White Butter (Makhan)", hi: "सफेद मक्खन", te: "తెల్ల వెన్న" },
        quantity: "4 tbsp"
      },
      {
        name: { en: "Heavy Fresh Malai / Cream", hi: "ताज़ी मलाई या क्रीम", te: "తాజా మీగడ / క్రీమ్" },
        quantity: "1/3 cup"
      },
      {
        name: { en: "Kashmiri Degi Mirch powder", hi: "कश्मीरी देगी मिर्च", te: "కశ్మీరీ ఎర్ర కారం పొడి" },
        quantity: "2 tbsp"
      },
      {
        name: { en: "Kasuri Methi (crushed)", hi: "भुनी कसूरी मेथी", te: "కసూరి మేథి" },
        quantity: "1 tbsp"
      }
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: {
          en: "Soak black lentils and rajma for at least 8 to 10 hours. Wash 4-5 times rubbing between palms until wash water is clear.",
          hi: "उड़द और राजमा को 8-10 घंटे भिगोएं। हथेलियों से रगड़कर 4-5 बार धोएं ताकि कालापन निकल जाए।",
          te: "మినుములు, రాజ్మాలను 8 గంటలు నానబెట్టి, చేతులతో రుద్దుతూ 4 సార్లు శుభ్రంగా కడగాలి."
        },
        timerMinutes: 10
      },
      {
        stepNumber: 2,
        instruction: {
          en: "Pressure cook with 5 cups water, black cardamom, salt, and degi mirch for 8 whistles until lentils mash effortlessly between fingers.",
          hi: "कुकर में बड़ी इलायची, नमक और कश्मीरी मिर्च डालकर 8 सीटी आने तक अच्छी तरह उबालें।",
          te: "కుక్కర్‌లో పెద్ద యాలక్కాయ, ఉప్పు, కారం వేసి పప్పు మెత్తగా అయ్యే వరకు 8 విజిల్స్ వచ్చేలా ఉడికించండి."
        },
        timerMinutes: 25
      },
      {
        stepNumber: 3,
        instruction: {
          en: "In a thick pot, cook tomato puree with ginger-garlic paste and degi mirch in 2 tbsp butter until fat separates. Add boiled dal with its liquor.",
          hi: "बर्तन में 2 चम्मच मक्खन डालकर टमाटर प्यूरी, अदरक-लहसुन भूनें। उबली दाल पानी सहित मिलाएं।",
          te: "పాత్రలో వెన్న వేసి టొమాటో ప్యూరీ, అల్లం-వెల్లుల్లి పేస్ట్ వేయించి, ఉడికించిన పప్పును కలపండి."
        },
        timerMinutes: 12
      },
      {
        stepNumber: 4,
        instruction: {
          en: "Simmer on low flame for 45 minutes, mashing periodically with back of the ladle. Finish with remaining butter, fresh cream, and crushed toasted kasuri methi.",
          hi: "धीमी आंच पर 45 मिनट तक कढ़ने दें। अंत में बाकी मक्खन, मलाई और भुनी कसूरी मेथी डालकर गरमा-गरम नान के साथ परोसें।",
          te: "సన్నని సెగపై 45 నిమిషాలు ఉడికిస్తూ గరిటెతో మెదపండి. చివరగా మిగిలిన వెన్న, మీగడ, కసూరి మేథి వేసి బటర్‌నాన్‌తో వడ్డించండి."
        },
        timerMinutes: 45
      }
    ],
    traditionalTip: {
      en: "Dal Makhani gets its legendary creamy texture not from cream alone, but from slow simmering for hours where the starch dissolves naturally into the butter.",
      hi: "दाल मखनी की मखमली बनावट घंटों धीमी आंच पर पकने से आती है, केवल मलाई से नहीं।",
      te: "దాల్ మఖానీ చిక్కదనం క్రీమ్ వల్ల మాత్రమే కాదు, సన్నని మంటపై నిదానంగా ఉడకడం వల్ల వస్తుంది."
    },
    isFavorite: false,
    createdAt: "2026-01-20T11:00:00Z"
  },
  {
    id: "sarson-ka-saag",
    title: {
      en: "Sarson Ka Saag with Makki Roti",
      hi: "सरसों का साग और मक्की की रोटी",
      te: "పంజాబీ సర్సోం కా సాగ్ & మక్క రొట్టె"
    },
    description: {
      en: "Winter heritage of the Punjab fields. Mustard greens simmered with bathua and spinach, coarsely churned with maize flour (makki atta), crowned with home-churned white butter.",
      hi: "पंजाब के खेतों का शीतकालीन उपहार। सरसों, बथुआ और पालक का धीमा पका साग, मक्के के आटे के आलन और ताज़े सफेद मक्खन के साथ।",
      te: "పంజాబ్ పల్లెల శీతాకాల సాంప్రదాయ వంటకం! ఆవ ఆకులు, పాలకూర, బతువా ఆకులను ఉడికించి మక్క పిండితో కలిపి, వెన్నతో వడ్డించే అద్భుతమైన సాగ్."
    },
    category: "curry",
    cuisine: "Punjab & North",
    diet: "veg",
    prepTimeMinutes: 25,
    cookTimeMinutes: 40,
    servings: 4,
    caloriesPerServing: 240,
    spiceLevel: "medium",
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      {
        name: { en: "Tender Mustard Leaves (Sarson)", hi: "सरसों के ताज़े पत्ते", te: "తాజా ఆవ ఆకులు (సర్సోం)" },
        quantity: "500g"
      },
      {
        name: { en: "Bathua leaves (Chenopodium) & Spinach", hi: "बथुआ और पालक के पत्ते", te: "బతువా మరియు పాలకూర ఆకులు" },
        quantity: "250g"
      },
      {
        name: { en: "Maize Flour (Makki Ka Atta)", hi: "मक्के का आटा (आलन के लिए)", te: "మొక్కజొన్న పిండి" },
        quantity: "3 tbsp"
      },
      {
        name: { en: "Green chilies, Ginger, Garlic", hi: "हरी मिर्च, अदरक, लहसुन", te: "పచ్చిమిర్చి, అల్లం, వెల్లుల్లి" },
        quantity: "Generous amount (3 tbsp minced)"
      },
      {
        name: { en: "Desi Ghee and White Butter", hi: "देशी घी और सफेद मक्खन", te: "దేశీ నెయ్యి మరియు తెల్ల వెన్న" },
        quantity: "4 tbsp"
      }
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: {
          en: "Chop greens roughly. Pressure cook with ginger, garlic, green chilies, and salt in 1 cup water for 2-3 whistles until completely soft.",
          hi: "साग को काटकर अदरक, लहसुन, हरी मिर्च और नमक के साथ कुकर में 2-3 सीटी आने तक पकाएं।",
          te: "ఆకుకూరలను తరిగి అల్లం, వెల్లుల్లి, పచ్చిమిర్చి, ఉప్పు వేసి కుక్కర్‌లో 2-3 విజిల్స్ వచ్చేలా మెత్తగా ఉడికించండి."
        },
        timerMinutes: 15
      },
      {
        stepNumber: 2,
        instruction: {
          en: "Use a traditional wooden churner (Madani) to mash the greens coarsely. Whisk maize flour in warm water and stir into the saag (this creates the binding 'aalan').",
          hi: "पारंपरिक मथानी (मदानी) से साग को घोंटें। मक्के के आटे का घोल बनाकर साग में मिलाएं।",
          te: "చెక్క కవ్వంతో ఆకులను మెదపండి. కొద్దిగా మొక్కజొన్న పిండిని నీళ్లలో కలిపి సాగ్‌లో వేసి తిప్పండి."
        },
        timerMinutes: 8
      },
      {
        stepNumber: 3,
        instruction: {
          en: "Simmer the churned greens on low flame for 20 minutes with occasional stirring until thick and earthy.",
          hi: "धीमी आंच पर 20 मिनट तक पकाएं जब तक कि साग गाढ़ा और स्वादिष्ट न हो जाए।",
          te: "సన్నని సెగపై 20 నిమిషాలు ఉడికించి మంచి సువాసన వచ్చేలా చిక్కబడనివ్వండి."
        },
        timerMinutes: 20
      },
      {
        stepNumber: 4,
        instruction: {
          en: "Prepare tadka: Heat ghee, fry lots of chopped garlic, dry red chilies, and onions until dark golden. Pour sizzling tadka over the saag. Serve with hot Makki Ki Roti and jaggery.",
          hi: "घी में लहसुन, सूखी लाल मिर्च और प्याज का तड़का लगाएं। ऊपर सफेद मक्खन, मक्की की रोटी और गुड़ के साथ परोसें।",
          te: "నెయ్యిలో వెల్లుల్లి, ఎండుమిర్చి, ఉల్లిపాయల తాలింపు పెట్టి సాగ్‌పై పోయండి. వేడి మక్క రొట్టె, బెల్లంతో వడ్డించండి."
        },
        timerMinutes: 6
      }
    ],
    traditionalTip: {
      en: "Never skip the Bathua leaves! They cut through the natural bitterness of mustard leaves and provide that velvety smoothness.",
      hi: "बथुआ पत्ता कभी न छोड़ें, यह सरसों के कड़वेपन को संतुलित कर मखमली स्वाद देता है।",
      te: "ఆవ ఆకుల చేదును తగ్గించి సాగ్‌కు మంచి జిగురు, రుచి ఇవ్వడానికి బతువా ఆకులు చాలా ముఖ్యం."
    },
    isFavorite: false,
    createdAt: "2026-01-22T08:00:00Z"
  },
  {
    id: "temple-pulihora",
    title: {
      en: "Traditional Temple Pulihora (Tamarind Rice)",
      hi: "मंदिर शैली पुलिहोरा (इमली चावल)",
      te: "గుడి ప్రసాదం లాంటి సాంప్రదాయ పులిహోర"
    },
    description: {
      en: "Sacred South Indian temple prasadam. Steamed rice tempered with roasted mustard, peanuts, chana dal, curry leaves, and seasoned with slow-simmered tamarind pulp with turmeric and hing.",
      hi: "दक्षिण भारतीय मंदिरों का पवित्र प्रसाद। भुनी मूंगफली, चना दाल, कढ़ी पत्ता और हिंग-हल्दी वाली इमली की गाढ़ी चटनी से तैयार सुगंधित चावल।",
      te: "దేవాలయాలలో పెట్టే పవిత్ర ప్రసాదపు పులిహోర! ఆవాలు, వేరుశెనగ గుండ్లు, శనగపప్పు, ఇంగువ, పసుపు మరియు చిక్కని చింతపండు గుజ్జుతో కలిపే అద్భుతమైన రుచి."
    },
    category: "rice",
    cuisine: "Andhra & Telangana",
    diet: "veg",
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    servings: 5,
    caloriesPerServing: 310,
    spiceLevel: "medium",
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      {
        name: { en: "Sona Masoori Rice (grain cooked separately)", hi: "सोना मसूरी चावल", te: "సోనా మసూరి బియ్యం (పొడిపొడిగా ఉడికించినది)" },
        quantity: "2.5 cups"
      },
      {
        name: { en: "Thick Tamarind Pulp", hi: "गाढ़ा इमली का गूदा", te: "చిక్కటి చింతపండు గుజ్జు" },
        quantity: "1 cup"
      },
      {
        name: { en: "Raw Peanuts (Pallilu)", hi: "कच्ची मूंगफली", te: "పల్లీలు (వేరుశెనగ గుండ్లు)" },
        quantity: "1/2 cup"
      },
      {
        name: { en: "Mustard, Cumin, Chana Dal, Urad Dal", hi: "राई, जीरा, चना दाल, उड़द दाल", te: "ఆవాలు, జీలకర్ర, శనగపప్పు, మినపప్పు" },
        quantity: "3 tbsp"
      },
      {
        name: { en: "Slit Green & Dry Red Chilies", hi: "हरी और सूखी लाल मिर्च", te: "పచ్చిమిర్చి, ఎండుమిరపకాయలు" },
        quantity: "8 pcs"
      },
      {
        name: { en: "Pure Asafoetida (Hing) & Turmeric", hi: "हींग और हल्दी", te: "మంచి ఇంగువ మరియు పసుపు" },
        quantity: "1 tsp each"
      },
      {
        name: { en: "Sesame Oil", hi: "तिल का तेल", te: "నువ్వుల నూనె" },
        quantity: "4 tbsp"
      }
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: {
          en: "Cook rice so each grain remains separate. Spread hot rice on a wide plate, drizzle 1 tbsp raw sesame oil, turmeric, and fresh curry leaves over it. Do not mix yet.",
          hi: "चावल को खिला-खिला पकाएं। परात में फैलाकर ऊपर 1 चम्मच तिल का तेल, हल्दी और कढ़ी पत्ता डालें।",
          te: "అన్నాన్ని పొడిపొడిగా వండి వెడల్పాటి తాంబాలంలో పరచి, వేడి మీదే చెంచాడు నువ్వుల నూనె, పసుపు, కరివేపాకు వేయండి."
        },
        timerMinutes: 12
      },
      {
        stepNumber: 2,
        instruction: {
          en: "In a pan, simmer tamarind pulp with turmeric, salt, slit green chilies, and a tiny piece of jaggery until thick paste (Pulihora paste) that releases oil.",
          hi: "इमली के गूदे में नमक, हल्दी, हरी मिर्च और थोड़ा गुड़ डालकर तेल छूटने तक गाढ़ा पकाएं।",
          te: "బాణలిలో చింతపండు గుజ్జు, ఉప్పు, పచ్చిమిర్చి, చిటికెడు బెల్లం వేసి నూనె పైకి తేలే వరకు చిక్కగా ఉడికించండి."
        },
        timerMinutes: 10
      },
      {
        stepNumber: 3,
        instruction: {
          en: "Prepare divine tempering: Heat remaining sesame oil, fry peanuts until crunchy, then add chana dal, urad dal, mustard seeds, dry red chilies, and generous hing.",
          hi: "तड़का तैयार करें: तेल में मूंगफली कुरकुरी भूनें, फिर दालें, राई, लाल मिर्च और भरपूर हींग डालें।",
          te: "నూనెలో పల్లీలు దోరగా వేయించి, శనగపప్పు, మినపప్పు, ఆవాలు, ఎండుమిర్చి, ఇంగువతో ఘుమఘుమలాడే తాలింపు పెట్టండి."
        },
        timerMinutes: 5
      },
      {
        stepNumber: 4,
        instruction: {
          en: "Mix cooked tamarind paste into the cooled rice first, then pour the hot crunchy tempering over it. Mix gently with fingers from bottom to top.",
          hi: "चावल में पहले इमली का पेस्ट मिलाएं, फिर गरमा-गरम तड़का डालकर हल्के हाथों से मिलाएं।",
          te: "అన్నంలో ముందుగా చింతపండు గుజ్జును కలిపి, తర్వాత కరకరలాడే తాలింపు వేసి నెమ్మదిగా కలపండి."
        },
        timerMinutes: 4
      }
    ],
    traditionalTip: {
      en: "A tiny pinch of roasted fenugreek-mustard powder and raw sesame oil on hot rice gives that unforgettable Tirupati temple prasadam aroma.",
      hi: "गरम चावल पर कच्चा तिल का तेल और भुनी मेथी का पाउडर डालने से तिरुपति मंदिर जैसा स्वाद आता है।",
      te: "వేడి అన్నంపై నువ్వుల నూనె, చిటికెడు ఆవ-మెంతి పొడి వేస్తే అచ్చం తిరుపతి లడ్డూ ప్రసాదంలాంటి సువాసన వస్తుంది."
    },
    isFavorite: false,
    createdAt: "2026-01-25T14:00:00Z"
  },
  {
    id: "royal-mysore-pak",
    title: {
      en: "Royal Ghee Mysore Pak",
      hi: "शाही घी मैसूर पाक",
      te: "నోరూరించే నెయ్యి మైసూర్ పాక్"
    },
    description: {
      en: "The historic royal sweet born in the royal kitchen of Mysore Palace. Fragrant roasted gram flour (besan) cooked in bubbling sugar syrup and copious amounts of pure melted ghee.",
      hi: "मैसूर महल की शाही रसोई में जन्मी ऐतिहासिक मिठाई। भुना बेसन, चाशनी और देशी घी के अद्भुत मेल से बनी मुंह में घुल जाने वाली मिठाई।",
      te: "మైసూర్ ప్యాలెస్ రాజభవనంలో పుట్టిన అద్భుతమైన మిఠాయి! స్వచ్ఛమైన నెయ్యి, వేయించిన శనగపిండి మరియు తీపి పాకంతో నోట్లో వేస్తే కరిగిపోయే మధురం."
    },
    category: "sweets",
    cuisine: "Karnataka",
    diet: "veg",
    prepTimeMinutes: 10,
    cookTimeMinutes: 25,
    servings: 12,
    caloriesPerServing: 220,
    spiceLevel: "mild",
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      {
        name: { en: "Fine Gram Flour (Besan / Senagapindi), sieved twice", hi: "छना हुआ महीन बेसन", te: "జల్లించిన శనగపిండి" },
        quantity: "1 cup / 125g"
      },
      {
        name: { en: "Pure Desi Ghee, warm and melted", hi: "पिघला हुआ शुद्ध देशी घी", te: "స్వచ్ఛమైన వేడి నెయ్యి" },
        quantity: "1.5 cups / 300g"
      },
      {
        name: { en: "Granulated Sugar", hi: "चीनी", te: "చక్కెర" },
        quantity: "1.5 cups"
      },
      {
        name: { en: "Water", hi: "पानी", te: "నీళ్లు" },
        quantity: "1/2 cup"
      },
      {
        name: { en: "Green Cardamom powder", hi: "इलायची पाउडर", te: "యాలకుల పొడి" },
        quantity: "1/2 tsp"
      }
    ],
    instructions: [
      {
        stepNumber: 1,
        instruction: {
          en: "Mix 1/2 cup warm ghee into the sieved besan to make a smooth, lump-free batter. Keep remaining 1 cup ghee simmering on another burner on very low heat.",
          hi: "आधा कप गुनगुने घी में बेसन मिलाकर चिकना घोल बनाएं। बाकी घी को दूसरे चूल्हे पर धीमी आंच पर गरम रखें।",
          te: "అరకప్పు వేడి నెయ్యిలో శనగపిండి వేసి ఉండలు లేకుండా కలపండి. మిగిలిన నెయ్యిని పక్క పొయ్యిపై తక్కువ మంట మీద వేడిగా ఉంచండి."
        },
        timerMinutes: 5
      },
      {
        stepNumber: 2,
        instruction: {
          en: "In a heavy pan, boil sugar and water to 1-string consistency (drop feels sticky and forms a single thread between thumb and index finger).",
          hi: "कड़ाही में चीनी और पानी की एक तार की चाशनी बनाएं।",
          te: "మందపాటి పాత్రలో చక్కెర, నీళ్లు పోసి ఒక తీగ పాకం వచ్చే వరకు మరిగించండి."
        },
        timerMinutes: 7
      },
      {
        stepNumber: 3,
        instruction: {
          en: "Pour besan-ghee mixture into syrup while stirring continuously on medium flame. Gradually add hot simmering ghee, one ladle at a time, letting the batter absorb each ladle.",
          hi: "चाशनी में बेसन का घोल डालें और लगातार चलाएं। एक-एक कलछी गरम घी डालते रहें।",
          te: "పాకంలో శనగపిండి మిశ్రమాన్ని వేసి కలుపుతూ ఉండండి. వేడి నెయ్యిని గరిటెతో కొద్దికొద్దిగా పోస్తూ కలపండి."
        },
        timerMinutes: 10
      },
      {
        stepNumber: 4,
        instruction: {
          en: "When the mixture turns frothy, airy, and leaves the sides of the pan with honeycomb bubbles, immediately pour into a greased tray. Cut into diamond pieces after 10 mins.",
          hi: "जब मिश्रण झागदार होकर कड़ाही के किनारे छोड़ने लगे, तुरंत घी लगी थाली में पलटें। 10 मिनट बाद चौकोर काटें।",
          te: "మిశ్రమం నురగలు కక్కుతూ పాత్ర నుండి వేరవుతున్నప్పుడు నెయ్యి రాసిన ట్రేలో పోయండి. 10 నిమిషాల తర్వాత ముక్కలుగా కోయండి."
        },
        timerMinutes: 4
      }
    ],
    traditionalTip: {
      en: "The ghee added during cooking must be steaming hot; hot ghee hitting the besan causes the honeycomb aerated holes inside classic Mysore Pak.",
      hi: "डालते समय घी हमेशा गर्म होना चाहिए, तभी जालीदार मैसूर पाक बनता है।",
      te: "పోసేటప్పుడు నెయ్యి బాగా వేడిగా ఉండాలి, అప్పుడే మైసూర్ పాక్ లోపల రంధ్రాలు ఏర్పడి గుల్లగా వస్తుంది."
    },
    isFavorite: false,
    createdAt: "2026-01-28T16:00:00Z"
  }
];
