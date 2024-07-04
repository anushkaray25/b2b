import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
import productsData from './productsData';
const ProductCard = ({ product, onToggleFavorite }) => {
    const navigate = useNavigate();

    const handleExploreNow = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div className="card product-card">
            <div className="position-relative">
                <img src={product.image} className="card-img-top" alt={product.title} />
                {product.isNew && <span className="badge badge-danger position-absolute top-0 start-0 m-2">NEW</span>}
                <i
                    className={`fa fa-heart position-absolute top-0 end-0 m-2 ${product.isFavorite ? 'text-danger' : 'text-secondary'}`}
                    onClick={() => onToggleFavorite(productsData.id)}
                    style={{ cursor: 'pointer' }}
                ></i>
            </div>
            <div className="card-body text-center">
                <p className="text-muted mb-1 pc">{product.category}</p>
                <h5 className="card-title">{product.title}</h5>
                <div className="d-flex justify-content-center mb-2">
                    {[...Array(product.rating)].map((_, i) => (
                        <i key={i} className="fa fa-star text-warning"></i>
                    ))}
                    {[...Array(5 - product.rating)].map((_, i) => (
                        <i key={i} className="fa fa-star text-secondary"></i>
                    ))}
                </div>
                <p className="text-dark mb-2 blur">
                    AED {product.originalPrice.toFixed(2)}
                </p>
                <p className="text-success mb-2 ps">Login to see price</p>
                <button onClick={handleExploreNow} className="btn btn-dark">Explore now</button>
            </div>
        </div>
    );
};

export default ProductCard;
