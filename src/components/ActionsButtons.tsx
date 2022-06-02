import { MdDelete, MdEdit } from "react-icons/md";

interface ActionButtonProps {
  value?: any;
  onDelete?: (data: any) => any;
  onUpdate?: (data: any) => any;
  selectItem?: (data: any) => any;
  buttonsContainerClassName?: string;
  onActionValueChange: any;
}

const ActionButtons = ({
  value,
  onDelete,
  onUpdate,
  selectItem,
  onActionValueChange = true,
  buttonsContainerClassName = "d-flex w-100 align-items-center justify-content-end",
}: ActionButtonProps) => {
  return (
    <div className={buttonsContainerClassName}>
      {onDelete && (
        <button
          onClick={() => {
            onDelete(onActionValueChange);
            selectItem && selectItem(value);
          }}
          className="btn btn-danger"
        >
          <MdDelete />
        </button>
      )}
      {onUpdate && (
        <button
          onClick={() => {
            onUpdate(onActionValueChange);
            selectItem && selectItem(value);
          }}
          className="btn btn-success"
        >
          <MdEdit />
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
