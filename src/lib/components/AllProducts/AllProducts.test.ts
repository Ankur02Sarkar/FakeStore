// src/AllProducts.test.ts

import { render, fireEvent } from '@testing-library/svelte';
import { get } from 'svelte/store';
import AllProducts from './AllProducts.svelte'; // Ensure this path is correct
import { cart } from '$lib/store';
import { toast } from 'svelte-sonner';
import { vi, describe, it, expect } from 'vitest';
import '@testing-library/jest-dom'; // Import matchers

vi.mock('svelte-sonner', () => ({
	toast: {
		success: vi.fn()
	}
}));

describe('AllProducts', () => {
	const displayedProducts = [
		{
			id: 1,
			title: 'Product 1',
			description: 'Description 1',
			image: 'image1.jpg',
			price: 10,
			category: 'Category 1',
			rating: {
				rate: 2,
				count: 12
			}
		},
		{
			id: 2,
			title: 'Product 2',
			description: 'Description 2',
			image: 'image2.jpg',
			price: 20,
			category: 'Category 2',
			rating: {
				rate: 2,
				count: 12
			}
		}
	];

	it('renders correctly in grid mode', () => {
		const { getByAltText } = render(AllProducts, {
			props: {
				displayMode: 'grid',
				displayedProducts
			}
		});

		displayedProducts.forEach((product) => {
			expect(getByAltText(product.title)).toBeInTheDocument();
		});
	});

	it('renders correctly in list mode', () => {
		const { getByText } = render(AllProducts, {
			props: {
				displayMode: 'list',
				displayedProducts
			}
		});

		displayedProducts.forEach((product) => {
			expect(getByText(product.title)).toBeInTheDocument();
			expect(getByText(`$${product.price}`)).toBeInTheDocument();
		});
	});

	it('adds product to cart and shows toast notification', async () => {
		const { container } = render(AllProducts, {
			props: {
				displayMode: 'grid',
				displayedProducts
			}
		});

		const addButton = container.querySelector('button[slot="cart"]');
		if (!addButton) {
			throw new Error('Add to cart button not found');
		}

		await fireEvent.click(addButton);

		expect(get(cart)).toContain(displayedProducts[0]);
		expect(toast.success).toHaveBeenCalledWith('Product added to cart');
	});
});
