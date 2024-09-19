"use client";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";
import { getAllReservations, changeReservationStatus } from "@/lib/reservation";
import ReservationModal from "./ReservationModal";
import { userAppStore } from "@/store/store";

import Dropdown from "@/components/Dropdown";

import { SyncLoader } from "react-spinners";

//Icons
import { HiRefresh } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { IoEllipsisVerticalCircleOutline } from "react-icons/io5";

const Table = () => {
  const {
    currentDate,
    setCurrentDate,
    showModal,
    setShowModal,
    refreshData,
    setRefreshData,
  }: any = userAppStore();
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [reservations, setReservations] = useState([]);
  const [initialRecords, setInitialRecords] = useState([]);
  const [recordsData, setRecordsData] = useState(initialRecords);
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "id",
    direction: "asc",
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        const data: any = await getAllReservations();
        if (data.data) {
          setInitialRecords(data.data);
          setReservations(data.data);
        }
      } catch (error) {
        console.error("Error :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [refreshData]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecordsData([...initialRecords.slice(from, to)]);
  }, [page, pageSize, initialRecords]);

  useEffect(() => {
    setInitialRecords(() => {
      return reservations.filter((reservation: any) => {
        return (
          reservation.reservationTime
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          reservation.customer.firstName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          reservation.customer.lastName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          reservation.user.firstName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          reservation.user.lastName.toLowerCase().includes(search.toLowerCase())
        );
      });
    });
  }, [search, reservations]);

  useEffect(() => {
    setInitialRecords(() => {
      return reservations.filter((reservation: any) => {
        return reservation.reservationDate.split("T")[0] === currentDate;
      });
    });
  }, [currentDate]);

  const refreshReservations = () => {
    setInitialRecords(reservations);
  };

  const changeStatus = async (status: string, id: string) => {
    try {
      setIsLoading(true);
      const result: any = await changeReservationStatus(status, id);
      if (result.status === 200) {
        setRefreshData();
      }
    } catch (error) {
      console.error("Error :", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="panel mt-6 mx-5">
        <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
          <h5 className="text-lg font-semibold">All Reservations</h5>
          <div className="ml-auto flex space-x-4">
            <button
              onClick={refreshReservations}
              className="bg-blue-600 px-2.5 rounded-full"
            >
              <HiRefresh color="white" />
            </button>
            <button
              onClick={setShowModal}
              className="bg-blue-600 px-2.5 rounded-full"
            >
              <IoMdAdd color="white" />
            </button>
            <input
              type="text"
              className="form-input w-auto"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <SyncLoader color="#4361ee" size={20} />
          </div>
        ) : (
          <div className="datatables">
            <DataTable
              noRecordsText="No results match your search query"
              highlightOnHover
              className="table-hover whitespace-nowrap overflow-auto"
              records={recordsData}
              columns={[
                {
                  accessor: "Date",
                  sortable: true,
                  render: ({ reservationDate }: any) => (
                    <div className="font-medium">
                      <div>{`${reservationDate.split("T")[0]}`}</div>
                    </div>
                  ),
                },
                {
                  accessor: "TIME",
                  sortable: true,
                  render: ({ reservationTime }: any) => (
                    <div className="font-medium">
                      <div>{`${reservationTime}`}</div>
                    </div>
                  ),
                },
                {
                  accessor: "COVER",
                  sortable: true,
                  render: ({ cover }: any) => (
                    <div className="font-medium">
                      <div>{`${cover}`}</div>
                    </div>
                  ),
                },
                {
                  accessor: "Floor",
                  sortable: true,
                  render: ({ floor }: any) => (
                    <div className="font-medium">
                      <div>{`${floor}`}</div>
                    </div>
                  ),
                },
                {
                  accessor: "NAME",
                  sortable: true,
                  render: ({ customer }: any) => (
                    <div className="font-medium">
                      <div>{`${customer.firstName} ${customer.lastName}`}</div>
                    </div>
                  ),
                },
                {
                  accessor: "NOTES",
                  sortable: true,
                  render: ({ note }) => (
                    <div className="font-medium">
                      <div>{`${note}`}</div>
                    </div>
                  ),
                },
                {
                  accessor: "BOOKED BY",
                  sortable: true,
                  render: ({ user }: any) => (
                    <div className="font-medium">
                      <div>{`${user.firstName} ${user.lastName}`}</div>
                    </div>
                  ),
                },
                {
                  accessor: "STATUS",
                  sortable: true,
                  render: ({ status }) => (
                    <div className="font-medium">
                      <span
                        className={`${
                          status === "Confirmed"
                            ? "bg-yellow-600"
                            : status === "Booked"
                            ? "bg-green-600"
                            : status === "Cancelled"
                            ? "bg-red-600"
                            : "bg-primary"
                        } p-2 rounded-md  text-white`}
                      >{`${status}`}</span>
                    </div>
                  ),
                },
                {
                  accessor: "ACTIONS",
                  sortable: false,
                  render: ({ id, status }) =>
                    status !== "Cancelled" && (
                      <div className="dropdown">
                        <Dropdown
                          placement={"left" || "top"}
                          btnClassName="btn p-0 rounded-none border-0 shadow-none dropdown-toggle text-black hover:text-primary"
                          button={
                            <IoEllipsisVerticalCircleOutline
                              size={22}
                              color="#3b3f5c"
                            />
                          }
                        >
                          <ul className="!min-w-[170px] z-50">
                            {status !== "Booked" &&
                              status !== "Cancelled" &&
                              status !== "Completed" && (
                                <li>
                                  <button
                                    onClick={() => changeStatus("Booked", id)}
                                    type="button"
                                  >
                                    Booked
                                  </button>
                                </li>
                              )}
                            {status !== "Cancelled" &&
                              status !== "Completed" && (
                                <li>
                                  <button
                                    onClick={() =>
                                      changeStatus("Cancelled", id)
                                    }
                                    type="button"
                                  >
                                    Cancelled
                                  </button>
                                </li>
                              )}
                          </ul>
                        </Dropdown>
                      </div>
                    ),
                },
              ]}
              totalRecords={initialRecords.length}
              recordsPerPage={pageSize}
              page={page}
              onPageChange={(p) => setPage(p)}
              recordsPerPageOptions={PAGE_SIZES}
              onRecordsPerPageChange={setPageSize}
              sortStatus={sortStatus}
              onSortStatusChange={setSortStatus}
              minHeight={200}
              paginationText={({ from, to, totalRecords }) =>
                `Showing  ${from} to ${to} of ${totalRecords} reservations`
              }
            />
          </div>
        )}
      </div>
      {showModal && <ReservationModal />}
    </div>
  );
};

export default Table;
