import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import './index.css';
import { useEffect, useState } from 'react';
import { getData } from './utils/helper';
import Admin from './pages/Admin';
import Editproduct from './pages/editProduct';
import AddProduct from './pages/AddProduct';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
function App() {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loadingProducts, setLoadingProducts] = useState(true);
	const [loadingCategories, setLoadingCategories] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [searchInput, setSearchInput] = useState('');
	const [currentPage, setCurrentPage] = useState(1);

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

	const removeProduct = async (id) => {
		try {
			const data = await getData(`/menu/${id}`, 'delete');
			console.log(data);
			const newProducts = products.filter((item) => item.id !== id);
			setProducts(newProducts);
			toast.success('Product deleted successfully!');
		} catch (error) {
			console.log(error);
			toast.error("Can't delete product");
		}
	};

	const handleCategory = (cat) => {
		setCurrentPage(1);
		setSelectedCategory(cat);
	};

	const handleAddProduct = async (e, data) => {
		try {
			const res = await axios.post(
				'https://api.cloudinary.com/v1_1/dfujoudf4/image/upload',
				{
					upload_preset: 'dfujoudf4',
					cloud_name: 'dfujoudf4',
					file: data.image,
				},
				{ headers: { 'Content-Type': 'multipart/form-data' } }
			);
			try {
				const req = await axios.post('http://localhost:3000/menu', {
					...data,
					selected: false,
					count: 0,
					image: res.data.secure_url,
				});
				setProducts([...products, { ...req.data }]);
				toast.success('Product added successfully!');
				console.log(req);
			} catch (error) {
				toast.error("Product Can't be added!");
				console.log(error);
			}
		} catch (error) {
			toast.error("Product Can't be added!");
			console.log(error);
		}

		console.log(data);
	};

	const handleSearchInput = (text) => setSearchInput(text);

	const handleCurrentPage = (page) => setCurrentPage(page);

	const editProduct = async (e, id, data) => {
		console.log('hi', data);
		e.preventDefault();
		try {
			const req = await axios.put(`http://localhost:3000/menu/${id}`, {
				...data,
			});
			const updatedProducts = products.map((product) =>
				product.id === id ? { ...req.data } : { ...product }
			);
			setProducts(updatedProducts);
			console.log(req);
			toast.success('Product changed successfully!');
		} catch (error) {
			console.log(error);
		}
	};

	const SelectedProducts = products.filter((product) => product.selected);
	const filteredProducts =
		selectedCategory !== 'All'
			? products.filter(
					(product) =>
						product.category === selectedCategory &&
						product.name.toLowerCase().includes(searchInput.toLowerCase())
			  )
			: searchInput
			? products.filter((product) =>
					product.name.toLowerCase().includes(searchInput.toLowerCase())
			  )
			: [...products];
	return (
		<>
			<Navbar selectedProducts={SelectedProducts} />
			<ToastContainer className={'fixed top-20 end-9'} />
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
								selectedCategory={selectedCategory}
								handleSearchInput={handleSearchInput}
								handleCategory={handleCategory}
								loadingProducts={loadingProducts}
								loadingCategories={loadingCategories}
								handleSelectedProducts={handleSelectedProducts}
								handleCurrentPage={handleCurrentPage}
								currentPage={currentPage}
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
					<Route
						path="/admin"
						element={
							<Admin
								products={filteredProducts}
								handleCategory={handleCategory}
								handleSearchInput={handleSearchInput}
								currentPage={currentPage}
								handleCurrentPage={handleCurrentPage}
								editProduct={editProduct}
								removeProduct={removeProduct}
							/>
						}
					/>
					<Route
						path="/add_new"
						element={
							<AddProduct
								categories={categories}
								handleAddProduct={handleAddProduct}
							/>
						}
					/>
					<Route
						path="/edit/:id"
						element={
							<Editproduct
								editProduct={editProduct}
								categories={categories}
							/>
						}
					/>
				</Routes>
			</div>
		</>
	);
}

export default App;
