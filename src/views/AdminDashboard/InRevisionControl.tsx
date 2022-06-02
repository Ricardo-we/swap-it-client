import {
  deleteProductAsSuperUserRequest,
  getProductsRequest,
} from "../../services/products-requests";
import { useEffect, useState } from "react";
import Table from "../../components/Table";
import ActionButtons from "../../components/ActionsButtons";
import { AnimatePresence } from "framer-motion";
import ModalAlert from "../../components/ModalAlert";
import useUser from "../../hooks/useUser";
import { ToastContainer, toast } from "react-toastify";

export default function InRevisionControl() {
  const { storedUser } = useUser();
  const [products, setProducts] = useState<Array<any>>();
  const [alertOpen, setAlertOpen] = useState<boolean>();
  const [selectedItem, setSelectedItem] = useState<any>();

  const getProducts = () => {
    return getProductsRequest({ query: "in_revision", value: "all" }).then(
      (res) => {
        setProducts(res);
      }
    );
  };

  const deleteProduct = () => {
    if (selectedItem)
      return deleteProductAsSuperUserRequest(storedUser, selectedItem.id)
        .then(getProducts)
        .catch((error) => toast.error(error.response.data.error));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <ToastContainer />
      <AnimatePresence>
        {alertOpen && (
          <ModalAlert
            visible={alertOpen}
            handleClose={() => setAlertOpen(false)}
            onConfirm={deleteProduct}
          >
            <h3>Are you sure you want to delete this product</h3>
          </ModalAlert>
        )}
      </AnimatePresence>

      <section>
        <h2 style={{ width: "95%", marginInline: "auto" }}>
          Items in revision
        </h2>
        <Table
          style={{ width: "95%", marginInline: "auto" }}
          tableItems={
            products &&
            products?.map((product) => ({
              name: product.name,
              description: product.description,
              aproximate_price: product.aproximate_price,
              last_update: product.last_update,
              possible_interchanges: product.possible_interchanges,
              actions: (
                <ActionButtons
                  value={product}
                  selectItem={setSelectedItem}
                  onActionValueChange={true}
                  onDelete={setAlertOpen}
                />
              ),
            }))
          }
          tableHeadings={[
            "name",
            "description",
            "aproximate price",
            "last update",
            "possible interchanges",
            "actions",
          ]}
        />
      </section>
    </>
  );
}
