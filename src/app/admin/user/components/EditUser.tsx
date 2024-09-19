"use client";
import { userAppStore } from "@/store/store";
import { useEffect } from "react";

const EditUser = ({ row }: any) => {
  const {
    setPassword,
    setUserFirstName,
    setUserLastName,
    setUserEmail,
    setUsername,
    user_firstName,
    user_lastName,
    user_email,
    password,
    username,
  }: any = userAppStore();

  useEffect(() => {
    setUserFirstName(row.firstName);
    setUserLastName(row.lastName);
    setUserEmail(row.email);
    setUsername(row.username);
  }, [
    row.firstName,
    row.lastName,
    row.email,
    setUserFirstName,
    setUserLastName,
    setUserEmail,
    setUsername,
  ]);
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
            onChange={(e) => setUserFirstName(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            defaultValue={row.lastName}
            placeholder="Enter Last Name"
            className="form-input"
            onChange={(e) => setUserLastName(e.target.value)}
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
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label htmlFor="phone">Password</label>
          <input
            type="text"
            id="phone"
            placeholder="Enter Password"
            className="form-input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full">
        <label htmlFor="note">Username</label>
        <input
          type="text"
          id="note"
          defaultValue={row.username}
          placeholder="Enter Username"
          className="form-input"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
    </div>
  );
};

export default EditUser;
