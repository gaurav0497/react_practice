import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Suspense } from "react";
import Sidebar from './app/common/Sidebar'
import { connect } from "react-redux";
// import Layout from "./app/Layout";

const Login = React.lazy(() => import("./app/screens/Auth/Login"));
const ContactList = React.lazy(() => import("./app/screens/Contacts/ListContact"))
const Routess: React.FC = ({auth}:any) => {
  console.log(auth)
  return (
    <Router>
        <Suspense fallback="loading">
        {/* <Sidebar></Sidebar> */}
          {
            auth.isLoggedIn?
          (
           <>
          <Sidebar></Sidebar>
          <Routes>
            <Route path="/" element={<ContactList/>}/>
          </Routes>
          </>
          ):
          (
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
          )}
        </Suspense>
    </Router>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Routess);
