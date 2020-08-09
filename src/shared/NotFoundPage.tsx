import React, { FC } from 'react';
import { Button, Typography, Box, makeStyles } from '@material-ui/core';
import { A } from 'hookrouter';

const useStyles = makeStyles({
    noTextDecoration: {
        textDecoration: 'none',
    },
});

export const NotFoundPage: FC<{}> = () => {
    const styles = useStyles();
    return (
        <Box
            width={1}
            height={1}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignContent="center"
            boxSizing="border-box"
            p={5}
        >
            <Box mb={2}>
                <Typography component="h1" variant="h2" align="center">
                    Oops!
                </Typography>
            </Box>
            <Typography component="h2" variant="h5" align="center">
                We can't seem to find the page you are looking for.
            </Typography>
            <Box display="flex" justifyContent="center" mt={5}>
                <A href="/" className={styles.noTextDecoration}>
                    <Button variant="contained" color="primary" disableElevation>
                        Back to home
                    </Button>
                </A>
            </Box>
        </Box>
    );
};
