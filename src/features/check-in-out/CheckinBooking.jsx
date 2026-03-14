import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBokking";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import CheckBox from "../../ui/CheckBox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { data: booking, isLoading } = useBooking();
  const moveBack = useMoveBack();
  const { checkin, isCheking } = useCheckin();

  useEffect(() => setIsConfirmed(booking?.isPaid), [booking?.isPaid]);

  if (isLoading) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  function handleCheckin() {
    console.log(isConfirmed);
    if (!isConfirmed) return;
    checkin(bookingId);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <CheckBox
          checked={isConfirmed}
          onChange={() => setIsConfirmed((chk) => !chk)}
          disabled={isConfirmed || isCheking}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {formatCurrency(totalPrice)}
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!isConfirmed || isCheking}>
          Check in booking #{bookingId}
        </Button>
        <Button variations="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
