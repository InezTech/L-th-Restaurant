import React from "react";

const TablesListItem = ({ table, finishButtonHandler }) => {
  const isOccupied = !!table.reservation_id;

  // Assuming standard 2 hour duration logic for visibility
  // In a real DB we'd store seated_at and calculate exactly
  const departureEstimation = isOccupied ? "Exp. Free in ~90m" : "Available Now";

  return (
    <div className={`card p-3 h-100 border-0 shadow-sm position-relative overflow-hidden ${isOccupied ? 'opacity-90' : ''}`}
      style={{
        background: isOccupied ? 'rgba(197, 160, 89, 0.05)' : 'var(--admin-card-bg)',
        border: isOccupied ? '1px solid var(--admin-accent)' : '1px solid var(--admin-border)',
        transition: 'all 0.3s ease'
      }}>
      {isOccupied && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--admin-accent)' }}></div>
      )}

      <div className="d-flex justify-content-between align-items-start mb-2">
        <div>
          <h5 className="mb-0 fw-bold" style={{ color: '#fff' }}>{table.table_name}</h5>
          <span className="text-muted small">CAPACITY: {table.capacity}</span>
        </div>
        <span className={`badge ${isOccupied ? 'bg-danger' : 'bg-success'}`} style={{ fontSize: '0.6rem' }}>
          {isOccupied ? "OCCUPIED" : "VACANT"}
        </span>
      </div>

      <div className="mt-2">
        <span className={`small ${isOccupied ? 'text-warning' : 'text-success'}`} style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>
          {departureEstimation}
        </span>
      </div>

      <div className="mt-auto pt-3">
        {isOccupied ? (
          <button
            className="btn btn-primary w-100 btn-sm fw-bold"
            onClick={() => finishButtonHandler(table.table_id)}
          >
            CLEAR TABLE
          </button>
        ) : (
          <div className="text-center py-2">
            <i className="bi bi-check2 text-muted"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default TablesListItem;
