// components/ReservationCard.js
import React from 'react';
import { FaBolt, FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';

function ReservationCard({ reservation, status }) {
    const statusClasses = {
        confirmed: { text: 'text-dash-green', tagBg: 'bg-dash-green/10' },
        pending: { text: 'text-dash-yellow', tagBg: 'bg-dash-yellow/10' },
    };
    const currentStatus = statusClasses[status] || statusClasses.pending;

    const chargerTypeDisplay = {
        'AC_Level_2': 'AC Level 2',
        'DC_Fast_Charger': 'DC Fast',
        'SuperCharger': 'SuperCharger',
    };
    
    const stationName = reservation.station_name || 'Station Name Unavailable';
    const startTime = new Date(reservation.start_time);
    const displayTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const displayDate = startTime.toLocaleDateString([], { weekday: 'long' });

    return (
        <div className="bg-dash-card p-5 rounded-lg border border-dash-border/50">
            <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-dash-accent/10 rounded-lg">
                        <FaBolt className="h-6 w-6 text-dash-accent" />
                    </div>
                    <div>
                        <h4 className="font-bold text-dash-text-primary">{stationName}</h4>
                        <p className="text-sm text-dash-text-secondary flex items-center flex-wrap gap-x-2 gap-y-1 mt-1">
                            <span className='flex items-center gap-2'><FaRegCalendarAlt /> {displayDate}, {displayTime}</span>
                            <span className="hidden sm:inline text-gray-600">|</span>
                            <span className='flex items-center gap-2'><FaRegClock /> 45 min</span>
                            <span className="hidden sm:inline text-gray-600">|</span>
                            <span className='flex items-center gap-2'>{chargerTypeDisplay[reservation.station_type] || reservation.station_type}</span>
                        </p>
                    </div>
                </div>
                <div className={`${currentStatus.tagBg} ${currentStatus.text} text-xs font-semibold px-3 py-1 rounded-full self-center`}>
                    {status}
                </div>
            </div>
            {status === 'confirmed' && (
                <div className="mt-4 pt-4 border-t border-dash-border/50 flex items-center gap-2">
                    <button className="bg-dash-border hover:bg-dash-border/70 text-dash-text-primary text-sm font-semibold py-2 px-4 rounded-lg">Modify</button>
                    <button className="bg-transparent hover:bg-dash-border/40 text-dash-text-secondary text-sm font-semibold py-2 px-4 rounded-lg">Cancel</button>
                </div>
            )}
        </div>
    );
}

export default ReservationCard;