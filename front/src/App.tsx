import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/shared/ProtectedRoute';
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import theme from './theme';
import { Authentication } from './components/pages';
import AnonymousOnlyRoute from './components/shared/AnonymousOnlyRoute';
import Conversations from './components/pages/Conversations/Conversations';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{
                backgroundColor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/auth/:type" element={
							<AnonymousOnlyRoute>
								<Authentication />
							</AnonymousOnlyRoute>
						} />
                        <Route path="/" element={<Navigate to="/conversations" replace />} />
                        <Route path="/conversations/:id?" element={
                            <ProtectedRoute>
                                <Conversations />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </BrowserRouter>
            </Box>
        </ThemeProvider>
    );
}

export default App;
