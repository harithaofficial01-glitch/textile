import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, SlidersHorizontal, Grid, RotateCcw, Heart, Eye } from "lucide-react";
import { MOCK_PRODUCTS, SareeProduct } from "../lib/products";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import { Badge } from "../components/ui/badge";

interface CollectionsProps {
  onAddToCart: (product: SareeProduct) => void;
  onQuickView: (product: SareeProduct) => void;
}

export const Collections: React.FC<CollectionsProps> = ({
  onAddToCart,
  onQuickView,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Filters State
  const [selectedFabric, setSelectedFabric] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([30000]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");

  // Read URL search params
  useEffect(() => {
    const fabricParam = searchParams.get("fabric");
    if (fabricParam) {
      setSelectedFabric(fabricParam);
    } else {
      setSelectedFabric("");
    }
  }, [searchParams]);

  // Update URL search params
  const handleFabricChange = (fabric: string) => {
    const newFabric = selectedFabric === fabric ? "" : fabric;
    setSelectedFabric(newFabric);
    if (newFabric) {
      setSearchParams({ fabric: newFabric });
    } else {
      searchParams.delete("fabric");
      setSearchParams(searchParams);
    }
  };

  const handleResetFilters = () => {
    setSelectedFabric("");
    setPriceRange([30000]);
    setSelectedColor("");
    setSortBy("featured");
    setSearchParams({});
  };

  // Filter and Sort Logic
  const fabrics = ["silk", "banarasi", "organza", "georgette", "cotton"];
  const colors = [
    { name: "Red", value: "Red" },
    { name: "Blue", value: "Blue" },
    { name: "Gold", value: "Gold" },
    { name: "Green", value: "Green" },
    { name: "Pink", value: "Pink" },
    { name: "Yellow", value: "Yellow" },
    { name: "Ivory", value: "Ivory" }
  ];

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    // Fabric filter
    if (selectedFabric && product.fabric !== selectedFabric) return false;
    
    // Price filter
    if (product.discountPrice) {
      if (product.discountPrice > priceRange[0]) return false;
    } else {
      if (product.price > priceRange[0]) return false;
    }

    // Color filter
    if (selectedColor) {
      const match = product.colors.some(c => c.toLowerCase().includes(selectedColor.toLowerCase()));
      if (!match) return false;
    }

    return true;
  }).sort((a, b) => {
    const aPrice = a.discountPrice || a.price;
    const bPrice = b.discountPrice || b.price;

    if (sortBy === "price-low") return aPrice - bPrice;
    if (sortBy === "price-high") return bPrice - aPrice;
    if (sortBy === "newest") return a.isNewArrival ? -1 : 1;
    return 0; // Default Featured
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-serif font-extrabold text-primary dark:text-foreground">
          The Heritage Saree Gallery
        </h1>
        <p className="text-xs text-muted-foreground mt-2 font-light max-w-lg mx-auto">
          Immerse yourself in our collection of handloomed Kanjeevarams, Banarasis, Organzas, and luxury Georgettes. Curated directly from weaver cooperatives.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* FILTERS SIDEBAR */}
        <aside className="lg:col-span-3 bg-card border border-border rounded-2xl p-6 text-left sticky top-28 shadow-sm">
          <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
            <h3 className="font-serif text-lg font-bold flex items-center gap-2 text-primary dark:text-foreground">
              <SlidersHorizontal className="w-4 h-4 text-accent" />
              <span>Filters</span>
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-xs text-muted-foreground hover:text-accent flex items-center gap-1.5 transition-colors"
              title="Reset Filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-6">
            {/* Fabric categories */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary dark:text-foreground">
                Fabric / Origin
              </h4>
              <div className="flex flex-col gap-2">
                {fabrics.map((fab) => (
                  <label
                    key={fab}
                    className="flex items-center gap-3 text-sm cursor-pointer hover:text-accent font-medium transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFabric === fab}
                      onChange={() => handleFabricChange(fab)}
                      className="rounded border-border text-accent focus:ring-accent"
                    />
                    <span className="capitalize">{fab === "silk" ? "Kanjeevaram Silk" : fab}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price filter */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary dark:text-foreground">
                  Max Price
                </h4>
                <span className="text-sm font-semibold text-accent">₹{priceRange[0].toLocaleString()}</span>
              </div>
              <Slider
                value={priceRange}
                onValueChange={(val) => setPriceRange(val)}
                min={3000}
                max={30000}
                step={500}
                className="py-2"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-light">
                <span>₹3,000</span>
                <span>₹30,000</span>
              </div>
            </div>

            {/* Color filter */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary dark:text-foreground">
                Color Palette
              </h4>
              <div className="flex flex-wrap gap-2">
                {colors.map((col) => (
                  <button
                    key={col.value}
                    onClick={() => setSelectedColor(selectedColor === col.value ? "" : col.value)}
                    className={`text-xs px-3 py-1 rounded-full border transition-all ${
                      selectedColor === col.value
                        ? "bg-accent border-accent text-accent-foreground font-semibold"
                        : "bg-background border-border text-muted-foreground hover:border-accent hover:text-foreground"
                    }`}
                  >
                    {col.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* PRODUCTS GRID */}
        <main className="lg:col-span-9 space-y-6">
          {/* Grid control bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between bg-card border border-border px-5 py-4 rounded-xl shadow-sm gap-4 text-sm font-semibold">
            <div className="text-muted-foreground font-medium text-left w-full sm:w-auto">
              Showing <span className="text-primary dark:text-foreground font-bold">{filteredProducts.length}</span> Sarees
            </div>
            
            <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
              <span className="text-muted-foreground font-medium shrink-0">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-background border border-border text-xs rounded-lg py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="featured">Featured Weaves</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>

          {/* Saree list */}
          <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                layout
              >
                {filteredProducts.map((prod) => (
                  <motion.div
                    key={prod.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between"
                  >
                    <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Heart Wishlist icon */}
                      <button className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800 rounded-full text-muted-foreground hover:text-red-500 shadow-sm transition-colors z-10">
                        <Heart className="w-4 h-4" />
                      </button>

                      {/* Weave Badge */}
                      <span className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-sm text-[10px] text-accent font-bold uppercase tracking-wider py-1 px-3 rounded-full border border-accent/20">
                        {prod.weaveType.split(" ")[0]}
                      </span>

                      {/* Hover Quick View Trigger */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button
                          onClick={() => onQuickView(prod)}
                          className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Quick View</span>
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-accent tracking-widest">
                            {prod.origin.split(",")[0]}
                          </span>
                          {prod.isNewArrival && (
                            <Badge className="bg-accent text-accent-foreground text-[8px] font-bold py-0.5 px-1.5 leading-none">
                              New
                            </Badge>
                          )}
                        </div>
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

                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          {prod.discountPrice ? (
                            <>
                              <span className="text-[10px] line-through text-muted-foreground font-light leading-none">
                                ₹{prod.price.toLocaleString()}
                              </span>
                              <span className="text-base font-extrabold text-primary dark:text-accent mt-0.5">
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
                          className="bg-primary hover:bg-primary/95 text-primary-foreground dark:bg-accent dark:text-accent-foreground dark:hover:bg-accent/90 text-xs font-bold py-1.5 px-3.5"
                        >
                          Add To Cart
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20 bg-card border border-border rounded-2xl">
                <p className="text-muted-foreground font-light">No sarees found matching current filters.</p>
                <Button
                  onClick={handleResetFilters}
                  variant="link"
                  className="text-accent hover:text-accent-foreground font-semibold mt-2"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
export default Collections;
