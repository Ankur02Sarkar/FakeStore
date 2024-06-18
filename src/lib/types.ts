// types.ts
export type DisplayedProduct = {
	id: number;
	price: number;
	image: string;
	title: string;
	description: string;
	category: string;
	rating: {
		rate: number;
		count: number;
	};
	// Add more fields as necessary
};

export type DisplayedProducts = DisplayedProduct[];
