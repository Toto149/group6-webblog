import React, {useState} from 'react';

const KommentarBearbeitungsMenue = () => {
    const [zeigeMenue, setZeigeMenue] = useState(false);

    const wechsleAnzeige = () => {
        setZeigeMenue(!zeigeMenue)
    };

    return (
        <div>
            <button onClick={wechsleAnzeige}>...</button>
            {zeigeMenue &&
                <ul>
                    <li>
                        <button>bearbeiten</button>
                    </li>
                    <li>
                        <button>löschen</button>
                    </li>
                </ul>}
        </div>
    );
};

export default KommentarBearbeitungsMenue;