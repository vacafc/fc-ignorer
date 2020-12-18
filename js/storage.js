const browser = chrome || browser;

const saveIgnored = (users) => {
  browser.storage.local.set({ignoredUsers: Array.from(users)});
};
  
const loadIgnored = (callback) => {
  browser.storage.local.get('ignoredUsers', result => {
    if (result.ignoredUsers) {
      callback(result.ignoredUsers);
    }
  });
};

export { saveIgnored, loadIgnored };