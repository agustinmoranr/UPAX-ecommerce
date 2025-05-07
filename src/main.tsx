import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { ROUTES } from './lib/routes.ts';
import Layout from './components/Layout/Layout.tsx';
import Homepage from './pages/homepage/homepage.tsx';
import productDetail from './pages/productDetail/ProductDetail.tsx';

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
				Component: productDetail,
			},
			{
				path: ROUTES.CART,
				Component: () => <div>my cart page</div>,
			},
			{
				path: ROUTES.ACCOUNT,
				Component: () => <div>my account page</div>,
			},
		],
	},
]);

createRoot(document.getElementById('root')!).render(
	<RouterProvider router={router} />,
);
