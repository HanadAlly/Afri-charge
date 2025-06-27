// components/StatCard.js
import React from 'react';
import { motion } from 'framer-motion';

function StatCard({ icon, title, value, percentage, iconBg }) {
    const IconComponent = icon;

    return (
        <motion.div 
            className="bg-dash-card p-5 rounded-lg flex flex-col justify-between"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
        >
            <div className="flex justify-between items-start">
                <div className={`p-3 rounded-lg ${iconBg}`}>
                    <IconComponent className="h-6 w-6 text-dash-text-primary" />
                </div>
                {percentage && (
                    <div className="bg-dash-green/20 text-dash-green px-2 py-1 rounded-full text-xs font-semibold">
                        {percentage}
                    </div>
                )}
            </div>
            <div className="mt-4">
                <p className="text-3xl font-bold text-dash-text-primary">{value}</p>
                <p className="text-sm text-dash-text-secondary">{title}</p>
            </div>
        </motion.div>
    );
}

export default StatCard;