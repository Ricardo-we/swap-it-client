import React, { useState, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import Product from "../../interfaces/Product";
import { getProductsRequest } from "../../services/products-requests";
import NavBar from "../../components/NavBar";
import Slider from "../../components/Slider";
import Loader from "../../components/Loader";
import { Accordion, Dropdown, ListGroup } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { AnimatePresence } from "framer-motion";
import ReportModalForm from "../UserDashBoard/components/ReportModalForm";
import { toast, ToastContainer } from "react-toastify";

function ProductView() {
	const { product_id } = useParams();
	const [product, setProduct] = useState<Product>();
	const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);

	const getProduct = () => {
		getProductsRequest({ query: "product_id", value: product_id || "" }).then(
			(res) => setProduct(res)
		);
	};

	useLayoutEffect(() => {
		getProduct();
	}, []);

	if (!product) return <Loader />;
	return (
		<>
			<style>{`
        .product-view-dropdown {
            cursor: pointer;
            padding: 10px;
            align-self: flex-start;
            width: fit-content;
        }
        #dropdown-basic {
            width: 22px;
            height: 22px;
        }                

        .dropdown-item:hover {
            background-color: var(--bs-light)!important;
        }

    `}</style>

			<NavBar />
			<ToastContainer />
			<AnimatePresence>
				{reportModalOpen && (
					<ReportModalForm
						visible={reportModalOpen}
						handleClose={() => setReportModalOpen(false)}
						productId={product_id}
						onError={(error) => toast.error(error)}
						onSuccess={(message) => toast.success(message)}
					/>
				)}
			</AnimatePresence>

			<div className="container-lg d-flex flex-wrap flex-row align-items-center justify-content-evenly">
				<div className="w-100">
					<Dropdown className="product-view-dropdown me-auto">
						<Dropdown.Toggle
							as={BsThreeDots}
							variant="primary"
							id="dropdown-basic"
						></Dropdown.Toggle>
						<Dropdown.Menu variant="danger">
							<button
								className="dropdown-item btn bg-white text-danger"
								style={{ textDecoration: "none" }}
								onClick={() => setReportModalOpen(true)}
							>
								Report this item
							</button>
						</Dropdown.Menu>
					</Dropdown>
				</div>
				<Slider
					style={{ minWidth: 160, width: 500, margin: 10, height: 300 }}
					sliderItems={
						product?.images && product.images.length > 0
							? product.images.map((image, index) => (
								<img
									key={index}
									alt="Oops not found"
									loading="lazy"
									style={{
										width: "100%",
										height: "100%",
										objectFit: "cover",
									}}
									src={image.image}
								/>
							))
							: []
					}
				/>
				<div
					className="d-flex flex-column flex-wrap align-items-start justify-content-evenly"
					style={{ width: 400, minWidth: 160 }}
				>
					<h2>{product?.name}</h2>
					<h2 className="text-info">
						{product?.currency}
						{product?.aproximate_price}
					</h2>
					<p>{product?.description || "Not description yet..."}</p>
					<small>
						{product?.last_update &&
							new Date(product.last_update).toLocaleDateString()}
					</small>
					<div
						className="d-flex w-100 flex-row flex-wrap align-items-start justify-content-start"
						style={{ gap: "2px" }}
					>
						{product?.tags?.map((tag, index) => (
							<button key={index} className="btn btn-outline disabled">{tag?.name}</button>
						))}
					</div>
				</div>

				<Accordion className="container" defaultActiveKey={["0"]} alwaysOpen>
					<Accordion.Item eventKey="0">
						<Accordion.Header>Requested interchanges</Accordion.Header>
						<Accordion.Body>
							{product?.possible_interchanges || "Looks like "}
						</Accordion.Body>
					</Accordion.Item>
					<Accordion.Item eventKey="1">
						<Accordion.Header>User contact information </Accordion.Header>
						<Accordion.Body>
							<ListGroup>
								{product?.user_contact_info &&
									product.user_contact_info?.map((contactInfo, index) => (
										<ListGroup.Item key={index}>
											<strong>{contactInfo.contact_type}:</strong>{" "}
											{contactInfo.contact}
										</ListGroup.Item>
									))}
							</ListGroup>
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
				{/* </div> */}
			</div>
		</>
	);
}

export default ProductView;
