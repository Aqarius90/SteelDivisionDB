import React, { useState } from "react";
import firebase from "../js/Firestore";
import Header from "./Header";
import SD1 from "./SD1/SD1";
import SD2 from "./SD2/SD2";
//import FirestoreInit from "../js/FirestoreInit";
//import _ from "lodash";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useParams
} from "react-router-dom";

require("dotenv").config();

/*import { UpdateDatabase } from "../js/DatabaseHandlers";
global.UpdateDatabase = function(x) {
  UpdateDatabase(x);
  return "wait for console";
};*/

global.debug = true;
global.throw = function(title, vars, error) {
  if (global.debug) {
    console.error(title);
    console.log(vars);
    console.error(error);
  } else {
    console.log(title);
    console.log(error);
    //TODO
    console.error("NOT IMPLEMENTED: errorReport (gg SYSOP)");
  }
};

function App() {
  //firebase&auth
  const [user, dUser] = useState(null);
  let login = () => {
    console.log("login");
    if (user) {
      return firebase
        .auth()
        .signOut()
        .then(() => {
          dUser(null);
        })
        .catch(function(error) {
          global.throw("logout error", "", error);
        });
    } else {
      var provider = new firebase.auth.GoogleAuthProvider();
      return firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          console.log(result.user);
          dUser(result.user);
        })
        .catch(function(error) {
          global.throw("login error", "", error);
        });
    }
  };

  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="/SteelDivisionDB/:DB?/:Page?/:code?">
            <div className="card">
              <Header
                Honey={{
                  User: user
                }}
                API={{
                  logIn: login
                }}
              />
            </div>
            <RedirectWrapper user={user} login={login}></RedirectWrapper>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function RedirectWrapper({ user, login }) {
  let params = useParams();
  let history = useHistory();
  let setCode = x => {
    history.push("/SteelDivisionDB/" + params.DB + "/" + params.Page + "/" + x);
  };
  switch (params.DB) {
    case "SD1":
      return (
        <SD1
          Honey={{ User: user, params: params }}
          API={{ logIn: login, setCode: setCode }}
        />
      );
    case "SD2":
      return <SD2 Honey={{ User: user }} API={{ logIn: login }} />;
    default:
      return (
        <div className="card">
          <div className="row">
            <div className="col-sm">
              <Link to="/SteelDivisionDB/SD1/DeckBuilder">
                <img
                  className="w-50 mx-auto d-block"
                  src={"SteelDivisionDB/SD1header.png"}
                  alt="divEmblem"
                />
              </Link>
            </div>
            <div className="col-sm">
              <Link to="/SteelDivisionDB/SD2/DeckBuilder">
                <img
                  className="w-50 mx-auto d-block"
                  src={"SteelDivisionDB/SD2header.png"}
                  alt="divEmblem"
                />
              </Link>
            </div>
          </div>
        </div>
      );
  }
}

export default App;
