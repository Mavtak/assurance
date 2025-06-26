import { ChangeEventHandler } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;

  max-width: 250px;
`

const Input = styled.input`
  width: 100%;

  border: 1px solid black;
  border-radius: 3px;
  padding: 6px;
  padding-right: 22px;
`

const ResetButton = styled.button`
  position: absolute;
  top: 6px;
  bottom: 6px;
  right: 6px;
  font-weight: 700;
`

type Props = {
  onChange: (newValue: string) => void;
  value: string;
};

const SearchField = ({onChange, value}: Props) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.target.value;

    onChange(newValue);
  };

  const handleReset = () => {
    onChange('');
  };


  return (
    <Container>
      <Input
        onChange={handleChange}
        placeholder="Describe what you need"
        value={value}
      />
      {
        value && (
          <ResetButton onClick={handleReset}>×</ResetButton>
        )
      }
    </Container>
  )
};

export default SearchField;
