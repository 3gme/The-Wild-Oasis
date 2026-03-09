import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm v1";
import { HiPencil } from "react-icons/hi2";

function EditCabin({ cabin }) {
  return (
    <Modal>
      <Modal.Button forName="edit cabin">
        <button>
          <HiPencil />
        </button>
      </Modal.Button>
      <Modal.Window name="edit cabin">
        <CreateCabinForm cabinToEdit={cabin} />
      </Modal.Window>
    </Modal>
  );
}

export default EditCabin;
