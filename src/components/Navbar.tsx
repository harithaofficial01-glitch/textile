import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Sun, Moon, Search, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { Logo } from "./Logo";
import { Button } from "./ui/button";

interface NavbarProps {
  onCartClick: () => void;
  cartCount: number;
  onSearchClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onCartClick,
  cartCount,
  onSearchClick,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: "Our Heritage", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40 transition-colors duration-300"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Top Info Banner */}
        <div className="bg-primary text-primary-foreground text-center py-1.5 px-4 text-xs tracking-wider flex items-center justify-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-accent" />
          <span>Bridal Silk & Heritage Loom Sarees Collection. Free Shipping Across India!</span>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <Logo variant="emblem" size={54} className="group-hover:scale-105 transition-transform" />
            <div className="flex flex-col text-left">
              <span className="font-serif tracking-[0.15em] font-extrabold text-primary dark:text-foreground text-lg leading-none">
                DIVYAPRIYA
              </span>
              <span className="text-[10px] tracking-[0.3em] text-accent uppercase font-bold mt-1">
                Textiles
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative py-2 transition-colors ${
                    isActive
                      ? "text-primary dark:text-accent font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Trigger */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onSearchClick}
              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full"
              title="Search Sarees"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Light/Dark Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full"
              title="Switch Theme"
            >
              <Sun className="w-5 h-5 hidden dark:block text-accent" />
              <Moon className="w-5 h-5 block dark:hidden" />
            </Button>

            {/* Shopping Bag / Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onCartClick}
              className="relative text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full"
              title="Cart"
            >
              <ShoppingBag className="w-5 h-5 text-primary dark:text-accent" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground hover:bg-muted/50 rounded-full"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border px-6 py-6 space-y-4 shadow-xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`block font-medium py-2 px-3 rounded-lg text-base transition-colors ${
                        isActive
                          ? "bg-accent/15 text-primary dark:text-accent font-bold"
                          : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
              
              <div className="border-t border-border pt-4 text-xs text-muted-foreground flex flex-col gap-1.5">
                <span className="font-semibold text-foreground">Divyapriya Textiles Boutique</span>
                <span>Enquiries: divyapriyafashions@gmail.com</span>
                <span>Timing: 10:00 AM - 8:30 PM (Mon-Sat)</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      {/* spacer to push content below navbar */}
      <div className="h-28" />
    </>
  );
};
