const BROWSER_ACTION_CLICKED_KEY = 'BDFUTBOL_EXTENSION_BROWSER_ACTION_CLICKED';

chrome.browserAction.onClicked.addListener(tab => chrome.tabs.sendMessage(tab.id, {
    type: BROWSER_ACTION_CLICKED_KEY
}));