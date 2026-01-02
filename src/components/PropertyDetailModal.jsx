import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Maximize, Bed, Bath, Check, Phone, MessageCircle, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { COMPANY_INFO } from '../constants/data';

const PropertyDetailModal = ({ project, isOpen, onClose }) => {
    const [currentImage, setCurrentImage] = useState(0);

    if (!project) return null;

    const nextImage = () => {
        if (project.images.length > 1) {
            setCurrentImage((prev) => (prev + 1) % project.images.length);
        }
    };

    const prevImage = () => {
        if (project.images.length > 1) {
            setCurrentImage((prev) => (prev - 1 + project.images.length) % project.images.length);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-3 md:inset-6 lg:inset-12 bg-white z-[70] overflow-hidden flex flex-col lg:flex-row"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 md:top-4 md:right-4 z-20 w-10 h-10 bg-white shadow-lg flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* Image Section */}
                        <div className="lg:w-3/5 h-56 sm:h-72 lg:h-full relative overflow-hidden bg-gray-100">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentImage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    src={project.images[currentImage]}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            </AnimatePresence>

                            {/* Status Badge */}
                            <div className="absolute top-4 left-4">
                                <span className={`px-4 py-2 text-sm font-semibold uppercase tracking-wider ${project.status === 'Ready to Move' ? 'bg-green-600 text-white' :
                                        project.status === 'Selling Fast' ? 'bg-red-600 text-white' :
                                            'bg-accent text-white'
                                    }`}>
                                    {project.status}
                                </span>
                            </div>

                            {/* Image Navigation */}
                            {project.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
                                    >
                                        <ChevronRight size={20} />
                                    </button>

                                    {/* Image Dots */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                        {project.images.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentImage(idx)}
                                                className={`w-2 h-2 rounded-full transition-colors ${currentImage === idx ? 'bg-white' : 'bg-white/50'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Price Tag */}
                            <div className="absolute bottom-4 left-4 bg-accent text-white px-5 py-2 font-bold text-lg shadow-lg">
                                {project.price}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="lg:w-2/5 p-5 md:p-8 overflow-y-auto flex flex-col">
                            {/* Type */}
                            <span className="inline-block self-start px-3 py-1 bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-3">
                                {project.type}
                            </span>

                            {/* Title */}
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-2">
                                {project.title}
                            </h2>

                            {/* Location */}
                            <div className="flex items-center text-gray-500 mb-4">
                                <MapPin size={16} className="mr-2 flex-shrink-0" />
                                {project.location}
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-light-gray">
                                <div className="text-center">
                                    <Maximize size={18} className="mx-auto mb-1 text-accent" />
                                    <p className="text-xs text-gray-500">Area</p>
                                    <p className="font-bold text-primary text-sm">{project.surface}</p>
                                </div>
                                {project.bedrooms && (
                                    <div className="text-center">
                                        <Bed size={18} className="mx-auto mb-1 text-accent" />
                                        <p className="text-xs text-gray-500">Bedrooms</p>
                                        <p className="font-bold text-primary text-sm">{project.bedrooms} BHK</p>
                                    </div>
                                )}
                                {project.bathrooms && (
                                    <div className="text-center">
                                        <Bath size={18} className="mx-auto mb-1 text-accent" />
                                        <p className="text-xs text-gray-500">Bathrooms</p>
                                        <p className="font-bold text-primary text-sm">{project.bathrooms}</p>
                                    </div>
                                )}
                                {project.yearBuilt && (
                                    <div className="text-center">
                                        <Calendar size={18} className="mx-auto mb-1 text-accent" />
                                        <p className="text-xs text-gray-500">Year</p>
                                        <p className="font-bold text-primary text-sm">{project.yearBuilt}</p>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h3 className="font-bold text-primary mb-2">Description</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {project.description}
                                </p>
                            </div>

                            {/* Features */}
                            {project.features && (
                                <div className="mb-6">
                                    <h3 className="font-bold text-primary mb-3">Key Features</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {project.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center text-gray-600 text-sm">
                                                <Check size={14} className="mr-2 text-accent flex-shrink-0" />
                                                <span className="truncate">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4 border-t">
                                <a
                                    href={`tel:${COMPANY_INFO.contact.phone}`}
                                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 px-4 font-medium hover:bg-accent transition-colors text-sm"
                                >
                                    <Phone size={16} />
                                    Call Now
                                </a>
                                <a
                                    href={`https://wa.me/${COMPANY_INFO.contact.whatsapp}?text=Hi, I'm interested in ${project.title} (${project.price})`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 font-medium hover:bg-green-700 transition-colors text-sm"
                                >
                                    <MessageCircle size={16} />
                                    WhatsApp
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default PropertyDetailModal;
