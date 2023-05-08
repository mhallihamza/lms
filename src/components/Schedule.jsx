import React, { useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import moment from 'moment';
function Calendar({schedules}) {
  const {user,loading,error,dispatch} = useContext(AuthContext)
  const [currentView, setCurrentView] = useState('dayGridMonth');
  console.log(schedules);
  let evenments = schedules?.map(schedule => {
    let start = moment().day(schedule.weekday).set({
      'hour': parseInt(schedule.startTime.split(':')[0]),
      'minute': parseInt(schedule.startTime.split(':')[1])
    });
    let end = moment().day(schedule.weekday).set({
      'hour': parseInt(schedule.endTime.split(':')[0]),
      'minute': parseInt(schedule.endTime.split(':')[1])
    });
    return {
      'title': schedule.course.instructor.username + ' '+ schedule.course.title,
      'start': start.toISOString(),
      'end': end.toISOString(),
    }
  });

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const eventTitle = (arg) => {
    if (currentView === 'timeGridWeek') {
      return arg.event.title;
    } else {
      return arg.event.title ;
    }
  };
  const headerToolbar = user.role === "student" ? {
    start: "",
    center: "title",
    end: ""
  } : {
    start: "today prev,next",
    center: "title",
    end: "timeGridWeek,timeGridDay,dayGridMonth"
  };
// Define isSmallScreen variable
const isSmallScreen = window.innerWidth < 640;

const initialView = user.role === "student" ? "timeGridWeek" : "dayGridMonth";

const height = isSmallScreen ? "40rem" : "100vh";

  return (
    <div>
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={initialView}
        headerToolbar={headerToolbar}
        timeZone= {'local'}
        height={height}
        locale= {'fr'}
        events={evenments}
        slotMinTime={"08:00"}
        slotMaxTime={"18:00"}
        eventContent={(arg) => (
          <div className="flex">
            <p style={{fontSize: "12px", margin: "0", fontWeight:"bold"}}>{eventTitle(arg)}</p>
          </div>
        )}
        viewDidMount={(view) => handleViewChange(view.view.type)}
        viewSkeletonRender={(view) => handleViewChange(view.viewSpec.type)}
      />
    </div>
  );
}

export default Calendar;
