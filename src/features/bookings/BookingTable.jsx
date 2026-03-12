import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
// import Menus from "../../ui/Menus";

function BookingTable() {
  // const bookings = [];
  const { data: bookings = [], isLoading } = useBookings();
  console.log(bookings);
  if (isLoading) return <Spinner />;
  if (bookings.length === 0) return <Empty resource={"bookings"} />;
  console.log(isLoading);

  return (
    // <Menus>
    <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
      <Table.Header>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={bookings}
        render={(booking) => <BookingRow key={booking.id} booking={booking} />}
      />
    </Table>
    // </Menus>
  );
}

export default BookingTable;
