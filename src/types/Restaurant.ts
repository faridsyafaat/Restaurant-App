export interface Restaurant {
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
}

export interface RestaurantResponse {
  restaurants: Restaurant[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type RestaurantFilters = {
  page: number;
  limit: number;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
};
