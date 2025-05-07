import { Chip } from '../ui';
import './categoriesFilter.css';

function CategoriesFilter() {
	return (
		<form className='filters__by-category'>
			<div>
				<input id='electronics' type='radio' value='electronics' />
				<label htmlFor='electronics'>
					<Chip>Electronica</Chip>
				</label>
			</div>
			<div>
				<input id='clothing' type='radio' value='clothing' />
				<label htmlFor='clothing'>
					<Chip>Ropa</Chip>
				</label>
			</div>
			<div>
				<input id='jewelery' type='radio' value='jewelery' />
				<label htmlFor='jewelery'>
					<Chip>Joyería</Chip>
				</label>
			</div>
		</form>
	);
}

export default CategoriesFilter;
