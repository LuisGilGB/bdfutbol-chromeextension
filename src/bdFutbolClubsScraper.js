const bdFutbolClubsScraper = () => {
    const rawRows = document.querySelectorAll('#classific tr');
    const rows = [...rawRows];

    const isClubRow = r => r.childNodes.length > 1 && r.childNodes[0].nodeName !== 'TH';
    const getIdFromHref = href => href.split('/').reverse()[0].split('.')[0].slice(8);
    const getAlias = r => r.querySelector('.aligesq a').innerText;
    const getBdFutbolId = r => getIdFromHref(r.querySelector('.aligesq a').href);
    const getPicUrl = r => r.querySelector('img').src.replace('/em/', '/eg/');

    return rows.filter(isClubRow)
               .map(r => ({
                    alias: getAlias(r),
                    bdFutbolId: getBdFutbolId(r),
                    picUrl: getPicUrl(r)
               }));
}

console.log('Podemos hacernos con los clubes de esta división.');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const BROWSER_ACTION_CLICKED_KEY = 'BDFUTBOL_EXTENSION_BROWSER_ACTION_CLICKED';
    if (request.type === BROWSER_ACTION_CLICKED_KEY) {
        console.log(bdFutbolClubsScraper());
    }
});