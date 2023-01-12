import styled, { css } from "styled-components";

// Styled components
export const Content = styled.main<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const TypeFilter = styled.section<any>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 8px;
  width: ${props => props.theme};

  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  
  padding: 8px;
  margin-bottom: 2rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
`;

export const ButtonType = styled.button<any>`
  display: flex;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 4px solid #fff;

  filter: brightness(0.675);
  transition: 0.3s;

  ${props => props.selected && css`
    filter: brightness(1);
    box-shadow: 0px 0px 15px #fff;
  `}
    
  & > img {
    width: 100%;
    height: 100%;
  }
    
  &:hover {
    transform: scale(115%);
    filter: saturate(1.5) brightness(1);
  }
`;

export const ButtonClear = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: #fff;
  padding: 8px 24px;
  border-radius: 20px;
  margin-bottom: 8px;
  border: none;
  background: radial-gradient(circle at left top, ${props => props.theme.color.greenLight[100]} 0%, ${props => props.theme.color.blue[300]} 90%);

  font-family: ${props => props.theme.font.Poppins};
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 100%;

  transition: all 0.2s;

  &:hover {
    background: radial-gradient(circle at left top, ${props => props.theme.color.red[100]} 0%, ${props => props.theme.color.blue[300]} 100%);
  }
`;

export const ErrorMessage = styled.span`
  display: flex;
  background: ${props => props.theme.color.red[300]};
  margin: 1rem auto;
  padding: 0.5rem 1.25rem;
  color: #fff;
  font-family: ${props => props.theme.font.Poppins};
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 110%;
  box-sizing: border-box;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const LoadingImage = styled.img`
  width: 80px;
  height: 80px;
  margin: 2rem auto 0;

  animation: spinning 0.5s linear infinite;

  @keyframes spinning {
    0% {transform: rotate(0deg)}
    100% {transform: rotate(359deg)}
  }
`;