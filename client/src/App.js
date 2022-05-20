import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import ChatMenu from "./components/chatMenu/ChatMenu";
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/home" element={ <Home /> } />
        <Route exact path="/" element={ <Login /> } />
        <Route exact path="/register" element={ <Register /> } />
        <Route exact path="/users/:username" element={ <Profile /> } />
        <Route exact path="/check" element={ <ChatMenu /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
