import type { Product } from './hooks/useProducts';

export type ProductWithQuantity = Product & { quantity: number };

export function deduplicateWithQuantity(
	products: Product[],
): ProductWithQuantity[] {
	const map = new Map<Product['id'], ProductWithQuantity>();

	for (const product of products) {
		if (map.has(product.id)) {
			map.get(product.id)!.quantity += 1;
		} else {
			map.set(product.id, { ...product, quantity: 1 });
		}
	}

	return Array.from(map.values());
}
