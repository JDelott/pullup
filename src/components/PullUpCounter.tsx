// PullUpCounter.tsx
'use client'
import React, { useState, useEffect } from 'react';

interface WorkoutSettings {
  targetReps: number;
  sets: number;
  restTime: number; // in seconds
  repPace: number; // in seconds
}

const PullUpCounter: React.FC = () => {
  const [settings, setSettings] = useState < WorkoutSettings > ({
    targetReps: 10,
    sets: 3,
    restTime: 60,
    repPace: 3, // 3 seconds per rep pace
  });

  const [currentSet, setCurrentSet] = useState(1);
  const [currentReps, setCurrentReps] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [repCountdown, setRepCountdown] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Timer logic for rest periods and rep countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isWorkoutActive && !isPaused) {
      if (isResting && timer > 0) {
        // Rest period countdown
        interval = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
      } else if (!isResting && repCountdown > 0) {
        // Rep pace countdown
        interval = setInterval(() => {
          setRepCountdown((prev) => prev - 1);
        }, 1000);
      } else if (repCountdown === 0 && !isResting) {
        // Reset rep countdown
        setRepCountdown(settings.repPace);
      }
    }

    return () => clearInterval(interval);
  }, [isResting, timer, isWorkoutActive, isPaused, repCountdown, settings.repPace]);

  const startWorkout = () => {
    setIsWorkoutActive(true);
    setCurrentSet(1);
    setCurrentReps(0);
    setRepCountdown(settings.repPace);
    setIsPaused(false);
  };

  const incrementReps = () => {
    if (currentReps < settings.targetReps && !isResting) {
      setCurrentReps(prev => prev + 1);
      setRepCountdown(settings.repPace);

      // If set is complete
      if (currentReps + 1 === settings.targetReps) {
        if (currentSet < settings.sets) {
          setIsResting(true);
          setTimer(settings.restTime);
          setCurrentSet(prev => prev + 1);
          setCurrentReps(0);
        } else {
          // Workout complete
          setIsWorkoutActive(false);
        }
      }
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <section className="py-24 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            PULL-UP
            <span className="text-red-500"> COUNTER</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Track your sets and reps with precision. Stay focused on your form and let us handle the counting.
          </p>
        </div>

        {/* Settings Panel */}
        <div className="mb-12 p-6 rounded-lg bg-neutral-800 border border-neutral-700">
          <h3 className="text-xl font-bold text-white mb-4">Workout Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-gray-400 mb-2">Target Reps</label>
              <input
                type="number"
                value={settings.targetReps}
                onChange={(e) => setSettings({ ...settings, targetReps: parseInt(e.target.value) })}
                className="w-full bg-neutral-900 text-white rounded-lg px-4 py-2 border border-neutral-700"
                min="1"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Sets</label>
              <input
                type="number"
                value={settings.sets}
                onChange={(e) => setSettings({ ...settings, sets: parseInt(e.target.value) })}
                className="w-full bg-neutral-900 text-white rounded-lg px-4 py-2 border border-neutral-700"
                min="1"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Rest Time (seconds)</label>
              <input
                type="number"
                value={settings.restTime}
                onChange={(e) => setSettings({ ...settings, restTime: parseInt(e.target.value) })}
                className="w-full bg-neutral-900 text-white rounded-lg px-4 py-2 border border-neutral-700"
                min="0"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Rep Pace (seconds)</label>
              <input
                type="number"
                value={settings.repPace}
                onChange={(e) => setSettings({ ...settings, repPace: parseInt(e.target.value) })}
                className="w-full bg-neutral-900 text-white rounded-lg px-4 py-2 border border-neutral-700"
                min="1"
              />
            </div>
          </div>
        </div>

        {/* Counter Display */}
        <div className="text-center mb-12">
          <div className="inline-block p-8 rounded-full bg-gradient-to-tr from-red-500/20 to-transparent border-2 border-white/10">
            <div className="text-6xl font-bold text-white mb-2">
              {currentReps} / {settings.targetReps}
            </div>
            <div className="text-gray-400">
              Set {currentSet} of {settings.sets}
            </div>
            {isWorkoutActive && !isResting && (
              <div className="text-2xl text-red-500 mt-2">
                Next Rep: {repCountdown}s
              </div>
            )}
          </div>
        </div>

        {/* Rest Timer Display */}
        {isResting && (
          <div className="text-center mb-12">
            <div className="text-2xl text-white">
              Rest Time: <span className="text-red-500">{timer}s</span>
            </div>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex justify-center gap-4">
          {!isWorkoutActive ? (
            <button
              onClick={startWorkout}
              className="px-8 py-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors"
            >
              Start Workout
            </button>
          ) : (
            <>
              <button
                onClick={incrementReps}
                disabled={isResting}
                className={`px-8 py-4 bg-red-500 text-white font-bold rounded-lg 
                  ${isResting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'} transition-colors`}
              >
                Count Rep
              </button>
              <button
                onClick={togglePause}
                className="px-8 py-4 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition-colors"
              >
                {isPaused ? 'Resume' : 'Pause'}
              </button>
              <button
                onClick={() => setIsWorkoutActive(false)}
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg 
                  hover:bg-white hover:text-black transition-all"
              >
                End Workout
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PullUpCounter;