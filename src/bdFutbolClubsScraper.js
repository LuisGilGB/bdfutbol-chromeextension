const bdFutbolClubsScraper = () => {
    const rawRows = document.querySelectorAll('#classific tr');
    const rows = [...rawRows];

    return rows;
}

console.log('Podemos hacernos con los clubes de esta división.');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const BROWSER_ACTION_CLICKED_KEY = 'BDFUTBOL_EXTENSION_BROWSER_ACTION_CLICKED';
    if (request.type === BROWSER_ACTION_CLICKED_KEY) {
        console.log(bdFutbolClubsScraper());
    }
});