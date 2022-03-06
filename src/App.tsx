// import "./styles.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { TestRunTable } from "./components/TestRunTable";
import { TestContextProvider } from "./context/TestContext";
import LineChart from './components/LineChart'


export default function App() {
  return (
    <>
      
      <TestContextProvider>
        <LineChart />
        {/* <TestRunTable /> */}
      </TestContextProvider>
      {/* <Private isLoggedIn={false} component={Profile} /> */}
    </>
  );
}
