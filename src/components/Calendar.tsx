import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { userAppStore } from "@/store/store";

const CalendarUI = () => {
  const { currentDate, setCurrentDate }: any = userAppStore();
  const [value, setValue] = useState(new Date());

  const selectDate = (e: any) => {
    console.log(e.toISOString().split("T")[0]);
    setCurrentDate(e.toISOString().split("T")[0]);
  };

  return (
    <div>
      <Calendar onChange={(e) => selectDate(e)} value={value} />
    </div>
  );
};

export default CalendarUI;
