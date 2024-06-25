import {useState} from "react";
import Kommentare from "./Kommentare";

export default function Beitrag({beitrag,kommentare,setBeitraege,beitraege,key}){
                const [wurdeGeklicked, setWurdeGeklicked ] = useState(false)

                const displayKategorien = (kategorien) => {
                    return kategorien.map(kategorie => "Kategorien: " + kategorie + (kategorien.indexOf(kategorie) !== kategorien.length - 1  ? ", "  :  ""));

                }
                const hantiereKlick = () => {
                    setWurdeGeklicked(!wurdeGeklicked);
                }
                const displayMehrKommentare = () => {
                    return <Kommentare beitragId={beitrag.id} />
                }

                const handleDelete = () => {

                    setBeitraege(beitraege.filter(b => b.id != beitrag.id));
                }
                return (
                    <div key={key} style={{
                        textAlign: "center",
                        backgroundColor: "darkcyan",
                        borderRadius: "5px",
                        marginLeft: "15px",
                        marginRight: "30px",
                        marginBottom: "10px"
                    }}>
                        <div>
                            <h3>{beitrag.titel}</h3>
                            {"by   " + beitrag.nutzer.name}
                        </div>
                        <div>
                            {displayKategorien(beitrag.kategorien)}
                        </div>
                        <div>
                            <p>{beitrag.inhalt}</p>
                        </div>
                        <p style={{textAlign: "right"}}>{beitrag.erstellungsDatum.toString()}</p>
                        <p style={{textAlign: "right", fontSize: "0.5em"}}>

                        </p>
                        <div>
                            <h3>Kommentare</h3>
                            {!wurdeGeklicked && <Kommentare beitragId={beitrag.id}/>}
                            <div>{wurdeGeklicked && displayMehrKommentare(kommentare.filter(kommentar => kommentar.id === beitrag.beitragsId))}</div>
                            <button
                                onClick={hantiereKlick}>{wurdeGeklicked ? "Weniger Kommentare" : "Mehr Kommentare"}</button>
                        </div>
                        {beitrag.nutzer && <button onClick={handleDelete} key={beitrag.id}>🗑️</button>}
                    </div>
                );

}