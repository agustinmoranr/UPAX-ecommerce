import CategoriesFilter from '../../FilterBar/CategoriesFilter';
import SearchBar from '../../FilterBar/SearchBar';
import { User } from 'lucide-react';
import { NavLink, useLocation } from 'react-router';
import { ROUTES } from '../../../lib/routes';
import { CartNavButton } from '../../CartNavButton/CartNavButton';
import './navbarDesktop.css';
import { useMediaQuery } from '../../../lib/hooks/useMediaQuery';

function NavbarDesktop() {
	const isDesktop = useMediaQuery('(min-width: 1200px)');
	const location = useLocation();
	const isHome = location.pathname === ROUTES.HOME;
	return (
		<header className='navbar-wrapper'>
			<nav className='navbar'>
				<NavLink to={ROUTES.HOME} className='logo' style={{ color: 'inherit' }}>
					<div style={{ fontSize: 'var(--h5)' }}>MellowStore</div>
				</NavLink>

				{isDesktop && isHome && (
					<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
						<span>Filtrar por categoría:</span>
						<CategoriesFilter />
					</div>
				)}
				<div className='search-and-cart'>
					<SearchBar />
					<CartNavButton>
						<span style={{ marginLeft: '0.5rem', whiteSpace: 'pre' }}>
							Mi carrito
						</span>
					</CartNavButton>
					<NavLink to={ROUTES.ACCOUNT}>
						<User />
						<span style={{ marginLeft: '0.5rem', whiteSpace: 'pre' }}>
							Mi cuenta
						</span>
					</NavLink>
				</div>
			</nav>
			<div></div>
		</header>
	);
}

export default NavbarDesktop;
