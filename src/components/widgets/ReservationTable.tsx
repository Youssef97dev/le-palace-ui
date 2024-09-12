"use client";
import { useEffect, useState } from "react";
import { getAllReservationsToday } from "@/lib/reservation";
import { BounceLoader } from "react-spinners";

const ReservationTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reservationsToday, setReservationsToday] = useState([]);
  useEffect(() => {
    const getReservations = async () => {
      try {
        const data = await getAllReservationsToday();
        setReservationsToday(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getReservations();
  }, []);
  return (
    <div className="panel h-full w-full overflow-y-auto">
      <div className="mb-5 flex items-center justify-between">
        <h5 className="text-lg font-semibold">Today Reservations</h5>
      </div>
      {isLoading ? (
        <BounceLoader />
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th className="rounded-l-md">Time</th>
                <th>Name</th>
                <th>Cover</th>
                <th className="rounded-r-md">Status</th>
              </tr>
            </thead>
            <tbody>
              {reservationsToday.map((reservation: any) => (
                <tr
                  key={reservation.id}
                  className="group text-white-dark hover:text-black "
                >
                  <td className="min-w-[150px] text-black">
                    <span className="whitespace-nowrap">
                      {reservation.reservationTime}
                    </span>
                  </td>
                  <td className="text-primary">{`${reservation.customer.firstName} ${reservation.customer.lastName}`}</td>
                  <td>{reservation.cover}</td>
                  <td>
                    <span
                      className={`badge shadow-md ${
                        reservation.status === "Confirmed"
                          ? "bg-warning"
                          : reservation.status === "Booked"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {reservation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReservationTable;
