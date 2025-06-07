"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image"; // Import the Image component

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Premium Member",
    content:
      "Laundrify has completely changed how I handle laundry. The premium membership is worth every naira with the instant pickup and priority handling. My clothes have never looked better!",
    videoThumbnail: "https://res.cloudinary.com/dt3czltxx/image/upload/v1747412517/images/ninthgrid-ti8cT-DKwes-unsplash_n0j4lj.jpg",
    videoSrc: "#",
  },
  {
    id: 2,
    name: "Michael Adebayo",
    role: "Standard Member",
    content:
      "Even as a standard member, the service is exceptional. The scheduled pickups are always on time, and the quality of cleaning is outstanding. I've recommended Laundrify to all my friends.",
    videoThumbnail: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611498/laundrifica_images/testimonials/michael-adebayo_c3whmc.jpg",
    videoSrc: "#",
  },
  {
    id: 3,
    name: "Chioma Okafor",
    role: "Premium Member",
    content:
      "The attention to detail is impressive. They noticed a small tear in my favorite dress and repaired it without me even asking. That's the kind of service that keeps me coming back to Laundrify.",
    videoThumbnail: "https://res.cloudinary.com/dt3czltxx/image/upload/v1747411844/images/good-faces-E1QbnThiatM-unsplash_mtgore.jpg",
    videoSrc: "#",
  },
  {
    id: 4,
    name: "David Nwachukwu",
    role: "Standard Member",
    content:
      "I was skeptical at first, but Laundrify has exceeded my expectations. The app makes it so easy to schedule pickups and track my orders. It's laundry service for the modern age.",
    videoThumbnail: "https://res.cloudinary.com/dt3czltxx/image/upload/v1747411728/images/johnny-cardoso-icy1NR9iU3g-unsplash_gtmzt7.jpg",
    videoSrc: "#",
  },
  {
    id: 5,
    name: "Amina Ibrahim",
    role: "Premium Member",
    content:
      "As a busy professional, Laundrify has been a game-changer. The premium membership gives me the flexibility I need with on-demand pickups. The quality is consistently excellent.",
    videoThumbnail: "https://res.cloudinary.com/dt3czltxx/image/upload/v1747303569/images/about-who-we-are_xxummu.jpg",
    videoSrc: "#",
  },
  {
    id: 6,
    name: "Emmanuel Okonkwo",
    role: "Standard Member",
    content:
      "The eco-friendly approach to laundry is what initially attracted me to Laundrify, but the exceptional service is why I stay. My clothes come back perfectly clean every time.",
    videoThumbnail: "https://res.cloudinary.com/dt3czltxx/image/upload/v1747416797/images/ben-scott-CwWCuaTp21o-unsplash_tqy7wl.jpg",
    videoSrc: "#",
  },
];

