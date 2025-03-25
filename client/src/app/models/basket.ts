export type Basket = {
  id: number;
  basketId: string;
  items: Item[];
};

export type Item = {
  productId: number;
  name: string;
  price: number;
  pictureUrl: string;
  brand: string;
  type: string;
  quantity: number;
};
