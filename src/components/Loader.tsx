import { motion } from "framer-motion";

const circleStyle = "h-4 w-4 bg-primary rounded-full";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center space-x-3 py-10">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={circleStyle}
          animate={{ y: ["0%", "-100%", "0%"] }}
          transition={{
            y: {
              duration: 0.6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: i * 0.1,
            },
          }}
        />
      ))}
    </div>  
  );
};

export default Loader;
