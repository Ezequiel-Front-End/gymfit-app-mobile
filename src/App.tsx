/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ScreenId, UserProfile } from './types';
import { SplashScreen } from './screens/SplashScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { SignupScreen } from './screens/SignupScreen';
import { HomeScreen } from './screens/HomeScreen';

const SCREEN_STEPS: Record<ScreenId, number> = {
  splash: 0,
  welcome: 1,
  login: 2,
  signup: 3,
  home: 4,
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('splash');
  const [direction, setDirection] = useState<number>(1);
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('gymfit_user');
    return saved ? JSON.parse(saved) : null;
  });

  const navigateTo = (target: ScreenId, dir?: number) => {
    const targetStep = SCREEN_STEPS[target];
    const currentStep = SCREEN_STEPS[currentScreen];
    const calculatedDir = dir !== undefined ? dir : targetStep >= currentStep ? 1 : -1;
    setDirection(calculatedDir);
    setCurrentScreen(target);
  };

  const handleLogin = (email: string) => {
    const athleteName = email.includes('melissa')
      ? 'Melissa'
      : email.split('@')[0] || 'Melissa';
    const profile: UserProfile = {
      id: 'usr_1',
      name: athleteName.charAt(0).toUpperCase() + athleteName.slice(1),
      email: email,
    };
    setUser(profile);
    localStorage.setItem('gymfit_user', JSON.stringify(profile));
    navigateTo('home', 1);
  };

  const handleSignup = (name: string, email: string) => {
    const profile: UserProfile = {
      id: 'usr_' + Date.now(),
      name: name || 'Melissa',
      email: email,
    };
    setUser(profile);
    localStorage.setItem('gymfit_user', JSON.stringify(profile));
    navigateTo('home', 1);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('gymfit_user');
    navigateTo('welcome', -1);
  };

  // Fluid iOS / Android native screen slide transitions
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : dir < 0 ? '-100%' : 0,
      opacity: dir === 0 ? 0 : 0.85,
      position: 'absolute' as const,
      width: '100%',
      height: '100%',
    }),
    center: {
      x: 0,
      opacity: 1,
      position: 'relative' as const,
      width: '100%',
      height: '100%',
      transition: {
        x: { type: 'spring', stiffness: 340, damping: 34 },
        opacity: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-30%' : dir < 0 ? '100%' : 0,
      opacity: 0.4,
      position: 'absolute' as const,
      width: '100%',
      height: '100%',
      transition: {
        x: { type: 'spring', stiffness: 340, damping: 34 },
        opacity: { duration: 0.25 },
      },
    }),
  };

  return (
    <div className="w-full min-h-screen bg-[#060608] text-white flex items-center justify-center relative overflow-hidden font-sans no-scrollbar">
      {/* Viewport: Centered and responsive up to max-w-md on desktop, full width on mobile */}
      <main className="w-full max-w-md h-screen min-h-screen flex flex-col justify-between overflow-hidden relative shadow-2xl no-scrollbar bg-black">
        <div className="relative w-full h-full overflow-hidden no-scrollbar flex-1 flex flex-col">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            {currentScreen === 'splash' && (
              <motion.div
                key="splash"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full overflow-y-auto no-scrollbar"
              >
                <SplashScreen onFinish={() => navigateTo('welcome', 1)} />
              </motion.div>
            )}

            {currentScreen === 'welcome' && (
              <motion.div
                key="welcome"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full overflow-y-auto no-scrollbar"
              >
                <WelcomeScreen onStart={() => navigateTo('login', 1)} />
              </motion.div>
            )}

            {currentScreen === 'login' && (
              <motion.div
                key="login"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full overflow-y-auto no-scrollbar"
              >
                <LoginScreen
                  onLoginSuccess={handleLogin}
                  onGoToSignup={() => navigateTo('signup', 1)}
                  onBack={() => navigateTo('welcome', -1)}
                />
              </motion.div>
            )}

            {currentScreen === 'signup' && (
              <motion.div
                key="signup"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full overflow-y-auto no-scrollbar"
              >
                <SignupScreen
                  onSignupSuccess={handleSignup}
                  onGoToLogin={() => navigateTo('login', -1)}
                  onBack={() => navigateTo('login', -1)}
                />
              </motion.div>
            )}

            {currentScreen === 'home' && (
              <motion.div
                key="home"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full overflow-y-auto no-scrollbar"
              >
                <HomeScreen
                  user={user}
                  onLogout={handleLogout}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
