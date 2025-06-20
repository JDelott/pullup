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
    <section className="relative min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white overflow-hidden">
      {/* Enhanced Background Elements */}
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
            Live Training Session
          </div>

          <h1 className="text-6xl md:text-7xl font-black leading-tight">
            TRACK YOUR
            <span className="block bg-gradient-to-r from-[#00FFD1] to-white bg-clip-text text-transparent">
              PROGRESS
            </span>
          </h1>

          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-neutral-300 leading-relaxed">
              {formTips[currentTipIndex]}
            </p>
            <div className="flex justify-center mt-4 gap-2">
              {formTips.map((_, index) => (
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
              {workoutPresets.map((preset) => (
                <button
                  key={preset.name}
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

            <div className="flex justify-center">
              <button
                onClick={startWorkout}
                className="group relative px-12 py-4 bg-gradient-to-r from-[#00FFD1] to-[#00FFD1]/80 text-black rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00FFD1]/30 active:scale-95"
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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00FFD1]/10 rounded-full text-[#00FFD1] text-sm font-medium mb-4">
                  <div className="w-2 h-2 bg-[#00FFD1] rounded-full animate-pulse"></div>
                  Workout in Progress
                </div>
                <h2 className="text-3xl font-bold">
                  Set {currentSet} of {settings.sets}
                </h2>
              </div>

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
                      style={{ width: `${(currentReps / settings.targetReps) * 100}%` }}
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
              { label: 'Total Reps', value: stats.totalReps, color: 'text-[#00FFD1]' },
              { label: 'Workouts', value: stats.totalWorkouts, color: 'text-green-400' },
              { label: 'Time Trained', value: formatTime(stats.totalTime), color: 'text-blue-400' },
              { label: 'Calories Burned', value: stats.caloriesBurned, color: 'text-orange-400' },
            ].map((stat:any) => (
              <div key={stat.label} className="text-center space-y-3 p-4 rounded-2xl bg-neutral-800/30">
                <p className="text-neutral-400 text-sm font-medium tracking-wider uppercase">
                  {stat.label}
                </p>
                <p className={`text-3xl font-black ${stat.color}`}>
                  {stat.value}
                </p>
                <div className="w-full bg-neutral-700/50 rounded-full h-1">
                  <div
                    className={`h-1 rounded-full transition-all duration-1000 ${stat.color.includes('00FFD1') ? 'bg-[#00FFD1]' :
                        stat.color.includes('green') ? 'bg-green-400' :
                          stat.color.includes('blue') ? 'bg-blue-400' : 'bg-orange-400'
                      }`}
                    style={{ width: `${Math.min((typeof stat.value === 'number' ? stat.value : 0) / 100 * 100, 100)}%` }}
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
