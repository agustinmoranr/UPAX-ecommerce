import { Outlet } from 'react-router';
import { NavbarMobile } from '../Navbar/mobile/NavbarMobile';
import './layout.css';
import NavbarDesktop from '../Navbar/desktop/NavbarDesktop';
import CartProvider from '../CartProvider';

function Layout() {
	return (
		<div>
			<CartProvider>
				<NavbarDesktop />
				<Outlet />
				<NavbarMobile />
			</CartProvider>
			{/* <footer>esto es el footer</footer> */}
		</div>
	);
}

export default Layout;
