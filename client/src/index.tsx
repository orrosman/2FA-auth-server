import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';

ReactDOM.render(
	<React.StrictMode>
		<Header />
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/" element={<App />} />
			</Routes>
		</BrowserRouter>

		<Footer />
	</React.StrictMode>,
	document.getElementById('root')
);
