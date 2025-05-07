// import { useEffect } from 'react';
// import useAsync from '../../lib/hooks/useAsync';
import { Button } from '../ui';
import './index.css';

import { Plus, Trash } from 'lucide-react';
// import CartPlusIcon from '../CartPlusIcon';

import productCardStyles from './productCard.module.css';
import {
	AddProductToCartButton,
	RemoveProductFromCartButton,
	useCart,
} from '../CartProvider';

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

export function ProductList({ products }: { products: Product[] | null }) {
	return (
		<ul className='products-list'>
			{products?.map((product) => {
				return (
					<li key={product.id} className='product-item'>
						{/* <Link
							to={`${ROUTES.PRODUCT}/${product.id}`}
							style={{ display: 'inline-flex', height: '100%' }}> */}
						<ProductCard
							product_id={product.id}
							title={product.title}
							image={product.image}
						/>
						{/* </Link> */}
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
}: Pick<Product, 'title' | 'image'> & { product_id: Product['id'] }) {
	const { cart } = useCart();
	const isProductInCart = cart.findIndex(({ id }) => id === product_id) === -1;

	return (
		<div className={productCardStyles.card} style={{ height: '100%' }}>
			<img src={image} alt={'Imagen del producto'} />
			<h3>{title}</h3>
			{isProductInCart ? (
				<AddProductToCartButton product_id={product_id}>
					<span>Añadir al carrito</span>{' '}
					<span>
						<Plus size={18} />
					</span>
				</AddProductToCartButton>
			) : (
				<RemoveProductFromCartButton product_id={product_id}>
					<span>Quitar del carrito</span>{' '}
					<span>
						<Trash size={18} />
					</span>
				</RemoveProductFromCartButton>
			)}
		</div>
	);
}

export default ProductList;

<Button></Button>;
