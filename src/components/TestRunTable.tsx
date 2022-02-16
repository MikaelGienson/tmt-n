import { TestRun } from "./TestRun";
import { useState, useContext, useMemo, useEffect } from "react";
import { TestContext, ITestContext } from "../context/TestContext";
// import tests from "../tests";
import { ITableData, IColumns } from "../interfaces/Interfaces";
import "./testRunTable.scss";
import AddProjectModal from "./AddProjectModal";
import Pagination from "./Pagination";
import Dropdown from "./Dropdown";

export const TestRunTable: React.FC = () => {
  const { testRunData, columns } = useContext<ITestContext>(
    TestContext
  );

  // dropdown >>
  const [value, setValue ] = useState<string | null>(null)
  // dropdown <<

  console.log("TestRunTable Mounted")
  //triggers modal on/off
  const [isOpen, setIsOpen] = useState(false);

  const[ selectedVersion, setSelectedVersion ] = useState('Select Version')

  const [currentPage, setCurrentPage] = useState(1);
  const [testsPerPage] = useState(2);

  function modalHandleClose(): void {
    setIsOpen(false);
  }

  function modalHandleOpen(): void {
    setIsOpen(true);
  }

  function handleSelectedVersion(e: React.ChangeEvent<HTMLSelectElement>): void {
    setSelectedVersion(e.target.value)
  }

  const filteredByVersion = testRunData.filter((testRun) => {
    return testRun.version === selectedVersion
  })

  console.log(filteredByVersion)
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
      <div style={{ width: 200 }}>
        <Dropdown 
        options={testRunData} 
        prompt='Select...'
        value={value}
        onChange={val => setValue(val)}
        id='id'
        label='assignee'
        />
      </div>
      
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
    </>
  )
};
