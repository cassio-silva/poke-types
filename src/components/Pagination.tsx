import styled from "styled-components";

type PaginationProps = {
  getNextPage: () => void;
  getPreviousPage: () => void;
}

export function Pagination({ getNextPage, getPreviousPage }: PaginationProps) {
  return (
    <Container>
      <button onClick={getPreviousPage}>{"<"}</button>
      <button onClick={getNextPage}>{">"}</button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 10rem;

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    color: #fff;
    padding: 12px 16px;
    border-radius: 20px;
    border: none;
    background: radial-gradient(circle at left top, ${props => props.theme.color.greenLight[100]} 0%, ${props => props.theme.color.blue[300]} 90%);

    font-family: ${props => props.theme.font.Poppins};
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 100%;

    &:hover {
      background: radial-gradient(circle at left top, ${props => props.theme.color.red[100]} 0%, ${props => props.theme.color.blue[300]} 100%);
    }
  }

  span {
    font-family: ${props => props.theme.font.Poppins};
    margin: 0 1rem;
    width: 1.5rem;

    font-weight: bold;
    font-size: 1.25rem;
    color: #fff;
  }
`;