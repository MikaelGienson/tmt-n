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

interface IFilterValues {
  assigneeValue: string;
  testSuiteNameValue: string;
  versionValue: string;
  startDateFromValue: Date | null;
  endDateFromValue: Date | null;
  startDateToValue: Date | null;
  endDateToValue: Date | null;
}

// date format for the datepicker
const dateFormat = "dd/MM/yyyy";

const Filters = ({ data }: ISortAndFilterProps) => {
  const { dispatch } = useContext(TestContext);

  const [filterValues, setFilterValues] = useState<IFilterValues>({
    assigneeValue: "",
    testSuiteNameValue: "",
    versionValue: "",
    startDateFromValue: null,
    endDateFromValue: null,
    startDateToValue: null,
    endDateToValue: null
  });
  const [filteredData, setFilteredData] = useState(data);

  const filterByAssignee = (assignee: string) => {
    const filteredData = data.filter((item) => {
      if (item.assignee.toLowerCase().includes(assignee.toLowerCase())) {
        return item;
      }
    });
    setFilteredData(filteredData);
  };

  const filterByVersion = (version: string) => {
    const filteredData = data.filter((item) => {
      if (item.version.toLowerCase().includes(version.toLowerCase())) {
        return item;
      }
    });
    setFilteredData(filteredData);
  };

  const filterByTestSuiteName = (testSuiteName: string) => {
    const filteredData = data.filter((item) => {
      if (
        item.testSuiteName.toLowerCase().includes(testSuiteName.toLowerCase())
      ) {
        return item;
      }
    });
    setFilteredData(filteredData);
  };

  const filterByStartDateFrom = (startDateFrom: Date | null) => {
    const filteredData = data.filter((item) => {
      if (
        moment(item.startDate).isSameOrAfter(startDateFrom) ||
        startDateFrom === null
      ) {
        return item;
      }
    });
    setFilteredData(filteredData);
  };

  const filterByStartDateTo = (startDateTo: Date | null) => {
    const filteredData = data.filter((item) => {
      if (
        moment(item.startDate).isSameOrBefore(startDateTo) ||
        startDateTo === null
      ) {
        return item;
      }
    });
    setFilteredData(filteredData);
  };

  const filterByEndDateFrom = (endDateFrom: Date | null) => {
    const filteredData = data.filter((item) => {
      if (
        moment(item.endDate).isSameOrAfter(endDateFrom, "day") ||
        endDateFrom === null
      ) {
        return item;
      }
    });
    setFilteredData(filteredData);
  };

  const filterByEndDateTo = (endDateTo: Date | null) => {
    const filteredData = data.filter((item) => {
      if (
        moment(item.endDate).isSameOrBefore(endDateTo, "day") ||
        endDateTo === null
      ) {
        return item;
      }
    });
    setFilteredData(filteredData);
  };

  const handleFailedClick = () => {
    const filteredData = data.filter((item) => {
      if (item.status.toLowerCase() === "failed") {
        return item;
      }
    });
    setFilteredData(filteredData);
  };

  useEffect(() => {
    dispatch(setData(filteredData));
  }, [filteredData]);



  return (
    <div className="dropdown-container">
      <Dropdown
        options={filteredData}
        prompt="Select Assignee"
        value={filterValues.assigneeValue}
        onChange={(val) => {
          filterByAssignee(val);
          setFilterValues({ ...filterValues, assigneeValue: val });
        }}
        id="id"
        label="assignee"
      />
      <Dropdown
        options={filteredData}
        prompt="Select Test Suite Name"
        value={filterValues.testSuiteNameValue}
        onChange={(val) => {
          filterByTestSuiteName(val);
          setFilterValues({ ...filterValues, testSuiteNameValue: val });
        }}
        id="id"
        label="testSuiteName"
      />
      <Dropdown
        options={filteredData}
        prompt="Select Version"
        value={filterValues.versionValue}
        onChange={(val) => {
          filterByVersion(val);
          setFilterValues({ ...filterValues, versionValue: val });
        }}
        id="id"
        label="version"
      />
      <div className="status-buttons">
        <button className="button" onClick={handleFailedClick}>
          Failed
        </button>
        <button className="button">Passed</button>
        <button className="button">All</button>
      </div>
      <div className="datepicker">
        <label>Select Start Date From</label>
        <DatePicker
          selected={filterValues.startDateFromValue}
          onChange={(val) => {
            filterByStartDateFrom(val);
            setFilterValues({ ...filterValues, startDateFromValue: val });
          }}
          className={"react-datepicker"}
          dateFormat={dateFormat}
          placeholderText={"Select Start Date From"}
        />
      </div>

      <div className="datepicker">
        <label>Select Start Date To</label>
        <DatePicker
          selected={filterValues.startDateToValue}
          onChange={(val) => {
            filterByStartDateTo(val);
            setFilterValues({ ...filterValues, startDateToValue: val });
          }}
          className={"react-datepicker"}
          dateFormat={dateFormat}
          placeholderText={"Select Start Date To"}
        />
      </div>

      <div className="datepicker">
        <label>Select End Date From</label>
        <DatePicker
          selected={filterValues.endDateFromValue}
          onChange={(val) => {
            filterByEndDateFrom(val);
            setFilterValues({ ...filterValues, endDateFromValue: val });
          }}
          className={"react-datepicker"}
          dateFormat={dateFormat}
          placeholderText={"Select End Date From"}
        />
      </div>

      <div className="datepicker">
        <label>Select End Date To</label>
        <DatePicker
          selected={filterValues.endDateToValue}
          onChange={(val) => {
            filterByEndDateTo(val);
            setFilterValues({ ...filterValues, endDateToValue: val });
          }}
          className={"react-datepicker"}
          dateFormat={dateFormat}
          placeholderText={"Select End Date To"}
        />
      </div>
    </div>
  );
};

export default Filters;




