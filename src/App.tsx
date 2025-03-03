
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import About from "./pages/About";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Create a dashboard page placeholder
const Dashboard = () => (
  <div className="min-h-screen flex items-center justify-center">
    <h1 className="text-2xl font-bold">Seller Dashboard - Coming Soon</h1>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
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
                <ProtectedRoute>
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
              path="/dashboard" 
              element={
                <ProtectedRoute requiredRole="seller">
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<About />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
