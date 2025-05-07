import { useEffect } from 'react';
import FiltersBar from '../../components/FilterBar/FiltersBar';
import './homepage.css';
import useAsync from '../../lib/hooks/useAsync';
// import { Button } from '../../components/ui';
import ProductList from '../../components/ProductList';

const API_ENDPOINT_BASE = 'https://fakestoreapi.com';

type Product = {
	id: string;
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

function Homepage() {
	const {
		run,
		data: products,
		error,
		isError,
		isLoading,
		isSuccess,
	} = useAsync<Product[] | null>({ data: [] });
	console.log(products, error);

	useEffect(() => {
		async function listProducts() {
			const response = await fetch(`${API_ENDPOINT_BASE}/products`);
			return response.json();
		}

		run(listProducts());
	}, [run]);

	return (
		<div>
			<FiltersBar />
			<main style={{ paddingInline: '1rem' }}>
				<h1
					style={{
						fontSize: 'var(--h4)',
						marginTop: '1rem',
						marginBottom: '3rem',
						opacity: 0.7,
					}}>
					MellowStore: Donde comprar es un placer.
				</h1>
				{isLoading && <span>Cargando productos...</span>}
				{isError && (
					<div>
						<span>
							Lo sentimos, ocurrió un error al cargar la lista de productos.
							Verifica tu conectividad a internet o inténtalo más tarde.
						</span>
						<br />
						{/* <code>{error?.message}</code> */}
					</div>
				)}
				{isSuccess && products && <ProductList products={products} />}
			</main>
		</div>
	);
}

export default Homepage;
