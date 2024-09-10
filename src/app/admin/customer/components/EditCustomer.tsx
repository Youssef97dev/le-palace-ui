"use client";
import { userAppStore } from "@/store/store";
import { useEffect } from "react";

const EditCustomer = ({ row }: any) => {
  const {
    setNote,
    setFirstName,
    setLastName,
    setEmail,
    setPhoneNumber,
    firstName,
    lastName,
    email,
    phoneNumber,
    note,
  }: any = userAppStore();

  useEffect(() => {
    setFirstName(row.firstName);
    setLastName(row.lastName);
    setEmail(row.email);
    setPhoneNumber(row.phoneNumber);
    setNote(row.note);
  }, []);
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex gap-2">
        <div className="w-full">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            defaultValue={row.firstName}
            placeholder="Enter First Name"
            className="form-input"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            defaultValue={row.lastName}
            placeholder="Enter Last Name"
            className="form-input"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full flex gap-2">
        <div className="w-full">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            defaultValue={row.email}
            type="email"
            placeholder="Enter Email"
            className="form-input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            defaultValue={row.phoneNumber}
            id="phone"
            placeholder="Enter Phone Number"
            className="form-input"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full">
        <label htmlFor="note">Note</label>
        <textarea
          id="note"
          defaultValue={row.note}
          placeholder="Note"
          className="form-input"
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
    </div>
  );
};

export default EditCustomer;
