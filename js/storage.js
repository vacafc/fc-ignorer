const browser = chrome || browser;

const saveIgnored = users => {
  browser.storage.local.set({ignoredUsers: users});
};
  
const loadIgnored = (ok, err) => {
  browser.storage.local.get('ignoredUsers', result => {
    if (result.ignoredUsers) {
      ok(result.ignoredUsers);
    } else {
      err();
    }
  });
};

export { saveIgnored, loadIgnored };