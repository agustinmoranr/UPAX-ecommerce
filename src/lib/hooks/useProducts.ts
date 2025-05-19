import { useEffect, useState, type Dispatch } from 'react';
import useAsync, { type AsyncOutput } from './useAsync';

export type Product = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	stock: number;
	rating: {
		rate: number;
		count: number;
	};
};

export type Categories = 'electronics' | 'clothing' | 'jewelery';
export type ProductsData = { products: Product[]; totalCount: number };

const API_URL = import.meta.env.VITE_API_URL;

export interface useProductsOutput extends AsyncOutput<ProductsData> {
	filteredProducts: Product[];
	setFilteredProducts: Dispatch<React.SetStateAction<Product[]>>;
	filterByCategory: (categoryMatch: Categories) => void;
	clearFiltering: () => void;
	getProductById: (product_id: Product['id']) => Product | null;
}

export function useProducts(): useProductsOutput {
	const productsState = useAsync<ProductsData>({
		data: { products: [], totalCount: 0 },
	});
	const { run } = productsState;
	const products = productsState.data?.products;
	const [filteredProducts, setFilteredProducts] = useState<Product[]>(
		products ?? [],
	);
	function filterByCategory(categoryMatch: Categories) {
		const filteredProducts = products?.filter(({ category }) =>
			category.includes(categoryMatch),
		);
		setFilteredProducts(filteredProducts ?? []);
	}
	function clearFiltering() {
		setFilteredProducts([]);
	}
	function getProductById(product_id: Product['id']) {
		return products?.find(({ id }) => id === product_id) ?? null;
	}

	useEffect(() => {
		async function listProducts() {
			const response = await fetch(`${API_URL}/products`);
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
