import { TestRun } from "./TestRun";
import { useState, useContext, useMemo, useEffect } from "react";
import { TestContext, ITestContext } from "../context/TestContext";
// import tests from "../tests";
import { ITableData, IColumns } from "../interfaces/Interfaces";
import "./testRunTable.scss";
import AddProjectModal from "./AddProjectModal";
import Pagination from "./Pagination";
import Filters from "./Filters";

export const TestRunTable: React.FC = () => {
  //input data from context
  const { testRunData, columns } = useContext<ITestContext>(TestContext);

  //triggers modal on/off
  const [isOpen, setIsOpen] = useState(false);

  // filtering >>
  const [selectedVersion, setSelectedVersion] = useState("Select Version");

  function handleSelectedVersion(
    e: React.ChangeEvent<HTMLSelectElement>
  ): void {
    setSelectedVersion(e.target.value);
  }

  const filteredByVersion = testRunData.filter((testRun: ITableData) => {
    return testRun.version === selectedVersion;
  });
  // filtering <<

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [testsPerPage] = useState(2);

  // const columns: IColumns[] = useMemo(() => columns, []);
  // const data: ITableData[] = useMemo(() => testsId, []);

  // closes modal after submitting data
  //to be used for addProjectModal
  // useEffect(() => {
  //   modalHandleClose()
  // } [projects])

  //getting column headers
  const columnsHeaders: string[] = columns.map((column: IColumns) => {
    return column.Header;
  });

  // variables for pagination component
  const indexOfLastTest: number = currentPage * testsPerPage;
  const indexOfFirstTest: number = indexOfLastTest - testsPerPage;
  const currentTests: ITableData[] = testRunData.slice(
    indexOfFirstTest,
    indexOfLastTest
  );
  const totalPagesNum: number = Math.ceil(currentTests.length / testsPerPage);

  return (
    <>
      <Filters data={testRunData} />
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
      <button onClick={() => setIsOpen(true)}>Click to Open Modal</button>

      <AddProjectModal
        handleClose={() => setIsOpen(false)}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      >
        This is Modal Content!
      </AddProjectModal>
    </>
  );
};
