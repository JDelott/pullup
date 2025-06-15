// PullUpCounter.tsx
'use client'
import React, { useState, useEffect } from 'react';

interface WorkoutSettings {
  targetReps: number;
  sets: number;
  restTime: number;
  repPace: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  threshold: number;
  achieved: boolean;
}

interface WorkoutPreset {
  name: string;
  description: string;
  settings: WorkoutSettings;
}

const CALORIES_PER_REP = 0.75; // Average calories burned per pull-up

const workoutPresets: WorkoutPreset[] = [
  {
    name: 'Beginner',
    description: '3 sets of 5 reps with longer rest',
    settings: { targetReps: 5, sets: 3, restTime: 90, repPace: 4 }
  },
  {
    name: 'Intermediate',
    description: '5 sets of 8 reps',
    settings: { targetReps: 8, sets: 5, restTime: 60, repPace: 3 }
  },
  {
    name: 'Advanced',
    description: '8 sets of 10 reps',
    settings: { targetReps: 10, sets: 8, restTime: 45, repPace: 2 }
  }
];

const initialAchievements: Achievement[] = [
  { id: '1', name: 'Starter', description: 'Complete your first workout', threshold: 1, achieved: false },
  { id: '2', name: 'Dedicated', description: 'Complete 10 workouts', threshold: 10, achieved: false },
  { id: '3', name: 'Pull-up Master', description: 'Reach 1000 total reps', threshold: 1000, achieved: false },
];

const formTips = [
  "Keep your core tight throughout the movement",
  "Start from a dead hang position",
  "Pull your chest to the bar",
  "Control the descent",
  "Maintain steady breathing"
];

