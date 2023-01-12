import styled, { css } from "styled-components";

export const Content = styled.section<any>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: ${props => props.theme.font.Poppins};

  width: 95%;
  max-width: 40rem;
  margin-top: 2rem;
  
  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    color: #FFF;
    text-align: center;
  }
  span {
    height: 0;
    font-weight: bold;
    overflow: hidden;
    transition: 0.2s;
    color: #ffbf00;
    text-align: center;
    
    &.alert {
      height: 55px;
    }
  }
  p {
    color: ${props => props.theme.color.gray[50]};
    text-align: center;
  }

  @media (min-width: 768px) {
    span {
      &.alert {
      height: 30px;
    }
    }
  }
`;

export const GymTimeForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 1rem auto;
  position: relative;

  input {
    width: 7rem;
    height: 4rem;
    font-size: 1.5rem;
    font-weight: 600;
    border: none;

    & + input {
      margin-left: 4px;
    }

    &::placeholder {
      font-size: 1rem;
    }
    
    &:first-child {
      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;
      padding-left: 2rem;
      padding-right: 8px;
      
      &::placeholder {
        text-align: right;
      }
    }
    &:last-child {
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
      padding-left: 8px;
      padding-right: 1.75rem;
      
      &::placeholder {
        text-align: left;
      }
    }
  }
`;

export const Separator = styled.div<any>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: 2rem auto;
  width: 14rem;

  button {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    
    border: none;
    border-radius: 50%;
    width: 7rem;
    height: 7rem;
    background: transparent;
    position: relative;

    transition: 0.2s;
    box-sizing: border-box;

    animation: 0.5s btnAnimation ease-in-out;

    img {
      width: 100%;
      height: 100%;
    }

    &:hover {
      filter: brightness(1.2);
      transform: rotate3d(360deg);
    }

    @keyframes btnAnimation {
      from {
        transform: scale(95%);
      }
      to {
        transform: scale(100%);
      }
    }
  }

  & > span {
    font-size: 4rem;
    line-height: 90%;
    font-weight: 800;
    color: #FFF;
    width: 5.5rem;
    height: fit-content;
    animation: ${props => props.isShown && "1s fadeIn ease-in-out"};
    transition: 0.2s;
    text-align: unset;

    ${props => props.coins && css`
      transform: translateX(1%);
    `}
  }
  @keyframes fadeIn {
    0% {opacity: 0}
    100% {opacity: 1}
  }
`;