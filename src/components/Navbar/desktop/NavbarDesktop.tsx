import CategoriesFilter from '../../FilterBar/CategoriesFilter';
import SearchBar from '../../FilterBar/SearchBar';
import { ShoppingCart, User } from 'lucide-react';
import { NavLink } from 'react-router';
import { ROUTES } from '../../../lib/routes';
import './navbarDesktop.css';

function NavbarDesktop() {
	return (
		<header className='navbar-wrapper'>
			<nav className='navbar'>
				<div className='logo'>Logo</div>
				<CategoriesFilter />
				<div className='search-and-cart'>
					<SearchBar />
					<NavLink to={ROUTES.CART}>
						<ShoppingCart />
					</NavLink>
					<NavLink to={ROUTES.ACCOUNT}>
						<User />
					</NavLink>
				</div>
			</nav>
			<div></div>
		</header>
	);
}

export default NavbarDesktop;
