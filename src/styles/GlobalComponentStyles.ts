import styled from "styled-components";

export const GlobalContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  overflow-x: hidden;

  padding: 7rem 1rem 4rem;
  background: linear-gradient(-5deg, ${props => props.theme.color.green[200]} 30%, ${props => props.theme.color.greenLight[100]} 100%);
`;

export const Title = styled.h1`
  font-size: 4rem;
  text-align: center;
  width: 100%;

  color: ${props => props.theme.color.yellow[100]};

  /* -webkit-text-fill-color: ${props => props.theme.color.yellow[300]};
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: ${props => props.theme.color.blue[300]}; */

  @media (max-width: 440px) {
    font-size: 3.5rem;
  }
`;