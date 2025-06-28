import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/components/Home";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Routes, Route } from "react-router-dom";
import Wishlist from "./components/Wishlist";
import PrivateRoute from "./components/ProtectedRoute";
import Notfound from "./components/Notfound";
import Profile from "./components/profile";
import Cart from "./components/Cart";
import Orders from "./components/OrdersPage";
import Deals from "./components/Deals";
import React from "react";
import ProductDesPage from "./components/ProductDesPage";
import CategoryPage from "./components/CategoryPage";
import SearchResults from "./components/SearchResults";

function App() {

  function Page ({ title, children } : any) {
  React.useEffect(() => {
    document.title = title;
  }, [title]);
  return children;
}


  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <Routes>
        <Route path="/" element={<Page title="Home"><Home /></Page>} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/deals" element={<Page title="Deals"><Deals/></Page>}/>
        <Route path="/orders" element={<Page title="Your orders"><PrivateRoute><Orders/></PrivateRoute></Page>}/>
        <Route path="/wishlist" element={<PrivateRoute><Wishlist/></PrivateRoute>}/>
        <Route path="/product/:id" element={<ProductDesPage/>}/>
        <Route path="/profile" element={<Page title="Profile"><PrivateRoute><Profile/></PrivateRoute></Page>} />
        <Route path="/:id/category" element={<Page title="Category"><CategoryPage/></Page>} />
        <Route path="/search" element={<Page title="Search Results"><SearchResults /></Page>} />
        <Route path="*" element={<Page title="Not found"><Notfound/> </Page>} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
} 

export default App;
