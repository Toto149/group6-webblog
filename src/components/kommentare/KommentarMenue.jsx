import React, {useState} from 'react';

const KommentarMenue = (props) => {
    const [zeigeMenue, setZeigeMenue] = useState(false);

    const wechsleAnzeige = () => {
        setZeigeMenue(!zeigeMenue)
    };

    const kommentarLoeschen = ()=>{
        const gefiltert = props.kommentare.filter((kom)=> kom.id!==props.kommentar.id)
        props.setKommentare([...gefiltert])
    };

    const kommentarBearbeiten = ()=>{
        props.setWirdBearbeitet(true);
    };


    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <button onClick={wechsleAnzeige}>
            <i className="fa fa-cog"></i>
        </button>
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
                        <button style={{ width: '100px' }} onClick={kommentarBearbeiten}><i className="fa fa-edit"></i> bearbeiten
                        </button>
                    </li>}

                    <li style={{ margin: '5px 0' }}>
                        <button style={{ width: '100px' }} onClick={kommentarLoeschen}><i className="fa fa-trash"></i> löschen
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default KommentarMenue;