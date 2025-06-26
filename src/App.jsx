import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Reservation from "./pages/Reservation";

const HomePage = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const location = useLocation();

  useEffect(() => {

    if (location.state?.showSuccessMessage) {
      setShowSuccessMessage(true);

      window.history.replaceState({}, document.title);
      
    
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  const handleMessageClose = () => {
    setShowSuccessMessage(false);
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <Header />
      <HeroSection
        showSuccessMessage={showSuccessMessage}
        onMessageClose={handleMessageClose}
      />
      <FeaturesSection />
      <Footer />
    </div>
  );
};


const ReservationPage = () => {
  const navigate = useNavigate();

  const handleReservationComplete = () => {
    
    navigate('/', { state: { showSuccessMessage: true } });
  };

  return (
    <Reservation onReservationComplete={handleReservationComplete} />
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/reservation" element={<ReservationPage />} />
      </Routes>
    </Router>
  );
};

export default App;