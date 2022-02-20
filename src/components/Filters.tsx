import Dropdown from "./Dropdown";
import { ITableData, IColumns } from "../interfaces/Interfaces";
import { useState, useContext, useMemo, useEffect } from "react";
import { TestContext, ITestContext } from "../context/TestContext";
import "./Filters.scss";

interface ISortAndFilterProps {
  data: ITableData[];
}

const Filters = ({ data }: ISortAndFilterProps) => {
  
  const [assigneeValue, setAssigneeValue] = useState<string | null>(null);
  const [testSuiteNameValue, setTestSuiteNameValue] = useState<string | null>(null);
  const [startDateFromValue, setStartDateFromValue] = useState<string | null>(null);
  const [endDateFromValue, setEndDateFromValue] = useState<string | null>(null);
  const [versionValue, setVersionValue] = useState<string | null>(null);
  const [startDateToValue, setStartDateToValue] = useState<string | null>(null);
  const [endDateToValue, setEndDateToValue] = useState<string | null>(null);

  return (
    <div className="dropdown-container">
      <Dropdown
        options={data}
        prompt="Select Assignee"
        value={assigneeValue}
        onChange={(val) => setAssigneeValue(val)}
        id="id"
        label="assignee"
      />
      <Dropdown
        options={data}
        prompt="Select Test Suite Name"
        value={testSuiteNameValue}
        onChange={(val) => setTestSuiteNameValue(val)}
        id="id"
        label="testSuiteName"
      />
      <Dropdown
        options={data}
        prompt="Select Start Date From"
        value={startDateFromValue}
        onChange={(val) => setStartDateFromValue(val)}
        id="id"
        label="startDate"
      />
      <Dropdown
        options={data}
        prompt="Select End Date From"
        value={endDateFromValue}
        onChange={(val) => setEndDateFromValue(val)}
        id="id"
        label="endDate"
      />
      <Dropdown
        options={data}
        prompt="Select Version"
        value={versionValue}
        onChange={(val) => setVersionValue(val)}
        id="id"
        label="version"
      />
      <div>Failed Passed All</div>
      <Dropdown
        options={data}
        prompt="Select Start Date To"
        value={startDateToValue}
        onChange={(val) => setStartDateToValue(val)}
        id="id"
        label="startDate"
      />
      <Dropdown
        options={data}
        prompt="Select End Date To"
        value={endDateToValue}
        onChange={(val) => setEndDateToValue(val)}
        id="id"
        label="endDate"
      />
    </div>
  );
};

export default Filters;
