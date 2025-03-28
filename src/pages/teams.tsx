import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";

import { DELETE, GET } from "../api/axios-instance";
import DeleteModal from "../components/delete-modal";
import TeamForm from "../components/team-form";
import { Team } from "../types/types";
import { formatISODateTime } from "../utils/date-utils";

export default function Teams() {
  const [teams, setTeams] = useState<Team[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [teamIdToDelete, setTeamIdToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const { success, data, message } = await GET<Team[]>("/teams");

        if (!success || !data) {
          throw new Error(message || "Failed to fetch team data.");
        }

        setTeams(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unknown error occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (team: Team) => {
    setSelectedTeam(team);
  };

  const handleDeleteClick = (teamId: number) => {
    setTeamIdToDelete(teamId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!teamIdToDelete) return;

    setLoading(true);
    setError(null);

    try {
      const { success, data, message } = await DELETE<Team>(
        `/teams/${teamIdToDelete}`
      );

      if (!success || !data) {
        throw new Error(message || "Failed to delete team.");
      }

      setTeams(
        (prevTeams) => prevTeams?.filter((team) => team.id !== data.id) || []
      );
      setIsDeleteModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTeam = (team: Team) => {
    if (selectedTeam) {
      setTeams(
        (prevTeams) =>
          prevTeams?.map((t) => (t.id === team.id ? team : t)) || []
      );
    } else {
      setTeams((prevTeams) => [...(prevTeams || []), team]);
    }

    setSelectedTeam(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-4 text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex gap-8">
      <div className="card card-border bg-base-100 shadow-sm flex-1">
        <div className="card-body">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">Teams</h2>
          </div>
          {!teams || teams.length === 0 ? (
            <p>No teams available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Name</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team.id}>
                      <td>{team.id}</td>
                      <td>{team.fullName}</td>
                      <td>{team.name}</td>
                      <td>{formatISODateTime(team.createdAt)}</td>
                      <td>
                        {team.updatedAt
                          ? formatISODateTime(team.updatedAt)
                          : "-"}
                      </td>
                      <td className="flex gap-2">
                        <button
                          className="btn btn-primary btn-square"
                          onClick={() => handleEditClick(team)}
                        >
                          <Edit />
                        </button>
                        <button
                          className="btn btn-danger btn-square"
                          onClick={() => handleDeleteClick(team.id)}
                        >
                          <Trash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="min-h-[300px]">
        <TeamForm
          selectedTeam={selectedTeam}
          onCancel={() => setSelectedTeam(null)}
          onSave={handleSaveTeam}
        />
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
