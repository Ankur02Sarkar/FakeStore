// src/components/Navbar.test.ts

import { render, fireEvent, waitFor } from '@testing-library/svelte';
import { vi, describe, it, expect } from 'vitest';
import Navbar from './Navbar.svelte'; // Ensure this path is correct
import { cart } from '$lib/store';
import { goto } from '$app/navigation';
import { setMode, resetMode } from 'mode-watcher';
import '@testing-library/jest-dom'; // Import matchers

vi.mock('$lib/store', () => ({
	cart: {
		subscribe: vi.fn((callback) => {
			callback([]);
			return vi.fn();
		})
	}
}));

vi.mock('$app/navigation', () => ({
	goto: vi.fn()
}));

vi.mock('mode-watcher', () => ({
	setMode: vi.fn(),
	resetMode: vi.fn()
}));

describe('Navbar', () => {
	it('renders correctly', () => {
		const { getByText, container } = render(Navbar);
		expect(getByText('My Store')).toBeInTheDocument();
		expect(getByText('Toggle theme')).toBeInTheDocument();
		expect(container.querySelector('.ShoppingCart')).toBeInTheDocument();
	});

	it('navigates to cart page', async () => {
		const { container } = render(Navbar);

		// Mock cart items
		cart.subscribe = vi.fn((callback) => {
			callback([{ id: 1 }, { id: 2 }]);
			return vi.fn();
		});

		// Re-render to apply the subscription mock
		render(Navbar);

		const ShoppingCart = container.querySelector('button.ShoppingCart');
		if (!ShoppingCart) {
			throw new Error('ShoppingCart button not found');
		}
		await fireEvent.click(ShoppingCart);

		expect(goto).toHaveBeenCalledWith('/cart');
	});

	it('toggles theme', async () => {
		const { getByRole, getByText } = render(Navbar);

		const toggleButton = getByRole('button', { name: 'Toggle theme' });
		await fireEvent.click(toggleButton);

		const lightMode = getByText('Light');
		const darkMode = getByText('Dark');
		const systemMode = getByText('System');

		await fireEvent.click(lightMode);
		expect(setMode).toHaveBeenCalledWith('light');

		await fireEvent.click(darkMode);
		expect(setMode).toHaveBeenCalledWith('dark');

		await fireEvent.click(systemMode);
		expect(resetMode).toHaveBeenCalled();
	});
});
