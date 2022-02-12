import "../index.css";
import { ITableData } from "../interfaces/Interfaces";

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
          style={
            test.status === "passed"
              ? { border: "1px solid  #5AC16B", borderRadius: "5px" }
              : { border: "1px solid #C15A5A", borderRadius: "5px" }
          }
          className={
            test.status === "passed"
              ? "m-0 p-0 text-success text-uppercase text-center"
              : "m-0 p-0 text-danger text-uppercase text-center"
          }
        >
          {test.status}
        </div>
      </td>
      <td>{test.startDate}</td>
      <td>{test.endDate}</td>
      <td>
        <button type="button" className="btn btn-success">

        </button>
        <button type="button" className="btn btn-danger">
     
        </button>
      </td>
    </>
  );
};
