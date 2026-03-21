import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isPending: isSigningup } = useSignup();

  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
    signup({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "This field is required",
          })}
          disabled={isSigningup}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: { value: /\S+@\S+\.\S+/, message: "Invalid Email" },
          })}
          disabled={isSigningup}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: { value: 8, message: "Pass length is short" },
          })}
          disabled={isSigningup}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
          disabled={isSigningup}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isSigningup}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isSigningup}>
          {isSigningup ? <SpinnerMini /> : "Create new user"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
