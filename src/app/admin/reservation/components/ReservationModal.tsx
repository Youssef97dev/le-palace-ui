"use client";

import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import AnimateHeight from "react-animate-height";
import { userAppStore } from "@/store/store";
import { addNewReservation } from "@/lib/reservation";

import AddReservation from "./AddReservation";
import SelectCustomer from "./SelectCustomer";

// Icons
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosPersonAdd } from "react-icons/io";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

const ReservationModal = () => {
  const {
    showModal,
    setShowModal,
    reservationDate,
    reservationTime,
    reservationCover,
    tableId,
    reservationNote,
    customerId,
    firstName,
    lastName,
    email,
    phoneNumber,
    note,
    userInfo,
    setRefreshData,
  }: any = userAppStore();
  const [active2, setActive2] = useState<string>("1");
  const togglePara2 = (value: string) => {
    setActive2((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  const submitReservation = async () => {
    const reservation: any = await addNewReservation(
      userInfo.id,
      customerId,
      tableId,
      new Date(reservationDate).toISOString(),
      reservationTime,
      Number(reservationCover),
      reservationNote,
      firstName,
      lastName,
      email,
      phoneNumber,
      note
    );

    if (reservation.status === 201) {
      setRefreshData();
      setShowModal(false);
    }
  };

  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog as="div" open={showModal} onClose={setShowModal}>
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
                <h5 className="font-bold text-lg">Add Reservation</h5>
                <button
                  onClick={setShowModal}
                  type="button"
                  className="text-white-dark hover:text-dark"
                >
                  X
                </button>
              </div>
              <div className="p-5">
                <div className="space-y-2 font-semibold">
                  <div className="border border-[#d3d3d3] rounded-lg">
                    <button
                      type="button"
                      className={`p-4 rounded-lg w-full flex items-center text-white-light bg-primary`}
                      onClick={() => togglePara2("1")}
                    >
                      <div className="flex space-x-2 justify-center">
                        <FaCalendarAlt size={20} />
                        <span>Availability</span>
                      </div>
                      <div className={`ml-auto `}>
                        {active2 === "1" ? (
                          <IoIosArrowDropup size={20} />
                        ) : (
                          <IoIosArrowDropdown size={20} />
                        )}
                      </div>
                    </button>
                    <div>
                      <AnimateHeight
                        duration={300}
                        height={active2 === "1" ? "auto" : 0}
                      >
                        <div className="p-2 text-white-dark text-[13px]">
                          <AddReservation />
                        </div>
                      </AnimateHeight>
                    </div>
                  </div>
                  <div className="border border-[#d3d3d3] rounded-lg">
                    <button
                      type="button"
                      className={`p-4 rounded-lg w-full flex items-center text-white-light bg-primary`}
                      onClick={() => togglePara2("2")}
                    >
                      <div className="flex space-x-2 justify-center">
                        <IoIosPersonAdd size={20} />
                        <span>Customer</span>
                      </div>
                      <div className={`ml-auto `}>
                        {active2 === "2" ? (
                          <IoIosArrowDropup size={20} />
                        ) : (
                          <IoIosArrowDropdown size={20} />
                        )}
                      </div>
                    </button>
                    <div>
                      <AnimateHeight
                        duration={300}
                        height={active2 === "2" ? "auto" : 0}
                      >
                        <div className="space-y-2 p-4 text-white-dark text-[13px]">
                          <SelectCustomer />
                        </div>
                      </AnimateHeight>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end items-center mt-8">
                  <button
                    onClick={setShowModal}
                    type="button"
                    className="btn btn-outline-danger"
                  >
                    Discard
                  </button>
                  <button
                    onClick={submitReservation}
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

export default ReservationModal;
