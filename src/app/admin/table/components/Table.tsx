"use client";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";
import { getAllTables } from "@/lib/table";
import { userAppStore } from "@/store/store";

import TableModal from "./TableModal";

//Icons
import { HiRefresh } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";

const Table = () => {
  const {
    refreshTableData,
    setRefreshTableData,
    showTableModal,
    setShowTableModal,
  }: any = userAppStore();
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [tables, setTables] = useState([]);
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
        const data: any = await getAllTables();
        if (data.data) {
          setInitialRecords(data.data);
          setTables(data.data);
        }
      } catch (error) {
        console.error("Error :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [refreshTableData]);

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
      return tables.filter((table: any) => {
        return (
          table.tableNumber
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          table.capacity
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          table.status.toLowerCase().includes(search.toLowerCase())
        );
      });
    });
  }, [search]);
  return (
    <div>
      <div className="panel mt-6 mx-5">
        <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
          <h5 className="text-lg font-semibold">All Tables</h5>
          <div className="ml-auto flex space-x-4">
            <button
              onClick={setRefreshTableData}
              className="bg-blue-600 px-2.5 rounded-full"
            >
              <HiRefresh color="white" />
            </button>
            <button
              onClick={setShowTableModal}
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
        <div className="datatables">
          <DataTable
            noRecordsText="No results match your search query"
            highlightOnHover
            className="table-hover whitespace-nowrap"
            records={recordsData}
            columns={[
              {
                accessor: "tableNumber",
                title: "Table Number",
                sortable: true,
              },
              { accessor: "capacity", title: "Capacity", sortable: true },
              {
                accessor: "STATUS",
                sortable: true,
                render: ({ status }) => (
                  <div className="font-medium">
                    <span
                      className={`${
                        status === "Reserved"
                          ? "bg-yellow-600"
                          : status === "Available"
                          ? "bg-green-600"
                          : "bg-red-600"
                      } p-2 rounded-md  text-white`}
                    >{`${status}`}</span>
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
              `Showing  ${from} to ${to} of ${totalRecords} tables`
            }
          />
        </div>
      </div>
      {showTableModal && <TableModal />}
    </div>
  );
};

export default Table;
