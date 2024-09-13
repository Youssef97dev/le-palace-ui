"use client";

import { useEffect, useState } from "react";
import { getReservationsByMonth } from "@/lib/reservation";
import Chart from "react-apexcharts";
import { BounceLoader } from "react-spinners";

const ReservationChart = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reservationByMonth, setReservationByMonth] = useState([]);

  useEffect(() => {
    const reservationByMonth = async () => {
      try {
        const result = await getReservationsByMonth();
        setReservationByMonth(result);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    reservationByMonth();
  }, []);

  useEffect(() => {
    setIsMounted(true);
  });

  // uniqueVisitorSeriesOptions
  const reservationCount: any = {
    series: [
      {
        name: "Reservation Number",
        data:
          reservationByMonth.length > 0
            ? reservationByMonth
            : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
    options: {
      chart: {
        height: 360,
        type: "bar",
        fontFamily: "Nunito, sans-serif",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        colors: ["transparent"],
      },
      colors: ["#5c1ac3", "#ffbb44"],
      dropShadow: {
        enabled: true,
        blur: 3,
        color: "#515365",
        opacity: 0.4,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 8,
          borderRadiusApplication: "end",
        },
      },
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        fontSize: "14px",
        itemMargin: {
          horizontal: 8,
          vertical: 8,
        },
      },
      grid: {
        borderColor: "#e0e6ed",
        padding: {
          left: 20,
          right: 20,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        axisBorder: {
          show: true,
          color: "#e0e6ed",
        },
      },
      yaxis: {
        tickAmount: 6,
        opposite: false,
        labels: {
          offsetX: 0,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.3,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 0.8,
          stops: [0, 100],
        },
      },
      tooltip: {
        marker: {
          show: true,
        },
      },
    },
  };

  return (
    <div className="panel h-full p-0 lg:col-span-2">
      <div className="mb-5 flex items-start justify-between border-b border-white-light p-5">
        <h5 className="text-lg font-semibold ">Reservation Statistics</h5>
      </div>

      {isMounted && !isLoading ? (
        <Chart
          options={reservationCount.options}
          series={reservationCount.series}
          type="bar"
          height={360}
          width={"100%"}
        />
      ) : (
        <div className="flex justify-center items-center h-full">
          <BounceLoader size={100} />
        </div>
      )}
    </div>
  );
};

export default ReservationChart;
