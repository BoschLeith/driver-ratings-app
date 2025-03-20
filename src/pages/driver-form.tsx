import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  useCreateDriverMutation,
  useDriverQuery,
  useUpdateDriverMutation,
} from "../services/query-service";

export default function DriverForm() {
  const { driverId } = useParams();
  const navigate = useNavigate();

  const {
    data: driver,
    isLoading,
    isError,
  } = useDriverQuery(Number(driverId!));
  const { mutate: createDriver } = useCreateDriverMutation();
  const { mutate: updateDriver } = useUpdateDriverMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    driverCode: "",
  });

  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (driver?.data) {
      const initialData = {
        firstName: driver.data.firstName,
        lastName: driver.data.lastName,
        driverCode: driver.data.driverCode,
      };
      setFormData(initialData);
      setIsDirty(false);
    }
  }, [driver]);

  useEffect(() => {
    if (driver?.data) {
      const initialData = {
        firstName: driver.data.firstName,
        lastName: driver.data.lastName,
        driverCode: driver.data.driverCode,
      };
      setIsDirty(
        formData.firstName !== initialData.firstName ||
          formData.lastName !== initialData.lastName ||
          formData.driverCode !== initialData.driverCode
      );
    }
  }, [formData, driver]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (driverId) {
      updateDriver({ driverId: Number(driverId), newDriver: formData });
    } else {
      createDriver(formData);
    }
    navigate("/dashboard/drivers");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading driver data.</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-base-200 rounded-lg shadow-md max-w-md mx-auto"
    >
      <div className="pb-4">
        <label className="floating-label">
          <span>First Name</span>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="input w-full"
          />
        </label>
      </div>
      <div className="pb-4">
        <label className="floating-label">
          <span>Last Name</span>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="input w-full"
          />
        </label>
      </div>
      <div className="pb-4">
        <label className="floating-label">
          <span>Driver Code</span>
          <input
            type="text"
            name="driverCode"
            value={formData.driverCode}
            onChange={handleChange}
            required
            className="input w-full"
          />
        </label>
      </div>
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!isDirty}
      >
        {driverId ? "Update Driver" : "Create Driver"}
      </button>
    </form>
  );
}
