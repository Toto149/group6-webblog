import React, { useEffect, useState } from 'react';
import Anmeldung from './Anmeldung';
import BenutzerListe from './BenutzerListe';
import BenutzerErstellen from './BenutzerErstellen';

const AnmeldeLeiste = (props) => {


    return (
        <div>
            <Anmeldung
                benutzers={props.benutzers}
                aktuellerBenutzer={props.aktuellerBenutzer}
                setAktuellerBenutzer={props.setAktuellerBenutzer}
                benutzers={props.benutzers}
                setBenutzers={props.setBenutzers}
            />

            <BenutzerListe benutzers={props.benutzers} setBenutzers={props.setBenutzers} />
        </div>
    );
};

export default AnmeldeLeiste;


