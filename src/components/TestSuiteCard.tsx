import "./TestSuiteCard.scss";

type TestSuiteCardProps = {
  title: string;
  description: string;
  lastRunDate: string;
  noOfTestCases: number;
  author: string;
};

const TestSuiteCard = ({
  title,
  description,
  lastRunDate,
  noOfTestCases,
  author
}: TestSuiteCardProps) => {
  return (
    <div className="card-container">
      <div className="card-title">{title}</div>
      <div className="card-body">{description}</div>
      <div className="card-footer">
        <table className="card-footer-table">
          <thead>
            <tr>
              <th scope="col" className="card-footer-table-column">
                Last Run Date
              </th>
              <th scope="col" className="card-footer-table-column">
                Test Cases
              </th>
              <th scope="col" className="card-footer-table-column">
                Author
              </th>
            </tr>
          </thead>
          <tbody>
            <td className="card-footer-table-row">{lastRunDate}</td>
            <td className="card-footer-table-row">{noOfTestCases}</td>
            <td className="card-footer-table-row">{author}</td>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestSuiteCard;
