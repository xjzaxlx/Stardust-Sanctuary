export type StardustAudio = {
  resume: () => Promise<void>;
  suspend: () => Promise<void>;
  playConnect: () => void;
  playComplete: () => void;
  dispose: () => void;
  isRunning: () => boolean;
};

type WindowWithWebkitAudio = Window & {
  webkitAudioContext?: typeof AudioContext;
};

export function createStardustAudio(): StardustAudio | null {
  const AudioContextClass =
    window.AudioContext ?? (window as WindowWithWebkitAudio).webkitAudioContext;

  if (!AudioContextClass) {
    return null;
  }

  const context = new AudioContextClass();
  const master = context.createGain();
  const ambientGain = context.createGain();
  const ambient = context.createOscillator();
  const panner = context.createStereoPanner();
  const lfo = context.createOscillator();
  const lfoGain = context.createGain();

  master.gain.value = 0.42;
  ambient.type = "sine";
  ambient.frequency.value = 52;
  ambientGain.gain.value = 0.035;
  lfo.type = "sine";
  lfo.frequency.value = 0.035;
  lfoGain.gain.value = 0.55;

  ambient.connect(ambientGain);
  ambientGain.connect(panner);
  panner.connect(master);
  master.connect(context.destination);
  lfo.connect(lfoGain);
  lfoGain.connect(panner.pan);

  ambient.start();
  lfo.start();

  function playTone(frequency: number, duration: number, pan: number) {
    if (context.state !== "running") {
      return;
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const tonePan = context.createStereoPanner();
    const now = context.currentTime;

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, now);
    tonePan.pan.setValueAtTime(pan, now);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    oscillator.connect(gain);
    gain.connect(tonePan);
    tonePan.connect(master);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.02);
  }

  return {
    resume: () => context.resume(),
    suspend: () => context.suspend(),
    playConnect: () => playTone(420 + Math.random() * 90, 0.75, Math.random() - 0.5),
    playComplete: () => {
      playTone(330, 1.25, -0.35);
      window.setTimeout(() => playTone(495, 1.1, 0.2), 90);
      window.setTimeout(() => playTone(660, 0.95, 0.45), 180);
    },
    dispose: () => {
      ambient.stop();
      lfo.stop();
      context.close();
    },
    isRunning: () => context.state === "running",
  };
}
