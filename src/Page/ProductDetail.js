import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productsData from '../Components/productsData';
import './ProductDetail.css';
import leftArrow from '../Components/leftArrow.svg';
import rightArrow from '../Components/rightArrow.svg';
import productThumb from '../Page/product.svg';
import QuantitySelector from '../Components/QuantitySelector';
import { Container } from 'react-bootstrap';
import ProductCard from '../Components/ProductCard';
import yellowOnion from './product.svg';
import bananas from './product.svg';
import broccoli from './product.svg';
import garlic from './product.svg';
import apple from './product.svg';

const ProductDetail = () => {
    const { productId } = useParams();
    const product = productsData.find(p => p.id === parseInt(productId));
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const fetchRelatedProducts = () => {
        const related = productsData.filter(p => p.category === product.category && p.id !== product.id);
        setRelatedProducts(related);
    };

    useEffect(() => {
        if (product) {
            fetchRelatedProducts();
        }
    }, [product]);

    if (!product) {
        return <div>Product not found</div>;
    }

    const images = [productThumb, productThumb, productThumb, productThumb, productThumb];
    const itemsPerSlide = 4;

    const handlePrevClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePrevSlideClick = () => {
        setCurrentSlideIndex((prevIndex) => Math.max(prevIndex - itemsPerSlide, 0));
    };

    const handleNextSlideClick = () => {
        setCurrentSlideIndex((prevIndex) => Math.min(prevIndex + itemsPerSlide, relatedProducts.length - itemsPerSlide));
    };

    return (
        <div className="container product-detail">
            <div className="row">
                <div className="col-md-9">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="product-images">
                                <div className="main-image-container">
                                    <img src={images[currentImageIndex]} className="main-image" alt={product.title} />
                                    <div className="arrow left-arrow" onClick={handlePrevClick}>
                                        <img src={leftArrow} alt="Previous" />
                                    </div>
                                    <div className="arrow right-arrow" onClick={handleNextClick}>
                                        <img src={rightArrow} alt="Next" />
                                    </div>
                                </div>
                                <div className="product-thumbnails">
                                    {images.map((image, index) => (
                                        <div key={index} className={`thumb-container ${index === currentImageIndex ? 'active' : ''}`} onClick={() => setCurrentImageIndex(index)}>
                                            <img
                                                src={image}
                                                className="thumb"
                                                alt={product.title}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="product-info">
                                <h1>{product.title}</h1>
                                <div className="product-rating">
                                    <span className="stars">{'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}</span>
                                    <span className="reviews">12 reviews</span>
                                    <div className="social-share">
                                        <span>Share:</span>
                                        <i className="fa fa-facebook"></i>
                                        <i className="fa fa-twitter"></i>
                                        <i className="fa fa-pinterest"></i>
                                    </div>
                                </div>
                                <hr className="hr" />
                                <p className="d">DESCRIPTION</p>
                                <p className="description">{product.description}</p>
                                <p className="stock">Stock Available</p>
                                <QuantitySelector minQty={product.minQty} />
                                <div className="actions">
                                    <button className="btn btn-danger">Request for Quote</button>
                                    <button className="btn btn-light">Add to Wishlist</button>
                                </div>
                                <hr className="hr" />
                                <div className="product-meta">
                                    <span className="sku">SKU: {product.sku}</span>
                                    <span className="category">Category: {product.category}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="frequently-bought">
                        <h4>Frequently Bought Products</h4>
                        <ul>
                            <li>
                                <img src={yellowOnion} alt="Yellow Fresh Onion" />
                                <span>Yellow Fresh Onion</span>
                                <br />
                                <span>$3.00 – $22.00</span>
                            </li>
                            <li>
                                <img src={bananas} alt="Marketside Bananas, Bunch" />
                                <span>Marketside Bananas, Bunch</span>
                                <span>$4.25</span>
                            </li>
                            <li>
                                <img src={broccoli} alt="Organic Green Fresh Broccoli" />
                                <span>Organic Green Fresh Broccoli</span>
                                <span>$4.00 – $3.25</span>
                            </li>
                            <li>
                                <img src={garlic} alt="White Large Kurdish Garlic" />
                                <span>White Large Kurdish Garlic</span>
                                <span>$3.00 – $32.00</span>
                            </li>
                            <li>
                                <img src={apple} alt="Granny Smith Apples, Each" />
                                <span>Granny Smith Apples, Each</span>
                                <span>$4.60 – $3.45</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='row'>
                <section>
                    <Container fluid>
                        <div className="description-title">
                            <h2>Description</h2>
                        </div>
                        <hr className='hrule' />
                    </Container>
                </section>
                <p className="long-description">{product.longdescription}</p>
                <div className='row'>
                    <div className="col-md-4">
                        <div className="description-content">
                            <img src={product.image} alt={product.title} className="description-image" />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="description-text">
                            <h3 className="description-heading">{product.title}</h3>
                            <p>{product.longdescription}</p>
                            <ul className='better'>
                                <li>Pellentesque habitant morbi tristique senectus</li>
                                <li>turpis egestas Vestibulum tortor quam</li>
                                <li>euugiat vitae ultricies eget tempor</li>
                                <li>libero amet quam egestas</li>
                            </ul>
                            <p>{product.longdescription}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <section className="related-products">
                    <span >
                        <h4 className="col-11">Related Products</h4>
                        <span className='col-1'>
                            <button className="arrow-button" onClick={handlePrevSlideClick}>
                                <img src={leftArrow} alt="Previous" />
                            </button>

                            <button className="arrow-button" onClick={handleNextSlideClick}>
                                <img src={rightArrow} alt="Next" />
                            </button>
                        </span>
                    </span>
                    <div id="slider">
                        <div className="related-products-list" style={{ transform: `translateX(-${currentSlideIndex * (100 / itemsPerSlide)}%)` }}>
                            {relatedProducts.map((relatedProduct, index) => (
                                <div className="related-products-item" key={index}>
                                    <ProductCard product={relatedProduct} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
            <div className='row'>
                <section>
                    <Container fluid ps-1>
                        <div className="description-title">
                            <h2>Customer Reviews</h2>
                        </div>
                        <hr className='hrule' />
                    </Container>
                </section>
            </div>
        </div>
    );
};

export default ProductDetail;
