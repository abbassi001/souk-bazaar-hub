
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { categoryNames } from '@/types/product';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const AddProduct = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    old_price: '',
    category: '',
    is_new: false,
    is_featured: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Fichier trop volumineux",
        description: "L'image ne doit pas dépasser 5 Mo.",
        variant: "destructive",
      });
      return;
    }
    
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setUploadProgress(0);
  };

  const validateForm = () => {
    if (!formData.name) {
      toast({
        title: "Champ requis",
        description: "Veuillez entrer un nom pour le produit.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      toast({
        title: "Prix invalide",
        description: "Veuillez entrer un prix valide supérieur à 0.",
        variant: "destructive",
      });
      return false;
    }
    
    if (formData.old_price && (isNaN(parseFloat(formData.old_price)) || parseFloat(formData.old_price) <= 0)) {
      toast({
        title: "Ancien prix invalide",
        description: "L'ancien prix doit être un nombre valide supérieur à 0.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!formData.category) {
      toast({
        title: "Champ requis",
        description: "Veuillez sélectionner une catégorie.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Non connecté",
        description: "Vous devez être connecté pour ajouter un produit.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      
      // Upload image if exists
      let imageUrl = null;
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `products/${fileName}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, imageFile);
        
        if (uploadError) throw uploadError;
        
        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);
          
        imageUrl = publicUrlData.publicUrl;
      }
      
      // Create product in the database
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        old_price: formData.old_price ? parseFloat(formData.old_price) : null,
        category: formData.category,
        image: imageUrl,
        is_new: formData.is_new,
        is_featured: formData.is_featured,
        seller_id: user.id
      };
      
      const { data, error } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single();
      
      if (error) throw error;
      
      toast({
        title: "Produit ajouté",
        description: "Votre produit a été ajouté avec succès.",
      });
      
      // Redirect to the dashboard
      navigate('/seller/dashboard');
      
    } catch (error: any) {
      console.error('Error adding product:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'ajout du produit.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-28 pb-12">
        <Button 
          variant="ghost" 
          className="mb-6 text-souk-700" 
          onClick={() => navigate('/seller/dashboard')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au tableau de bord
        </Button>
        
        <h1 className="text-3xl font-bold text-souk-900 mb-6">Ajouter un produit</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-souk-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product name */}
            <div>
              <Label htmlFor="name">Nom du produit*</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1"
                placeholder="Entrez le nom du produit"
              />
            </div>
            
            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 h-32"
                placeholder="Décrivez votre produit en détail"
              />
            </div>
            
            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="price">Prix (MAD)*</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="old_price">Ancien prix (MAD)</Label>
                <Input
                  id="old_price"
                  name="old_price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.old_price}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            {/* Category */}
            <div>
              <Label htmlFor="category">Catégorie*</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleSelectChange('category', value)}
              >
                <SelectTrigger id="category" className="w-full mt-1">
                  <SelectValue placeholder="Sélectionnez une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categoryNames).map(([key, value]) => (
                    <SelectItem key={key} value={key}>{value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Image upload */}
            <div>
              <Label htmlFor="image">Image du produit</Label>
              <div className="mt-1">
                {imagePreview ? (
                  <div className="relative w-full max-w-md">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="rounded-md border border-souk-200 object-cover h-48 w-full"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center text-sm py-1">
                        Téléchargement: {uploadProgress}%
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-souk-300 rounded-md cursor-pointer bg-souk-50 hover:bg-souk-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-souk-500 mb-2" />
                        <p className="mb-2 text-sm text-souk-700">
                          <span className="font-medium">Cliquez pour télécharger</span> ou glissez-déposez
                        </p>
                        <p className="text-xs text-souk-500">
                          PNG, JPG, GIF jusqu'à 5MB
                        </p>
                      </div>
                      <input
                        id="image"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
            
            {/* Options */}
            <div className="space-y-3">
              <Label>Options du produit</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_new"
                  checked={formData.is_new}
                  onCheckedChange={(checked) => handleSwitchChange('is_new', checked)}
                />
                <Label htmlFor="is_new">Marquer comme "Nouveau"</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => handleSwitchChange('is_featured', checked)}
                />
                <Label htmlFor="is_featured">Mettre en avant</Label>
              </div>
            </div>
            
            {/* Submit button */}
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full sm:w-auto" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Création en cours...' : 'Créer le produit'}
              </Button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddProduct;
