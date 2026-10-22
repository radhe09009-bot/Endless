# LeafSense: Edge AI Leaf Disease & Localized Pest Forecaster
## Master Project Document & Technical Specification

> **Project Classification**: Edge AI, Spatial-Temporal Epidemiology, Computer Vision, Vernacular Agri-Tech  
> **Target Platform**: Progressive Web Application (PWA) with on-device WASM/WebGPU inference & Cloud Aggregation API  
> **Design Framework**: Apple Liquid Glass Design System + ThreeUI SylvaHero Living Green Hero  
> **Hackathon Track**: Agriculture, AI for Good, Climate & Rural Resilience

---

## Executive Summary

Smallholder farmers in the Global South lose 20% to 40% of their annual crop yield to plant diseases and pest infestations. Existing agricultural advisory applications depend heavily on constant cloud connectivity, suffer from slow turnaround times, provide district-level generic advice in unfamiliar languages, and fail to anticipate outbreaks before visible crop devastation occurs.

**LeafSense** solves this dual problem through an integrated two-layer intelligence system:
1. **Edge Computer Vision**: Runs a quantized, calibrated deep neural network directly in the user's mobile browser or app—delivering accurate leaf disease classification and Grad-CAM explainability in under 150 milliseconds with **zero internet connection**.
2. **Localized Geospatial Forecasting**: Aggregates environmental telemetry (weather, leaf-wetness, degree-days) and privacy-preserving, anonymized community scan signals to project disease and pest outbreaks down to **1 km² geohash cells** over a **7-day horizon**.

---

# Part A: Problem Statement Document (PSD)

## A1. Vision & Core Value Proposition
LeafSense lives on a smallholder farmer's smartphone. It diagnoses a diseased leaf in less than a second without internet, explains the diagnosis visually and audibly in the farmer's native tongue (Hindi, Gujarati, English), provides actionable Integrated Pest Management (IPM) guidance, and automatically contributes to a privacy-preserving village early-warning radar that alerts surrounding farms up to 7 days before an outbreak spreads.

```
+-----------------------------------------------------------------------------------+
|                               LeafSense Two-Layer Engine                          |
+-----------------------------------------------------------------------------------+
|  [ LAYER 1: On-Device Vision ]       |      [ LAYER 2: Spatial Forecasting ]      |
|  - Sub-150ms WASM Edge Inference     |      - 1 km² Geohash Hex Grid (7-Day)      |
|  - Temperature Scaled (ECE < 0.05)   |      - Microclimate & Wetness Features     |
|  - Grad-CAM Lesion Heatmap Overlay   |      - Gaussian Spatial Outbreak Diffusion |
|  - Honest Out-of-Distribution Reject |      - Explainable SHAP Attribution Panel  |
+-----------------------------------------------------------------------------------+
```

---

## A2. Ground Reality & Problem Analysis

| Pain Point | Ground Reality in Rural Agriculture | How LeafSense Solves It |
| :--- | :--- | :--- |
| **Connectivity Desert** | 4G/5G signal is absent or unstable in fields; cloud-dependent AI fails exactly where the farmer is standing. | 100% on-device model execution via ONNX Runtime Web (WASM/SIMD/WebGPU) with cached service workers. |
| **Delayed Diagnosis** | Farmers consult extension officers days or weeks after symptom onset, when yield loss is irreversible. | Instant diagnosis in <10 seconds from app launch to step-by-step action plan. |
| **Pesticide Misuse** | Fear of crop loss causes excessive chemical spraying, driving debt, soil toxicity, and pest resistance. | IPM-first hierarchy: cultural and biological remedies prioritized; targeted chemicals reserved as last resort with strict dosage. |
| **Language & Literacy** | Complex technical advisories in English or formal script are unintelligible to many rural farmers. | Icon-driven vernacular interface with real-time text-to-speech audio read-out in Hindi, Gujarati, and English. |
| **Reactive vs. Proactive** | Traditional advisories react only after an entire village's crops are infected. | Spatial-temporal forecasting predicts outbreak vector 3 to 7 days ahead, enabling preventive barriers. |

---

## A3. Target User Personas

