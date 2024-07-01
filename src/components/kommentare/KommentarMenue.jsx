import React, { useState } from 'react';

const KommentarMenue = (props) => {
    const [zeigeMenue, setZeigeMenue] = useState(false);

    const wechsleAnzeige = () => {
        setZeigeMenue(!zeigeMenue);
    };

    const kommentarLoeschen = () => {

        const userConfirmed = window.confirm("Kommentar löschen?");
        if (userConfirmed) {

            const gefiltert = props.kommentare.filter((kom) => kom.id !== props.kommentar.id);
            props.setKommentare([...gefiltert]);
            //DB
            props.setKommentarIdFürLöschen(props.kommentar.id);
        }
    };

    const kommentarBearbeiten = () => {
        props.setWirdBearbeitet(true);
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <button className={'button is-info'} onClick={wechsleAnzeige}>
                <i className="fa fa-cog"></i>
            </button>
            {zeigeMenue && (

                props.aktuellerBenutzer.name === props.kommentar.nutzer && (
                    <ul className={'has-background-grey-darker'} style={{
                        position: 'absolute',
                        top: '100%',
                        right: '0',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                        padding: '4px',
                        listStyleType: 'none',
                        margin: '0',
                        border: 'solid white 1px',
                        borderRadius: '10px',
                        zIndex: '1000', // Ensures the menu is above other elements
                        maxHeight: '200px', // Optional: limits the height of the menu
                        overflowY: 'auto' // Optional: enables scrolling if the menu is too tall
                    }}>

                        <li className="m-1">
                            <button className="button is-light" style={{width: '100px'}} onClick={kommentarBearbeiten}>
                                <i className="fa fa-edit"></i>&nbsp;bearbeiten
                            </button>
                        </li>

                        <li className="m-1">
                            <button className="button is-light" style={{width: '100px'}} onClick={kommentarLoeschen}>
                                &nbsp;<i className="fa fa-trash"></i>&nbsp;löschen
                            </button>
                        </li>
                    </ul>
                )

            )}
        </div>
    );
};

export default KommentarMenue;
