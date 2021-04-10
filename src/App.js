import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { Provider } from "react-redux"
import "antd/dist/antd.css";
import "./App.css";
import store from "./redux/store"

//Route 
import AdminRoute from "./components/common/AdminRoute"
import PrivateRoute from "./components/common/PrivateRoute"

//Layout
import AdminLayout from "./components/layouts/AdminLayout"
import TutorLayout from "./components/layouts/TutorLayout"

// config
import { apiURL } from "./config/baseURL";
import Home from "./components/pages/users/home/learner/Home";
import Register from "./components/pages/users/authorization/Register";
import Login from "./components/pages/users/authorization/Login";
import RegisterForm from "./components/pages/users/authorization/RegisterForm";
import ProfileLearner from "./components/pages/users/profile/profile/learner/Profile";
import EditProfile from "./components/pages/users/profile/editProfile/learner/EditProfile";
import EditProfileMap from "./components/pages/users/profile/editProfile/learner/EditProfileMap";
import PubilcProfile from "./components/pages/users/profile/profile/tutor/pubileProfile/PubilcProfile";
import NavMenu from "./components/NavMenu";
import ProfileDetail from "./components/pages/users/profile/profile/tutor/pubileProfile/ProfileDetail";
import ReviewPage from "./components/pages/users/review/ReviewPage";
import OnlineCourseList from "./components/pages/users/onlineCourseList/OnlineCourseList"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavMenu />
        <Switch>

          {/* Public Route */}
          <AdminRoute path="/admin" component={AdminLayout} />

          {/* Public Route */}
          <PrivateRoute exact path="/learner/:id" component={ProfileLearner} />
          <PrivateRoute exact path="/learner/:id/edit" component={EditProfile} />
          <PrivateRoute exact path="/learner/:id/edit/map" component={EditProfileMap} />
          <PrivateRoute
            path="/tutor"
            component={TutorLayout}
          />

          {/* Public Route */}
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register/:type" component={RegisterForm} />
          <Route exact path="/profile/:id/course" component={PubilcProfile} />
          <Route exact path="/profile/:id" component={ProfileDetail} />
          <Route exact path="/course/:id" component={ReviewPage} />
          <Route exact path="/course/online" component={OnlineCourseList} />
          <Route path="*">
            <Redirect path="/login" />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;