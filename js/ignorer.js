import { loadIgnored } from './storage.js';

const PLACEHOLDER = 'ignore this value';
const browser = chrome || browser;

const ignoreUsers = () => {
  const users = PLACEHOLDER;
  
  const threads = [...document.getElementById('threadbits_forum_2').children];
};

browser.webNavigation.onCompleted.addListener(() => {
  const users = ['a', 'b'];
  browser.tabs.executeScript({
      code: `(${ignoreUsers.toString().replace('PLACEHOLDER', JSON.stringify(users))})()`
  });

  loadIgnored(users => {
    
  });
}, {url: [{urlMatches : '.+://.+\\.forocoches\\.com/.+'}]});