"use client";

import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import { userAppStore } from "@/store/store";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { addNewCustomer, updateCustomer } from "@/lib/customer";

const CustomerModal = ({ row }: any) => {
  const {
    setRefreshCustomerData,
    showCustomerModal,
    setShowCustomerModal,
    firstName,
    lastName,
    email,
    phoneNumber,
    note,
  }: any = userAppStore();

  const submitCustomer = async () => {
    const customer: any = row
      ? await updateCustomer(
          row.id,
          firstName,
          lastName,
          email,
          phoneNumber,
          note
        )
      : await addNewCustomer(firstName, lastName, email, phoneNumber, note);

    if (customer.status === 201 || customer.status === 200) {
      setRefreshCustomerData();
      setShowCustomerModal(false);
    }
  };
  return (
    <Transition appear show={showCustomerModal} as={Fragment}>
      <Dialog as="div" open={showCustomerModal} onClose={setShowCustomerModal}>
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
                <h5 className="font-bold text-lg">
                  {row ? "Edit Client" : "Add Client"}
                </h5>
                <button
                  onClick={setShowCustomerModal}
                  type="button"
                  className="text-white-dark hover:text-dark"
                >
                  X
                </button>
              </div>
              <div className="p-5">
                <div className="space-y-2 font-semibold">
                  {row ? <EditCustomer row={row} /> : <AddCustomer />}
                </div>
                <div className="flex justify-end items-center mt-8">
                  <button
                    onClick={setShowCustomerModal}
                    type="button"
                    className="btn btn-outline-danger"
                  >
                    Discard
                  </button>
                  <button
                    onClick={submitCustomer}
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

export default CustomerModal;