const PullUpCounter: React.FC = () => {
  // Core workout settings
  const [settings, setSettings] = useState<WorkoutSettings>({
    targetReps: 10,
    sets: 3,
    restTime: 60,
    repPace: 3, // 3 seconds per rep pace
  });

  // Workout state
  const [currentSet, setCurrentSet] = useState(1);
  const [currentReps, setCurrentReps] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [repCountdown, setRepCountdown] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [workoutStartTime, setWorkoutStartTime] = useState<Date | null>(null);
  const [totalWorkoutTime, setTotalWorkoutTime] = useState(0);

  // Progress tracking
  const [achievements, setAchievements] = useState(initialAchievements);
  const [personalBests, setPersonalBests] = useState({
    mostRepsInSet: 0,
    longestStreak: 0,
    mostSetsCompleted: 0,
  });

  // UI state
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [showStats, setShowStats] = useState(false);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  // Stats
  const [stats, setStats] = useState({
    totalReps: 0,
    totalWorkouts: 0,
    totalTime: 0,
    caloriesBurned: 0,
  });

  // Utility functions
  const calculateCaloriesBurned = (reps: number) => Math.round(reps * CALORIES_PER_REP);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Effect for workout timer
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isWorkoutActive && !isPaused) {
      if (workoutStartTime) {
        interval = setInterval(() => {
          const duration = Math.floor((new Date().getTime() - workoutStartTime.getTime()) / 1000);
          setTotalWorkoutTime(duration);
        }, 1000);
      }

      if (isResting && timer > 0) {
        interval = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
      } else if (!isResting && repCountdown > 0) {
        interval = setInterval(() => {
          setRepCountdown((prev) => prev - 1);
        }, 1000);
      } else if (repCountdown === 0 && !isResting) {
        if (currentReps < settings.targetReps) {
          setCurrentReps(prev => prev + 1);
        }
        setRepCountdown(settings.repPace);
      }
    }

    return () => clearInterval(interval);
  }, [isResting, timer, isWorkoutActive, isPaused, repCountdown, workoutStartTime]);

  // Effect for rotating form tips
  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % formTips.length);
    }, 5000);

    return () => clearInterval(tipInterval);
  }, []);

  const startWorkout = () => {
    setIsWorkoutActive(true);
    setWorkoutStartTime(new Date());
    setCurrentSet(1);
    setCurrentReps(0);
    setRepCountdown(settings.repPace);
    setTotalWorkoutTime(0);
    setIsPaused(false);
  };

  const completeWorkout = () => {
    const totalReps = (currentSet - 1) * settings.targetReps + currentReps;
    const caloriesBurned = calculateCaloriesBurned(totalReps);

    // Update stats
    setStats(prev => ({
      totalReps: prev.totalReps + totalReps,
      totalWorkouts: prev.totalWorkouts + 1,
      totalTime: prev.totalTime + totalWorkoutTime,
      caloriesBurned: prev.caloriesBurned + caloriesBurned
    }));

    // Check for personal bests
    setPersonalBests(prev => ({
      mostRepsInSet: Math.max(prev.mostRepsInSet, currentReps),
      longestStreak: Math.max(prev.longestStreak, currentSet),
      mostSetsCompleted: Math.max(prev.mostSetsCompleted, currentSet)
    }));

    // Check achievements
    checkAchievements();

    setIsWorkoutActive(false);
    setWorkoutStartTime(null);
  };

  const checkAchievements = () => {
    setAchievements(prev => prev.map(achievement => ({
      ...achievement,
      achieved: achievement.id === '1' ||
        (achievement.id === '2' && stats.totalWorkouts >= 10) ||
        (achievement.id === '3' && stats.totalReps >= 1000)
    })));
  };

  return (
    <section className="relative py-24 bg-neutral-900 min-h-screen text-white">
      {/* Abstract geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-40 h-40 bg-[#00FFD1] rounded-full opacity-10"></div>
        <div className="absolute bottom-40 left-20 w-60 h-60 bg-white rounded-lg rotate-45 opacity-5"></div>
      </div>

      <div className="relative container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            TRACK YOUR
            <span className="block text-[#00FFD1]">PROGRESS</span>
          </h1>
          <p className="text-xl text-gray-400">{formTips[currentTipIndex]}</p>
        </div>

        {/* Workout Controls */}
        {!isWorkoutActive ? (
          <div className="mb-8">
            {/* Workout Presets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {workoutPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setSettings(preset.settings);
                    setSelectedPreset(preset.name);
                  }}
                  className={`p-4 rounded-lg border ${selectedPreset === preset.name
                    ? 'border-[#00FFD1] bg-[#00FFD1]/10'
                    : 'border-gray-700 hover:border-[#00FFD1]'
                    }`}
                >
                  <h3 className="font-bold mb-2">{preset.name}</h3>
                  <p className="text-sm text-gray-400">{preset.description}</p>
                </button>
              ))}
            </div>

            {/* Start Button */}
            <button
              onClick={startWorkout}
              className="w-full py-4 bg-[#00FFD1] hover:bg-[#00FFD1]/80 text-black rounded-lg font-bold text-xl transition"
            >
              Start Training
            </button>
          </div>
        ) : (
          /* Active Workout Display */
          <div className="bg-neutral-800/50 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <p className="text-gray-400 font-mono text-sm">SET</p>
                <p className="text-3xl font-bold">{`${currentSet}/${settings.sets}`}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 font-mono text-sm">REPS</p>
                <p className="text-3xl font-bold">{`${currentReps}/${settings.targetReps}`}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 font-mono text-sm">{isResting ? 'REST' : 'PACE'}</p>
                <p className="text-3xl font-bold">{isResting ? timer : repCountdown}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 font-mono text-sm">TIME</p>
                <p className="text-3xl font-bold">{formatTime(totalWorkoutTime)}</p>
              </div>
            </div>

            {/* Workout Control Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="flex-1 py-3 border-2 border-white text-white font-bold rounded-lg 
                hover:bg-white hover:text-black transition-all"
              >
                {isPaused ? 'Resume' : 'Pause'}
              </button>
              <button
                onClick={completeWorkout}
                className="flex-1 py-3 bg-[#00FFD1] hover:bg-[#00FFD1]/80 text-black rounded-lg font-bold transition-colors"
              >
                End Workout
              </button>
            </div>
          </div>
        )}

        {/* Stats and Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Stats Panel */}
          <div className="bg-neutral-800/50 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Statistics</h2>
            <div className="space-y-4">
              {[
                { label: 'Total Reps', value: stats.totalReps },
                { label: 'Workouts', value: stats.totalWorkouts },
                { label: 'Total Time', value: formatTime(stats.totalTime) },
                { label: 'Calories', value: stats.caloriesBurned }
              ].map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-400 font-mono text-sm">{stat.label}</span>
                  <span className="font-bold">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Panel */}
          <div className="bg-neutral-800/50 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Achievements</h2>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-3 rounded-lg ${achievement.achieved ? 'bg-[#00FFD1]/20' : 'bg-neutral-700/50'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold">{achievement.name}</h3>
                    {achievement.achieved && (
                      <span className="text-[#00FFD1]">✓</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default PullUpCounter;