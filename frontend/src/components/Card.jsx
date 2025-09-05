import React from "react";

export default function Card({ title, value, color, loading }) {
  return (
    <div className={`p-4 rounded-lg shadow ${color} min-h-[80px] flex flex-col justify-center`}>
      {loading ? (
        <p className="text-white animate-pulse">Carregando...</p>
      ) : (
        <>
          <h2 className="text-sm font-medium text-white">{title}</h2>
          <p className="text-2xl font-bold text-white">{value}</p>
        </>
      )}
    </div>
  );
}
