/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const headers = new Headers();
headers.append("Content-Type", "application/json");

// --- Mock Backend Logic for Demo Showcase ---
const isDemoMode = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

const getMockData = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setMockData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// Seed initial tables if missing
if (isDemoMode && getMockData('LETHE_TABLES').length === 0) {
  setMockData('LETHE_TABLES', [
    { table_id: 1, table_name: "Bar #1", capacity: 2, reservation_id: null },
    { table_id: 2, table_name: "Bar #2", capacity: 2, reservation_id: null },
    { table_id: 3, table_name: "#1", capacity: 4, reservation_id: null },
    { table_id: 4, table_name: "#2", capacity: 4, reservation_id: null },
  ]);
}

async function fetchJson(url, options, onCancel) {
  if (isDemoMode) {
    const urlObj = new URL(url);
    const path = urlObj.pathname;
    const method = options?.method || 'GET';

    // Intercept Reservations
    if (path.includes('/reservations')) {
      let reservations = getMockData('LETHE_RESERVATIONS');

      if (method === 'GET') {
        const mobile = urlObj.searchParams.get('mobile_number');
        if (mobile) return reservations.filter(r => r.mobile_number.includes(mobile));
        return reservations;
      }

      if (method === 'POST') {
        const newRes = { ...JSON.parse(options.body).data, reservation_id: Date.now(), status: 'booked' };
        reservations.push(newRes);
        setMockData('LETHE_RESERVATIONS', reservations);
        return newRes;
      }

      if (method === 'PUT') {
        const resId = parseInt(path.split('/').pop()) || path.split('/').pop();
        const updateData = JSON.parse(options.body).data;
        reservations = reservations.map(r => r.reservation_id == resId ? { ...r, ...updateData } : r);
        setMockData('LETHE_RESERVATIONS', reservations);
        return updateData;
      }
    }

    // Intercept Tables
    if (path.includes('/tables')) {
      let tables = getMockData('LETHE_TABLES');
      if (method === 'GET') return tables;

      if (path.endsWith('/seat')) {
        const tableId = path.split('/')[path.split('/').length - 2];
        const resId = method === 'DELETE' ? null : JSON.parse(options.body).data.reservation_id;
        tables = tables.map(t => t.table_id == tableId ? { ...t, reservation_id: resId } : t);
        setMockData('LETHE_TABLES', tables);

        // Update reservation status too
        if (resId) {
          let reservations = getMockData('LETHE_RESERVATIONS');
          reservations = reservations.map(r => r.reservation_id == resId ? { ...r, status: 'seated' } : r);
          setMockData('LETHE_RESERVATIONS', reservations);
        }
        return { status: 200 };
      }
    }
  }

  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservations.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

/**
 * Retrieves an existing reservation.
 * @returns {Promise<reservation>}
 *  a promise that resolves to a possibly empty reservation.
 */

export async function getReservation(reservationId, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/${reservationId}`);
  return await fetchJson(url, { headers, signal }, {});
}

/**
 * Saves reservation to database
 * @param reservation
 * The reservation to save
 * @param  signal
 * optional AbortController.signal
 * @returns {Promise<reservation>}
 *  a promise that resolves the saved reservation, which will now have an `id` property.
 */

export const createReservation = async (reservation, signal) => {
  const url = `${API_BASE_URL}/reservations`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: reservation }),
    signal,
  };

  return await fetchJson(url, options);
};

/**
 * Retrieves all existing tables
 * @returns {Promise<[table]>}
 *  a promise that resolves to a possibly empty array of tables saved in the database.
 */
export async function listTables(signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  return await fetchJson(url, { headers, signal }, []);
}

/**
 * Saves table to database
 * @param table
 * The table to save
 * @param  signal
 * optional AbortController.signal
 * @returns {Promise<table>}
 *  a promise that resolves the saved table, which will now have an `id` property.
 */
export const createTable = async (table, signal) => {
  const url = `${API_BASE_URL}/tables`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: table }),
    signal,
  };

  return await fetchJson(url, options, table);
};

/**
 * @param  reservation_id
 * The reservation id to save
 * @param table_id
 * Updates table to add reservation (seat table)
 * @returns {Promise<table>}
 * a promise that resolves the updated table, which will now have an `reservation_id` property.
 */
export const seatReservation = async (reservation_id, table_id) => {
  const url = `${API_BASE_URL}/tables/${table_id}/seat`;
  const options = {
    method: "PUT",
    body: JSON.stringify({ data: { reservation_id } }),
    headers,
  };
  return await fetchJson(url, options, {});
};

/**
 *
 * @param reservation_id
 * The reservation id to update
 * @param status
 * The updated status
 *@param  signal
 * optional AbortController.signal
 * @returns {Promise<reservation>}
 * a promise that resolves the updated reservation, which will now have a new status.
 */
export const updateReservationStatus = async (
  reservation_id,
  status,
  signal
) => {
  const url = `${API_BASE_URL}/reservations/${reservation_id}/status`;
  const options = {
    method: "PUT",
    body: JSON.stringify({ data: { status } }),
    headers,
    signal,
  };
  return await fetchJson(url, options, {});
};

/**
 *
 * @param reservation_id
 * The reservation id to cancel
 * @returns {Promise<reservation>}
 * a promise that resolves the updated reservation, which will now have a cancelled status.
 */
export const cancelReservation = async reservation_id => {
  const url = `${API_BASE_URL}/reservations/${reservation_id}/status`;
  const options = {
    method: "PUT",
    body: JSON.stringify({ data: { status: "cancelled" } }),
    headers,
  };
  return await fetchJson(url, options, {});
};

/**
 *
 * @param table_id
 * The table id to finish
 * @returns {Promise<Error|*>}
 *  a promise that resolves to an empty object.
 */
export const finishTable = async table_id => {
  const url = `${API_BASE_URL}/tables/${table_id}/seat`;
  const options = {
    method: "DELETE",
  };
  return await fetchJson(url, options);
};

export const searchReservations = async (mobile_number, signal) => {
  const url = `${API_BASE_URL}/reservations?mobile_number=${mobile_number}`;
  return await fetchJson(url, { headers, signal }, []);
};

export const updateReservation = async (
  reservation_id,
  updatedReservation,
  signal
) => {
  const url = `${API_BASE_URL}/reservations/${reservation_id}`;
  const options = {
    method: "PUT",
    body: JSON.stringify({ data: updatedReservation }),
    headers,
    signal,
  };
  return await fetchJson(url, options, {});
};
