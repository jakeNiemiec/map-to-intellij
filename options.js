// Saves options to chrome.storage
function save_options() {
    var pattern = document.getElementById('regex-pattern').value;

    chrome.storage.sync.set({ pattern }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// retrieve values stored in chrome.storage.
function restore_options() {
    var defaultPattern = '/^file:\\/\\/(.+?\\.(jsx?|s?css)(?:.+)?)$/';

    chrome.storage.sync.get({ pattern: '' }, function(items) {
        const pattern = items.pattern.trim().length > 0 ? items.pattern : defaultPattern;
        document.getElementById('regex-pattern').value = pattern;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
