import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
  const [expandedId, setExpandedId] = useState(null); // 🔧 Yangi state

  const filteredSessions = Array.isArray(sessions)
  ? sessions
      .filter((s) => s.is_active === false)
      .sort((a, b) => new Date(b.end_time) - new Date(a.end_time)) // 🔥 Teskari sort
  : [];
  

  const visibleSessions = filteredSessions.slice(0, visibleCount);

  const handleChange = (id) => (event, isExpanded) => {
    setExpandedId(isExpanded ? id : null);
  };

  return (
    <div className="session-container">
      <h2 style={{ textAlign: "center", fontSize: "24px", marginBottom: "20px" }}>
        Inactive Sessions
      </h2>
        {visibleSessions.map((s) => (
          <div className="session-cards" key={s.id}>
            <Accordion
            className="accordion"
            key={s.id} // 🎯 Har doim `key` qo‘shing
            expanded={expandedId === s.id}
            onChange={handleChange(s.id)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="iconw" />}
              aria-controls={`panel-${s.id}-content`}
              id={`panel-${s.id}-header`}
            >
              <Typography component="span">
                {s.gaming_room?.name || "Xona yo'q"}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="session-text"><span className="session-label">Turi:</span> {s.session_type}</div>
              <div className="session-text"><span className="session-label">Umumiy summasi:</span> {s.total_price}</div>
              <div className="session-text"><span className="session-label">Boshlanich vaqti:</span> {formatTime(s.start_time)}</div>
              <div className="session-text"><span className="session-label">Tugash vaqti:</span> {formatTime(s.end_time)}</div>
              <div className="session-text"><span className="session-label">Olingan mahsulotlar:</span> {s.session_products?.length || 0}</div>
              <div className="session-text"><span className="session-label">O'yin holati:</span> {s.is_active ? "Yes" : "No"}</div>
            </AccordionDetails>
          </Accordion>
          </div>
        ))}

      {visibleCount < filteredSessions.length && (
        <button className="show-more-button" onClick={() => setVisibleCount(c => c + 10)}>
          Show More
        </button>
      )}
    </div>
  );
};

export default SessionList;
