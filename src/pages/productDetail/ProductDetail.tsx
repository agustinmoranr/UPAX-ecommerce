import { useNavigate, useParams } from 'react-router';
import {
	AddProductToCartButton,
	useCart,
	RemoveProductFromCartButton,
	ProductActions,
} from '../../components/CartProvider';
import { ErrorMessage } from '../homepage/homepage';
import { ArrowLeft } from 'lucide-react';
import { ROUTES } from '../../lib/routes';
import { Button } from '../../components/ui';
import './productDetail.css';

export function ProductDetailPage() {
	const { product_id } = useParams();
	const navigate = useNavigate();

	const {
		getProductInCart,
		productsState: { getProductById, isLoading, isError },
	} = useCart();

	if (isLoading) {
		return <span style={{ fontSize: 'var(--h5)' }}>Cargando...</span>;
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
	return (
		<div>
			<main className='page-content-dimensions'>
				<button className='go-back-link' onClick={() => navigate(-1)}>
					<ArrowLeft /> Volver
				</button>
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
						{quantity === 0 && (
							<AddProductToCartButton
								className='product-cta'
								product_id={product.id}
								size='large'>
								Añadir al carrito
							</AddProductToCartButton>
						)}
						{quantity > 0 && (
							<ProductActions
								product_id={product.id}
								count={quantity}
								style={{ width: '100%', justifyContent: 'space-between' }}
							/>
						)}
						{quantity > 0 && (
							<Button
								size='large'
								className='product-cta'
								onClick={() => navigate(ROUTES.CART)}>
								Comprar Ahora
							</Button>
						)}
						{quantity > 0 && (
							<RemoveProductFromCartButton
								className='product-cta'
								product_id={product.id}
								size='large'>
								Eliminar del carrito
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
