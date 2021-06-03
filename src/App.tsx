import React, {useEffect} from 'react';
import './App.scss';
import client from "./client";
import {ApolloProvider} from "@apollo/client";
import Catalogue from "./components/Catalogue";

function App() {
    useEffect(() => {
        document.title = `${process.env.REACT_APP_TITLE}`;
    });

    return (
        <ApolloProvider client={client}>
            <div className="App">
                <nav className={"navbar navbar-expand-lg navbar-dark bg-dark"}>
                    <div className={"container-fluid"}>
                        <a className={"navbar-brand"} href={"/"}>{process.env.REACT_APP_TITLE}</a>
                    </div>
                </nav>
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col"}>
                          <p/>
                        </div>
                    </div>
                    <Catalogue/>
                </div>
                <footer>
                    <div>Icons made by <a href="." title="Icongeek26">Icongeek26</a> from <a
                        href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                </footer>
            </div>
        </ApolloProvider>
    );
}

export default App;
