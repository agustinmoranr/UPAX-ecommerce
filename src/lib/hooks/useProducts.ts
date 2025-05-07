import { useEffect, useState, type Dispatch } from 'react';
import useAsync, { type AsyncOutput } from './useAsync';

export type Product = {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
};

export type Categories = 'electronics' | 'clothing' | 'jewelery';

const API_ENDPOINT_BASE = 'https://fakestoreapi.com';

export interface useProductsOutput extends AsyncOutput<Product[]> {
	filteredProducts: Product[];
	setFilteredProducts: Dispatch<React.SetStateAction<Product[]>>;
	filterByCategory: (categoryMatch: Categories) => void;
	clearFiltering: () => void;
	getProductById: (product_id: Product['id']) => Product | null;
}

export function useProducts(): useProductsOutput {
	const productsState = useAsync<Product[]>({ data: [] });
	const { run } = productsState;
	const [filteredProducts, setFilteredProducts] = useState<Product[]>(
		productsState.data ?? [],
	);
	function filterByCategory(categoryMatch: Categories) {
		const filteredProducts = productsState.data?.filter(({ category }) =>
			category.includes(categoryMatch),
		);
		setFilteredProducts(filteredProducts ?? []);
	}
	function clearFiltering() {
		setFilteredProducts([]);
	}
	function getProductById(product_id: Product['id']) {
		return productsState.data?.find(({ id }) => id === product_id) ?? null;
	}

	useEffect(() => {
		async function listProducts() {
			const response = await fetch(`${API_ENDPOINT_BASE}/products`);
			return response.json();
		}

		run(listProducts());
	}, [run]);

	return {
		filteredProducts,
		setFilteredProducts,
		filterByCategory,
		clearFiltering,
		getProductById,
		...productsState,
	};
}

export default useProducts;
