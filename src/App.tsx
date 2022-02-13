// import "./styles.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Router from './routes/index'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faEye} from '@fortawesome/free-solid-svg-icons'
import TempNavBar from './components/TempNavBar'

library.add(fas, faEye)

export default function App() {
  return (
    <>
      <TempNavBar />
      <Router />
      {/* <Private isLoggedIn={false} component={Profile} /> */}
    </>
  );
}
