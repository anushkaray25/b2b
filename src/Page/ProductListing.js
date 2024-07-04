import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import ProductCard from '../Components/ProductCard';
import Pagination from '../Components/Pagination';
import './listing.css';
import bg from './bg.svg';
import SideBar from '../Components/SideBar';
import productsData from '../Components/productsData';

const ProductListing = () => {
    const [sort, setSort] = useState('Latest Product');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const [products, setProducts] = useState(productsData);

    useEffect(() => {
        // Reset to the first page if products data changes
        setCurrentPage(1);
    }, [products]);

    const sortedProducts = products.slice().sort((a, b) => {
        if (sort === 'Latest Product') {
            // Sort by newest (isNew) first
            if (a.isNew && !b.isNew) return -1;
            if (!a.isNew && b.isNew) return 1;
            return 0;
        } else if (sort === 'Price: Low to High') {
            return a.originalPrice - b.originalPrice;
        } else if (sort === 'Price: High to Low') {
            return b.originalPrice - a.originalPrice;
        }
        return 0;
    });

    const paginatedProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const toggleFavorite = (id) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, isFavorite: !product.isFavorite } : product
        ));
    };

    return (
        <Container>
            <Row className="mt-5">
                <Col md={3}>
                    <SideBar />
                </Col>
                <Col md={9} className="ps-4">
                    <div className="bg">
                        <img src={bg} alt="bg" className="mb-4 rounded" />
                        <div className="caption">
                            <h2 className="text-white">FRESH GROCERY</h2>
                            <p className="text-white">There's you can Buy your all of Grocery Products.</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="text-muted font-size-0.9rem">Showing {paginatedProducts.length} of {products.length} results</p>
                        <Dropdown onSelect={(e) => setSort(e)}>
                            <Dropdown.Toggle variant="white" id="dropdown-basic">
                                <span className="sb">SORT BY:</span> {sort}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='drop'>
                                <Dropdown.Item eventKey="Latest Product">Latest Product</Dropdown.Item>
                                <Dropdown.Item eventKey="Price: Low to High">Price: Low to High</Dropdown.Item>
                                <Dropdown.Item eventKey="Price: High to Low">Price: High to Low</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <Row>
                        {paginatedProducts.map((product) => (
                            <Col xs={12} sm={6} md={4} lg={3} key={product.id} className="mb-4">
                                <ProductCard product={product} onToggleFavorite={toggleFavorite} />
                            </Col>
                        ))}
                    </Row>
                    <Pagination
                        totalItems={products.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default ProductListing;
