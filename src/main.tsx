import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ROUTES } from './lib/routes.ts';
import Layout from './components/Layout/Layout.tsx';
import Homepage from './pages/homepage/homepage.tsx';
import ProductDetail from './pages/productDetail/ProductDetail.tsx';
import MyCartPage from './pages/myCart/MyCartPage.tsx';
import AccountPage from './pages/accountPage/AccountPage.tsx';

import 'modern-css-reset/dist/reset.min.css';
import './index.css';

const router = createBrowserRouter([
	{
		Component: Layout,
		children: [
			{
				index: true,
				Component: Homepage,
			},
			{
				path: `${ROUTES.PRODUCT}/:product_id`,
				Component: ProductDetail,
			},
			{
				path: ROUTES.CART,
				Component: MyCartPage,
			},
			{
				path: ROUTES.ACCOUNT,
				Component: AccountPage,
			},
		],
	},
]);

createRoot(document.getElementById('root')!).render(
	<RouterProvider router={router} />,
);
