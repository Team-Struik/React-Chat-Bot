import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const goToBot = (type: string) => {
        navigate(`/bot/${type}`);
    }


    return (<>
        <h1 className="bliss">
            <img src="/blis.svg" alt="Blis Logo" />
        </h1>
        <h1>Dashboard</h1>
        <div className="dashboard-buttons">
            <button onClick={() => {goToBot("keukenblad");}}>Keukenblad Maker</button>
            <button onClick={() => {goToBot("hovenier");}}>Hovenier</button>
            <button onClick={() => {goToBot("pcbuilder");}}>PC Maker</button>
            <button onClick={() => {goToBot("travelagent");}}>Travel Agent</button>
            <button onClick={() => {goToBot("gastroguide");}}>Gastro Guide</button>
            <button onClick={() => {goToBot("retrorecommender");}}>R & R</button>
            <button onClick={() => {goToBot("medievalsmith");}}>Medieval Smith</button>
        </div>
    </>);
}

export default Dashboard;
