import { useRef } from "react";

interface DeleteModalProps {
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function DeleteModal({
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item?",
}: DeleteModalProps) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const closeModal = () => {
    modalRef.current?.close();
  };

  return (
    <>
      <dialog ref={modalRef} id="delete_race_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <button
              className="btn btn-error"
              onClick={() => {
                onConfirm();
                closeModal();
              }}
            >
              Delete
            </button>
            <button className="btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
