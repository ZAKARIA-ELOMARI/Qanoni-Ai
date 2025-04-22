import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import NotFound from './pages/NotFound';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#00A67E',
        },
        background: {
            default: '#1A1C1E',
            paper: '#1F2937',
            chat: '#111827',
            sidebar: '#1F2937',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#9CA3AF',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '6px',
                },
                contained: {
                    backgroundColor: '#00A67E',
                    '&:hover': {
                        backgroundColor: '#009472',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: '#374151',
                        borderRadius: '6px',
                        '&:hover fieldset': {
                            borderColor: '#4B5563',
                        },
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
});

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/chat"
                        element={
                            <PrivateRoute>
                                <Chat />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
