import "./App.css";
import Home from "./pages/home/Home";
import Global from "./components/global/Global";
import React from "react";
import { HOST } from "./constants/constants";
import Spinner from "./components/spinner/Spinner";

export const Context = React.createContext(null);

function App() {
    const [data, setData] = React.useState([]);
    const [schema, setSchema] = React.useState({});
    const [columns, setColumns] = React.useState([]);
    const [name, setName] = React.useState("No Data !");
    const [btnActive, setBtnActive] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [tabNumber, setTabNumber] = React.useState(0);
    const [selected, setSelected] = React.useState("");
    const [disbaleUpdateBtn, setDisabledUpdatedBtn] = React.useState(true);
    const [container, setContainer] = React.useState("");
    const [url, setUrl] = React.useState("");

    const getData = async (filename) => {
        const resp2 = await fetch(HOST + "all", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                filename,
            }),
        });
        const returnedData = await resp2.json();
        setData(returnedData);
        console.log(returnedData);
        if (returnedData.length === 0) return alert("all data are deleted");
        setColumns(Object.keys(returnedData[0]));
        setBtnActive(true);
    };

    const getSchema = async () => {
        const resp = await fetch(HOST + "schema", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                filename: localStorage.getItem("file"),
            }),
        });
        const schema = await resp.json();
        store.setSchema(schema);
    };

    const store = {
        data,
        setData,
        schema,
        setSchema,
        setColumns,
        columns,
        name,
        setName,
        btnActive,
        setBtnActive,
        getData,
        getSchema,
        setLoading,
        tabNumber,
        setTabNumber,
        selected,
        setSelected,
        disbaleUpdateBtn,
        setDisabledUpdatedBtn,
        container,setContainer,
        url,setUrl
    };

    return (
        <Context.Provider value={store}>
            <Spinner loading={loading} />
            <Global />
            <Home />
        </Context.Provider>
    );
}

export default App;
