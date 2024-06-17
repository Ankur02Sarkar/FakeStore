// src/lib/store.ts
import { writable } from 'svelte/store';

const isBrowser = typeof window !== 'undefined';

const storedCart = isBrowser ? JSON.parse(localStorage.getItem('cart') || '[]') : [];

export const cart = writable(storedCart);

if (isBrowser) {
	cart.subscribe((value) => {
		localStorage.setItem('cart', JSON.stringify(value));
	});
}
