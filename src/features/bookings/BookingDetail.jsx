import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBokking";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import { useNavigate } from "react-router-dom";
import { HiTrash } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import DeleteBookingModal from "./DeleteBookingModal";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail({ onCloseModal }) {
  const navigate = useNavigate();
  const { checkout, isChecking } = useCheckout();
  const { data: booking, isLoading } = useBooking();

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  const { status, id: bookingId } = booking;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            checkin
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            // icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(bookingId)}
            disabled={isChecking}
          >
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Button forName={"delete"}>
            <Button variations="danger">
              <HiTrash />
              Delete
            </Button>
          </Modal.Button>
          <Modal.Window name={"delete"}>
            <DeleteBookingModal bookingId={bookingId} />
          </Modal.Window>
        </Modal>

        <Button variations="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
