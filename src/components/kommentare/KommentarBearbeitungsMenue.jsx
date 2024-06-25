import React, {useState} from 'react';

const KommentarBearbeitungsMenue = (props) => {
    const [zeigeMenue, setZeigeMenue] = useState(false);

    const wechsleAnzeige = () => {
        setZeigeMenue(!zeigeMenue)
    };

    const kommentarLöschen = ()=>{
        const gefiltert = props.kommentare.filter((kom)=> kom.id!==props.kommentar.id)
        props.setKommentare([...gefiltert])
    };

    const kommentarBearbeiten = ()=>{
        return;
    };


    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <button onClick={wechsleAnzeige}>✏️</button>
            {zeigeMenue && (
                <ul style={{
                    position: 'absolute',
                    top: '100%',
                    right: '0',
                    backgroundColor: 'white',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    padding: '10px',
                    listStyleType: 'none',
                    margin: '0',
                    border: 'solid black 1px'
                }}>
                    {props.aktuellerBenutzer.id===props.kommentar.nutzer.id && <li style={{ margin: '5px 0' }}>
                        <button style={{ width: '100px' }} onClick={kommentarBearbeiten}>bearbeiten</button>
                    </li>}

                    <li style={{ margin: '5px 0' }}>
                        <button style={{ width: '100px' }} onClick={kommentarLöschen}>löschen</button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default KommentarBearbeitungsMenue;