import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

const imageSrc = "/images/Okland Lion Main Logo@8x.png";

const splitVariants = {
  drop: (i) => ({
    y: 470,
    opacity: 1,
    rotate: i % 2 === 0 ? -10 : 10,
    transition: { duration: 1.2, ease: "easeOut" },
  }),
  split: (i) => ({
    x: i % 2 === 0 ? -50 : 50,
    y: 50,
    rotate: i % 2 === 0 ? -20 : 20,
    transition: { duration: 0.6, ease: "easeOut" },
  }),
  reassemble: {
    x: 0,
    y: 0,
    rotate: 0,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};

const Home = () => {
  const [animationStage, setAnimationStage] = useState("drop");
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) {
      setTimeout(() => setAnimationStage("split"), 1200);
      setTimeout(() => setAnimationStage("reassemble"), 2000);
      setTimeout(() => setHasAnimated(true), 2800);
    }
  }, [hasAnimated]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200vh" ,overflow: "hidden"}}>
      <Box sx={{ position: "relative", width: 300, height: 300 }}>
        {[...Array(4)].map((_, i) => (
          <motion.img
            key={i}
            src={imageSrc}
            alt="Splitting Icon"
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              clipPath: [
                "polygon(0% 0%, 50% 0%, 50% 50%, 0% 50%)",
                "polygon(50% 0%, 100% 0%, 100% 50%, 50% 50%)",
                "polygon(0% 50%, 50% 50%, 50% 100%, 0% 100%)",
                "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)",
              ][i],
            }}
            custom={i}
            variants={splitVariants}
            initial="drop"
            animate={animationStage}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Home;
