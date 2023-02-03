import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Home from "./Pages/Home/Home";
import UserPage from "./Pages/UserPage/UserPage";
import CreatePost from "./Pages/CreatePost/CreatePost";
import PostDetail from "./Pages/PostDetail/PostDetail";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import { isLogin } from "./utills/function/function";
import EditPost from "./Pages/EditPost/EditPost";

const Routing: React.FC = (): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path="/signup" element={isLogin() ? <Home /> : <SignUpPage />} />
      <Route path="/login" element={isLogin() ? <Home /> : <LoginPage />} />
      <Route path="/*" element={<Home />}></Route>
      <Route
        path="/user"
        element={isLogin() ? <UserPage /> : <LoginPage />}
      ></Route>

      <Route
        path="/createpost"
        element={isLogin() ? <CreatePost /> : <LoginPage />}
      ></Route>
      <Route
        path="/editpost/:postId"
        element={isLogin() ? <EditPost /> : <LoginPage />}
      ></Route>
      <Route path="/post/:postId" element={<PostDetail />}></Route>
    </Routes>
  </BrowserRouter>
);

export default Routing;
