"use client";
import { userAppStore } from "@/store/store";

const AddUser = () => {
  const {
    setUsername,
    setUserFirstName,
    setUserLastName,
    setUserEmail,
    setPassword,
  }: any = userAppStore();

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex gap-2">
        <div className="w-full">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter First Name"
            className="form-input"
            onChange={(e) => setUserFirstName(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
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
            type="email"
            placeholder="Enter Email"
            className="form-input"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            className="form-input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter Username"
          className="form-input"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AddUser;
