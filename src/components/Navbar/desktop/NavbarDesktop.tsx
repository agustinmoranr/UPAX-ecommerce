import CategoriesFilter from '../../FilterBar/CategoriesFilter';
import SearchBar from '../../FilterBar/SearchBar';
import { User } from 'lucide-react';
import { NavLink } from 'react-router';
import { ROUTES } from '../../../lib/routes';
import { CartNavButton } from '../../CartNavButton/CartNavButton';
import './navbarDesktop.css';
import { useMediaQuery } from '../../../lib/hooks/useMediaQuery';

function NavbarDesktop() {
	const isDesktop = useMediaQuery('(min-width: 640px)');
	return (
		<header className='navbar-wrapper'>
			<nav className='navbar'>
				<div className='logo'>Logo</div>

				{isDesktop && <CategoriesFilter />}
				<div className='search-and-cart'>
					<SearchBar />
					<CartNavButton />
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
