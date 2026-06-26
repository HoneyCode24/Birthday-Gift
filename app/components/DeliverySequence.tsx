import { useState, useEffect } from 'react';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
// @ts-ignore
import confetti from 'canvas-confetti';

interface DeliveryProps {
  stage: string;
  setStage: (stage: string) => void;
}



export default function DeliverySequence({ stage, setStage }: DeliveryProps) {
  const [isExploding, setIsExploding] = useState(false);
  

  

const balloons = useMemo(() => (
  Array.from( Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  scale: 0.7 + Math.random() * 1.2,
  duration: 6 + Math.random() * 4,
  delay: Math.random() * 0.5,
  drift: -50 + Math.random() * 100,
})))
), []);


const petals = useMemo(() => (
  Array.from(Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  scale: 0.5 + Math.random(),
  duration: 4 + Math.random() * 3,
  delay: Math.random() * 0.5,
  rotation: 360 + Math.random() * 360,
  icon: ["🌸", "✨", "💮", "💖"][
    Math.floor(Math.random() * 4)
  ],
})))
), []);


  // Timer for the truck driving sequence
  useEffect(() => {
    if (stage === 'driving') {
      const timer = setTimeout(() => {
        setStage('panda');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [stage, setStage]);

  const handleOpenGift = () => {
    setIsExploding(true);

    // 1. Fire canvas-confetti from the TOP corners so it falls down beautifully
    const duration = 2500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 8,
        angle: 315, // Angles down and to the right
        spread: 60,
        origin: { x: 0, y: -0.1 }, // Starts above top-left
        colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7'],
      });
      confetti({
        particleCount: 8,
        angle: 225, // Angles down and to the left
        spread: 60,
        origin: { x: 1, y: -0.1 }, // Starts above top-right
        colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // 2. Wait for the explosion to cover the screen, then reveal the cake
    setTimeout(() => {
      setStage('revealed');
    }, 5000);
  };

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
      className="text-center relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-pink-50"
    >
      
      {/* --- EXPLOSION OVERLAY (PREMIUM VERSION) --- */}
{isExploding && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 pointer-events-none z-[999] overflow-hidden"
  >
    {/* Glow Burst */}
    <motion.div
      initial={{
        scale: 0,
        opacity: 1,
      }}
      animate={{
        scale: [0, 3, 6],
        opacity: [1, 0.5, 0],
      }}
      transition={{
        duration: 1.2,
      }}
      className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-300/40 blur-3xl"
    />

    {/* BALLOONS */}
    {balloons.map((balloon) => (
      <motion.div
        key={balloon.id}
        className="absolute text-5xl md:text-6xl drop-shadow-2xl"
        style={{
          left: `${balloon.x}%`,
          bottom: "-120px",
        }}
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: [0, 1, 1, 0.8, 0.4, 0],
          scale: [
  0,
  balloon.scale,
  balloon.scale,
  balloon.scale * 0.95,
  balloon.scale * 0.9
],
          y: ["0vh", "-130vh"],
          x: [
  0,
  balloon.drift * 0.4,
  balloon.drift,
  balloon.drift * 0.6,
  balloon.drift * 1.2,
],
         rotate: [-8, 6, -4, 5, -2],
        }}
        transition={{
          duration: balloon.duration,
          delay: balloon.delay,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        🎈
      </motion.div>
    ))}

    {/* PETALS */}
    {petals.map((petal) => (
      <motion.div
        key={petal.id}
        className="absolute text-3xl md:text-4xl opacity-90 drop-shadow-lg"
        style={{
          left: `${petal.x}%`,
          top: "-50px",
        }}
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0, petal.scale, petal.scale],
          y: ["0vh", "120vh"],
          x: [0, 40, -30, 20],
          rotate: petal.rotation,
        }}
        transition={{
          duration: petal.duration,
          delay: petal.delay,
          ease: "linear",
        }}
      >
        {petal.icon}
      </motion.div>
    ))}
  </motion.div>
)}

      {/* --- BACKGROUND SCENERY --- */}
      <div className="absolute top-10 right-20 w-32 h-32 bg-yellow-300 rounded-full blur-2xl opacity-60"></div>
      

      {/* --- SCENE 1: THE TRUCK --- */}
      {stage === 'driving' && (
        <div className="relative flex flex-col items-center justify-center w-full h-full flex-1">
          <div className="absolute w-[200vw] h-12 bg-gray-200 border-t-2 border-b-2 border-gray-300 transform -skew-x-12 translate-y-[120px] md:translate-y-[160px] -z-10"></div>

          <motion.div
            initial={{ x: '100vw' }} 
            animate={{ x: 0 }}       
            transition={{ duration: 2.5, type: 'spring', bounce: 0.1 }} 
            className="z-10 relative"
          >
            <motion.img 
              animate={{ y: [0, -4, 0, -2, 0] }}
              transition={{ duration: 0.4, repeat: Infinity }}
              src="/truck.png" 
              alt="Delivery Truck" 
              className="w-64 md:w-96 drop-shadow-2xl" 
            />
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0], x: [0, 50] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="absolute top-1/2 -right-10 w-16 h-1 bg-gray-400 rounded-full blur-[1px]"
            />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0], x: [0, 80] }}
              transition={{ duration: 0.4, repeat: Infinity, delay: 0.2 }}
              className="absolute bottom-4 -right-16 w-24 h-2 bg-gray-400 rounded-full blur-[1px]"
            />
          </motion.div>
          
          <p className="absolute translate-y-[200px] md:translate-y-[240px] text-gray-400 font-medium tracking-widest animate-pulse uppercase text-sm">
            Delivery in progress...
          </p>
        </div>
      )}

      {/* --- SCENE 2: THE PANDA AND THE GIFT --- */}
      {stage === 'panda' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.2, y: 50 }}
          animate={{ opacity: isExploding ? 0 : 1, scale: isExploding ? 0.8 : 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 z-20 relative w-full px-8"
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-white rounded-full opacity-80 blur-3xl -z-10"></div>

          
          <div className="flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="bg-white px-8 py-4 rounded-3xl shadow-xl mb-6 relative border-2 border-pink-100"
            >
              <p className="text-gray-800 font-bold text-xl">
                A special courier for you! 💌
              </p>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-t-[15px] border-t-white border-r-[15px] border-r-transparent drop-shadow-sm"></div>
            </motion.div>

            <motion.img 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              src="/panda.png" 
              alt="Cute Courier Panda" 
              className="w-72 h-72 md:w-96 md:h-96 object-contain drop-shadow-2xl" 
            />
          </div>

          <div className="flex flex-col items-center md:mt-32 z-30">
            <motion.button 
              animate={isExploding ? { scale: [1, 1.5, 0], rotate: [0, -10, 10, 0] } : { scale: [1, 1.05, 1] }}
              transition={{ duration: isExploding ? 0.5 : 1.5, repeat: isExploding ? 0 : Infinity }}
              whileHover={!isExploding ? { scale: 1.15, rotate: 3 } : {}}
              whileTap={!isExploding ? { scale: 0.9 } : {}}
              onClick={handleOpenGift}
              disabled={isExploding}
              className="cursor-pointer transition-transform border-none bg-transparent"
            >
              <img 
                src="/gift.png" 
                alt="Birthday Gift Box" 
                className="w-48 h-48 md:w-56 md:h-56 object-contain drop-shadow-2xl hover:drop-shadow-[0_10px_20px_rgba(255,105,180,0.5)] transition-all" 
              />
            </motion.button>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: isExploding ? 0 : 1 }}
              transition={{ delay: 1.2 }}
              className="mt-6 text-sm text-pink-500 font-bold tracking-wider uppercase animate-pulse"
            >
              Tap the gift to sign
            </motion.p>
          </div>

        </motion.div>
      )}

    </motion.div>
  );
}