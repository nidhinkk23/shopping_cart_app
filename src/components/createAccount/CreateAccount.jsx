import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { NativeSelect, Select, InputLabel } from '@material-ui/core';
import Axios from 'axios';



export default function CreateAccount(props) {
    let states = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender:"",
        role:""
    }
    const [state, setState] = useState(states)
    let handleChange = (event) => {
        const value = event.target.value

        setState({
            ...state,
            [event.target.name]: value
        })

        console.log("state ",state);
        
    }
    let handleSubmit = (event) => {
        console.log(state);

        console.log("submitted");
        event.preventDefault();

        const { firstName } = state
        const { lastName } = state
        const { email } = state
        const { password } = state
        console.log(firstName);

        if (firstName.trim().length === 0 && lastName.trim().length === 0 && email.trim().length === 0 && password.trim().length === 0) {
            console.log("failed");

        } else {
            console.log("sucess");
            saveData()

        }
    }

    let saveData = async (events) => {

        const formData = {
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            password: state.password,
            role:state.role,
            gender:state.gender

        }
        console.log(formData);
        const url = `https://react-shopping-cart-fa82c.firebaseio.com/account.json`
        try {
            let response = await Axios.post(url, formData)
            console.log("response from server ", response);


            const status = response.status
            console.log("status :", status);
            if (status === 200) {

                console.log("Successfully Created")
                props.history.push('/login')


            } else {
                console.log("Failed to create");

            }
        } catch (error) {
            console.log(error);

        }


    }






    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div >


                <Typography className='mb-3 mt-5' component="h1" variant="h5">
                    Sign up
        </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField autoComplete="fname"
                                name="firstName"
                                value={state.firstName}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                placeholder="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                placeholder="Last Name"
                                name="lastName"
                                value={state.lastName}
                                onChange={handleChange}
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                value={state.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Select className="offset-md-2"
                                    native
                                    value={state.gender}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'gender',
                                        
                                    }}
                                >
                                    <option value="">Gender</option> />
                                    <option value="male">Male</option>
                                    <option value="femalae">Female</option>
                                    <option value="others">Others</option>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            <Select className="offset-md-2"
                                    native
                                    value={state.role}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'role',
                                        
                                    }}
                                >
                                    <option value="">Role</option> />
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className="mb-3"
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                value={state.password}
                                onChange={handleChange}
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"

                    >
                        Sign Up
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </Container>
    );
}