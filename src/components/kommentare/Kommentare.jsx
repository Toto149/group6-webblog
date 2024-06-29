import React, {useState} from 'react';
import Kommentar from "./Kommentar";
import KommentarErstellen from "./KommentarErstellen";

const Kommentare = (props) => {
    const mehrKommentareGrenze = 2;
    const [wurdeGeklicked, setWurdeGeklicked] = useState(false)

    const hantiereKlick = () => {
        setWurdeGeklicked(!wurdeGeklicked);
    }

    //(read more button und vorher nur 3 zeigen?)
    //auch wieder einklappbar
    const gefilterteKommentare = props.kommentare.filter(kommentar => kommentar.beitragsId === props.beitrag.id).sort((k1, k2) => {
        let datum1 = new Date(k1.datum).getTime();
        let datum2 = new Date(k2.datum).getTime();

        if (datum1 < datum2) {
            return -1;
        } else if (datum1 > datum2) {
            return 1;
        } else {
            return 0;
        }
    })

    return (
        <div>
            <div className="container">
                <div className="section">
                    <div className="columns">
                        <div className="column has-text-centered">
                            <h1 className="title is-size-4">Kommentare</h1><br/>
                        </div>
                    </div>
                    <div id="app" className="row columns is-centered">
                        <div className="column is-12 ">


                            {wurdeGeklicked
                                ? gefilterteKommentare.map((kommentar) => <Kommentar key={kommentar.id}
                                                                                     kommentar={kommentar}
                                                                                     kommentare={props.kommentare}
                                                                                     setKommentare={props.setKommentare}
                                                                                     benutzers={props.benutzers}
                                                                                     aktuellerBenutzer={props.aktuellerBenutzer}/>)
                                : gefilterteKommentare.slice(0, mehrKommentareGrenze).map((kommentar) => <Kommentar key={kommentar.id}
                                                                                                 kommentar={kommentar}
                                                                                                 kommentare={props.kommentare}
                                                                                                 setKommentare={props.setKommentare}
                                                                                                 benutzers={props.benutzers}
                                                                                                 aktuellerBenutzer={props.aktuellerBenutzer}/>)}


                            <KommentarErstellen beitrag={props.beitrag}
                                                kommentare={props.kommentare}
                                                setKommentare={props.setKommentare}
                                                benutzers={props.benutzers}
                                                aktuellerBenutzer={props.aktuellerBenutzer}
                                                wirdBearbeitet={false}
                                                kommentar={null}/>

                            {gefilterteKommentare.length > mehrKommentareGrenze &&
                                <button className={'button is-dark'}
                                        onClick={hantiereKlick}>{wurdeGeklicked ? "Weniger Kommentare" : "Mehr Kommentare"}</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Kommentare;