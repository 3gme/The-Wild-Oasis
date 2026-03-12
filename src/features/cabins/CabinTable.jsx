import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";

import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, cabins } = useCabins();

  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";

  if (isLoading) return <Spinner />;
  if (cabins.length === 0) return <Empty resource={"bookings"} />;

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter?.((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter?.((cabin) => cabin.discount !== 0);

  // Default to sorting by name so we don’t try to sort by a non‑existing field.
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = [...filteredCabins].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    if (aValue == null || bValue == null) return 0;

    // String sorting (e.g. name)
    if (typeof aValue === "string" && typeof bValue === "string") {
      return (
        modifier *
        aValue.localeCompare(bValue, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      );
    }

    // Numeric sorting (e.g. price / capacity / discount)
    if (typeof aValue === "number" && typeof bValue === "number") {
      return modifier * (aValue - bValue);
    }

    // Fallback: try coercing to number
    const aNum = Number(aValue);
    const bNum = Number(bValue);
    if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) {
      return modifier * (aNum - bNum);
    }

    return 0;
  });

  return (
    <Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header role="row" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={sortedCabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      ></Table.Body>
    </Table>
  );
}

export default CabinTable;
