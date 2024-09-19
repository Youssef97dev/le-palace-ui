"use client";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";
import { getAllUsers } from "@/lib/user";
import { userAppStore } from "@/store/store";

import UserModal from "./UserModal";

//Icons
import { HiRefresh } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { TiEdit } from "react-icons/ti";

import { SyncLoader } from "react-spinners";

const Table = () => {
  const {
    refreshUserData,
    setRefreshUserData,
    showUserModal,
    setShowUserModal,
  }: any = userAppStore();
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [users, setUsers] = useState([]);
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
        const data: any = await getAllUsers();
        if (data.data) {
          setInitialRecords(data.data);
          setUsers(data.data);
        }
      } catch (error) {
        console.error("Error :", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [refreshUserData]);

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
      return users.filter((user: any) => {
        return (
          user.firstName.toLowerCase().includes(search.toLowerCase()) ||
          user.lastName.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.username.toLowerCase().includes(search.toLowerCase())
        );
      });
    });
  }, [search, users]);

  const showEditUser = (row: any) => {
    setSelectedRow(row);
    setShowUserModal();
  };

  const showAddUser = () => {
    setSelectedRow(null);
    setShowUserModal();
  };

  return (
    <div>
      <div className="panel mt-6 mx-5">
        <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
          <h5 className="text-lg font-semibold">All Users</h5>
          <div className="ml-auto flex space-x-4">
            <button
              onClick={setRefreshUserData}
              className="bg-blue-600 px-2.5 rounded-full"
            >
              <HiRefresh color="white" />
            </button>
            <button
              onClick={showAddUser}
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
              className="table-hover whitespace-nowrap"
              records={recordsData}
              columns={[
                { accessor: "firstName", title: "First Name", sortable: true },
                { accessor: "lastName", title: "Last Name", sortable: true },
                { accessor: "email", sortable: true },
                { accessor: "username", sortable: true },
                {
                  accessor: "ACTIONS",
                  sortable: true,
                  render: (row) => (
                    <div
                      className="font-medium cursor-pointer"
                      onClick={() => showEditUser(row)}
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
                `Showing  ${from} to ${to} of ${totalRecords} users`
              }
            />
          </div>
        )}
      </div>
      {showUserModal && <UserModal row={selectedRow} />}
    </div>
  );
};

export default Table;
