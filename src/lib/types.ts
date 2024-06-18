// types.ts
export type DisplayedProduct = {
	id: number;
	name: string;
	price: number;
	image: string;
	title: string;
	// Add more fields as necessary
};

export type DisplayedProducts = DisplayedProduct[];
