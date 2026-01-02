import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { PROJECTS } from '../constants/data';
import PropertyDetailModal from './PropertyDetailModal';

const Hero = () => {
    const [current, setCurrent] = useState(0);
    const [selectedProject, setSelectedProject] = useState(null);
    const slides = PROJECTS.slice(0, 4);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <>
            <div className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-primary">
                {/* Background Images */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
                        className="absolute inset-0"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent z-10" />
                        <img
                            src={slides[current].images[0]}
                            alt={slides[current].title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Main Content */}
                <div className="relative z-20 container-custom h-full flex items-center pt-20 pb-24">
                    <div className="max-w-2xl">
                        <motion.div
                            key={`content-${current}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {/* Category Tag */}
                            <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-6">
                                <span className="px-3 py-1.5 md:px-4 bg-accent text-white text-xs font-semibold tracking-wider uppercase">
                                    {slides[current].type}
                                </span>
                                <span className="text-white/70 text-sm flex items-center">
                                    <MapPin size={14} className="mr-1" />
                                    {slides[current].location}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-3 md:mb-4">
                                {slides[current].title}
                            </h1>

                            {/* Price */}
                            <p className="text-accent text-xl md:text-2xl font-bold mb-4 md:mb-6">
                                {slides[current].price}
                            </p>

                            {/* Description */}
                            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-lg line-clamp-2 md:line-clamp-3">
                                {slides[current].description}
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                                <button
                                    onClick={() => setSelectedProject(slides[current])}
                                    className="group flex items-center justify-center gap-3 bg-accent text-white px-6 md:px-8 py-3 md:py-4 font-medium hover:bg-white hover:text-primary transition-colors"
                                >
                                    View Details
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <a
                                    href="/projects"
                                    className="flex items-center justify-center gap-3 border border-white/30 text-white px-6 md:px-8 py-3 md:py-4 font-medium hover:bg-white hover:text-primary transition-all"
                                >
                                    All Projects
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Controls */}
                <div className="absolute bottom-0 left-0 right-0 z-30 bg-primary/60 backdrop-blur-sm border-t border-white/10">
                    <div className="container-custom flex items-center justify-between py-4 md:py-6">
                        {/* Progress Indicators */}
                        <div className="flex items-center gap-2">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrent(idx)}
                                    className={`h-1 rounded-full transition-all duration-500 ${current === idx ? 'w-8 md:w-12 bg-accent' : 'w-3 md:w-4 bg-white/30 hover:bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center gap-2 md:gap-3">
                            <button
                                onClick={prevSlide}
                                className="w-10 h-10 md:w-12 md:h-12 border border-white/20 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-10 h-10 md:w-12 md:h-12 border border-white/20 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <PropertyDetailModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </>
    );
};

export default Hero;
