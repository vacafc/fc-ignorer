import { loadIgnored } from './storage.js';

const PLACEHOLDER = 'ignore this value';
const browser = chrome || browser;

const ignoreUsers = () => {
  const users = new Set(PLACEHOLDER);
  
  const mainList = document.querySelectorAll('[id^="threadbits_forum_"]')[0];
  if (mainList) {
    const threads = [...mainList.children];
    threads.forEach(thread => {
      const author = thread.children[2].children[1].innerText.trim();
      if (users.has(author)) {
        thread.remove();
      }
    });
  } else {
    const postsList = document.getElementById('posts');
    if (postsList) {
      const posts = [...postsList.children];
      posts.forEach(post => {
        const author = post.getElementsByClassName('bigusername')[0].innerText.trim();
        if (users.has(author)) {
          post.remove();
        }
      });
    }
  }
};

browser.webNavigation.onCompleted.addListener(() => {
  loadIgnored(users => {
    users.push('Udezehcnas');
    browser.tabs.executeScript({
      code: `(${ignoreUsers.toString().replace('PLACEHOLDER', JSON.stringify(users))})()`
    });
  });
}, {url: [{urlMatches : '.+://.+\\.forocoches\\.com/.+'}]});