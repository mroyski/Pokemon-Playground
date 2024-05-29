const LOG_SIZE = 5;

const Logs = ({ logs }) => {
  const recentLogs = logs.slice(0, LOG_SIZE);

  return (
    <ul>
      {recentLogs.map((log) => (
        <li>{log}</li>
      ))}
    </ul>
  );
};

export default Logs;
