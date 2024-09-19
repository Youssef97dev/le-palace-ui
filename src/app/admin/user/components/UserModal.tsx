"use client";

import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import { userAppStore } from "@/store/store";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import { addNewUser, updateUser } from "@/lib/user";

import { BeatLoader } from "react-spinners";

const UserModal = ({ row }: any) => {
  const {
    setRefreshUserData,
    showUserModal,
    setShowUserModal,
    user_firstName,
    user_lastName,
    user_email,
    password,
    username,
  }: any = userAppStore();

  const [isLoading, setIsLoading] = useState(false);

  const submitUser = async () => {
    try {
      setIsLoading(true);
      const user: any = row
        ? await updateUser(
            row.id,
            user_firstName,
            user_lastName,
            user_email,
            password,
            username
          )
        : await await addNewUser(
            user_firstName,
            user_lastName,
            user_email,
            password,
            username
          );
      if (user.status === 201 || user.status === 200) {
        setRefreshUserData();
        setShowUserModal(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Transition appear show={showUserModal} as={Fragment}>
      <Dialog as="div" open={showUserModal} onClose={setShowUserModal}>
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
                  {row ? "Edit User" : "Add User"}
                </h5>
                <button
                  onClick={setShowUserModal}
                  type="button"
                  className="text-white-dark hover:text-dark"
                >
                  X
                </button>
              </div>
              <div className="p-5">
                <div className="space-y-2 font-semibold">
                  {row ? <EditUser row={row} /> : <AddUser />}
                </div>
                <div className="flex justify-end items-center mt-8">
                  <button
                    onClick={setShowUserModal}
                    type="button"
                    className="btn btn-outline-danger"
                  >
                    Discard
                  </button>
                  <button
                    onClick={submitUser}
                    type="button"
                    className="btn btn-primary ml-4"
                    disabled={isLoading}
                  >
                    {!isLoading ? (
                      `Save`
                    ) : (
                      <BeatLoader color="#fff" size={10} />
                    )}
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

export default UserModal;
