// import "./styles.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Router from './routes/index'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faEye} from '@fortawesome/free-solid-svg-icons'
import TempNavBar from './components/TempNavBar'
import Sidebar from './components/Sidebar'
import Grid from './components/Grid'
import {TestRunTable} from "./components/TestRunTable";

library.add
(fas, faEye)

export default function App() {
  return (
    <>
      
      <Router />
      <TempNavBar />
      <Grid row={true}>
        <Grid column={true} lg={2}>
        <Sidebar />
        </Grid>
        <Grid column={true} lg={10}>
     
        </Grid>
      </Grid>
          
      {/* <Private isLoggedIn={false} component={Profile} /> */}
    </>
  );
}
