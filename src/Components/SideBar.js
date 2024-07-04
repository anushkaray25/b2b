import React, { useState } from 'react';
import './sidebar.css'; // Assuming you will handle styles here

const categories = [
    {
        name: 'Beverages',
        subcategories: [
            'Coffee', 'Craft Beer', 'Drink Boxes & Pouches', 'Milk & Plant-Based Milk',
            'Soda & Pop', 'Sparkling Water', 'Tea & Kombucha'
        ]
    },
    {
        name: 'Biscuits & Snacks',
        subcategories: [
            'Chips'
        ]
    },
    {
        name: 'Breads & Bakery',
        subcategories: [
            'White Bread'
        ]
    },
    {
        name: 'Breakfast & Dairy',
        subcategories: [
            'Egg', 'Cheese'
        ]
    },
    {
        name: 'Frozen Foods',
        subcategories: [
            'Salami', 'Nuggets'
        ]
    },
    {
        name: 'Fruits & Vegetables',
        subcategories: [
            'Apple', 'Spinach'
        ]
    },
    {
        name: 'Grocery & Staples',
        subcategories: [
            'Rice', 'Salt'
        ]
    },
    {
        name: 'Household Needs',
        subcategories: [
            'Mop', 'Broom'
        ]
    },
    {
        name: 'Meats & Seafood',
        subcategories: [
            'Chicken', 'Prawn'
        ]
    }
];

const brands = [
    { name: 'Frito Lay', count: 10 },
    { name: 'Nespresso', count: 11 },
    { name: 'Oreo', count: 9 },
    { name: 'Quaker', count: 10 },
    { name: 'Welch\'s', count: 10 }
];

const SideBar = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [collapsedCategories, setCollapsedCategories] = useState(categories.reduce((acc, cat) => {
        acc[cat.name] = true;
        return acc;
    }, {}));

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const toggleCategoryCollapse = (category) => {
        setCollapsedCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    return (
        <div className="sidebar rounded">
            <div className="product-categories">
                <h5>Product Categories</h5>
                {categories.map((cat, index) => (
                    <div key={index} className="category">
                        <div className="category-header">
                            <div className="form-check custom-checkbox">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={cat.name}
                                    onChange={() => handleCategoryChange(cat.name)}
                                    checked={selectedCategories.includes(cat.name)}
                                />
                                <label htmlFor={cat.name}>
                                    {cat.name}
                                </label>
                            </div>
                            {cat.subcategories && (
                                <button onClick={() => toggleCategoryCollapse(cat.name)}>
                                    {collapsedCategories[cat.name] ? '+' : '-'}
                                </button>
                            )}
                        </div>
                        {cat.subcategories && (
                            <div className={`subcategories ${collapsedCategories[cat.name] ? '' : 'open'}`}>
                                {cat.subcategories.map((subcat, subIndex) => (
                                    <div key={subIndex} className="subcategory">
                                        <div className="form-check custom-checkbox">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={subcat}
                                                onChange={() => handleCategoryChange(subcat)}
                                                checked={selectedCategories.includes(subcat)}
                                            />
                                            <label className='subcategory ' htmlFor={subcat}>
                                                {subcat}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="product-status">
                <h5>Product Status</h5>
                <div className="form-check custom-checkbox status">
                    <input className="form-check-input" type="checkbox" id="in-stock" />
                    <label className="st" htmlFor="in-stock">In Stock</label>
                </div>
                <div className="form-check custom-checkbox status">
                    <input className="form-check-input" type="checkbox" id="on-sale" />
                    <label className="st" htmlFor="on-sale">On Sale</label>
                </div>
            </div>
            <div className="brands">
                <h5>Brands</h5>
                {brands.map((brand, index) => (
                    <div key={index} className="brand">
                        <div className="brand-label">
                            <span className="brand-name">
                                <div className="form-check custom-checkbox">
                                    <input className="form-check-input" type="checkbox" id={brand.name} />
                                    <label htmlFor={brand.name}>{brand.name}</label>
                                </div>
                            </span>
                            <span className="brand-count">({brand.count})</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SideBar;
