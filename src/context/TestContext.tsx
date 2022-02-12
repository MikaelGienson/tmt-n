import { createContext, useState } from "react";
import { ITableData, IColumns } from "../interfaces/Interfaces";
import React from "react";
import { v4 as uuid } from "uuid";

type TestContextProviderProps = {
  children: React.ReactNode;
};

export type ITestContext = {
  testRunData: ITableData[];
  setTestRunData: React.Dispatch<React.SetStateAction<ITableData[]>>;
  columns: IColumns[];
};

const COLUMNS = [
  { accessor: "TR", Header: "TR" },
  { accessor: "testSuiteName", Header: "Test Suite Name" },
  { accessor: "version", Header: "Version" },
  { accessor: "assignee", Header: "Assignee" },
  { accessor: "failed", Header: "Failed" },
  { accessor: "passed", Header: "Passed" },
  { accessor: "total", Header: "Total" },
  { accessor: "PFR", Header: "PFR" },
  { accessor: "status", Header: "Status" },
  { accessor: "startDate", Header: "Start Date" },
  { accessor: "endDate", Header: "End Date" },
  { accessor: "actions", Header: "Actions" }
];

const TESTS = [
  {
    TR: "TR-74",
    testSuiteName: "Regression",
    version: "0.9.1",
    assignee: "Agata Ciapata",
    failed: 10,
    passed: 145,
    total: 149,
    PFR: 0.93,
    status: "failed",
    startDate: "2022/01/23 18:55",
    endDate: "2022/01/23 18:58",
    id: uuid()
  },
  {
    TR: "TR-75",
    testSuiteName: "Regression",
    version: "0.9.2",
    assignee: "Michał Zdychał",
    failed: 5,
    passed: 10,
    total: 15,
    PFR: 0.33,
    status: "failed",
    startDate: "2022/01/24 19:05",
    endDate: "2022/01/24 19:07",
    id: uuid()
  },
  {
    TR: "TR-76",
    testSuiteName: "Regression",
    version: "0.5.2",
    assignee: "Maria Awaria",
    failed: 0,
    passed: 100,
    total: 100,
    PFR: 1,
    status: "passed",
    startDate: "2022/01/25 14:15",
    endDate: "2022/01/25 14:27",
    id: uuid()
  },
  {
    TR: "TR-77",
    testSuiteName: "Regression",
    version: "0.6.2",
    assignee: "Anita Wypita",
    failed: 90,
    passed: 10,
    total: 100,
    PFR: 0.1,
    status: "failed",
    startDate: "2022/01/25 17:14",
    endDate: "2022/01/25 17:24",
    id: uuid()
  }
];

const sortedTESTS: ITableData[] = TESTS.sort((a, b) =>
  a.assignee < b.assignee ? -1 : 1
);

export const TestContext = createContext<ITestContext>({
  testRunData: TESTS,
  setTestRunData: () => {},
  columns: COLUMNS
});

export const TestContextProvider = ({ children }: TestContextProviderProps) => {
  const [testRunData, setTestRunData] = useState<ITableData[]>(sortedTESTS);
  const columns: IColumns[] = COLUMNS;

  return (
    <TestContext.Provider value={{ testRunData, setTestRunData, columns }}>
      {children}
    </TestContext.Provider>
  );
};

export default TestContextProvider;
