import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Link, useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "./components/ui/sheet";
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "./components/ui/command";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Button } from "./components/ui/button";
import Index from "./pages/Index";
import Collections from "./pages/Collections";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { MOCK_PRODUCTS, SareeProduct } from "./lib/products";
import { ShoppingBag, Trash2, HelpCircle, X, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const queryClient = new QueryClient();

// Helper component to enable navigate inside search palette (since it needs router context)
const SearchPalette: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
}> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const handleSelectProduct = (id: string) => {
    onOpenChange(false);
    navigate(`/product/${id}`);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search sarees (e.g. Kanjeevaram, Silk, Red, Blue)..." />
      <CommandList className="max-h-[300px]">
        <CommandEmpty>No matching weaves found.</CommandEmpty>
        <CommandGroup heading="Premium Saree Collections">
          {MOCK_PRODUCTS.map((prod) => (
            <CommandItem
              key={prod.id}
              value={prod.name + " " + prod.fabric + " " + prod.weaveType}
              onSelect={() => handleSelectProduct(prod.id)}
              className="flex items-center gap-3 p-2 cursor-pointer font-semibold text-xs"
            >
              <img src={prod.image} alt={prod.name} className="w-8 h-10 object-cover rounded border" />
              <div className="flex-grow text-left">
                <span className="font-serif text-sm font-bold text-primary dark:text-foreground block leading-tight">
                  {prod.name}
                </span>
                <span className="text-[10px] text-accent tracking-wider uppercase font-semibold">
                  {prod.weaveType} • ₹{prod.price.toLocaleString()}
                </span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

interface CartItem {
  product: SareeProduct;
  quantity: number;
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("divyapriya_cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage on change
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("divyapriya_cart", JSON.stringify(newCart));
  };

  const handleAddToCart = (product: SareeProduct) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      saveCart(updated);
    } else {
      saveCart([...cart, { product, quantity: 1 }]);
    }
    toast.success("Added to Shopping Bag!", {
      description: product.name,
      action: {
        label: "View Bag",
        onClick: () => setIsCartOpen(true),
      },
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    const updated = cart.filter((item) => item.product.id !== productId);
    saveCart(updated);
    toast.success("Removed from Shopping Bag.");
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    const updated = cart.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    saveCart(updated);
  };

  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartTotal = cart.reduce((acc, curr) => {
    const price = curr.product.discountPrice || curr.product.price;
    return acc + price * curr.quantity;
  }, 0);

  const handleCheckout = () => {
    setIsCartOpen(false);
    toast.success("Order Placed Successfully!", {
      description: `Boutique invoice generated. Total: ₹${cartTotal.toLocaleString()}`,
      duration: 5000,
    });
    saveCart([]); // clear cart
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar
        onCartClick={() => setIsCartOpen(true)}
        cartCount={cartCount}
        onSearchClick={() => setIsSearchOpen(true)}
      />

      <SearchPalette open={isSearchOpen} onOpenChange={setIsSearchOpen} />

      {/* Main Pages Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Index onAddToCart={handleAddToCart} />} />
          <Route
            path="/collections"
            element={
              <Collections
                onAddToCart={handleAddToCart}
                onQuickView={(prod) => {
                  handleAddToCart(prod); // Fallback: add to cart directly or view product
                }}
              />
            }
          />
          <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      {/* Cart Drawer */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-full sm:max-w-md bg-card border-l border-border p-6 flex flex-col justify-between text-left">
          <div className="space-y-6 flex-grow overflow-y-auto">
            <SheetHeader className="border-b border-border pb-4">
              <SheetTitle className="font-serif text-2xl font-bold flex items-center gap-2 text-primary dark:text-foreground">
                <ShoppingBag className="w-5 h-5 text-accent" />
                <span>Shopping Bag</span>
              </SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground font-light">
                {cartCount === 0 ? "Your bag is empty." : `You have ${cartCount} items in your bag.`}
              </SheetDescription>
            </SheetHeader>

            {cart.length > 0 ? (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-3 border border-border/60 rounded-xl bg-muted/20 items-start">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-18 object-cover rounded border border-border"
                    />
                    <div className="flex-grow space-y-1 text-xs">
                      <span className="font-serif font-bold text-foreground line-clamp-1 leading-tight text-sm">
                        {item.product.name}
                      </span>
                      <span className="text-[10px] text-accent font-semibold uppercase block">
                        {item.product.weaveType}
                      </span>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 border rounded flex items-center justify-center font-bold hover:bg-muted"
                          >
                            -
                          </button>
                          <span className="w-4 text-center font-bold">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 border rounded flex items-center justify-center font-bold hover:bg-muted"
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-primary dark:text-accent">
                            ₹{((item.product.discountPrice || item.product.price) * item.quantity).toLocaleString()}
                          </span>
                          <button
                            onClick={() => handleRemoveFromCart(item.product.id)}
                            className="text-muted-foreground hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center flex flex-col items-center justify-center gap-4 text-muted-foreground font-light">
                <ShoppingBag className="w-12 h-12 opacity-20" />
                <p className="text-sm">Find your perfect weave in our collections.</p>
                <SheetClose asChild>
                  <Link to="/collections">
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-6">
                      Browse Saree Catalog
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-border pt-4 mt-6 space-y-4">
              <div className="flex justify-between text-base font-bold text-primary dark:text-foreground">
                <span>Subtotal</span>
                <span className="text-accent">₹{cartTotal.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-muted-foreground font-light leading-normal">
                Tax calculated at checkout. Worldwide Express Shipping and Custom stitching options are available.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <SheetClose asChild>
                  <Button variant="outline" className="border-border font-bold">
                    Continue Shopping
                  </Button>
                </SheetClose>
                <Button
                  onClick={handleCheckout}
                  className="bg-primary hover:bg-primary/95 text-primary-foreground dark:bg-accent dark:text-accent-foreground dark:hover:bg-accent/90 font-bold shadow-lg"
                >
                  Checkout Bag
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AppContent />
            <Sonner />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
