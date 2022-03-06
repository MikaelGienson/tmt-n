import "../index.css";
import { ITableData } from "../interfaces/Interfaces";
import './TestRun.scss'

type TestProps = {
  test: ITableData;
};

export const TestRun = ({ test }: TestProps) => {
  return (
    <>
      <td>{test.TR}</td>
      <td>{test.testSuiteName}</td>
      <td>{test.version}</td>
      <td>{test.assignee}</td>
      <td>{test.failed}</td>
      <td>{test.passed}</td>
      <td>{test.total}</td>
      <td>{test.PFR}</td>
      <td>
        <div
          className={
            test.status === "passed"
              ? "button passed"
              : "button failed"
          }
        >
          {test.status}
        </div>
      </td>
      <td>{test.startDate}</td>
      <td>{test.endDate}</td>
    </>
  );
};
