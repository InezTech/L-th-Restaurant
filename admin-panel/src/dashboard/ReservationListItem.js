import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ReservationListItem = ({
  reservation,
  cancelButtonHandler,
  hasTables,
}) => {
  const { reservation_id, first_name, last_name, mobile_number, reservation_time, people, status } = reservation;
  const [timeLeft, setTimeLeft] = useState("");

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 || 12;
    return `${displayH}:${minutes} ${ampm}`;
  };

  const getEndTime = (timeStr) => {
    const [h, m] = timeStr.split(':').map(Number);
    const endH = (h + 2) % 24; // 2 hour duration
    const ampm = endH >= 12 ? 'PM' : 'AM';
    const displayH = endH % 12 || 12;
    return `${displayH}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  useEffect(() => {
    if (status === 'seated') {
      const timer = setInterval(() => {
        // Mocking time left for UX demonstration
        // In a real app we'd track 'seated_at' timestamp
        setTimeLeft("Exp: " + getEndTime(reservation_time));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status, reservation_time]);

  return (
    <tr className="reservation-row" style={{ animation: 'fadeIn 0.5s ease' }}>
      <td>
        <div>
          <span className="fw-bold fs-6 d-block">{formatTime(reservation_time)}</span>
          <span className="text-muted small">to {getEndTime(reservation_time)}</span>
        </div>
      </td>
      <td>
        <div>
          <span className="fw-bold d-block" style={{ color: '#fff' }}>{first_name} {last_name}</span>
          <span className="text-muted small"><i className="bi bi-people-fill me-1"></i>Party of {people}</span>
        </div>
      </td>
      <td>
        <span className={`badge ${status === 'booked' ? 'bg-info text-dark' : status === 'seated' ? 'bg-success' : 'bg-secondary'}`}
          style={{ textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.05em' }}>
          {status}
        </span>
        {status === 'seated' && <div className="mt-1 small fw-bold text-success">{timeLeft}</div>}
      </td>
      <td>
        <span className="text-muted small">{mobile_number}</span>
      </td>
      <td className="text-end">
        <div className="btn-group btn-group-sm border rounded">
          {status === "booked" && (
            <>
              {hasTables && (
                <Link to={`/reservations/${reservation_id}/seat`} className="btn btn-primary" title="Seat">
                  Seat
                </Link>
              )}
              <Link to={`/reservations/${reservation_id}/edit`} className="btn btn-secondary" title="Edit">
                <i className="bi bi-pencil"></i>
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => cancelButtonHandler(reservation_id)}
                title="Cancel"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default ReservationListItem;