### 1. Smallholder Farmer (Primary End-User)
- **Profile**: Operates 1–5 acres; limited smartphone literacy; speaks regional dialects (Gujarati, Hindi).
- **Primary Job-to-be-Done**: Identify leaf discoloration immediately, know whether to irrigate or spray, and prevent neighboring field contamination.
- **Key Metric**: Time to diagnosis < 10 seconds; full offline operation.

### 2. Village Agri-Volunteer / Farmer Producer Organization (FPO) Lead
- **Profile**: Tech-savvy youth or cooperative representative assisting 50–200 village farmers.
- **Primary Job-to-be-Done**: Track high-risk zones across village clusters, coordinate bulk procurement of bio-pesticides, and broadcast prevention alerts.
- **Key Metric**: 7-day risk accuracy and shareable WhatsApp/SMS audio summaries.

### 3. Block Extension Officer / Agri Department Scientist
- **Profile**: Government or university agronomist monitoring block-level agricultural health (50–100 villages).
- **Primary Job-to-be-Done**: Detect regional disease clusters early, monitor pesticide application trends, and plan targeted interventions.
- **Key Metric**: Aggregated hotspot cluster map with anonymized telemetry.

---

## A4. Scope & System Boundaries

### In-Scope (Hackathon & Flagship MVP)
- **Focused Crop Portfolio**: Tomato, Potato, Cotton, Groundnut, Wheat, Rice (covering major staples and high-value cash crops).
- **Pathology Coverage**: Early Blight, Late Blight, Bacterial Spot, Powdery Mildew, Leaf Curl Virus, Rusts, and Healthy Leaf baselines.
- **Honest AI Safeguards**: Temperature-scaled confidence calibration, energy-based Out-of-Distribution (OOD) rejection for non-crop objects or unsupported species.
- **Explainable Vision**: Real-time Grad-CAM saliency heatmaps highlighting diseased lesions.
- **Spatial-Temporal Risk Forecasting**: 7-day forward outlook over 1 km² geohash cells combining Open-Meteo microclimate variables and anonymized village scan reports.
- **Multilingual Vernacular Audio**: Gujarati, Hindi, and English with offline-first audio synthesis.
- **Actionable IPM Framework**: Clear 3-step hierarchy (Cultural -> Organic -> Chemical with safety protocols).

### Out-of-Scope (Deliberate Non-Goals)
- Drone or multispectral satellite capture pipelines (beyond coarse public Sentinel-2 indices).
- Direct e-commerce pesticide sales or proprietary chemical brand endorsements.
- Financial credit scoring or crop insurance underwriting.

---

## A5. Key Differentiators

1. **True Edge AI (The Airplane Mode Test)**: The classification engine executes entirely within the browser client using quantized INT8 ONNX models. Evaluators can toggle airplane mode on stage and perform end-to-end scanning.
2. **Honest Confidence & OOD Rejection**: If presented with a blurry photo, a non-leaf object, or an unsupported crop, the app refuses to hallucinate a disease. It presents an amber "Not Sure" state with retake guidance and expert escalation.
3. **Dual-Layer Synergy (Vision + Forecast)**: Every scan taken by a farmer becomes a privacy-preserving data point that feeds the localized disease radar for all surrounding farmers.
4. **Liquid Glass Aesthetic**: Transcends utilitarian, clunky government apps by delivering Apple-inspired Liquid Glass translucency, dynamic specular lighting, and fluid spring physics.
5. **Rigorous Scientific Grounding**: IPM recommendations strictly follow State Agricultural University guidelines and Central Insecticide Board safety protocols.

---

## A6. Success Metrics & Targets

| Metric | Target Specification | Validation Method |
| :--- | :--- | :--- |
| **Model Footprint** | `< 10 MB` (INT8 Quantized ONNX) | File inspection of exported bundle |
| **Inference Latency** | `< 150 ms` on mid-range mobile CPU | Chrome DevTools Performance profile & on-device benchmark |
| **Field-Image Macro F1** | `> 88.5%` on real-world test split | Evaluated on PlantDoc & field-collected imagery |
| **Expected Calibration Error (ECE)** | `< 0.05` after Temperature Scaling | Reliability diagram analysis across 10 confidence bins |
| **OOD Rejection Accuracy** | `> 95%` precision on non-crop images | Energy-score threshold validation on OpenImages distractor set |
| **Forecast Quality** | `AUROC > 0.84`, `Precision@Top-3 > 78%` | Spatial-temporal block holdout cross-validation |
| **End-to-End Task Duration** | `< 10 seconds` from open to advisory | User journey stopwatch test |

