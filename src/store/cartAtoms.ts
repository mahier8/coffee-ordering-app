import { atom } from "jotai";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number; 
};

export const cartAtom = atom<CartItem[]>([]);
