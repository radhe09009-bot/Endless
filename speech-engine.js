/**
 * LeafSense — Vernacular Speech Synthesis Engine
 * Provides audio advisory read-outs in Hindi, Gujarati, and English
 */

class SpeechEngine {
  constructor() {
    this.synth = window.speechSynthesis;
    this.isPlaying = false;
    this.currentUtterance = null;
    this.onStateChange = null;
  }

  speak(text, lang = "en") {
    if (!this.synth) {
      console.warn("Web Speech API not supported on this browser.");
      this.simulateSpeech(text);
      return;
    }

    if (this.isPlaying) {
      this.stop();
      return;
    }

    const langCodes = {
      en: "en-IN",
      hi: "hi-IN",
      gu: "gu-IN"
    };

    const targetLang = langCodes[lang] || "en-IN";
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = targetLang;
    utterance.rate = 0.95; // Slightly slower for clear rural comprehension
    utterance.pitch = 1.0;

    // Pick matching voice if available
    const voices = this.synth.getVoices();
    const matchingVoice = voices.find((v) => v.lang.startsWith(lang));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => {
      this.isPlaying = true;
      if (this.onStateChange) this.onStateChange(true);
    };

    utterance.onend = () => {
      this.isPlaying = false;
      if (this.onStateChange) this.onStateChange(false);
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis error:", e);
      this.isPlaying = false;
      if (this.onStateChange) this.onStateChange(false);
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isPlaying = false;
    if (this.onStateChange) this.onStateChange(false);
  }

  // Graceful simulation fallback
  simulateSpeech(text) {
    this.isPlaying = true;
    if (this.onStateChange) this.onStateChange(true);
    const duration = Math.min(8000, text.length * 50);
    setTimeout(() => {
      this.isPlaying = false;
      if (this.onStateChange) this.onStateChange(false);
    }, duration);
  }
}

// Global Singleton Instance
window.speechEngine = new SpeechEngine();
