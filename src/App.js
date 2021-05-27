import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom"
import { Provider } from "react-redux"
import "antd/dist/antd.css"
import "./App.css"
import store from "./redux/store"

//Route 
import AdminRoute from "./components/common/AdminRoute"
import PrivateRoute from "./components/common/PrivateRoute"

//Layout
import AdminLayout from "./components/layouts/AdminLayout"
import TutorLayout from "./components/layouts/TutorLayout"

// config
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
import Coins from "./components/pages/users/coins/learner/Coin"
import Payment from "./components/pages/users/coins/learner/Payment"
import HistoryCoin from "./components/pages/users/coins/learner/HistoryCoin"
import Redeem from "./components/pages/users/coins/tutor/Redeem"
import Notification from "./components/pages/users/notifications/Notification"
import NotificationDetail from "./components/pages/users/notifications/NotificationDetail"
import Favorite from "./components/pages/users/favorite/Favorite"
import Search from "./components/pages/users/search/Search";
import ResultSearch from "./components/pages/users/search/ResultSearch";
import OnlineCourseList from "./components/pages/users/onlineCourseList/OnlineCourseList"
import { setAuthToken } from "./utils/setAxios";
import jwtDecode from "jwt-decode";
import { userActions } from "./redux/actions";
import OfflineCourse from "./components/pages/users/managecourse/manageCourse/OfflineCourse";
import Ranking from "./components/pages/users/home/learner/Ranking";
import ProfileCourse from "./components/pages/users/profile/profile/learner/ProfileCourse";
import { defaultValue } from "./components/defaultValue";
import ManageCourse from "./components/pages/users/managecourse/manageCourse/ManageCourse";
import VDO from "./components/pages/users/managecourse/onlineCourse/player/VDO"

if (localStorage.token) {
  setAuthToken(localStorage.token)
  const token = localStorage.token
  const user = jwtDecode(token)
  store.dispatch(userActions.setUser(user))
  const currentTime = Date.now() / 1000

  if (user.exp < currentTime) {
    store.dispatch(userActions.logout())
    window.location.href = "/login"
  }
}

function App() {
  
  const admin = store.getState().auth.role === defaultValue.userRole["admin"]
  const tutor = store.getState().auth.role === defaultValue.userRole["tutor"]

  return (
    <Provider store={store}>
      <Router>
        {
          !admin && <NavMenu />
        }
        <Switch>
          {/* Public Route */}
          <AdminRoute path="/admin" component={AdminLayout} />

          {/* Public Route */}

          <PrivateRoute exact path="/learner/:id" component={ProfileLearner} />
          <PrivateRoute exact path="/learner/:id/edit" component={EditProfile} />
          <PrivateRoute exact path="/learner/:id/edit/map" component={EditProfileMap} />
          <PrivateRoute exact path="/course" component={ProfileCourse} />
          <PrivateRoute exact path="/coin" component={Coins} />
          <PrivateRoute exact path="/coinshop/payment" component={Payment} />
          <PrivateRoute exact path="/historycoin" component={HistoryCoin} />
          <PrivateRoute exact path="/tutor/coin" component={Redeem} />
          <PrivateRoute exact path="/notification" component={Notification} />
          <PrivateRoute exact path="/notification/:id" component={NotificationDetail} />
          <PrivateRoute exact path="/favorite" component={Favorite} />
          {
            tutor && <PrivateRoute path="/tutor" component={TutorLayout} />
          }

          {/* Public Route */}
          <Route exact path="/" component={Home} />
          <Route exact path="/rank/:type" component={Ranking} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register/:type" component={RegisterForm} />
          <Route exact path="/profile/:id/course" component={PubilcProfile} />
          <Route exact path="/profile/:id" component={ProfileDetail} />
          <Route exact path="/:type/:id" component={OfflineCourse} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/search/:search" component={ResultSearch} />
          <Route exact path="/course/online/:id" component={OnlineCourseList} />
          <Route exact path="/course/online/:courseId/video" component={ManageCourse} />
          <Route exact path="/online/:courseId/video/:videoId" component={VDO} />
          <Route path="*">
            <Redirect path="/" />
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App