import {useState, useEffect} from 'react';
import {kommentar, beitrag, beitrag2} from "./Beitrag";
import Beitraege from "./components/Beitraege";
import {administrator, benutzer1, benutzer2, benutzer3} from "./Benutzer";
import AnmeldeLeiste from "./components/anmeldung/AnmeldeLeiste";

import {kommentar, beitrag, kommentar2} from "./Beitrag";
import Kommentare from "./components/kommentare/Kommentare";
import Beitraege from "./components/Beitraege";
import Supabase from "./components/supabase/Supabase";


function App() {

    const [beitraege, setBeitraege] = useState(JSON.parse(localStorage.getItem('beitraege')) || [beitrag,beitrag2]);
    const [benutzers, setBenutzers] = useState((JSON.parse(localStorage.getItem('benutzers'))||[administrator, benutzer1, benutzer2, benutzer3]));
    const [kommentare, setKommentare] = useState(JSON.parse(localStorage.getItem('kommentare')) || [kommentar])
    const [aktuellerBenutzer, setAktuellerBenutzer] = useState(null);



    useEffect(() => {
        localStorage.setItem('kommentare', JSON.stringify(kommentare));
    }, [kommentare]);


    useEffect(() => {
        localStorage.setItem('benutzers', JSON.stringify(benutzers));
    }, [benutzers]);


    useEffect(() => {
        localStorage.setItem('beitraege', JSON.stringify(beitraege));
    }, [beitraege]);


    useEffect(() => {
        const benutzers = JSON.parse(localStorage.getItem('benutzers'));
        const beitraege = JSON.parse(localStorage.getItem('beitraege'));
        const kommentare = JSON.parse(localStorage.getItem('kommentare'));
        console.log(beitraege)

        if (kommentare) {
            setKommentare(kommentare)
        }
        if (beitraege) {
            setBeitraege(beitraege)
        }
        if (benutzers) {
            setBenutzers(benutzers);
        }
    }, []);


    useEffect(() => {
        const localerBenutzer = JSON.parse(localStorage.getItem('aktuellerBenutzer'));
        if (localerBenutzer) {
            setAktuellerBenutzer(localerBenutzer);
        }
    }, []);

    useEffect(() => {
        if (aktuellerBenutzer) {
            localStorage.setItem('aktuellerBenutzer', JSON.stringify(aktuellerBenutzer));
        } else {
            localStorage.removeItem('aktuellerBenutzer');
        }
    }, [aktuellerBenutzer]);


    return (

        <section className="hero is-info is-fullheight">
            <div className="hero-head">

                <AnmeldeLeiste benutzers={benutzers}
                               setBenutzers={setBenutzers}
                               aktuellerBenutzer={aktuellerBenutzer}
                               setAktuellerBenutzer={setAktuellerBenutzer}
                />

            </div>


            <div className="hero-body">
                <div className="container has-text-centered">


                    <div className="container">



                    </div>


                    { <Beitraege beitraege={beitraege}
                       setBeitraege={setBeitraege}
                       kommentare={kommentare}
                       setKommentare={setKommentare}
                       aktuellerBenutzer={aktuellerBenutzer}
                    />}

                </div>
            </div>


        </section>



    );
}

export default App;


/*
    <section className="hero is-info is-fullheight">
    <div className="hero-head">



                <nav className="navbar is-fixed-top">
                    <div className="container">


                        <div className="navbar-brand">
                            <a className="navbar-item" href="../">
                                <img src="http://bulma.io/images/bulma-type-white.png" alt="Logo"/>
                            </a>
                            <span className="navbar-burger burger" data-target="navbarMenu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                        </div>


                        <div id="navbarMenu" className="navbar-menu">

                            <div className="navbar-end">
                            <span className="navbar-item">
                                <a className="button is-white is-outlined" href="#">
                                    <span className="icon">
                                        <i className="fa fa-home"></i>
                                    </span>
                                    <span>Home</span>
                                </a>
                            </span>


                                <span className="navbar-item">
                                <a className="button is-white is-outlined" href="#">
                                    <span className="icon">
                                        <i className="fa fa-superpowers"></i>
                                    </span>
                                    <span>Examples</span>
                                </a>
                                </span>


                                <span className="navbar-item">
                                <a className="button is-white is-outlined" href="#">
                                    <span className="icon">
                                        <i className="fa fa-book"></i>
                                    </span>
                                    <span>Documentation</span>
                                </a>
                                </span>


                                <span className="navbar-item">
                                <a className="button is-white is-outlined"
                                   href="https://github.com/BulmaTemplates/bulma-templates/blob/master/templates/landing.html">
                                    <span className="icon">
                                        <i className="fa fa-github"></i>
                                    </span>
                                    <span>View Source</span>
                                </a>
                                </span>


                            </div>
                        </div>
                    </div>
                </nav>



        <nav className="navbar">
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="../">
                        <img src="http://bulma.io/images/bulma-type-white.png" alt="Logo"/>
                    </a>
                    <span className="navbar-burger burger" data-target="navbarMenu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                </div>
                <div id="navbarMenu" className="navbar-menu">
                    <div className="navbar-end">
                            <span className="navbar-item">
                                <a className="button is-white is-outlined" href="#">
                                    <span className="icon">
                                        <i className="fa fa-home"></i>
                                    </span>
                                    <span>Home</span>
                                </a>
                            </span>
                        <span className="navbar-item">
                                <a className="button is-white is-outlined" href="#">
                                    <span className="icon">
                                        <i className="fa fa-superpowers"></i>
                                    </span>
                                    <span>Examples</span>
                                </a>
                            </span>
                        <span className="navbar-item">
                                <a className="button is-white is-outlined" href="#">
                                    <span className="icon">
                                        <i className="fa fa-book"></i>
                                    </span>
                                    <span>Documentation</span>
                                </a>
                            </span>
                        <span className="navbar-item">
                                <a className="button is-white is-outlined"
                                   href="https://github.com/BulmaTemplates/bulma-templates/blob/master/templates/landing.html">
                                    <span className="icon">
                                        <i className="fa fa-github"></i>
                                    </span>
                                    <span>View Source</span>
                                </a>
                            </span>
                    </div>
                </div>
            </div>
        </nav>






    </div>

    <div className="hero-body">
        <div className="container has-text-centered">
            <div className="column is-6 is-offset-3">


                <h1 className="title">
                    Coming Soon
                </h1>
                <h2 className="subtitle">
                    $this is the best software platform for running an internet business. We handle billions of dollars
                    every year for forward-thinking businesses around the world.
                </h2>





                <div className="box">
                    <div className="field is-grouped">
                        <p className="control is-expanded">
                            <input className="input" type="text" placeholder="Enter your email"/>
                        </p>
                        <p className="control">
                            <a className="button is-info">
                                Notify Me
                            </a>
                        </p>
                    </div>
                </div>







            </div>
        </div>






    </div>

</section>

 */

