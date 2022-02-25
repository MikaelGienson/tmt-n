import Dropdown from "./Dropdown";
import { ITableData, IColumns } from "../interfaces/Interfaces";
import { useState, useContext, useMemo, useEffect } from "react";
import { TestContext, ITestContext } from "../context/TestContext";
import "./Filters.scss";
import moment from "moment";
import {setData} from '../context/TestContext'

interface ISortAndFilterProps {
  data: ITableData[];
}

interface IFilterValues {
  assigneeValue: string;
  testSuiteNameValue: string;
  versionValue: string;
  startDateFromValue: string;
  endDateFromValue: string;
  startDateToValue: string;
  endDateToValue: string;
}

const Filters = ({ data }: ISortAndFilterProps) => {
  const { dispatch } = useContext(TestContext);

  const [filterValues, setFilterValues] = useState<IFilterValues>({
    assigneeValue: "",
    testSuiteNameValue: "",
    versionValue: "",
    startDateFromValue: "",
    endDateFromValue: "",
    startDateToValue: "",
    endDateToValue: ""
  });
  const [filteredData, setFilteredData] = useState(data);

  function filterOptions(
    filterValues: IFilterValues,
    data: ITableData[]
  ): ITableData[] {
    return data.filter(
      (option: ITableData) =>
        option.assignee
          .toLowerCase()
          .indexOf(filterValues.assigneeValue.toLowerCase()) > -1 &&
        option.testSuiteName
          .toLowerCase()
          .indexOf(filterValues.testSuiteNameValue.toLowerCase()) > -1 &&
        option.version.indexOf(filterValues.versionValue) > -1
      // &&
      // moment(option.startDate)
      //   .add(1, "minute")
      //   .isBetween(
      //     filterValues.startDateFromValue,
      //     filterValues.startDateToValue
      //   )
    );
  }
  //updates data which is send to dropdown component via 'option' props
  useEffect(() => {
    setFilteredData(filterOptions(filterValues, data));
  }, [filterValues]);

  console.log(
    moment(data[0].startDate)
      .add(1, "minute")
      .isBetween(filterValues.startDateFromValue, filterValues.startDateToValue)
  );

  useEffect(() => {
    dispatch(setData(filteredData));
  }, [filteredData]);

  // console.log(filterValues);
  // console.log(filteredData);

  return (
    <div className="dropdown-container">
      <Dropdown
        options={filteredData}
        prompt="Select Assignee"
        value={filterValues.assigneeValue}
        onChange={(val) =>
          setFilterValues({ ...filterValues, assigneeValue: val })
        }
        id="id"
        label="assignee"
      />
      <Dropdown
        options={filteredData}
        prompt="Select Test Suite Name"
        value={filterValues.testSuiteNameValue}
        onChange={(val) =>
          setFilterValues({ ...filterValues, testSuiteNameValue: val })
        }
        id="id"
        label="testSuiteName"
      />
      <Dropdown
        options={filteredData}
        prompt="Select Start Date From"
        value={filterValues.startDateFromValue}
        onChange={(val) =>
          setFilterValues({ ...filterValues, startDateFromValue: val })
        }
        id="id"
        label="startDate"
      />
      {/* <Dropdown
        options={data}
        prompt="Select End Date From"
        value={filterValues.endDateFromValue}
        onChange={(val) =>
          setFilterValues({ ...filterValues, endDateFromValue: val })
        }
        id="id"
        label="endDate"
      /> */}
      <Dropdown
        options={filteredData}
        prompt="Select Version"
        value={filterValues.versionValue}
        onChange={(val) =>
          setFilterValues({ ...filterValues, versionValue: val })
        }
        id="id"
        label="version"
      />
      {/* <div>Failed Passed All</div> */}
      <Dropdown
        options={filteredData}
        prompt="Select Start Date To"
        value={filterValues.startDateToValue}
        onChange={(val) =>
          setFilterValues({ ...filterValues, startDateToValue: val })
        }
        id="id"
        label="startDate"
      />
      {/* <Dropdown
        options={filteredData}
        prompt="Select End Date To"
        value={filterValues.endDateToValue}
        onChange={(val) =>
          setFilterValues({ ...filterValues, endDateToValue: val })
        }
        id="id"
        label="endDate"
      /> */}
    </div>
  );
};

export default Filters;
