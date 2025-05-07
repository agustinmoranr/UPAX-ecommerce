import { useState } from 'react';
import type { Categories } from '../../lib/hooks/useProducts';
import { useCart } from '../CartProvider';
import { Chip } from '../ui';
import { X } from 'lucide-react';
import './categoriesFilter.css';

function CategoriesFilter() {
	const [activeCategory, setActiveCategory] = useState<Categories | null>(null);
	const id = Math.random().toString();

	const { productsState } = useCart();
	const { filterByCategory, clearFiltering } = productsState;
	const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		filterByCategory(e.target.value as Categories);
		setActiveCategory(e.target.value as Categories);
	};

	const removeFilter = () => {
		setActiveCategory(null);
		clearFiltering();
	};

	const handleInputClick = (inputValue: Categories) => {
		if (activeCategory !== inputValue) return;
		removeFilter();
	};

	return (
		<form className='filters__by-category' id={id} key={id}>
			<div>
				<input
					id='electronics'
					type='radio'
					value='electronics'
					name='categories'
					onChange={onInputChange}
					checked={activeCategory === 'electronics'}
					onClick={() => handleInputClick('electronics')}
				/>
				<label htmlFor='electronics'>
					<Chip
						className={activeCategory === 'electronics' ? 'isActive' : ''}
						afterSlot={
							activeCategory === 'electronics' ? <X size={14} /> : null
						}>
						Electronica
					</Chip>
				</label>
			</div>
			<div>
				<input
					id='clothing'
					type='radio'
					value='clothing'
					name='categories'
					onChange={onInputChange}
					onClick={() => handleInputClick('clothing')}
					checked={activeCategory === 'clothing'}
				/>
				<label htmlFor='clothing'>
					<Chip
						className={activeCategory === 'clothing' ? 'isActive' : ''}
						afterSlot={activeCategory === 'clothing' ? <X size={14} /> : null}>
						Ropa
					</Chip>
				</label>
			</div>
			<div>
				<input
					id='jewelery'
					type='radio'
					value='jewelery'
					name='categories'
					onChange={onInputChange}
					onClick={() => handleInputClick('jewelery')}
					checked={activeCategory === 'jewelery'}
				/>
				<label htmlFor='jewelery'>
					<Chip
						className={activeCategory === 'jewelery' ? 'isActive' : ''}
						afterSlot={activeCategory === 'jewelery' ? <X size={14} /> : null}>
						Joyería
					</Chip>
				</label>
			</div>
		</form>
	);
}

export default CategoriesFilter;
