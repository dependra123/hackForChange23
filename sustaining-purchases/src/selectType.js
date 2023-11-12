import React, { useState } from "react";
import { setUserType } from "./firebase";

function SelectType() {
  const [selectedType, setSelectedType] = useState("");

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleTypeSubmit = (event) => {
    event.preventDefault();
    setUserType(selectedType);
  };
  return (
    <form onSubmit={handleTypeSubmit}>
        <label>
            Select Type:
            <select value={selectedType} onChange={handleTypeChange}>
                <option value="">--Please choose an option--</option>
                <option value="farmer">Farmer</option>
                <option value="returner">Restaurant</option>
            </select>
        </label>
        <button type="submit">Submit</button>
    </form>
  );

  // Rest of the code...
}
export default SelectType;
