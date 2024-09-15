import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './../css/register.css'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { FilledInput, Input, Menu } from '@mui/material';


const Register=()=>{
    const languages = ['ENGLISH', 'GERMAN'];
    const [userName, setUserName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordConfirm, setUserPasswordConfirm] = useState('');
    const [showPassword, setShowPassword]=useState(false);
    const [userLanguage, setUserLanguage] = useState('');
    const [userRole, setUserRole]=useState('');
    const [success,setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{ 
            await axios.post("https://localhost:7258/api/Auth/register",({
            name: userName,
            surname: userLastName,
            email: userEmail,
            password: userPassword,
            role: userRole,
            languageCourse : userLanguage
        }), {
            headers: {
                "Content-Type": "application/json"
            }
        });

            alert("User Registrated Successfully");
            navigate("/Login")
        
    }catch(err){
        console.log(JSON.stringify(err.response));
        alert(err.response);
    }    
        console.log(userName,userLastName,userEmail, userPassword, userLanguage, userRole)
        setSuccess(true);
        
    }

    const languageOnChange=(event)=>{
        setUserLanguage(event.target.value)
    }

    return(
        <div className='bg'>
            <div className="headerLogin">
                    <h1>NoBarriers</h1>
                </div>
            <div className='wrapper'>
            <section className='registerSection'>
                <h1 className='header'>Register</h1>
                <form className='inputsForm' onSubmit={handleSubmit}>
                    <div className='namesurname'>
                    <TextField 
                        className='name-input'
                        label="First Name" 
                        type='text'
                        variant="filled" 
                        onChange={(e)=>setUserName(e.target.value)}
                        value = {userName}
                        required
                        />
                         <TextField 
                        sx={{marginBottom:'10px',width:'48%','& .MuiFilledInput-root': {
                        backgroundColor: 'white',
                        },}}
                        label="Last Name" 
                        type='text'
                        variant="filled" 
                        onChange={(e)=>setUserLastName(e.target.value)}
                        value = {userLastName}
                        required
                        />
                    </div>
                        <TextField 
                            sx={{marginBottom:'10px',width:'95%','& .MuiFilledInput-root': {
                                backgroundColor: 'white',
                                },}}
                            label="Email" 
                            variant="filled" 
                            onChange={(e)=>setUserEmail(e.target.value)}
                            value = {userEmail}
                            type='email'
                            required
                        />
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
                        <FormControl sx={{width:'95%'}} variant='filled'>
                            <InputLabel>ConfirmPassword</InputLabel>
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
                                label="ConfirmPassword"
                                onChange={(e)=>setUserPasswordConfirm(e.target.value)}
                                value = {userPasswordConfirm}
                                required
                            />
                        </FormControl>       
                        <Box sx={{width:'95%'}} >
                            <FormControl sx={{backgroundColor:'white'}} variant="filled"fullWidth>
                                <InputLabel>Language</InputLabel>
                                <Select
                                    sx={{'& .MuiInputBase-input': {
                                        backgroundColor: 'white',
                                      },}}
                                    label="Language"
                                    value={userLanguage}
                                    onChange={languageOnChange}>
                                        {languages.map((option,index)=>(
                                            <MenuItem  key={index} value={option}>{option}</MenuItem>
                                        ))}
                                    </Select>
                            </FormControl>
                        </Box>
                                <div className='role'>
                                    <h1>Choose a Role</h1>
                                    <RadioGroup row className='radiogroup'>
                                        <FormControlLabel value="USER" control={<Radio />}  onChange={(e)=>setUserRole(e.target.value)} label="USER" />
                                        <FormControlLabel value="TEACHER" control={<Radio />} onChange={(e)=>setUserRole(e.target.value)} label="TEACHER" />
                                    </RadioGroup>
                                </div>
  
                        <Button sx={{borderRadius :"10px", textTransform: "uppercase", width: "95%", marginTop: "0.5rem"}} type="submit" className='button'>Log In</Button>
                        
                </form>
            </section>
            <div className='text'>
                    <h1 className='header2'>Join us now!!</h1>
                    <p>Let's start the journey!!</p>
                </div>
            </div>
        </div>
    );

}

export default Register