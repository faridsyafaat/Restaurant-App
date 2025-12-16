import { Menu } from './Menu';
import { Review } from './Review';

export interface RestaurantDetail {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  category: string;
  reviewCount: number;
  menuCount: number;
  priceRange: {
    min: number;
    max: number;
  };

  menus: Menu[];
  reviews: Review[];
}
