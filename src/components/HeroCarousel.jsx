import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { heroSlides } from "../productImages.js";

// Accessible autoplay carousel; hovering or focusing pauses automatic changes.
export default function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = heroSlides[activeSlide];

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = window.setInterval(() => {
      setActiveSlide((index) => (index + 1) % heroSlides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const move = (offset) => {
    setActiveSlide((current) => (current + offset + heroSlides.length) % heroSlides.length);
  };

  return (
    <section
      className="hero hero-carousel"
      aria-roledescription="carousel"
      aria-label="Featured fragrances"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <motion.div className="hero-copy">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.productId}
            className="hero-slide-copy"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.36 }}
          >
            <span className="eyebrow"><span className="eyebrow-line" />{slide.eyebrow}</span>
            <h1>{slide.title}<br /><em>{slide.highlight}</em></h1>
            <p>{slide.description}</p>
            <Link className="button button-dark" to={`/product/${slide.productId}`}>
              Discover this fragrance <ArrowRight size={16} />
            </Link>
          </motion.div>
        </AnimatePresence>
        <div className="hero-controls">
          <button className="carousel-arrow" onClick={() => move(-1)} aria-label="Previous fragrance"><ArrowLeft size={17} /></button>
          <div className="carousel-dots" role="group" aria-label="Choose featured fragrance">
            {heroSlides.map((item, index) => (
              <button
                key={item.productId}
                className={`carousel-dot${index === activeSlide ? " active" : ""}`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Show ${item.label}`}
                aria-current={index === activeSlide ? "true" : undefined}
              />
            ))}
          </div>
          <button className="carousel-arrow" onClick={() => move(1)} aria-label="Next fragrance"><ArrowRight size={17} /></button>
          <span className="carousel-index">{String(activeSlide + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}</span>
        </div>
      </motion.div>
      <div className="hero-art">
        <AnimatePresence mode="wait">
          <motion.img
            key={slide.productId}
            src={slide.image}
            alt={`${slide.label} perfume`}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65 }}
          />
        </AnimatePresence>
        <span className="art-caption">{slide.label}<i>EAU DE PARFUM · THE COLLECTION</i></span>
        <span className="hero-stamp">THE<br />GOLD<br />STANDARD</span>
      </div>
    </section>
  );
}
