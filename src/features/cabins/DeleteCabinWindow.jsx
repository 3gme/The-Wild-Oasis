import styled from "styled-components";
import { useDeleteCabin } from "./useDeleteCabin";
import Button from "../../ui/Button";
import Row from "../../ui/Row";

const Main = styled.div`
  display: flex;
  padding: 2.4rem 3.2rem;
  flex-direction: column;
  gap: 1.2rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  text-align: center;
  font-weight: bold;
`;

function DeleteCabinWindow({ id, onCloseModal }) {
  const { deleteCabin } = useDeleteCabin();
  return (
    <Main>
      <Title>Are you sure you want to delete cabin {id}</Title>
      <Row type="horizontal">
        <Button variations="secondary" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button
          variations="danger"
          onClick={() => {
            deleteCabin(id);
            onCloseModal();
          }}
        >
          Delete
        </Button>
      </Row>
    </Main>
  );
}

export default DeleteCabinWindow;
