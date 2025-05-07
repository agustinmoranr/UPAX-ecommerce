import {
	createContext,
	useContext,
	useState,
	type ComponentProps,
	type Dispatch,
	type PropsWithChildren,
} from 'react';
import { Button } from './ui';

import useProducts, { type useProductsOutput } from '../lib/hooks/useProducts';

type Product = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
};

type CartContextType = {
	cart: Product[];
	totalProducts: number;
	productsState: useProductsOutput;
	setCart: Dispatch<React.SetStateAction<Product[]>>;
	addProduct: (product: Product) => void;
	removeProduct: (product_id: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
	const context = useContext(CartContext);

	if (!context) {
		throw new Error(
			'Debes utilizar useCart dentro del componente CartProvider',
		);
	}

	return context;
}

export function CartProvider({ children }: PropsWithChildren) {
	const [cart, setCart] = useState<Product[]>([]);
	const productsState = useProducts();

	const addProduct = (product: Product) =>
		setCart((state) => [...state, product]);
	const removeProduct = (product_id: Product['id']) =>
		setCart((state) => {
			const stateCopy = [...state];
			const newProductsList = stateCopy.filter(({ id }) => id !== product_id);
			return newProductsList;
		});
	const totalProducts = cart.length;

	const value = {
		cart,
		totalProducts,
		productsState,
		setCart,
		addProduct,
		removeProduct,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;

interface AddProductToCartButtonProps extends ComponentProps<'button'> {
	product_id: Product['id'];
}

export function AddProductToCartButton({
	onClick,
	product_id,
	...props
}: AddProductToCartButtonProps) {
	const { addProduct, productsState } = useCart();

	const handleClick: ComponentProps<'button'>['onClick'] = (e) => {
		if (productsState && productsState.data) {
			const product = productsState.data.find(({ id }) => id === product_id);
			if (product) addProduct(product);
		}
		if (typeof onClick === 'function') onClick(e);
	};

	return <Button onClick={handleClick} {...props} />;
}

interface RemoveProductFromCartButtonProps extends ComponentProps<'button'> {
	product_id: Product['id'];
}

export function RemoveProductFromCartButton({
	onClick,
	product_id,
	...props
}: RemoveProductFromCartButtonProps) {
	const { removeProduct } = useCart();

	const handleClick: ComponentProps<'button'>['onClick'] = (e) => {
		removeProduct(product_id);
		if (typeof onClick === 'function') onClick(e);
	};

	return (
		<Button
			style={{ backgroundColor: 'oklch(0.59 0.16 21.39)' }}
			onClick={handleClick}
			{...props}
		/>
	);
}
