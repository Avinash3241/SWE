import React, { useState, useEffect } from 'react';
import '../styles/interested_categories.css';
import Preload_Categories from '../hooks/Preload_categories';
import axios from 'axios';

const InterestedCategories = () => {
    const { categories } = Preload_Categories();
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Update selectedCategories once categories are loaded
    useEffect(() => {
        if (categories && Array.isArray(categories)) {
            const preselected = categories
                .filter((cat) => cat.is_interested)
                .map((cat) => cat.name);
            setSelectedCategories(preselected);
        }
    }, [categories]);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        let updatedCategories;

        if (checked) {
            updatedCategories = [...selectedCategories, value];
        } else {
            updatedCategories = selectedCategories.filter((category) => category !== value);
        }

        // Update state
        setSelectedCategories(updatedCategories);

        // Log and send API request with updated categories
        console.log('Selected categories:', updatedCategories);

        axios.post(`${process.env.REACT_APP_API_URL}/updateUserInterests`, {
            userId: localStorage.getItem('UserId'),
            selectedCategories: updatedCategories,
        })
        .then((res) => {
            console.log('User interests updated successfully:', res.data);
        })
        .catch((err) => {
            console.error('Error updating user interests:', err);
        });

    };

    const handleSubmit = () => {
        alert(`You have selected: ${selectedCategories.join(', ')}`);
    };

    return (
        <div className="interested-categories-container">
            <h2>Select Your Interested Categories From Available Categories</h2>
            <div className="checkbox-container">
                {categories.map((category) => (
                    <label key={category.name} className="checkbox-label">
                        <input
                            type="checkbox"
                            value={category.name}
                            checked={selectedCategories.includes(category.name)}
                            onChange={handleCheckboxChange}
                        />
                        {category.name}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default InterestedCategories;
