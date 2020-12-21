const browser = chrome || browser;

const saveIgnored = users => {
  browser.storage.local.set({ignoredUsers: users});
};
  
const loadIgnored = () => {
  return new Promise((resolve, reject) => {
    browser.storage.local.get('ignoredUsers', result => {
      if (result.ignoredUsers) {
        resolve(result.ignoredUsers);
      } else {
        reject();
      }
    });
  });
};

export { saveIgnored, loadIgnored };