import Dropdown from "./Dropdown";
import { ITableData, IColumns } from "../interfaces/Interfaces";
import { useState, useContext, useMemo, useEffect, forwardRef } from "react";
import { TestContext, ITestContext } from "../context/TestContext";
import "./Filters.scss";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {setData} from '../context/TestContext'

interface ISortAndFilterProps {
  data: ITableData[];
}

type IFilterValues = {
  assigneeValue: string;
  testSuiteNameValue: string;
  versionValue: string;
  startDateFromValue: Date | null;
  endDateFromValue: Date | null;
  startDateToValue: Date | null;
  endDateToValue: Date | null;
  failed: boolean;
  passed: boolean;
  all: boolean;
};

const datepickerDateFormat = "dd/MM/yyyy";

const Filters = ({ data }: ISortAndFilterProps) => {
  const { dispatch } = useContext(TestContext);

  const [filterValues, setFilterValues] = useState<IFilterValues>({
    assigneeValue: "",
    testSuiteNameValue: "",
    versionValue: "",
    startDateFromValue: null,
    endDateFromValue: null,
    startDateToValue: null,
    endDateToValue: null,
    failed: false,
    passed: false,
    all: false
  });
  const [filteredData, setFilteredData] = useState(data);

  const {
    assigneeValue,
    testSuiteNameValue,
    versionValue,
    startDateFromValue,
    endDateFromValue,
    startDateToValue,
    endDateToValue,
    failed,
    passed,
    all
  } = filterValues;

  const handleFailedClick = () => {
    setFilterValues({
      ...filterValues,
      failed: !failed,
      passed: false,
    });
  };

  const handlePassedClick = () => {
    setFilterValues({ ...filterValues, passed: !passed, failed: false });
  };

  const handleAllClick = () => {
    setFilterValues({
      ...filterValues,
      passed: false,
      failed: false
    });
  };

  const filterByAssignee = (item: ITableData) => {
    return item.assignee.toLowerCase().includes(assigneeValue.toLowerCase());
  };

  const filterByTestSuiteName = (item: ITableData) => {
    return item.testSuiteName
      .toLowerCase()
      .includes(testSuiteNameValue.toLowerCase());
  };

  const filterByVersion = (item: ITableData) => {
    return item.version.toLowerCase().includes(versionValue.toLowerCase());
  };
  const filterByStartDateFromValue = (item: ITableData) => {
    return (
      moment(item.startDate).isSameOrAfter(startDateFromValue) ||
      startDateFromValue === null
    );
  };

  const filterByStartDateToValue = (item: ITableData) => {
    return (
      moment(item.startDate).isSameOrBefore(startDateToValue) ||
      startDateToValue === null
    );
  };

  const filterByEndDateFromValue = (item: ITableData) => {
    return (
      moment(item.endDate).isSameOrAfter(endDateFromValue, "day") ||
      endDateFromValue === null
    );
  };

  const filterByEndDateToValue = (item: ITableData) => {
    return (
      moment(item.endDate).isSameOrBefore(endDateToValue, "day") ||
      endDateToValue === null
    );
  };
  const filterByFailedValue = (item: ITableData) => {
    return failed === true ? item.status.toLowerCase() === "failed" : item;
  };

  const filterByPassedValue = (item: ITableData) => {
    return passed === true ? item.status.toLowerCase() === "passed" : item;
  };
  const filterByAllValue = (item: ITableData) => {
    return all === true
      ? item.status.toLowerCase() === ("passed" || "failed")
      : item;
  };

  const filterFunctions = [
    filterByAssignee,
    filterByTestSuiteName,
    filterByVersion,
    filterByStartDateFromValue,
    filterByStartDateToValue,
    filterByEndDateFromValue,
    filterByEndDateToValue,
    filterByFailedValue,
    filterByPassedValue,
    filterByAllValue
  ];

  useEffect(() => {
    setFilteredData(data.filter((v) => filterFunctions.every((f) => f(v))));
    dispatch(setData(filteredData));
  }, [filterValues]);

  useEffect(() => {
    dispatch(setData(filteredData));
  }, [filteredData]);

  return (
    <div className="dropdown-container">
      <Dropdown
        options={filteredData}
        prompt="Select Assignee"
        value={assigneeValue}
        onChange={(val) => {
          setFilterValues({ ...filterValues, assigneeValue: val });
        }}
        id="id"
        label="assignee"
      />
      <Dropdown
        options={filteredData}
        prompt="Select Test Suite Name"
        value={testSuiteNameValue}
        onChange={(val) => {
          setFilterValues({ ...filterValues, testSuiteNameValue: val });
        }}
        id="id"
        label="testSuiteName"
      />
      <Dropdown
        options={filteredData}
        prompt="Select Version"
        value={versionValue}
        onChange={(val) => {
          setFilterValues({ ...filterValues, versionValue: val });
        }}
        id="id"
        label="version"
      />
      <div className="status-buttons">
        <button
          className={failed ? "button failed" : "button"}
          onClick={handleFailedClick}
        >
          Failed
        </button>
        <button className={passed ? "button passed" : "button"}
         onClick={handlePassedClick}>
          Passed
        </button>
        <button className={(!passed && !failed )? "button all" : "button"} onClick={handleAllClick}>
          All
        </button>
      </div>
      <div className="datepicker">
        <label>Select Start Date From</label>
        <DatePicker
          selected={startDateFromValue}
          onChange={(val) => {
            setFilterValues({ ...filterValues, startDateFromValue: val });
          }}
          className={"react-datepicker"}
          dateFormat={datepickerDateFormat}
          placeholderText={"Select Start Date From"}
        />
      </div>

      <div className="datepicker">
        <label>Select Start Date To</label>
        <DatePicker
          selected={startDateToValue}
          onChange={(val) => {
            setFilterValues({ ...filterValues, startDateToValue: val });
          }}
          className={"react-datepicker"}
          dateFormat={datepickerDateFormat}
          placeholderText={"Select Start Date To"}
        />
      </div>

      <div className="datepicker">
        <label>Select End Date From</label>
        <DatePicker
          selected={endDateFromValue}
          onChange={(val) => {
            setFilterValues({ ...filterValues, endDateFromValue: val });
          }}
          className={"react-datepicker"}
          dateFormat={datepickerDateFormat}
          placeholderText={"Select End Date From"}
        />
      </div>

      <div className="datepicker">
        <label>Select End Date To</label>
        <DatePicker
          selected={endDateToValue}
          onChange={(val) => {
            setFilterValues({ ...filterValues, endDateToValue: val });
          }}
          className={"react-datepicker"}
          dateFormat={datepickerDateFormat}
          placeholderText={"Select End Date To"}
        />
      </div>
      {/* <form>
        <label>Car Delivery Date: </label>
        <input
          type="date"
          id="id-date"
          name="name-date"
          value="2020-07-22"
          min="2020-01-01"
          max="2030-12-31"
        />
      </form> */}
    </div>
  );
};

export default Filters;
