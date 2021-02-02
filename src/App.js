import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { Provider } from "react-redux"
import "antd/dist/antd.css";
import "./App.css";
import store from "./redux/store"

//Route 
import AdminRoute from "./components/common/AdminRoute"
import UserRoute from "./components/common/UserRoute"

//Layout
import AdminLayout from "./components/layouts/AdminLayout"
import UserLayout from "./components/layouts/UserLayout"

//Page 
function App() {
  return (
    <Provider store={store}>
     
      <Router>
        <Switch>
          <AdminRoute  path="/admin" component={AdminLayout} />
          <UserRoute  
            path = "/" 
            component={UserLayout} 
          />
          <Route path="*">
            {/* <Redirect path="/"/> */}
          </Route>
         
          
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
