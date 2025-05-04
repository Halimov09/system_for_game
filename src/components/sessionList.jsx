import React, { useState } from "react";

const formatTime = (dateStr) => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return date.toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
};

const SessionList = ({ sessions }) => {
  const [visibleCount, setVisibleCount] = useState(10);

  const filteredSessions = Array.isArray(sessions)
    ? sessions.filter((s) => s.is_active === false)
    : [];

  const visibleSessions = filteredSessions.slice(0, visibleCount);

  return (
    <div className="session-container">
      <h2 style={{ textAlign: "center", fontSize: "24px", marginBottom: "20px" }}>
        Inactive Sessions
      </h2>
      <div className="session-grid">
        {visibleSessions.map((s) => (
          <div className="session-card" key={s.id}>
            <div className="session-title">Session ID: {s.id}</div>
            <div className="session-text"><span className="session-label">Type:</span> {s.session_type}</div>
            <div className="session-text"><span className="session-label">Current Price:</span> ${s.current_price}</div>
            <div className="session-text"><span className="session-label">Total Price:</span> ${s.total_price}</div>
            <div className="session-text"><span className="session-label">Gaming Room:</span> {s.gaming_room}</div>
            <div className="session-text"><span className="session-label">Fixed Duration (min):</span> {s.fixed_duration_minutes ?? "N/A"}</div>
            <div className="session-text"><span className="session-label">Start Time:</span> {formatTime(s.start_time)}</div>
            <div className="session-text"><span className="session-label">End Time:</span> {formatTime(s.end_time)}</div>
            <div className="session-text"><span className="session-label">Created At:</span> {formatTime(s.created_at)}</div>
            <div className="session-text"><span className="session-label">Product Count:</span> {s.session_products?.length || 0}</div>
            <div className="session-text"><span className="session-label">Active:</span> {s.is_active ? "Yes" : "No"}</div>
          </div>
        ))}
      </div>

      {visibleCount < filteredSessions.length && (
        <button className="show-more-button" onClick={() => setVisibleCount(c => c + 10)}>
          Show More
        </button>
      )}
    </div>
  );
};

export default SessionList;
