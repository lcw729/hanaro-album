import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {SessionProvider} from "./contexts/session-context.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <SessionProvider>
            <App/>
        </SessionProvider>
    </React.StrictMode>
)
