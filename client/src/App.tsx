import{ Routes, Route, Link} from "react-router-dom";
import './App.css'
import Dashboard from "./pages/Dashboard.js"
import UploadAndPreview from "./pages/UploadAndPreview.js";

function App() {
  return (
    <div>
      <h1>Stash</h1>

      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="upload" element={<UploadAndPreview />}/>  
      </Routes>
    </div>
  )
}

export default App
