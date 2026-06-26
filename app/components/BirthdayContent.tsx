import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// @ts-ignore
import confetti from 'canvas-confetti';

export default function BirthdayContent() {
  // We have 3 candles. True means lit, false means extinguished.
  const [candles, setCandles] = useState([true, true, true]);
  const [wishMade, setWishMade] = useState(false);

  // Function to extinguish a specific candle
  const blowOutCandle = (index: number) => {
    if (!candles[index]) return; // Already out
    
    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);
  };

  // Watch the candles. If all are false, trigger the confetti!
  useEffect(() => {
    const allOut = candles.every((isLit) => !isLit);
    if (allOut && !wishMade) {
      setWishMade(true);
      fireConfetti();
    }
  }, [candles, wishMade]);

  const fireConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="flex flex-col items-center justify-center min-h-screen w-full px-4 text-center z-30 relative py-12 md:py-20"
    >
      
      {/* Background radial gradient for a magical feel */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-100 via-pink-50 to-white -z-20 fixed"></div>

      {/* --- HEADER TEXT --- */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-12 mt-8"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400 drop-shadow-sm mb-4">
          Happy Birthday Rajni!
        </h1>
        <p className="text-xl text-gray-600 font-medium">
          {!wishMade ? "Tap the flames to blow out your candles! 🎂" : "Yay! Make a wish! ✨ & scroll down"}
        </p>
      </motion.div>

      {/* --- THE CAKE --- */}
      <div className="relative mt-8 flex flex-col items-center">
        
        {/* Candles Container */}
        <div className="relative z-30 flex justify-center gap-8 mb-[-10px]">
          {candles.map((isLit, index) => (
            <div key={index} className="flex flex-col items-center relative">
              {/* The Flame (Clickable) */}
              <div 
                onClick={() => blowOutCandle(index)}
                className="h-12 w-10 flex justify-center items-end cursor-pointer absolute -top-10"
              >
                {isLit && (
                  <motion.div 
                    exit={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [-2, 2, -2] 
                    }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                    className="w-4 h-6 bg-gradient-to-t from-yellow-300 via-orange-400 to-red-500 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] shadow-[0_0_20px_rgba(250,204,21,0.9)] origin-bottom"
                  />
                )}
              </div>
              {/* The Candle Wick */}
              <div className="w-1 h-2 bg-gray-700 rounded-t-full" />
              {/* The Striped Candle Stick */}
              <div 
                className="w-4 h-14 rounded-sm border-2 border-pink-400 shadow-sm" 
                style={{ background: 'repeating-linear-gradient(45deg, #fff, #fff 5px, #fbcfe8 5px, #fbcfe8 10px)' }}
              />
            </div>
          ))}
        </div>

        {/* Cake Top Tier */}
        <div className="w-48 h-24 bg-pink-300 rounded-t-xl relative z-20 shadow-[-10px_0_20px_rgba(0,0,0,0.05)_inset] border-b-4 border-pink-400">
          {/* Frosting Base & Drips */}
          <div className="absolute top-0 w-full h-6 bg-white rounded-t-xl"></div>
          <div className="absolute top-4 w-full flex justify-between px-1">
            <div className="w-6 h-8 bg-white rounded-b-full shadow-sm"></div>
            <div className="w-8 h-12 bg-white rounded-b-full shadow-sm"></div>
            <div className="w-7 h-7 bg-white rounded-b-full shadow-sm"></div>
            <div className="w-9 h-10 bg-white rounded-b-full shadow-sm"></div>
            <div className="w-6 h-6 bg-white rounded-b-full shadow-sm"></div>
          </div>
          {/* Sprinkles */}
          <div className="absolute w-2 h-1 bg-yellow-300 rounded-full top-12 left-8 rotate-45 shadow-sm"></div>
          <div className="absolute w-2 h-1 bg-blue-300 rounded-full top-16 left-20 -rotate-12 shadow-sm"></div>
          <div className="absolute w-2 h-1 bg-purple-400 rounded-full top-10 right-10 rotate-90 shadow-sm"></div>
          <div className="absolute w-2 h-1 bg-green-300 rounded-full top-18 right-16 rotate-12 shadow-sm"></div>
        </div>

        {/* Cake Bottom Tier */}
        <div className="w-64 h-32 bg-pink-400 rounded-t-xl relative z-10 shadow-[-15px_0_20px_rgba(0,0,0,0.05)_inset] border-b-4 border-pink-500 -mt-2">
           {/* Frosting Base & Drips */}
          <div className="absolute top-0 w-full h-6 bg-white rounded-t-xl"></div>
          <div className="absolute top-4 w-full flex justify-between px-2">
            <div className="w-8 h-10 bg-white rounded-b-full shadow-sm"></div>
            <div className="w-10 h-14 bg-white rounded-b-full shadow-sm"></div>
            <div className="w-7 h-8 bg-white rounded-b-full shadow-sm"></div>
            <div className="w-12 h-16 bg-white rounded-b-full shadow-sm"></div>
            <div className="w-8 h-10 bg-white rounded-b-full shadow-sm"></div>
            <div className="w-9 h-12 bg-white rounded-b-full shadow-sm"></div>
          </div>
          {/* Sprinkles */}
          <div className="absolute w-2 h-1 bg-yellow-300 rounded-full top-16 left-12 rotate-45 shadow-sm"></div>
          <div className="absolute w-2 h-1 bg-white rounded-full top-24 left-24 -rotate-12 shadow-sm"></div>
          <div className="absolute w-2 h-1 bg-purple-400 rounded-full top-20 right-20 rotate-90 shadow-sm"></div>
          <div className="absolute w-2 h-1 bg-green-300 rounded-full top-14 right-10 rotate-12 shadow-sm"></div>
          <div className="absolute w-2 h-1 bg-blue-300 rounded-full top-26 right-32 -rotate-45 shadow-sm"></div>
        </div>
        
        {/* Cake Plate */}
        <div className="w-80 h-8 bg-gray-100 rounded-[50%] -mt-4 z-0 border-b-4 border-gray-300 shadow-xl"></div>
      </div>

      {/* --- THE SURPRISE REVEAL --- */}
      {wishMade && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', bounce: 0.5 }}
          className="mt-16 w-full max-w-lg mx-auto"
        >
          {/* Glowing magical aura behind the card */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 rounded-3xl blur-2xl opacity-40 animate-pulse"></div>
          
          {/* Main Card Content */}
          <div className="relative bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl border border-white overflow-hidden text-center">
            
            {/* Top Decorative Banner */}
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-yellow-400 via-pink-500 to-yellow-400"></div>
            
            <span className="text-6xl drop-shadow-md mb-4 block">🎟️</span>
            
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
              Your Birthday Gift!
            </h2>
            
            <p className="text-gray-700 mb-8 font-medium leading-relaxed px-4 text-lg">
              You deserve the absolute world! To celebrate properly, I got you something sweet...
            </p>
            
            {/* The Golden Ticket / Coupon */}
            <motion.div 
              whileHover={{ scale: 1.03, rotate: -1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-dashed border-yellow-400 rounded-2xl p-6 shadow-md cursor-pointer"
            >
              {/* Perforated edge cutouts for realistic ticket look */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border-r-2 border-yellow-400 shadow-inner"></div>
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border-l-2 border-yellow-400 shadow-inner"></div>

              <div className="flex flex-col items-center gap-3">
                <span className="text-7xl drop-shadow-lg mb-2">🍨</span>
                <div>
                  <p className="font-black text-yellow-700 text-2xl tracking-widest uppercase drop-shadow-sm">A Full Day For</p>
                  <p className="text-yellow-800 font-bold mt-2 text-xl">Butterscotch Ice Cream</p>
                  <div className="mt-4 inline-block bg-pink-100 px-4 py-1 rounded-full border border-pink-200">
                    <p className="text-pink-600 font-bold text-sm uppercase tracking-widest">(My Treat!)</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* --- HEARTFELT LETTER SECTION --- */}
      {wishMade && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
          className="mt-24 w-full max-w-2xl mx-auto relative z-10 pb-20"
        >
          {/* Floating Chai Background Elements - Moved to FRONT with z-20 */}
          <motion.img 
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            src="/chai.png" 
            alt="Chai Cup"
            className="absolute -top-12 -left-10 md:-left-16 w-32 h-32 md:w-40 md:h-40 opacity-90 z-20 object-contain drop-shadow-2xl"
          />
          <motion.img 
            animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            src="/chai.png" 
            alt="Chai Cup"
            className="absolute bottom-10 -right-10 md:-right-16 w-32 h-32 md:w-40 md:h-40 opacity-90 z-20 object-contain drop-shadow-2xl"
          />

          {/* The Letter Card */}
          <div className="bg-[#fffdf9] p-8 md:p-12 rounded-2xl shadow-xl border border-orange-100 relative text-left overflow-hidden">
            
            {/* Subtle chai watermark inside the letter */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none">
               <img src="/chai.png" className="w-80 h-80 object-contain grayscale" alt="" />
            </div>

            <h3 className="text-3xl md:text-4xl font-serif text-amber-800 mb-6 border-b border-amber-200 pb-4 relative z-10">
              To My Wonderful Buddy,
            </h3>
            
            <div className="space-y-5 text-amber-950/80 font-medium leading-relaxed text-lg relative z-10">
              <p>
                Happy Birthday! I always wanted to make something special for you,
              </p>
              <p>
                I wish that you always stay happy, that every happiness finds its way to you, and that you continue to laugh and enjoy life to the fullest. Most importantly, I pray for your good health and well-being always! ☕
              </p>
              <p>
                I hope this year brings you everything you've ever wished for, and I can't wait to see all the incredible things you'll achieve. 
              </p>
              
              <p className="pt-6 font-bold text-amber-800 text-xl">
                With lots of Wishes, <br/>
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* --- FINAL MEMORY / POLAROID SECTION --- */}
      {wishMade && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8, type: "spring" }}
          className="mt-8 mb-16 flex flex-col items-center relative z-10 w-full"
        >

          {/* Elegant Footer Sign-off */}
          <div className="mt-24 text-center">
            <p className="text-gray-700 font-medium tracking-widest uppercase text-xs md:text-sm flex items-center gap-2 justify-center">
              🌸 Made specially just for you 🌸 
            </p>
          </div>
        </motion.div>
      )}

    </motion.div>
  );
}