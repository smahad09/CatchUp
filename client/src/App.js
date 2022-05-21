import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import ChatMenu from "./components/chatMenu/ChatMenu";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

function App() {
  const {user} = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user? <Home /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={user? <Navigate to={"/"} /> : <Login /> } />
        <Route path="/register" element={user? <Navigate to={"/"}/>:<Register /> } />
        <Route path="/users/:username" element={ <Profile /> } />
        <Route path="/check" element={ <ChatMenu /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