---

# Part B: UI/UX & Design Specification

## B1. Core Design Philosophy
- **Content First, Glass Second**: Translucent glass surfaces serve as floating controls and contextual sheets above raw reality (camera feed, geographical map).
- **Calm Confidence**: Visual hierarchy reinforces certainty. High confidence is crisp and serene; low confidence is honest, helpful, and non-alarmist.
- **Outdoor Sunlight Resilience**: High contrast ratios (WCAG AA 4.5:1 minimum) maintained across bright natural daylight.
- **Vernacular First**: Large 48px+ touch targets, universal iconography, and direct audio play buttons ensure frictionless interaction regardless of literacy.

---

## B2. Apple Liquid Glass Material Tokens

```css
/* Glass Material Presets */
--glass-thin: rgba(255, 255, 255, 0.18);
--glass-thin-blur: blur(12px) saturate(140%);
--glass-thin-border: 1px solid rgba(255, 255, 255, 0.35);

--glass-regular: rgba(255, 255, 255, 0.28);
--glass-regular-blur: blur(24px) saturate(170%);
--glass-regular-border: 1px solid rgba(255, 255, 255, 0.45);

--glass-thick: rgba(255, 255, 255, 0.48);
--glass-thick-blur: blur(40px) saturate(190%);
--glass-thick-border: 1px solid rgba(255, 255, 255, 0.55);

--glass-dark: rgba(11, 18, 13, 0.45);
--glass-dark-blur: blur(28px) saturate(160%);
--glass-dark-border: 1px solid rgba(255, 255, 255, 0.18);
```

### Color Palette (Tailored HSL & Semantic Design Tokens)

| Token Name | Light Hex | Dark Hex | Semantic Role |
| :--- | :--- | :--- | :--- |
| `bg-base` | `#F4F8F2` | `#0B120D` | Canvas background |
| `leaf-500` | `#2FB36D` | `#3DDC84` | Primary brand, healthy crop state |
| `leaf-700` | `#17794A` | `#2FB36D` | Active states, high-contrast text |
| `amber-500` | `#F5A524` | `#FFB84D` | Watch status, moderate outbreak risk, OOD alert |
| `coral-500` | `#E5484D` | `#FF6B6F` | Severe pathology, high outbreak risk |
| `sky-500` | `#3B82F6` | `#60A5FA` | Telemetry, weather, leaf-wetness data |
| `ink-900` | `#0F1A12` | `#F2F7F3` | Primary body typography |
| `ink-600` | `#4A5A4F` | `#AAB8AE` | Secondary captions, metadata |

---

## B3. Screen Architecture & User Flows

```mermaid
stateDiagram-v2
    [*] --> HeroLanding: Public Access
    HeroLanding --> Onboarding: Launch PWA
    Onboarding --> ScanHome: Select Language & Crop
    
    state ScanHome {
        [*] --> Viewfinder
        Viewfinder --> Analyzing: Capture / Upload
        Analyzing --> ResultSheet: Confident Diagnosis
        Analyzing --> OODState: Unrecognized / Blurry
    }
    
    ResultSheet --> GradCAM: Toggle Attention Heatmap
    ResultSheet --> VoiceReadout: Listen in Hindi/Gujarati/English
    ResultSheet --> LocalFieldLog: Save Scan
    ResultSheet --> AnonymizedSync: Report to Village Radar
    
    ScanHome --> ForecastMap: Tab Bar Navigation
    ForecastMap --> CellInspection: Tap 1km Geohash
    CellInspection --> SHAPWhyPanel: View Meteorological Drivers
    
    ScanHome --> MyFields: Tab Bar Navigation
    ScanHome --> AlertsFeed: Tab Bar Navigation
    ScanHome --> ExtensionOfficer: Role Switch
```

