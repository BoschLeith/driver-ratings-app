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

  useEffect(() => {
    if (driver?.data) {
      setFormData({
        firstName: driver.data.firstName,
        lastName: driver.data.lastName,
        driverCode: driver.data.driverCode,
      });
    }
  }, [driver]);

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Driver Code:</label>
        <input
          type="text"
          name="driverCode"
          value={formData.driverCode}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">
        {driverId ? "Update Driver" : "Create Driver"}
      </button>
    </form>
  );
}
