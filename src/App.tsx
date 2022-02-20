// import "./styles.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { TestRunTable } from "./components/TestRunTable";

export default function App() {
  return (
    <>
      <TestRunTable />

      {/* <Private isLoggedIn={false} component={Profile} /> */}
    </>
  );
}
