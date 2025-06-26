import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ParkEaseLogo from "../images/HeaderLogo.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleReservation = (e) => {
    e.preventDefault();
    
    if (location.pathname === '/reservation') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {

      navigate('/reservation');
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToFeatures = (e) => {
    e.preventDefault();
    setShowTooltip(false);
    
    if (location.pathname !== '/') {

      navigate('/');

      setTimeout(() => {
        const featuresSection = document.getElementById('features-section');
        if (featuresSection) {
          featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    } else {

      const featuresSection = document.getElementById('features-section');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleAbout = (e) => {
    e.preventDefault();
    navigate('/about');
  };

  const handleContactUs = (e) => {
    e.preventDefault();
    navigate('/contact');
  };

  return (
    <header
      style={{
        backgroundColor: "#AEDFF7",
        padding: "10px 20px",
        fontFamily: "Arial, sans-serif",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <img
        src={ParkEaseLogo}
        alt="Parkease Logo"
        style={{
          height: "100px",
          width: "auto",
          objectFit: "contain",
          marginLeft: "150px",
          cursor: "pointer",
          display: "block",
          flexShrink: 0,
          zIndex: 1001,
        }}
        onClick={scrollToTop}
      />

      {/* Ortalanmış navigation */}
      <nav
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          padding: "10px 25px",
          borderRadius: "10px",
          fontWeight: "normal",
        }}
      >
        {["Ana Sayfa", "Rezervasyon", "Hakkımızda", "Bize Ulaşın"].map((item, index, arr) => (
          <React.Fragment key={item}>
            <div 
              style={{ 
                position: "relative",
                display: "inline-block"
              }}
              onMouseEnter={() => item === "Ana Sayfa" && setShowTooltip(true)}
              onMouseLeave={() => item === "Ana Sayfa" && setShowTooltip(false)}
            >
              <a
                href="#"
                onClick={
                  item === "Rezervasyon" ? handleReservation :
                  item === "Ana Sayfa" ? scrollToTop :
                  item === "Hakkımızda" ? handleAbout :
                  item === "Bize Ulaşın" ? handleContactUs :
                  undefined
                }
                style={{
                  color: "#AEDFF7",
                  textDecoration: "none",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "1rem",
                  padding: "0 10px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                {item}
                {/* Dropdown arrow - sadece Ana Sayfa için */}
                {item === "Ana Sayfa" && (
                  <span
                    style={{
                      width: "0",
                      height: "0",
                      borderLeft: "4px solid transparent",
                      borderRight: "4px solid transparent",
                      borderTop: "4px solid #AEDFF7",
                      display: "inline-block",
                    }}
                  />
                )}
              </a>
              
              {/* Hover tooltip - sadece Ana Sayfa için */}
              {item === "Ana Sayfa" && showTooltip && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "white",
                    color: "#AEDFF7",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    fontSize: "14px",
                    fontFamily: "Arial, sans-serif",
                    whiteSpace: "nowrap",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    cursor: "pointer",
                    marginTop: "2px",
                    zIndex: 1002,
                  }}
                  onClick={scrollToFeatures}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  Rezervasyon?
                  {/* Invisible bridge to prevent tooltip from disappearing */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-7px",
                      left: "0",
                      right: "0",
                      height: "7px",
                      backgroundColor: "transparent",
                    }}
                  />
                </div>
              )}
            </div>
            
            {index < arr.length - 1 && (
              <div
                style={{
                  width: "1px",
                  height: "20px",
                  backgroundColor: "#AEDFF7",
                  margin: "0 10px",
                  opacity: 0.7,
                }}
              />
            )}
          </React.Fragment>
        ))}
      </nav>
    </header>
  );
};

export default Header;