// src/lib/store.ts
import { writable } from 'svelte/store';

const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');

export const cart = writable(storedCart);

cart.subscribe((value) => {
	localStorage.setItem('cart', JSON.stringify(value));
});
