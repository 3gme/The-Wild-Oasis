import styled, { css } from "styled-components";
// import Input from "./Input";

const StyledFormRow = styled.div`
  ${(props) =>
    props.direction !== "vertical" &&
    css`
      display: grid;
      align-items: center;
      grid-template-columns: 24rem 1fr 1.2fr;
      gap: 2.4rem;

      &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
      }
    `}
  ${(props) =>
    props.direction === "vertical" &&
    css`
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    `}

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, direction = "horezontal", children }) {
  return (
    <StyledFormRow direction={direction}>
      {label && <Label htmlFor={children.props?.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
