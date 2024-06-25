import React from 'react';
import KommentarBearbeitungsMenue from "./KommentarBearbeitungsMenue";

const Kommentar = (props) => {


    //menü unterschiedlich


    return (
        <div style={{
            borderStyle: "solid", padding: "10px", margin: "20px", display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start"
            }}>
                <h3 style={{margin: "0"}}>{props.kommentar.nutzer.name}</h3>
                <hr/>
                <p style={{margin: "0"}}>{props.kommentar.inhalt}</p>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
            }}>
                <p style={{margin: "0", marginRight: "10px"}}>Verfasst: {props.kommentar.datum.toLocaleDateString()}</p>
                <KommentarBearbeitungsMenue />
            </div>
        </div>
    );
};

export default Kommentar;