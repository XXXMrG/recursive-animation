import { motion } from 'framer-motion';
import React from 'react';

function withAnimation(Component, index) {
  return (
    <motion.div
      style={{
        width: '100%',
        height: '100%',
        zIndex: '1099',
        marginBottom: 40,
      }}
      key={`conent-${index}`}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      {Component}
    </motion.div>
  );
}

export default withAnimation;
