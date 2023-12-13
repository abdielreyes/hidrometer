function ModalConfirm({ confirm, data }) {
  const closeModal = () => {
    document.getElementById("modal_confirm").close();
  };
  return (
    <div>
      <dialog id="modal_confirm" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{data.title}</h3>
          <p className="py-4">{data.message}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-error text-white" onClick={confirm}>
                {data.button_accept}
              </button>
            </form>
            <button className="btn btn-success text-white" onClick={closeModal}>
              {data.button_decline}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ModalConfirm;
