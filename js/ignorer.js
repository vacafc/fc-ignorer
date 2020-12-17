const browser = chrome || browser;

const ignoredUsers = new Set();

const saveIgnored = () => {
  browser.storage.local.set({ignoredUsers: Array.from(ignoredUsers)});
};

const loadIgnored = () => {
  const handleLoad = (users) => {
    if (users) {
      users.forEach(user => ignoredUsers.add(user));
    }
  };

  const promise = browser.storage.local.get('ignoredUsers', result => handleLoad(result.ignoredUsers));
  if (promise) {
    promise.then(users => handleLoad(users));
  }
};

document.addEventListener('DOMContentLoaded', () => {
  loadIgnored();
  const users = document.getElementById('txt-users');
  users.addEventListener('input', onUsersChanged);
  users.value = Array.from(ignoredUsers).join('\n');
});

const onUsersChanged = () => {
  const usersTextArea = document.getElementById('txt-users');
  const usersText = usersTextArea.value;
  const users = usersText.split('\n')
      .map(user => user.trim())
      .filter(user => user.length > 0);
  
  ignoredUsers.clear();
  users.forEach(user => ignoredUsers.add(user));
  saveIgnored();

  ignoredUsers.clear();
  loadIgnored();
};