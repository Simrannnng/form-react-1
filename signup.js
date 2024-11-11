import React from "react";
import {Avatar,Paper,Typography,TextField,Button,FormControlLabel,FormGroup,useMediaQuery,
} from "@mui/material";
import { Grid } from "@mui/system";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { blue } from "@mui/material/colors";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");

  const paperStyle = {
    padding: isMobile ? "20px" : "30px 40px",
    width: isMobile ? "100%" : isTablet ? 350 : 400,
    margin: "auto",
  };
  const headerStyle = { margin: isMobile ? 5 : 10, fontSize: isMobile ? "1.5rem" : "2rem" };
  const avatarStyle = { backgroundColor: blue[500], width: isMobile ? 40 : 56, height: isMobile ? 40 : 56 };

  const validationSchema = Yup.object({
    username: Yup.string().required("Name is required"),
    email: Yup.string().email("Please write a valid email").required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    agree: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
  });

  const onSubmit = (values, { resetForm }) => {
    alert("Thank you for signing up!");
    console.log(values);
    resetForm();
  };

  return (
    <Grid container justifyContent="center">
      <Paper elevation={3} style={paperStyle}>
        <Grid container direction="column" alignItems="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineIcon />
          </Avatar>
          <Typography variant="h4" style={headerStyle}>
            Sign up
          </Typography>
          <Typography variant="caption" sx={{ fontSize: isMobile ? "0.8rem" : "1rem" }}>
            Please fill the form to create a new account.
          </Typography>
        </Grid>
        <Formik
          initialValues={{
            username: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            agree: false,
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                name="username"
                label="Name"
                placeholder="Enter name"
                variant="standard"
                fullWidth
                required
                sx={{ marginBottom: 1, fontSize: isMobile ? "0.8rem" : "1rem" }}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
              <Field
                as={TextField}
                name="email"
                label="Email"
                placeholder="Enter your Email"
                variant="standard"
                fullWidth
                required
                sx={{ marginBottom: 1, fontSize: isMobile ? "0.8rem" : "1rem" }}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <FormControl sx={{ marginBottom: isMobile ? 0.5 : 2 }}>
                <FormLabel sx={{ marginTop: 2, fontSize: isMobile ? "0.9rem" : "1rem" }}>Gender</FormLabel>
                <RadioGroup defaultValue="female" name="gender" row>
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
              <Field
                as={TextField}
                name="phoneNumber"
                label="Phone no."
                placeholder="Enter your Phone No."
                variant="standard"
                fullWidth
                required
                sx={{ marginBottom: 1, fontSize: isMobile ? "0.8rem" : "1rem" }}
                error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
              <Field
                as={TextField}
                name="password"
                label="Password"
                placeholder="Enter Password"
                type="password"
                variant="standard"
                fullWidth
                required
                sx={{ marginBottom: 1, fontSize: isMobile ? "0.8rem" : "1rem" }}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Field
                as={TextField}
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Reconfirm your password"
                type="password"
                variant="standard"
                fullWidth
                required
                sx={{ marginBottom: 1, fontSize: isMobile ? "0.8rem" : "1rem" }}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />
              <FormGroup>
                <Field
                  as={FormControlLabel}
                  name="agree"
                  control={<Checkbox />}
                  label="I agree to the terms and conditions."
                  checked={touched.agree}
                />
                {errors.agree && touched.agree && (
                  <Typography variant="caption" color="error" sx={{ fontSize: isMobile ? "0.75rem" : "0.9rem" }}>
                    {errors.agree}
                  </Typography>
                )}
              </FormGroup>
              <Button
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                sx={{
                  marginTop: 1,
                  fontSize: isMobile ? "0.9rem" : "1rem",
                  padding: isMobile ? "8px 0" : "10px 0",
                }}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Signup;
