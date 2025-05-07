import { NavLink } from 'react-router';
import { ROUTES } from '../../../lib/routes';
import { House, User } from 'lucide-react';
import './navbarMobile.css';
import { CartNavButton } from '../../CartNavButton/CartNavButton';

export function NavbarMobile() {
	return (
		<nav className='navbar-mobile'>
			<NavLink className='navbar-mobile__link' to={ROUTES.HOME}>
				<House size={20} />
				<span>Inicio</span>
			</NavLink>
			<CartNavButton className='navbar-mobile__link'>
				<span>Carrito</span>
			</CartNavButton>

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