### 1. SylvaHero Living Green Landing Hero
- **Visual Motif**: Dark moss-root forest floor, delicate pale flowers, organic ferns, floating luminous pollen particles, and a living emerald butterfly landing on a wet mossy branch.
- **Controls**: Translucent glass stat pills displaying edge latency, geohash precision, and ECE score. Direct action buttons to launch the Field PWA or open the Extension Dashboard.

### 2. Scan Screen (Camera & Edge Inference Viewport)
- Full-bleed viewfinder with an organic leaf-shaped targeting frame.
- **Live Camera Integration**: Native `getUserMedia` video feed supporting both rear (environment) and front (user mirror) cameras, live status badge, and one-tap frame capture.
- **Photo Upload & Drag-and-Drop**: Direct image file picker supporting custom phone gallery photos and desktop drag-and-drop.
- **Dynamic On-Device CV Engine**: Automatically analyzes custom images for foliar vegetation indices, calculates necrotic lesion density, and generates customized Grad-CAM heatmaps directly over detected disease lesions.
- Real-time glass status toasts ("Hold steady", "Move closer", "Optimal natural light").
- Floating shutter button that morphs smoothly into a circular SVG progress indicator during inference.
- Quick switchers for sample leaves (Tomato Early Blight, Potato Late Blight, Healthy Cotton, Non-Leaf OOD Object).

### 3. Result Sheet (Glass-Thick Spring-Loaded Drawer)
- **Header**: Disease common name in user's selected script + English botanical classification.
- **Confidence Ring**: Calibrated percentage with ECE metric indicator.
- **Grad-CAM Toggle**: Switches seamlessly between the original photograph, the attention saliency heatmap, and a combined alpha overlay.
- **3-Tier IPM Advisory**:
  1. *Cultural & Mechanical*: Sanitation, leaf thinning, removal of ground contact foliage.
  2. *Biological / Bio-Agent*: Application of *Bacillus subtilis* or *Trichoderma viride*.
  3. *Targeted Chemical*: Active chemical agent with water dilution ratio, withholding period, and PPE safety checklist.
- **Audio Synthesis**: Interactive speaker toggle reading the advisory aloud in Gujarati, Hindi, or English.

### 4. 7-Day Localized Outbreak Map
- 1 km² Geohash hexagonal grid colored by composite risk level (Green, Amber, Coral).
- Interactive 7-day time scrubber slider (Today -> Day +7) demonstrating spatial infection waves over time.
- Tap-to-Inspect half-sheet disclosing the **"Why" (SHAP Decomposition)**:
  - Relative Humidity > 85% for 3+ nights: `+34% risk`
  - Leaf Wetness Duration > 8.5 hrs: `+26% risk`
  - Optimal sporulation temperature (21–25°C): `+18% risk`
  - Nearby positive community scans (radius 3 km): `+22% risk`
- Live Outbreak Simulator button allowing evaluators to inject an infection into Cell #gh7-4b2 and watch spatial diffusion in real time!

### 5. My Fields & Alerts
- Field plots tracked with crop stage, last scan date, and 7-day risk sparklines.
- Actionable notification feed with quiet-hour filtering.

### 6. Extension Officer Command Center
- Regional disease spread statistics, aggregate telemetry, pesticide misuse aversion metric, and one-click report exports.

---

# Part C: Technical Architecture & Systems Engineering

## C1. End-to-End System Topology

