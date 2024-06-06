import { createContext, useContext, useMemo, useState } from 'react';

export const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  const addCapturedLog = async (name) => {
    setLogs((prevLogs) => [
      { timestamp: Date.now(), data: `caught a ${name}!` },
      ...prevLogs.slice(0, 5),
    ]);
  };

  const clearLogs = async () => {
    setLogs([]);
  };

  const value = useMemo(
    () => ({
      addCapturedLog,
      clearLogs,
      logs,
    }),
    [logs]
  );

  return <LogContext.Provider value={value}>{children}</LogContext.Provider>;
};

export const useLogs = () => {
  return useContext(LogContext);
};
