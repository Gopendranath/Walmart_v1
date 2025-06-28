import React, { useEffect, useState } from "react";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  Heart,
  Package,
  ChevronDown,
  MapPin,
} from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const categories = [
  {
    title: "Departments",
    items: [
      { title: "Grocery & Essentials", href: "/grocery" },
      { title: "Electronics", href: "/electronics" },
      { title: "Home", href: "/home" },
      { title: "Fashion", href: "/fashion" },
      { title: "Baby", href: "/baby" },
      { title: "Health & Wellness", href: "/health" },
      { title: "Sports & Outdoors", href: "/sports" },
      { title: "Auto & Tires", href: "/auto" },
    ],
  },
  {
    title: "Services",
    items: [
      { title: "Pharmacy", href: "/pharmacy" },
      { title: "Photo Center", href: "/photo" },
      { title: "Money Services", href: "/money" },
      { title: "Auto Care Center", href: "/auto-care" },
    ],
  },
];

export default function WalmartNavbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const cartItems = useSelector((state: any) => state.cart.cartItems);
  const cartItemCount = cartItems.reduce(
    (sum: number, item: any) => sum + (Number(item.quantity) || 1),
    0
  );
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleSearch = (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`); 
    }
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleNav = (href: string) => {
    setActiveDropdown(null);
    setIsMenuOpen(false);
    navigate(href);
  };

  // Keyboard accessibility for dropdowns
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveDropdown(null);
    };
    if (activeDropdown) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [activeDropdown]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false); // scrolling down
      } else {
        setShowNavbar(true); // scrolling up
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`w-full bg-blue-600 shadow-sm transition-transform duration-300 z-50 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        } fixed top-0 left-0`}
      >
        {/* Top Bar */}
        <div className="bg-blue-800 text-white text-xs py-1">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span>How do you want your items?</span>
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span className="underline cursor-pointer">
                  Add an address for shipping and delivery
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="cursor-pointer hover:underline">English</span>
              <span className="cursor-pointer hover:underline">$ USD</span>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-6">
              <Link to="/">
              <div className="flex items-center space-x-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Walmart_spark_%282025%29.svg/120px-Walmart_spark_%282025%29.svg.png" className="w-8 h-8" alt="walmart logo" />
                
                <span className="text-2xl font-bold text-white">Walmart</span>
              </div>
              </Link>

              {/* Desktop Departments Dropdown */}
              <div className="hidden lg:block relative">
                <button
                  onClick={() => toggleDropdown("departments")}
                  className={`flex items-center space-x-1 px-4 py-2 text-white rounded transition-colors ${
                    activeDropdown === "departments"
                      ? "bg-blue-700"
                      : "hover:bg-blue-700"
                  }`}
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === "departments"}
                >
                  <Menu className="h-4 w-4" />
                  <span>Departments</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {activeDropdown === "departments" && (
                  <div className="absolute top-full left-0 mt-1 w-96 bg-white border border-blue-600 rounded-lg shadow-lg z-50">
                    <div className="grid grid-cols-2 gap-4 p-6">
                      {categories[0].items.map((item) => (
                        <button
                          key={item.title}
                          className="text-left p-2 rounded transition-colors text-blue-900 hover:bg-blue-100 hover:text-blue-700 focus:bg-blue-100 focus:text-blue-700"
                          onClick={() => handleNav(item.href)}
                          tabIndex={0}
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop Services Dropdown */}
              <div className="hidden lg:block relative">
                <button
                  onClick={() => toggleDropdown("services")}
                  className={`flex items-center space-x-1 px-4 py-2 text-white rounded transition-colors ${
                    activeDropdown === "services"
                      ? "bg-blue-700"
                      : "hover:bg-blue-700"
                  }`}
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === "services"}
                >
                  <span>Services</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {activeDropdown === "services" && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-blue-600 rounded-lg shadow-lg z-50">
                    <div className="p-4 space-y-2">
                      {categories[1].items.map((item) => (
                        <button
                          key={item.title}
                          className="block w-full text-left p-2 rounded transition-colors text-blue-900 hover:bg-blue-100 hover:text-blue-700 focus:bg-blue-100 focus:text-blue-700"
                          onClick={() => handleNav(item.href)}
                          tabIndex={0}
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search everything at Walmart online and in store"
                  className="w-full pl-4 pr-12 py-3 border-2 border-gray-300 rounded-full focus:border-blue-500 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                  aria-label="Search"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 p-2 rounded-full transition-colors"
                  aria-label="Search Button"
                >
                  <Search className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Reorder */}
              <button
                className="hidden md:flex flex-col items-center space-y-1 text-white hover:text-yellow-300 transition-colors"
                onClick={() => handleNav("/orders")}
              >
                <Package className="h-6 w-6" />
                <span className="text-xs">Reorder</span>
              </button>

              {/* My Items */}
              <button
                className="hidden md:flex flex-col items-center space-y-1 text-white hover:text-yellow-300 transition-colors"
                onClick={() => handleNav("/wishlist")}
              >
                <Heart className="h-6 w-6" />
                <span className="text-xs">My Items</span>
              </button>

              {/* Account */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("account")}
                  className={`flex flex-col items-center space-y-1 text-white rounded transition-colors ${activeDropdown === "account" ? "bg-blue-700" : "hover:text-yellow-300"}`}
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === "account"}
                >
                  <User className="h-6 w-6" />
                  <span className="text-xs ">{isAuthenticated ? `${user?.name}`.split(" ")[0] : "Account"}</span>
                </button>

                {activeDropdown === "account" && (
                  <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-blue-600 rounded-lg shadow-lg z-50">
                    <div className="p-4 space-y-2">
                      {!isAuthenticated ? (
                        <>
                          <button
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                            onClick={() => loginWithRedirect()}
                          >
                            Sign In
                          </button>
                          <button
                            className="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded hover:bg-blue-50 transition-colors"
                            onClick={() => loginWithRedirect()}
                          >
                            Create Account
                          </button>
                          <hr className="my-2" />
                        </>
                      ) : (
                        <>
                          <button
                            className="block w-full text-left p-2 rounded transition-colors text-blue-900 hover:bg-blue-100 hover:text-blue-700 focus:bg-blue-100 focus:text-blue-700"
                            onClick={() => handleNav("/profile")}
                          >
                            My Account
                          </button>
                          <button
                            className="block w-full text-left p-2 rounded transition-colors text-blue-900 hover:bg-blue-100 hover:text-blue-700 focus:bg-blue-100 focus:text-blue-700"
                            onClick={() =>
                              logout({
                                logoutParams: {
                                  returnTo: window.location.origin,
                                },
                              })
                            }
                          >
                            Logout
                          </button>
                          <hr className="my-2" />
                        </>
                      )}
                      <button
                        className="block w-full text-left p-2 rounded transition-colors text-blue-900 hover:bg-blue-100 hover:text-blue-700 focus:bg-blue-100 focus:text-blue-700"
                        onClick={() => handleNav("/orders")}
                      >
                        Purchase History
                      </button>
                      <button
                        className="block w-full text-left p-2 rounded transition-colors text-blue-900 hover:bg-blue-100 hover:text-blue-700 focus:bg-blue-100 focus:text-blue-700"
                        onClick={() => handleNav("/walmart-plus")}
                      >
                        Walmart+
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart */}
              <button
                className="flex flex-col items-center space-y-1 text-white hover:text-yellow-300 transition-colors relative"
                onClick={() => handleNav("/cart")}
                aria-label="Cart"
              >
                <div className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </div>
                <span className="text-xs">$0.00</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-white hover:text-yellow-300"
                aria-label="Open Mobile Menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-blue-700 border-t border-blue-800">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Departments</h4>
                <div className="grid grid-cols-2 gap-2 pl-4">
                  {categories[0].items.map((item) => (
                    <button
                      key={item.title}
                      className="text-left text-sm text-blue-100 hover:text-yellow-300 py-1"
                      onClick={() => handleNav(item.href)}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Services</h4>
                <div className="pl-4 space-y-1">
                  {categories[1].items.map((item) => (
                    <button
                      key={item.title}
                      className="block text-left text-sm text-blue-100 hover:text-yellow-300 py-1"
                      onClick={() => handleNav(item.href)}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-blue-600">
                {!isAuthenticated ? (
                  <button
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                    onClick={() => loginWithRedirect()}
                  >
                    Sign In
                  </button>
                ) : (
                  <button
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                    onClick={() => handleNav("/profile")}
                  >
                    My Account
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Overlay for dropdowns */}
        {activeDropdown && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setActiveDropdown(null)}
            aria-label="Close Dropdown Overlay"
          />
        )}
      </header>
      <div className="h-[112px] lg:h-[112px] w-full" />
      {/* 112px = 32px (top bar) + 80px (main navbar) adjust if needed */}
    </>
  );
}
