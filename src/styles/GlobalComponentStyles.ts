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
  background: linear-gradient(-5deg, ${props => props.theme.color.green[200]} 50%, ${props => props.theme.color.greenLight[100]} 100%);

  @media (max-width: 440px) {
    padding: 1rem 1rem 10rem;
  }
`;

export const Title = styled.h1`
  font-family: ${props => props.theme.font.Poppins};
  font-size: 3.25rem;
  line-height: 3.25rem;
  text-align: center;
  width: 100%;
  
  color: ${props => props.theme.color.yellow[100]};
  
  text-shadow: 0px 0px 5px #000;
  
  @media (min-width: 440px) {
    font-size: 4rem;
    line-height: 3.75rem;
  }
`;