import styled from "styled-components";
import { ButtonCustom } from "styles/pages/pokemon/styles";

type PaginationProps = {
  getNextPage: () => void;
  getPreviousPage: () => void;
  currentPage: number;
}

export function Pagination({ getNextPage, getPreviousPage, currentPage }: PaginationProps) {
  return (
    <Container>
      <ButtonCustom onClick={getPreviousPage} disabled={currentPage <= 1}>{"<"}</ButtonCustom>
      <span>{currentPage}</span>
      <ButtonCustom onClick={getNextPage}>{">"}</ButtonCustom>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;

  margin-top: 2rem;

  span {
    text-align: center;
    font-family: ${props => props.theme.font.Poppins};
    margin: 0 1rem;
    width: 1.5rem;

    font-weight: bold;
    font-size: 1.25rem;
    color: #fff;
  }
`;