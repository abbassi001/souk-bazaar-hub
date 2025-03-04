
export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFeatured?: boolean;
  category: string;
  seller: {
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
