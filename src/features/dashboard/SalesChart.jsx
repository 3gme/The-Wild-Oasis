import { useMemo } from "react";
import styled from "styled-components";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, eachDayOfInterval, parseISO, subDays } from "date-fns";
import DashboardBox from "./DashboardBox";
import { formatCurrency } from "../../utils/helpers";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  .recharts-cartesian-grid-horizontal line,
  .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }

  .recharts-tooltip-wrapper {
    font-size: 1.2rem;
  }
`;

function buildSalesData(bookings, days) {
  const startDate = subDays(new Date(), days - 1);
  const dateRange = eachDayOfInterval({ start: startDate, end: new Date() });

  const dailyMap = dateRange.reduce((acc, date) => {
    const label = format(date, "MMM d");
    acc[label] = { date, label, totalSales: 0, extrasSales: 0 };
    return acc;
  }, {});

  bookings.forEach((booking) => {
    if (!booking.created_at) return;
    const created = parseISO(booking.created_at);
    const label = format(created, "MMM d");

    if (!(label in dailyMap)) return;

    const total = Number(booking.totalPrice || 0);
    const extras = Number(booking.extrasPrice || 0);

    dailyMap[label].totalSales += total;
    dailyMap[label].extrasSales += extras;
  });

  return Object.values(dailyMap);
}

function SalesChart({ bookings = [], dashboardRange = 30 }) {
  const data = useMemo(
    () => buildSalesData(bookings, dashboardRange),
    [bookings, dashboardRange],
  );

  return (
    <StyledSalesChart>
      <h3>Sales</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorExtras" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: "var(--color-grey-700)" }}
          />
          <YAxis
            tickFormatter={(val) => `$${val}`}
            tick={{ fontSize: 12, fill: "var(--color-grey-700)" }}
          />
          <Tooltip
            formatter={(value) => formatCurrency(value)}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Area
            type="monotone"
            dataKey="totalSales"
            stroke="#4f46e5"
            fillOpacity={1}
            fill="url(#colorTotal)"
            name="Total Sales"
          />
          <Area
            type="monotone"
            dataKey="extrasSales"
            stroke="#22c55e"
            fillOpacity={1}
            fill="url(#colorExtras)"
            name="Extras"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
