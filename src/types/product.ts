
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  old_price?: number;
  image: string;
  rating?: number;
  reviews?: number;
  is_new?: boolean;
  is_featured?: boolean;
  category: string;
  seller_id: string;
  created_at?: string;
  updated_at?: string;
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
