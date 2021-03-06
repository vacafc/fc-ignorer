import { saveIgnored, loadIgnored } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
  const users = document.getElementById('txt-users');
  users.addEventListener('input', onUsersChanged);
  loadIgnored()
      .then(ignoredUsers => users.value = ignoredUsers.join('\n'))
      .catch(() => users.value = '');
});

const onUsersChanged = () => {
  const usersTextArea = document.getElementById('txt-users');
  const usersText = usersTextArea.value;
  const users = usersText.split('\n')
      .map(user => user.trim())
      .filter(user => user.length > 0);

  saveIgnored(users);
};