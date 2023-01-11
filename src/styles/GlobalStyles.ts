import styled, { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${props => props.theme.font.Roboto};
    background-color: ${props => props.theme.color.green[200]};
    overflow-x: hidden;

    ::-webkit-scrollbar {
      width: 0.75rem;
      background: rgba(200,200,200,0.25);
    }
    ::-webkit-scrollbar-track {
      background: rgba(0,0,0,0);
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background: rgba(0,0,0,0.35);
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(0,0,0,0.5);
    }
  }

  button {
    cursor: pointer;
  }
`;