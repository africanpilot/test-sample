import React, { useState, useEffect } from "react";
import {fetchData} from "../api/index";
import TimelineTracking from "./TimelineTracking"
// import TempDataAll from "./TempData.json"
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(true);
    const [trackingData, setTrackingData] = useState({});
    const [trackingId, setTrackingId] = useState("BPS65O4WYLBWWBR");

    const classes = useStyles();

    const submitTracking = (e) => {
        e.preventDefault();
        console.log("New Tacking: ",trackingId);
        getTracking();
    }

    const getTracking = async () =>{
        setLoading(true);
        try {
            const result = await fetchData(trackingId);
            if(result.code === 400){setTrackingData({}); setNoData(true);}
            else{setTrackingData(result.data);setNoData(false);}
        } catch (error) {
          console.error(error.message);
        }
        setLoading(false);
    }

    const parseTracking = (resp) =>{
        try {
            
            var data = JSON.parse(resp); 
            if(data.code !== 400 && !noData){
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
                return newData;
            }
            return {};
        } catch (error) {
          console.error(error.message);
        }
    }

    useEffect(() => { 
        // console.log("effect")  
        getTracking();
    }, [trackingData]);
    
    return (
    <div>
        <Paper elevation={3} className={classes.paper}>
            <Typography variant="h6" component="h1">
                
                <div><h1>{"BPS Tracking"}</h1></div>
                <form onSubmit={submitTracking} className={classes.root} noValidate autoComplete="off">
                    <TextField
                        id="outlined-secondary"
                        label="Tracking Id"
                        variant="outlined"
                        color="secondary"
                        defaultValue={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                    />
                </form>
            </Typography>
        </Paper>

        {(trackingData && !loading)? <TimelineTracking {...parseTracking(trackingData)}/>
        :<CircularProgress/>
        }
    </div>
    )
}

export default TrackingEvent;