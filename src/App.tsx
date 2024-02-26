import { useState } from "react"

type Message = {
    owner: string;
    message: string;
}

function App() {
    const [history, setHistory] = useState<Message[]>([]);
    const [generating, setGenerating] = useState<boolean>(false);
    const [textareaCount, setTextareaCount] = useState<number>(0);
    const [prompt, setPrompt] = useState<string>("");
    const maxTokens = 250;
    
    const handleSubmit = () => {
        const m: Message = {owner: "You", message: prompt};
        setHistory([...history, m]);
        setGenerating(true);
        setPrompt("");
        setTextareaCount(0);
        setTimeout(() => {setHistory([...history, m, {owner: "bot", message: "Very Real Response"}]); setGenerating(false);}, 400);
    }

    return (
        <>
            <h1>AI Chat Bot</h1>
            <div className="chat">
                <div className="chat-history">
                    {history.map(h => <p>{h.owner}: {h.message}</p>)}
                </div>
                <div className="textarea-wrapper">
                    <div className="above-input">
                        <p>{textareaCount}/{maxTokens}</p>
                    </div>
                    <div className="textarea-container">
                        <textarea 
                            disabled={generating}
                            maxLength={maxTokens}
                            value={prompt}
                            onChange={e => {setTextareaCount(e.target.value.length); setPrompt(e.target.value);}}/>
                        <button type="submit" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default App
