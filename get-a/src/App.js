import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


import { createStore, applyMiddleware } from "redux";
import rootReducer from './redux/reducers';
import { Provider } from 'react-redux'
import thunk from "redux-thunk";

import 'antd/dist/antd.css';
import './App.css';

//Route 
import AdminRoute from './components/common/AdminRoute'
import UserRoute from './components/common/UserRoute'

//Layout
import AdminLayout from './components/layouts/AdminLayout'
import UserLayout from './components/layouts/UserLayout'

//Page 
import Login from './components/pages/users/Login'

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/login " component={Login} />
          <AdminRoute exact path="/admin" component={AdminLayout} />
          <UserRoute exact path="/" component={UserLayout} />
          <Route path="*">
            {/* <Redirect path="/"/> */}
          </Route>

        </Switch>
      </Router>
    </Provider>

  );
}

export default App;
