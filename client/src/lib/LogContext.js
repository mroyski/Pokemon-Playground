import { createContext } from 'react';

const LogContext = createContext({
  logs: [],
  setLogs: () => {},
});

export default LogContext;
