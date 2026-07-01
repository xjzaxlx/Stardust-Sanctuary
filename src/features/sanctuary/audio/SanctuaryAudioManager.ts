type BrowserWindowWithAudio = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

const nowRamp = 0.018;

function cancelAndRamp(param: AudioParam, value: number, time: number, duration = nowRamp) {
  param.cancelScheduledValues(time);
  param.setTargetAtTime(value, time, duration);
}

export class SanctuaryAudioManager {
  private context: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private interactionGain: GainNode | null = null;
  private ambientFilter: BiquadFilterNode | null = null;
  private ambientOscillators: OscillatorNode[] = [];
  private shimmerReadyAt = 0;

  async initialize() {
    if (this.context) {
      if (this.context.state === "suspended") {
        await this.context.resume();
      }

      return;
    }

    const AudioContextCtor =
      window.AudioContext ?? (window as BrowserWindowWithAudio).webkitAudioContext;

    if (!AudioContextCtor) {
      return;
    }

    const context = new AudioContextCtor();
    const masterGain = context.createGain();
    const ambientGain = context.createGain();
    const interactionGain = context.createGain();
    const ambientFilter = context.createBiquadFilter();

    masterGain.gain.value = 0.34;
    ambientGain.gain.value = 0.024;
    interactionGain.gain.value = 0.12;
    ambientFilter.type = "lowpass";
    ambientFilter.frequency.value = 520;
    ambientFilter.Q.value = 0.62;

    ambientGain.connect(ambientFilter);
    ambientFilter.connect(masterGain);
    interactionGain.connect(masterGain);
    masterGain.connect(context.destination);

    this.context = context;
    this.masterGain = masterGain;
    this.ambientGain = ambientGain;
    this.interactionGain = interactionGain;
    this.ambientFilter = ambientFilter;
    this.startAmbient();

    if (context.state === "suspended") {
      await context.resume();
    }
  }

  setMuted(isMuted: boolean) {
    const context = this.context;
    const masterGain = this.masterGain;

    if (!context || !masterGain) {
      return;
    }

    cancelAndRamp(masterGain.gain, isMuted ? 0 : 0.34, context.currentTime, 0.04);
  }

  setNearFragment(isNear: boolean) {
    const context = this.context;
    const ambientGain = this.ambientGain;
    const ambientFilter = this.ambientFilter;

    if (!context || !ambientGain || !ambientFilter) {
      return;
    }

    const time = context.currentTime;
    cancelAndRamp(ambientGain.gain, isNear ? 0.034 : 0.024, time, 0.12);
    cancelAndRamp(ambientFilter.frequency, isNear ? 760 : 520, time, 0.16);

    if (isNear) {
      this.playShimmer();
    }
  }

  playConnection() {
    const context = this.context;
    const interactionGain = this.interactionGain;

    if (!context || !interactionGain) {
      return;
    }

    const time = context.currentTime;
    this.playTone({ frequency: 440, start: time, duration: 0.82, gain: 0.028 });
    this.playTone({ frequency: 660, start: time + 0.035, duration: 0.72, gain: 0.018 });
  }

  playChapterComplete() {
    const context = this.context;
    const interactionGain = this.interactionGain;

    if (!context || !interactionGain) {
      return;
    }

    const time = context.currentTime;
    this.playTone({ frequency: 196, start: time, duration: 1.8, gain: 0.026, type: "triangle" });
    this.playTone({
      frequency: 293.66,
      start: time + 0.08,
      duration: 1.7,
      gain: 0.022,
      type: "triangle",
    });
    this.playTone({
      frequency: 392,
      start: time + 0.14,
      duration: 1.55,
      gain: 0.018,
      type: "sine",
    });
  }

  async dispose() {
    const context = this.context;

    for (const oscillator of this.ambientOscillators) {
      oscillator.stop();
      oscillator.disconnect();
    }

    this.ambientOscillators = [];
    this.masterGain?.disconnect();
    this.ambientGain?.disconnect();
    this.interactionGain?.disconnect();
    this.ambientFilter?.disconnect();
    this.masterGain = null;
    this.ambientGain = null;
    this.interactionGain = null;
    this.ambientFilter = null;
    this.context = null;

    if (context && context.state !== "closed") {
      await context.close();
    }
  }

  private startAmbient() {
    const context = this.context;
    const ambientGain = this.ambientGain;

    if (!context || !ambientGain) {
      return;
    }

    const partials = [
      { frequency: 55, detune: -7, type: "sine" as OscillatorType },
      { frequency: 82.41, detune: 5, type: "triangle" as OscillatorType },
    ];

    this.ambientOscillators = partials.map((partial) => {
      const oscillator = context.createOscillator();
      const partialGain = context.createGain();

      oscillator.type = partial.type;
      oscillator.frequency.value = partial.frequency;
      oscillator.detune.value = partial.detune;
      partialGain.gain.value = 0.5;
      oscillator.connect(partialGain);
      partialGain.connect(ambientGain);
      oscillator.start();

      return oscillator;
    });
  }

  private playShimmer() {
    const context = this.context;

    if (!context || context.currentTime < this.shimmerReadyAt) {
      return;
    }

    this.shimmerReadyAt = context.currentTime + 0.42;
    this.playTone({
      frequency: 1180 + Math.random() * 140,
      start: context.currentTime,
      duration: 0.34,
      gain: 0.01,
      type: "sine",
    });
  }

  private playTone({
    frequency,
    start,
    duration,
    gain,
    type = "sine",
  }: {
    frequency: number;
    start: number;
    duration: number;
    gain: number;
    type?: OscillatorType;
  }) {
    const context = this.context;
    const interactionGain = this.interactionGain;

    if (!context || !interactionGain) {
      return;
    }

    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    const filter = context.createBiquadFilter();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2400, start);
    filter.Q.setValueAtTime(0.54, start);
    envelope.gain.setValueAtTime(0, start);
    envelope.gain.linearRampToValueAtTime(gain, start + 0.045);
    envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    oscillator.connect(filter);
    filter.connect(envelope);
    envelope.connect(interactionGain);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.04);
    oscillator.addEventListener("ended", () => {
      oscillator.disconnect();
      filter.disconnect();
      envelope.disconnect();
    });
  }
}
