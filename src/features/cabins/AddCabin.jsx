import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm v1";

function AddCabin() {
  return (
    // <div>
    //   <Button onClick={() => setIsOpenModal(true)}>Show Form</Button>
    //   {isOpenModal && (
    //     <Modal onClose={setIsOpenModal}>
    //       <CreateCabinForm onCloseModal={setIsOpenModal} />
    //     </Modal>
    //   )}
    // </div>

    <Modal>
      <Modal.Button forName="add cabin">
        <Button>Add Cabin</Button>
      </Modal.Button>
      <Modal.Window name="add cabin">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
