// import { useEffect } from 'react';
// import useAsync from '../../lib/hooks/useAsync';
import { Button } from '../ui';
import './index.css';
import { Link } from 'react-router';
import { ROUTES } from '../../lib/routes';
import { Plus } from 'lucide-react';
// import CartPlusIcon from '../CartPlusIcon';

import productCardStyles from './productCard.module.css';

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
						<Link
							to={`${ROUTES.PRODUCT}/${product.id}`}
							style={{ display: 'inline-flex', height: '100%' }}>
							<ProductCard title={product.title} image={product.image} />
						</Link>
					</li>
				);
			})}
		</ul>
	);
}

function ProductCard({ image, title }: Pick<Product, 'title' | 'image'>) {
	return (
		<div className={productCardStyles.card} style={{ height: '100%' }}>
			<img src={image} alt={'Imagen del producto'} />
			<h3>{title}</h3>
			<Button>
				<span>Añadir al carrito</span>{' '}
				<span>
					<Plus size={18} />
				</span>
			</Button>
		</div>
	);
}

export default ProductList;
