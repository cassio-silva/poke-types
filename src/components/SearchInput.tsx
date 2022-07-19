import { InputHTMLAttributes, useContext } from "react";
import styled from "styled-components";
import { LanguageContext } from "../contexts/LanguageContext";

export function SearchInput({ ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  const { langContent } = useContext(LanguageContext)
  return (
    <Input
      {...rest}
      type="text"
      placeholder={langContent.searchPlaceholder}
    />
  )
}

const Input = styled.input`
  max-width: 34rem;
  width: 80%;
  height: 2.75rem;

  font-size: 1.25rem;
  color: #000;
  
  margin: 3rem auto 1rem;
  padding: 0.25rem 1rem;
  background: #fff;
  
  border: 3px solid #fff;
  border-radius: 50px;
  
  transition: 0.3s;

  &::placeholder {
    font-size: 1.5rem;
    color: ${props => props.theme.color.gray[200]};
    text-align: center;
  }
  
  &:focus {
    outline: none;
    border-color: #ddd7a2;

    &::placeholder {
      color: ${props => props.theme.color.gray[100]};
    }
  }
`;