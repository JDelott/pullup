'use client';
import React, { useState, useEffect, useCallback } from 'react';

interface WorkoutSettings {
  targetReps: number;
  sets: number;
  restTime: number;
}

interface WorkoutStats {
  totalReps: number;
  totalWorkouts: number;
  totalTime: number;
  caloriesBurned: number;
}

interface WorkoutPreset {
  name: string;
  description: string;
  settings: WorkoutSettings;
}

const CALORIES_PER_REP = 0.75;

const workoutPresets: WorkoutPreset[] = [
  {
    name: 'Beginner',
    description: '3 sets of 5 reps',
    settings: { targetReps: 5, sets: 3, restTime: 90 },
  },
  {
    name: 'Intermediate',
    description: '5 sets of 8 reps',
    settings: { targetReps: 8, sets: 5, restTime: 60 },
  },
  {
    name: 'Advanced',
    description: '8 sets of 10 reps',
    settings: { targetReps: 10, sets: 8, restTime: 45 },
  },
];

const formTips: string[] = [
  'Keep your core tight throughout the movement',
  'Start from a dead hang position',
  'Pull your chest to the bar',
  'Control the descent',
  'Maintain steady breathing',
];

const PullUpCounter = () => {
  const [settings, setSettings] = useState<WorkoutSettings>({
    targetReps: 10,
    sets: 3,
    restTime: 60,
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

  const [stats, setStats] = useState<WorkoutStats>({
    totalReps: 0,
    totalWorkouts: 0,
    totalTime: 0,
    caloriesBurned: 0,
  });

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

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
    let restInterval: ReturnType<typeof setInterval> | null = null;

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
      setCurrentTipIndex((prev) => (prev + 1) % formTips.length);
    }, 5000);

    return () => clearInterval(tipInterval);
  }, []);

  const startWorkout = useCallback((): void => {
    setIsWorkoutActive(true);
    setWorkoutStartTime(Date.now());
    setCurrentSet(1);
    setCurrentReps(0);
    setIsResting(false);
    setRestTimer(0);
    setTotalWorkoutTime(0);
  }, []);

  const addRep = useCallback((): void => {
    if (!isWorkoutActive || isResting) return;

    const newReps = currentReps + 1;
    setCurrentReps(newReps);

    if (newReps >= settings.targetReps) {
      if (currentSet < settings.sets) {
        setIsResting(true);
        setRestTimer(settings.restTime);
        setCurrentSet((prev) => prev + 1);
        setCurrentReps(0);
      } else {
        completeWorkout();
      }
    }
  }, [currentReps, currentSet, settings, isWorkoutActive, isResting]);

  const completeWorkout = useCallback((): void => {
    const totalReps = (currentSet - 1) * settings.targetReps + currentReps;
    const caloriesBurned = Math.round(totalReps * CALORIES_PER_REP);

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
  }, [currentSet, currentReps, settings.targetReps, totalWorkoutTime]);

  const selectPreset = useCallback((preset: WorkoutPreset): void => {
    setSettings(preset.settings);
    setSelectedPreset(preset.name);
  }, []);

  return (
    <section className="relative py-24 bg-neutral-900 min-h-screen text-white">
      {/* Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-40 h-40 bg-[#00FFD1] rounded-full opacity-10"></div>
        <div className="absolute bottom-40 left-20 w-60 h-60 bg-white rounded-lg rotate-45 opacity-5"></div>
      </div>

      <div className="relative container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            TRACK YOUR <span className="block text-[#00FFD1]">PROGRESS</span>
          </h1>
          <p className="text-xl text-gray-400">{formTips[currentTipIndex]}</p>
        </div>

        {!isWorkoutActive && (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {workoutPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => selectPreset(preset)}
                  className={`p-4 rounded-lg border transition-colors ${selectedPreset === preset.name
                      ? 'border-[#00FFD1] bg-[#00FFD1]/10'
                      : 'border-gray-700 hover:border-[#00FFD1]'
                    }`}
                >
                  <h3 className="font-bold mb-2">{preset.name}</h3>
                  <p className="text-sm text-gray-400">{preset.description}</p>
                </button>
              ))}
            </div>

            <button
              onClick={startWorkout}
              className="w-full py-4 bg-[#00FFD1] hover:bg-[#00FFD1]/80 text-black rounded-lg font-bold text-xl transition-colors"
            >
              Start Training
            </button>
          </div>
        )}

        {isWorkoutActive && (
          <div className="bg-neutral-800/50 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <p className="text-gray-400 font-mono text-sm">SET</p>
                <p className="text-3xl font-bold">
                  {currentSet}/{settings.sets}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 font-mono text-sm">REPS</p>
                <p className="text-3xl font-bold">
                  {currentReps}/{settings.targetReps}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 font-mono text-sm">
                  {isResting ? 'REST' : 'READY'}
                </p>
                <p className="text-3xl font-bold">
                  {isResting ? restTimer : '✓'}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 font-mono text-sm">TIME</p>
                <p className="text-3xl font-bold">{formatTime(totalWorkoutTime)}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={addRep}
                disabled={isResting}
                className={`flex-1 py-4 rounded-lg font-bold text-xl transition-colors ${isResting
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-[#00FFD1] hover:bg-[#00FFD1]/80 text-black'
                  }`}
              >
                {isResting ? `Rest ${restTimer}s` : 'Add Rep'}
              </button>
              <button
                onClick={completeWorkout}
                className="px-6 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-colors"
              >
                End
              </button>
            </div>
          </div>
        )}

        <div className="bg-neutral-800/50 backdrop-blur-sm border border-white/10 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-gray-400 font-mono text-sm">TOTAL REPS</p>
              <p className="text-2xl font-bold">{stats.totalReps}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 font-mono text-sm">WORKOUTS</p>
              <p className="text-2xl font-bold">{stats.totalWorkouts}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 font-mono text-sm">TIME</p>
              <p className="text-2xl font-bold">{formatTime(stats.totalTime)}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 font-mono text-sm">CALORIES</p>
              <p className="text-2xl font-bold">{stats.caloriesBurned}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PullUpCounter;
