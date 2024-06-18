// src/lib/api.ts
export async function fetchProducts() {
	const response = await fetch('https://fakestoreapi.com/products');
	if (!response.ok) {
		throw new Error('Failed to fetch products');
	}
	return await response.json();
}

export async function fetchCategories() {
	const response = await fetch('https://fakestoreapi.com/products/categories');
	if (!response.ok) {
		throw new Error('Failed to fetch categories');
	}
	return await response.json();
}

export async function fetchProductsByCategory(category: string) {
	const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
	if (!response.ok) {
		throw new Error('Failed to fetch products for category');
	}
	return await response.json();
}

export async function fetchProductById(id: number) {
	const response = await fetch(`https://fakestoreapi.com/products/${id}`);
	if (!response.ok) {
	  throw new Error('Failed to fetch product');
	}
	return await response.json();
  }
  