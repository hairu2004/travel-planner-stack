import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TravelPlanForm from './TravelPlanForm';
import TravelPlanItem from './TravelPlanItem';
import MapComponent from '../MapComponent';
import WeatherComponent from '../WeatherComponent';

const TravelPlanList = () => {
    const [travelPlans, setTravelPlans] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [editPlan, setEditPlan] = useState(null);

    useEffect(() => {
        const fetchTravelPlans = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await axios.get('http://localhost:5000/api/travelPlans', {
                        headers: { 'x-auth-token': token }
                    });
                    console.log("Fetched Travel Plans:", res.data); // Debugging log
                    setTravelPlans(res.data.map(plan => ({ ...plan, expenses: plan.expenses || [] })));
                } catch (err) {
                    console.error('Error fetching travel plans:', err.response ? err.response.data : err.message);
                }
            } else {
                window.location.href = '/login';
            }
        };
        fetchTravelPlans();
    }, []);

    const addPlan = async (plan) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const res = await axios.post('http://localhost:5000/api/travelPlans', plan, {
                    headers: { 'x-auth-token': token }
                });
                console.log("Added Plan Response:", res.data); // Debugging log
                setTravelPlans([...travelPlans, res.data]);
            } catch (err) {
                console.error('Error adding travel plan:', err.response ? err.response.data : err.message);
            }
        }
    };

    const deletePlan = async (id) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                await axios.delete(`http://localhost:5000/api/travelPlans/${id}`, {
                    headers: { 'x-auth-token': token }
                });
                setTravelPlans(travelPlans.filter(plan => plan._id !== id));
            } catch (err) {
                console.error('Error deleting travel plan:', err.response ? err.response.data : err.message);
            }
        }
    };

    const updatePlan = (id, updatedPlan) => {
        setTravelPlans(travelPlans.map(plan => (plan._id === id ? updatedPlan : plan)));
    };

    const handleEdit = (plan) => {
        setEditPlan(plan);
        setSelectedDestination(null); // Hide map when editing
    };

    const handleViewOnMap = (destination) => {
        setSelectedDestination(destination);
        setEditPlan(null); // Hide edit form when viewing map
    };

    return (
        <div className="container mx-auto mt-8 p-6 bg-opacity-60 rounded-lg shadow-md backdrop-blur-md">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                    <h1 className="text-3xl font-bold mb-6 text-white">Travel Plan List</h1>
                    {!editPlan && <TravelPlanForm onAdd={addPlan} />}
                    {editPlan && <TravelPlanForm onAdd={addPlan} editPlan={editPlan} setEditPlan={setEditPlan} />}
                    {travelPlans.length > 0 ? (
                        <ul className="mt-6 space-y-4">
                            {travelPlans.map(plan => (
                                <li key={plan._id} className="bg-gray-900 bg-opacity-75 p-6 rounded-md shadow-lg text-white">
                                    <TravelPlanItem
                                        key={plan._id}
                                        plan={plan}
                                        onDelete={deletePlan}
                                        onSelect={handleViewOnMap}
                                        onEdit={handleEdit}
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-6 text-white">No travel plans found</p>
                    )}
                </div>
                <div className="md:col-span-3">
                    {selectedDestination && (
                        <>
                            <MapComponent destination={selectedDestination} />
                            <WeatherComponent destination={selectedDestination} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TravelPlanList;
