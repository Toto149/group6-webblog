

function App() {



  const admin = {
    kannKommentieren: true,
    kannKommentareLöschen: true,
    kannBeitragLöschen: true,
    kannBeitragVerfassen: true,
    kannBeitragVerändern: true,
    kannRolleÄndern: true
  }

  const registrierterBenutzer = {
    kannKommentieren: true,
    kannKommentareLöschen: false,
    kannBeitragLöschen: false,
    kannBeitragVerfassen: false,
    kannBeitragVerändern: false,
    kannRolleÄndern: false
  }

  const moderator = {
    kannKommentieren: true,
    kannKommentareLöschen: true,
    kannBeitragLöschen: false,
    kannBeitragVerfassen: false,
    kannBeitragVerändern: false,
    kannRolleÄndern: false
  }

  let benutzers = [];

  let benutzer = {
    id: 1,
    name: "Admin",
    passwort: "0000",
    avatar: "",
    role: admin
  }

  benutzers.push(benutzer);



  return (
    <div>


    </div>
  );
}

export default App;
