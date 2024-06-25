
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
            bs.id === b.id ? { ...bs, role: JSON.parse(neueRolle) } : bs
        );

        props.setBenutzers(aktualisierteBenutzer);
        setGewaelteRolle({ ...gewaehlteRolle, [b.id]: neueRolle });
    };

    return (
        <>
            {props.aktuellerBenutzer && props.aktuellerBenutzer.role.kannRolleÄndern && (

                <div>
                <input
                    type="text"
                    value={suche}
                    placeholder="Benutzer suchen"
                    onChange={suchen}
                    />
                <label>Es wurden {gefundeneBenutzer ? gefundeneBenutzer.length : 0} Benutzer gefunden.</label>
                <ul>
                    {gefundeneBenutzer && gefundeneBenutzer.map(b => (
                        <li key={b.id}>
                            {b.name}
                            {props.aktuellerBenutzer.role && props.aktuellerBenutzer.role.kannRolleÄndern && (
                                <>
                                    <select
                                        value={gewaehlteRolle[b.id] || JSON.stringify(b.role)}
                                        onChange={(e) => rolleGeaendert(e, b)}
                                    >
                                        <option value={JSON.stringify(admin)}>admin</option>
                                        <option value={JSON.stringify(registrierterBenutzer)}>registrierter Benutzer</option>
                                        <option value={JSON.stringify(moderator)}>moderator</option>
                                    </select>

                                    {gewaehlteRolle[b.id] && gewaehlteRolle[b.id] !== JSON.stringify(b.role) && (
                                        <button onClick={() => rolleSpeichern(b)}>Änderungen bestätigen</button>
                                    )}
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            )}
        </>
    );
};

export default BenutzerVerwaltung;

/*

 */












/*
import React, { useState } from 'react';
import {registrierterBenutzer,moderator,admin} from '../../Benutzer';



const BenutzerVerwaltung = (props) => {
    const [suche, setSuche] = useState('');
    const [gefundeneBenutzer, setGefundeneBenutzer] = useState([]);
    const [gewaehlterBenutzer, setGewaehlterBenutzer] = useState(null);
    const [gewaehlteRolle, setGewaelteRolle] = useState([])
    //const [neueRolle, setNeueRolle] = useState('');


    const suchen = (e) => {
        const suchWert = e.target.value;
        setSuche(suchWert);

        if (suchWert) {
            const gefilterteBenutzer = props.benutzers.filter(benutzer =>
                benutzer.name.toLowerCase().includes(suchWert.toLowerCase())
            );
            setGefundeneBenutzer(gefilterteBenutzer);
        } else {
            setGefundeneBenutzer([]);
        }
    };

    const rolleGeaendert = (e,b) => {
        const neueRolle = e.target.value;
        setGewaelteRolle({ ...gewaehlteRolle, [b.id]: neueRolle });
    };

    const rolleSpeichern = (b) => {
        const neueRolle = gewaehlteRolle[b.id];

        const aktualisierteBenutzer = props.benutzers.map(bs =>
            bs.id === b.id ?
                { ...bs, role: JSON.parse(neueRolle) }
                : bs
        );

        props.setBenutzers(aktualisierteBenutzer);

    };

    return (
        <div>
            <input
                type="text"
                value={suche}
                placeholder="Benutzer suchen"
                onChange={suchen}
            />
            <label>Es wurden {gefundeneBenutzer ? gefundeneBenutzer.length : 0} Benutzer gefunden.</label>
            <ul>
                {gefundeneBenutzer && gefundeneBenutzer.map(b => (
                    <li key={b.id}>
                        {b.name}
                        {props.aktuellerBenutzer.role && props.aktuellerBenutzer.role.kannRolleÄndern && (



                            <>
                            <select
                                value={JSON.stringify(b.role)}
                                onChange={(e) => rolleGeaendert(e, b)}
                            >
                                <option value={JSON.stringify(admin)}>admin</option>
                                <option value={JSON.stringify(registrierterBenutzer)}>registrierter Benutzer</option>
                                <option value={JSON.stringify(moderator)}>moderator</option>
                            </select>

                                {gewaehlteRolle[b.id] && gewaehlteRolle[b.id] !== JSON.stringify(b.role) && (
                                    <button onClick={() => rolleSpeichern(b)}>Änderungen bestätigen</button>
                                )}
                            </>




                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BenutzerVerwaltung;

/*

 */

/*
                gefundeneBenutzer.map(benutzer => (
                    <li key={benutzer.id}>
                        {benutzer.name}
                        {props.aktuellerBenutzer.role === admin && (
                            <>
                                <select
                                    value={gewaehlterBenutzer && gewaehlterBenutzer.id === benutzer.id ? neueRolle : benutzer.role}
                                    onChange={rolleGeaendert}
                                    disabled={gewaehlterBenutzer && gewaehlterBenutzer.id !== benutzer.id}
                                >
                                    <option value={admin}>admin</option>
                                    <option value={registrierterBenutzer}>registrierterBenutzer</option>
                                    <option value={moderator}>moderator</option>
                                </select>
                                {gewaehlterBenutzer && gewaehlterBenutzer.id === benutzer.id && (
                                    <button onClick={rollenSpeichern}>Änderungen bestätigen</button>
                                )}
                            </>
                        )}
                    </li>
                ))}
 */


/*
const suchen = (e) => {
        const keyword = e.target.value;

        setSuche(keyword);
        const results = props.benutzers.filter(b => b.name.includes(keyword));
        setGefundeneBenutzer(results);
    };

    const handleBenutzerWahl = (benutzer) => {
        //setGewaehlterBenutzer(benutzer);
        //setNeueRolle(benutzer.role);
    };

    const rolleGeaendert = (e) => {
        setNeueRolle(e.target.value);
    };

    const rollenSpeichern = () => {

        if (gewaehlterBenutzer) {
            gewaehlterBenutzer.role = neueRolle;
            setGefundenerBenutzer(gefundeneBenutzer.map(b => b.id === gewaehlterBenutzer.id ? gewaehlterBenutzer : b));
        }


};
 */