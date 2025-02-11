import { useState } from "react";
import{Link,useNavigate} from "react-router-dom";
import {getAuth,signInWithEmailAndPassword} from "firebase/auth"; 

const LoginPage = ()=>{
    const [email,setEmail]= useState('');
    const [password,setPassword]=useState('');
    const [error,setError]= useState('');

    const navigate = useNavigate();
    const login =async()=>{
        try{
            await signInWithEmailAndPassword(getAuth(),email,password)
            navigate('/articles')
        }catch(error){
           setError (error.message);
        }
    }
        return(
            <>
            <h1>Login Form</h1>
            {error && <p className="error">{error}</p>}
            <input 
                placeholder="enter your email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                />
            <input
                type="password"
                placeholder="enter your password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                />
                <button onClick={login}>Login</button>
                <Link to = "/register">Ready to dive </Link>
            </>
        )
}

export default LoginPage