import { Outlet } from 'react-router';
import { NavbarMobile } from '../Navbar/mobile/NavbarMobile';
import './layout.css';

function Layout() {
	return (
		<div>
			<Outlet />
			<NavbarMobile />
			{/* <footer>esto es el footer</footer> */}
		</div>
	);
}

export default Layout;
