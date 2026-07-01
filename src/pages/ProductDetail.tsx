import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Share2, Heart, Sparkles, ShieldCheck, Mail, Calendar, Phone } from "lucide-react";
import { getProductById, MOCK_PRODUCTS, SareeProduct } from "../lib/products";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "../components/ui/dialog";
import { toast } from "sonner";

interface ProductDetailProps {
  onAddToCart: (product: SareeProduct) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<SareeProduct | undefined>(undefined);
  const [activeImage, setActiveImage] = useState<string>("");

  // Booking Form State
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const prod = getProductById(id);
      setProduct(prod);
      if (prod) {
        setActiveImage(prod.image);
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif font-bold text-red-500">Saree Not Found</h2>
        <p className="text-muted-foreground mt-2">The weave you are looking for might have been sold or removed.</p>
        <Button onClick={() => navigate("/collections")} className="mt-4 bg-accent text-accent-foreground font-semibold">
          Back to Gallery
        </Button>
      </div>
    );
  }

  const handleBookConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail || !bookingDate || !bookingTime) {
      toast.error("Please fill in all details for booking!");
      return;
    }
    
    // Save to localStorage so Admin Dashboard can display it!
    const existingBookings = JSON.parse(localStorage.getItem("divyapriya_bookings") || "[]");
    const newBooking = {
      id: "booking-" + Date.now(),
      name: bookingName,
      email: bookingEmail,
      date: bookingDate,
      time: bookingTime,
      sareeName: product.name,
      status: "pending",
      createdAt: new Date().toISOString()
    };
    localStorage.setItem("divyapriya_bookings", JSON.stringify([newBooking, ...existingBookings]));

    toast.success("Video Shopping session requested! We will email you the link shortly.", {
      description: `Date: ${bookingDate} | Time: ${bookingTime}`,
      duration: 5000,
    });

    // Reset fields
    setBookingName("");
    setBookingEmail("");
    setBookingDate("");
    setBookingTime("");
    setIsBookingOpen(false);
  };

  const related = MOCK_PRODUCTS.filter((p) => p.fabric === product.fabric && p.id !== product.id).slice(0, 3);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back button */}
      <button
        onClick={() => navigate("/collections")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent font-semibold mb-8 group transition-colors"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
        <span>Back to Saree Gallery</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-[3/4] bg-muted rounded-2xl overflow-hidden border border-border shadow-md">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Thumbnails */}
          {product.gallery.length > 1 && (
            <div className="flex gap-4">
              {product.gallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${
                    activeImage === img ? "border-accent scale-102" : "border-border opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Gallery view ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-accent/15 text-accent border border-accent/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {product.weaveType}
              </span>
              {product.stock <= 3 && (
                <span className="bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 px-3 py-1 rounded-full text-xs font-bold">
                  Only {product.stock} Left!
                </span>
              )}
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-primary dark:text-foreground leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <Star className="w-4 h-4 fill-accent text-accent" />
                <Star className="w-4 h-4 fill-accent text-accent" />
                <Star className="w-4 h-4 fill-accent text-accent" />
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="text-foreground ml-1">(5.0 Rating)</span>
              </span>
              <span>•</span>
              <span className="text-accent">{product.origin}</span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-muted/30 border border-border/40 p-5 rounded-2xl flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground font-medium">Boutique Price</span>
              <div className="flex items-baseline gap-3">
                {product.discountPrice ? (
                  <>
                    <span className="text-2xl font-extrabold text-primary dark:text-accent">
                      ₹{product.discountPrice.toLocaleString()}
                    </span>
                    <span className="text-sm line-through text-muted-foreground font-light">
                      ₹{product.price.toLocaleString()}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-extrabold text-primary dark:text-accent">
                    ₹{product.price.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right text-xs text-muted-foreground font-light">
              <span>Incl. of all taxes</span>
              <br />
              <span className="text-green-600 font-semibold">Free Express Shipping</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground font-light leading-relaxed">
            {product.description}
          </p>

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Button
              onClick={() => onAddToCart(product)}
              className="bg-primary hover:bg-primary/95 text-primary-foreground dark:bg-accent dark:text-accent-foreground dark:hover:bg-accent/90 font-bold py-6 text-base rounded-lg shadow-lg"
            >
              Add to Shopping Bag
            </Button>
            
            {/* Consultation Booking Dialog */}
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5 dark:border-accent dark:text-accent dark:hover:bg-accent/5 font-bold py-6 text-base rounded-lg"
                >
                  Book Video Showroom
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md bg-card border border-border rounded-2xl p-6 text-left">
                <DialogHeader className="space-y-2">
                  <DialogTitle className="font-serif text-2xl font-bold flex items-center gap-2 text-primary dark:text-foreground">
                    <Sparkles className="w-5 h-5 text-accent" />
                    <span>Video Consultation</span>
                  </DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground font-light">
                    Schedule a private 1-on-1 virtual showroom call. Our design specialists will show you this saree and match others from our heritage looms.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleBookConsultation} className="space-y-4 mt-4 font-semibold text-sm">
                  {/* Saree selected summary */}
                  <div className="p-3 bg-muted/40 border rounded-lg text-xs font-light text-muted-foreground flex gap-3 items-center">
                    <img src={product.image} className="w-10 h-12 object-cover rounded border" alt="" />
                    <div>
                      <span className="font-bold text-foreground block truncate max-w-[280px]">
                        {product.name}
                      </span>
                      <span>Fabric: {product.fabric.toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-muted-foreground">Your Name</label>
                    <input
                      type="text"
                      required
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full bg-background border border-border rounded-lg p-2.5 text-sm font-medium focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-muted-foreground">Email Address</label>
                    <input
                      type="email"
                      required
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="w-full bg-background border border-border rounded-lg p-2.5 text-sm font-medium focus:ring-1 focus:ring-accent focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> Date
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg p-2.5 text-sm font-medium focus:ring-1 focus:ring-accent focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> Time Slot
                      </label>
                      <input
                        type="time"
                        required
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg p-2.5 text-sm font-medium focus:ring-1 focus:ring-accent focus:outline-none"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold mt-4 py-2.5 rounded-lg"
                  >
                    Confirm Booking Request
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Saree Details / Specifications */}
          <div className="border-t border-border pt-6">
            <h3 className="font-serif text-lg font-bold text-primary dark:text-foreground mb-4">
              Weave Specifications
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-light">
              <div className="flex border-b border-border/40 py-2.5 justify-between">
                <span className="text-muted-foreground">Fabric Material</span>
                <span className="font-semibold text-foreground capitalize">{product.fabric} Silk</span>
              </div>
              <div className="flex border-b border-border/40 py-2.5 justify-between">
                <span className="text-muted-foreground">Weave Pattern</span>
                <span className="font-semibold text-foreground">{product.weaveType}</span>
              </div>
              <div className="flex border-b border-border/40 py-2.5 justify-between">
                <span className="text-muted-foreground">Zari Quality</span>
                <span className="font-semibold text-foreground">{product.zariType}</span>
              </div>
              <div className="flex border-b border-border/40 py-2.5 justify-between">
                <span className="text-muted-foreground">Dimensions</span>
                <span className="font-semibold text-foreground">{product.length}</span>
              </div>
              <div className="flex border-b border-border/40 py-2.5 justify-between">
                <span className="text-muted-foreground">Loom Origin</span>
                <span className="font-semibold text-foreground">{product.origin}</span>
              </div>
              <div className="flex border-b border-border/40 py-2.5 justify-between">
                <span className="text-muted-foreground">Care Instructions</span>
                <span className="font-semibold text-foreground">Dry Clean Only</span>
              </div>
            </div>
          </div>

          {/* Quality Trust Badges */}
          <div className="bg-muted/20 border border-border/30 rounded-xl p-4 flex items-center justify-around text-center gap-4 text-[10px] text-muted-foreground font-semibold">
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-5 h-5 text-accent mb-1" />
              <span>Silk Mark Certified</span>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="w-5 h-5 text-accent mb-1" />
              <span>Fast Global Shipping</span>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="w-5 h-5 text-accent mb-1" />
              <span>WhatsApp Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <section className="border-t border-border pt-16">
          <h2 className="font-serif text-2xl font-bold text-primary dark:text-foreground mb-8 text-left">
            You May Also Admire
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((prod) => (
              <div
                key={prod.id}
                onClick={() => {
                  navigate(`/product/${prod.id}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all text-left flex flex-col justify-between"
              >
                <div className="aspect-[3/4] overflow-hidden bg-muted relative">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <span className="text-[9px] uppercase font-bold text-accent tracking-widest block">
                    {prod.weaveType.split(" ")[0]}
                  </span>
                  <h3 className="font-serif font-bold text-base text-primary dark:text-foreground truncate">
                    {prod.name}
                  </h3>
                  <span className="text-sm font-extrabold text-primary dark:text-accent block">
                    ₹{(prod.discountPrice || prod.price).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
export default ProductDetail;
