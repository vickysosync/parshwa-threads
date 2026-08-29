import paithani from "@/assets/saree-paithani.jpg";
import silk from "@/assets/saree-silk.jpg";
import printed from "@/assets/saree-printed.jpg";
import kurti from "@/assets/kurti-pink.jpg";
import anarkali from "@/assets/anarkali.jpg";
import setIvory from "@/assets/set-ivory.jpg";
import lehenga from "@/assets/lehenga-maroon.jpg";
import fusion from "@/assets/fusion-dress.jpg";
import top from "@/assets/top-floral.jpg";
import rosegold from "@/assets/dress-rosegold.jpg";
import boutique from "@/assets/boutique.jpg";
import festive from "@/assets/festive-banner.jpg";
import luxury from "@/assets/luxury.jpg";
import hero from "@/assets/hero.jpg";

export const IMG = {
  paithani,
  silk,
  printed,
  kurti,
  anarkali,
  setIvory,
  lehenga,
  fusion,
  top,
  rosegold,
  boutique,
  festive,
  luxury,
  hero,
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  description: string;
  fabric: string;
  occasion: string;
  colors: string[];
  sizes: string[];
  stock: number;
  featured: boolean;
  newArrival: boolean;
  status: "Active" | "Draft";
  care?: string;
};

export const CATEGORY_LIST = [
  "Sarees",
  "Kurtis",
  "Ethnic Sets",
  "Lehengas",
  "Indo-Western",
  "Western Wear",
] as const;

const P = (
  id: number,
  name: string,
  category: string,
  price: number,
  originalPrice: number,
  image: string,
  fabric: string,
  occasion: string,
  colors: string[],
  sizes: string[],
  stock: number,
  rating: number,
  reviews: number,
  flags: { featured?: boolean; newArrival?: boolean } = {},
): Product => ({
  id: String(id),
  name,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  category,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  gallery: [image, IMG.boutique, IMG.luxury],
  description: `${name} from PARSHWA COLLECTION — crafted in ${fabric.toLowerCase()} with a refined finish, thoughtfully designed for ${occasion.toLowerCase()} occasions. A perfect balance of traditional Indian craftsmanship and contemporary styling.`,
  fabric,
  occasion,
  colors,
  sizes,
  stock,
  featured: !!flags.featured,
  newArrival: !!flags.newArrival,
  status: "Active",
  care: "Dry clean recommended. Store in a muslin cloth away from direct sunlight.",
});

export const PRODUCTS: Product[] = [
  P(1, "Royal Paithani Silk Saree", "Sarees", 6499, 8999, IMG.paithani, "Pure Silk", "Wedding", ["Peacock Green", "Magenta"], [], 12, 4.8, 126, { featured: true }),
  P(2, "Wine Embroidered Silk Saree", "Sarees", 4299, 5999, IMG.silk, "Art Silk", "Festive", ["Wine", "Maroon"], [], 18, 4.7, 94, { featured: true }),
  P(3, "Everyday Printed Saree", "Sarees", 1199, 1799, IMG.printed, "Soft Cotton", "Everyday Elegance", ["Blush Pink", "Ivory"], [], 34, 4.4, 61, { featured: true }),
  P(4, "Kanjivaram Zari Border Saree", "Sarees", 7999, 10999, IMG.paithani, "Pure Silk", "Wedding", ["Gold", "Green"], [], 7, 4.9, 148),
  P(5, "Banarasi Festive Silk Saree", "Sarees", 5499, 7499, IMG.silk, "Banarasi Silk", "Festive", ["Deep Red", "Wine"], [], 15, 4.6, 88, { newArrival: true }),
  P(6, "Georgette Office Saree", "Sarees", 1699, 2499, IMG.printed, "Georgette", "Office Wear", ["Pastel Pink", "Grey"], [], 26, 4.3, 44),
  P(7, "Pastel Organza Party Saree", "Sarees", 3299, 4599, IMG.printed, "Organza", "Party Wear", ["Peach", "Mint"], [], 11, 4.5, 37, { newArrival: true }),
  P(8, "Elegant Pink Designer Kurti", "Kurtis", 1099, 1699, IMG.kurti, "Rayon", "Casual", ["Rose Pink", "Ivory"], ["S", "M", "L", "XL"], 40, 4.5, 72, { featured: true }),
  P(9, "Chikankari Ivory Kurti", "Kurtis", 1499, 2199, IMG.setIvory, "Cotton", "Office Wear", ["Ivory"], ["S", "M", "L", "XL", "XXL"], 22, 4.6, 58, { newArrival: true }),
  P(10, "Printed A-Line Daily Kurti", "Kurtis", 799, 1299, IMG.kurti, "Cotton Blend", "Everyday Elegance", ["Pink", "Blue"], ["S", "M", "L", "XL"], 55, 4.2, 39),
  P(11, "Embroidered Straight Kurti", "Kurtis", 1299, 1899, IMG.kurti, "Viscose", "Festive", ["Maroon", "Mustard"], ["M", "L", "XL"], 19, 4.4, 51),
  P(12, "Festive Anarkali Set", "Ethnic Sets", 3899, 5499, IMG.anarkali, "Georgette", "Festive", ["Maroon", "Wine"], ["S", "M", "L", "XL"], 14, 4.8, 103, { featured: true }),
  P(13, "Ivory Pant Dupatta Set", "Ethnic Sets", 2499, 3499, IMG.setIvory, "Cotton Silk", "Office Wear", ["Ivory", "Beige"], ["S", "M", "L", "XL"], 21, 4.6, 67, { featured: true }),
  P(14, "Mirror Work Sharara Set", "Ethnic Sets", 4299, 5999, IMG.anarkali, "Georgette", "Wedding", ["Deep Red"], ["M", "L", "XL"], 9, 4.7, 45, { newArrival: true }),
  P(15, "Pastel Palazzo Kurti Set", "Ethnic Sets", 2199, 2999, IMG.setIvory, "Muslin", "Casual", ["Pastel Green", "Ivory"], ["S", "M", "L"], 28, 4.3, 33),
  P(16, "Maroon Festive Lehenga", "Lehengas", 12999, 17999, IMG.lehenga, "Velvet", "Wedding", ["Maroon"], ["S", "M", "L"], 5, 4.9, 76, { featured: true }),
  P(17, "Gold Zari Bridal Lehenga", "Lehengas", 18999, 24999, IMG.lehenga, "Raw Silk", "Wedding", ["Gold", "Red"], ["S", "M", "L"], 3, 5, 41, { newArrival: true }),
  P(18, "Sangeet Flare Lehenga", "Lehengas", 8999, 12499, IMG.lehenga, "Net", "Party Wear", ["Wine", "Rose"], ["S", "M", "L", "XL"], 8, 4.6, 29),
  P(19, "Contemporary Fusion Dress", "Indo-Western", 2299, 3299, IMG.fusion, "Cotton Blend", "Casual", ["Olive", "Beige"], ["S", "M", "L", "XL"], 24, 4.5, 62, { featured: true }),
  P(20, "Indo-Western Cape Dress", "Indo-Western", 2899, 3999, IMG.fusion, "Crepe", "Party Wear", ["Beige", "Black"], ["S", "M", "L"], 16, 4.4, 35, { newArrival: true }),
  P(21, "Dhoti Style Fusion Set", "Indo-Western", 3199, 4499, IMG.fusion, "Rayon", "Festive", ["Rust", "Olive"], ["M", "L", "XL"], 12, 4.3, 27),
  P(22, "Floral Seasonal Top", "Western Wear", 899, 1399, IMG.top, "Crepe", "Casual", ["Ivory Floral"], ["S", "M", "L", "XL"], 47, 4.2, 54, { featured: true }),
  P(23, "Rose Gold Party Wear Dress", "Western Wear", 3499, 4999, IMG.rosegold, "Satin", "Party Wear", ["Rose Gold"], ["S", "M", "L"], 10, 4.7, 81, { featured: true, newArrival: true }),
  P(24, "Ruffle Sleeve Summer Top", "Western Wear", 749, 1199, IMG.top, "Rayon", "Everyday Elegance", ["Pink", "White"], ["S", "M", "L", "XL"], 38, 4.1, 22),
  P(25, "Satin Cocktail Midi Dress", "Western Wear", 2799, 3899, IMG.rosegold, "Satin", "Party Wear", ["Blush", "Wine"], ["S", "M", "L"], 13, 4.5, 40, { newArrival: true }),
  P(26, "Handloom Cotton Saree", "Sarees", 1899, 2699, IMG.printed, "Handloom Cotton", "Office Wear", ["Ivory", "Rust"], [], 30, 4.4, 48),
  P(27, "Silk Blend Festive Kurti", "Kurtis", 1799, 2499, IMG.kurti, "Silk Blend", "Festive", ["Wine", "Gold"], ["S", "M", "L", "XL"], 17, 4.5, 36, { newArrival: true }),
  P(28, "Wedding Guest Lehenga Set", "Lehengas", 9999, 13999, IMG.lehenga, "Silk", "Wedding", ["Wine"], ["M", "L"], 6, 4.8, 33),
];

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  status: "Active" | "Inactive";
};

export const CATEGORIES: Category[] = [
  { id: "c1", name: "Designer Sarees", slug: "Sarees", description: "Silk, Paithani and everyday drapes", image: IMG.paithani, status: "Active" },
  { id: "c2", name: "Elegant Kurtis", slug: "Kurtis", description: "Ready-to-wear comfort with detail", image: IMG.kurti, status: "Active" },
  { id: "c3", name: "Festive Lehengas", slug: "Lehengas", description: "Statement pieces for celebrations", image: IMG.lehenga, status: "Active" },
  { id: "c4", name: "Pant & Dupatta Sets", slug: "Ethnic Sets", description: "Coordinated three-piece ensembles", image: IMG.setIvory, status: "Active" },
  { id: "c5", name: "Indo-Western", slug: "Indo-Western", description: "Modern silhouettes, ethnic soul", image: IMG.fusion, status: "Active" },
  { id: "c6", name: "Western Wear", slug: "Western Wear", description: "Tops and dresses for every day", image: IMG.top, status: "Active" },
];

export const OCCASIONS = [
  { name: "Wedding", image: IMG.lehenga },
  { name: "Festive", image: IMG.anarkali },
  { name: "Office Wear", image: IMG.setIvory },
  { name: "Casual", image: IMG.top },
  { name: "Party Wear", image: IMG.rosegold },
  { name: "Everyday Elegance", image: IMG.printed },
];

export type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  product: string;
  date: string;
  status: "Approved" | "Pending" | "Rejected";
};

export const REVIEWS: Review[] = [
  { id: "r1", name: "Sneha Kulkarni", rating: 5, text: "Beautiful collection and very helpful staff. I found exactly what I was looking for.", product: "Royal Paithani Silk Saree", date: "2026-07-12", status: "Approved" },
  { id: "r2", name: "Aarti Deshmukh", rating: 5, text: "Excellent saree quality at a reasonable price. Will definitely visit again.", product: "Wine Embroidered Silk Saree", date: "2026-07-28", status: "Approved" },
  { id: "r3", name: "Pooja Shinde", rating: 4, text: "PARSHWA COLLECTION has a wonderful mix of traditional and modern styles.", product: "Ivory Pant Dupatta Set", date: "2026-08-03", status: "Approved" },
  { id: "r4", name: "Reshma Patil", rating: 5, text: "Bought a lehenga for my sister's wedding — the fabric and finish felt truly premium.", product: "Maroon Festive Lehenga", date: "2026-08-14", status: "Approved" },
  { id: "r5", name: "Nikita Jain", rating: 4, text: "Lovely kurtis for daily office wear, comfortable and well stitched.", product: "Chikankari Ivory Kurti", date: "2026-08-20", status: "Pending" },
  { id: "r6", name: "Manasi Gokhale", rating: 5, text: "Very reasonable prices for such elegant designs. Great boutique in Kharadi.", product: "Festive Anarkali Set", date: "2026-08-25", status: "Pending" },
];

export type Banner = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  active: boolean;
};

export const BANNERS: Banner[] = [
  { id: "b1", title: "Tradition Meets Contemporary Elegance", subtitle: "Discover elegant ethnic and fusion fashion thoughtfully curated for the modern Indian woman.", image: IMG.hero, buttonText: "Shop Collection", buttonLink: "/shop", active: true },
  { id: "b2", title: "Festive Edit 2026", subtitle: "Celebrate every occasion in style with our new festive arrivals.", image: IMG.festive, buttonText: "Shop Festive Wear", buttonLink: "/shop", active: false },
];

export type Offer = {
  id: string;
  title: string;
  description: string;
  discount: string;
  image: string;
  start: string;
  end: string;
  active: boolean;
};

export const OFFERS: Offer[] = [
  { id: "o1", title: "Up to 30% Off Festive Edit", description: "Sarees, anarkalis and lehengas from our festive collection at special boutique pricing.", discount: "30%", image: IMG.festive, start: "2026-08-01", end: "2026-10-31", active: true },
  { id: "o2", title: "Special Saree Collection", description: "Handpicked Paithani and silk sarees with assured savings this season.", discount: "20%", image: IMG.paithani, start: "2026-08-10", end: "2026-09-30", active: true },
  { id: "o3", title: "Buy Selected Ethnic Sets & Save", description: "Flat savings on pant-kurti-dupatta sets when you shop two or more.", discount: "25%", image: IMG.setIvory, start: "2026-08-05", end: "2026-09-15", active: true },
  { id: "o4", title: "Limited Time Boutique Offers", description: "In-store exclusive deals at our Sangharsh Chowk, Kharadi boutique.", discount: "15%", image: IMG.boutique, start: "2026-08-20", end: "2026-09-05", active: false },
];

export type OrderItem = { id: string; name: string; price: number; qty: number; image: string };
export type Order = {
  id: string;
  customer: string;
  email: string;
  phone: string;
  date: string;
  items: OrderItem[];
  amount: number;
  payment: string;
  address: string;
  status: "Pending" | "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
};

export const ORDERS: Order[] = [
  { id: "PC-100241", customer: "Sneha Kulkarni", email: "sneha.k@example.com", phone: "+91 98220 11223", date: "2026-08-24", items: [{ id: "1", name: "Royal Paithani Silk Saree", price: 6499, qty: 1, image: IMG.paithani }], amount: 6499, payment: "UPI", address: "Wadgaon Sheri, Pune", status: "Delivered" },
  { id: "PC-100242", customer: "Aarti Deshmukh", email: "aarti.d@example.com", phone: "+91 99700 45612", date: "2026-08-25", items: [{ id: "12", name: "Festive Anarkali Set", price: 3899, qty: 1, image: IMG.anarkali }], amount: 3899, payment: "Cash on Delivery", address: "Kharadi, Pune", status: "Shipped" },
  { id: "PC-100243", customer: "Pooja Shinde", email: "pooja.s@example.com", phone: "+91 90045 78123", date: "2026-08-26", items: [{ id: "13", name: "Ivory Pant Dupatta Set", price: 2499, qty: 2, image: IMG.setIvory }], amount: 4998, payment: "Debit/Credit Card", address: "Viman Nagar, Pune", status: "Processing" },
  { id: "PC-100244", customer: "Reshma Patil", email: "reshma.p@example.com", phone: "+91 88888 12345", date: "2026-08-27", items: [{ id: "16", name: "Maroon Festive Lehenga", price: 12999, qty: 1, image: IMG.lehenga }], amount: 12999, payment: "UPI", address: "Hadapsar, Pune", status: "Confirmed" },
  { id: "PC-100245", customer: "Nikita Jain", email: "nikita.j@example.com", phone: "+91 77009 33221", date: "2026-08-28", items: [{ id: "8", name: "Elegant Pink Designer Kurti", price: 1099, qty: 3, image: IMG.kurti }], amount: 3297, payment: "Google Pay", address: "Chandan Nagar, Pune", status: "Pending" },
  { id: "PC-100246", customer: "Manasi Gokhale", email: "manasi.g@example.com", phone: "+91 96570 88441", date: "2026-08-29", items: [{ id: "23", name: "Rose Gold Party Wear Dress", price: 3499, qty: 1, image: IMG.rosegold }], amount: 3499, payment: "UPI", address: "Magarpatta, Pune", status: "Pending" },
];

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  spent: number;
  lastOrder: string;
};

export const CUSTOMERS: Customer[] = [
  { id: "u1", name: "Sneha Kulkarni", email: "sneha.k@example.com", phone: "+91 98220 11223", orders: 6, spent: 28450, lastOrder: "2026-08-24" },
  { id: "u2", name: "Aarti Deshmukh", email: "aarti.d@example.com", phone: "+91 99700 45612", orders: 4, spent: 15980, lastOrder: "2026-08-25" },
  { id: "u3", name: "Pooja Shinde", email: "pooja.s@example.com", phone: "+91 90045 78123", orders: 3, spent: 11240, lastOrder: "2026-08-26" },
  { id: "u4", name: "Reshma Patil", email: "reshma.p@example.com", phone: "+91 88888 12345", orders: 2, spent: 21998, lastOrder: "2026-08-27" },
  { id: "u5", name: "Nikita Jain", email: "nikita.j@example.com", phone: "+91 77009 33221", orders: 5, spent: 9870, lastOrder: "2026-08-28" },
  { id: "u6", name: "Manasi Gokhale", email: "manasi.g@example.com", phone: "+91 96570 88441", orders: 1, spent: 3499, lastOrder: "2026-08-29" },
];

export const STORE_INFO = {
  name: "PARSHWA COLLECTION",
  tagline: "Traditional elegance. Contemporary confidence.",
  address:
    "Shop No. 1, Kharadi Rd, Eknath Pathare Vasti, Sangharsh Chowk, Pune, Maharashtra 411014",
  phone: "+91 90282 86574",
  email: "supportparshwacollection@gmail.com",
  hours: "10:00 AM – 9:00 PM",
  instagram: "https://instagram.com/parshwacollection",
  facebook: "https://facebook.com/parshwacollection",
  whatsapp: "https://wa.me/919028286574",
};

export const HOMEPAGE_SECTIONS = {
  hero: true,
  categories: true,
  featured: true,
  occasions: true,
  newArrivals: true,
  luxury: true,
  promo: true,
  testimonials: true,
  whyChooseUs: true,
  storeVisit: true,
  newsletter: true,
};

export const SETTINGS = {
  currency: "INR",
  freeShippingAbove: 1999,
  shippingFee: 99,
  codEnabled: true,
  cardEnabled: true,
  upiEnabled: true,
  gpayEnabled: true,
  deliveryDays: "3-5 business days",
  adminName: "Parshwa Admin",
  adminEmail: "admin@parshwacollection.com",
};

export const ADMIN_CREDENTIALS = {
  email: "admin@parshwacollection.com",
  password: "admin123",
};