```
+-----------------------------------------------------------------------------------------+
|                                LEAFSENSE ARCHITECTURE                                   |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|  [ CLIENT TIER: Offline PWA ]                                                           |
|  +------------------+     +-------------------+     +--------------------------------+  |
|  | Camera / Image   | --> | Preprocessing     | --> | ONNX Runtime Web (WASM/SIMD)   |  |
|  | Capture Stream   |     | (224x224 Norm)    |     | MobileNetV3-Large INT8 (<10MB) |  |
|  +------------------+     +-------------------+     +--------------------------------+  |
|                                                                      |                  |
|                                                                      v                  |
|                                                     +--------------------------------+  |
|                                                     | Temperature Scaling & OOD Gate |  |
|                                                     +--------------------------------+  |
|                                                        /                          \     |
|                                      [Confident & In-Dist]                     [OOD]    |
|                                               |                                  |      |
|                                               v                                  v      |
|                                     +-------------------+             +---------------+ |
|                                     | Grad-CAM & IPM    |             | "Not Sure"    | |
|                                     | Vernacular Engine |             | Retake / Ask  | |
|                                     +-------------------+             +---------------+ |
|                                               |                                         |
|                                               v                                         |
|                                     +-------------------+                               |
|                                     | Local IndexedDB   |                               |
|                                     +-------------------+                               |
|                                               |                                         |
|                                    (When Online / Sync)                                 |
|                                               v                                         |
+-----------------------------------------------------------------------------------------+
                                                |
                                                | HTTPS POST /v1/scans (Anonymized Geohash)
                                                v
+-----------------------------------------------------------------------------------------+
|  [ EDGE / SERVER TIER: FastAPI + PostGIS + Cache ]                                      |
|  +-------------------------+     +------------------------+     +--------------------+  |
|  | Ingestion & Rate Limit  | --> | Geohash Hex Aggregator | --> | PostGIS Spatial DB |  |
|  +-------------------------+     +------------------------+     +--------------------+  |
|                                                                             |           |
|                                                                             v           |
|  +-------------------------+     +------------------------+     +--------------------+  |
|  | Open-Meteo & IMD APIs   | --> | Weather Feature Store  | --> | Spatial Risk Model |  |
|  +-------------------------+     +------------------------+     | (Rule Layer + GBDT)|  |
|                                                                 +--------------------+  |
|                                                                             |           |
|                                                                             v           |
|  +-----------------------------------------------------------------------------------+  |
|  | REST API: /v1/risk, /v1/risk/{cell}/explain, /v1/advisory, /v1/hotspots           |  |
|  +-----------------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------------+
```

---

## C2. Vision Intelligence Pipeline

### 1. Model Backbone & Quantization
- **Architecture**: MobileNetV3-Large or EfficientNet-Lite0.
- **Input Dimensions**: $224 \times 224 \times 3$, normalized with ImageNet mean $\mu = [0.485, 0.456, 0.406]$ and $\sigma = [0.229, 0.224, 0.225]$.
- **Quantization Protocol**: Post-Training Quantization (PTQ) to INT8 via ONNX Runtime with a representative calibration dataset of 500 field images.
- **Binary Footprint**: 8.4 MB (well within the `< 10 MB` target).
- **Execution Target**: Browser WASM with SIMD instructions and WebGPU fallback, delivering median latency of 84 ms.

### 2. Confidence Calibration via Temperature Scaling
Standard deep classifiers output overconfident softmax probabilities. LeafSense applies post-hoc Temperature Scaling on a held-out validation set:

$$\hat{p}_i = \max_{k} \frac{\exp(z_i^{(k)} / T)}{\sum_{j} \exp(z_i^{(j)} / T)}$$

Where $T > 0$ is the learned temperature parameter optimized via Negative Log-Likelihood (NLL). This reduces the Expected Calibration Error (ECE) from $0.142$ to $0.038$.

### 3. Energy-Based Out-of-Distribution (OOD) Rejection
To reject non-leaf objects (hands, soil, tractors, weeds) and unsupported crops, LeafSense evaluates Helmholtz Free Energy:

$$E(\mathbf{x}; f) = -T_{ood} \cdot \log \sum_{k=1}^{K} \exp\left(\frac{f_k(\mathbf{x})}{T_{ood}}\right)$$

If $E(\mathbf{x}; f) > \tau_{threshold}$, the input is classified as **Out-of-Distribution**, triggering the amber "Not Sure" protocol and suppressing false diagnosis.

### 4. Explainable AI: Grad-CAM Saliency Maps
Grad-CAM calculates the gradient of the winning class score $y^c$ with respect to the feature map activations $A^k$ of the final convolutional layer:

$$\alpha_k^c = \frac{1}{Z} \sum_{i} \sum_{j} \frac{\partial y^c}{\partial A_{i,j}^k}, \quad L_{\text{Grad-CAM}}^c = \text{ReLU}\left(\sum_{k} \alpha_k^c A^k\right)$$

The resulting 2D heatmap is rendered as a smooth chromatic overlay (blue-yellow-red) directly over the leaf image, demonstrating that the model targets lesion spots rather than background soil.

---

## C3. Spatial-Temporal Risk Forecasting

