import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Home from "../src/pages/Home.js";
import FormPage from "../src/pages/FormPage.js";
import PlaylistPage from "../src/pages/PlaylistPage.js";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Home />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/playlist" element={<PlaylistPage />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
