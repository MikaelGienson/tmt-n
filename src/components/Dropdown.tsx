import "./Dropdown.scss";
import { ITableData } from "../interfaces/Interfaces";
import React, { useState, useRef, useEffect, MouseEventHandler } from "react";
import { MouseEvent } from 'react';

interface DropdownProps {
  options: ITableData[];
  prompt: string;
  value: string | null;
  onChange: (a: string | null ) => void;
  id: string;
  label: "TR" | "assignee" | "testSuiteName" | "startDate" | "endDate" | "version" | "id" 
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
  }

  

  // handles closing dropdown on click outside
  useEffect(() => {
      document.addEventListener("click", toggle);
    return () =>
        document.removeEventListener("click", toggle);
      ;
    }, []);

  // filters input array by typed query
  function filter(options: ITableData[]): ITableData[] {
    return options.filter(
      (option: ITableData) =>
        option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  // handles selecting option from the dropdown
  function selectOption(option: ITableData) {
    setQuery("");
    onChange(option[label]);
    setOpen(false);
  }

  // displays the value in the placeholder
  function displayValue(): string {
    if (query.length > 0) return query;
    if (value) return value;
    return "";
  }
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
              setQuery(e.target.value);
              onChange(null);
            }}
            onClick={() => toggle}
          />
        </div>
        <div className={`arrow ${open ? "open" : null}`} />
      </div>
      <div className={`options ${open ? "open" : null}`}>
        {filter(options).map((option: ITableData) => (
          <div
            key={option[id]}
            className={`option ${value === option[label] ? "selected" : null}`}
            onClick={() => selectOption(option)}
           
          >
            {option[label]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
