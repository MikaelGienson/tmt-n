export type ITableData = {
  TR: string;
  testSuiteName: string;
  version: string;
  assignee: string;
  failed: number;
  passed: number;
  total: number;
  PFR: number;
  status: string;
  startDate: string;
  endDate: string;
  id: string;
};

export type IProjectData = {
  projectName: string;
  projectDescription: string;
  id: string;
};

export type ISuites = {
  title: string;
  description: string;
  lastRunDate: string;
  noOfTestCases: number;
  author: string;
};

export type IColumns = {
  accessor: string;
  Header: string;
};
