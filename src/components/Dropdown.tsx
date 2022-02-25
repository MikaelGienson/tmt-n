import "./Dropdown.scss";
import { ITableData } from "../interfaces/Interfaces";
import React, { useState, useRef, useEffect } from "react";
import { MouseEvent } from "react";

interface DropdownProps {
  options: ITableData[];
  prompt: string;
  value: string;
  onChange: (a: string) => void;
  id: string;
  label:
    | "TR"
    | "assignee"
    | "testSuiteName"
    | "startDate"
    | "endDate"
    | "version"
    | "id";
}

const Dropdown = ({
  options,
  prompt,
  value,
  onChange,
  id,
  label
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const ref = useRef<HTMLInputElement>(null);

  // toggles on and off the dropdown on click
  const toggle: EventListener = (e: MouseEvent | Event) => {
    e.preventDefault();
    setOpen(e && e.target === ref.current);
  };

  // handles closing dropdown on click outside
  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  // handles selecting option from the dropdown
  function selectOption(option: ITableData) {
    onChange(option[label]);
    setOpen(false);
  }

  // displays the value in the placeholder
  function displayValue(): string {
    if (value) return value;
    return "";
  }

  // list of displayed values in the dropdown
  const filteredDropdownOptions = options.map((option: ITableData) => (
    <div
      key={option[id]}
      className={`option ${value === option[label] ? "selected" : null}`}
      onClick={() => selectOption(option)}
    >
      {option[label]}
    </div>
  ));

  useEffect(() => {
    onChange(query);
  }, [query]);

  return (
    <div className="dropdown">
      <div className="control">
        <div className="selected-value">
          <label>{prompt}</label>
          <input
            ref={ref}
            type="text"
            placeholder={value ? value : prompt}
            value={displayValue()}
            onChange={(e) => {
              setOpen(true);
              setQuery(e.target.value);
            }}
            onClick={() => toggle}
          />
        </div>
        <div className={`arrow ${open ? "open" : null}`} />
      </div>
      <div className={`options ${open ? "open" : null}`}>
        {filteredDropdownOptions}
      </div>
    </div>
  );
};

export default Dropdown;
