import { useRoutes } from "react-router-dom";

import { TestRunTable } from "../components/TestRunTable";
import { TestSuites } from "../components/TestSuites";
import LoginForm from "../components/LoginForm";
// import Register from "./components/Register";

// import { Private } from "./auth/Private";
// import { Profile } from "./auth/Profile";

import TestContextProvider from "../context/TestContext";

const Router = () => {
    let element = useRoutes([
        {
          path: "/",
          element: <LoginForm />,
        },
        { 
          path: "testruntable", 
          element:  <TestContextProvider>
                        <TestRunTable />
                    </TestContextProvider> },
        {
          path: "testsuites",
          element: <TestSuites />
        }
      ]);

    return element; 
}

export default Router;


