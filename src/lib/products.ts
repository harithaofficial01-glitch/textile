export interface SareeProduct {
  id: string;
  name: string;
  description: string;
  fabric: "silk" | "banarasi" | "organza" | "georgette" | "cotton";
  price: number; // in INR
  discountPrice?: number;
  image: string; // main image url/path
  gallery: string[]; // gallery images
  colors: string[];
  isFeatured: boolean;
  isNewArrival: boolean;
  weaveType: string;
  zariType: string;
  length: string;
  origin: string;
  stock: number;
}

export const MOCK_PRODUCTS: SareeProduct[] = [
  {
    id: "saree-kanjeevaram-01",
    name: "Swarna Mayuri Kanjeevaram Pure Silk Saree",
    description: "An exquisite Kanchipuram silk saree handwoven with pure gold zari. Featuring a rich crimson border adorned with peacock (mayuri) motifs and a heavy gold pallu, this saree represents the pinnacle of South Indian bridal heritage.",
    fabric: "silk",
    price: 24500,
    discountPrice: 21999,
    image: "/assets/saree-red-gold.jpg",
    gallery: ["/assets/saree-red-gold.jpg", "/assets/saree-red-gold-detail.jpg"],
    colors: ["Crimson Red", "Royal Gold"],
    isFeatured: true,
    isNewArrival: false,
    weaveType: "Kanjeevaram Handloom",
    zariType: "Pure Gold & Silver Zari",
    length: "5.5 meters + 0.8 meters contrast blouse",
    origin: "Kanchipuram, Tamil Nadu",
    stock: 5
  },
  {
    id: "saree-banarasi-02",
    name: "Madhubani Brocade Banarasi Silk Saree",
    description: "A timeless Banarasi silk saree displaying traditional Kadwa weaving. Woven in Varanasi, this deep royal blue saree features floral vines (bel) in fine gold zari, creating a perfect vintage look for festive occasions.",
    fabric: "banarasi",
    price: 18500,
    image: "/assets/saree-blue-gold.jpg",
    gallery: ["/assets/saree-blue-gold.jpg"],
    colors: ["Royal Blue", "Antique Gold"],
    isFeatured: true,
    isNewArrival: true,
    weaveType: "Banarasi Kadwa Weave",
    zariType: "Tested Fine Zari",
    length: "5.5 meters + 0.8 meters running blouse",
    origin: "Varanasi, Uttar Pradesh",
    stock: 3
  },
  {
    id: "saree-organza-03",
    name: "Aura Pastels Floral Handloom Organza Saree",
    description: "Lightweight and diaphanous, this ivory organza saree combines transparency with elegance. Embellished with hand-embroidered floral creepers and a delicate scallop border in silver zari, it offers a contemporary chic drape.",
    fabric: "organza",
    price: 8800,
    discountPrice: 7900,
    image: "/assets/saree-pastel-organza.jpg",
    gallery: ["/assets/saree-pastel-organza.jpg"],
    colors: ["Ivory White", "Mint Green", "Peach Pink"],
    isFeatured: false,
    isNewArrival: true,
    weaveType: "Kora Organza Weave",
    zariType: "Silver Zari Border",
    length: "5.5 meters + 0.8 meters designer blouse",
    origin: "Chanderi, Madhya Pradesh",
    stock: 8
  },
  {
    id: "saree-georgette-04",
    name: "Vasundhara Banarasi Georgette Saree",
    description: "Blending the fluid drape of georgette with the richness of Banarasi zari. Woven in a gorgeous emerald green hue, this saree features delicate gold motifs spread across the body and a classic zari borders.",
    fabric: "georgette",
    price: 13500,
    image: "/assets/saree-blue-gold.jpg",
    gallery: ["/assets/saree-blue-gold.jpg"],
    colors: ["Emerald Green", "Warm Gold"],
    isFeatured: true,
    isNewArrival: false,
    weaveType: "Khaddi Georgette Handloom",
    zariType: "Half Fine Gold Zari",
    length: "5.5 meters + 0.8 meters blouse piece",
    origin: "Varanasi, Uttar Pradesh",
    stock: 4
  },
  {
    id: "saree-cotton-05",
    name: "Mangalagiri Border Soft Cotton Saree",
    description: "Crafted in breathable pure Mangalagiri cotton, this mustard yellow saree features a contrasting maroon border woven with Nizam zari. It is perfect for professional styling or elegant daytime wear.",
    fabric: "cotton",
    price: 4500,
    discountPrice: 3999,
    image: "/assets/saree-pastel-organza.jpg",
    gallery: ["/assets/saree-pastel-organza.jpg"],
    colors: ["Mustard Yellow", "Maroon"],
    isFeatured: false,
    isNewArrival: false,
    weaveType: "Mangalagiri Handloom",
    zariType: "Nizam Zari Border",
    length: "5.5 meters + 0.7 meters plain blouse",
    origin: "Mangalagiri, Andhra Pradesh",
    stock: 12
  },
  {
    id: "saree-kanjeevaram-06",
    name: "Ragini Pink Heritage Kanjeevaram Saree",
    description: "A stunning magenta Kanjeevaram saree representing the traditional checked patterns (kuttu). Handloomed using 3-ply heavy mulberry silk, this saree boasts a dramatic zari border featuring elephant and parrot motifs.",
    fabric: "silk",
    price: 29000,
    image: "/assets/saree-red-gold.jpg",
    gallery: ["/assets/saree-red-gold.jpg"],
    colors: ["Magenta Pink", "Golden Zari"],
    isFeatured: false,
    isNewArrival: true,
    weaveType: "Kanjeevaram Korvai Weave",
    zariType: "Pure Silk-Gold Plated Zari",
    length: "5.5 meters + 0.8 meters contrast blouse",
    origin: "Kanchipuram, Tamil Nadu",
    stock: 2
  },
  {
    id: "saree-banarasi-07",
    name: "Shweta Kora Silk Tanchoi Banarasi Saree",
    description: "A unique light Banarasi crafted using Kora (net-like) silk threads. Features beautiful multi-colored Tanchoi weave patterns depicting paisleys and geometric frames. Subtle, light, yet extremely rich.",
    fabric: "banarasi",
    price: 11200,
    discountPrice: 9800,
    image: "/assets/saree-pastel-organza.jpg",
    gallery: ["/assets/saree-pastel-organza.jpg"],
    colors: ["Cream", "Multi-color Threadwork"],
    isFeatured: false,
    isNewArrival: false,
    weaveType: "Banarasi Tanchoi Handloom",
    zariType: "Resham Threadwork Border",
    length: "5.5 meters + 0.8 meters cream blouse",
    origin: "Varanasi, Uttar Pradesh",
    stock: 6
  },
  {
    id: "saree-georgette-08",
    name: "Rani Shimmer Georgette Saree",
    description: "A gorgeous hot pink chiffon-georgette saree with fine silver sequin embellishments clustered like stars. Modern, sparkly, and flows elegantly for cocktail parties and evening events.",
    fabric: "georgette",
    price: 9500,
    image: "/assets/saree-pastel-organza.jpg",
    gallery: ["/assets/saree-pastel-organza.jpg"],
    colors: ["Rani Pink", "Silver Sequins"],
    isFeatured: false,
    isNewArrival: true,
    weaveType: "Powerloom Georgette Embellished",
    zariType: "Silver Sequins & Metallic Border",
    length: "5.5 meters + 0.8 meters sequined blouse",
    origin: "Surat, Gujarat",
    stock: 10
  }
];

export const getProductsByFabric = (fabric: string) => {
  return MOCK_PRODUCTS.filter(p => p.fabric === fabric);
};

export const getFeaturedProducts = () => {
  return MOCK_PRODUCTS.filter(p => p.isFeatured);
};

export const getNewArrivals = () => {
  return MOCK_PRODUCTS.filter(p => p.isNewArrival);
};

export const getProductById = (id: string) => {
  return MOCK_PRODUCTS.find(p => p.id === id);
};
