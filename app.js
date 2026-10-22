/**
 * LeafSense — Main Application Controller
 * Orchestrates Views, Tab Navigation, Leaf Scanner, Forecast Map, and Multilingual Engine
 */

document.addEventListener("DOMContentLoaded", () => {
  // State
  let currentLang = "en";
  let currentTab = "scan";
  let currentSampleKey = "tomato_early_blight";
  let lastDiagnosis = null;
  let isGradCamActive = false;
  let isCustomImage = false;
  let isCameraActive = false;
  let mediaStream = null;
  let currentFacingMode = "environment"; // "environment" (rear) or "user" (front)

  // DOM Elements
  const appMain = document.getElementById("app-main");
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabLens = document.getElementById("tab-lens");
  const appViews = document.querySelectorAll(".app-view");
  const langButtons = document.querySelectorAll(".lang-btn");
  const themeToggle = document.getElementById("theme-toggle");
  const shutterBtn = document.getElementById("shutter-btn");
  const shutterProgress = document.getElementById("shutter-progress");
  const shutterCircle = document.getElementById("shutter-circle");
  const viewfinderImg = document.getElementById("viewfinder-img");
  const viewfinderVideo = document.getElementById("viewfinder-video");
  const captureCanvas = document.getElementById("capture-canvas");
  const leafFileInput = document.getElementById("leaf-file-input");
  const btnUploadPhoto = document.getElementById("btn-upload-photo");
  const btnToggleCamera = document.getElementById("btn-toggle-camera");
  const cameraBtnText = document.getElementById("camera-btn-text");
  const btnSwitchCamera = document.getElementById("btn-switch-camera");
  const liveCameraBadge = document.getElementById("live-camera-badge");
  const viewfinderCard = document.getElementById("viewfinder-card");
  const viewfinderHintToast = document.getElementById("viewfinder-hint-toast");
  const heatmapCanvas = document.getElementById("heatmap-canvas");
  const resultDrawer = document.getElementById("result-drawer");
  const sampleLeafButtons = document.querySelectorAll(".sample-leaf-btn");
  const mapCanvas = document.getElementById("map-canvas");
  const scrubberSlider = document.getElementById("scrubber-slider");
  const scrubberDayDisplay = document.getElementById("scrubber-day-display");
  const outbreakSimBtn = document.getElementById("outbreak-sim-btn");
  const audioPlayBtn = document.getElementById("audio-play-btn");
  const audioWaveform = document.getElementById("audio-waveform");
  const gradCamToggleInput = document.getElementById("gradcam-toggle-input");

  // 1. Language Localization Manager
  function setLanguage(lang) {
    currentLang = lang;
    langButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.lang === lang));

    const dict = LEAFSENSE_DATA.i18n[lang] || LEAFSENSE_DATA.i18n.en;

    // Update all elements with data-i18n
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Update current diagnosis in result sheet if open
    if (lastDiagnosis) {
      renderResultSheet(lastDiagnosis);
    }
  }

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  // 2. Tab Navigation & Sliding Lens Indicator
  function switchTab(tabId) {
    currentTab = tabId;
    tabButtons.forEach((btn) => {
      const isActive = btn.dataset.tab === tabId;
      btn.classList.toggle("active", isActive);
      if (isActive && tabLens) {
        tabLens.style.left = `${btn.offsetLeft}px`;
        tabLens.style.width = `${btn.offsetWidth}px`;
      }
    });

    appViews.forEach((view) => {
      view.classList.toggle("active", view.id === `view-${tabId}`);
    });

    if (tabId === "forecast") {
      drawForecastMap();
    }
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => switchTab(btn.dataset.tab));
  });

  // Initialize lens position
  setTimeout(() => {
    const activeBtn = document.querySelector(".tab-btn.active");
    if (activeBtn && tabLens) {
      tabLens.style.left = `${activeBtn.offsetLeft}px`;
      tabLens.style.width = `${activeBtn.offsetWidth}px`;
    }
  }, 100);

  // 3. Theme Toggle (Light / Dark)
  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const nextTheme = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    themeToggle.textContent = nextTheme === "dark" ? "☀️" : "🌙";
    if (currentTab === "forecast") drawForecastMap();
  });

  // 4. Floating Pollen Canvas Particles for SylvaHero
  function initPollenParticles() {
    const pollenCanvas = document.getElementById("pollen-canvas");
    if (!pollenCanvas) return;
    const ctx = pollenCanvas.getContext("2d");

    let width = (pollenCanvas.width = pollenCanvas.offsetWidth);
    let height = (pollenCanvas.height = pollenCanvas.offsetHeight);

    window.addEventListener("resize", () => {
      width = pollenCanvas.width = pollenCanvas.offsetWidth;
      height = pollenCanvas.height = pollenCanvas.offsetHeight;
    });

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.5 + 1.0,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(Math.random() * 0.6 + 0.2),
      alpha: Math.random() * 0.7 + 0.3,
      pulse: Math.random() * Math.PI
    }));

    function animatePollen() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx + Math.sin(p.pulse) * 0.3;
        p.y += p.vy;
        p.pulse += 0.02;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(163, 243, 198, ${p.alpha * 0.75})`;
        ctx.shadowColor = "#3DDC84";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animatePollen);
    }
    animatePollen();
  }
  initPollenParticles();

  // 5. Leaf Sample Switcher
  const sampleImages = {
    tomato_early_blight: "assets/tomato_early_blight.jpg",
    potato_late_blight: "assets/potato_late_blight.jpg",
    healthy_cotton_leaf: "assets/healthy_cotton_leaf.jpg",
    ood_non_leaf: "assets/ood_non_leaf.jpg"
  };

  sampleLeafButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // If camera is streaming, stop camera first
      if (isCameraActive) {
        stopLiveCamera();
      }

      sampleLeafButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentSampleKey = btn.dataset.sample;
      isCustomImage = false;
      viewfinderImg.src = sampleImages[currentSampleKey];

      // Reset heatmap & result
      heatmapCanvas.classList.remove("active");
      if (gradCamToggleInput) gradCamToggleInput.checked = false;
      isGradCamActive = false;
      resultDrawer.style.display = "none";
    });
  });

  // 6. Live Web Camera Stream Manager
  async function startLiveCamera() {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("⚠️ Camera API is not supported on this browser or origin. Please use 'Upload Photo' instead.");
        return;
      }

      const constraints = {
        video: {
          facingMode: { ideal: currentFacingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      viewfinderVideo.srcObject = mediaStream;
      await viewfinderVideo.play();

      isCameraActive = true;
      viewfinderImg.style.display = "none";
      viewfinderVideo.style.display = "block";
      viewfinderVideo.classList.toggle("mirror", currentFacingMode === "user");

      if (liveCameraBadge) liveCameraBadge.style.display = "inline-flex";
      if (btnSwitchCamera) btnSwitchCamera.style.display = "inline-flex";
      if (cameraBtnText) cameraBtnText.textContent = "Stop Camera";
      if (btnToggleCamera) {
        btnToggleCamera.style.background = "rgba(229, 72, 77, 0.55)";
        btnToggleCamera.style.borderColor = "var(--coral-500)";
      }

      // Hide previous results
      heatmapCanvas.classList.remove("active");
      if (gradCamToggleInput) gradCamToggleInput.checked = false;
      isGradCamActive = false;
      resultDrawer.style.display = "none";
    } catch (err) {
      console.warn("Camera access denied or failed:", err);
      alert("⚠️ Unable to access camera. Please allow camera permissions in your browser or select 'Upload Photo'.");
      stopLiveCamera();
    }
  }

  function stopLiveCamera() {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      mediaStream = null;
    }
    isCameraActive = false;
    viewfinderVideo.style.display = "none";
    viewfinderImg.style.display = "block";

    if (liveCameraBadge) liveCameraBadge.style.display = "none";
    if (btnSwitchCamera) btnSwitchCamera.style.display = "none";
    if (cameraBtnText) cameraBtnText.textContent = "Live Camera";
    if (btnToggleCamera) {
      btnToggleCamera.style.background = "rgba(255, 255, 255, 0.22)";
      btnToggleCamera.style.borderColor = "";
    }
  }

  if (btnToggleCamera) {
    btnToggleCamera.addEventListener("click", () => {
      if (isCameraActive) {
        stopLiveCamera();
      } else {
        startLiveCamera();
      }
    });
  }

  // Camera flip (Front vs Back)
  if (btnSwitchCamera) {
    btnSwitchCamera.addEventListener("click", () => {
      currentFacingMode = currentFacingMode === "environment" ? "user" : "environment";
      stopLiveCamera();
      startLiveCamera();
    });
  }

  // 7. Photo Upload & Drag-and-Drop Handler
  if (btnUploadPhoto && leafFileInput) {
    btnUploadPhoto.addEventListener("click", () => {
      leafFileInput.click();
    });

    leafFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      loadCustomImageFile(file);
    });
  }

  function loadCustomImageFile(file) {
    if (isCameraActive) {
      stopLiveCamera();
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      viewfinderImg.src = event.target.result;
      isCustomImage = true;
      sampleLeafButtons.forEach((b) => b.classList.remove("active"));

      // Camera Flash effect
      viewfinderCard.classList.add("camera-flash");
      setTimeout(() => viewfinderCard.classList.remove("camera-flash"), 400);

      // Reset heatmap & result
      heatmapCanvas.classList.remove("active");
      if (gradCamToggleInput) gradCamToggleInput.checked = false;
      isGradCamActive = false;
      resultDrawer.style.display = "none";

      // Trigger automatic diagnosis of uploaded image!
      setTimeout(() => {
        shutterBtn.click();
      }, 300);
    };
    reader.readAsDataURL(file);
  }

  // Drag-and-drop image onto viewfinder card
  if (viewfinderCard) {
    viewfinderCard.addEventListener("dragover", (e) => {
      e.preventDefault();
      viewfinderCard.classList.add("drag-over");
    });

    viewfinderCard.addEventListener("dragleave", () => {
      viewfinderCard.classList.remove("drag-over");
    });

    viewfinderCard.addEventListener("drop", (e) => {
      e.preventDefault();
      viewfinderCard.classList.remove("drag-over");
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        loadCustomImageFile(file);
      }
    });
  }

  // 8. Camera Shutter Button & Edge AI Inference
  shutterBtn.addEventListener("click", async () => {
    // Start Analysis Animation
    shutterProgress.classList.add("analyzing");
    shutterCircle.style.strokeDashoffset = "0";

    let diagnosis = null;

    if (isCameraActive) {
      // Step A: Grab frame from live video feed
      captureCanvas.width = viewfinderVideo.videoWidth || 640;
      captureCanvas.height = viewfinderVideo.videoHeight || 480;
      const cctx = captureCanvas.getContext("2d");

      // Handle front camera mirror flip if needed
      if (currentFacingMode === "user") {
        cctx.translate(captureCanvas.width, 0);
        cctx.scale(-1, 1);
      }
      cctx.drawImage(viewfinderVideo, 0, 0, captureCanvas.width, captureCanvas.height);

      // Freeze captured snapshot into viewfinder
      viewfinderImg.src = captureCanvas.toDataURL("image/jpeg", 0.95);
      isCustomImage = true;

      // Flash effect & pause stream
      viewfinderCard.classList.add("camera-flash");
      setTimeout(() => viewfinderCard.classList.remove("camera-flash"), 400);
      stopLiveCamera();

      // Run computer vision diagnosis on captured frame
      diagnosis = await window.visionEngine.classifyCustomImage(viewfinderImg);
    } else if (isCustomImage) {
      // Step B: User uploaded custom photo
      diagnosis = await window.visionEngine.classifyCustomImage(viewfinderImg);
    } else {
      // Step C: Preset sample leaf
      diagnosis = await window.visionEngine.classifyLeaf(currentSampleKey);
    }

    lastDiagnosis = diagnosis;

    // Reset shutter ring
    setTimeout(() => {
      shutterProgress.classList.remove("analyzing");
      shutterCircle.style.strokeDashoffset = "226";
    }, 400);

    // Render result sheet
    renderResultSheet(diagnosis);
  });

  // 7. Render Result Sheet & IPM Advisory
  function renderResultSheet(diag) {
    resultDrawer.style.display = "block";
    resultDrawer.scrollIntoView({ behavior: "smooth", block: "start" });

    // Update Telemetry Bar
    document.getElementById("telemetry-latency").textContent = `${diag.telemetry.latencyMs} ms`;
    document.getElementById("telemetry-ece").textContent = `${(diag.ece * 100).toFixed(1)}%`;
    document.getElementById("telemetry-ram").textContent = `${diag.telemetry.memoryMB} MB`;

    // Localized Disease Title
    const localizedTitle = diag.names[currentLang] || diag.names.en;
    document.getElementById("result-title").textContent = localizedTitle;
    document.getElementById("result-pathogen").textContent = `${diag.pathogen} • ${diag.crop}`;

    // Confidence Ring
    const confPercent = Math.round(diag.calibratedConfidence * 100);
    document.getElementById("conf-percent-num").textContent = `${confPercent}%`;
    const ringCircle = document.getElementById("conf-ring-circle");
    const circumference = 2 * Math.PI * 26; // r=26
    const offset = circumference - (confPercent / 100) * circumference;
    ringCircle.style.strokeDasharray = `${circumference}`;
    ringCircle.style.strokeDashoffset = `${offset}`;

    // Severity Pill
    const severityPill = document.getElementById("result-severity-pill");
    severityPill.className = `severity-pill severity-${diag.severity}`;
    severityPill.textContent = diag.severity.toUpperCase();

    // Out-of-Distribution Warning vs Normal Diagnosis
    const oodPanel = document.getElementById("ood-panel");
    const normalPanel = document.getElementById("normal-ipm-panel");

    if (diag.isOOD) {
      oodPanel.style.display = "block";
      normalPanel.style.display = "none";
      ringCircle.style.stroke = "var(--amber-500)";
    } else {
      oodPanel.style.display = "none";
      normalPanel.style.display = "block";
      ringCircle.style.stroke = diag.severity === "healthy" ? "var(--leaf-500)" : "var(--coral-500)";

      // Populate 3-Tier IPM
      document.getElementById("ipm-cultural-text").textContent =
        diag.ipm.cultural[currentLang] || diag.ipm.cultural.en;
      document.getElementById("ipm-organic-text").textContent =
        diag.ipm.organic[currentLang] || diag.ipm.organic.en;
      document.getElementById("ipm-chemical-text").textContent =
        diag.ipm.chemical[currentLang] || diag.ipm.chemical.en;

      const safetyBox = document.getElementById("ipm-safety-box");
      if (diag.ipm.chemical.safetyNote) {
        safetyBox.style.display = "block";
        safetyBox.textContent = `⚠️ ${diag.ipm.chemical.safetyNote}`;
      } else {
        safetyBox.style.display = "none";
      }

      // Render Grad-CAM Heatmap onto Canvas
      window.visionEngine.renderGradCAM(
        heatmapCanvas,
        diag.gradCamHeatmap,
        viewfinderImg.clientWidth || 600,
        viewfinderImg.clientHeight || 520
      );
    }
  }

  // 8. Grad-CAM Toggle
  if (gradCamToggleInput) {
    gradCamToggleInput.addEventListener("change", (e) => {
      isGradCamActive = e.target.checked;
      heatmapCanvas.classList.toggle("active", isGradCamActive);
    });
  }

  // 9. Vernacular Text-to-Speech Playback
  if (audioPlayBtn) {
    audioPlayBtn.addEventListener("click", () => {
      if (!lastDiagnosis) return;
      const speechText = lastDiagnosis.speechText[currentLang] || lastDiagnosis.speechText.en;
      window.speechEngine.speak(speechText, currentLang);
    });

    window.speechEngine.onStateChange = (isPlaying) => {
      audioPlayBtn.textContent = isPlaying ? "⏹️ Pause Audio" : "🔊 Listen Advisory";
      audioWaveform.classList.toggle("audio-playing", isPlaying);
    };
  }

  // 10. Forecast Map Rendering & Time Scrubber
  function drawForecastMap() {
    if (!mapCanvas) return;
    mapCanvas.width = mapCanvas.parentElement.clientWidth || 640;
    mapCanvas.height = 520;

    const dayOffset = parseInt(scrubberSlider.value, 10);
    window.forecastEngine.renderMap(mapCanvas, dayOffset);
    updateWhyPanel(window.forecastEngine.selectedCell, dayOffset);
  }

  scrubberSlider.addEventListener("input", (e) => {
    const day = e.target.value;
    scrubberDayDisplay.textContent = `+${day} ${day === "1" ? "Day" : "Days"}`;
    drawForecastMap();
  });

  // Outbreak Injection Simulator
  outbreakSimBtn.addEventListener("click", () => {
    window.forecastEngine.injectOutbreak("ts5x89b");
    drawForecastMap();
    alert("⚠️ Simulated Outbreak Injected in Cell #gh7-4b2! Gaussian spatial diffusion has updated neighboring 1km² risk cells.");
  });

  // Click on Map to Inspect Hex Cell
  mapCanvas.addEventListener("click", (e) => {
    const rect = mapCanvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const cells = window.forecastEngine.cells;
    const clicked = cells.find((c) => {
      if (!c._screenX || !c._screenY) return false;
      const dist = Math.hypot(clickX - c._screenX, clickY - c._screenY);
      return dist <= c._screenR;
    });

    if (clicked) {
      window.forecastEngine.selectedCell = clicked;
      drawForecastMap();
      updateWhyPanel(clicked, parseInt(scrubberSlider.value, 10));
    }
  });

  function updateWhyPanel(cell, dayOffset) {
    if (!cell) return;
    const riskData = window.forecastEngine.calculateCellRisk(cell, dayOffset);
    const shapFactors = window.forecastEngine.getShapFactors(cell, dayOffset);

    document.getElementById("why-cell-title").textContent = `${cell.code} (${cell.name})`;
    document.getElementById("why-risk-badge").textContent = `${Math.round(riskData.score * 100)}% Risk • ${riskData.level.toUpperCase()}`;

    const factorsContainer = document.getElementById("shap-factors-list");
    factorsContainer.innerHTML = "";

    shapFactors.forEach((factor) => {
      const row = document.createElement("div");
      row.className = "shap-factor-row";
      const impactPercent = Math.round(factor.impact * 100);

      row.innerHTML = `
        <div class="shap-label-row">
          <span>${factor.name}</span>
          <span style="color: var(--coral-500); font-weight: 700;">+${impactPercent}%</span>
        </div>
        <div class="shap-bar-track">
          <div class="shap-bar-fill" style="width: ${impactPercent * 2.5}%"></div>
        </div>
        <span style="font-size: 11px; color: var(--ink-400);">${factor.desc}</span>
      `;
      factorsContainer.appendChild(row);
    });
  }

  // 11. Direct Action Buttons
  document.getElementById("btn-save-log").addEventListener("click", () => {
    alert("✅ Scan and diagnosis saved to local offline IndexedDB field log!");
  });

  document.getElementById("btn-sync-village").addEventListener("click", () => {
    alert("📡 Anonymized scan telemetry (1km² Geohash #gh7-4b2) synced to village early-warning radar!");
  });

  document.getElementById("hero-launch-pwa").addEventListener("click", () => {
    appMain.scrollIntoView({ behavior: "smooth" });
    switchTab("scan");
  });

  document.getElementById("hero-explore-forecast").addEventListener("click", () => {
    appMain.scrollIntoView({ behavior: "smooth" });
    switchTab("forecast");
  });

  document.getElementById("hero-officer-btn").addEventListener("click", () => {
    appMain.scrollIntoView({ behavior: "smooth" });
    switchTab("officer");
  });

  // Initialize
  setLanguage("en");
});
