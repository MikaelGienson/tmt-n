import "./Dropdown.scss";
import { ITableData } from "../interfaces/Interfaces";
import React, { useState, useRef, useEffect, useMemo } from "react";
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

  const toggleDropdown: EventListener = (e: MouseEvent | Event) => {
    e.preventDefault();
    setOpen(e && e.target === ref.current);
  };

  // handles closing dropdown on click outside
  useEffect(() => {
    document.addEventListener("click", toggleDropdown);
    return () => document.removeEventListener("click", toggleDropdown);
  }, []);

  function selectDropdownOption(option: ITableData) {
    onChange(option[label]);
    setOpen(false);
  }

  // list of displayed values in the dropdown
  const filteredDropdownOptions = options.map((option: ITableData) => (
    <div
      key={option[id]}
      className={`option ${value === option[label] ? "selected" : null}`}
      onClick={() => selectDropdownOption(option)}
    >
      {option[label]}
    </div>
  ));

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    onChange("");
  }

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
            value={value}
            onChange={(e) => {
              handleOnChange(e);
              setOpen(true);
            }}
            onClick={() => toggleDropdown}
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
