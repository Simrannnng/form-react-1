import React, { useState } from "react";
import { Avatar, Paper, TextField, FormControlLabel, FormGroup, Checkbox, Button, Typography, Link, Grid } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { blue, grey } from "@mui/material/colors";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { auth, provider, signInWithPopup, signOut } from "../firebaseconfig";
import googleLogo from '../components/img/Google-Symbol.png';


const Login = ({ handleChange }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const paperStyle = { padding: 30,  width: 400, margin: 'auto' };
  const avatarStyle = { backgroundColor: blue[500] };

  const initialValues = {
    email: '',
    password: '',
    remember: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Please write a valid email')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = (values, { resetForm }) => {
    window.alert('Thank you for signing in');
    console.log(values);
    resetForm();
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider.setCustomParameters({ prompt: 'select_account' }));
      console.log("User logged in:", result.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Google sign in error", error);
    }
  };

  const handleGoogleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      console.log("Logged out from Google account");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Paper elevation={3} style={paperStyle}>
        <Grid container direction="column" alignItems="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign in</h2>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                id="email"
                label="Email"
                name="email"
                placeholder="Enter Email"
                variant="standard"
                fullWidth
                required
                sx={{ marginBottom: 2 }}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                as={TextField}
                id="password"
                label="Password"
                name="password"
                placeholder="Enter Password"
                type="password"
                variant="standard"
                fullWidth
                required
                sx={{ marginBottom: 2 }}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Remember Me"
                  name="remember"
                  sx={{ marginBottom: 2 }}
                />
              </FormGroup>
              <Button
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                sx={{ marginBottom: 3 }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        <Typography sx={{ marginBottom: 2 }}>
          <Link href="#">Forgot Password?</Link>
        </Typography>
        <Typography>
          Do you have an account?
          <Link href="#" onClick={() => handleChange("event", 1)} sx={{ marginLeft: '95px' }}>
            Sign up
          </Link>
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ marginY: 2 }}>
          or login with
        </Typography>
        {isLoggedIn ? (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleGoogleLogout}
            sx={{ marginTop: 2 }}
          >
            Logout
          </Button>
        ) : (
          <Button
            variant="outlined" // Make the button outlined
            fullWidth
            onClick={handleGoogleLogin}
            sx={{
              marginTop: 2,
              color: "black",
              borderColor: grey[400],
              textTransform: "none",
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            
          >
            <img src={googleLogo} alt="Google logo" style={{ width: 33, height: 20, marginRight: 8 }} />
            Sign in with Google
          </Button>
        )}
      </Paper>
    </Grid>
  );
};

export default Login;
