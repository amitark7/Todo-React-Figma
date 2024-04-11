import React from "react";

const DeleteModal = ({
  isDeleteModal,
  setIsDeleteModal,
  deleteTodo,
  editTodoId,
}) => {
  return (
    isDeleteModal && (
      <div className="absolute text-center mx-auto w-[60%] top-[30%] left-[20%] bg-white border-2 px-2 py-4 rounded">
        <p className="text-2xl text-left w-[80%] mx-auto mb-8">Are you sure?</p>
        <div className="flex justify-between w-[80%] mx-auto text-lg">
          <button onClick={() => setIsDeleteModal(false)}>Cancel</button>
          <button onClick={() => deleteTodo(editTodoId)}>Yes</button>
        </div>
      </div>
    )
  );
};

export default DeleteModal;
