import {useState, useEffect} from 'react';
import {useAuth} from '../context/user.context.js';
import { useNavigate } from 'react-router-dom';

function AuthCheck({children, authentication=true}) {
    const [loader, setLoader] = useState(true)
    const navigate = useNavigate();
    const {user: {isAuth: userStatus}} = useAuth();

    useEffect(()=> {
      if(authentication && !userStatus) navigate('/login')
      else if(!authentication && userStatus) navigate('/dashboard')
      setLoader(false);
    }, [])

  return (
    loader ? <h1>Loading...</h1> : <>{children}</>
  )
}

export default AuthCheck