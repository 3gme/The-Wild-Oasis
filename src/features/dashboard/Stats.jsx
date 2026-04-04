import {
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings = [], confrimedStays = [], days, cabinCount }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const checkins = confrimedStays.length;

  const occupation =
    confrimedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (days * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check Ins"
        color="indigo"
        icon={<HiOutlineCalendar />}
        value={checkins}
      />
      <Stat
        title="occupation rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupation * 100)}%`}
      />
    </>
  );
}

export default Stats;
