import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from './components/templates/Layout/Layout';
import {Home, Offers, CreateOffer, Authentication, Conversations} from './components/pages';
import ProtectedRoute from './components/shared/ProtectedRoute';
import Profile from './components/pages/Profile/Profile';
import theme from './theme';
import {ThemeProvider, CssBaseline, Box} from "@mui/material";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/> {/* Applique les styles par défaut de MUI */}
            <Box sx={{
                backgroundColor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Layout/>}>
                            <Route index element={<Home/>}/>
                            <Route path='/auth/:type' element={<Authentication/>}/>
                            <Route path='/offers' element={<Offers/>}/>
                            <Route path='/profile' element={
                                <ProtectedRoute>
                                    <Profile/>
                                </ProtectedRoute>
                            }/>
                            <Route path='/conversations/:id?' element={
                                <ProtectedRoute>
                                    <Conversations/>
                                </ProtectedRoute>
                            }/>

                            <Route path='/offers/form' element={<CreateOffer/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Box>
        </ThemeProvider>
    );
}

export default App;
