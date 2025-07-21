import React, { useState } from "react";

// TreeNode Component
const TreeNode = ({ label, children, showCheckbox = false, onCheck }) => {
  const [expanded, setExpanded] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleCheck = (e) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    if (onCheck) {
      onCheck(label, isChecked);
    }
  };

  return (
    <div className="ml-4">
      <div
        className="flex items-center gap-2 cursor-pointer font-semibold"
        onClick={() => setExpanded(!expanded)}
      >
        {children ? (expanded ? "- " : "+ ") : "• "}

        {showCheckbox && (
          <input
            type="checkbox"
            checked={checked}
            onChange={handleCheck}
            onClick={(e) => e.stopPropagation()}
          />
        )}

        <span>{label}</span>
      </div>

      {expanded && children && (
        <div className="ml-4">
          {children.map((child, index) => (
            <TreeNode
              key={index}
              {...child}
              showCheckbox={child.showCheckbox ?? showCheckbox}
              onCheck={onCheck}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Main Tree Component
const Tree = () => {
  const [selected, setSelected] = useState([]);

  const handleCheck = (label, isChecked) => {
    setSelected((prev) =>
      isChecked ? [...prev, label] : prev.filter((item) => item !== label)
    );
  };

  const treeData = {
    label: "Citrus",
    showCheckbox: true,
    children: [
      {
        label: "Orange",
        showCheckbox: true,
        children: [{ label: "Lemon", showCheckbox: true }],
      },
    ],
  };

  return (
    <div>
      <h2>Fruit Tree</h2>
      <TreeNode {...treeData} onCheck={handleCheck} />

      <h3 className="mt-4 font-bold">Selected:</h3>
      {selected.length === 0 ? (
        <p>None</p>
      ) : (
        <ul>
          {selected.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Tree;
