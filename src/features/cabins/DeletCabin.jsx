import { HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import DeleteCabinWindow from "./DeleteCabinWindow";

function DeletCabin({ cabinId }) {
  return (
    <Modal>
      <Modal.Button forName={"delete"}>
        <button>
          <HiTrash />
        </button>
      </Modal.Button>
      <Modal.Window name={"delete"}>
        <DeleteCabinWindow id={cabinId} />
      </Modal.Window>
    </Modal>
  );
}

export default DeletCabin;
