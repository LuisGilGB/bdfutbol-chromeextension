const POS_MAP = {
    por: 'portero',
    def: 'defensa',
    ltd: 'defensa',
    lti: 'defensa',
    cen: 'defensa',
    mig: 'centrocampista',
    dav: 'delantero',
    dac: 'delantero'
}

const bdFutbolRosterScraper = () => {
    const rawRows = document.querySelectorAll('#taulaplantilla tr');
    const rows = [...rawRows];

    const isPlayerRow = r => r.childNodes.length > 1 && r.children[0].nodeName !== 'TH';
    const getIdFromHref = href => href.split('/').reverse()[0].split('.')[0];
    const getAlias = r => r.querySelector('.aligesq a').innerText;
    const getCompleteName = r => r.querySelector('.aligesq.colnom a').innerText;
    const getBdFutbolId = r => getIdFromHref(r.querySelector('.aligesq a').href);
    const getPicUrl = r => r.querySelector('img').src.replace('/m/', '/j/');
    const getPosition = r => POS_MAP[Object.keys(POS_MAP).find(k => r.querySelector(`.${k}`))];

    return rows.filter(r => isPlayerRow(r))
               .map(r => ({
                    position: getPosition(r),
                    alias: getAlias(r),
                    completeName: getCompleteName(r),
                    bdFutbolId: getBdFutbolId(r),
                    picUrl: getPicUrl(r)
                }));
}

console.log("¡A robar plantillas, que no hay pasta pa'comer!");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const BROWSER_ACTION_CLICKED_KEY = 'BDFUTBOL_EXTENSION_BROWSER_ACTION_CLICKED';
    if (request.type === BROWSER_ACTION_CLICKED_KEY) {
        console.log(bdFutbolRosterScraper());
    }
});