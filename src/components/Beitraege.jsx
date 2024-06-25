
import Beitrag from "./Beitrag";
import PropTypes from "prop-types";

export default function Beitraege(props){

    const compareDates = (b1, b2) => {
        let date1 = new Date(b1.erstellungsDatum).getTime();
        let date2 = new Date(b2.erstellungsDatum).getTime();

        if (date1 < date2) {
            return 1;
        } else if (date1 > date2) {
           return -1;
        } else {
            return 0;
        }
    };


    return(
        <div style={{backgroundColor: "lightblue", display: "flex", flexDirection:"column"}}>
            <div style={{textAlign: "right"}}>
                <button> ➕ Add Post</button>
            </div>
            {props.beitraege.sort(compareDates).map(beitrag => <Beitrag key={beitrag.beitragsId} beitrag={beitrag} beitraege={props.beitraege} setBeitraege={props.setBeitraege} kommentare={props.kommentare} setKommentare={props.setKommentare} aktuellerBenutzer={props.aktuellerBenutzer}/>)}

        </div>
    )
}