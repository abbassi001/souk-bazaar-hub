
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";
import About from "./pages/About";
import ProtectedRoute from "./components/ProtectedRoute";
import SellerDashboard from "./pages/seller/Dashboard";
import AddProduct from "./pages/seller/AddProduct";
import EditProduct from "./pages/seller/EditProduct";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route 
                  path="/checkout" 
                  element={
                    <ProtectedRoute requiredRole="buyer">
                      <Checkout />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/account" 
                  element={
                    <ProtectedRoute>
                      <Account />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/seller/dashboard" 
                  element={
                    <ProtectedRoute requiredRole="seller">
                      <SellerDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/seller/add-product" 
                  element={
                    <ProtectedRoute requiredRole="seller">
                      <AddProduct />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/seller/edit-product/:id" 
                  element={
                    <ProtectedRoute requiredRole="seller">
                      <EditProduct />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/products" element={<Products />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/category/:id" element={<CategoryDetail />} />
                <Route path="/about" element={<About />} />
                
                {/* Redirect common misspellings or alternate routes */}
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="/panier" element={<Navigate to="/cart" replace />} />
                <Route path="/connexion" element={<Navigate to="/login" replace />} />
                <Route path="/compte" element={<Navigate to="/account" replace />} />
                <Route path="/produits" element={<Navigate to="/products" replace />} />
                <Route path="/categorie" element={<Navigate to="/categories" replace />} />
                <Route path="/categorie/:id" element={<Navigate to="/category/:id" replace />} />
                <Route path="/about-us" element={<Navigate to="/about" replace />} />
                <Route path="/dashboard" element={<Navigate to="/seller/dashboard" replace />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
