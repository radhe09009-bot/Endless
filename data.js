/**
 * LeafSense — Master Agricultural Data & Multilingual Catalog
 * Part B & C Implementation
 */

const LEAFSENSE_DATA = {
  // Multilingual Strings (English, Hindi, Gujarati)
  i18n: {
    en: {
      appName: "LeafSense",
      tagline: "Edge AI Leaf Disease & Localized Pest Forecaster",
      offlineReady: "Offline AI Ready",
      launchPWA: "Launch Field PWA",
      exploreForecast: "7-Day Outbreak Radar",
      officerDashboard: "Extension Officer Hub",
      scanTab: "Scan",
      forecastTab: "Forecast",
      fieldsTab: "My Fields",
      alertsTab: "Alerts",
      viewfinderHint: "Hold steady • Fill frame with single leaf",
      scanButton: "Diagnose Leaf",
      analyzingText: "Running MobileNetV3 INT8 on-device...",
      confidenceLabel: "Calibrated Confidence",
      gradCamToggle: "Grad-CAM Attention Heatmap",
      listenVoice: "Listen Advisory (Audio)",
      ipmTitle: "Actionable 3-Step IPM Advisory",
      culturalStep: "1. Cultural & Sanitation Control",
      organicStep: "2. Biological & Organic Remedy",
      chemicalStep: "3. Targeted Chemical (Last Resort)",
      saveFieldLog: "Save to Field Log",
      reportVillage: "Anonymized Village Sync (1km²)",
      askExpert: "Escalate to Agri-Officer",
      whyTitle: "Epidemiological Drivers (SHAP Attribution)",
      timeScrubberLabel: "Forecast Horizon: Day",
      outbreakSimBtn: "Simulate Outbreak Infection in Cell #gh7-4b2",
      activeScansKPI: "Active Village Scans",
      hotspotsKPI: "Regional Hotspot Clusters",
      misuseKPI: "Pesticide Misuse Averted",
      modelOTA: "Edge Model Version"
    },
    hi: {
      appName: "लीफ़सेंस",
      tagline: "ऑन-डिवाइस पत्ती रोग पहचान एवं 7-दिवसीय स्थानीय कीट पूर्वानुमान",
      offlineReady: "ऑफ़लाइन AI तैयार",
      launchPWA: "फील्ड ऐप शुरू करें",
      exploreForecast: "7-दिवसीय प्रकोप रडार",
      officerDashboard: "कृषि अधिकारी केंद्र",
      scanTab: "जांचें",
      forecastTab: "पूर्वानुमान",
      fieldsTab: "मेरे खेत",
      alertsTab: "चेतावनी",
      viewfinderHint: "कैमरा स्थिर रखें • पत्ती को फ्रेम में भरें",
      scanButton: "पत्ती की जांच करें",
      analyzingText: "डिवाइस पर AI मॉडल चल रहा है...",
      confidenceLabel: "सटीकता विश्वास",
      gradCamToggle: "रोग ध्यान हीटमैप (Grad-CAM)",
      listenVoice: "सलाह सुनें (ऑडियो)",
      ipmTitle: "एकीकृत कीट प्रबंधन (IPM) 3-चरणीय सलाह",
      culturalStep: "1. जैविक एवं सफाई नियंत्रण",
      organicStep: "2. प्राकृतिक एवं जैविक उपाय",
      chemicalStep: "3. लक्षित रासायनिक उपचार (अंतिम उपाय)",
      saveFieldLog: "खेत डायरी में सुरक्षित करें",
      reportVillage: "गांव रडार पर गुमनाम रिपोर्ट भेजें",
      askExpert: "कृषि विशेषज्ञ से बात करें",
      whyTitle: "रोग बढ़ने के मुख्य मौसम कारण (SHAP)",
      timeScrubberLabel: "पूर्वानुमान दिन: दिन",
      outbreakSimBtn: "सेल #gh7-4b2 में संक्रमण का सिमुलेशन करें",
      activeScansKPI: "सक्रिय गांव स्कैन",
      hotspotsKPI: "सक्रिय रोग क्लस्टर",
      misuseKPI: "दवा का अनावश्यक छिड़काव रोका",
      modelOTA: "एज मॉडल संस्करण"
    },
    gu: {
      appName: "લીફસેન્સ",
      tagline: "ઓન-ડિવાઇસ પાંદડા રોગ નિદાન અને 7-દિવસીય સ્થાનિક ઉપદ્રવ આગાહી",
      offlineReady: "ઓફલાઇન AI સજ્જ",
      launchPWA: "ખેડૂત એપ શરૂ કરો",
      exploreForecast: "7-દિવસીય ઉપદ્રવ રડાર",
      officerDashboard: "વિસ્તરણ અધિકારી હબ",
      scanTab: "સ્કેન",
      forecastTab: "આગાહી",
      fieldsTab: "મારા ખેતર",
      alertsTab: "ચેતવણીઓ",
      viewfinderHint: "કેમેરો સ્થિર રાખો • એક પાંદડું ફ્રેમમાં લાવો",
      scanButton: "પાંદડું તપાસો",
      analyzingText: "મોબાઇલમાં AI મોડલ ચાલી રહ્યું છે...",
      confidenceLabel: "ચોક્કસ વિશ્વસનીયતા",
      gradCamToggle: "રોગ ધ્યાન હીટમેપ (Grad-CAM)",
      listenVoice: "સલાહ સાંભળો (ઓડિયો)",
      ipmTitle: "સંકલિત જીવાત વ્યવસ્થાપન (IPM) 3-પગલાંની સલાહ",
      culturalStep: "1. સફાઈ અને માવજત નિયંત્રણ",
      organicStep: "2. દેશી / જૈવિક ઉપચાર",
      chemicalStep: "3. રસાયણિક છંટકાવ (છેલ્લો ઉપાય)",
      saveFieldLog: "ખેત નોંધમાં સાચવો",
      reportVillage: "ગામ રડાર પર ગુપ્ત માહિતી મોકલો",
      askExpert: "કૃષિ નિષ્ણાતનો સંપર્ક કરો",
      whyTitle: "હવામાન અને રોગ ફેલાવાના મુખ્ય કારણો",
      timeScrubberLabel: "આગાહી સમય: દિવસ",
      outbreakSimBtn: "સેલ #gh7-4b2 માં ચેપ સિમ્યુલેટ કરો",
      activeScansKPI: "ગામમાં કુલ સ્કેન",
      hotspotsKPI: "સક્રિય રોગ ક્લસ્ટર",
      misuseKPI: "દવાઓનો બિનજરૂરી બગાડ અટક્યો",
      modelOTA: "એજ મોડલ વર્ઝન"
    }
  },

  // Disease Knowledge Base with 3-Tier IPM Hierarchies
  diseases: {
    tomato_early_blight: {
      id: "tomato_early_blight",
      names: {
        en: "Tomato Early Blight",
        hi: "टमाटर का अगेती झुलसा (अर्ली ब्लाइट)",
        gu: "ટામેટાંનો આગોતરો સુકારો (અર્લી બ્લાઇટ)"
      },
      pathogen: "Alternaria solani (Fungal)",
      crop: "Tomato (Solanum lycopersicum)",
      severity: "high",
      confidence: 0.948,
      ece: 0.032,
      gradCamHeatmap: [
        { x: 50, y: 48, r: 24, intensity: 0.95 },
        { x: 38, y: 22, r: 14, intensity: 0.78 },
        { x: 64, y: 28, r: 12, intensity: 0.65 },
        { x: 55, y: 72, r: 10, intensity: 0.60 }
      ],
      ipm: {
        cultural: {
          en: "Prune and burn lower infected foliage touching the wet soil. Avoid overhead sprinkler irrigation; switch to drip or furrow irrigation to minimize leaf wetness duration.",
          hi: "मिट्टी को छूने वाली निचली संक्रमित पत्तियों को काटकर नष्ट करें। फव्वारा सिंचाई बंद करें ताकि पत्तियां गीली न रहें।",
          gu: "જમીનને અડતા નીચેના રોગિષ્ઠ પાંદડા કાપીને બાળી નાખો. પાંદડા ભીના ન રહે તે માટે ટપક પદ્ધતિથી પાણી આપો."
        },
        organic: {
          en: "Foliar spray of Trichoderma harzianum (5g/L) or cold-pressed Neem Seed Kernel Extract (NSKE 5%) during early morning or sunset.",
          hi: "ट्राइकोडर्मा हार्ज़ियानम (5 ग्राम प्रति लीटर) अथवा नीम के तेल (5%) का छिड़काव सुबह या शाम के समय करें।",
          gu: "ટ્રાઇકોડર્મા હાર્ઝિયાનમ (૫ ગ્રામ/લિટર) અથવા લીંબોળીના તેલનો (૫%) વહેલી સવારે અથવા સાંજે છંટકાવ કરવો."
        },
        chemical: {
          en: "Apply Mancozeb 75% WP @ 2.0g/L or Azoxystrobin 23% SC @ 1.0ml/L. Observe a strict 5-day withholding harvest period.",
          hi: "मैंकोज़ेब 75% WP (2 ग्राम प्रति लीटर पानी) का छिड़काव करें। दवा छिड़कते समय मास्क पहनें और 5 दिन तक तुड़ाई न करें।",
          gu: "મેન્કોઝેબ ૭૫% WP (૨ ગ્રામ પ્રતિ લિટર પાણી) નો છંટકાવ કરવો. દવા છાંટતી વખતે માસ્ક પહેરવું અને ૫ દિવસ સુધી વીણી ન કરવી.",
          safetyNote: "Mandatory: Wear protective goggles & face mask. Keep livestock away from treated sector for 48 hours."
        }
      },
      speechText: {
        en: "Diagnosis: Tomato Early Blight with 94.8% calibrated certainty. First, remove lower yellowing leaves. Spray organic Trichoderma or Neem extract. If severe, spray Mancozeb at two grams per liter with protective mask.",
        hi: "पहचान: टमाटर का अगेती झुलसा, 94.8 प्रतिशत विश्वास। पहले मिट्टी को छूने वाली पत्तियां हटाएं। ट्राइकोडर्मा या नीम के तेल का छिड़काव करें। अधिक रोग होने पर ही मैंकोज़ेब दवा 2 ग्राम प्रति लीटर पानी में मिलाकर छिड़कें।",
        gu: "નિદાન: ટામેટાંમાં આગોતરો સુકારો, 94.8 ટકા ચોક્કસાઈ. પહેલા નીચેના બગડેલા પાંદડા કાપી લો. ટ્રાઇકોડર્મા અથવા લીંબોળીના તેલનો છંટકાવ કરો. જો રોગ વધારે હોય તો જ મેન્કોઝેબ ૨ ગ્રામ પ્રતિ લિટર પાણીમાં મેળવી માસ્ક પહેરીને છાંટો."
      }
    },

    potato_late_blight: {
      id: "potato_late_blight",
      names: {
        en: "Potato Late Blight",
        hi: "आलू का पछेती झुलसा (लेट ब्लाइट)",
        gu: "બટાટાનો પાછોતરો સુકારો (લેટ બ્લાઇટ)"
      },
      pathogen: "Phytophthora infestans (Oomycete)",
      crop: "Potato (Solanum tuberosum)",
      severity: "high",
      confidence: 0.962,
      ece: 0.028,
      gradCamHeatmap: [
        { x: 42, y: 46, r: 30, intensity: 0.98 },
        { x: 62, y: 38, r: 20, intensity: 0.82 },
        { x: 58, y: 64, r: 16, intensity: 0.74 }
      ],
      ipm: {
        cultural: {
          en: "Ensure proper earthing up to protect tubers from spores washed down by irrigation. Destroy infected volunteer plants in field boundaries.",
          hi: "कंदों पर मिट्टी अच्छी तरह चढ़ाएं ताकि कंदों तक फफूंद न पहुंचे। मेड़ों के संक्रमित पौधों को नष्ट करें।",
          gu: "બટાટાના કંદ પર માટી સરખી ચઢાવો જેથી કંદ સુધી રોગ ન પહોંચે. શેઢા-પાળા પરના રોગિષ્ઠ છોડનો નાશ કરો."
        },
        organic: {
          en: "Spray Bordeaux mixture (1%) or copper hydroxide bio-formulations during cloudy, humid weather as a protective shield.",
          hi: "बादल छाए रहने पर सुरक्षात्मक तौर पर बोर्डो मिश्रण (1%) या कॉपर युक्त जैविक घोल का छिड़काव करें।",
          gu: "વાદળછાયા ભેજવાળા વાતાવરણમાં રક્ષણાત્મક તરીકે બોર્ડો મિશ્રણ (૧%) નો છંટકાવ કરવો."
        },
        chemical: {
          en: "Systemic fungicide: Cymoxanil 8% + Mancozeb 64% WP @ 2.5g/L or Dimethomorph 50% WP @ 1.0g/L.",
          hi: "साइमोक्सानिल + मैंकोज़ेब (2.5 ग्राम प्रति लीटर) का छिड़काव करें। सुरक्षात्मक दस्ताने अवश्य पहनें।",
          gu: "સાયમોક્સાનીલ + મેન્કોઝેબ (૨.૫ ગ્રામ પ્રતિ લિટર) નો છંટકાવ કરવો. મોં પર રૂમાલ કે માસ્ક રાખવું.",
          safetyNote: "High Epidemic Potential: Notify adjacent village farms immediately. Wash spray equipment thoroughly."
        }
      },
      speechText: {
        en: "Diagnosis: Potato Late Blight with 96.2% confidence. Water-soaked lesions detected. High risk of field spread. Earth up soil over tubers and apply Cymoxanil with Mancozeb immediately.",
        hi: "पहचान: आलू का पछेती झुलसा, 96.2 प्रतिशत सटीकता। यह रोग बहुत तेजी से फैलता है। तुरंत कंदों पर मिट्टी चढ़ाएं और अनुशंसित कवकनाशी दवा का छिड़काव करें।",
        gu: "નિદાન: બટાટાનો પાછોતરો સુકારો, 96.2 ટકા ચોક્કસાઈ. આ રોગ ઝડપથી ફેલાય છે. કંદ પર માટી ચઢાવો અને ભલામણ કરેલ ફૂગનાશક દવાનો તાત્કાલિક છંટકાવ કરો."
      }
    },

    healthy_cotton_leaf: {
      id: "healthy_cotton_leaf",
      names: {
        en: "Healthy Cotton Leaf",
        hi: "स्वस्थ कपास पत्ती (रोगमुक्त)",
        gu: "તંદુરસ્ત કપાસનું પાન (રોગમુક્ત)"
      },
      pathogen: "None (Physiologically Normal)",
      crop: "Cotton (Gossypium hirsutum)",
      severity: "healthy",
      confidence: 0.985,
      ece: 0.019,
      gradCamHeatmap: [
        { x: 50, y: 50, r: 10, intensity: 0.15 }
      ],
      ipm: {
        cultural: {
          en: "Optimal foliar health detected. Maintain balanced nitrogen-potassium ratio and inspect undersides of leaves weekly for sucking pests.",
          hi: "पत्ती पूर्णतः स्वस्थ है। संतुलित खाद दें और सप्ताह में एक बार पत्तियों की निचली सतह की जांच करें।",
          gu: "પાન સંપૂર્ણ તંદુરસ્ત છે. સંતુલિત ખાતર આપો અને અઠવાડિયામાં એકવાર પાનની નીચે ચૂસિયા જીવાત માટે તપાસો."
        },
        organic: {
          en: "Install yellow and blue sticky traps (10 traps/acre) to monitor whiteflies and thrips before population build-up.",
          hi: "कीटों की निगरानी के लिए प्रति एकड़ 10 पीले और नीले चिपचिपे ट्रैप लगाएं। किसी दवा की आवश्यकता नहीं है।",
          gu: "જીવાતની દેખરેખ માટે એકરે ૧૦ પીળા અને વાદળી ચીકણા ટ્રેપ લગાવો. દવા છાંટવાની જરૂર નથી."
        },
        chemical: {
          en: "No chemical fungicides or insecticides required. Over-spraying harms beneficial predatory insects (ladybird beetles).",
          hi: "किसी भी रासायनिक कीटनाशक की आवश्यकता नहीं है। व्यर्थ छिड़काव मित्र कीटों को मारता है।",
          gu: "કોઈપણ રસાયણિક દવા છાંટવાની જરૂર નથી. નકામી દવા છાંટવાથી મિત્ર કીટકો મરી જાય છે.",
          safetyNote: "Preserve Beneficial Predators: Maintain natural biocontrol in the crop canopy."
        }
      },
      speechText: {
        en: "Diagnosis: Completely healthy cotton leaf with 98.5% confidence. No disease detected. Do not spray chemicals. Install yellow sticky traps for monitoring.",
        hi: "पहचान: पूर्णतः स्वस्थ पत्ती, 98.5 प्रतिशत सटीकता। कोई रोग नहीं है। कोई रासायनिक दवा न छिड़कें।",
        gu: "નિદાન: સંપૂર્ણ તંદુરસ્ત પાન, 98.5 ટકા ચોક્કસાઈ. કોઈ રોગ નથી. ખોટો દવાનો ખર્ચ કરવો નહીં."
      }
    },

    ood_non_leaf: {
      id: "ood_non_leaf",
      names: {
        en: "Out of Distribution (Not a Recognized Leaf)",
        hi: "पहचान नहीं हो सकी (अमान्य वस्तु / पत्ती नहीं है)",
        gu: "ઓળખી શકાયું નથી (માન્ય પાંદડું નથી)"
      },
      pathogen: "Helmholtz Free Energy > Threshold (E = 8.92)",
      crop: "Unknown / Non-Agricultural Object",
      severity: "watch",
      confidence: 0.284,
      ece: 0.040,
      gradCamHeatmap: [],
      ipm: {
        cultural: {
          en: "The AI system detected an object that is either not a supported crop leaf (e.g. soil, hand, household item) or the image is too blurry/dark.",
          hi: "सिस्टम ने ऐसी वस्तु पहचानी है जो फसल की पत्ती नहीं है (जैसे मिट्टी, हाथ या अन्य वस्तु) अथवा फोटो बहुत धुंधला है।",
          gu: "સિસ્ટમે શોધી કાઢ્યું છે કે આ કોઈ પાકનું પાન નથી (જેમ કે માટી, હાથ કે અન્ય વસ્તુ) અથવા ફોટો બહુ ઝાંખો છે."
        },
        organic: {
          en: "Retake photo in natural daylight. Hold the camera steady 15-20 cm from a single flat leaf.",
          hi: "प्राकृतिक दिन की रोशनी में दोबारा फोटो लें। पत्ते से 15-20 सेमी की दूरी पर कैमरा स्थिर रखें।",
          gu: "દિવસના કુદરતી અજવાળામાં ફરીથી ફોટો લો. પાનથી ૧૫-૨૦ સેમી અંતરે કેમેરો સ્થિર રાખો."
        },
        chemical: {
          en: "Never apply chemical pesticides on an uncertain diagnosis. Connect with our dedicated agri-officer for verification.",
          hi: "अनिश्चित स्थिति में कभी भी दवा न छिड़कें। सहायता के लिए कृषि अधिकारी से संपर्क करें।",
          gu: "અચોક્કસ નિદાનમાં ક્યારેય દવા છાંટવી નહીં. અમારા કૃષિ અધિકારીનો સંપર્ક કરો.",
          safetyNote: "Honest AI Guarantee: LeafSense refuses to guess when uncertain to prevent harmful chemical misuse."
        }
      },
      speechText: {
        en: "Notice: LeafSense cannot identify a supported crop leaf in this picture. Please hold the phone steady and take a clear photo of one leaf in daylight.",
        hi: "सूचना: इस तस्वीर में फसल की पत्ती स्पष्ट नहीं है। कृपया दिन की रोशनी में एक पत्ते की साफ तस्वीर दोबारा लें।",
        gu: "સૂચના: આ ફોટામાં કોઈ પાકનું પાન સ્પષ્ટ નથી. કૃપા કરીને કુદરતી અજવાળામાં એક પાંદડાનો સ્પષ્ટ ફોટો ફરીથી લો."
      }
    }
  },

  // 1km² Geohash Hex Grid Cells around Agricultural Hub (Anand, Gujarat)
  geohashCells: [
    { id: "ts5x89a", code: "#gh7-4b1", name: "Anand West Sector 1", lat: 22.564, lon: 72.928, baseRisk: 0.22, crop: "Tomato", rh: 76, leafWetHrs: 5.2, tempC: 25.4, scans: 2 },
    { id: "ts5x89b", code: "#gh7-4b2", name: "Anand Central Farmlands", lat: 22.571, lon: 72.935, baseRisk: 0.68, crop: "Tomato", rh: 89, leafWetHrs: 9.4, tempC: 23.2, scans: 8 },
    { id: "ts5x89c", code: "#gh7-4b3", name: "Hadgood Agri Block", lat: 22.578, lon: 72.942, baseRisk: 0.44, crop: "Potato", rh: 84, leafWetHrs: 7.8, tempC: 22.8, scans: 5 },
    { id: "ts5x89d", code: "#gh7-4b4", name: "Mogri Research Fields", lat: 22.558, lon: 72.919, baseRisk: 0.18, crop: "Cotton", rh: 72, leafWetHrs: 4.1, tempC: 26.5, scans: 1 },
    { id: "ts5x89e", code: "#gh7-4b5", name: "Karamsad Canal Belt", lat: 22.549, lon: 72.912, baseRisk: 0.35, crop: "Groundnut", rh: 81, leafWetHrs: 6.5, tempC: 24.1, scans: 3 },
    { id: "ts5x89f", code: "#gh7-4b6", name: "GIDC Agro Periphery", lat: 22.585, lon: 72.951, baseRisk: 0.74, crop: "Potato", rh: 91, leafWetHrs: 10.2, tempC: 21.9, scans: 11 },
    { id: "ts5x89g", code: "#gh7-4b7", name: "Vasad River Basin", lat: 22.592, lon: 72.960, baseRisk: 0.58, crop: "Tomato", rh: 87, leafWetHrs: 8.9, tempC: 23.0, scans: 7 }
  ],

  // Registered My Fields for the Logged-in Farmer
  myFields: [
    {
      id: "fld-01",
      name: "North Acre (ઉત્તર વાડી)",
      crop: "Tomato (Abhinav Hybrid)",
      stage: "Fruiting Stage (Day 62)",
      area: "2.5 Acres",
      lastScanDate: "Today, 10:24 AM",
      lastDiagnosis: "Early Blight (Controlled)",
      riskTrend: [0.18, 0.22, 0.25, 0.38, 0.45, 0.62, 0.68]
    },
    {
      id: "fld-02",
      name: "Canal Plot (નહેર કાંઠો)",
      crop: "Cotton (Bt Cotton)",
      stage: "Vegetative Stage (Day 38)",
      area: "3.0 Acres",
      lastScanDate: "Yesterday, 4:15 PM",
      lastDiagnosis: "Healthy Leaf Baseline",
      riskTrend: [0.12, 0.14, 0.15, 0.16, 0.18, 0.20, 0.22]
    },
    {
      id: "fld-03",
      name: "South Tubewell (દક્ષિણ બોરવેલ)",
      crop: "Potato (Kufri Pukhraj)",
      stage: "Tuber Initiation (Day 45)",
      area: "1.8 Acres",
      lastScanDate: "3 Days ago",
      lastDiagnosis: "Late Blight Watch",
      riskTrend: [0.35, 0.42, 0.55, 0.68, 0.74, 0.78, 0.82]
    }
  ],

  // Live Alerts & Community Broadcasts
  alerts: [
    {
      id: "alt-01",
      severity: "high",
      title: {
        en: "Urgent Outbreak Alert: Potato Late Blight in Block 4b6",
        hi: "गंभीर चेतावनी: ब्लॉक 4b6 में आलू के पछेती झुलसे का प्रकोप",
        gu: "તાકીદની ચેતવણી: બ્લોક 4b6 માં બટાટાના પાછોતરા સુકારાનો ફેલાવો"
      },
      message: {
        en: "11 confirmed scans in surrounding 3km. 3 consecutive nights with RH > 85% will peak fungal sporulation within 48h. Apply protective bio-fungicide now.",
        hi: "आसपास के 3 किमी में 11 पुष्टि किए गए मामले। लगातार 3 रात 85% से अधिक नमी रहने से 48 घंटे में रोग बढ़ सकता है। तुरंत सुरक्षात्मक उपाय करें।",
        gu: "આસપાસના ૩ કિમીમાં ૧૧ પુષ્ટિ થયેલ કેસ. સતત ૩ રાત ૮૫% થી વધુ ભેજ રહેવાથી ૪૮ કલાકમાં રોગ વકરી શકે છે. તાત્કાલિક રક્ષણાત્મક પગલાં લો."
      },
      timestamp: "18 minutes ago"
    },
    {
      id: "alt-02",
      severity: "watch",
      title: {
        en: "Microclimate Warning: Tomato Early Blight Conditions",
        hi: "मौसम चेतावनी: टमाटर अगेती झुलसे के अनुकूल मौसम",
        gu: "હવામાન ચેતવણી: ટામેટાંમાં આગોતરા સુકારા માટે અનુકૂળ હવામાન"
      },
      message: {
        en: "Leaf wetness duration reached 9.4 hours last night in Anand Central. Inspect lower leaves today.",
        hi: "आनंद सेंट्रल में कल रात पत्तियों पर ओस 9.4 घंटे टिकी रही। आज ही निचली पत्तियों की जांच करें।",
        gu: "આણંદ સેન્ટ્રલમાં ગઈકાલે રાત્રે પાંદડા પર ૯.૪ કલાક ઝાકળ ટકી રહી. આજે જ નીચેના પાંદડા તપાસો."
      },
      timestamp: "2 hours ago"
    }
  ]
};
