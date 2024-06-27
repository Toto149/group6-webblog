
import React, { useState, useEffect } from 'react';
import { registrierterBenutzer, moderator, admin } from '../../Benutzer';

const BenutzerVerwaltung = (props) => {
    const [suche, setSuche] = useState('');
    const [gefundeneBenutzer, setGefundeneBenutzer] = useState([]);
    const [gewaehlteRolle, setGewaelteRolle] = useState({});

    useEffect(() => {
        setGefundeneBenutzer(props.benutzers);
    }, [props.benutzers]);

    const suchen = (e) => {
        const suchWert = e.target.value;
        setSuche(suchWert);

        if (suchWert) {
            const gefilterteBenutzer = props.benutzers.filter(benutzer =>
                benutzer.name.toLowerCase().includes(suchWert.toLowerCase())
            );
            setGefundeneBenutzer(gefilterteBenutzer);
        } else {
            setGefundeneBenutzer(props.benutzers);
        }
    };

    const rolleGeaendert = (e, b) => {
        const neueRolle = e.target.value;
        setGewaelteRolle({ ...gewaehlteRolle, [b.id]: neueRolle });
    };

    const rolleSpeichern = (b) => {
        const neueRolle = gewaehlteRolle[b.id];

        const aktualisierteBenutzer = props.benutzers.map(bs =>
            bs.id === b.id ? { ...bs, rolle: JSON.parse(neueRolle) } : bs
        );

        props.setBenutzers(aktualisierteBenutzer);
        setGewaelteRolle({ ...gewaehlteRolle, [b.id]: neueRolle });
    };

    function aenderungenAbbrechen(b) {
        const { [b.id]: deletedItem, ...rest } = gewaehlteRolle;
        setGewaelteRolle(rest);
    }

    return (
        <>
            {props.aktuellerBenutzer && props.aktuellerBenutzer.rolle.kannRolleÄndern && (

                <div className="m-2 has-text-left">


                    <input
                        className="input"
                        style={{width: '200px'}}
                        type="text"
                        value={suche}
                        placeholder="Benutzername suchen"
                        onChange={suchen}
                        required
                    />

                    <br/>

                    <label  className="subtitle ml-2 is-6 is-color-info">
                        Es wurden {gefundeneBenutzer ? gefundeneBenutzer.length : 0} Benutzer gefunden.
                    </label>

                    <table  className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                        <thead>
                        <tr >
                            <th className="is-narrow has-text-centered">Name des Benutzers</th>
                            <th className="is-narrowhas-text-centered">Rolle</th>
                            <th className="is-narrowhas-text-centered">Änderungen bestätigen</th>
                        </tr>
                        </thead>
                        <tbody>

                        {gefundeneBenutzer && gefundeneBenutzer.map(b => (
                            <tr key={b.id}>
                                <td className="is-narrow p-1 has-text-left">{b.name}</td>
                                <td className="is-narrow p-1 has-text-left">{props.aktuellerBenutzer.rolle && props.aktuellerBenutzer.rolle.kannRolleÄndern && (


                                    <select
                                        className="select"
                                        disabled={(b.name === "Admin")}
                                        value={gewaehlteRolle[b.id] || JSON.stringify(b.rolle)}
                                        onChange={(e) => rolleGeaendert(e, b)}
                                    >
                                        <option value={JSON.stringify(admin)}>admin</option>
                                        <option value={JSON.stringify(registrierterBenutzer)}>registrierter
                                            Benutzer
                                        </option>
                                        <option value={JSON.stringify(moderator)}>moderator</option>
                                    </select>

                                )}</td>





                                <td className="has-text-left">{gewaehlteRolle[b.id] && gewaehlteRolle[b.id] !== JSON.stringify(b.rolle) && (
                                    <>
                                        <button  className="button is-info is-outlined" onClick={() => rolleSpeichern(b)}>✔️</button>
                                        <button  className="button is-info is-outlined" onClick={() => aenderungenAbbrechen(b)}>❌</button>
                                    </>
                                )}</td>
                            </tr>
                        ))}

                        </tbody>
                    </table>

                </div>

            )}
        </>
    );
};

export default BenutzerVerwaltung;

