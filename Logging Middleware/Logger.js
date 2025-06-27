// src/components/Logger.js
export const logger = (event, details = {}) => {
  const logs = JSON.parse(localStorage.getItem("appLogs")) || [];
  logs.push({ timestamp: new Date().toISOString(), event, ...details });
  localStorage.setItem("appLogs", JSON.stringify(logs));
};
