"use client";
import { userAppStore } from "@/store/store";

const AddTable = () => {
  const { setTableNumber, setcapacity }: any = userAppStore();

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex gap-2">
        <div className="w-full">
          <label htmlFor="tableNumber">Table Number</label>
          <input
            type="number"
            id="tableNumber"
            placeholder="Enter Table Number"
            className="form-input"
            onChange={(e) => setTableNumber(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full flex gap-2">
        <div className="w-full">
          <label htmlFor="capacity">Capacity</label>
          <input
            id="capacity"
            type="number"
            placeholder="Enter Capacity"
            className="form-input"
            onChange={(e) => setcapacity(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddTable;
