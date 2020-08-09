import React, { FC, useState, useCallback, useContext } from 'react';
import {
    Checkbox,
    TextField,
    FormControlLabel,
    Button,
    Grid,
    Link,
    Box,
    Typography,
    InputAdornment,
    IconButton,
    Snackbar,
    makeStyles,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import googleLogin from '../Shared/assets/icons/googleLogin.svg';
import fbLogin from '../Shared/assets/icons/fbLogin.svg';
import firebase from 'firebase';
import { UserContext } from '../App';

const useStyles = makeStyles({
    loginWrapper: {
        display: 'flex',
        flexDirection: 'column',
        '@media (max-width: 500px)': {
            padding: '0px 20px',
        },
    },
    loginForm: {
        '@media (max-width: 500px)': {
            padding: '0px 30px',
        },
    },
    ssoImage: {
        width: '22px',
        height: '22px',
    },
});

const Alert = (props: any) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

function signOut() {
    firebase
        .auth()
        .signOut()
        .then(() => {
            console.log('Successfully signed out.');
        })
        .catch((error: any) => {
            console.error(`Could not sign out: ${error.message}`);
        });
}

export const Login: FC<{}> = () => {
    const styles = useStyles();

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loginAlert, setLoginAlert] = useState({
        isOpen: false,
        message: '',
    });

    const handleLoginAlertClose = (event: any, reason: any) => {
        if (reason === 'clickaway') {
            return;
        }

        setLoginAlert({ ...loginAlert, isOpen: false });
    };
    const signIn = (email: string, password: string) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((resp: any) => {
                console.log('Successfully signed in.');
            })
            .catch((error) => {
                setLoginAlert({ isOpen: true, message: error.message });
                console.error(error);
            });
    };

    const requestSignIn = useCallback(
        (email: string, password: string) => signIn(email, password),
        []
    );
    const requestSignOut = useCallback(() => signOut(), []);
    const user = useContext(UserContext);

    return (
        <Box className={styles.loginWrapper}>
            <div>USER LOGGED IN {user.email}</div>
            <Typography component="h1" variant="h5" align="center">
                Log in to Your Account
            </Typography>
            <Box mt={1}>
                <Typography variant="body1" align="center">
                    Log in to your account so you can continue making and editing your quizzes.
                </Typography>
            </Box>
            <Box mt={2} className={styles.loginForm}>
                <form noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        size="small"
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(event: any) => setUserEmail(event.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        size="small"
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        onChange={(event: any) => setUserPassword(event.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={(event: any) => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),

                            labelWidth: 70,
                        }}
                    />
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                                onChange={(event: any) => setRememberMe(!rememberMe)}
                            />
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>

                    <Box mt={5}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={(event: any) => {
                                event.preventDefault();
                                requestSignIn(userEmail, userPassword);
                            }}
                        >
                            Log in
                        </Button>
                    </Box>
                </form>
                <Button onClick={() => requestSignOut()}>Sign out</Button>
            </Box>
            <Box mt={2}>
                <Typography variant="body2" color="textSecondary" align="center">
                    Or log in using
                </Typography>
            </Box>
            <Box mt={2}>
                <Grid container justify="center">
                    <Grid item xs={6}>
                        <Box display="flex" justifyContent="center">
                            <Button variant="outlined" size="small">
                                <img className={styles.ssoImage} src={googleLogin} />
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box display="flex" justifyContent="center">
                            <Button variant="outlined" size="small">
                                <img className={styles.ssoImage} src={fbLogin} />
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Snackbar
                open={loginAlert.isOpen}
                autoHideDuration={5000}
                onClose={handleLoginAlertClose}
            >
                <Alert onClose={handleLoginAlertClose} severity="error">
                    {loginAlert.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};
