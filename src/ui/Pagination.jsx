import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { PAGE_SIZE } from "../utils/constants";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  ${(props) =>
    props.$hide &&
    css`
      display: none;
    `}
`;

function Pagination({ count }) {
  const [params, setParams] = useSearchParams();
  const currentPage =
    params.get("page") === null ? 1 : Number(params.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function handleNext() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    params.set("page", next);
    setParams(params);
  }
  function handlePrev() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    params.set("page", prev);
    setParams(params);
  }

  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <p>
        showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>
          {currentPage * PAGE_SIZE > count ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        from <span>{count}</span> results
      </p>

      <Buttons>
        <PaginationButton onClick={handlePrev} $hide={currentPage === 1}>
          <HiChevronLeft />
          <span>Prev</span>
        </PaginationButton>
        <PaginationButton
          onClick={handleNext}
          $hide={currentPage === pageCount}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