export function TestimonialsSection() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current && !isMobile) {
      const container = scrollContainerRef.current;
      const cardWidth = 320; // Fixed card width for consistent scrolling
      const gap = 16; // Gap between cards
      const scrollPosition = index * (cardWidth + gap);
      setCurrentIndex(index);
      container.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const scrollRight = () => {
    const maxIndex = isMobile ? testimonials.length - 1 : Math.max(0, testimonials.length - 3);
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  const handleVideoPlay = (index: number) => {
    if (activeVideo !== null && activeVideo !== index && videoRefs.current[activeVideo]) {
      videoRefs.current[activeVideo]?.pause();
    }

    if (activeVideo === index) {
      if (videoRefs.current[index]?.paused) {
        videoRefs.current[index]?.play();
      } else {
        videoRefs.current[index]?.pause();
        setActiveVideo(null);
      }
    } else {
      setActiveVideo(index);
      videoRefs.current[index]?.play();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    videoRefs.current.forEach((video) => {
      if (video) video.muted = !isMuted;
    });
  };

  return (
    <section className="w-full bg-muted/30 py-8 sm:py-12 md:py-16 lg:py-24 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <motion.h2
            className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-3 sm:mb-4 gradient-text px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Don't just take our word for it. Watch what our customers have to say about Laundrify.
          </motion.p>
        </div>

        {/* Mobile Layout - Vertical Stack */}
        <div className="block md:hidden w-full">
          <div className="space-y-4 sm:space-y-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="w-full max-w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="w-full gradient-border overflow-hidden">
                  <div className="gradient-border-content w-full">
                    <CardContent className="p-0 w-full">
                      {/* Video Container */}
                      <div className="relative w-full aspect-video overflow-hidden">
                        <div className="absolute inset-0 bg-black/20 z-10"></div>
                        {/* ***** MODIFIED HERE (Mobile Layout) *****
                         Replaced <img> with <Image />
                         Added fill, sizes, and priority for LCP
                         */}
                        <Image
                          src={testimonial.videoThumbnail || "/placeholder.svg"}
                          alt={`${testimonial.name} testimonial`}
                          fill // Fills the parent div
                          style={{ objectFit: 'cover' }} // Equivalent to object-cover
                          sizes="(max-width: 768px) 100vw, 33vw" // Responsive sizes for optimization
                          priority={index < 3} // Prioritize first few images for faster loading
                        />
                        <button
                          className={cn(
                            "absolute inset-0 flex items-center justify-center z-20 transition-opacity",
                            activeVideo === index ? "opacity-0" : "opacity-100 active:opacity-80",
                          )}
                          onClick={() => handleVideoPlay(index)}
                        >
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center">
                            <Play className="h-6 w-6 sm:h-7 sm:w-7 text-white ml-0.5" fill="white" />
                          </div>
                        </button>

                        {/* Video Overlay Info */}
                        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 z-20 flex justify-between items-center">
                          <div className="bg-black/60 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full max-w-[70%]">
                            <p className="text-white text-xs sm:text-sm font-medium truncate">{testimonial.name}</p>
                          </div>
                          {activeVideo === index && (
                            <button
                              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center flex-shrink-0"
                              onClick={toggleMute}
                            >
                              {isMuted ? (
                                <VolumeX className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
                              ) : (
                                <Volume2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-3 sm:p-4 w-full">
                        <p className="text-sm sm:text-base italic mb-3 sm:mb-4 leading-relaxed">
                          {testimonial.content}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-sm sm:text-base truncate">{testimonial.name}</p>
                            <p className="text-xs sm:text-sm text-primary truncate">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop/Tablet Layout - Horizontal Scroll */}
        <div className="hidden md:block w-full">
          <div className="relative w-full">
            {/* Scroll Container */}
            <div className="px-12 lg:px-16 w-full">
              <div
                ref={scrollContainerRef}
                className="flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide pb-8 snap-x snap-mandatory"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    className="flex-shrink-0 w-80 lg:w-96 snap-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full gradient-border overflow-hidden">
                      <div className="gradient-border-content h-full">
                        <CardContent className="p-0 h-full flex flex-col">
                          {/* Video Container */}
                          <div className="relative aspect-video overflow-hidden">
                            <div className="absolute inset-0 bg-black/20 z-10"></div>
                            {/*
                             ***** MODIFIED HERE (Desktop Layout) *****
                             Replaced <img> with <Image />
                             Added fill, sizes, and priority for LCP
                             */}
                            <Image
                              src={testimonial.videoThumbnail || "/placeholder.svg"}
                              alt={`${testimonial.name} testimonial`}
                              fill // Fills the parent div
                              style={{ objectFit: 'cover' }} // Equivalent to object-cover
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" // Responsive sizes
                              priority={index < 3} // Prioritize first few images
                            />
                            <button
                              className={cn(
                                "absolute inset-0 flex items-center justify-center z-20 transition-opacity",
                                activeVideo === index ? "opacity-0" : "opacity-100 hover:opacity-80",
                              )}
                              onClick={() => handleVideoPlay(index)}
                            >
                              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center">
                                <Play className="h-8 w-8 lg:h-10 lg:w-10 text-white ml-1" fill="white" />
                              </div>
                            </button>

                            {/* Video Overlay Info */}
                            <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center">
                              <div className="bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full max-w-[70%]">
                                <p className="text-white text-sm lg:text-base font-medium truncate">
                                  {testimonial.name}
                                </p>
                              </div>
                              {activeVideo === index && (
                                <button
                                  className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center flex-shrink-0"
                                  onClick={toggleMute}
                                >
                                  {isMuted ? (
                                    <VolumeX className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                                  ) : (
                                    <Volume2 className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                                  )}
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-4 lg:p-6 flex-1 flex flex-col">
                            <p className="text-base lg:text-lg italic mb-4 flex-1 leading-relaxed">
                              {testimonial.content}
                            </p>
                            <div className="flex items-center justify-between mt-auto">
                              <div className="min-w-0 flex-1">
                                <p className="font-bold text-base lg:text-lg truncate">{testimonial.name}</p>
                                <p className="text-sm lg:text-base text-primary truncate">{testimonial.role}</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm shadow-lg rounded-full z-30 hover:bg-background disabled:opacity-50"
              onClick={scrollLeft}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm shadow-lg rounded-full z-30 hover:bg-background disabled:opacity-50"
              onClick={scrollRight}
              disabled={currentIndex >= testimonials.length - 3}
            >
              <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center space-x-2 mt-6 lg:mt-8">
            {Array.from({ length: Math.max(1, testimonials.length - 2) }).map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-2 w-2 lg:h-2.5 lg:w-2.5 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-primary w-6 lg:w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
                )}
                onClick={() => scrollToIndex(index)}
              >
                <span className="sr-only">Go to testimonial {index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Ensure no horizontal overflow */
        .testimonials-container * {
          box-sizing: border-box;
        }

        /* Prevent text overflow */
        .testimonials-container p {
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
        }
      `}</style>
    </section>
  );
}