import styled, { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${props => props.theme.font.Roboto};
    background-color: ${props => props.theme.color.blue[300]};
    overflow-x: hidden;
  }

  button {
    cursor: pointer;
  }
`;