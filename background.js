const regex = /^file:\/\/(.+?\.(jsx?|s?css)(?:.+)?)$/;

function defaultCB(url, line) {
  chrome.devtools.panels.openResource(url, line);
}
function lawdFile(e, line) {
  var url = e.url;
  console.log(url,regex,regex.test(url));
  if (!regex.test(url)) {
    console.debug('opening in sources', url);
    defaultCB(url, line);
  }
  else {
    url = url.replace(regex, 'http://127.0.0.1:63342/api/file/$1');
    console.debug('calling',url);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url + (':' + line || ''), true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status !== 200) {
        // Request finished. Do processing here.
        defaultCB(url, line);
      }
    };
    xhr.send();
  }
}
chrome.devtools.panels.setOpenResourceHandler(lawdFile);
