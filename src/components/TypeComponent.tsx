import { useEffect, useState } from "react";
import styled from "styled-components";

type TypeAdvantages = {
  typeLabel: string;
  img: string;
  advantages: string[];
  disadvantages: string[];
}

export function TypeComponent({ img, typeLabel, advantages, disadvantages }: TypeAdvantages) {
  const [selected, setSelected] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function handleSelectedType() {
    if (selected === "") {
      setSelected(typeLabel)
      setIsOpen(true);
    } else {
      setSelected("")
      setIsOpen(false);
    }
  }

  function handleTypeRender(typeArray: Array<string>) {
    if (typeArray.length < 1) {
      return (
        <span>None</span>
      )
    } else {
      return (
        typeArray.map((item, index) => (
          <img key={index} src={`assets/${item}.png`} alt={item} />
        ))
      )
    }
  }

  return (
    <Container
      tabIndex={0}
      onClick={handleSelectedType}
    >
      <TypeIcon src={img} alt={typeLabel} draggable="false" />

      <Modal
        className={isOpen && "active"}
      >
        <div className="content">

          <strong>{typeLabel}</strong>
          <span className="green">Strong Against</span>
          <Advantages break={advantages.length}>
            {handleTypeRender(advantages)}
          </Advantages>

          <span className="red">Weak Against</span>
          <Disadvantages break={disadvantages.length}>
            {handleTypeRender(disadvantages)}
          </Disadvantages>
          <p>{"< tap to close >"}</p>
        </div>
      </Modal>

    </Container>
  )
}

const Container = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  width: 90%;
  background: #fff;
  box-shadow: 0px 3px 15px rgba(0,0,0,0.35);
  border-radius: 150px;
  border: none;

  padding: 1rem;
  margin: 0.5rem;

  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  
  position: relative;
  transition: 0.1s;

  &:hover {
    box-shadow: 0px 0px 1.5rem rgb(255, 255, 255);
  }
`;

const TypeIcon = styled.img`
  width: 100%;
`;

const Modal = styled.div<any>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 120%;
  max-height: 0px;
  
  padding: 0rem;
  background-color: #fff;
  border-radius: 150px;
  box-shadow: 0px 3px 15px rgba(0,0,0,0.35);
  
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  z-index: 30;  
  
  transition: 0.3s;
  
  &.active {
    max-height: 320px;
    padding: 1rem;
    border-radius: 6px;
  }
  
  & > div.content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  @media (max-width: 768px) {
    left: -10%;
  }
  p {
    font-size: 0.875rem;
    color: ${props => props.theme.color.gray[200]};
  }

  span {
    color: ${props => props.theme.color.gray[200]};
    padding: 2px 8px;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: bold;
    margin-top: 0.5rem;
    
    &.green {
      color: #fff;
      background: linear-gradient(90deg, ${props => props.theme.color.greenLight[100]} 10%, ${props => props.theme.color.green[100]} 60%);
      margin-top: 0;
    }
    &.red {
      color: #fff;
      background: linear-gradient(90deg, ${props => props.theme.color.red[50]} 10%, ${props => props.theme.color.red[300]} 60%);
      margin-top: 0;
    }

    @media (max-width: 375px) {
      font-size: 0.875rem;
    }
  }  
  
  strong {
    font-size: 1.75rem;
    text-align: center;
    text-transform: capitalize;
    margin: 0 auto 1rem;
  }
`;

const Advantages = styled.div<any>`
  display: grid;

  grid-template-columns: repeat(${props => props.break <= 4 ? props.break : 3}, 1fr);
  grid-template-rows: 1fr;
  position: relative;

  margin-bottom: 1rem;
  width: 100%;
  
  img {
    width: 2.5rem;
    margin: 8px auto 0;
  }
`;

const Disadvantages = styled(Advantages)`
  &::after {
    border: none;
  }
`;