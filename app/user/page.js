"use client";

import { useState, useEffect } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/users?page=${page}&limit=10`);
        const data = await response.json();
        setUsers(data.users);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error("Erreur lors du fetch des utilisateurs:", error);
      }
    };

    fetchUsers();
  }, [page]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Liste des utilisateurs</h1>
      <ul className="space-y-2">
        {users.map((user, index) => (
          <li
            key={index}
            className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition duration-150"
          >
            {user.name}
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((page) => Math.max(1, page - 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md text-white ${
            page === 1 ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } transition duration-150`}
        >
          Précédent
        </button>
        <span className="text-lg">
          Page {page} sur {totalPages}
        </span>
        <button
          onClick={() => setPage((page) => Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-md text-white ${
            page === totalPages
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          } transition duration-150`}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
