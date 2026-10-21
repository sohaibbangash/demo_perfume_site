import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return <div className="page-wrap empty-page"><span className="eyebrow">WRONG TURN?</span><h1>This fragrance<br /><em>isn't here.</em></h1><Link to="/shop" className="button button-dark">Shop all fragrances <ArrowRight size={16} /></Link></div>;
}
