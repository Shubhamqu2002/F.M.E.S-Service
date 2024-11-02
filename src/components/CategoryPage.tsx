import React, { useState, useMemo, useCallback } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../App';

const products: Product[] = [
  { id: 1, name: 'Atlantic Salmon', category: 'fish', price: 899, image: '/Img/p1.jpg' },
  { id: 2, name: 'Yellowfin Tuna', category: 'fish', price: 999, image: '/Img/p2.jpg' },
  { id: 3, name: 'Chicken Breast', category: 'meat', price: 299, image: '/Img/p3.jpg' },
  { id: 4, name: 'Chicken Legs', category: 'meat', price: 200, image: '/Img/p4.jpg' },
  { id: 5, name: 'Organic Eggs', category: 'eggs', price: 149, image: '/Img/p5.jpg' },
  { id: 6, name: 'Tiger Shrimp', category: 'seafood', price: 599, image: '/Img/p6.jpg' },
  { id: 7, name: 'Cod Fillet', category: 'fish', price: 549, image: '/Img/p7.jpg' },
  { id: 8, name: 'Chicken Curry Cut', category: 'meat', price: 200, image: '/Img/p8.png' },
  { id: 9, name: 'Quail Eggs', category: 'eggs', price: 199, image: '/Img/p9.jpg' },
  { id: 10, name: 'Lobster Tail', category: 'seafood', price: 1299, image: '/Img/p10.jpg' },
  { id: 11, name: 'Rainbow Trout', category: 'fish', price: 649, image: '/Img/p11.jpg' },
  { id: 12, name: 'Goat Curry Cut', category: 'meat', price: 399, image: '/Img/p12.jpg' },
  { id: 13, name: 'Duck Eggs', category: 'eggs', price: 249, image: '/Img/p13.jpg' },
  { id: 14, name: 'Scallops', category: 'seafood', price: 899, image: '/Img/p14.jpg' },
  { id: 15, name: 'Halibut', category: 'fish', price: 799, image: '/Img/p15.jpg' },
  { id: 16, name: 'Lamb Chops', category: 'meat', price: 699, image: '/Img/p16.jpg' },
  { id: 17, name: 'Crab Legs', category: 'seafood', price: 999, image: '/Img/p17.jpg' },
  { id: 18, name: 'Turkey Breast', category: 'meat', price: 449, image: '/Img/p18.jpg' },
  { id: 19, name: 'Chicken Wings', category: 'meat', price: 150, image: '/Img/p19.png' },
];

interface CategoryPageProps {
  addToCart: (product: Product) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ addToCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [addedProductId, setAddedProductId] = useState<number | null>(null);
  const [showNotification, setShowNotification] = useState<boolean>(false);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const handleAddToCart = useCallback((product: Product) => {
    addToCart(product);
    setAddedProductId(product.id);
    setShowNotification(true);

    setTimeout(() => setAddedProductId(null), 1000);
    setTimeout(() => setShowNotification(false), 1500);
  }, [addToCart]);

  const categories = ['all', 'fish', 'meat', 'eggs', 'seafood'];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-teal-800 mb-8">Our Products</h1>

      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 bg-teal-600 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            Item added to cart!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-wrap justify-center md:justify-start gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                activeCategory === category
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-teal-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 py-16"
        >
          <p className="text-2xl font-semibold mb-2">No results found</p>
          <p className="text-lg">Try adjusting your search or filter to find what you're looking for.</p>
        </motion.div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredProducts.map(product => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="relative overflow-hidden group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-white text-teal-600 px-4 py-2 rounded-full font-semibold hover:bg-teal-600 hover:text-white transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-teal-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 font-medium">₹{product.price.toFixed(2)}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500 capitalize">{product.category}</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`p-2 rounded-full transition duration-300 ${
                      addedProductId === product.id
                        ? 'bg-green-500 text-white'
                        : 'bg-teal-100 text-teal-600 hover:bg-teal-600 hover:text-white'
                    }`}
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default CategoryPage;