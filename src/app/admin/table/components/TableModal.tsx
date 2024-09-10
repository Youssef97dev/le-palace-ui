"use client";

import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import { userAppStore } from "@/store/store";
import { addNewTables } from "@/lib/table";

import AddTable from "./AddTable";

const TableModal = () => {
  const {
    setRefreshTableData,
    showTableModal,
    setShowTableModal,
    tableNumber,
    capacity,
  }: any = userAppStore();
  const [showAlert, setShowAlert] = useState(false);

  const submitTable = async () => {
    try {
      const newTable: any = await addNewTables(
        Number(tableNumber),
        Number(capacity)
      );
      if (newTable.status === 201) {
        setRefreshTableData();
        setShowTableModal();
      }
    } catch (error) {
      setShowAlert(true);
      console.log("hh");
    }
  };

  return (
    <Transition appear show={showTableModal} as={Fragment}>
      <Dialog as="div" open={showTableModal} onClose={setShowTableModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0" />
        </TransitionChild>
        <div
          id="fadein_left_modal"
          className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto"
        >
          <div className="flex items-start justify-center min-h-screen px-4">
            <DialogPanel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-4xl my-8 text-black animate__animated animate__fadeInUp">
              <div className="flex bg-[#fbfbfb] items-center justify-between px-5 py-3">
                <h5 className="font-bold text-lg">Add Table</h5>
                <button
                  onClick={setShowTableModal}
                  type="button"
                  className="text-white-dark hover:text-dark"
                >
                  X
                </button>
              </div>
              <div className="p-5">
                <div className="space-y-2 font-semibold">
                  <AddTable />
                </div>
                {showAlert && (
                  <div className="flex w-full items-center p-3.5 rounded text-white mt-5 bg-danger">
                    <span className="pr-2">
                      <strong className="mr-1">Error!</strong>The Table Number
                      Already Exist!
                    </span>
                    <button
                      onClick={() => setShowAlert(false)}
                      type="button"
                      className="ml-auto hover:opacity-80"
                    >
                      X
                    </button>
                  </div>
                )}
                <div className="flex justify-end items-center mt-8">
                  <button
                    onClick={setShowTableModal}
                    type="button"
                    className="btn btn-outline-danger"
                  >
                    Discard
                  </button>
                  <button
                    onClick={submitTable}
                    type="button"
                    className="btn btn-primary ml-4"
                  >
                    Save
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TableModal;
