import { TestRun } from "./TestRun";
import { useState, useContext, useMemo, useEffect } from "react";
import { TestContext, ITestContext } from "../context/TestContext";
// import tests from "../tests";
import { ITableData, IColumns } from "../interfaces/Interfaces";
import "./testRunTable.scss";
import AddProjectModal from "./AddProjectModal";
import Pagination from "./Pagination";
import LoginForm from "./LoginForm";

export const TestRunTable: React.FC = () => {
  const { testRunData, setTestRunData, columns } = useContext<ITestContext>(
    TestContext
  );

  //triggers modal on/off
  const [isOpen, setIsOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [testsPerPage] = useState(2);

  function modalHandleClose(): void {
    setIsOpen(false);
  }

  function modalHandleOpen(): void {
    setIsOpen(true);
  }

  // const columns: IColumns[] = useMemo(() => columns, []);
  // const data: ITableData[] = useMemo(() => testsId, []);

  // closes modal after submitting data
  //to be used for addProjectModal
  // useEffect(() => {
  //   modalHandleClose()
  // } [projects])

  const columnsHeaders: string[] = Array.from(
    columns.map((column) => {
      return column.Header;
    })
  );

  const indexOfLastTest: number = currentPage * testsPerPage;
  const indexOfFirstTest: number = indexOfLastTest - testsPerPage;
  const currentTests: ITableData[] = testRunData.slice(
    indexOfFirstTest,
    indexOfLastTest
  );
  const totalPagesNum: number = Math.ceil(testRunData.length / testsPerPage);

  return (
    <>
      <table className="table table-striped table-hover table-borderless">
        <thead>
          <tr>
            {columnsHeaders.map((header) => (
              <th scope="col" className="pb-0">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className=".table-hover">
          {currentTests.map((test: ITableData) => (
            <tr>
              <TestRun test={test} />
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination pages={totalPagesNum} setCurrentPage={setCurrentPage} />
      <button onClick={modalHandleOpen}>Click to Open Modal</button>

      <AddProjectModal
        handleClose={modalHandleClose}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      >
        This is Modal Content!
      </AddProjectModal>
      <LoginForm />
    </>
  );
};
