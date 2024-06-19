// src/components/Cart.test.ts

import { render, fireEvent, waitFor } from '@testing-library/svelte';
import { vi, describe, it, expect } from 'vitest';
import Cart from './+page.svelte'; // Ensure this path is correct
import { cart } from '$lib/store';
import { toast } from 'svelte-sonner';
import '@testing-library/jest-dom'; // Import matchers

vi.mock('svelte-sonner', () => ({
	toast: {
		success: vi.fn()
	}
}));

describe('Cart', () => {
	it('renders correctly with an empty cart', () => {
		cart.set([]);
		const { getByText } = render(Cart);
		expect(getByText('Your cart is empty.')).toBeInTheDocument();
	});

	it('renders correctly with items in the cart', () => {
		const mockItems = [
			{ id: 1, title: 'Product 1', price: 10, image: 'image1.jpg', quantity: 1 },
			{ id: 2, title: 'Product 2', price: 20, image: 'image2.jpg', quantity: 2 }
		];
		cart.set(mockItems);

		const { getByText, getAllByText } = render(Cart);

		expect(getByText('Product 1')).toBeInTheDocument();
		expect(getByText('Product 2')).toBeInTheDocument();
		expect(getAllByText('$10')).toHaveLength(1);
		expect(getAllByText('$20')).toHaveLength(1);
	});

	it('removes an item from the cart', async () => {
		const mockItems = [{ id: 1, title: 'Product 1', price: 10, image: 'image1.jpg', quantity: 1 }];
		cart.set(mockItems);

		const { getByText, getByRole, queryByText } = render(Cart);

		const removeButton = getByRole('button', { name: /remove/i });
		await fireEvent.click(removeButton);

		await waitFor(() => {
			expect(queryByText('Product 1')).not.toBeInTheDocument();
			expect(toast.success).toHaveBeenCalledWith('Product removed from cart');
		});
	});

	it('increases the quantity of an item', async () => {
		const mockItems = [{ id: 1, title: 'Product 1', price: 10, image: 'image1.jpg', quantity: 1 }];
		cart.set(mockItems);

		const { getByText, getByRole } = render(Cart);

		const increaseButton = getByRole('button', { name: '+' });
		await fireEvent.click(increaseButton);

		await waitFor(() => {
			expect(getByText('2')).toBeInTheDocument();
		});
	});

	it('decreases the quantity of an item', async () => {
		const mockItems = [{ id: 1, title: 'Product 1', price: 10, image: 'image1.jpg', quantity: 2 }];
		cart.set(mockItems);

		const { getByText, getByRole } = render(Cart);

		const decreaseButton = getByRole('button', { name: '-' });
		await fireEvent.click(decreaseButton);

		await waitFor(() => {
			expect(getByText('1')).toBeInTheDocument();
		});
	});

	it('does not decrease quantity below 1', async () => {
		const mockItems = [{ id: 1, title: 'Product 1', price: 10, image: 'image1.jpg', quantity: 1 }];
		cart.set(mockItems);

		const { getByText, getByRole } = render(Cart);

		const decreaseButton = getByRole('button', { name: '-' });
		await fireEvent.click(decreaseButton);

		await waitFor(() => {
			expect(getByText('1')).toBeInTheDocument(); // Quantity should remain 1
		});
	});
});
