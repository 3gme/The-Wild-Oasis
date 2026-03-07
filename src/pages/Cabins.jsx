import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CreateCabinForm from "../features/cabins/CreateCabinForm v1";

function Cabins() {
  const [show, setShow] = useState();

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />

        <Button onClick={() => setShow((show) => !show)}>Show Form</Button>
        {show && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
