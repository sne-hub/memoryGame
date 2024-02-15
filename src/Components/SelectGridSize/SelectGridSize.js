import Select from "react-select";
import { useDispatch } from "react-redux";
import { setGridSize } from "../../redux/actions";
import "./SelectGridSize.css";

const options = [
  { value: "4", label: "2x2" },
  { value: "6", label: "3x2" },
  { value: "12", label: "3x4" },
];

const SelectGridSize = ({ gridSize }) => {
  const dispatch = useDispatch();

  const handleSelectChange = (selectedOption) => {
    dispatch(setGridSize(selectedOption.value));
  };

  return (
    <div className="select-grid-div">
      <Select
        options={options}
        placeholder="Select grid-size"
        onChange={handleSelectChange}
        value={gridSize}
      />
    </div>
  );
};

export default SelectGridSize;
