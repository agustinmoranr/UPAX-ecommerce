import { Outlet } from 'react-router';
import { NavbarMobile } from '../Navbar/mobile/NavbarMobile';
import './layout.css';
import NavbarDesktop from '../Navbar/desktop/NavbarDesktop';

function Layout() {
	return (
		<div>
			<NavbarDesktop />
			<Outlet />
			<NavbarMobile />
			{/* <footer>esto es el footer</footer> */}
		</div>
	);
}

export default Layout;
