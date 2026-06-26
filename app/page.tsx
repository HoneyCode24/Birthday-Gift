'use client';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import DeliverySequence from './components/DeliverySequence';
import BirthdayContent from './components/BirthdayContent';

export default function Home() {
  // We start at the 'driving' stage now!
  const [stage, setStage] = useState('driving'); 

  return (
    <main className="relative min-h-screen bg-pink-50 overflow-hidden flex items-center justify-center font-sans">
      <AnimatePresence mode="wait">
        
        {stage === 'driving' || stage === 'panda' ? (
          <DeliverySequence 
            key="delivery" 
            stage={stage} 
            setStage={setStage} 
          />
        ) : (
          <BirthdayContent key="content" />
        )}

      </AnimatePresence>
    </main>
  );
}