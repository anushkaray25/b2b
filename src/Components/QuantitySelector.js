import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './QuantitySelector.css';

const QuantitySelector = ({ minQty }) => {
    const [quantity, setQuantity] = useState(minQty);

    const handleIncrease = () => {
        setQuantity(prevQuantity => parseInt(prevQuantity, 10) + 1);
    };

    const handleDecrease = () => {
        setQuantity(prevQuantity => (prevQuantity > minQty ? parseInt(prevQuantity, 10) - 1 : prevQuantity));
    };

    return (
        <div className="quantity-selector">
            <p>Min Qty. {minQty}</p>
            <button className="btn btn-outline-secondary" onClick={handleDecrease}>-</button>
            <input type="text" className="form-control" value={quantity} readOnly />
            <button className="btn btn-outline-secondary" onClick={handleIncrease}>+</button>
        </div>
    );
};

export default QuantitySelector;
