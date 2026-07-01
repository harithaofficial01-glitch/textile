import React from "react";
import { motion } from "framer-motion";
import { Award, Compass, Heart, Users, CheckCircle, Quote } from "lucide-react";
import { Logo } from "../components/Logo";

export const About: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Mulberry Silk Cultivation",
      desc: "We use only pure mulberry silk threads sourced from high-grade silk cocoon farms. The threads are carefully reeled and twisted to build tensile strength for weaving."
    },
    {
      num: "02",
      title: "Resham Thread Dyeing",
      desc: "Our master dyers use traditional recipe baths to dye the silk threads into rich colors. Each thread undergoes multiple color washes to ensure permanent, vibrant tones."
    },
    {
      num: "03",
      title: "Jacquard Motif Drafting",
      desc: "Every border pattern—from the traditional Peacock and Elephant to the modern geometric designs—is first drafted on graph paper, then hand-punched onto jacquard cards."
    },
    {
      num: "04",
      title: "Handloom Weaving",
      desc: "Operating fly-shuttle or throw-shuttle looms, two weavers coordinate the warp and weft movements. It can take anywhere from 7 days to 3 weeks to weave a single saree."
    }
  ];

  return (
    <div className="bg-background text-foreground transition-colors duration-300">
      {/* Header Banner */}
      <section className="relative bg-slate-900 text-white py-20 overflow-hidden text-center px-4">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/saree-blue-gold.jpg"
            alt="Warp details background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-slate-950/80"></div>
        </div>
        
        <div className="container mx-auto relative z-10 max-w-2xl">
          <span className="text-accent font-serif tracking-[0.2em] text-xs font-bold uppercase block mb-3">
            Our Heritage
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-white">
            The Story of Divyapriya
          </h1>
          <p className="text-sm text-slate-300 mt-3 font-light leading-relaxed">
            Preserving traditional weaving techniques and supporting local weaver networks across South India.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left">
              <h2 className="text-3xl font-serif font-bold text-primary dark:text-foreground">
                Crafting Legacies in Silk & Gold
              </h2>
              <div className="h-[2px] bg-accent/40 w-16 my-4"></div>
              <p className="text-muted-foreground font-light leading-relaxed">
                Divyapriya Textiles began as a small boutique with a singular, clear vision: to make authentic, heirloom-quality handloom sarees accessible to customers who value pure artistry. We noticed the market flooded with powerloom synthetics sold as pure silk, and decided to establish direct partnerships with registered weaving cooperatives.
              </p>
              <p className="text-muted-foreground font-light leading-relaxed">
                Today, we work with over 80 master weavers in Kanchipuram (Tamil Nadu), Varanasi (Uttar Pradesh), and Mangalagiri (Andhra Pradesh). By bypassing middle-agents, we guarantee our weavers fair wages while providing our clients certified Silk Mark sarees crafted with genuine gold-plated tested silver zari.
              </p>
            </div>

            {/* Emblem center card */}
            <div className="bg-muted/40 border border-border p-8 rounded-3xl text-center space-y-6 relative flex flex-col items-center justify-center">
              <Logo size={120} variant="emblem" />
              <Quote className="w-10 h-10 text-accent opacity-20 absolute top-4 left-6" />
              <p className="font-serif italic text-lg text-primary dark:text-slate-200 leading-relaxed font-semibold">
                "A saree is not just a piece of clothing. It is an canvas of history, heritage, and the weaver’s soul."
              </p>
              <div className="text-xs text-muted-foreground font-semibold">
                — Divyapriya Boutique Philosophy
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loom Process steps */}
      <section className="py-20 bg-muted/20 border-y border-border/30 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-accent font-serif tracking-[0.2em] text-xs font-semibold uppercase">
              The Loom Journey
            </span>
            <h2 className="text-3xl font-serif font-bold mt-2 text-primary dark:text-foreground">
              How Our Sarees Are Crafted
            </h2>
            <p className="text-xs text-muted-foreground mt-2 font-light">
              Each step is a delicate dance between craftsmanship, patience, and traditional knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card border border-border p-6 rounded-2xl flex flex-col justify-between text-left hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <span className="font-serif text-3xl font-extrabold text-accent leading-none">
                    {step.num}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-primary dark:text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Weaver Support / Sustainability */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <Users className="w-12 h-12 text-accent mx-auto" />
          <h2 className="text-3xl font-serif font-bold text-primary dark:text-foreground">
            Our Commitment to the Weaver Community
          </h2>
          <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
            Traditional weaving is a vanishing craft under pressure from cheap automated prints. Divyapriya commits 5% of all proceeds directly to weaver healthcare funds, workspace upgrades (such as ergonomic loom stools), and training programs for young weavers. When you buy a saree from us, you directly preserve a heritage.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 max-w-lg mx-auto text-xs font-semibold text-primary dark:text-foreground">
            <div className="flex items-center gap-2 justify-center">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>100% Fair Wages</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>Direct Loom Sourcing</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>Silk Mark Certified</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default About;
