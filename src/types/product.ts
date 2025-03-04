
export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating?: number; // Maintenant optionnel
  reviews?: number; // Maintenant optionnel
  isNew?: boolean;
  isFeatured?: boolean;
  category: string;
  seller?: { // Maintenant optionnel
    name: string;
    location: string;
    isVerified: boolean;
  };
}

export type CategoryName = 'home-decor' | 'textiles' | 'jewelry' | 'ceramics' | 'spices' | 'leather' | 'furniture' | 'lighting';

export const categoryNames: Record<string, string> = {
  'home-decor': 'Décoration Maison',
  'textiles': 'Textiles',
  'jewelry': 'Bijoux',
  'ceramics': 'Céramiques',
  'spices': 'Épices',
  'leather': 'Articles en Cuir',
  'furniture': 'Mobilier',
  'lighting': 'Éclairage'
};
