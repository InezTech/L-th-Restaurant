import React from "react";
import LoadingAnimation from "./LoadingAnimation";
import ReservationListItem from "./ReservationListItem";

const ReservationList = ({
  reservations,
  cancelButtonHandler,
  reservationsLoading,
  search = false,
  initialState = true,
  hasTables,
}) => {
  if (reservationsLoading) return <LoadingAnimation />;

  const renderContent = () => {
    if (search && initialState) return null;
    if (!reservations.length) {
      return (
        <div className="text-center py-5 text-muted fst-italic">
          No reservations found.
        </div>
      );
    }

    return (
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Time</th>
              <th>Guest</th>
              <th>Status</th>
              <th>Contact</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(reservation => (
              <ReservationListItem
                key={reservation.reservation_id}
                reservation={reservation}
                cancelButtonHandler={cancelButtonHandler}
                hasTables={hasTables}
                isTableMode={true}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="reservation-log-container">
      {renderContent()}
    </div>
  );
};

export default ReservationList;
