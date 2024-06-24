import {useState, useEffect} from 'react';
import {administrator} from "./Benutzer";


function App() {

    const [benutzers, setBenutzers] = useState([administrator]);

    useEffect(() => {
        localStorage.setItem('benutzers', JSON.stringify(benutzers));
    }, [benutzers]);

    useEffect(() => {
        const benutzers = JSON.parse(localStorage.getItem('benutzers'));
        if (benutzers) {
            setBenutzers(benutzers);
        }
    }, []);

  return (
      <div>

          <MeinHeader/>
          <AnmeldeLeiste/>
          <Beitraege>

              <BeitragErstellen>

              </BeitragErstellen>

              <Beitrag>

                  <Kommentare>
                      <KommentarErstellen>

                      </KommentarErstellen>
                      <Kommentar>

                      </Kommentar>
                  </Kommentare>
              </Beitrag>

          </Beitraege>

          <MeinFooter/>

      </div>
  );
}

export default App;
