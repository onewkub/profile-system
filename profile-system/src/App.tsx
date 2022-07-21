import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import store from "./redux/store";
import AppRouter from "./router";
import theme from "./theme";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <AppRouter />
                <ToastContainer position="bottom-right" />
            </Provider>
        </ThemeProvider>
    );
}

export default App;
