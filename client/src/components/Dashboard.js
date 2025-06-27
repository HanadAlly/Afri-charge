import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaChargingStation, FaCalendarCheck, FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Dashboard() {
    const [myStations, setMyStations] = useState([]);
    const [myReservations, setMyReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, token } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            
            setLoading(true);
            try {
                const stationsPromise = fetch('/api/user/stations', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const reservationsPromise = fetch('/api/user/reservations', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const [stationsRes, reservationsRes] = await Promise.all([stationsPromise, reservationsPromise]);

                if (!stationsRes.ok) {
                    const errorData = await stationsRes.json();
                    throw new Error(errorData.message || 'Could not fetch stations');
                }
                const stationsData = await stationsRes.json();
                setMyStations(stationsData);

                if (!reservationsRes.ok) {
                    const errorData = await reservationsRes.json();
                    throw new Error(errorData.message || 'Could not fetch reservations');
                }
                const reservationsData = await reservationsRes.json();
                setMyReservations(reservationsData);

            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);
    
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    if (loading) {
        return <div className="p-6 text-center text-slate-500">Loading your dashboard...</div>;
    }

    return (
        <div className="container mx-auto p-6 lg:p-12">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-4xl font-bold text-slate-800">Welcome back,</h1>
                <h2 className="text-5xl font-bold text-brand-blue mb-10">{user?.user.username}</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                <motion.div className="lg:col-span-2 space-y-8" variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.2, duration: 0.5 }}>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold text-slate-700 flex items-center"><FaChargingStation className="mr-3 text-brand-blue"/> My Stations</h3>
                            {user?.user.is_admin && (
                                <Link to="/stations/new" className="flex items-center text-sm font-semibold text-brand-blue hover:underline">
                                    <FaPlus className="mr-1"/> Add New Station
                                </Link>
                            )}
                        </div>
                        <div className="space-y-4">
                            {myStations.length > 0 ? (
                                myStations.map(station => (
                                    <div key={station.id} className="p-4 rounded-lg bg-slate-50 hover:bg-slate-100 flex justify-between items-center transition-colors">
                                        <div>
                                            <p className="font-bold text-slate-800">{station.name}</p>
                                            <p className="text-sm text-slate-500">{station.location}</p>
                                        </div>
                                        <div className="flex items-center space-x-3 text-slate-400">
                                            <button className="hover:text-brand-blue"><FaEdit size={18}/></button>
                                            <button className="hover:text-red-500"><FaTrashAlt size={18}/></button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-500 p-4">You have not added any stations yet.</p>
                            )}
                        </div>
                    </div>
                </motion.div>

                <motion.div className="lg:col-span-1 space-y-8" variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.4, duration: 0.5 }}>
                     <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
                        <h3 className="text-2xl font-bold text-slate-700 mb-4 flex items-center"><FaCalendarCheck className="mr-3 text-brand-blue"/> My Reservations</h3>
                        <div className="space-y-4">
                             {myReservations.length > 0 ? (
                                myReservations.map(res => (
                                    <div key={res.id} className="p-4 rounded-lg bg-slate-50">
                                        <p className="font-bold text-slate-800">{res.vehicle_details}</p>
                                        <p className="text-sm text-slate-500">Station ID: {res.station_id}</p>
                                        <p className="text-sm text-slate-500">Time: {new Date(res.start_time).toLocaleString()}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-500 p-4">You have no upcoming reservations.</p>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Dashboard;