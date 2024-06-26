import React from 'react';

const datumKonvertieren = (dateNowZeit) => {
    const datum = new Date(dateNowZeit);
    const Tag = String(datum.getDate()).padStart(2, '0');
    const Monat = String(datum.getMonth() + 1).padStart(2, '0'); // Monate sind nullbasiert
    const Jahr = datum.getFullYear();
    const Stunden = String(datum.getHours()).padStart(2, '0');
    const Minuten = String(datum.getMinutes()).padStart(2, '0');
    const Sekunden = String(datum.getSeconds()).padStart(2, '0');

    return `${Tag}.${Monat}.${Jahr} ${Stunden}:${Minuten}:${Sekunden}`;
};

export default datumKonvertieren;