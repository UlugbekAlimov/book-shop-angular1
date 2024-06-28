export interface Book {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId?: string;
  categoryName?: string; 
}
