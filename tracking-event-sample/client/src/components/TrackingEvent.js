import React, { useState, useEffect } from "react";
// import {fetchData} from "../api/index";
import axios from 'axios';
import TimelineTracking from "./TimelineTracking"
import TempDataAll from "./TempData.json"
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


const API_URL = `http://localhost:5000/data/`;

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        verticalAlign: "middle"
    },
    secondaryTail: {
      backgroundColor: theme.palette.secondary.main,
    },
    root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
    }
}));

const TrackingEvent = () => {
    const [trackingData, setTrackingData] = useState({});
    const [trackingId, setTrackingId] = useState("BPS65O4WYLBWWBR");

    const classes = useStyles();

    const changeTracking = (e) => {
        setTrackingId(e.target.value);
        getTracking();
    }

    const getTracking = () => {
        try {
            console.log("tracking oopssss...");
            axios.get(API_URL+trackingId,{
                params: {
                  _limit: 3
                 }
              }).then(res => {
                    var data = JSON.parse(res.data);
                    var newData = {
                        tracking: data.label.tracking_number,
                        external: data.label.external_tracking_number,
                        data: data.parcel_tracking_items.map(item => (
                            {
                                id: item.id,
                                location: item.location + ", " + item.city,
                                date: item.timestamp,
                                code: ((item.tracking_code_vendor||{}).code||"BPS-0000"),
                                status: (( (((item.tracking_code_vendor||{}).tracking_code_vendor_locales||{}))[0]||{}).description||"Shipping"),
                            } 
                        ))
                    }
                    // console.log("tracking data", newData);
                    setTrackingData(newData);
                })
        } catch (error) {
            console.log(error.message);
        }
    };

    // useEffect(() => {
    //     getTracking();
    // }, [trackingData]);

    getTracking();

    return (
    <div>
        <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
                {/* <h1>{"BPS Tracking"}</h1> */}
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        id="outlined-secondary"
                        label="Tracking Id"
                        variant="outlined"
                        color="secondary"
                        // onInput={(e) => changeTracking(e)}
                    />
                </form>
            </Typography>
        </Paper>

        {(trackingData)? <TimelineTracking {...trackingData}/>:<div>{" No Data available"}</div>}
    </div>
    )
}

export default TrackingEvent;