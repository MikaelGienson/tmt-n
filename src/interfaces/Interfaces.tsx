export type ITableData = {
  TR: string;
  testSuiteName: string;
  version: string;
  assignee: string;
  failed: string;
  passed: string;
  total: string;
  PFR: string;
  status: string;
  startDate: string;
  endDate: string;
  [id: string]: string;
};

export type IProjectData = {
  projectName: string;
  projectDescription: string;
  projectInitials: string;
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