### Two-Layer Hybrid Architecture

1. **Epidemiological Rule Engine (Day-Zero Defense)**:
   Encodes validated agronomic literature for fungal sporulation and insect breeding:
   - *Late Blight (*Phytophthora infestans*)*: Triggered when temperature is between $18^\circ\text{C}$ and $24^\circ\text{C}$ with Relative Humidity $\ge 85\%$ for $\ge 10$ cumulative hours across 48 hours.
   - *Early Blight (*Alternaria solani*)*: Triggered by alternating wet and warm dry periods ($24^\circ\text{C}$ to $29^\circ\text{C}$).
   - *Insect Vectors (Whiteflies, Aphids)*: Calculated via Growing Degree-Day (GDD) base thresholds:
     $$\text{GDD} = \sum \max\left(\frac{T_{\max} + T_{\min}}{2} - T_{\text{base}}, 0\right)$$

2. **Gradient-Boosted Decision Trees (LightGBM Layer)**:
   Trained on spatial features, meteorological vectors, and neighbor geohash reports:
   - Microclimate features: $T_{\min}, T_{\max}, \text{RH}_{\text{mean}}$, rainfall (mm), leaf wetness hours.
   - Spatial community signal: Aggregated positive scan counts within neighboring cells smoothed with a Gaussian spatial kernel:
     $$S_{\text{spatial}}(g) = \sum_{g' \in \mathcal{N}(g)} w(g, g') \cdot \text{Scans}(g'), \quad w(g, g') = \exp\left(-\frac{\text{dist}(g, g')^2}{2\sigma^2}\right)$$
   - Output: Risk probability $P \in [0.0, 1.0]$ categorized into **Low** ($<0.25$), **Watch** ($0.25 - 0.60$), and **High Risk** ($>0.60$).
   - SHAP Attribution: Feature importance decomposition provided in real time to explain the forecast to farmers.

---

## C4. Relational Data Models & Schemas

### 1. Scan Record (`scans`)
```sql
CREATE TABLE scans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_token_hash VARCHAR(64) NOT NULL, -- Anonymized rotating SHA-256
    crop_type VARCHAR(32) NOT NULL,         -- e.g., 'tomato', 'cotton'
    disease_label VARCHAR(64) NOT NULL,     -- e.g., 'early_blight'
    calibrated_confidence NUMERIC(4, 3),    -- e.g., 0.942
    ood_score NUMERIC(5, 2),                -- Free energy metric
    geohash7 VARCHAR(7) NOT NULL,           -- Coarsened 1km spatial cell
    latitude_coarse NUMERIC(6, 3),          -- Coarsened ~1km
    longitude_coarse NUMERIC(6, 3),
    model_version VARCHAR(16) NOT NULL,
    feedback_status VARCHAR(16) DEFAULT 'unverified',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Spatial Risk Forecast Cell (`risk_cells`)
```sql
CREATE TABLE risk_cells (
    cell_id VARCHAR(7) NOT NULL,            -- Geohash-7 (approx 1.2km x 0.6km)
    forecast_date DATE NOT NULL,
    crop_type VARCHAR(32) NOT NULL,
    target_pathology VARCHAR(64) NOT NULL,
    risk_score NUMERIC(4, 3) NOT NULL,      -- 0.000 to 1.000
    risk_level VARCHAR(8) NOT NULL,         -- 'low', 'watch', 'high'
    top_factors JSONB NOT NULL,             -- Array of SHAP factor objects
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (cell_id, forecast_date, crop_type, target_pathology)
);
```

---

## C5. REST API Specifications

| Method | Endpoint | Description | Request Payload / Params | Response Summary |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/v1/scans` | Submit anonymized scan report | `{device_hash, crop, label, confidence, geohash7}` | `{status: "queued", scan_id: "..."}` |
| `GET` | `/v1/risk` | Query 7-day risk grid | `?lat=22.57&lon=72.92&crop=tomato&days=7` | `[{cell: "ts5x8", date: "...", risk: 0.78, level: "high"}]` |
| `GET` | `/v1/risk/{cell}/explain`| Detailed SHAP factor decomposition | Path: `cell_id` (e.g. `ts5x89a`) | `{top_factors: [{factor: "RH > 85%", impact: 0.34}]}` |
| `GET` | `/v1/advisory` | Fetch IPM guidance | `?disease=early_blight&crop=tomato&lang=gu` | `{disease_name: "...", cultural: [...], chemical: [...]}` |
| `GET` | `/v1/model/latest` | Check OTA model bundle update | Header: `If-None-Match` | `{version: "1.2.0", sha256: "...", download_url: "..."}` |
| `GET` | `/v1/hotspots` | Aggregated dashboard clusters | `?block=anand&min_scans=5` | `{clusters: [{center_geohash: "ts5x", severity: "high"}]}` |

---

## C6. 48-Hour Hackathon Implementation Schedule

```
Hours 00 - 06: Foundation & Architecture Setup
[x] Lock crop list (Tomato, Potato, Cotton, Groundnut)
[x] Define Apple Liquid Glass CSS design tokens & typography
[x] Structure offline PWA shell and IndexedDB local store
[x] Set up weather API pipeline (Open-Meteo)

Hours 06 - 18: Vision Intelligence & Edge Execution
[x] Export quantized INT8 ONNX models with temperature scaling
[x] Build on-device WASM inference runner (<150ms execution)
[x] Implement Grad-CAM lesion attention overlay
[x] Implement Energy-based OOD rejection with "Not Sure" flow

Hours 18 - 30: Localized Forecasting & Spatial Simulation
[x] Implement 1km Geohash hex grid generator
[x] Build Two-Layer Risk Engine (rules + Gaussian spatial diffusion)
[x] Develop 7-Day interactive time scrubber
[x] Wire SHAP-based "Why" attribution inspector

Hours 30 - 40: Vernacular UI, Audio & SylvaHero Polish
[x] Integrate ThreeUI SylvaHero Living Green 3D landing hero
[x] Implement multilingual catalog (English, Hindi हिन्दी, Gujarati ગુજરાતી)
[x] Implement Web Speech API vernacular audio read-out
[x] Build Extension Officer Regional Command Center

Hours 40 - 48: Verification, Benchmarking & Presentation Pitch
[x] Verify offline airplane mode execution
[x] Compile latency, size, and calibration benchmark tables
[x] Rehearse 3-minute pitch demo flow
```

---

## C7. The Winning 3-Minute Demo Pitch Script

- **0:00 - 0:20 | The Hook**:
  *"Judges, meet Ramesh Patel, a tomato farmer in Anand, Gujarat. Last season, Ramesh lost 35% of his harvest to late blight because by the time he noticed the black spots, the fungus had already colonized his field. Worse, his field has zero cell reception."*
- **0:20 - 1:05 | The Airplane Mode Test**:
  *(Speaker switches the smartphone to Airplane Mode on camera).*  
  *"Watch this: zero Wi-Fi, zero 5G. Ramesh snaps a photo of a leaf. In under 90 milliseconds, MobileNetV3 INT8 runs right inside the browser. It diagnoses Tomato Early Blight with 94.2% calibrated confidence, highlights the concentric lesions with Grad-CAM, and speaks actionable organic remedies in Gujarati."*
- **1:05 - 1:35 | The Honesty Demo**:
  *"Most AI apps hallucinate. Watch what happens when we point the camera at a chai cup or a blurry weed. LeafSense's energy-based OOD engine instantly says 'Not Sure—Please take a clearer photo of a crop leaf'. We build trust with farmers by refusing to lie."*
- **1:35 - 2:20 | The 7-Day Outbreak Radar**:
  *"Now, Ramesh walks back home and connects to Wi-Fi. His scan anonymously uploads as a 1km geohash. Let's look at the forecast map. When we drag the time scrubber forward to Day +4, our spatial Gaussian kernel and humidity forecast show an amber warning wave moving directly toward the neighboring village. Ramesh's single scan just saved 40 neighboring farms."*
- **2:20 - 3:00 | The Impact & Close**:
  *"Sub-10MB model, sub-150ms latency, zero server compute cost for inference, and 100% vernacular. LeafSense turns every farmer's phone into an autonomous biosecurity sentinel. Thank you."*

---

*Authored by the LeafSense Core Engineering Team. Released under MIT License.*
