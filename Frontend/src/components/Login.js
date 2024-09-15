import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './../css/login.css'
import { useEffect } from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FilledInput } from '@mui/material';
import { loginUser } from '../services/UserService';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from './Store/authSlice';
const Login=()=>{
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [success,setSuccess] = useState(false);
    const [showPassword, setShowPassword]=useState(false);
    const [accessToken, setAccessToken]=useState('');
    const [userRole, setUserRole]=useState('');
    const navigate = useNavigate();
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmit= async (e)=>{
        e.preventDefault();
        console.log(userEmail, userPassword)
        try {
            const login = await loginUser(userEmail, userPassword);
            console.log(login);
            if (login != null) {
              console.log(login.userId);
              window.localStorage.setItem("userRole", login.role);
              window.localStorage.setItem("userData", JSON.stringify(login));
              window.localStorage.setItem("userId",login.userId)
              window.localStorage.setItem("email", userEmail)
              window.localStorage.setItem("accessToken", login.token)
              window.localStorage.setItem("username", login.username)
              window.localStorage.setItem("surname", login.surname)
              window.localStorage.setItem("languageCourse", login.course)
              if(login.course === 'ENGLISH')
                window.localStorage.setItem("languageId", 1)
              else if(login.course === 'GERMAN')
                window.localStorage.setItem("languageId",2)
              window.localStorage.setItem("LoggedIn", true);
              setUserRole(login.role);
              setSuccess(true);
              
            }
          } catch (error) {
            console.error("Error:", error);
          }
    }
    useEffect(() => {
        if (success) {
            if(userRole === "ADMIN")
                navigate("/admin");
            else if(userRole === "TEACHER")
                navigate("/teacher")
            else
                navigate("/user");
        }
      }, [success, navigate]);
    //   const getUserRoleFromToken = (token) => {
    //     try {
    //         const tokenParts = token.split('.');
    //         const payload = JSON.parse(atob(tokenParts[1]));
    //         return payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    //     } catch (error) {
    //         console.error("Error parsing JWT token:", error);
    //         return null;
    //     }
    // };
    return(
        <div className='bg'>
            <div className="headerLogin">
                    <h1>NoBarriers</h1>
                </div>
            <div className='wrapper'>
            
                <div className='label'>
                    <h1 className='header2'>Welcome back!!</h1>
                    <p>We're glad you're here again... Let's start and learn some new staff</p>
                </div>
            <section className='loginSection'>
                <h1 className='header'>Login</h1>
                <form className='inputsForm' onSubmit={handleSubmit}>
                    <TextField
                        sx={{width:'95%', mb:'10px'}}
                        className='email-input'
                        label="Email" 
                        type='email'
                        variant="filled" 
                        onChange={(e)=>setUserEmail(e.target.value)}
                        value = {userEmail}
                        required/>
                    <FormControl sx={{width:'95%'}} variant='filled'>
                            <InputLabel>Password</InputLabel>
                            <FilledInput
                                sx={{
                                    '&.MuiFilledInput-root': {
                                      backgroundColor: 'white',
                                    },
                                    marginBottom: '10px',
                                    width:'100%'
                                  }}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                                onChange={(e)=>setUserPassword(e.target.value)}
                                value = {userPassword}
                                required
                            />
                        </FormControl>
                        <Button sx={{borderRadius :"10px", textTransform: "uppercase", width: "95%", marginTop: "5%"}} type="submit" className='button'>Log In</Button>
                </form>
                <hr></hr>
                <a   className='reset'>Forgot password?</a>
                
            </section>
            </div>
            
        </div>
    );

}

export default Login;