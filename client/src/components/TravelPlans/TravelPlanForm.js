import React, { useState, useEffect } from 'react';
import useCalculateDistance from '../../utils/useCalculateDistance';

const TravelPlanForm = ({ onAdd, editPlan, setEditPlan }) => {
    const initialFormData = {
        from: '',
        to: '',
        destination: '',
        startDate: '',
        endDate: '',
        notes: '',
        budget: 0,
        expenses: []
    };

    const [formData, setFormData] = useState(initialFormData);
    const [expense, setExpense] = useState({ description: '', amount: 0, date: '' });
    const { distance, error, calculateDistance } = useCalculateDistance();

    useEffect(() => {
        if (editPlan) {
            setFormData({
                ...editPlan,
                startDate: editPlan.startDate.split('T')[0],
                endDate: editPlan.endDate.split('T')[0]
            });
        }
    }, [editPlan]);

    const { from, to, destination, startDate, endDate, notes, budget, expenses } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onExpenseChange = (e) => setExpense({ ...expense, [e.target.name]: e.target.value });

    const addExpense = (e) => {
        e.preventDefault();
        setFormData({ ...formData, expenses: [...expenses, expense] });
        setExpense({ description: '', amount: 0, date: '' });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data before Distance Calculation:", formData);

        await calculateDistance(from, to);

        if (distance) {
            const finalFormData = { ...formData, distance, destination: to };
            console.log("Final Form Data with Distance:", finalFormData);
            onAdd(finalFormData);
            if (setEditPlan) {
                setEditPlan(null);
            }
            setFormData(initialFormData);
        } else {
            alert('Error calculating distance. Please try again.');
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="mb-4">
                <label className="block text-white text-lg font-bold mb-2" htmlFor="from">
                    From
                </label>
                <input
                    type="text"
                    name="from"
                    value={from}
                    onChange={onChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label className="block text-white text-lg font-bold mb-2" htmlFor="to">
                    To
                </label>
                <input
                    type="text"
                    name="to"
                    value={to}
                    onChange={onChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label className="block text-white text-lg font-bold mb-2" htmlFor="destination">
                    Destination
                </label>
                <input
                    type="text"
                    name="destination"
                    value={destination}
                    onChange={onChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label className="block text-white text-lg font-bold mb-2" htmlFor="startDate">
                    Start Date
                </label>
                <input
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={onChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label className="block text-white text-lg font-bold mb-2" htmlFor="endDate">
                    End Date
                </label>
                <input
                    type="date"
                    name="endDate"
                    value={endDate}
                    onChange={onChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label className="block text-white text-lg font-bold mb-2" htmlFor="notes">
                    Notes
                </label>
                <textarea
                    name="notes"
                    rows="3"
                    value={notes}
                    onChange={onChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
            </div>

            <div className="mb-4">
                <label className="block text-white text-lg font-bold mb-2" htmlFor="budget">
                    Budget
                </label>
                <input
                    type="number"
                    name="budget"
                    value={budget}
                    onChange={onChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <h5 className="text-xl font-bold text-white mb-4">Add Expenses</h5>
            <div className="mb-2">
                <label className="block text-white text-lg font-bold mb-2" htmlFor="description">
                    Description
                </label>
                <input
                    type="text"
                    name="description"
                    value={expense.description}
                    onChange={onExpenseChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-2">
                <label className="block text-white text-lg font-bold mb-2" htmlFor="amount">
                    Amount
                </label>
                <input
                    type="number"
                    name="amount"
                    value={expense.amount}
                    onChange={onExpenseChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-2">
                <label className="block text-white text-lg font-bold mb-2" htmlFor="date">
                    Date
                </label>
                <input
                    type="date"
                    name="date"
                    value={expense.date}
                    onChange={onExpenseChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <button
                onClick={addExpense}
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-1 px-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                type="button"
            >
                Add Expense
            </button>

            <button
                type="submit"
                className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-bold py-1 px-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105 mt-4"
            >
                {editPlan ? 'Update Plan' : 'Add Plan'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default TravelPlanForm;
