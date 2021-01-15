import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import './App.css';
import 'antd/dist/antd.css';

//Route 
import AdminRoute from './components/common/AdminRoute'
import UserRoute from './components/common/UserRoute'

//Layout
// import AdminLayout  from './components/layouts/AdminLayout'
import UserLayout  from './components/layouts/UserLayout'

//Page 
import Login  from './components/pages/users/Login'
import MainLayout from './components/pages/admin/layout/MainLayout'

// rebase 1

function App() {
  return (
    <Router>
      <Switch>

        <Route exact path="/login " component={Login}/>

        <AdminRoute exact  path="/admin" component={MainLayout}/>

        <UserRoute exact  path="/" component={UserLayout}/>
        
        <Route path="*">
          {/* <Redirect path="/"/> */}
        </Route>

      </Switch>
    </Router>
    
  );
}

// rebase dev

export default App;
