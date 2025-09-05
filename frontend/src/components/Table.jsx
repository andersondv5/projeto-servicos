import React from "react";

export default function Table({ data, loading }) {
  if (loading) return <p className="animate-pulse text-gray-500">Carregando tabela...</p>;

  return (
    <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
      <thead className="bg-gray-200">
        <tr>
          <th className="text-left p-2">Nome</th>
          <th className="text-left p-2">Email</th>
          <th className="text-left p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="border-b">
            <td className="p-2">{row.name}</td>
            <td className="p-2">{row.email}</td>
            <td className="p-2">{row.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
