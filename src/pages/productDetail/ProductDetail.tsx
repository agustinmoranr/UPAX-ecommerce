import { useParams } from 'react-router';
import {
	AddProductToCartButton,
	useCart,
	RemoveProductFromCartButton,
} from '../../components/CartProvider';

import './productDetail.css';
import { ErrorMessage } from '../homepage/homepage';
import { ArrowLeft } from 'lucide-react';
import { Link } from '../../components/ui';
import { ROUTES } from '../../lib/routes';

export function ProductDetailPage() {
	const { product_id } = useParams();
	const {
		getProductInCart,
		productsState: { getProductById, data, isLoading, isError },
	} = useCart();

	if (isLoading) {
		return <span>Cargando...</span>;
	}

	if (isError) {
		return <ErrorMessage />;
	}

	const product = getProductById(Number(product_id));

	if (!product) {
		return (
			<div>¿Estás perdido? El producto que intentas buscar no existe.</div>
		);
	}
	const { quantity } = getProductInCart(product.id);
	console.log(data, product);
	return (
		<div>
			<main className='page-content-dimensions'>
				<Link className='go-back-link' to={ROUTES.HOME}>
					<ArrowLeft /> Volver
				</Link>
				<div className='product-detail-page'>
					<img
						className='product-hero-image'
						src={product.image}
						alt='Imagen del producto'
					/>
					<div className='product-details'>
						<h1 className='product-title'>{product.title}</h1>
						<span className='product-rating'>
							Calificación: {product.rating.rate}/5
						</span>
						<p className='product-description'>{product.description}</p>
						<strong className='product-price'>{product.price}$ MXN</strong>
						<AddProductToCartButton
							className='product-cta'
							product_id={product.id}
							size='large'>
							Añadir al carrito
						</AddProductToCartButton>
						{quantity > 0 && (
							<RemoveProductFromCartButton
								className='product-cta'
								product_id={product.id}
								size='large'>
								{quantity > 1
									? 'Eliminar 1 del carrito'
									: 'Eliminar del carrito'}
							</RemoveProductFromCartButton>
						)}
						{quantity > 1 && (
							<span>
								Haz añadido {quantity} veces este artículo a tu carrito{' '}
							</span>
						)}
					</div>
				</div>
			</main>
		</div>
	);
}

export default ProductDetailPage;
