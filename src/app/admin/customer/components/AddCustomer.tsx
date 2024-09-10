"use client";
import { userAppStore } from "@/store/store";
import { getAvailableTables } from "@/lib/table";

const AddCustomer = () => {
  const { setNote, setFirstName, setLastName, setEmail, setPhoneNumber }: any =
    userAppStore();

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
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
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
          placeholder="Note"
          className="form-input"
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AddCustomer;
