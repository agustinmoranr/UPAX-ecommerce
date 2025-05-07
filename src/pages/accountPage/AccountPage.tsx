import { ArrowLeft, UserCircle } from 'lucide-react';
import { Link } from '../../components/ui';
import { ROUTES } from '../../lib/routes';

import './accountPage.css';

function AccountPage() {
	return (
		<div>
			<main className='page-content-dimensions account-page'>
				<Link className='go-back-link' to={ROUTES.HOME}>
					<ArrowLeft /> Volver
				</Link>
				<h1 className='account-title'>Mi Cuenta</h1>
				<div className='account'>
					<UserCircle className='account-img' />
					<div className='account-details'>
						<h2>Agustin Moran</h2>
					</div>
				</div>
			</main>
		</div>
	);
}

export default AccountPage;
