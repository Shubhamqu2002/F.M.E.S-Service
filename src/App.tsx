import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Fish, Egg, Drumstick } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import components
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';
import CheckoutPage from './components/CheckoutPage';
import About from './components/About';
import OrderTrackingPage from './components/OrderTrackingPage';

// Define types
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const addToCart = useCallback((product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setCart(prevCart => prevCart.map(item =>
      item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
    ).filter(item => item.quantity > 0));
  }, []);

  const handleNavigation = useCallback(() => {
    setIsMenuOpen(false);
    setIsCartOpen(false);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const Logo: React.FC = () => (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Fish className="w-8 h-8 text-white" />
        <Egg className="w-6 h-6 text-white absolute -bottom-1 -right-1" />
        <Drumstick className="w-6 h-6 text-white absolute -top-1 -right-1" />
      </div>
      <span className="text-xl font-bold">F.M.E.S</span>
    </div>
  );

  const NavLinks: React.FC<{ mobile?: boolean }> = ({ mobile }) => {
    const location = useLocation();
    const links = [
      { to: "/", label: "Home" },
      { to: "/category", label: "Category" },
      { to: "/about", label: "About" },
      { to: "/track-order", label: "Track" },
    ];

    return (
      <>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={handleNavigation}
            className={`hover:text-teal-200 transition-colors duration-200 ${
              mobile ? 'block py-2' : ''
            } ${location.pathname === link.to ? 'font-bold' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </>
    );
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="bg-teal-600 text-white shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2" onClick={handleNavigation}>
              <Logo />
            </Link>
            <nav className="hidden md:flex space-x-6">
              <NavLinks />
            </nav>
            <div className="flex items-center space-x-4">
              <button
                className="flex items-center space-x-1 hover:text-teal-200 transition-colors duration-200"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <ShoppingCart className="w-6 h-6" />
                <span className="text-sm font-medium">
                  Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                </span>
              </button>
              <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </header>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-teal-500 text-white overflow-hidden"
            >
              <nav className="container mx-auto px-4 py-2 flex flex-col space-y-2">
                <NavLinks mobile />
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isCartOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-teal-800">Your Cart</h2>
                  <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                {cart.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-4">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                            <p className="text-sm text-gray-600">₹{item.price.toFixed(2)} each</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-teal-600 hover:text-teal-800"
                            >
                              -
                            </button>
                            <span className="text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-teal-600 hover:text-teal-800"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 ml-2"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
                      </div>
                    </div>
                    <Link
                      to="/checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="block w-full bg-teal-600 text-white text-center px-4 py-2 rounded hover:bg-teal-700 transition duration-300 mt-4"
                    >
                      Checkout
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="container mx-auto px-4 py-8 flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category" element={<CategoryPage addToCart={addToCart} />} />
            <Route path="/checkout" element={<CheckoutPage cart={cart} setCart={setCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/track-order" element={<OrderTrackingPage />} />
          </Routes>
        </main>

        <footer className="bg-teal-700 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <Logo />
            <p className="mt-2">© 2024 F.M.E.S Delivery. All rights reserved.</p>
            <div className="mt-4 flex justify-center space-x-4">
              <a href="#" className="hover:text-teal-200 transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-teal-200 transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-teal-200 transition-colors duration-200">Contact Us</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;