
import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  Star, 
  BarChart2 
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Placeholder component for statistics section
const SellerStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
    averageRating: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      
      // Fetch total products count
      const { count: productsCount, error: productsError } = await supabase
        .from('products')
        .select('id', { count: 'exact', head: true })
        .eq('seller_id', user?.id);
      
      if (productsError) throw productsError;
      
      // In a real app, you'd fetch actual sales data
      // For now we'll use placeholder data
      
      setStats({
        totalProducts: productsCount || 0,
        totalSales: 0, // Placeholder
        totalRevenue: 0, // Placeholder
        averageRating: 0 // Placeholder
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="w-10 h-10 border-t-4 border-souk-700 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Produits" 
          value={stats.totalProducts.toString()}
          icon={<ShoppingBag className="h-5 w-5 text-souk-600" />}
        />
        <StatCard 
          title="Ventes" 
          value={stats.totalSales.toString()}
          subtitle="Cette semaine"
          icon={<TrendingUp className="h-5 w-5 text-souk-600" />}
        />
        <StatCard 
          title="Revenus" 
          value={`${stats.totalRevenue.toFixed(2)} MAD`}
          subtitle="Ce mois-ci"
          icon={<DollarSign className="h-5 w-5 text-souk-600" />}
        />
        <StatCard 
          title="Évaluation" 
          value={stats.averageRating.toFixed(1)}
          subtitle="Sur 5 étoiles"
          icon={<Star className="h-5 w-5 text-souk-600" />}
        />
      </div>
      
      <div className="p-12 text-center border border-dashed border-souk-300 rounded-lg">
        <BarChart2 className="mx-auto h-12 w-12 text-souk-400 mb-4" />
        <h3 className="text-lg font-medium text-souk-800 mb-2">
          Graphiques détaillés à venir
        </h3>
        <p className="text-souk-600">
          Des graphiques détaillés sur vos ventes et performances seront disponibles prochainement.
        </p>
      </div>
    </div>
  );
};

const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon 
}: { 
  title: string; 
  value: string; 
  subtitle?: string; 
  icon: React.ReactNode;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-souk-600">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-souk-900">{value}</div>
      {subtitle && <p className="text-xs text-souk-500 mt-1">{subtitle}</p>}
    </CardContent>
  </Card>
);

export default SellerStats;
