import { motion, useMotionValue, useSpring } from "framer-motion";
import { ShoppingBag, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const [inView, setInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const top = ref.current.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.8) setInView(true);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      layoutId="hero-section"
      className="relative overflow-hidden p-8 md:p-12 mb-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 shadow-lg h-96"
    >
      <motion.div
        className="absolute w-40 h-40 bg-white/20 rounded-full blur-2xl z-0 pointer-events-none"
        style={{
          left: springX,
          top: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
          alt="Shopping background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10">
        <motion.div
          className="absolute -top-8 -left-8 w-52 h-52 bg-white/10 rounded-full blur-3xl z-0"
          animate={{ scale: [1, 1.5, 1], rotate: [0, 30, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", delay: 0.3, stiffness: 100 }}
          className="flex items-center gap-4 mb-6 relative z-10"
        >
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="flex items-center justify-center w-12 h-12 bg-white/30 backdrop-blur-md rounded-full shadow-inner"
          >
            <ShoppingBag className="w-6 h-6 text-white" />
          </motion.div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-md">
            Product Showcase
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl text-white/90 max-w-2xl mb-6 leading-relaxed drop-shadow-sm"
        >
          Discover amazing products from our curated collection. Filter by
          category, sort by your preferences, and explore detailed product
          information.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 text-white/80"
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-sm font-medium">
            Powered by DummyJSON API • Real-time data • Beautiful animations
          </span>
        </motion.div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], x: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-12 -left-12 w-36 h-36 bg-white/10 rounded-full blur-2xl"
          animate={{ scale: [1, 1.2, 1], y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};

export default Hero;
