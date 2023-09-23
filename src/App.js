import React, { useState } from "react";

const foodItems = [
  { name: "Burger", price: 5.99 },
  { name: "Pizza", price: 8.99 },
  { name: "Fries", price: 2.99 }
  // Add more food items here
];

const extraDrinkCost = 1.99;

export function App() {
  const [selectedItems, setSelectedItems] = useState([]);

  // Function to handle when a checkbox is clicked
  const handleCheckboxChange = (itemName, isChecked) => {
    if (isChecked) {
      // Add the item to the selectedItems array if it doesn't already exist
      if (!selectedItems.includes(itemName)) {
        setSelectedItems([...selectedItems, itemName]);
      }
    } else {
      // Remove the item from the selectedItems array
      setSelectedItems(selectedItems.filter((item) => item !== itemName));
    }
  };

  // Calculate the total cost based on selected items and extra drink
  const totalCost =
    selectedItems.reduce((total, itemName) => {
      const selectedItem = foodItems.find((item) => item.name === itemName);
      if (selectedItem) {
        total += selectedItem.price;
      }
      return total;
    }, 0) + (selectedItems.includes("Add Extra Drink") ? extraDrinkCost : 0);

  return (
    <div className="App">
      <h1>Food Order</h1>

      {foodItems.map((item) => (
        <div key={item.name}>
          <label>
            <input
              type="checkbox"
              checked={selectedItems.includes(item.name)}
              onChange={(e) =>
                handleCheckboxChange(item.name, e.target.checked)
              }
            />
            {item.name} - ${item.price.toFixed(2)}
          </label>
          <br />
        </div>
      ))}

      <label>
        <input
          type="checkbox"
          checked={selectedItems.includes("Add Extra Drink")}
          onChange={(e) =>
            handleCheckboxChange("Add Extra Drink", e.target.checked)
          }
        />
        Add Extra Drink - ${extraDrinkCost.toFixed(2)}
      </label>

      <div className="total-cost">
        <br />
        Total Cost: ${totalCost.toFixed(2)}
      </div>
    </div>
  );
}
