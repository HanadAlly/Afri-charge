import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function GetStarted() {
  return (
    <div className="text-center py-24 md:py-32">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-4"
        >
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4">
                Powering Africa's EV Revolution
            </h1>
            <p className="text-lg md:text-xl text-slate-text max-w-3xl mx-auto mb-8">
                Seamlessly find, reserve, and manage electric vehicle charging across the continent. Your journey to sustainable travel starts here.
            </p>
            <Link
                to="/find-stations"
                className="inline-block bg-brand-blue text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-brand-blue-dark transition-transform transform hover:scale-105"
            >
                Find a Station Near You
            </Link>
        </motion.div>
    </div>
  );
}

export default GetStarted;