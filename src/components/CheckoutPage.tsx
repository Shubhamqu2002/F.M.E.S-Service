import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Smartphone, CheckCircle } from 'lucide-react';
import { CartItem } from '../App';
import BillingForm, { BillingDetails } from './BillingForm';

interface CheckoutPageProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'billing' | 'payment' | 'confirmation'>('billing');
  const [billingDetails, setBillingDetails] = useState<BillingDetails | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'upi'>('credit');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [upiId, setUpiId] = useState<string>('');
  const [orderId, setOrderId] = useState<string>('');

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  const handleBillingSubmit = useCallback((details: BillingDetails) => {
    setBillingDetails(details);
    setStep('payment');
  }, []);

  const handlePaymentSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically process the payment
    // For this example, we'll just generate a random order ID
    const newOrderId = 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setOrderId(newOrderId);
    setStep('confirmation');
  }, []);

  const handleFinish = useCallback(() => {
    setCart([]);
    navigate('/');
  }, [setCart, navigate]);

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-teal-800 mb-8">Checkout</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          <AnimatePresence mode="wait">
            {step === 'billing' && (
              <motion.div
                key="billing"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={stepVariants}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-xl font-semibold text-teal-800 mb-4">Billing Details</h2>
                <BillingForm onSubmit={handleBillingSubmit} />
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.form
                key="payment"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={stepVariants}
                transition={{ duration: 0.3 }}
                onSubmit={handlePaymentSubmit}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-xl font-semibold text-teal-800 mb-4">Payment Details</h2>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Payment Method</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        value="credit" 
                        checked={paymentMethod === 'credit'} 
                        onChange={() => setPaymentMethod('credit')}
                        className="sr-only"
                      />
                      <div className={`w-6 h-6 mr-2 border-2 rounded-full flex items-center justify-center ${paymentMethod === 'credit' ? 'border-teal-600' : 'border-gray-400'}`}>
                        {paymentMethod === 'credit' && <div className="w-3 h-3 bg-teal-600 rounded-full"></div>}
                      </div>
                      <CreditCard className="w-6 h-6 mr-2 text-gray-600" />
                      Credit/Debit Card
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        value="upi" 
                        checked={paymentMethod === 'upi'} 
                        onChange={() => setPaymentMethod('upi')}
                        className="sr-only"
                      />
                      <div className={`w-6 h-6 mr-2 border-2 rounded-full flex items-center justify-center ${paymentMethod === 'upi' ? 'border-teal-600' : 'border-gray-400'}`}>
                        {paymentMethod === 'upi' && <div className="w-3 h-3 bg-teal-600 rounded-full"></div>}
                      </div>
                      <Smartphone className="w-6 h-6 mr-2 text-gray-600" />
                      UPI
                    </label>
                  </div>
                </div>
                
                {paymentMethod === 'credit' ? (
                  <>
                    <div className="mb-4">
                      <label htmlFor="cardNumber" className="block text-gray-700 mb-2">Card Number</label>
                      <input 
                        type="text" 
                        id="cardNumber" 
                        value={cardNumber} 
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>
                    <div className="flex mb-4">
                      <div className="w-1/2 mr-2">
                        <label htmlFor="expiryDate" className="block text-gray-700 mb-2">Expiry Date</label>
                        <input 
                          type="text" 
                          id="expiryDate" 
                          value={expiryDate} 
                          onChange={(e) => setExpiryDate(e.target.value)}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div className="w-1/2 ml-2">
                        <label htmlFor="cvv" className="block text-gray-700 mb-2">CVV</label>
                        <input 
                          type="text" 
                          id="cvv" 
                          value={cvv} 
                          onChange={(e) => setCvv(e.target.value)}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                          required
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="mb-4">
                    <label htmlFor="upiId" className="block text-gray-700 mb-2">UPI ID</label>
                    <input 
                      type="text" 
                      id="upiId" 
                      value={upiId} 
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                )}
                
                <button 
                  type="submit"
                  className="w-full bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition duration-300"
                >
                  Pay ₹{total.toFixed(2)}
                </button>
              </motion.form>
            )}

            {step === 'confirmation' && (
              <motion.div
                key="confirmation"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={stepVariants}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md p-6 text-center"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-teal-800 mb-4">Payment Successful!</h2>
                <p className="text-lg mb-4">Thank you for your order.</p>
                <p className="text-lg mb-4">Your order ID is: <span className="font-bold">{orderId}</span></p>
                <p className="mb-6">You can use this ID to track your order.</p>
                <button 
                  onClick={handleFinish}
                  className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition duration-300"
                >
                  Back to Home
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-full md:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-teal-800 mb-4">Order Summary</h2>
            {cart.map(item => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>{item.name} (x{item.quantity})</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;