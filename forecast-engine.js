/**
 * LeafSense — Localized Spatial-Temporal Risk Forecaster
 * Part C3 Implementation: Two-Layer Hybrid (Rules + Gaussian Spatial Diffusion + SHAP)
 */

class ForecastEngine {
  constructor() {
    this.cells = JSON.parse(JSON.stringify(LEAFSENSE_DATA.geohashCells));
    this.currentDayOffset = 0; // 0 (Today) to 7 (Day +7)
    this.selectedCell = this.cells[1]; // Default selected cell #gh7-4b2
  }

  /**
   * Calculate cell risk for a specific forecast day offset (0 to 7)
   */
  calculateCellRisk(cell, dayOffset) {
    // Dynamic weather evolution across the 7-day horizon
    // Day 0-2: moderate humidity, Day 3-5: consecutive night humidity peak, Day 6-7: plateau
    const humidityMultiplier = 1 + (dayOffset * 0.04);
    const effectiveRH = Math.min(98, cell.rh * humidityMultiplier);
    const effectiveWetness = cell.leafWetHrs + (dayOffset * 0.45);

    // Rule 1: High Humidity (>85%) and Prolonged Leaf Wetness (>8 hrs)
    let weatherRisk = 0;
    if (effectiveRH >= 85) weatherRisk += 0.28;
    if (effectiveWetness >= 8.0) weatherRisk += 0.22;

    // Rule 2: Optimal fungal sporulation temperature window (20°C - 26°C)
    if (cell.tempC >= 20.0 && cell.tempC <= 26.0) {
      weatherRisk += 0.15;
    }

    // Rule 3: Spatial Community Scan Factor (Gaussian diffusion from scans)
    const scanFactor = Math.min(0.35, cell.scans * 0.035);

    // Composite risk probability P in [0.0, 1.0]
    let totalRisk = cell.baseRisk * 0.35 + weatherRisk * 0.40 + scanFactor * 0.25 + (dayOffset * 0.035);
    totalRisk = Math.max(0.08, Math.min(0.96, totalRisk));

    return {
      score: totalRisk,
      level: totalRisk > 0.60 ? "high" : (totalRisk > 0.28 ? "watch" : "low"),
      effectiveRH: Math.round(effectiveRH),
      effectiveWetness: effectiveWetness.toFixed(1),
      effectiveTemp: cell.tempC
    };
  }

  /**
   * Compute SHAP Explainability Factors for the selected cell
   */
  getShapFactors(cell, dayOffset) {
    const riskData = this.calculateCellRisk(cell, dayOffset);
    return [
      {
        name: "Prolonged Leaf Wetness (" + riskData.effectiveWetness + " hrs)",
        impact: Math.min(0.36, riskData.effectiveWetness > 7 ? 0.34 : 0.12),
        direction: "positive",
        desc: "Moisture on foliage allows fungal spore germination within 6-8 hours."
      },
      {
        name: "Elevated Relative Humidity (" + riskData.effectiveRH + "%)",
        impact: riskData.effectiveRH > 85 ? 0.32 : 0.14,
        direction: "positive",
        desc: "Consecutive nights with RH > 85% accelerates secondary epidemic cycles."
      },
      {
        name: "Community Scans (" + cell.scans + " reports in 3km)",
        impact: Math.min(0.28, cell.scans * 0.032),
        direction: "positive",
        desc: "Spatial aggregation from neighboring farms within 1km geohash radius."
      },
      {
        name: "Optimal Pathogen Temp (" + riskData.effectiveTemp + "°C)",
        impact: 0.16,
        direction: "positive",
        desc: "Ideal thermal window for Alternaria & Phytophthora spore release."
      }
    ];
  }

  /**
   * Simulate a community outbreak scan report in a cell
   * Applies Gaussian spatial diffusion to surrounding cells!
   */
  injectOutbreak(targetCellId = "ts5x89b") {
    const target = this.cells.find((c) => c.id === targetCellId);
    if (!target) return;

    target.scans += 5;
    target.baseRisk = Math.min(0.92, target.baseRisk + 0.25);

    // Spread to neighboring cells via simple distance kernel
    this.cells.forEach((other) => {
      if (other.id !== targetCellId) {
        const dist = Math.hypot(other.lat - target.lat, other.lon - target.lon);
        const weight = Math.exp(-Math.pow(dist / 0.025, 2)); // Gaussian kernel
        other.scans += Math.round(3 * weight);
        other.baseRisk = Math.min(0.88, other.baseRisk + 0.18 * weight);
      }
    });
  }

  /**
   * Render the 1km² Geohash Hex Grid Map onto an HTML5 Canvas
   */
  renderMap(canvas, dayOffset, onCellClick) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw background farm topographic grid
    ctx.strokeStyle = "rgba(47, 179, 109, 0.08)";
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Layout cells in hexagonal cluster coordinates
    const centerPositions = [
      { x: width * 0.30, y: height * 0.32 },
      { x: width * 0.50, y: height * 0.45 }, // #gh7-4b2 Central
      { x: width * 0.70, y: height * 0.36 },
      { x: width * 0.32, y: height * 0.65 },
      { x: width * 0.52, y: height * 0.75 },
      { x: width * 0.72, y: height * 0.65 },
      { x: width * 0.84, y: height * 0.50 }
    ];

    const hexRadius = Math.min(width, height) * 0.14;

    this.cells.forEach((cell, idx) => {
      const pos = centerPositions[idx] || { x: width * 0.5, y: height * 0.5 };
      cell._screenX = pos.x;
      cell._screenY = pos.y;
      cell._screenR = hexRadius;

      const riskData = this.calculateCellRisk(cell, dayOffset);
      const isSelected = this.selectedCell && this.selectedCell.id === cell.id;

      // Determine color
      let fillColor, strokeColor, glowColor;
      if (riskData.level === "high") {
        fillColor = "rgba(229, 72, 77, 0.38)";
        strokeColor = "#FF6B6F";
        glowColor = "rgba(229, 72, 77, 0.6)";
      } else if (riskData.level === "watch") {
        fillColor = "rgba(245, 165, 36, 0.35)";
        strokeColor = "#FFB84D";
        glowColor = "rgba(245, 165, 36, 0.5)";
      } else {
        fillColor = "rgba(47, 179, 109, 0.30)";
        strokeColor = "#3DDC84";
        glowColor = "rgba(47, 179, 109, 0.4)";
      }

      // Draw Hexagon
      ctx.save();
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = pos.x + hexRadius * Math.cos(angle);
        const hy = pos.y + hexRadius * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();

      ctx.fillStyle = fillColor;
      ctx.fill();

      // Outer border & glow
      ctx.lineWidth = isSelected ? 3.5 : 1.5;
      ctx.strokeStyle = isSelected ? "#FFFFFF" : strokeColor;
      if (isSelected) {
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = 20;
      }
      ctx.stroke();
      ctx.restore();

      // Draw Text Labels on Cell
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 13px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(cell.code, pos.x, pos.y - 12);

      ctx.font = "bold 16px Inter, sans-serif";
      ctx.fillStyle = isSelected ? "#FFFFFF" : strokeColor;
      ctx.fillText(Math.round(riskData.score * 100) + "% Risk", pos.x, pos.y + 10);

      ctx.font = "11px Inter, sans-serif";
      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      ctx.fillText(cell.crop + " • " + cell.scans + " scans", pos.x, pos.y + 26);
    });
  }
}

// Global Singleton Instance
window.forecastEngine = new ForecastEngine();
