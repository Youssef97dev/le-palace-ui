"use client";
import { useState, useRef } from "react";
import Flatpickr from "react-flatpickr";
import { userAppStore } from "@/store/store";
import { getAvailableTables } from "@/lib/table";

// Icons
import { IoCalendarOutline } from "react-icons/io5";

import "flatpickr/dist/flatpickr.css";

const AddReservation = () => {
  const {
    reservationDate,
    setReservationDate,
    reservationCover,
    setReservationCover,
    availableTables,
    setAvailableTables,
    setReservationTime,
    setTableId,
    setReservationNote,
  }: any = userAppStore();
  const flatpickrRef: any = useRef(null);
  const [guests, setGuests] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ]);
  const [time, setTime] = useState([
    "19:00 PM",
    "19:15 PM",
    "19:30 PM",
    "20:00 PM",
    "20:15 PM",
    "20:30 PM",
    "21:00 PM",
    "21:15 PM",
    "21:30 PM",
    "22:00 PM",
    "22:15 PM",
    "22:30 PM",
    "23:00 PM",
    "23:15 PM",
    "23:30 PM",
    "00:00 AM",
    "00:15 AM",
    "00:30 AM",
    "01:00 AM",
  ]);

  const showAvailableTables = async (time: string, date: string) => {
    try {
      const result: any = await getAvailableTables(
        time,
        new Date(date).toISOString().split("T")[0]
      );
      setAvailableTables(result.data);
      setReservationTime(time);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <div
        onClick={() => flatpickrRef.current.flatpickr.open()}
        className="border m-2  py-1 px-3 flex w-full md:w-fit justify-between items-center rounded-lg"
      >
        <div className="flex flex-col">
          <span>Date</span>
          <Flatpickr
            ref={flatpickrRef}
            value={reservationDate}
            className="text-black focus:outline-none"
            options={{ dateFormat: "Y-m-d", position: "auto left" }}
            onChange={([date]) => setReservationDate(date)}
          />
        </div>
        <IoCalendarOutline size={25} />
      </div>
      <div className="p-2 flex flex-col space-y-2">
        <span>Guests</span>
        <div className="space-x-0 flex md:flex-row flex-col w-full md:w-fit">
          {guests.map((guest: string) => (
            <div
              key={guest}
              className={`border py-3 px-5 hover:bg-black-dark-light cursor-pointer font-semibold text-black text-lg ${
                reservationCover === guest ? "bg-black-dark-light" : ""
              }`}
              onClick={() => setReservationCover(guest)}
            >
              {guest}
            </div>
          ))}
        </div>
      </div>
      <div className="p-2">
        <label htmlFor="ctnSelect1">Reservation Time</label>
        <select
          id="ctnSelect1"
          className="form-select text-white-dark"
          onChange={(e) => showAvailableTables(e.target.value, reservationDate)}
          required
        >
          <option>Select Reservation Time</option>
          {time.map((item: string) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="p-2">
        <label htmlFor="ctnSelect1">Tables</label>
        <select
          id="ctnSelect1"
          className="form-select text-white-dark"
          onChange={(e) => setTableId(e.target.value)}
          required
        >
          <option>Select Available Table</option>
          {availableTables?.length > 0 &&
            availableTables.map((table: any, i: any) => (
              <option value={table.id} key={i}>
                {table.tableNumber}
              </option>
            ))}
        </select>
      </div>
      <div className="p-2">
        <label htmlFor="note">Note</label>
        <textarea
          id="reservation_note"
          placeholder="Note"
          className="form-input"
          onChange={(e) => setReservationNote(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AddReservation;
