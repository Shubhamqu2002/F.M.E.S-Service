import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-teal-800 mb-6">About F.M.E.S</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">Our Story</h2>
        <p className="text-gray-700 mb-4">
        F.M.E.S was founded in 2023 with a simple mission: to deliver the freshest fish, meat, eggs, and seafood right to your doorstep. We believe that everyone deserves access to high-quality, sustainably sourced protein, and we're here to make that a reality.
        </p>
        <p className="text-gray-700 mb-4">
          Our journey began when our founders, passionate food enthusiasts, noticed a gap in the market for convenient access to premium quality fish, meat, and eggs. They set out to create a service that would bridge this gap, ensuring that busy professionals and food lovers alike could enjoy restaurant-quality ingredients at home.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">Our Commitment</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Quality: We source only the finest, freshest products from trusted suppliers.</li>
          <li>Sustainability: We prioritize environmentally friendly practices in our sourcing and delivery.</li>
          <li>Convenience: Our user-friendly platform and efficient delivery system bring premium products to your door with just a few clicks.</li>
          <li>Customer Satisfaction: We're dedicated to ensuring you're completely satisfied with every order.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">Join Us on Our Journey</h2>
        <p className="text-gray-700 mb-4">
          As we continue to grow, we're excited to bring our service to more communities across India. We're constantly expanding our product range and improving our services based on customer feedback.
        </p>
        <p className="text-gray-700">
          Thank you for choosing F.M.E.S. We look forward to being your trusted source for premium fish, meat, eggs and seafood.
        </p>
      </section>
    </div>
  );
}

export default About;