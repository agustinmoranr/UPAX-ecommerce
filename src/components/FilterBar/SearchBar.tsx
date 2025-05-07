import { Search } from 'lucide-react';
import './searchBar.css';

function SearchBar() {
	return (
		<form className='search-bar'>
			<div>
				<label htmlFor='search-bar'>
					<Search />
				</label>
				<input
					id='search-bar'
					name='search-bar'
					type='search'
					placeholder='Buscar en MellowStore.com.mx'
				/>
			</div>
		</form>
	);
}

export default SearchBar;
