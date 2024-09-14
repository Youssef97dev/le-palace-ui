import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { userAppStore } from "@/store/store";

const CalendarUI = () => {
  const { currentDate, setCurrentDate }: any = userAppStore();
  const [value, setValue] = useState(new Date());

  const selectDate = (e: any) => {
    setCurrentDate(
      new Date(e.getFullYear(), e.getMonth(), e.getDate() + 1)
        .toISOString()
        .split("T")[0]
    );
  };

  return (
    <div>
      <Calendar onChange={(e) => selectDate(e)} value={value} />
    </div>
  );
};

export default CalendarUI;
