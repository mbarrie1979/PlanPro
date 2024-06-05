
export const getSavedSessionIds = () => {
  const savedSessionIds = localStorage.getItem('saved_sessions')
    ? JSON.parse(localStorage.getItem('saved_sessions'))
    : [];

  return savedSessionIds;
};


export const saveSessionIds = (sessionIdArr) => {
  if (sessionIdArr.length) {
    localStorage.setItem('saved_sessions', JSON.stringify(sessionIdArr));
  } else {
    localStorage.removeItem('saved_sessions');
  }
};


export const removeSessionId = (sessionId) => {
  const savedSessionIds = localStorage.getItem('saved_sessions')
    ? JSON.parse(localStorage.getItem('saved_sessions'))
    : null;

  if (!savedSessionIds) {
    return false;
  }

  const updatedSavedSessionIds = savedSessionIds?.filter((savedSessionId) => savedSessionId !== sessionId);
  localStorage.setItem('saved_sessions', JSON.stringify(updatedSavedSessionIds));

  return true;
};
