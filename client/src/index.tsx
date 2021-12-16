import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './components/Login/LoginPage';
import AuthPage from './components/Login/2FAPage';

ReactDOM.render(
	<React.StrictMode>
		<Header />
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate replace to="/login" />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/2FA" element={<AuthPage />} />
				<Route path="/dashboard" element={<App />} />
			</Routes>
		</BrowserRouter>

		<Footer />
	</React.StrictMode>,
	document.getElementById('root')
);
