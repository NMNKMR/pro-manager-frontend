import { useEffect, useState } from "react";
import { validateUserFromToken } from "./apis/auth";
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AuthCheck from "./components/AuthCheck.jsx";
import UserProvider from "./context/user.context.js";
import PageWrap from "./components/page-wrapper/PageWrap.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Analytics from "./pages/Analytics.jsx";
import Settings from "./pages/Settings.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    id: "",
    name: "",
    isAuth: false,
  })

  const login = ({id, name})=> {
    setUser({id, name, isAuth: true})
  }

  const logout = ()=> {
    setUser({id: "", name: "", isAuth: false})
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken) {
      (async()=> {
        const {data: userData, error} = await validateUserFromToken(accessToken);
        if(error) {
          localStorage.removeItem("accessToken");
          setLoading(false);
          return;
        }
        login({...userData})
        setLoading(false);
      })();
    } 
    else setLoading(false);
  }, []);


  return (
    !loading ? 
    <UserProvider value={{user, login, logout, updateUser: (updatedUser={})=> setUser((prev)=> ({...prev, ...updatedUser}))}}>
      <Routes>
          <Route path='/' element={<PageWrap/>} >
            <Route path="/" element={<Navigate to={"/dashboard"} />} />
            <Route path='/dashboard' element={
                <Dashboard />
              // <AuthCheck authentication>
              //   {" "}
              // </AuthCheck>
              } 
            />
            <Route path='/analytics' element={
                <Analytics />
              // <AuthCheck authentication>
              //   {" "}
              // </AuthCheck>
              } 
            />
            <Route path='/settings' element={
                <Settings />
              // <AuthCheck authentication>
              //   {" "}
              // </AuthCheck>
              } 
            />
          </Route>
          <Route path='/register' element={
            <AuthCheck authentication={false}>
              {" "}
              <Register />
            </AuthCheck>} 
          />
          <Route path='/login' element={
            <AuthCheck authentication={false}>
              {" "}
              <Login />
            </AuthCheck>} 
          />
      </Routes> 
    </UserProvider> : <h1 className="center">Loading...</h1>
  )
}

export default App