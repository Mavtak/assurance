import { ChangeEventHandler } from "react";

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
    <div>
      <input style={{ border: "1px solid black" }} onChange={handleChange} value={value} />
      <button onClick={handleReset}>Reset Search</button>
    </div>
  )
};

export default SearchField;
