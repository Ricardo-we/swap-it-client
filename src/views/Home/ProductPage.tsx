import { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { getProductsRequest } from "../../services/products-requests";
import { getUserLocation } from "../../services/users-requests";
import ProductCard from "../../components/ProductCard";
import Product from "../../interfaces/Product";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import useUser from "../../hooks/useUser";

function ProductPage({ children }: any) {
	// const { storedUser } = useContext<any>(AppContext);
	const { storedUser } = useUser();
	const { currentPage } = useParams();
	const navigate = useNavigate();

	const [paginationData, setPaginationData] = useState<any>();
	const [products, setProducts] = useState<Array<Product>>();

	const handleProductsChange = (response: any) => {
		setProducts(response.results);
		setPaginationData({
			next: response.next,
			prev: response.previous,
			count: response.count,
			current: response.current,
		});
	};

	const getProducts = async () => {
		try {
			const swapItLocation = JSON.parse(
				localStorage.getItem("swapit-location") || "{}"
			);
			let userLocation =
				storedUser.user?.location ||
				swapItLocation?.country ||
				(await getUserLocation());
			const response = await getProductsRequest({
				query: "location",
				value: userLocation + `&page=${currentPage || 1}`,
			});
			handleProductsChange(response);
		} catch (error: any) {
			setPaginationData({ error });
			toast.error(error.toString());
		}
	};

	useEffect(() => {
		getProducts();
	}, []);

	useEffect(() => {
		if (paginationData?.error) navigate("/");
	}, [paginationData]);

	if (paginationData?.error) return <></>;

	return (
		<>
			<NavBar searchDisabled={false} onSearchResults={handleProductsChange} />
			<ToastContainer />
			{children}
			<div className="container d-flex flex-wrap align-items-center justify-content-evenly">
				{products &&
					products.map((product, index) => (
						<ProductCard key={index} product={product} />
					))}
			</div>
			<div className="align-items-center justify-content-center d-flex">
				<Pagination>
					{paginationData ? (
						<>
							<Pagination.Prev
								href={`/page/${paginationData.prev}`}
								disabled={paginationData.prev === null}
							/>
							<Pagination.Item active>
								{paginationData?.current}
							</Pagination.Item>
							{paginationData.next && (
								<>
									{paginationData.count === parseInt(currentPage || "0") ? (
										<Pagination.Item href={`/page/${paginationData.prev}`}>
											{paginationData.prev}
										</Pagination.Item>
									) : (
										<Pagination.Item href={`/page/${paginationData.count}`}>
											{paginationData.count}
										</Pagination.Item>
									)}
								</>
							)}
							<Pagination.Next
								href={`/page/${paginationData.next}`}
								disabled={paginationData.next === null}
							/>
						</>
					) : (
						<Pagination.Item disabled></Pagination.Item>
					)}
				</Pagination>
			</div>
		</>
	);
}

export default ProductPage;
