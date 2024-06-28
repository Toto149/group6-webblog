import React, { useEffect, useState } from 'react';
import Anmeldung from './Anmeldung';
import BenutzerListe from './BenutzerListe';
import BenutzerVerwaltung from "./BenutzerVerwaltung";

const AnmeldeLeiste = (props) => {


    return (
        <div>
            <Anmeldung
                aktuellerBenutzer={props.aktuellerBenutzer}
                setAktuellerBenutzer={props.setAktuellerBenutzer}
                benutzers={props.benutzers}
                setBenutzers={props.setBenutzers}
                rollen={props.rollen}
            />

        </div>
    );
};

export default AnmeldeLeiste;


