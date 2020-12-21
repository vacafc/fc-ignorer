import { loadIgnored } from './storage.js';

const PLACEHOLDER = 'ignore this value';
const browser = chrome || browser;

const ignoreUsers = () => {
  const ignoredUsers = new Set(PLACEHOLDER);
  
  const obtainThreadAuthor = domElement => {
    try {
      return domElement.children[2].children[1].innerText.trim();
    } catch {
      return null;
    }
  };
  
  const obtainPostAuthor = domElement => {
    try {
      return domElement.getElementsByClassName('bigusername')[0].innerText.trim();
    } catch {
      return null;
    }
  };

  const obtainIngoredPostAuthor = domElement => {
    try {
      return domElement.getElementsByTagName('tbody')[0].getElementsByTagName('a')[2].innerText;
    } catch {
      return null;
    }
  };

  const obtainAuthor = domElement => {
    return obtainThreadAuthor(domElement)
        || obtainPostAuthor(domElement)
        || obtainIngoredPostAuthor(domElement)
        || null;
  };

  const publicationsDom = document.querySelectorAll('[id^="threadbits_forum_"]')[0]
      || document.getElementById('posts')
      || { children: [] };
  const publications = [...publicationsDom.children];
  publications.forEach(publication => {
    const author = obtainAuthor(publication);
    if (author && ignoredUsers.has(author)) {
      publication.remove();
    }
  });
};

browser.webNavigation.onCompleted.addListener(() => {
  loadIgnored().then(users => {
    browser.tabs.executeScript({
      code: `(${ignoreUsers.toString().replace('PLACEHOLDER', JSON.stringify(users))})()`
    });
  });
}, {url: [{urlMatches : '.+://.+\\.forocoches\\.com/.+'}]});