import React from 'react';

function CallToActionSection() {
  return (
    <section className="py-20 px-3 bg-gradient-to-r from-[#09090B] to-[#121214] text-center text-white border-0 border-white">
      <h2 className="text-4xl font-bold mb-6">Ready to Build Your Dream Website?</h2>
      <p className="text-xl mb-10 max-w-3xl mx-auto">
        Join thousands of creators who are bringing their ideas to life with Starsky's AI-powered website generation.
      </p>
      <button className="bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition duration-300">
        Get Started Now
      </button>
    </section>
  );
}

export default CallToActionSection;