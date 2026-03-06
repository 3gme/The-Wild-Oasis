import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { createCabin } from "../../services/apiCabins";

function CreateCabinForm({ cabinToEdit }) {
  // react-hook-form
  // register: to handle the states of the input and to set some validation and errors
  // handleSubmit: we call it in the onSubmit of the form and it takes two parameteres
  //  1- onSubmit: and in this function we can accept an argument (data) that have the data of the form
  //  2- onError: this function can accept an argument (erros) that contains the erros from the validation from the register
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  // -------------------------------------------
  // react-query
  // first--> here we want to upload some data to the database so we use useMutation() hook for this
  //
  // this takes an object contains alot of attributes the most important is
  //  mutationFn: ....., this takes the function that make the changes
  //  onSucces: ....., what to do if the changes are done correctly
  //  onError: ....., what to do if some error happend and this take a call back function with and error parameter that have the specific error happend
  //
  const queryClint = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (newCabin) => createCabin(newCabin),

    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClint.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  // arguments of the handleSubmit of the form
  function onSubmit(data) {
    // Note: images are sent as fileList so we chose the first element as it's out image
    mutate({ ...data, image: data.image[0] });
  }
  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow error={errors?.name?.message} label="Cabine name">
        <Input
          type="text"
          id="name"
          disabled={isPending}
          {...register("name", {
            required: "This field is requird",
          })}
        />
      </FormRow>

      <FormRow error={errors?.maxCapacity?.message} label="Max capacity">
        <Input
          type="number"
          id="maxCapacity"
          disabled={isPending}
          {...register("maxCapacity", {
            required: "This field is requird",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isPending}
          {...register("regularPrice", {
            required: "This field is requird",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isPending}
          defaultValue={0}
          {...register("discount", {
            required: "This field is requird",
            validate: (value) => {
              return (
                +value < +getValues().regularPrice ||
                "Discount should be less than the regular price"
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isPending}
          {...register("description", { required: "This field is requird" })}
        />
      </FormRow>

      <FormRow label={"Cabin photo"} error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isPending}
          {...register("image", {
            required: "This field is requird",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variations="secondary" type="reset" disabled={isPending}>
          Cancel
        </Button>
        <Button disabled={isPending}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
