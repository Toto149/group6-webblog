import React from 'react';

const BenutzerListe = (props) => {
    return (
        <div>
            <h2>Benutzerliste:</h2>
            <ul>
                {props.benutzers.map(benutzer => (
                    <li key={benutzer.id}>{benutzer.name + " "
                        + benutzer.passwort + " "
                        + benutzer.rolle.kannKommentieren + " "
                        + benutzer.rolle.kannKommentareLöschen + " "
                        + benutzer.rolle.kannBeitragLöschen + " "
                        + benutzer.rolle.kannBeitragVerfassen + " "
                        + benutzer.rolle.kannBeitragVerändern + " "
                        + benutzer.rolle.kannRolleÄndern}</li>
                ))}
            </ul>
            <hr/>

        </div>
    );
};

export default BenutzerListe;