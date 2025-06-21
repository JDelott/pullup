'use client';
import React, { useState, useEffect, useCallback } from 'react';

// ==================== TYPES ====================
interface VoiceSettings {
  readonly enabled: boolean;
  readonly pace: 'slow' | 'medium' | 'fast' | 'custom';
  readonly customTiming: {
    readonly upDuration: number;
    readonly holdDuration: number;
    readonly downDuration: number;
    readonly restDuration: number;
  };
  readonly voice: SpeechSynthesisVoice | null;
  readonly volume: number;
  readonly pitch: number;
}

interface WorkoutSettings {
  readonly targetReps: number;
  readonly sets: number;
  readonly restTime: number;
  readonly voice: VoiceSettings;
}

interface WorkoutStats {
  readonly totalReps: number;
  readonly totalWorkouts: number;
  readonly totalTime: number;
  readonly caloriesBurned: number;
}

interface WorkoutPreset {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly settings: WorkoutSettings;
}

// ==================== CONSTANTS ====================
const CALORIES_PER_REP = 0.75;

const VOICE_PACE_PRESETS = {
  slow: { upDuration: 3, holdDuration: 1, downDuration: 4, restDuration: 2 },
  medium: { upDuration: 2, holdDuration: 0.5, downDuration: 3, restDuration: 1.5 },
  fast: { upDuration: 1.5, holdDuration: 0.5, downDuration: 2, restDuration: 1 },
  custom: { upDuration: 2, holdDuration: 1, downDuration: 3, restDuration: 1.5 },
} as const;

const VOICE_COMMANDS = {
  start: ['Get ready', 'Starting workout', 'Let\'s begin'],
  up: ['Pull up', 'Up', 'Lift', 'Pull'],
  hold: ['Hold', 'Squeeze', 'Top position'],
  down: ['Lower down', 'Down', 'Control the descent', 'Slowly down'],
  rest: ['Rest', 'Take a break', 'Breathe'],
  complete: ['Great job', 'Set complete', 'Well done'],
  finish: ['Workout complete', 'Excellent work', 'Training finished'],
} as const;

const WORKOUT_PRESETS: readonly WorkoutPreset[] = [
  {
    id: 'beginner',
    name: 'Beginner',
    description: '3 sets of 5 reps',
    settings: {
      targetReps: 5,
      sets: 3,
      restTime: 90,
      voice: {
        enabled: false,
        pace: 'medium',
        customTiming: VOICE_PACE_PRESETS.medium,
        voice: null,
        volume: 0.8,
        pitch: 1,
      }
    },
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    description: '5 sets of 8 reps',
    settings: {
      targetReps: 8,
      sets: 5,
      restTime: 60,
      voice: {
        enabled: false,
        pace: 'medium',
        customTiming: VOICE_PACE_PRESETS.medium,
        voice: null,
        volume: 0.8,
        pitch: 1,
      }
    },
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description: '8 sets of 10 reps',
    settings: {
      targetReps: 10,
      sets: 8,
      restTime: 45,
      voice: {
        enabled: false,
        pace: 'medium',
        customTiming: VOICE_PACE_PRESETS.medium,
        voice: null,
        volume: 0.8,
        pitch: 1,
      }
    },
  },
] as const;

const FORM_TIPS: readonly string[] = [
  'Keep your core tight throughout the movement',
  'Start from a dead hang position',
  'Pull your chest to the bar',
  'Control the descent',
  'Maintain steady breathing',
] as const;

// ==================== UTILITIES ====================
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const calculateCalories = (reps: number): number =>
  Math.round(reps * CALORIES_PER_REP);

