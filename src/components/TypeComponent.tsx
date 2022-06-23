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

  // useEffect(() => {
  //   console.log(selected);
  // }, [selected])

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
          {advantages.map((item, index) => (
            <Advantages break={advantages.length}>
              <img key={index} src={`assets/${item}.png`} alt={item} />
            </Advantages>
          ))}

          <span className="red">Weak Against</span>
          {disadvantages.map((item, index) => (
            <Disadvantages break={disadvantages.length}>
              <img key={index} src={`assets/${item}.png`} alt={item} />
            </Disadvantages>
          ))}
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
  background-color: white;
  box-shadow: 0px 3px 15px rgba(0,0,0,0.35);
  border-radius: 150px;
  border: none;

  padding: 1rem;
  margin: 0.5rem;

  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
`;

const TypeIcon = styled.img`
  width: 100%;
`;

const Modal = styled.ul<any>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 120%;
  max-height: 0px;
  
  padding: 0rem;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 3px 15px rgba(0,0,0,0.35);
  
  position: absolute;
  overflow: hidden;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  z-index: 30;  
  
  transition: 0.5s;
  
  &.active {
    max-height: 320px;
    padding: 1rem;
  }
  
  & > div.content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  span {
    color: #737373;
    padding: 2px 8px;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: bold;
    margin-top: 0.5rem;
    
    &.green {
      color: #fff;
      background-color: ${props => props.theme.color.green[100]};
      margin-top: 0;
    }
    &.red {
      color: #fff;
      background-color: ${props => props.theme.color.red[100]};
      margin-top: 0;
    }
  }  
  
  strong {
    font-size: 1.75rem;
    text-align: center;
    text-transform: capitalize;
    margin: 0 auto 1rem;
  }
`;

const Advantages = styled.li<any>`
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