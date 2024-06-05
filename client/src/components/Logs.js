import React, { useRef, useEffect, useContext } from 'react';
import { LogContext } from '../lib/LogContext';
const LOG_SIZE = 20;

const Logs = () => {
  const { logs, setLogs } = useContext(LogContext);
  const recentLogs = logs.slice(0, LOG_SIZE);
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current.scrollTop = 0;
  }, [logs]);

  const formatLogDate = (date) => {
    const currentDate = new Date(date).toLocaleString();
    return currentDate;
  };

  return (
    <ul
      ref={containerRef}
      style={{
        border: '1px solid #ccc',
        height: '100px',
        overflowX: 'hidden',
        overflowY: 'scroll',
        padding: '5px',
      }}
    >
      {recentLogs.map((log) => (
        <li key={log.timestamp}>
          {formatLogDate(log.timestamp)}
          <br></br>
          {log.data}
        </li>
      ))}
    </ul>
  );
};

export default Logs;
