import { saveIgnored, loadIgnored } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
  const users = document.getElementById('txt-users');
  users.addEventListener('input', onUsersChanged);
  loadIgnored(ignoredUsers => {
    users.value = Array.from(ignoredUsers).join('\n');
  });
});  

const onUsersChanged = () => {
  const usersTextArea = document.getElementById('txt-users');
  const usersText = usersTextArea.value;
  const users = usersText.split('\n')
      .map(user => user.trim())
      .filter(user => user.length > 0);

  saveIgnored(users);
};