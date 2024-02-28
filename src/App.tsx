import { useState } from "react"
import ollama from 'ollama'

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
    
    const handleSubmit = async () => {
        const m: Message = {owner: "You", message: prompt};
        setHistory([...history, m]);
        setGenerating(true);
        const p = createPrompt();
        console.log(p);
        const response = await ollama.chat({model: 'llama2', messages: [{ role: 'user', content: p}]});
        setPrompt("");
        setTextareaCount(0);
        setTimeout(() => {setHistory([...history, m, {owner: "bot", message: response.message.content}]); setGenerating(false);}, 400);
    }

    const createPrompt = () => {
        let header = "Hey, you are a chat bot for a company!\nThese are you previous messages:\'\n"
        history.forEach(m => header += `${m.owner}: ${m.message}\n`);
        header += '\'\n';
        // Products
        header += `This is your latest prompt: \'${prompt}\'`;
        header += 'Respond to this message serious and professional, keep it to minimum 100 words.';
        return header;
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
                        <button disabled={generating} type="submit" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default App
