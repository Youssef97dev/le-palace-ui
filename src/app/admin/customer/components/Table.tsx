"use client";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";
import { getAllCustomers } from "@/lib/customer";
import { userAppStore } from "@/store/store";

import CustomerModal from "./CustomerModal";

//Icons
import { HiRefresh } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { TiEdit } from "react-icons/ti";

const Table = () => {
  const {
    refreshCustomerData,
    setRefreshCustomerData,
    showCustomerModal,
    setShowCustomerModal,
  }: any = userAppStore();
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [costumers, setCostumers] = useState([]);
  const [initialRecords, setInitialRecords] = useState([]);
  const [recordsData, setRecordsData] = useState(initialRecords);
  const [selectedRow, setSelectedRow] = useState(null);
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
        const data: any = await getAllCustomers();
        if (data.data) {
          setInitialRecords(data.data);
          setCostumers(data.data);
        }
      } catch (error) {
        console.error("Error :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [refreshCustomerData]);

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
      return costumers.filter((customer: any) => {
        return (
          customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
          customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
          customer.email.toLowerCase().includes(search.toLowerCase()) ||
          customer.phoneNumber.toLowerCase().includes(search.toLowerCase())
        );
      });
    });
  }, [search]);

  const showEditCustomer = (row: any) => {
    setSelectedRow(row);
    setShowCustomerModal();
  };

  const showAddCustomer = () => {
    setSelectedRow(null);
    setShowCustomerModal();
  };

  return (
    <div>
      <div className="panel mt-6 mx-5">
        <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
          <h5 className="text-lg font-semibold">All Cutomers</h5>
          <div className="ml-auto flex space-x-4">
            <button
              onClick={setRefreshCustomerData}
              className="bg-blue-600 px-2.5 rounded-full"
            >
              <HiRefresh color="white" />
            </button>
            <button
              onClick={showAddCustomer}
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
              { accessor: "firstName", title: "First Name", sortable: true },
              { accessor: "lastName", title: "Last Name", sortable: true },
              { accessor: "email", sortable: true },
              { accessor: "phoneNumber", sortable: true },
              { accessor: "note", sortable: false },
              {
                accessor: "ACTIONS",
                sortable: true,
                render: (row) => (
                  <div
                    className="font-medium cursor-pointer"
                    onClick={() => showEditCustomer(row)}
                  >
                    <TiEdit size={20} color="#3b3f5c" />
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
              `Showing  ${from} to ${to} of ${totalRecords} customers`
            }
          />
        </div>
      </div>
      {showCustomerModal && <CustomerModal row={selectedRow} />}
    </div>
  );
};

export default Table;
