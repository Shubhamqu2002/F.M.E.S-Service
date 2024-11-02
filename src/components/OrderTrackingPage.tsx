import React, { useState } from 'react';
import { Package, Truck, CheckCircle } from 'lucide-react';

const OrderTrackingPage: React.FC = () => {
  const [orderId, setOrderId] = useState<string>('');
  const [orderStatus, setOrderStatus] = useState<string | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would fetch the order status from your backend
    // For this example, we'll just set a random status
    const statuses = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    setOrderStatus(randomStatus);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-teal-800 mb-8">Track Your Order</h1>

      <form onSubmit={handleTrack} className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter your Order ID"
            className="flex-grow px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
          <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-2 rounded-r hover:bg-teal-700 transition duration-300"
          >
            Track
          </button>
        </div>
      </form>

      {orderStatus && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-teal-800 mb-4">Order Status: {orderStatus}</h2>
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <Package className="w-8 h-8 text-teal-600" />
              <span className="mt-2 text-sm">Processing</span>
            </div>
            <div className="h-1 flex-grow bg-teal-200 mx-2"></div>
            <div className="flex flex-col items-center">
              <Truck className="w-8 h-8 text-teal-600" />
              <span className="mt-2 text-sm">Shipped</span>
            </div>
            <div className="h-1 flex-grow bg-teal-200 mx-2"></div>
            <div className="flex flex-col items-center">
              <Truck className="w-8 h-8 text-teal-600" />
              <span className="mt-2 text-sm">Out for Delivery</span>
            </div>
            <div className="h-1 flex-grow bg-teal-200 mx-2"></div>
            <div className="flex flex-col items-center">
              <CheckCircle className="w-8 h-8 text-teal-600" />
              <span className="mt-2 text-sm">Delivered</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTrackingPage;