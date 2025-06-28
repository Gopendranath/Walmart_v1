import * as React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Send,
  Clock,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { ModeToggle } from "./mode-toggle";

const footerLinks = {
  shop: [
    { title: "All Products", href: "/products" },
    { title: "Electronics", href: "/electronics" },
    { title: "Fashion", href: "/fashion" },
    { title: "Home & Garden", href: "/home" },
    { title: "Sports", href: "/sports" },
    { title: "Books", href: "/books" },
  ],
  support: [
    { title: "Help Center", href: "/help" },
    { title: "Contact Us", href: "/contact" },
    { title: "Shipping Info", href: "/shipping" },
    { title: "Returns", href: "/returns" },
    { title: "Size Guide", href: "/size-guide" },
    { title: "Track Order", href: "/track" },
  ],
  company: [
    { title: "About Us", href: "/about" },
    { title: "Careers", href: "/careers" },
    { title: "Press", href: "/press" },
    { title: "Sustainability", href: "/sustainability" },
    { title: "Investors", href: "/investors" },
    { title: "Affiliates", href: "/affiliates" },
  ],
  legal: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
    { title: "Cookie Policy", href: "/cookies" },
    { title: "Accessibility", href: "/accessibility" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/walmart", label: "Facebook", color: "hover:bg-blue-600" },
  { icon: Twitter, href: "https://twitter.com/walmart", label: "Twitter", color: "hover:bg-sky-500" },
  { icon: Instagram, href: "https://instagram.com/walmart", label: "Instagram", color: "hover:bg-pink-600" },
  { icon: Youtube, href: "https://youtube.com/walmart", label: "YouTube", color: "hover:bg-red-600" },
];


const paymentMethods = [
  { name: "Visa", logo: "VISA" },
  { name: "Mastercard", logo: "MC" },
  { name: "American Express", logo: "AMEX" },
  { name: "Discover", logo: "DISC" },
  { name: "PayPal", logo: "PP" },
];

export default function Footer() {
  const [email, setEmail] = React.useState("");
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleNavigation = (href: string) => {
    console.log("Navigating to:", href);
    // For external links
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
    // For internal navigation, implement your routing logic
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Newsletter signup:", email);
      setIsSubscribed(true);
      setEmail("");
      setIsLoading(false);
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    }, 1000);
  };

  return (
    <footer className="w-full bg-gradient-to-b from-background to-muted/20 text-foreground">

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/" className="inline-block mb-6 group">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Walmart_spark_%282025%29.svg/120px-Walmart_spark_%282025%29.svg.png" 
                    className="w-10 h-10 transition-transform group-hover:scale-110" 
                    alt="Walmart logo" 
                  />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Walmart
                </span>
              </div>
            </Link>
            
            <p className="text-muted-foreground mb-6 text-base leading-relaxed max-w-sm">
              Save money. Live better. Your trusted marketplace for quality products at everyday low prices, 
              backed by our commitment to customer satisfaction.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <a 
                href="tel:1-800-925-6278" 
                className="flex items-center space-x-3 text-sm hover:text-primary transition-colors group"
              >
                <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <span>1-800-WALMART</span>
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              
              <a 
                href="mailto:help@walmart.com" 
                className="flex items-center space-x-3 text-sm hover:text-primary transition-colors group"
              >
                <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <span>help@walmart.com</span>
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              
              <div className="flex items-start space-x-3 text-sm">
                <div className="p-2 bg-primary/10 rounded-full mt-0.5">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span className="leading-relaxed">
                  702 SW 8th Street<br />
                  Bentonville, AR 72716
                </span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <button
                  key={social.label}
                  onClick={() => handleNavigation(social.href)}
                  className={`p-3 rounded-full bg-muted hover:text-white transition-all duration-300 transform hover:scale-110 ${social.color}`}
                  aria-label={`Follow us on ${social.label}`}
                >
                  <social.icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.title}>
                  <button
                    onClick={() => handleNavigation(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 text-left w-full"
                  >
                    {link.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.title}>
                  <button
                    onClick={() => handleNavigation(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 text-left w-full"
                  >
                    {link.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.title}>
                  <button
                    onClick={() => handleNavigation(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 text-left w-full"
                  >
                    {link.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-bold text-lg mb-4 text-foreground">Stay Connected</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Get exclusive deals, new product alerts, and special promotions delivered to your inbox.
            </p>
            
            {!isSubscribed ? (
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background/50 backdrop-blur-sm transition-all"
                    disabled={isLoading}
                  />
                  <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                
                <button
                  onClick={handleNewsletterSubmit}
                  disabled={isLoading || !email.trim()}
                  className="w-full bg-gradient-to-r from-primary to-blue-600 text-primary-foreground px-6 py-3 rounded-lg text-sm font-medium hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Subscribe</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-800">Successfully subscribed!</p>
                <p className="text-xs text-green-600 mt-1">Welcome to our community!</p>
              </div>
            )}
            
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
              By subscribing, you agree to our Privacy Policy and Terms of Service. 
              Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border/50 bg-muted/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 gap-6">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground text-center lg:text-left order-2 lg:order-1">
              <p className="mb-1">
                © {new Date().getFullYear()} Walmart Inc. All rights reserved.
              </p>
              <p className="text-xs">
                <Clock className="inline h-3 w-3 mr-1" />
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-6 order-3 lg:order-2">
              {footerLinks.legal.map((link) => (
                <button
                  key={link.title}
                  onClick={() => handleNavigation(link.href)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors whitespace-nowrap relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:-bottom-1 after:transition-all hover:after:w-full"
                >
                  {link.title}
                </button>
              ))}
            </div>

            {/* Payment Methods*/}
            <div className="order-1 lg:order-3 flex flex-col items-center lg:items-end gap-3">
              <div className="text-center lg:text-right">
                <p className="text-sm text-muted-foreground mb-3">Secure payments accepted</p>
                <div className="flex flex-wrap justify-center lg:justify-end gap-2 mb-2">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.name}
                      className="bg-white border border-border rounded-md px-3 py-2 text-xs font-bold text-gray-800 hover:shadow-md transition-shadow"
                      title={`Pay with ${method.name}`}
                    >
                      {method.logo}
                    </div>
                  ))}
                </div>
              </div>
            </div>
              <ModeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}