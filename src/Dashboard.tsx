import { useNavigate } from "react-router-dom";
import { getData, Prompt } from "./Prompt";

function Dashboard() {
    const navigate = useNavigate();
    const bots: Prompt[] = getData();

    const goToBot = (id: number) => {
        navigate(`/bot/${id}`);
    }


    return (<>
        <h1 className="bliss">
            <a href="/dashboard">
                <img src="/blis.svg" alt="Blis Logo" />
            </a>
        </h1>
        <h1>Dashboard</h1>
        <div className="dashboard">
            {bots.map(bot => (
                <button className="dashboard-button" key={bot.id} onClick={() => goToBot(bot.id)}>
                    {bot.name}
                </button>
            ))}
        </div>
        <div className="under-dashboard">
            <button className="under-dashboard-add" onClick={() => navigate("/add-prompt")}>Add Bot</button>
            <button className="under-dashboard-delete" onClick={() => navigate("/delete-prompt")}>Delete Bot</button>
        </div>
    </>);
}

export default Dashboard;
