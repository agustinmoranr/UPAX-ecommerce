import SearchBar from './SearchBar';
import CategoriesFilter from './CategoriesFilter';
import './filtersBar.css';

function FiltersBar() {
	return (
		<div className='filters'>
			<SearchBar />
			<CategoriesFilter />
		</div>
	);
}

export default FiltersBar;
