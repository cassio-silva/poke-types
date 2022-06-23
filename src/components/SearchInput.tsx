import { InputHTMLAttributes } from "react";
import styled from "styled-components";

export function SearchInput({ ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Input
      {...rest}
      type="text"
      placeholder="Enter a pokemon type..."
    />
  )
}

const Input = styled.input`
  max-width: 34rem;
  width: 90%;
  height: 2.75rem;

  font-size: 1.25rem;
  color: #000;
  
  margin: 2rem auto 1rem;
  padding: 0.25rem 1rem;
  background: transparent;
  
  border: 2px solid #fff;
  border-radius: 50px;
  
  transition: 0.3s;
  
  &::placeholder {
    font-size: 1.5rem;
    color: rgba(200, 200, 200, 1);
  }

  &:focus {
    background: #fff;
    outline: none;
  }
`;