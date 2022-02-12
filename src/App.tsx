// import "./styles.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./components/LoginForm";
// import Register from "./components/Register";
import { TestSuites } from "./components/TestSuites";
// import { Private } from "./auth/Private";
// import { Profile } from "./auth/Profile";
import { TestRunTable } from "./components/TestRunTable";
import TestContextProvider from "./context/TestContext";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faEye} from '@fortawesome/free-solid-svg-icons'

library.add(fas, faEye)

export default function App() {
  return (
    <>
      <LoginForm />
      {/* <DataTable /> */}

      {/* <Private isLoggedIn={false} component={Profile} /> */}

      <div className="container-x1">
        {/* <TestSuites /> */}
        <div className="table-responsive">
          <div className="table-wrapper">
            {/* <TestContextProvider>
              <TestRunTable />
            </TestContextProvider> */}
          </div>
        </div>
      </div>
    </>
  );
}
