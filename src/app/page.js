"use client";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/system';
import axios from "axios";
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect } from 'react';
import theme from "./theme";


export default function Page() {
  
  const router = useRouter();
    
  const paperStyle = {padding: 20, height:'70vh', width:280}
  const avatarStyle = {backgroundColor:theme.palette.primary.main}  
  const btnStyle = {margin:'8px 0'}
  const textFieldStyle = {margin:'8px 0'}

  //GENERAL STATES
  const [checked, setChecked] = React.useState(true);
  const [visiblePassword, setVisiblePassword] = React.useState(false)  
  const [loginError, setLoginError] = React.useState("")
  const [token,setToken] = React.useState("")

  //STATES FOR CONTROLLED FORM
  const [user, setUser] = React.useState("")
  const [password,setPassword] = React.useState("")
  

  useEffect(()=>{
    if (checked && user)  {
      localStorage.setItem("User", user);
      localStorage.setItem("Tkn", token);
    }
    if (!checked)  localStorage.setItem("User", "");
  },[checked,user,token])

  useEffect(()=>{
    if (checked){
      let savedUser = localStorage.getItem("User");
      let savedTkn = localStorage.getItem("Tkn");
      setUser(savedUser)
      setToken(savedTkn)
    }
  },[])


/********************************************************HANDLERS************************************************************/

  const handleChangeCheckBox = (event) => {
    setChecked(event.target.checked);
  };

  function handleVisiblePassword (){
    if (visiblePassword) setVisiblePassword(false)
    else setVisiblePassword(true)
  }

  const changePasswordHandler=(event)=>{
    setPassword(event.target.value)
  }

  const changeUserHandler=(event)=>{
    setUser(event.target.value)
  }

  async function handleSignIn() {
    if (user === '' || password === '') {
      setLoginError("error");
    } else {
      const data = {
        "email": user,
        "password": password
      };
      
      try {
        const resp = await axios.post("http://localhost/api/login", data);
  
        if (resp.status === 200) {
          setLoginError("no error");          
          setToken(resp.data.token);
          //console.log(resp.data);
          router.push('/expenses')
        } else {
          console.log("Error: Unexpected response status", resp.status);
          setLoginError("error");          
        }
      } catch (error) {
        console.log("Error:", error.message);
        setLoginError("error");         
      }
    }
  }
    

  
/****************************************************************************************************************************/


  return (  
    <ThemeProvider theme={theme}>
    <Box>
      <Grid align="center" py={15} >
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
              <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
              <h2>Sign in</h2>
          </Grid>
          
          <Grid align="center">
              <TextField value={user} onChange={changeUserHandler} style={textFieldStyle} label='Username' placeholder='Enter username' fullWidth required/>
              <Grid display="flex" justifyContent={"space-between"}>
                  <TextField value={password} onChange={changePasswordHandler} style={textFieldStyle} label='Password' placeholder='Enter password' type={visiblePassword ? '' : 'password'} required/>
                  <IconButton onClick={handleVisiblePassword} color="primary" aria-label="visible/invisible password" component="label" sx={{mr:1.5}}>
                      {visiblePassword ? <VisibilityIcon/> : <VisibilityOffIcon/>} 
                  </IconButton>
              </Grid>
              <FormControlLabel
                  label="Remember Me"
                  control={<Checkbox checked={checked} onChange={handleChangeCheckBox} />}
              />
              <Button /* type='submit' */ color='primary' variant="contained" style={btnStyle} fullWidth onClick={handleSignIn}>Sign In</Button>                          
              

              {loginError==="error" && 
                  <Typography color="red">
                      Login Error! Try Again                    
                  </Typography>
              } 
                  
              {loginError==="no error" &&
                  <Typography color="green">
                      Login Success!                    
                  </Typography>                  
              }

          </Grid>
        </Paper>
      </Grid>
    </Box>    
    </ThemeProvider>  
  );
}


  
  
  
