import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Facebook, Clock, ShieldCheck } from "lucide-react";
import { Logo } from "./Logo";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-8 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Logo variant="emblem" size={48} className="brightness-125" />
              <div className="flex flex-col text-left">
                <span className="font-serif tracking-[0.15em] font-extrabold text-white text-lg leading-none">
                  DIVYAPRIYA
                </span>
                <span className="text-[9px] tracking-[0.3em] text-accent uppercase font-bold mt-1">
                  Textiles
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              Crafting stories in silk for generation. We bring you hand-selected, authentic Kanjeevarams, Banarasis, and designer sarees woven with passion and pure zari.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-full bg-slate-800 hover:bg-accent hover:text-accent-foreground text-slate-400 transition-all duration-300" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-800 hover:bg-accent hover:text-accent-foreground text-slate-400 transition-all duration-300" title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white tracking-wider mb-5 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[1px] after:bg-accent pb-2">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-accent transition-colors">Saree Collections</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent transition-colors">Our Heritage</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Saree Categories */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white tracking-wider mb-5 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[1px] after:bg-accent pb-2">
              Our Specialties
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link to="/collections?fabric=silk" className="hover:text-accent transition-colors">Kanjeevaram Pure Silk</Link>
              </li>
              <li>
                <Link to="/collections?fabric=banarasi" className="hover:text-accent transition-colors">Banarasi Brocades</Link>
              </li>
              <li>
                <Link to="/collections?fabric=organza" className="hover:text-accent transition-colors">Handloom Organzas</Link>
              </li>
              <li>
                <Link to="/collections?fabric=georgette" className="hover:text-accent transition-colors">Chiffons & Georgettes</Link>
              </li>
              <li>
                <Link to="/collections?fabric=cotton" className="hover:text-accent transition-colors">Soft Handloom Cottons</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white tracking-wider mb-5 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-[1px] after:bg-accent pb-2">
              Boutique Store
            </h4>
            <ul className="space-y-4 text-sm font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  124, Gandhi Road, Near Temple Tower, Kanchipuram, Tamil Nadu - 631501
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <a href="mailto:divyapriyafashions@gmail.com" className="hover:text-accent transition-colors">
                  divyapriyafashions@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <a href="tel:+919876543210" className="hover:text-accent transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="text-xs text-slate-400">
                  Mon - Sat: 10:00 AM - 8:30 PM <br />
                  Sunday: 11:00 AM - 6:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quality Badges */}
        <div className="border-t border-slate-800 py-6 flex flex-wrap justify-between items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>100% Pure Silk Mark Certified Weaves</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Secure checkout</span>
            <span>Worldwide Shipping</span>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <p>© {currentYear} Divyapriya Textiles. All rights reserved.</p>
          <p className="mt-1">Handcrafted with elegance & premium weaves.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
