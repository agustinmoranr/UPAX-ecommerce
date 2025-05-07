import { Link } from '../ui';

import { Plus, SquareArrowOutUpRight } from 'lucide-react';

import productCardStyles from './productCard.module.css';
import {
	AddProductToCartButton,
	ProductActions,
	useCart,
} from '../CartProvider';
import { ROUTES } from '../../lib/routes';

import './index.css';
import type { Product } from '../../lib/hooks/useProducts';

export function ProductList({ products }: { products: Product[] | null }) {
	return (
		<ul className='products-list'>
			{products?.map((product) => {
				return (
					<li key={product.id} className='product-item'>
						<ProductCard
							product_id={product.id}
							title={product.title}
							image={product.image}
						/>
					</li>
				);
			})}
		</ul>
	);
}

function ProductCard({
	product_id,
	image,
	title,
}: Pick<Product, 'title' | 'image'> & {
	product_id: Product['id'];
}) {
	const { cart } = useCart();
	const isProductInCart = cart.findIndex(({ id }) => id === product_id) === -1;
	const quantity = cart.filter(({ id }) => id === product_id).length;
	return (
		<div className={productCardStyles.card} style={{ height: '100%' }}>
			<Link
				className={productCardStyles['card__link-wrapper']}
				to={`${ROUTES.PRODUCT}/${product_id}`}>
				<img src={image} alt={'Imagen del producto'} />
				<h3>{title}</h3>
			</Link>
			<Link
				className={productCardStyles['card__nav-detail']}
				to={`${ROUTES.PRODUCT}/${product_id}`}>
				<span className={productCardStyles['card__nav-detail-content']}>
					Ver detalle del producto{' '}
					<SquareArrowOutUpRight style={{ marginLeft: '0.25rem' }} />
				</span>
			</Link>
			{!isProductInCart && (
				<ProductActions
					product_id={product_id}
					count={quantity}
					style={{ width: '100%', justifyContent: 'space-between' }}
				/>
			)}
			{isProductInCart && (
				<AddProductToCartButton product_id={product_id}>
					<span>Añadir al carrito</span>{' '}
					<span>
						<Plus size={18} />
					</span>
				</AddProductToCartButton>
			)}
		</div>
	);
}

export default ProductList;
