interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item?",
}: DeleteModalProps) {
  return (
    <dialog className="modal" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          <button
            className="btn btn-error"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Delete
          </button>
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
}
