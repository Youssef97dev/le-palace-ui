import Card from "./widgets/Card";
import ReservationTable from "./widgets/ReservationTable";

const Dashboard = () => {
  return (
    <div className=" mt-3 px-5 w-full flex flex-col gap-8">
      {/* USER CARDS */}
      <div className="flex gap-4 justify-between flex-wrap">
        <Card type="reservations" title="Reservations" />
        <Card type="customers" title="Clients" />
        <Card type="tables" title="Tables" />
        <Card type="users" title="Users" />
      </div>

      {/* MIDDLE CHARTS */}
      <div className="flex gap-4 flex-col lg:flex-row">
        {/* COUNT CHART */}
        <div className="w-full lg:w-1/2 h-[450px] rounded-lg">
          <ReservationTable />
        </div>
        {/* ATTENDANCE CHART */}
        <div className="w-full lg:w-1/2 h-[450px] bg-white-dark">
          attendance chart
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
