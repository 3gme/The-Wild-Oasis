import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import toast from "react-hot-toast";

function LoginForm() {
  const [email, setEmail] = useState("myName@gmail.com");
  const [password, setPassword] = useState("12345678");

  const { login, isPending } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) toast.error("Type the email first");
    if (!password) toast.error("No password included..!");
    if (!email || !password) return;
    login({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address" direction="vertical">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />
      </FormRow>
      <FormRow label="Password" direction="vertical">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
      </FormRow>
      <FormRow direction="vertical">
        <Button size="large" disabled={isPending}>
          {isPending ? <SpinnerMini /> : "Login"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
