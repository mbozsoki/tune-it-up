import React, { FC } from 'react';
import { Box, Button, styled, makeStyles, Typography } from '@material-ui/core';
import { Login } from './Login';

const OutlinedButton = styled(Button)({
    background: 'transparent',
    border: '1px solid var(--color-white)',
    borderRadius: 3,
    color: 'white',
    height: 36,
    padding: '0 30px',
});

const ColumnBox = styled(Box)({
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
});

const useStyles = makeStyles({
    separator: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        height: '100%',
        width: '55%',
        zIndex: -1,
        background: 'var(--color-blue)',
        clipPath: 'polygon(0 0, 100% 0%, 80% 100%, 0% 100%)',
        '@media (max-width: 1000px)': {
            width: '100%',
            clipPath: 'polygon(100% 680px, 0% 600px, 0% 100%, 100% 100%)',
        },
    },
    authContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 0,
        '@media (max-width: 1000px)': {
            height: 'calc(100% - 100px)',
            flexDirection: 'column-reverse',
            justifyContent: 'initial',
            alignItems: 'center',
            padding: '50px 0',
        },
    },
    navigationBox: {
        height: '100%',
        color: 'var(--color-white)',
        textAlign: 'center',
        '@media (max-width: 1000px)': {
            height: '550px',
            marginTop: '150px',
        },
    },
    title: {
        fontSize: '20px',
        fontWeight: 'bold',
    },
    authBox: {
        height: '100%',
        color: 'var(--color-black)',
        '@media (max-width: 1000px)': {
            height: '500px',
        },
    },
});

const Auth: FC<{}> = () => {
    const styles = useStyles();
    return (
        <Box className={styles.authContainer}>
            <div className={styles.separator}></div>
            <ColumnBox className={styles.navigationBox}>
                <Box mb={2}>
                    <Typography component="h2" variant="h5" align="center">
                        Don't have an account yet?
                    </Typography>
                </Box>
                <Box mb={3}>
                    <Typography component="p" variant="body1" align="center">
                        Let's get you all set up so you can start creating your fist quiz!
                    </Typography>
                </Box>
                <OutlinedButton variant="outlined">Sign up</OutlinedButton>
            </ColumnBox>
            <ColumnBox className={styles.authBox}>
                <Login />
            </ColumnBox>
        </Box>
    );
};

export default Auth;
