import React from 'react';

const BenutzerListe = (props) => {
    return (
        <div>
            <h2>Benutzerliste:</h2>
            <ul>
                {props.benutzers.map(benutzer => (
                    <li key={benutzer.id}>{benutzer.name + " "
                        + benutzer.passwort + " "
                        + benutzer.role.kannKommentieren + " "
                        + benutzer.role.kannKommentareLöschen + " "
                        + benutzer.role.kannBeitragLöschen + " "
                        + benutzer.role.kannBeitragVerfassen + " "
                        + benutzer.role.kannBeitragVerändern + " "
                        + benutzer.role.kannRolleÄndern}</li>
                ))}
            </ul>
            <hr/>

        </div>
    );
};

export default BenutzerListe;