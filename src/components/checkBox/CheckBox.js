import React from "react";
import { Checkbox } from "antd";
import "./checkBox.css";
import { useState } from "react";

function CheckBox(props) {
  const defaultCategories = [
    { _id: 1, name: "Tablets" },
    { _id: 2, name: "Smartphone" },
    { _id: 3, name: "Laptop" },
    { _id: 4, name: "Smart TV" },
  ];

  const [checkedCategories, setCheckedCategories] = useState([]);

  const handleToggle = (category) => {
    // if a category is checked it is added in newChecked array else removed from the array
    const currentIndex = checkedCategories.indexOf(category);
    const newChecked = [...checkedCategories];

    if (currentIndex === -1) {
      newChecked.push(category);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedCategories(newChecked);

    props.handleFilters(newChecked);
  };

  return (
    <div>
      <div className="categories__wrapper">
        {defaultCategories.map((category) => (
          <div className="checkbox__wrapper">
            <Checkbox
              type="checkbox"
              onChange={() => handleToggle(category._id)}
              checked={
                checkedCategories.indexOf(category._id) === -1 ? false : true
              }
            />
            <label htmlFor={category.name}>{category.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CheckBox;
