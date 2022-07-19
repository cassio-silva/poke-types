import styled from "styled-components";
import { useWindowSize } from "../hooks/useWindowSize";

export function Footer() {
  const { width } = useWindowSize();

  if (width >= 768) {
    return (
      <FooterWrapper>
        rodapé
      </FooterWrapper>
    )
  } else {
    return (
      <></>
    )
  }
}

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 2rem;
`;