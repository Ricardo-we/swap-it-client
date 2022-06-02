import Form from "../../../components/Form";
import Modal from "../../../components/Modal";

interface TagModalFormProps {
  visible: boolean;
  handleClose: () => void | any;
  defaults?: any;
  buttonText?: string;
  title?: string;
  onSubmit: (data: any) => void | any;
}

function TagModalForm({
  visible,
  handleClose,
  defaults,
  buttonText = "Add tag",
  title = "Tags",
  onSubmit
}: TagModalFormProps) {
  const formFields = [
    {
      name: "name",
      placeholder: "Tag name",
      pattern: "^[\\w\\s\\´]{2,150}$",
      alertMessage:
        "Tags at least needs 2 characters long, and can include any alphanumeric character, spaces does not count",
      defaultValue: defaults?.name || ""
    },
  ];

  return (
    <Modal visible={visible} handleClose={handleClose}>
      <Form
        resetOnSubmit={!defaults?.name}
        onSubmit={onSubmit}
        fields={formFields}
        formTitle={title}
        buttonText={buttonText}
      />
    </Modal>
  );
}

export default TagModalForm;
