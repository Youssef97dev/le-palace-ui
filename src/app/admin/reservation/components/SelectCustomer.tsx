"use client";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import AddCustomer from "../../customer/components/AddCustomer";

import { userAppStore } from "@/store/store";
import { getAllCustomers } from "@/lib/customer";

const SelectCustomer = () => {
  const { customers, setCustomers, setCustomerId }: any = userAppStore();
  const [isSelected, setIsSelected] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [addCustomer, setAddCustomer] = useState(false);

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const result: any = await getAllCustomers();
        setCustomers(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCustomers();
  }, []);

  return (
    <>
      {!addCustomer ? (
        <div className="flex flex-col h-60 w-full justify-between items-center">
          <div className="w-full flex flex-col space-y-3 items-center">
            <Autocomplete
              className="w-full"
              id="free-solo-demo"
              freeSolo
              options={customers}
              getOptionLabel={(customer: any) =>
                `${customer.firstName} ${customer.lastName}`
              }
              renderInput={(params) => (
                <TextField {...params} label="customers" />
              )}
              onInputChange={(event: any, newInputValue) => {
                setIsSelected(false);
                setShowAlert(true);
                setCustomerId("");
              }}
              onChange={(event: any, value: any) => {
                setIsSelected(true);
                setShowAlert(false);
                setCustomerId(value.id);
              }}
            />

            <button
              onClick={() => setAddCustomer(true)}
              className="btn btn-primary "
            >
              Add as client!
            </button>
          </div>

          {!isSelected && showAlert && (
            <div className="flex w-full items-center p-3.5 rounded text-white bg-warning">
              <span className="pr-2">
                <strong className="mr-1">Warning!</strong>Please select a
                client!
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
        </div>
      ) : (
        <div>
          <button
            className="btn btn-danger ml-auto mb-2"
            onClick={() => setAddCustomer(false)}
          >
            Deselect
          </button>
          <AddCustomer />
        </div>
      )}
    </>
  );
};

export default SelectCustomer;
