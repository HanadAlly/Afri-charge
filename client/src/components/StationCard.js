import React from 'react';
import { FaMapMarkerAlt, FaBolt, FaDollarSign, FaPlug } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

function StationCard({ station }) {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleReserveClick = () => {
        if (!user) {
            toast.info("Please log in to make a reservation.");
            navigate('/login');
        } else {
            toast.info("This feature is under development.");
            console.log(`User '${user.user.username}' is attempting to reserve station ID: ${station.id}`);
        }
    };

    return (
        <div className={`bg-white p-6 rounded-lg shadow-md border ${station.is_available ? 'border-green-200' : 'border-orange-200'}`}>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{station.name}</h3>
            <div className="text-slate-600 text-sm space-y-1">
                <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-brand-blue" />{station.location}</p>
                <p className="flex items-center"><FaDollarSign className="mr-2 text-green-600" />KSH {station.price} / kWh</p>
                <p className="flex items-center"><FaPlug className="mr-2 text-slate-500" />{station.type}</p>
                {station.is_available ? (
                    <p className="flex items-center text-green-600 font-semibold"><FaBolt className="mr-2" />Available</p>
                ) : (
                    <p className="flex items-center text-orange-600 font-semibold"><FaBolt className="mr-2" />Busy</p>
                )}
            </div>
            <div className="mt-4">
                {station.is_available ? (
                     <button
                         onClick={handleReserveClick}
                         className="w-full bg-brand-blue text-white py-2 px-4 rounded hover:bg-brand-blue-dark transition-colors font-semibold"
                     >
                        Reserve Slot
                    </button>
                ) : (
                    <button
                        className="w-full bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed"
                        disabled
                    >
                        Currently Unavailable
                    </button>
                )}
            </div>
        </div>
    );
}

export default StationCard;