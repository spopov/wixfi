import {CircularProgress, createStyles, Grid, Theme, withStyles} from "@material-ui/core";
import * as React from "react";

const useStyles = (theme: Theme) => createStyles({
    loading: {
        height: "100vh"
    }
})

export const Loading =  withStyles(useStyles)((props: { classes: any }) => {
    return <Grid container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          className={props.classes.loading}>
        <Grid item xs={3}>
            <CircularProgress disableShrink/>
        </Grid>
    </Grid>
});