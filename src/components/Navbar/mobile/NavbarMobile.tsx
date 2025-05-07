import { NavLink } from 'react-router';
import { ROUTES } from '../../../lib/routes';
import { House, User, ShoppingCart } from 'lucide-react';
import './navbarMobile.css';

export function NavbarMobile() {
	return (
		<nav className='navbar-mobile'>
			<NavLink className='navbar-mobile__link' to={ROUTES.HOME}>
				<House size={20} />
				<span>Inicio</span>
			</NavLink>
			<NavLink className='navbar-mobile__link' to={ROUTES.CART}>
				<ShoppingCart size={20} />
				<span>Carrito</span>
			</NavLink>
			<NavLink className='navbar-mobile__link' to={ROUTES.ACCOUNT}>
				<User size={20} />
				<span>Cuenta</span>
			</NavLink>
			{/* <Button className='navbar-mobile__link'>
				<Menu size={20} />
				<span>Menú</span>
			</Button> */}
		</nav>
	);
}
