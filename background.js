function defaultCB(url, line) {
  chrome.devtools.panels.openResource(url, line);
}

function registerLoader() {
  chrome.storage.sync.get({ pattern: '/^file:\\/\\/(.+?\\.(jsx?|s?css)(?:.+)?)$/' }, function(items) {
    var pattern = items.pattern;
    var regex = new RegExp(pattern);

    function lawdFile(e, line) {
      var url = e.url;
      console.log(url,regex,regex.test(url));

      if (!regex.test(url)) {
        console.log('opening in sources', url);
        defaultCB(url, line);
      }
      else {
        url = url.replace(regex, 'http://127.0.0.1:63342/api/file/$1');
        console.log('calling',url);
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

  });
}

registerLoader();
