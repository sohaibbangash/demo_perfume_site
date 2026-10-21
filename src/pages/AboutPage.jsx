import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { collectionImage } from "../productImages.js";

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero"><img src={collectionImage} alt="A perfume bottle, styled in warm golden light" /><div><span className="eyebrow">MEET PERFUME STORE</span><h1>Your scent.<br /><em>Your signature.</em></h1></div></section>
      <section className="about-story"><span className="eyebrow">OUR POINT OF VIEW</span><div><h2>Fragrance for every<br />side of <em>you.</em></h2><div><p>We believe a fragrance should feel personal from the very first spray. Our collection brings together expressive scents and distinctive bottles, with something for every mood and every moment.</p><p>Explore the women’s and men’s collections, find your own signature, and make it part of your everyday.</p><Link to="/shop" className="text-link">Explore all fragrances <ArrowRight size={15} /></Link></div></div></section>
      <section className="about-values"><div><span>01</span><h3>Find your signature</h3><p>Distinctive scents selected for different moods and moments.</p></div><div><span>02</span><h3>Make a lasting impression</h3><p>Thoughtful presentation, beautiful bottles, memorable fragrance.</p></div><div><span>03</span><h3>Choose your collection</h3><p>Explore women's and men's fragrances, all in one place.</p></div></section>
    </div>
  );
}
