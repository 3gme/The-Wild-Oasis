import styled from "styled-components";
import Button from "../../ui/Button";
import { useDeleteBooking } from "./useDeleteBooking";
import { useNavigate } from "react-router-dom";

const Buttons = styled.div`
  margin-top: 1rem;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  margin-left: auto;
`;

function DeleteBookingModal({ bookingId, onCloseModal }) {
  const navigate = useNavigate();
  const { deleteBooking } = useDeleteBooking();

  return (
    <div>
      Are you sure you will deldete booking #{bookingId}
      <Buttons>
        <Button variations="secondary" onClick={() => onCloseModal()}>
          Cancel
        </Button>
        <Button
          variations="danger"
          onClick={() => {
            deleteBooking(bookingId);
            navigate("/bookings");
          }}
        >
          Delete
        </Button>
      </Buttons>
    </div>
  );
}

export default DeleteBookingModal;
