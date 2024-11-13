import React from 'react';

const TravelPlanItem = ({ plan, onDelete, onSelect, onEdit }) => {
    console.log('TravelPlanItem Data:', plan); // Debugging log
    return (
        <div className="bg-gray-800 bg-opacity-70 p-6 rounded-md shadow-md">
            <h4 className="text-2xl font-bold mb-4 text-white">{plan.destination}</h4>
            <p className="text-lg text-white"><strong>From:</strong> {plan.from}</p>
            <p className="text-lg text-white"><strong>To:</strong> {plan.to}</p>
            <p className="text-lg text-white"><strong>Distance:</strong> {plan.distance}</p>
            <p className="text-lg text-white"><strong>Start Date:</strong> {plan.startDate}</p>
            <p className="text-lg text-white"><strong>End Date:</strong> {plan.endDate}</p>
            <p className="text-lg text-white"><strong>Notes:</strong> {plan.notes}</p>
            <p className="text-lg text-white"><strong>Budget:</strong> ${plan.budget}</p>
            <h5 className="text-xl font-bold mt-6 text-white">Expenses</h5>
            <ul className="list-disc list-inside text-white">
                {(plan.expenses || []).map((expense, index) => (
                    <li key={`${plan._id}-${index}`} className="text-lg">
                        {expense.description}: ${expense.amount} on {new Date(expense.date).toLocaleDateString()}
                    </li>
                ))}
            </ul>
            <div className="mt-6 flex space-x-2">
                <button
                    onClick={() => onDelete(plan._id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Delete
                </button>
                <button
                    onClick={() => onSelect(plan.destination)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                >
                    View on Map
                </button>
                <button
                    onClick={() => onEdit(plan)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Edit
                </button>
            </div>
        </div>
    );
};

export default TravelPlanItem;
