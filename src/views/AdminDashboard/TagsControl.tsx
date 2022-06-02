import { useState, useEffect } from "react";
import useUser from "../../hooks/useUser";
import { AnimatePresence } from "framer-motion";
import {
  addTagRequest,
  updateTagRequest,
  getTagsRequest,
  deleteTagRequest,
} from "../../services/tag-requests";
import TagModalForm from "./components/TagModalForm";
import FloatingButton from "../../components/FloatingButton";
import { IoIosAdd, IoIosPricetag } from "react-icons/io";
import Table from "../../components/Table";
import ActionButtons from "../../components/ActionsButtons";
import ModalAlert from "../../components/ModalAlert";
import { toast, ToastContainer } from "react-toastify";

export default function TagsControl() {
  const { storedUser } = useUser();
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const [selectedTag, setSelectedTag] = useState<any>({});
  const [tags, setTags] = useState<Array<any>>();

  const getTags = () => getTagsRequest().then(setTags);

  const addTag = (data: any) => {
    return addTagRequest(storedUser, data)
      .then((res) => {
        if (res.error) throw Error(res.error);
        getTags();
      })
      .catch((error) => toast.error(error.toString()));
  };

  const updateTag = (data: any) => {
    if (selectedTag && data)
      return updateTagRequest(storedUser, selectedTag?.id, data)
        .then((res) => {
          if (res.error) throw Error(res.error);
          getTags();
        })
        .then(() => setUpdateModalOpen(false))
        .catch((error) => toast.error(error.toString()));
  };

  const deleteTag = (data: any) => {
    if (selectedTag && data)
      return deleteTagRequest(storedUser, selectedTag?.id)
        .then((res) => {
          if (res.error) throw Error(res.error);
          getTags();
        })
        .then(() => setAlertOpen(false))
        .catch((error) => toast.error(error.toString()));
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <>
      <ToastContainer />

      <AnimatePresence>
        {createModalOpen && (
          <TagModalForm
            visible={createModalOpen}
            handleClose={() => setCreateModalOpen(false)}
            onSubmit={addTag}
            title="Add tag"
            buttonText="Add tag"
          />
        )}

        {updateModalOpen && (
          <TagModalForm
            visible={updateModalOpen}
            handleClose={() => setUpdateModalOpen(false)}
            onSubmit={updateTag}
            defaults={selectedTag}
            title="Edit tag"
            buttonText="Edit tag"
          />
        )}

        {alertOpen && (
          <ModalAlert
            onConfirm={() => deleteTag(selectedTag)}
            handleClose={() => setAlertOpen(false)}
            visible={alertOpen}
          >
            <h3>Are you sure you want to delete this tag?</h3>
          </ModalAlert>
        )}
      </AnimatePresence>

      <section>
        <h2 className="mx-auto" style={{ width: "95%" }}>
          <IoIosPricetag />
          Tags
        </h2>

        <Table
          className="mx-auto"
          style={{ width: "95%" }}
          tableHeadings={["Tag name", "Actions"]}
          tableItems={tags?.map((tag) => ({
            name: tag?.name,
            actions: (
              <ActionButtons
                onActionValueChange={true}
                value={tag}
                onDelete={setAlertOpen}
                onUpdate={setUpdateModalOpen}
                selectItem={setSelectedTag}
              />
            ),
          }))}
        />
      </section>

      <FloatingButton
        className="btn btn-outline-primary"
        x="right"
        y="bottom"
        icon={<IoIosAdd size={30} />}
        onClick={() => setCreateModalOpen(true)}
      />
    </>
  );
}
