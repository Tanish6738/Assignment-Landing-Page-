import React, { useState, useEffect } from 'react';
import { projectService } from '../../services';
import { FolderKanban, Loader, ChevronLeft, ChevronRight } from 'lucide-react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || projects.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(projects.length / 3));
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, projects.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(projects.length / 3));
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(projects.length / 3)) % Math.ceil(projects.length / 3));
    setIsAutoPlaying(false);
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectService.getAll();
      setProjects(response.projects || []);
      setError('');
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-[#FAF8F3]">
        <div className="flex items-center justify-center">
          <Loader className="w-8 h-8 animate-spin text-[#C4A962]" />
        </div>
      </section>
    );
  }

  if (error) {
    return null;
  }

  return (
    <section id="projects" className="py-20 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5EFE0] text-[#C4A962] rounded-full mb-4">
            <FolderKanban className="w-4 h-4" />
            <span className="text-sm font-semibold">Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-[#C4A962] to-[#D4AF37] bg-clip-text text-transparent mb-4">
            Our Recent Projects
          </h2>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            Explore our latest work and see how we bring ideas to life
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#6B6B6B]">No projects available yet.</p>
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {Array.from({ length: Math.ceil(projects.length / 3) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
                      {projects.slice(slideIndex * 3, slideIndex * 3 + 3).map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border border-[#E8DCC4] hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden bg-[#F5EFE0]">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=' + project.name;
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#4A4A4A] mb-3 group-hover:text-[#C4A962] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-[#6B6B6B] leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <button className="text-[#C4A962] font-semibold hover:text-[#D4AF37] inline-flex items-center gap-1 group/btn">
                    Read More
                    <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {projects.length > 3 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-[#F5EFE0] text-[#C4A962] p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-[#F5EFE0] text-[#C4A962] p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-10"
                  aria-label="Next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {projects.length > 3 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: Math.ceil(projects.length / 3) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'w-8 bg-linear-to-r from-[#C4A962] to-[#D4AF37]' 
                        : 'w-2 bg-[#E8DCC4] hover:bg-[#C4A962]'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;