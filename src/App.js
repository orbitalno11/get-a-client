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
import EditProfile from "./components/pages/users/profile/editProfile/learner/EditProfile";
import EditProfileMap from "./components/pages/users/profile/editProfile/learner/EditProfileMap";
import NavMenu from "./components/NavMenu";
import Coins from "./components/pages/users/coins/learner/Coin"
import BuyCoin from "./components/pages/users/coins/learner/BuyCoin"
import Payment from "./components/pages/users/coins/learner/Payment"
import Complete from "./components/pages/users/coins/learner/Complete"
import PaymentSCB from "./components/pages/users/coins/learner/PaymentSCB"
import HistoryCoin from "./components/pages/users/coins/learner/HistoryCoin"
import Favorite from "./components/pages/users/favorite/Favorite"
import Search from "./components/pages/users/search/Search";
import { setAuthToken } from "./utils/setAxios";
import jwtDecode from "jwt-decode";
import { userActions } from "./redux/actions";
import Course from "./components/pages/users/managecourse/manageCourse/Course";
import Ranking from "./components/pages/users/home/learner/Ranking";
import { defaultValue } from "./components/defaultValue";
import VDO from "./components/pages/users/managecourse/onlineCourse/player/VDO"
import Profile from "./components/pages/users/profile/profile/Profile";
import PubilcProfileCourse from "./components/pages/users/profile/profile/publicProflie/PubilcProfileCourse";
import PubilcProfile from "./components/pages/users/profile/profile/publicProflie/PubilcProfile";
import ClipList from "./components/pages/users/managecourse/onlineCourse/ClipList";
import ScrollToTop from "./components/ScrollToTop"
import Redeem from "./components/pages/users/coins/tutor/Redeem"


if (localStorage.token) {
  setAuthToken(localStorage.token)
  const token = localStorage.token
  const user = jwtDecode(token)
  store.dispatch(userActions.setUser(user))
  const currentTime = Date.now() / 1000

  if (user.exp < currentTime) {
    store.dispatch(userActions.logout())
    window.location.href = "/"
  }
}

function App() {
  const admin = store.getState().auth.role === defaultValue.userRole["admin"]
  const tutor = store.getState().auth.role === defaultValue.userRole["tutor"]

  return (
    <Provider store={store}>
      <Router>
      <ScrollToTop />
        {
          !admin && <NavMenu />
        }
        <Switch>
          {/* Public Route */}
          <AdminRoute path="/admin" component={AdminLayout} />

          {/* Public Route */}
          <PrivateRoute exact path="/learner/:id/edit" component={EditProfile} />
          <PrivateRoute exact path="/learner/:id/edit/map" component={EditProfileMap} />
          <PrivateRoute exact path="/me" component={Profile} />
          <PrivateRoute exact path="/me/edit" component={EditProfile} />
          <PrivateRoute exact path="/me/edit/map" component={EditProfileMap} />
          <PrivateRoute exact path="/redeem" component={Redeem} />
          <PrivateRoute exact path="/coin" component={Coins} />
          <PrivateRoute exact path="/transaction" component={BuyCoin} />
          <PrivateRoute exact path="/payment/complete" component={Complete} />
          <PrivateRoute exact path="/payment" component={Payment} />
          <PrivateRoute exact path="/payment/scbeasy" component={PaymentSCB} />
          <PrivateRoute exact path="/historycoin" component={HistoryCoin} />
          <PrivateRoute exact path="/favorite" component={Favorite} />
          <PrivateRoute exact path="/course" component={Profile} />
          {
            tutor && <PrivateRoute path="/tutor" component={TutorLayout} />
          }

          {/* Public Route */}
          <Route exact path="/" component={Home} />
          <Route exact path="/popular/:type" component={Ranking} />
          <Route exact path="/popular" component={Ranking} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/tutor/ranking" component={Ranking} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register/:type" component={RegisterForm} />
          <Route exact path="/profile/:id/course" component={PubilcProfileCourse} />
          <Route exact path="/profile/:id" component={PubilcProfile} />
          <Route exact path="/course/:id" component={Course} />
          <Route exact path="/online/:id" component={Course} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/course/online/:courseId/video" component={ClipList} />
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