// ==================== VOICE COACHING HOOK ====================
const useVoiceCoaching = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSupported, setIsSupported] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);

      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices();
        setVoices(availableVoices);
      };

      loadVoices();
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speak = useCallback((
    text: string,
    voiceSettings: VoiceSettings
  ): void => {
    if (!isSupported || !voiceSettings.enabled) return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    if (voiceSettings.voice) {
      utterance.voice = voiceSettings.voice;
    }

    utterance.volume = voiceSettings.volume;
    utterance.pitch = voiceSettings.pitch;
    utterance.rate = 1;

    speechSynthesis.speak(utterance);
  }, [isSupported]);

  const getRandomCommand = useCallback((commands: readonly string[]): string => {
    return commands[Math.floor(Math.random() * commands.length)];
  }, []);

  return { voices, isSupported, speak, getRandomCommand };
};

// ==================== VOICE SETTINGS COMPONENT ====================
const VoiceSettingsPanel: React.FC<{
  voiceSettings: VoiceSettings;
  voices: SpeechSynthesisVoice[];
  onSettingsChange: (settings: VoiceSettings) => void;
  isSupported: boolean;
}> = ({ voiceSettings, voices, onSettingsChange, isSupported }) => {
  if (!isSupported) {
    return (
      <div className="p-4 bg-neutral-800/50 rounded-xl border border-neutral-700">
        <p className="text-neutral-400 text-sm">Voice coaching not supported in this browser</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-neutral-800/60 to-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-2xl">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Voice Coaching</h3>
        <button
          onClick={() => onSettingsChange({
            ...voiceSettings,
            enabled: !voiceSettings.enabled
          })}
          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${voiceSettings.enabled ? 'bg-[#00FFD1]' : 'bg-neutral-600'
            }`}
        >
          <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${voiceSettings.enabled ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
        </button>
      </div>

      {voiceSettings.enabled && (
        <>
          <div className="space-y-3">
            <label className="text-sm font-medium text-neutral-300">Movement Pace</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.keys(VOICE_PACE_PRESETS).map((pace) => (
                <button
                  key={pace}
                  onClick={() => onSettingsChange({
                    ...voiceSettings,
                    pace: pace as VoiceSettings['pace'],
                    customTiming: VOICE_PACE_PRESETS[pace as keyof typeof VOICE_PACE_PRESETS]
                  })}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${voiceSettings.pace === pace
                      ? 'bg-[#00FFD1] text-black'
                      : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                    }`}
                >
                  {pace.charAt(0).toUpperCase() + pace.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {voiceSettings.pace === 'custom' && (
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(voiceSettings.customTiming).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <label className="text-xs font-medium text-neutral-400 capitalize">
                    {key.replace('Duration', '')} ({value}s)
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={value}
                    onChange={(e) => onSettingsChange({
                      ...voiceSettings,
                      customTiming: {
                        ...voiceSettings.customTiming,
                        [key]: parseFloat(e.target.value)
                      }
                    })}
                    className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="space-y-3">
            <label className="text-sm font-medium text-neutral-300">Voice</label>
            <select
              value={voiceSettings.voice?.name || ''}
              onChange={(e) => {
                const selectedVoice = voices.find(v => v.name === e.target.value) || null;
                onSettingsChange({ ...voiceSettings, voice: selectedVoice });
              }}
              className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:border-[#00FFD1] focus:outline-none"
            >
              <option value="">Default Voice</option>
              {voices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-400">
                Volume ({Math.round(voiceSettings.volume * 100)}%)
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={voiceSettings.volume}
                onChange={(e) => onSettingsChange({
                  ...voiceSettings,
                  volume: parseFloat(e.target.value)
                })}
                className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-400">
                Pitch ({voiceSettings.pitch})
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={voiceSettings.pitch}
                onChange={(e) => onSettingsChange({
                  ...voiceSettings,
                  pitch: parseFloat(e.target.value)
                })}
                className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
const PullUpCounter = () => {
  // Voice coaching hook
  const { voices, isSupported, speak, getRandomCommand } = useVoiceCoaching();

  // State Management
  const [settings, setSettings] = useState<WorkoutSettings>({
    targetReps: 10,
    sets: 3,
    restTime: 60,
    voice: {
      enabled: false,
      pace: 'medium',
      customTiming: VOICE_PACE_PRESETS.medium,
      voice: null,
      volume: 0.8,
      pitch: 1,
    },
  });

  const [currentSet, setCurrentSet] = useState<number>(1);
  const [currentReps, setCurrentReps] = useState<number>(0);
  const [isResting, setIsResting] = useState<boolean>(false);
  const [restTimer, setRestTimer] = useState<number>(0);
  const [isWorkoutActive, setIsWorkoutActive] = useState<boolean>(false);
  const [workoutStartTime, setWorkoutStartTime] = useState<number>(0);
  const [totalWorkoutTime, setTotalWorkoutTime] = useState<number>(0);
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [currentTipIndex, setCurrentTipIndex] = useState<number>(0);
  const [voiceCoachingActive, setVoiceCoachingActive] = useState<boolean>(false);
  const [currentPhase, setCurrentPhase] = useState<'ready' | 'up' | 'hold' | 'down' | 'rest'>('ready');
  const [showVoiceSettings, setShowVoiceSettings] = useState<boolean>(false);

  const [stats, setStats] = useState<WorkoutStats>({
    totalReps: 0,
    totalWorkouts: 0,
    totalTime: 0,
    caloriesBurned: 0,
  });

  // Effects
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isWorkoutActive) {
      interval = setInterval(() => {
        setTotalWorkoutTime(Math.floor((Date.now() - workoutStartTime) / 1000));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isWorkoutActive, workoutStartTime]);

  useEffect(() => {
    let restInterval: NodeJS.Timeout | null = null;

    if (isResting && restTimer > 0) {
      restInterval = setInterval(() => {
        setRestTimer((prev) => {
          if (prev <= 1) {
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (restInterval) clearInterval(restInterval);
    };
  }, [isResting, restTimer]);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % FORM_TIPS.length);
    }, 5000);

    return () => clearInterval(tipInterval);
  }, []);

  // Voice coaching effect
  useEffect(() => {
    if (!settings.voice.enabled || !isWorkoutActive || isResting) return;

    let phaseTimer: NodeJS.Timeout;
    const timing = settings.voice.pace === 'custom'
      ? settings.voice.customTiming
      : VOICE_PACE_PRESETS[settings.voice.pace];

    const runVoiceCoaching = () => {
      setCurrentPhase('up');
      speak(getRandomCommand(VOICE_COMMANDS.up), settings.voice);

      phaseTimer = setTimeout(() => {
        setCurrentPhase('hold');
        speak(getRandomCommand(VOICE_COMMANDS.hold), settings.voice);

        phaseTimer = setTimeout(() => {
          setCurrentPhase('down');
          speak(getRandomCommand(VOICE_COMMANDS.down), settings.voice);

          phaseTimer = setTimeout(() => {
            setCurrentPhase('rest');
            if (currentReps + 1 < settings.targetReps) {
              speak(getRandomCommand(VOICE_COMMANDS.rest), settings.voice);
            }

            phaseTimer = setTimeout(() => {
              setCurrentPhase('ready');
              if (currentReps + 1 < settings.targetReps) {
                runVoiceCoaching();
              }
            }, timing.restDuration * 1000);
          }, timing.downDuration * 1000);
        }, timing.holdDuration * 1000);
      }, timing.upDuration * 1000);
    };

    if (voiceCoachingActive && currentReps < settings.targetReps) {
      runVoiceCoaching();
    }

    return () => {
      if (phaseTimer) clearTimeout(phaseTimer);
    };
  }, [voiceCoachingActive, currentReps, settings.voice, isWorkoutActive, isResting, speak, getRandomCommand]);

  // Event Handlers
  const startWorkout = useCallback((): void => {
    setIsWorkoutActive(true);
    setWorkoutStartTime(Date.now());
    setCurrentSet(1);
    setCurrentReps(0);
    setIsResting(false);
    setRestTimer(0);
    setTotalWorkoutTime(0);

    if (settings.voice.enabled) {
      setVoiceCoachingActive(true);
      speak(getRandomCommand(VOICE_COMMANDS.start), settings.voice);
    }
  }, [settings.voice, speak, getRandomCommand]);

  const addRep = useCallback((): void => {
    if (!isWorkoutActive || isResting) return;

    const newReps = currentReps + 1;
    setCurrentReps(newReps);

    if (newReps >= settings.targetReps) {
      setVoiceCoachingActive(false);
      if (settings.voice.enabled) {
        speak(getRandomCommand(VOICE_COMMANDS.complete), settings.voice);
      }

      if (currentSet < settings.sets) {
        setIsResting(true);
        setRestTimer(settings.restTime);
        setCurrentSet((prev) => prev + 1);
        setCurrentReps(0);

        setTimeout(() => {
          if (settings.voice.enabled) {
            setVoiceCoachingActive(true);
          }
        }, settings.restTime * 1000);
      } else {
        completeWorkout();
      }
    }
  }, [currentReps, currentSet, settings, isWorkoutActive, isResting, speak, getRandomCommand]);

  const completeWorkout = useCallback((): void => {
    const totalReps = (currentSet - 1) * settings.targetReps + currentReps;
    const caloriesBurned = calculateCalories(totalReps);

    setStats((prev) => ({
      totalReps: prev.totalReps + totalReps,
      totalWorkouts: prev.totalWorkouts + 1,
      totalTime: prev.totalTime + totalWorkoutTime,
      caloriesBurned: prev.caloriesBurned + caloriesBurned,
    }));

    setIsWorkoutActive(false);
    setWorkoutStartTime(0);
    setCurrentSet(1);
    setCurrentReps(0);
    setIsResting(false);
    setRestTimer(0);
    setVoiceCoachingActive(false);

    if (settings.voice.enabled) {
      speak(getRandomCommand(VOICE_COMMANDS.finish), settings.voice);
    }
  }, [currentSet, currentReps, settings.targetReps, totalWorkoutTime, settings.voice, speak, getRandomCommand]);

  const selectPreset = useCallback((preset: WorkoutPreset): void => {
    setSettings(preset.settings);
    setSelectedPreset(preset.name);
  }, []);

  // Voice coaching indicator
  const renderVoiceCoachingIndicator = () => {
    if (!settings.voice.enabled || !voiceCoachingActive) return null;

    const phaseColors = {
      ready: 'text-neutral-400',
      up: 'text-[#00FFD1]',
      hold: 'text-yellow-400',
      down: 'text-orange-400',
      rest: 'text-green-400',
    };

    return (
      <div className="text-center mb-6">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-neutral-800/50 ${phaseColors[currentPhase]}`}>
          <div className={`w-2 h-2 rounded-full animate-pulse ${currentPhase === 'up' ? 'bg-[#00FFD1]' :
              currentPhase === 'hold' ? 'bg-yellow-400' :
                currentPhase === 'down' ? 'bg-orange-400' : 'bg-green-400'
            }`}></div>
          Voice Coaching: {currentPhase.toUpperCase()}
        </div>
      </div>
    );
  };

  // ==================== RENDER ====================
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#00FFD1]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#00FFD1]/5 to-transparent rounded-full"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-24 max-w-5xl">
        {/* Header Section */}
        <header className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#00FFD1]/10 border border-[#00FFD1]/20 rounded-full text-sm font-medium text-[#00FFD1] mb-4">
            <div className="w-2 h-2 bg-[#00FFD1] rounded-full animate-pulse"></div>
            {isWorkoutActive ? 'Live Training Session' : 'Ready to Train'}
          </div>

          <h1 className="text-6xl md:text-7xl font-black leading-tight">
            TRACK YOUR
            <span className="block bg-gradient-to-r from-[#00FFD1] to-white bg-clip-text text-transparent">
              PROGRESS
            </span>
          </h1>

          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-neutral-300 leading-relaxed">
              {FORM_TIPS[currentTipIndex]}
            </p>
            <div className="flex justify-center mt-4 gap-2">
              {FORM_TIPS.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentTipIndex ? 'bg-[#00FFD1] w-8' : 'bg-neutral-600'
                    }`}
                />
              ))}
            </div>
          </div>
        </header>

        {/* Workout Setup */}
        {!isWorkoutActive && (
          <div className="mb-12 space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-neutral-300 mb-2">Choose Your Challenge</h2>
              <p className="text-neutral-400">Select a preset or customize your workout</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {WORKOUT_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => selectPreset(preset)}
                  className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${selectedPreset === preset.name
                    ? 'border-[#00FFD1] bg-gradient-to-br from-[#00FFD1]/10 to-[#00FFD1]/5 shadow-lg shadow-[#00FFD1]/20'
                    : 'border-neutral-700 bg-neutral-800/50 hover:border-[#00FFD1]/50 hover:bg-neutral-800/70'
                    }`}
                >
                  <div className="text-left space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">{preset.name}</h3>
                      {selectedPreset === preset.name && (
                        <div className="w-3 h-3 bg-[#00FFD1] rounded-full"></div>
                      )}
                    </div>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {preset.description}
                    </p>
                    <div className="pt-2 border-t border-neutral-700/50">
                      <div className="flex justify-between text-xs text-neutral-500">
                        <span>Rest: {preset.settings.restTime}s</span>
                        <span>Total: {preset.settings.sets * preset.settings.targetReps} reps</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Voice Settings Toggle */}
            <div className="flex justify-center mb-6">
              <button
                onClick={() => setShowVoiceSettings(!showVoiceSettings)}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-800/50 border border-neutral-700 rounded-xl hover:border-[#00FFD1]/50 transition-all duration-300"
              >
                <span className="text-sm font-medium">Voice Coaching</span>
                <div className={`transform transition-transform duration-300 ${showVoiceSettings ? 'rotate-180' : ''}`}>
                  ↓
                </div>
              </button>
            </div>

            {/* Voice Settings Panel */}
            {showVoiceSettings && (
              <VoiceSettingsPanel
                voiceSettings={settings.voice}
                voices={voices}
                onSettingsChange={(voiceSettings) => setSettings(prev => ({ ...prev, voice: voiceSettings }))}
                isSupported={isSupported}
              />
            )}

            <div className="flex justify-center">
              <button
                onClick={startWorkout}
                disabled={!selectedPreset}
                className="group relative px-12 py-4 bg-gradient-to-r from-[#00FFD1] to-[#00FFD1]/80 text-black rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00FFD1]/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">Start Training</span>
                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        )}

        {/* Active Workout Interface */}
        {isWorkoutActive && (
          <div className="mb-12">
            <div className="bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
              {/* Workout Progress Header */}
              <div className="text-center mb-8">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 ${isResting ? 'bg-orange-400/10 text-orange-400' : 'bg-[#00FFD1]/10 text-[#00FFD1]'
                  }`}>
                  <div className={`w-2 h-2 rounded-full animate-pulse ${isResting ? 'bg-orange-400' : 'bg-[#00FFD1]'
                    }`}></div>
                  {isResting ? 'Rest Period' : 'Workout in Progress'}
                </div>
                <h2 className="text-3xl font-bold">
                  Set {currentSet} of {settings.sets}
                </h2>
              </div>

              {/* Voice Coaching Indicator */}
              {renderVoiceCoachingIndicator()}

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center space-y-2">
                  <p className="text-neutral-400 text-sm font-medium tracking-wider uppercase">Current Set</p>
                  <p className="text-4xl font-black text-[#00FFD1]">
                    {currentSet}<span className="text-2xl text-neutral-500">/{settings.sets}</span>
                  </p>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-neutral-400 text-sm font-medium tracking-wider uppercase">Reps Done</p>
                  <p className="text-4xl font-black">
                    {currentReps}<span className="text-2xl text-neutral-500">/{settings.targetReps}</span>
                  </p>
                  <div className="w-full bg-neutral-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#00FFD1] to-white h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((currentReps / settings.targetReps) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-neutral-400 text-sm font-medium tracking-wider uppercase">
                    {isResting ? 'Rest Time' : 'Status'}
                  </p>
                  <p className={`text-4xl font-black ${isResting ? 'text-orange-400' : 'text-green-400'}`}>
                    {isResting ? restTimer : 'READY'}
                  </p>
                  {isResting && (
                    <div className="w-full bg-neutral-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-orange-400 to-red-400 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${((settings.restTime - restTimer) / settings.restTime) * 100}%` }}
                      ></div>
                    </div>
                  )}
                </div>

                <div className="text-center space-y-2">
                  <p className="text-neutral-400 text-sm font-medium tracking-wider uppercase">Duration</p>
                  <p className="text-4xl font-black font-mono">{formatTime(totalWorkoutTime)}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={addRep}
                  disabled={isResting}
                  className={`flex-1 py-4 rounded-2xl font-bold text-xl transition-all duration-300 ${isResting
                    ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#00FFD1] to-[#00FFD1]/80 text-black hover:scale-105 hover:shadow-lg hover:shadow-[#00FFD1]/30 active:scale-95'
                    }`}
                >
                  {isResting ? `Rest ${restTimer}s` : 'Complete Rep'}
                </button>

                {settings.voice.enabled && (
                  <button
                    onClick={() => setVoiceCoachingActive(!voiceCoachingActive)}
                    className={`px-6 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 ${voiceCoachingActive
                        ? 'bg-[#00FFD1] text-black'
                        : 'border-2 border-[#00FFD1] text-[#00FFD1] hover:bg-[#00FFD1] hover:text-black'
                      }`}
                  >
                    🎤
                  </button>
                )}

                <button
                  onClick={completeWorkout}
                  className="px-8 py-4 border-2 border-white/20 text-white font-bold rounded-2xl hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Finish
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Progress Statistics */}
        <div className="bg-gradient-to-br from-neutral-800/60 to-neutral-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Your Progress</h2>
              <p className="text-neutral-400">Track your fitness journey</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-[#00FFD1]/20 to-[#00FFD1]/5 rounded-2xl flex items-center justify-center">
              <div className="w-8 h-8 bg-[#00FFD1] rounded-lg"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Reps', value: stats.totalReps, color: 'text-[#00FFD1]', bgColor: 'bg-[#00FFD1]' },
              { label: 'Workouts', value: stats.totalWorkouts, color: 'text-green-400', bgColor: 'bg-green-400' },
              { label: 'Time Trained', value: formatTime(stats.totalTime), color: 'text-blue-400', bgColor: 'bg-blue-400' },
              { label: 'Calories Burned', value: stats.caloriesBurned, color: 'text-orange-400', bgColor: 'bg-orange-400' },
            ].map((stat) => (
              <div key={stat.label} className="text-center space-y-3 p-4 rounded-2xl bg-neutral-800/30">
                <p className="text-neutral-400 text-sm font-medium tracking-wider uppercase">
                  {stat.label}
                </p>
                <p className={`text-3xl font-black ${stat.color}`}>
                  {stat.value}
                </p>
                <div className="w-full bg-neutral-700/50 rounded-full h-1">
                  <div
                    className={`h-1 rounded-full transition-all duration-1000 ${stat.bgColor}`}
                    style={{
                      width: `${Math.min(
                        (typeof stat.value === 'number' ? stat.value : 0) / 100 * 100,
                        100
                      )}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PullUpCounter;