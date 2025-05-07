import {
	ProductActions,
	RemoveProductFromCartButton,
	useCart,
} from '../../components/CartProvider';
import { ROUTES } from '../../lib/routes';
import { Button, Link } from '../../components/ui';
import { ArrowLeft, Trash } from 'lucide-react';
import type { Product } from '../../lib/hooks/useProducts';
import confetti from 'canvas-confetti';
import './myCartPage.css';

type ProductWithQuantity = Product & { quantity: number };

function deduplicateWithQuantity(products: Product[]): ProductWithQuantity[] {
	const map = new Map<number, ProductWithQuantity>();

	for (const product of products) {
		if (map.has(product.id)) {
			map.get(product.id)!.quantity += 1;
		} else {
			map.set(product.id, { ...product, quantity: 1 });
		}
	}

	return Array.from(map.values());
}

function MyCartPage() {
	const { cart, totalProducts } = useCart();
	const total = cart.reduce((acc, { price }) => acc + price, 0).toFixed(2);
	const deduplicatedProducts = deduplicateWithQuantity(cart);

	return (
		<div>
			<main className='page-content-dimensions'>
				<Link className='go-back-link' to={ROUTES.HOME}>
					<ArrowLeft /> Volver
				</Link>
				<h1>Mi Carrito</h1>
				{totalProducts === 0 && (
					<p>
						Tu carrito esta vacío. Aún no has añadido ningún producto para
						comprar.
					</p>
				)}
				{totalProducts > 0 && (
					<p>Bienvenido, estos son los productos que deseas comprar.</p>
				)}
				<div className='cart-glossary'>
					<ul className='cart-list'>
						{deduplicatedProducts.map((product) => (
							<li key={product.id}>
								<Link
									className='cart-item'
									to={`${ROUTES.PRODUCT}/${product.id}`}>
									<img
										className='product-image'
										src={product.image}
										alt='Imagen referencial del producto'
									/>
									<div className='product-details'>
										<h1 className='product-title'>{product.title}</h1>
										<span className='product-rating'>
											Calificación: {product.rating.rate}/5
										</span>
										{/* <p className='product-description'>{product.description}</p> */}
										<strong className='product-price'>
											{product.price}$ MXN
										</strong>

										<div className='product-actions-wrapper'>
											<ProductActions
												product_id={product.id}
												count={product.quantity}
											/>
											<RemoveProductFromCartButton
												className='delete-all-product'
												product_id={product.id}>
												<span>Eliminar</span>{' '}
												<span>
													<Trash size={18} />
												</span>
											</RemoveProductFromCartButton>
										</div>
									</div>
								</Link>
							</li>
						))}
					</ul>
					{totalProducts > 0 && (
						<strong className='product-total-price'>
							Total{' '}
							{`${totalProducts} ${
								totalProducts > 1 ? 'productos' : 'producto'
							}`}{' '}
							{total}$ MXN
						</strong>
					)}

					{totalProducts > 0 && (
						<Button
							size='large'
							style={{ width: 'calc(100% - 12%)', marginTop: '1rem' }}
							onClick={() => {
								confetti({
									particleCount: 100,
									spread: 70,
									origin: { y: 0.8 },
								});
							}}>
							Finalizar Compra
						</Button>
					)}
				</div>
			</main>
		</div>
	);
}

export default MyCartPage;
