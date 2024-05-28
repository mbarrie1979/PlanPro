export const getSavedBookIds = () => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : [];

  return savedBookIds;
};
export const getSavedSessionIds = () => {
  const savedSessionIds = localStorage.getItem('saved_sessions')
    ? JSON.parse(localStorage.getItem('saved_sessions'))
    : [];

  return savedSessionIds;
};

export const saveBookIds = (bookIdArr) => {
  if (bookIdArr.length) {
    localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem('saved_books');
  }
};
export const saveSessionIds = (sessionIdArr) => {
  if (sessionIdArr.length) {
    localStorage.setItem('saved_sessions', JSON.stringify(sessionIdArr));
  } else {
    localStorage.removeItem('saved_sessions');
  }
};

export const removeBookId = (bookId) => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null;

  if (!savedBookIds) {
    return false;
  }

  const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

  return true;
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
