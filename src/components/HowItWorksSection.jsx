import React from 'react';
import { Lightbulb, Sparkles, Rocket } from 'lucide-react';

function HowItWorksSection() {
  return (
    <section className="py-40 bg-gradient-to-b from-zinc-950 to-[#131316] text-center text-gray-100">
      <h2 className="text-5xl font-extrabold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#252525]">How It Works</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-8">
        {/* Card 1 */}
        <div className="bg-zinc-800 p-8 rounded-lg shadow-2xl border border-zinc-700 hover:border-zinc-500 transition-all duration-300 transform hover:-translate-y-2">
          <div className="text-6xl mb-6 flex justify-center items-center text-[#848484]">
            <Lightbulb size={64} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">1. Describe Your Idea</h3>
          <p className="text-gray-300 leading-relaxed">Start by simply typing out your vision. Our AI is ready to understand your needs, whether it's a simple blog or a complex e-commerce site.</p>
        </div>

        {/* Card 2 */}
        <div className="bg-zinc-800 p-8 rounded-lg shadow-2xl border border-zinc-700 hover:border-zinc-500 transition-all duration-300 transform hover:-translate-y-2">
          <div className="text-6xl mb-6 flex justify-center items-center text-[#848484]">
            <Sparkles size={64} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">2. AI Generates Code</h3>
          <p className="text-gray-300 leading-relaxed">Watch as our advanced AI transforms your description into clean, functional, and responsive HTML, CSS, and JavaScript code in real-time.</p>
        </div>

        {/* Card 3 */}
        <div className="bg-zinc-800 p-8 rounded-lg shadow-2xl border border-zinc-700 hover:border-zinc-500 transition-all duration-300 transform hover:-translate-y-2">
          <div className="text-6xl mb-6 flex justify-center items-center text-[#848484]">
            <Rocket size={64} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">3. Launch & Customize</h3>
          <p className="text-gray-300 leading-relaxed">Download your complete website files instantly. You have full control to customize, deploy, and bring your project to life.</p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;