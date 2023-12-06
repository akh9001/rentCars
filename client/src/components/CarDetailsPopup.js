import React, { useState } from 'react';

const CarDetailsPopup = ({ car, onClose, onAddToCart }) => {
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReview, setNewReview] = useState({ author: '', comment: '' });
  const [reviews, setReviews] = useState([
    { id: 1, author: 'John Doe', comment: 'Great car! Loved the performance.' },
    { id: 2, author: 'Jane Smith', comment: 'Very comfortable and stylish.' },
    // Add more reviews as needed
  ]);

  const handleAddReviewClick = () => {
    setIsAddingReview(true);
  };

  const handleCancelReview = () => {
    setIsAddingReview(false);
    setNewReview({ author: '', comment: '' });
  };

  const handleSaveReview = () => {
    if (newReview.author && newReview.comment) {
      const updatedReviews = [...reviews, { id: reviews.length + 1, ...newReview }];
      setReviews(updatedReviews);
      setNewReview({ author: '', comment: '' });
      setIsAddingReview(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white px-3 sm:p-8 md:p-12 lg:p-16 rounded-md w-full h-full overflow-y-auto">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 mt-2 text-3xl font-semibold hover:text-gray-700">
            Close
          </button>
        </div>
        <img src={car.image} alt={`${car.model} ${car.car}`} className="mb-4 max-h-96 w-full object-cover" />
        <p className="text-lg font-semibold">
          Car Model: {car.model}, Car Type: {car.car}
        </p>
        <p className="text-sm mb-4">Description: {car.description}</p>
        <button
          onClick={() => onAddToCart(car)}
          className="mt-4 p-2  bg-yellow-500 text-black rounded hover:bg-yellow-600 transition duration-300"
        >
          Add to Cart
        </button>

        {/* Reviews Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Reviews</h2>
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-300 py-2">
              <p className="text-gray-700">{review.comment}</p>
              <p className="text-black font-bold mt-1">- {review.author}</p>
            </div>
          ))}

          {isAddingReview ? (
            <div className="mt-4">
              <input
                type="text"
                placeholder="Your Name"
                value={newReview.author}
                onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                className="p-2 border border-gray-300 rounded w-full mb-2"
              />
              <textarea
                placeholder="Add your review"
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="p-2 border border-gray-300 rounded w-full mb-2"
              />
              <button
                onClick={handleSaveReview}
                className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
              >
                Save Review
              </button>
              <button
                onClick={handleCancelReview}
                className="ml-2 p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddReviewClick}
              className="mt-4 p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300"
            >
              Add Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPopup;
