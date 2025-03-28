import { FormEvent, useEffect, useState } from "react";

import { POST, PUT } from "../api/axios-instance";
import { Team } from "../types/types";

interface TeamFormProps {
  selectedTeam: Team | null;
  onCancel: () => void;
  onSave: (team: Team) => void;
}

export default function TeamForm({
  selectedTeam,
  onCancel,
  onSave,
}: TeamFormProps) {
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedTeam) {
      setName(selectedTeam.name);
      setFullName(selectedTeam.fullName);
    } else {
      setName("");
      setFullName("");
    }
  }, [selectedTeam]);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !fullName.trim()) return;

    setLoading(true);
    setError(null);

    const teamData = { name, fullName };

    try {
      const { success, data, message } = selectedTeam
        ? await PUT<Team>(`/teams/${selectedTeam.id}`, teamData)
        : await POST<Team>("/teams", teamData);

      if (!success || !data) {
        throw new Error(message || "Failed to save team data.");
      }

      onSave(data);
      setName("");
      setFullName("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = name.trim() !== "" && fullName.trim() !== "";

  return (
    <div className="card card-border bg-base-100 shadow-sm">
      <div className="card-body p-6">
        <h3 className="text-2xl font-bold mb-4 text-center">
          {selectedTeam ? "Edit Team" : "Create New Team"}
        </h3>
        {error && <div className="alert alert-error mb-4">{error}</div>}
        <form onSubmit={handleFormSubmit}>
          <div className="form-control mb-4">
            <label htmlFor="name" className="label font-medium">
              <span className="label-text">Team Name</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input w-full"
              required
            />
          </div>

          <div className="form-control mb-4">
            <label htmlFor="fullName" className="label font-medium">
              <span className="label-text">Full Team Name</span>
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input w-full"
              required
            />
          </div>

          <div className="flex justify-between gap-2 mt-6">
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={!isFormValid || loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : selectedTeam ? (
                "Update Team"
              ) : (
                "Create Team"
              )}
            </button>
            <button
              type="button"
              className="btn btn-secondary flex-1"
              onClick={() => {
                onCancel();
                setName("");
                setFullName("");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
