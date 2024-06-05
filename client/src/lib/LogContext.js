import { createContext, useState } from 'react';

// const LogContext = createContext({
//   logs: [],
//   setLogs: () => {},
// });

// export default LogContext;

export const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [logs, setLogs] = useState([
    { timestamp: Date.now() - 1000, data: 'captured a mankey!' },
    { timestamp: Date.now() - 5000, data: 'captured a bulbasaur!' },
  ]);

  return (
    <LogContext.Provider value={{ logs, setLogs }}>
      {children}
    </LogContext.Provider>
  );
};
