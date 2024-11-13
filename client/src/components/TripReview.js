import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TripReview = ({ tripId }) => {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get(`/api/reviews/${tripId}`);
                setReviews(res.data);
            } catch (err) {
                console.error('Error fetching reviews:', err);
            }
        };

        fetchReviews();
    }, [tripId]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const newReview = { rating, comment };
        try {
            await axios.post('/api/reviews', { ...newReview, trip: tripId });
            setReviews([...reviews, newReview]);
            setRating('');
            setComment('');
        } catch (err) {
            console.error('Error submitting review:', err);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Trip Reviews</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2" htmlFor="rating">Rating</label>
                    <input
                        type="number"
                        name="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg font-bold mb-2" htmlFor="comment">Comment</label>
                    <textarea
                        name="comment"
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Submit Review
                </button>
            </form>
            <div className="mt-8">
                {reviews.map((review) => (
                    <div key={review._id} className="bg-white rounded shadow-md p-4 mb-4">
                        <h3 className="text-lg font-semibold">{review.user.name}</h3>
                        <p>Rating: {review.rating}</p>
                        <p>{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TripReview;
