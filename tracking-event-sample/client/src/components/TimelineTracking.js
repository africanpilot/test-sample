import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import AlarmOnIcon from "@material-ui/icons/AlarmOn";
import DoneIcon from "@material-ui/icons/Done";
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const TimelineTracking = (props) => {
  // console.log("TimelineTracking: ", props);

  const classes = useStyles();
  const iconGenerator = (status) => {
    switch (status) {
      case "Delivered":
        return (
          <DoneIcon />
        );
      case "Shipping":
        return (
          <AlarmOnIcon/>
        );
      case "Awaiting payment":
        return (
          <MonetizationOnOutlinedIcon/>
        );
      default:
        return "";
    }
  };

  return (
    <Timeline align="alternate">
      {(props.data)?
      props.data.map((item, index) => {
        // console.log("items: ", item);
        return (
          <TimelineItem key={index}>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                {item.date}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot>
                {iconGenerator(item.status)}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" component="h1">
                  {item.status}
                </Typography>
                <Typography>
                  {item.location}
                </Typography>
                <Typography>
                  {item.code}
                </Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        )
      }): <div>{""}</div>
    }
    </Timeline>
  );
}

export default TimelineTracking;