import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  cancelReservation,
  finishTable,
  listReservations,
  listTables,
} from "../utils/api";
import useQuery from "../utils/useQuery";
import { next, previous, today } from "../utils/date-time";

import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "./ReservationList";
import TablesList from "./TablesList";
import TimeDisplay from "./TimeDisplay";
import LoadingAnimation from "./LoadingAnimation";

const Dashboard = ({ date }) => {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [reservationsLoading, setReservationsLoading] = useState(true);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [tablesLoading, setTablesLoading] = useState(true);
  const history = useHistory();
  const query = useQuery();

  if (query.get("date")) {
    date = query.get("date");
  }

  useEffect(loadDashboard, [date]);
  useEffect(loadTables, []);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsLoading(true);
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(reservations => {
        setReservations(reservations);
        setReservationsLoading(false);
      })
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    setTablesLoading(true);
    listTables(abortController.signal)
      .then(tables => {
        setTables(tables);
        setTablesLoading(false);
      })
      .catch(setTablesError);
    return () => abortController.abort();
  }

  const todayButtonHandler = () => history.push("/dashboard");
  const previousDayButtonHandler = () => history.push(`/dashboard?date=${previous(date)}`);
  const nextDayButtonHandler = () => history.push(`/dashboard?date=${next(date)}`);

  const finishButtonHandler = id => {
    if (window.confirm("Is this table ready to seat new guests?")) {
      finishTable(id).then(() => { loadTables(); loadDashboard(); }).catch(setTablesError);
    }
  };

  const cancelButtonHandler = id => {
    if (window.confirm("Cancel this reservation?")) {
      cancelReservation(id).then(() => loadDashboard()).catch(setReservationsError);
    }
  };

  const occupancy = tables.length ? Math.round((tables.filter(t => t.reservation_id).length / tables.length) * 100) : 0;

  return (
    <main className="container-lg pb-5">
      <header className="d-flex justify-content-between align-items-center py-5 border-bottom mb-5" style={{ borderColor: 'var(--admin-border) !important' }}>
        <div>
          <h1 className="display-4 fw-bold mb-1" style={{ letterSpacing: '-0.03em' }}>Manager Cockpit</h1>
          <p className="text-muted mb-0 fs-5">Operations for <span className="text-white">{date}</span></p>
        </div>
        <div className="text-end">
          <h4 className="mb-1 text-white">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</h4>
          <TimeDisplay />
        </div>
      </header>

      {/* Admin Stats Bar */}
      <div className="row mb-5 g-4 px-3">
        <div className="col card d-flex flex-row align-items-center gap-3 p-4">
          <div className="p-3 rounded-3" style={{ background: 'rgba(52, 199, 89, 0.1)', color: 'var(--success)' }}>
            <i className="bi bi-calendar-check fs-3"></i>
          </div>
          <div>
            <span className="text-muted d-block small fw-bold text-uppercase ls-1">Bookings</span>
            <span className="fs-2 fw-bold text-white">{reservations.length}</span>
          </div>
        </div>
        <div className="col card d-flex flex-row align-items-center gap-3 p-4">
          <div className="p-3 rounded-3" style={{ background: 'rgba(197, 160, 89, 0.1)', color: 'var(--admin-accent)' }}>
            <i className="bi bi-pie-chart fs-3"></i>
          </div>
          <div>
            <span className="text-muted d-block small fw-bold text-uppercase ls-1">Occupancy</span>
            <span className="fs-2 fw-bold text-white">{occupancy}%</span>
          </div>
        </div>
        <div className="col card d-flex flex-row align-items-center gap-3 p-4">
          <div className="p-3 rounded-3" style={{ background: 'rgba(52, 199, 89, 0.1)', color: 'var(--success)' }}>
            <i className="bi bi-door-open fs-3"></i>
          </div>
          <div>
            <span className="text-muted d-block small fw-bold text-uppercase ls-1">Available</span>
            <span className="fs-2 fw-bold text-white">{tables.filter(t => !t.reservation_id).length}</span>
          </div>
        </div>
      </div>

      <div className="row g-5">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 mb-4 p-0 overflow-hidden">
            <div className="d-flex justify-content-between align-items-center p-4 border-bottom" style={{ borderColor: 'var(--admin-border) !important' }}>
              <h3 className="mb-0 fw-bold">Reservation Log</h3>
              <div className="btn-group">
                <button className="btn btn-secondary" onClick={previousDayButtonHandler}>Prev</button>
                <button className="btn btn-secondary" onClick={todayButtonHandler}>Today</button>
                <button className="btn btn-secondary" onClick={nextDayButtonHandler}>Next</button>
              </div>
            </div>
            <div className="p-4">
              <ErrorAlert error={reservationsError} />
              <ReservationList
                reservations={reservations}
                cancelButtonHandler={cancelButtonHandler}
                reservationsLoading={reservationsLoading}
                hasTables={!!tables.length}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-lg border-0 p-0 overflow-hidden">
            <div className="d-flex justify-content-between align-items-center p-4 border-bottom" style={{ borderColor: 'var(--admin-border) !important' }}>
              <h3 className="mb-0 fw-bold">Live Floor</h3>
              <button className="btn btn-primary btn-sm" onClick={() => history.push("/tables/new")}>+ Add Table</button>
            </div>
            <div className="p-4">
              <ErrorAlert error={tablesError} />
              {tablesLoading ? <LoadingAnimation /> : <TablesList tables={tables} finishButtonHandler={finishButtonHandler} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
