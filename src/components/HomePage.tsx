import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick'; // Import Slider
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const HomePage: React.FC = () => {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="space-y-12">
      {/* Image with Text Overlay */}
      <section className="relative h-64 md:h-96 overflow-hidden rounded-lg">
        <img
          src="/Img/p23.jpg" // Use optimized image path
          alt="Fresh Products Background"
          className="absolute inset-0 w-full h-full object-cover object-center rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105" // Add smooth hover scale effect
          loading="lazy"
        />
        
        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-40 text-white p-4 space-y-4 rounded-lg">
          <h1 className="text-3xl md:text-4xl font-bold animate__animated animate__fadeIn">Fresh Seafood, Meat, and Eggs Delivered to Your Door</h1>
          <p className="text-lg md:text-xl animate__animated animate__fadeIn">Experience the finest quality products with our speedy delivery service.</p>
          <Link to="/category" className="inline-block bg-teal-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg hover:bg-teal-700 transition duration-300">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="bg-white rounded-lg shadow-lg p-8 text-center mt-12">
        <h2 className="text-3xl font-bold text-teal-800 mb-4">Featured Products</h2>
        <Slider {...settings}>
          {/* Carousel Items */}
          {[
            { src: '/Img/p9.jpg', title: 'Product 1', desc: 'Tiny, speckled, nutrient-rich eggs; delicate flavor.' },
            { src: '/Img/p4.jpg', title: 'Product 2', desc: 'Tender, juicy, protein-packed; pinkish-red flesh.' },
            { src: '/Img/p11.jpg', title: 'Product 3', desc: 'Colorful, mild-flavored, firm-textured freshwater fish.' },
            { src: '/Img/p6.jpg', title: 'Product 4', desc: 'Large, striped, sweet-tasting, firm-textured shrimp.' },
            { src: '/Img/p7.jpg', title: 'Product 5', desc: 'White, flaky, mild-flavored, lean fish fillet.' }
          ].map((product, index) => (
            <div key={index} className="min-w-[300px] bg-gray-100 rounded-lg p-4 shadow-md transition-transform duration-300 ease-in-out hover:shadow-lg hover:scale-105">
              <img src={product.src} alt={product.title} className="w-full h-40 object-cover rounded-lg" loading="lazy" />
              <h3 className="text-xl font-semibold text-teal-800 mt-4">{product.title}</h3>
              <p className="text-gray-600">{product.desc}</p>
            </div>
          ))}
        </Slider>
      </section>

      {/* Customer Testimonials */}
      <section className="bg-gray-100 rounded-lg p-8 text-center mt-12">
        <h2 className="text-3xl font-bold text-teal-800 mb-4">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { quote: "The best seafood delivery I've ever used! Fresh, quick, and delicious!", name: "Ricky S." },
            { quote: "The quality of meat is exceptional, and the delivery is super fast!", name: "Avik S." },
            { quote: "Love the variety and freshness of the eggs. Great experience overall!", name: "Taju S." }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md transition-transform duration-300 ease-in-out hover:shadow-lg hover:scale-105">
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              <p className="text-teal-800 font-semibold mt-2">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Categories */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {[
          { src: '/Img/p2.jpg', title: 'Fresh Fish', desc: 'Straight from the ocean to your plate.' },
          { src: '/Img/p8.png', title: 'Quality Meat', desc: 'Premium cuts for every occasion.' },
          { src: '/Img/p5.jpg', title: 'Farm Fresh Eggs', desc: 'Locally sourced, always fresh.' }
        ].map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:shadow-lg hover:scale-105">
            <img src={category.src} alt={category.title} className="w-full h-48 object-cover" loading="lazy" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-teal-800">{category.title}</h3>
              <p className="text-gray-600">{category.desc}</p>
            </div>
          </div>
        ))}
      </section>
      
      {/* Why Choose Us */}
      <section className="bg-teal-100 rounded-lg p-8 text-center mt-12">
        <h2 className="text-3xl font-bold text-teal-800 mb-4">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Quality Guaranteed', desc: 'We source only the finest products for our customers.' },
            { title: 'Fast Delivery', desc: 'Get your order delivered within hours.' },
            { title: 'Wide Selection', desc: 'From seafood to poultry, we have it all.' }
          ].map((feature, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold text-teal-700 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
