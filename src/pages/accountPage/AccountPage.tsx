import { ArrowLeft, UserCircle } from 'lucide-react';
import { Link } from '../../components/ui';
import { ROUTES } from '../../lib/routes';
import PageContainer from '../../components/PageContainer/PageContainer';

import './accountPage.css';

function AccountPage() {
	return (
		<PageContainer>
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
		</PageContainer>
	);
}

export default AccountPage;
