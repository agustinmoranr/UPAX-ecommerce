import FiltersBar from '../../components/FilterBar/FiltersBar';
import './homepage.css';
import ProductList from '../../components/ProductList';
import { useCart } from '../../components/CartProvider';

function Homepage() {
	const { productsState } = useCart();
	const {
		data: products,
		filteredProducts,
		isLoading,
		isError,
		isSuccess,
	} = productsState;
	const _products =
		filteredProducts.length > 0 ? filteredProducts : products ?? [];
	return (
		<div>
			<FiltersBar />
			<main className='page-content-dimensions'>
				<h1 className='homepage__title'>
					MellowStore: Donde comprar es un placer.
				</h1>
				{isLoading && <span>Cargando productos...</span>}
				{isError && <ErrorMessage />}
				{isSuccess && products && <ProductList products={_products} />}
			</main>
		</div>
	);
}

export default Homepage;

export function ErrorMessage() {
	return (
		<div>
			<span>
				Lo sentimos, ocurrió un error al cargar la lista de productos. Verifica
				tu conectividad a internet o inténtalo más tarde.
			</span>
			<br />
			{/* <code>{error?.message}</code> */}
		</div>
	);
}
