import {useState} from "react";
import {kommentar} from "../Beitrag";

export default function Beitrag(props){
                const [wurdeGeklicked, setWurdeGeklicked ] = useState(false)

                const displayKategorien = (kategorien) => {
                    return kategorien.map(kategorie => "Kategorien: " + kategorie + (kategorien.indexOf(kategorie) !== kategorien.length - 1  ? ", "  :  ""));

                }
                const hantiereKlick = () => {
                    setWurdeGeklicked(!wurdeGeklicked);
                }
                const displayMehrKommentare = (kommentare) => {
                    return <p>{kommentare.map(kommentar => <p>{kommentar.beitragsId}</p>)}</p>
                }
                return (
                    <div key={props.key} style={{textAlign: "center", backgroundColor: "darkcyan", borderRadius:"5px", marginLeft: "15px", marginRight: "30px", marginBottom: "10px"}}>
                        <div>
                            <h3>{props.beitrag.titel}</h3>
                            {"by   "  + props.beitrag.nutzer.name}
                        </div>
                        <div>
                            {displayKategorien(props.beitrag.kategorien)}
                        </div>
                        <div >
                            <p>{props.beitrag.inhalt}</p>
                        </div>
                        <p style={{textAlign: "right"}}>{props.beitrag.erstellungsDatum.toString()}</p>
                        <p style={{textAlign: "right", fontSize: "0.5em"}}>

                        </p>
                        <div>
                            <h3>Kommentare</h3>
                            {!wurdeGeklicked && props.beitrag.kommentare.map(kommentar => <p>{kommentar.beitragsId}</p>)}
                            <button onClick={hantiereKlick}>{wurdeGeklicked ? "Weniger Kommentare" : "Mehr Kommentare"}</button>
                            <div>{wurdeGeklicked && displayMehrKommentare(props.beitrag.kommentare)}</div>
                        </div>

                    </div>
                );

}