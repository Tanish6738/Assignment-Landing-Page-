import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-linear-to-br from-[#C4A962] via-[#D4AF37] to-[#B8985F] text-white overflow-hidden pt-16">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FAF8F3] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <Sparkles className="w-4 h-4 text-[#FAF8F3]" />
            <span className="text-sm font-medium">Creative Digital Solutions</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            We Build Creative
            <span className="block text-[#FAF8F3] mt-2">
              Digital Solutions
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#FAF8F3]/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Transforming ideas into exceptional digital experiences. We craft innovative solutions that drive growth and exceed expectations.
          </p>

          <button
            onClick={scrollToProjects}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#C4A962] font-semibold rounded-full hover:bg-[#FAF8F3] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Explore Our Projects
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">100+</div>
              <div className="text-[#FAF8F3]/80 text-sm md:text-base">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-[#FAF8F3]/80 text-sm md:text-base">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">5+</div>
              <div className="text-[#FAF8F3]/80 text-sm md:text-base">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="#FAF8F3"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;