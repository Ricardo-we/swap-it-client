import React, { useContext, useState, useLayoutEffect } from "react";
import { AppContext } from "../../App";
import Product from "../../interfaces/Product";
import {
  addProductRequest,
  deleteProductRequest,
  getProductsRequest,
  updateProductRequest,
} from "../../services/products-requests";
import { ProductFormSchema } from "../../form-validations/ProductForm";
// COMPONENTS
import { IoIosAdd } from "react-icons/io";
import { AnimatePresence } from "framer-motion";
import Modal from "../../components/Modal";
import ModalAlert from "../../components/ModalAlert";
import ProductForm from "./components/ProductForm";
import { toast, ToastContainer } from "react-toastify";
import ProductCard from "../../components/ProductCard";
import FloatingButton from "./../../components/FloatingButton";
import { UserInStorage } from "../../interfaces/User";
import ImageDeleteSlider from "./components/ImageDeleteSlider";

function UserProductsControl() {
  const { storedUser } = useContext<UserInStorage | any>(AppContext);
  const [userProducts, setUserProducts] = useState<Array<Product>>();
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  const getUserProducts = () => {
    getProductsRequest({ query: "user_id", value: storedUser.user.id })
      .then((res) => setUserProducts(res.results))
      .catch((error) => toast.error(error?.toString()));
  };

  const addProduct = async (
    product: any,
    files: Array<any>,
    tags: Array<any>
  ) => {
    try {
      await ProductFormSchema.validate(product);
      await addProductRequest(storedUser, { ...product, images: files, tags });
      getUserProducts();
    } catch (error: any) {
      toast.error(error.toString());
    }
  };

  const deleteProduct = (productId?: number | string) => {
    if (!productId) return toast.error("Select a product");
    return deleteProductRequest(storedUser, productId)
      .then(getUserProducts)
      .catch((error) => toast.error(error.toString()));
  };

  const updateProduct = async (
    product: any,
    files: Array<any>,
    tags: Array<any>
  ) => {
    try {
      if (!selectedProduct?.id) throw new Error("Not selected product");
      await ProductFormSchema.validate(product);
      await updateProductRequest(storedUser, selectedProduct.id, {
        ...product,
        images: files,
        tags,
      });
      getUserProducts();
    } catch (error: any) {
      toast.error(error.toString());
    }
  };

  useLayoutEffect(() => {
    getUserProducts();
  }, []);

  return (
    <>
      {/* <NavBar /> */}
      <ToastContainer />

      {/* CREATE, DELETE, UPDATE */}
      <AnimatePresence>
        {/* DELETE MODAL */}
        {alertOpen && (
          <ModalAlert
            visible={alertOpen}
            handleClose={() => setAlertOpen(false)}
            onConfirm={() => {
              deleteProduct(selectedProduct?.id);
              setAlertOpen(false);
            }}
          >
            <h4>
              Are you sure you want to delete this product and its content?
            </h4>
          </ModalAlert>
        )}
        {/* ADD MODAL */}
        {addModalOpen && (
          <Modal
            visible={addModalOpen}
            handleClose={() => setAddModalOpen(false)}
          >
            <ProductForm onSubmit={addProduct} />
          </Modal>
        )}
        {/* UPDATE MODAL */}
        {updateModalOpen && (
          <Modal
            visible={updateModalOpen}
            handleClose={() => setUpdateModalOpen(false)}
          >
            <ProductForm
              formTitle="Edit product"
              buttonText="Update"
              defaults={selectedProduct}
              onSubmit={(product, files, tags) => {
                return updateProduct(product, files, tags)
                  .then(() => setUpdateModalOpen(false))
              }}
            />
            <ImageDeleteSlider
              onDeleteImage={getUserProducts}
              storedUser={storedUser}
              images={selectedProduct?.images}
            />
          </Modal>
        )}
      </AnimatePresence>

      {/* USER PRODUCTS */}
      <div className="container d-flex align-items-center justify-content-evenly flex-wrap">
        <FloatingButton
          icon={<IoIosAdd size={20} />}
          onClick={() => setAddModalOpen(true)}
          className="btn btn-outline-primary"
          x="right"
          y="bottom"
          title="Add product"
        />
        {userProducts &&
          userProducts.map((product, index) => (
            <ProductCard
              editable
              key={index}
              onDelete={() => {
                setAlertOpen(true);
                setSelectedProduct(product);
              }}
              onUpdate={() => {
                setUpdateModalOpen(true);
                setSelectedProduct(product);
              }}
              product={product}
            />
          ))}
      </div>
    </>
  );
}

export default UserProductsControl;
