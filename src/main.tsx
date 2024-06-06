import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Dashboard from './Dashboard.tsx';
import './index.css';
import { AddPrompt, DeletePrompt } from './Prompt.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
     <Router>
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/bot/:id" element={<App />} />
            <Route path="/add-prompt" element={<AddPrompt />} />
            <Route path="/delete-prompt" element={<DeletePrompt />} />
        </Routes>
    </Router>
)
