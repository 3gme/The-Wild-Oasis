import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import Button from "../../ui/Button";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { register, handleSubmit } = useForm();

  const {
    settings: {
      breakfastPrice,
      maxBookingLength,
      maxGuestsPerBooking,
      minBookingLength,
    } = {},
    isLoadingSetting,
  } = useSettings();
  const { isUpdating, updateSettings } = useUpdateSettings();
  const isWorking = isLoadingSetting || isUpdating;

  if (isLoadingSetting) return <Spinner />;
  ///////
  // function onSubmit(data) {
  //   updateSettings(data);
  // }

  // function onError(err) {
  //   console.log(err);
  // }

  function handleUpdate(e, field) {
    const value = e.target.value;
    updateSettings({ [field]: value });
  }

  return (
    //////
    // <Form onSubmit={handleSubmit(onSubmit, onError)}>
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          //////
          // {...register("minBookingLength", {
          //   required: "This field is required",
          // })}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          //////
          // {...register("minBookingLength", {
          //   required: "This field is required",
          // })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
          //////
          // {...register("minBookingLength", {
          //   required: "This field is required",
          // })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          //////
          // {...register("minBookingLength", {
          //   required: "This field is required",
          // })}
          disabled={isWorking}
        />
      </FormRow>
      {/* ///// */}
      {/* <Button variations={"primary"} disabled={isWorking}>
        Update
      </Button> */}
    </Form>
  );
}

export default UpdateSettingsForm;
