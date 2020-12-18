const browser = chrome || browser;

(async () => {
  const src = browser.extension.getURL('js/ignorer.js');
  const ignorer = await import(src);
  ignorer.ignore();
})();