import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import './index.css';
import { useEffect, useState } from 'react';
import { getData } from './utils/helper';
function App() {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loadingProducts, setLoadingProducts] = useState(true);
	const [loadingCategories, setLoadingCategories] = useState(true);
	const [searchType, setSearchType] = useState('Name');
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [searchInput, setSearchInput] = useState('');

	useEffect(() => {
		setLoadingProducts(true);
		(async function () {
			try {
				const { data } = await getData('/menu');
				setProducts(data);
				setLoadingProducts(false);
			} catch (error) {
				setLoadingProducts(false);
				console.log(error);
			}
		})();

		setLoadingCategories(true);
		(async function () {
			try {
				const { data } = await getData('/categories');
				setCategories([{ id: 0, name: 'All' }, ...data]);
				setLoadingCategories(false);
			} catch (error) {
				setLoadingCategories(false);
				console.log(error);
			}
		})();
	}, []);

	const handleSearchType = (type) => setSearchType(type);
	const handleSelectedProducts = (id) => {
		const newProducts = products.map((product) =>
			product.id === id
				? {
						...product,
						selected: !product.selected,
						count: product.selected ? 0 : 1,
				  }
				: { ...product }
		);
		setProducts(newProducts);
	};
	const plusProduct = (id) => {
		const newProducts = products.map((product) =>
			product.id === id
				? { ...product, count: product.count + 1 }
				: { ...product }
		);
		setProducts(newProducts);
	};
	const minusProduct = (id) => {
		const newProducts = products.map((product) =>
			product.id === id
				? { ...product, count: product.count > 0 ? product.count - 1 : 0 }
				: { ...product }
		);
		setProducts(newProducts);
	};
	const resetSelectedList = () => {
		const newProducts = products.map((product) =>
			product.selected
				? { ...product, selected: false, count: 0 }
				: { ...product }
		);
		setProducts(newProducts);
	};

	const handleCategory = (cat) => setSelectedCategory(cat);

	const handleSearchInput = (text) => setSearchInput(text);

	const SelectedProducts = products.filter((product) => product.selected);
	const filteredProducts =
		searchType === 'Category' && selectedCategory !== 'All'
			? products.filter((product) => product.category === selectedCategory)
			: searchType === 'Name' && searchInput
			? products.filter((product) =>
					product.name.toLowerCase().includes(searchInput.toLowerCase())
			  )
			: [...products];
	return (
		<>
			<Navbar selectedProducts={SelectedProducts} />
			<div className="container mx-auto">
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="/menu"
						element={
							<Menu
								products={filteredProducts}
								categories={categories}
								searchType={searchType}
								selectedCategory={selectedCategory}
								handleSearchInput={handleSearchInput}
								handleCategory={handleCategory}
								handleSearchType={handleSearchType}
								loadingProducts={loadingProducts}
								loadingCategories={loadingCategories}
								handleSelectedProducts={handleSelectedProducts}
							/>
						}
					/>
					<Route
						path="/cart"
						element={
							<Cart
								selectedProducts={SelectedProducts}
								handleSelectedProducts={handleSelectedProducts}
								resetSelectedList={resetSelectedList}
								plusProduct={plusProduct}
								minusProduct={minusProduct}
							/>
						}
					/>
				</Routes>
			</div>
		</>
	);
}

export default App;
