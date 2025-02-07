import { defineStore } from 'pinia';
import type { IData } from '../types/IData';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [] as IData[],
    totalPrice: 0,
  }),
  actions: {
    addItemToCart(item: IData): boolean {
      const existingItem = this.cartItems.find(i => i.id === item.id);
      if (existingItem) {
        this.removeItemFromCart(item.id);
        this.totalPrice -= item.price;
        return false;
      } else {
        this.cartItems.push(item);
        this.totalPrice += item.price;
        return true;
      }
    },
    removeItemFromCart(itemId: number, price = 0): void {
      const itemRemove = this.cartItems.filter(item => item.id !== itemId);
      if (itemRemove) {
        this.totalPrice -= price;
        this.totalPrice = Math.round(this.totalPrice * 100) / 100;
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
      }
    },

    checkIdProduct(itemId: number): boolean {
      const existingItem = this.cartItems.find(i => i.id === itemId);
      if (existingItem) {
        return true;
      }else{
        return false;
      }
    }
  },
});
