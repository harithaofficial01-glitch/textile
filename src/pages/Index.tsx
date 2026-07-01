import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Heart, Star, Compass, Award, ShieldCheck } from "lucide-react";
import { getFeaturedProducts, SareeProduct } from "../lib/products";
import { Button } from "../components/ui/button";

interface IndexProps {
  onAddToCart: (product: SareeProduct) => void;
}

const Index: React.FC<IndexProps> = ({ onAddToCart }) => {
  const navigate = useNavigate();
  const featured = getFeaturedProducts();

  const categories = [
    {
      name: "Kanjeevaram Silk",
      fabric: "silk",
      desc: "Pure mulberry silk with real gold zari borders from the heritage town of Kanchipuram.",
      image: "/assets/saree-red-gold.jpg",
    },
    {
      name: "Banarasi Silk",
      fabric: "banarasi",
      desc: "Timeless brocades and elaborate handwoven floral creepers from the ghats of Varanasi.",
      image: "/assets/saree-blue-gold.jpg",
    },
    {
      name: "Handloom Organza",
      fabric: "organza",
      desc: "Sheer, lightweight weaves with exquisite scalloped silver borders and floral resham work.",
      image: "/assets/saree-pastel-organza.jpg",
    },
  ];

  const features = [
    {
      icon: <Award className="w-6 h-6 text-accent" />,
      title: "Silk Mark Certified",
      desc: "Every silk saree is guaranteed 100% pure silk, supporting authentic traditional weavers.",
    },
    {
      icon: <Compass className="w-6 h-6 text-accent" />,
      title: "Heritage Handloom",
      desc: "Sourced directly from authentic weaver cooperatives in Kanchipuram and Varanasi.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-accent" />,
      title: "Zari Guarantee",
      desc: "Durable silver and gold plated threads that retain their lustre for generations.",
    },
  ];

  return (
    <div className="bg-background text-foreground transition-colors duration-300">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center bg-slate-900 text-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        {/* Background Image Overlay with parallax/opacity */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/saree-red-gold.jpg"
            alt="Draped crimson silk saree background"
            className="w-full h-full object-cover object-center opacity-30 select-none scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent"></div>
        </div>

        <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-xl"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/25 text-accent border border-accent/30 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Timeless Luxury in Weaving</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif leading-tight">
              Elegance Woven in <span className="text-accent italic font-normal">Pure Zari</span> & Silk
            </h1>

            <p className="text-slate-300 text-lg font-light leading-relaxed">
              Explore the royal heritage of handloom sarees at Divyapriya Textiles. Indulge in the finest Kanjeevarams, Banarasis, and designer organza sarees curated for your special moments.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button
                onClick={() => navigate("/collections")}
                className="bg-accent hover:bg-accent/80 text-accent-foreground font-bold px-8 py-6 text-base rounded-md transition-all shadow-lg shadow-accent/20 flex items-center gap-2 group"
              >
                <span>View Collection</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Button>
              <Button
                onClick={() => navigate("/contact")}
                variant="outline"
                className="border-white/20 text-black dark:text-white hover:bg-white/10 hover:text-white font-semibold px-6 py-6 text-base rounded-md"
              >
                Book Video Consultation
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative justify-self-center w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group"
          >
            <img
              src="/assets/saree-blue-gold.jpg"
              alt="Model in Royal Blue Banarasi Brocade"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 text-white text-left">
              <span className="text-accent text-xs font-bold uppercase tracking-widest">Masterpiece Weave</span>
              <h3 className="font-serif text-lg font-bold mt-1">Madhubani Brocade Banarasi</h3>
              <p className="text-slate-300 text-xs mt-1 font-light">Fine Kadwa weave in deep royal navy blue & pure gold.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUST / FEATURES INFO */}
      <section className="py-12 bg-muted/30 border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-card/50 transition-colors"
              >
                <div className="p-3 bg-accent/10 rounded-lg text-accent border border-accent/20 shrink-0">
                  {feat.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-base font-bold text-primary dark:text-foreground">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed font-light">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SHIELD AND HERITAGE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story Image */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-accent rounded-3xl -rotate-3 scale-[1.01] -z-10 opacity-15"></div>
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-border">
                <img
                  src="/assets/saree-pastel-organza.jpg"
                  alt="Traditional handloom weavers craft"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground dark:bg-accent dark:text-accent-foreground p-6 rounded-2xl shadow-xl max-w-[200px] border border-border text-center">
                <span className="block font-serif text-3xl font-extrabold leading-none">25+</span>
                <span className="block text-xs uppercase tracking-widest mt-1 font-bold">Years of Heritage</span>
              </div>
            </div>

            {/* Story Text */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-accent font-serif tracking-[0.2em] text-xs font-semibold uppercase block">
                The Divyapriya Legacy
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary dark:text-foreground">
                Preserving the Sacred Art of Indian Handloom Weaving
              </h2>
              <div className="h-[2px] bg-accent/40 w-16 my-4"></div>
              <p className="text-muted-foreground font-light leading-relaxed">
                Founded in the heart of traditional handloom corridors, Divyapriya Textiles was born from a desire to bring pure, authentic silk weaves directly from the loom to saree connoisseurs worldwide. Each thread represents hours of meticulous work by veteran weavers who have kept this ancient craft alive through generations.
              </p>
              <p className="text-muted-foreground font-light leading-relaxed">
                Our name stands for purity, fine craftsmanship, and unmatched designs. From Kanchipuram's heavy silk weight to Varanasi's light organzas and georgettes, we celebrate the diverse culture of Indian textile heritage.
              </p>
              <div className="pt-2">
                <Button
                  onClick={() => navigate("/about")}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground dark:border-accent dark:text-accent dark:hover:bg-accent dark:hover:text-accent-foreground font-bold"
                >
                  Read Our Full Story
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CATEGORIES OVERVIEW */}
      <section className="py-20 bg-muted/20 border-y border-border/30 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-accent font-serif tracking-[0.2em] text-xs font-semibold uppercase">
              Signature Fabrics
            </span>
            <h2 className="text-3xl font-serif font-bold mt-2 text-primary dark:text-foreground">
              Discover Our Collections
            </h2>
            <p className="text-xs text-muted-foreground mt-2 font-light">
              Explore our curation of heritage weaves categorized by authentic regional craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full text-left"
              >
                <div className="h-64 relative overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm dark:bg-slate-900/90 py-1 px-3.5 rounded-full text-xs font-bold text-accent uppercase tracking-widest border border-accent/20">
                    Handloom
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-primary dark:text-foreground">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                  <Button
                    onClick={() => navigate(`/collections?fabric=${cat.fabric}`)}
                    variant="link"
                    className="text-accent hover:text-accent-foreground hover:no-underline font-semibold flex items-center gap-1.5 p-0 self-start mt-4"
                  >
                    <span>Browse {cat.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS (Grid of master weaves) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="text-left">
              <span className="text-accent font-serif tracking-[0.2em] text-xs font-semibold uppercase">
                Exquisite Craftsmanship
              </span>
              <h2 className="text-3xl font-serif font-bold mt-2 text-primary dark:text-foreground">
                Featured Masterpieces
              </h2>
              <p className="text-xs text-muted-foreground mt-2 font-light">
                Hand-selected, unique saree drapes featuring pure thread weaving and rich silk patterns.
              </p>
            </div>
            <Button
              onClick={() => navigate("/collections")}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground dark:border-accent dark:text-accent dark:hover:bg-accent dark:hover:text-accent-foreground font-bold self-start md:self-end flex items-center gap-1.5"
            >
              <span>Explore All Sarees</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.slice(0, 4).map((prod) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all text-left relative h-full"
              >
                {/* Product Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Heart / wishlist */}
                  <button className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800 rounded-full text-muted-foreground hover:text-red-500 shadow-sm transition-colors z-10">
                    <Heart className="w-4 h-4" />
                  </button>

                  {/* Discount Badge */}
                  {prod.discountPrice && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white font-bold text-[10px] uppercase py-1 px-2.5 rounded shadow-sm">
                      Special Offer
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] tracking-widest text-accent uppercase font-bold">
                      {prod.weaveType}
                    </span>
                    <h3
                      onClick={() => navigate(`/product/${prod.id}`)}
                      className="font-serif font-bold text-base text-primary dark:text-foreground leading-tight hover:text-accent transition-colors cursor-pointer line-clamp-1"
                    >
                      {prod.name}
                    </h3>
                    <p className="text-[11px] text-muted-foreground font-light line-clamp-2">
                      {prod.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col">
                      {prod.discountPrice ? (
                        <>
                          <span className="text-sm line-through text-muted-foreground font-light">
                            ₹{prod.price.toLocaleString()}
                          </span>
                          <span className="text-base font-extrabold text-primary dark:text-accent">
                            ₹{prod.discountPrice.toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="text-base font-extrabold text-primary dark:text-accent">
                          ₹{prod.price.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <Button
                      onClick={() => onAddToCart(prod)}
                      size="sm"
                      className="bg-primary hover:bg-primary/95 text-primary-foreground dark:bg-accent dark:text-accent-foreground dark:hover:bg-accent/90 text-xs font-bold py-1.5 px-3.5 rounded"
                    >
                      Add To Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-20 bg-slate-900 text-white border-y border-slate-800 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-accent font-serif tracking-[0.2em] text-xs font-semibold uppercase">
              Client Appreciations
            </span>
            <h2 className="text-3xl font-serif font-bold mt-2">
              Loved by Saree Connoisseurs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "The swarna gold zari border of my red bridal Kanjeevaram was absolutely breathtaking! Divyapriya's craftsmanship is flawless. It made my wedding day truly unforgettable. They even helped me select matching fabrics via video call.",
                author: "Priya Sundaram",
                loc: "Chennai, Tamil Nadu",
                rating: 5,
              },
              {
                text: "I was looking for a real Mangalagiri cotton saree with Nizam borders, and their collection did not disappoint. Excellent, breathable fabric that holds its crease perfectly. Fast shipping and very supportive customer service.",
                author: "Ananya Sharma",
                loc: "New Delhi",
                rating: 5,
              },
              {
                text: "I received my Banarasi Kadwa Brocade yesterday. The weight of the silk and the sheen of the gold zari are of extraordinary heritage grade. It feels like wearing an heirloom piece. Outstanding luxury experience!",
                author: "Meenakshi Iyer",
                loc: "Mumbai, Maharashtra",
                rating: 5,
              },
            ].map((test, index) => (
              <motion.div
                key={index}
                className="bg-slate-800/50 border border-slate-700/60 p-8 rounded-2xl flex flex-col justify-between text-left"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex gap-1 text-accent">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm font-light leading-relaxed text-slate-300 italic">
                    "{test.text}"
                  </p>
                </div>
                <div className="mt-6 flex flex-col">
                  <span className="font-serif font-bold text-white text-base">{test.author}</span>
                  <span className="text-xs text-accent font-semibold">{test.loc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PRIVATE VIDEO SHOPPING CALL OUT */}
      <section className="py-20 bg-muted/40 relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl bg-card border border-border p-8 sm:p-12 md:p-16 rounded-3xl shadow-xl text-center relative z-10">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles className="w-24 h-24 text-accent" />
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <span className="text-accent font-serif tracking-[0.2em] text-xs font-bold uppercase block">
              Bespoke Bridal Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary dark:text-foreground leading-tight">
              Experience Our Showroom Virtually
            </h2>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Planning for a wedding, family festival, or looking for a custom zari layout? Book a private video call consultation with our master weavers and stylists. We will showcase options directly from our heritage looms.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => navigate("/contact")}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 py-6 rounded-md shadow-lg shadow-accent/15"
              >
                Schedule Virtual Call
              </Button>
              <a
                href="https://wa.me/919876543210?text=Hello%20Divyapriya%20Textiles,%20I'm%20interested%20in%20a%20bridal%20saree%20consultation."
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-md border border-border bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-muted font-bold flex items-center justify-center gap-2"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
