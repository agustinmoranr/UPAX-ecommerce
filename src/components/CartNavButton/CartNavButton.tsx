import type { PropsWithChildren } from 'react';
import { useCart } from '../CartProvider';
import { NavLink } from 'react-router';
import { ShoppingCart } from 'lucide-react';
import { ROUTES } from '../../lib/routes';

import './cartNavButton.css';

export function CartNavButton({
	className,
	children,
}: PropsWithChildren<{ className?: string }>) {
	const { totalProducts } = useCart();

	return (
		<NavLink className={`cart-nav-button ${className}`} to={ROUTES.CART}>
			<ShoppingCart />
			{totalProducts > 0 && (
				<span className='cart-nav-button__icon'>{totalProducts}</span>
			)}
			{children}
		</NavLink>
	);
}
