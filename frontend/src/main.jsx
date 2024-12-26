import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import {Toaster} from 'react-hot-toast'
import { CopilotKit } from "@copilotkit/react-core"; 
import "@copilotkit/react-ui/styles.css";
import { CopilotPopup } from "@copilotkit/react-ui";

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <CopilotKit publicApiKey={import.meta.env.VITE_AI_COPILOT}> 
    <App />
    <Toaster/>
    <CopilotPopup
        instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
        labels={{
          title: "Todos Assistant",
          initial: "Need any help?",
        }}
      />
    </CopilotKit>
  </StrictMode>,
)
