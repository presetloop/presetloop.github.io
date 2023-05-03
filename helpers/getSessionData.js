export default function getSessionData() {
  if (typeof window === "undefined") {
    return null;
  }
  const sessionKeys = Object.keys(localStorage).filter(key =>
    key.startsWith("myapp-session-")
  );
  if (sessionKeys.length === 0) {
    return null;
  }
  const latestSessionKey = sessionKeys.sort().reverse()[0];
  const sessionData = JSON.parse(localStorage.getItem(latestSessionKey));
  return { sessionData, sessionKey: latestSessionKey };
}

