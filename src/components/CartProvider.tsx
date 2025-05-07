import {
	createContext,
	useContext,
	useState,
	type ComponentProps,
	type CSSProperties,
	type Dispatch,
	type PropsWithChildren,
} from 'react';
import { Button, type ButtonProps } from './ui';

import useProducts, {
	type Product,
	type useProductsOutput,
} from '../lib/hooks/useProducts';
import { Plus, Trash } from 'lucide-react';
import {
	deduplicateWithQuantity,
	type ProductWithQuantity,
} from '../lib/deduplicateCart';

type CartContextType = {
	cart: Product[];
	cartWithQuantity: ProductWithQuantity[];
	totalProducts: number;
	productsState: useProductsOutput;
	setCart: Dispatch<React.SetStateAction<Product[]>>;
	addProduct: (product: Product) => void;
	removeProduct: (product_id: Product['id']) => void;
	getProductInCart: (product_id: Product['id']) => {
		product: Product;
		quantity: number;
	};
	removeProductCompletely: (product_id: Product['id']) => void;
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
	const cartWithQuantity = deduplicateWithQuantity(cart);

	const addProduct = (product: Product) =>
		setCart((state) => [...state, product]);
	const removeProduct = (product_id: Product['id']) =>
		setCart((state) => {
			const index = state.findIndex((product) => product.id === product_id);
			if (index === -1) return state;
			const stateCopy = [...state];
			stateCopy.splice(index, 1);
			return stateCopy;
		});
	const removeProductCompletely = (product_id: Product['id']) =>
		setCart((state) => {
			const stateCopy = [...state];
			const productsToDelete = stateCopy.filter(({ id }) => id !== product_id);

			return productsToDelete;
		});

	const getProductInCart = (product_id: Product['id']) => {
		const productsInCart = cart.filter(({ id }) => id === product_id);

		return { product: productsInCart[0], quantity: productsInCart.length };
	};

	const totalProducts = cart.length;

	const value = {
		cart,
		cartWithQuantity,
		totalProducts,
		productsState,
		setCart,
		addProduct,
		removeProduct,
		getProductInCart,
		removeProductCompletely,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;

interface AddProductToCartButtonProps extends ButtonProps {
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

interface RemoveProductFromCartButtonProps extends ButtonProps {
	product_id: Product['id'];
}

export function RemoveProductFromCartButton({
	onClick,
	product_id,
	...props
}: RemoveProductFromCartButtonProps) {
	const { removeProductCompletely } = useCart();

	const handleClick: ComponentProps<'button'>['onClick'] = (e) => {
		e.preventDefault();
		e.stopPropagation();
		removeProductCompletely(product_id);
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

export function ProductActions({
	product_id,
	count,
	style,
}: {
	product_id: Product['id'];
	count: number;
	style?: CSSProperties | undefined;
}) {
	const { addProduct, removeProduct, productsState } = useCart();

	const _removeProduct: ComponentProps<'button'>['onClick'] = (e) => {
		e.stopPropagation();
		e.preventDefault();

		removeProduct(product_id);
		// if (typeof onClick === 'function') onClick(e);
	};

	const _addProduct: ComponentProps<'button'>['onClick'] = (e) => {
		e.stopPropagation();
		e.preventDefault();

		if (productsState && productsState.data) {
			const product = productsState.data.find(({ id }) => id === product_id);
			if (product) addProduct(product);
		}
		// if (typeof onClick === 'function') onClick(e);
	};

	return (
		<div className='product-actions' style={style}>
			<button onClick={_removeProduct} className='delete-button'>
				<Trash strokeWidth={2.5} />
			</button>
			<span>{count}</span>
			<button onClick={_addProduct} className='add-button'>
				<Plus strokeWidth={2.5} />
			</button>
		</div>
	);
}
