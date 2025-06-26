import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    adSoyad: '',
    email: '',
    mesaj: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Header />
      
      {/* Ana içerik alanı */}
      <div style={{
        paddingTop: "140px",
        paddingBottom: "60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "140px 20px 60px 20px"
      }}>
        
        {/* Başlık */}
        <h1 style={{
          color: "#AEDFF7",
          fontSize: "2.5rem",
          fontWeight: "bold",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          marginBottom: "40px"
        }}>
          BİZE ULAŞIN
        </h1>

        {/* Form Alanı */}
        <div style={{
          width: "100%",
          maxWidth: "600px"
        }}>
          
          {/* Ad - Soyad */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              color: "black",
              fontFamily: "Arial, sans-serif",
              fontSize: "1.1rem",
              fontWeight: "bold",
              display: "block",
              marginBottom: "8px"
            }}>
              Ad - Soyad:
            </label>
            <input
              type="text"
              name="adSoyad"
              value={formData.adSoyad}
              onChange={handleInputChange}
              style={{
                width: "100%",
                height: "40px",
                padding: "10px",
                fontSize: "1rem",
                fontFamily: "Arial, sans-serif",
                border: "2px solid #AEDFF7",
                borderRadius: "5px",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
          </div>

          {/* E-mail */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              color: "black",
              fontFamily: "Arial, sans-serif",
              fontSize: "1.1rem",
              fontWeight: "bold",
              display: "block",
              marginBottom: "8px"
            }}>
              e-mail:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                width: "100%",
                height: "40px",
                padding: "10px",
                fontSize: "1rem",
                fontFamily: "Arial, sans-serif",
                border: "2px solid #AEDFF7",
                borderRadius: "5px",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
          </div>

          {/* Mesajınız */}
          <div style={{ marginBottom: "30px" }}>
            <label style={{
              color: "black",
              fontFamily: "Arial, sans-serif",
              fontSize: "1.1rem",
              fontWeight: "bold",
              display: "block",
              marginBottom: "8px"
            }}>
              Mesajınız:
            </label>
            <textarea
              name="mesaj"
              value={formData.mesaj}
              onChange={handleInputChange}
              rows="10"
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "1rem",
                fontFamily: "Arial, sans-serif",
                border: "2px solid #AEDFF7",
                borderRadius: "5px",
                outline: "none",
                resize: "vertical",
                boxSizing: "border-box"
              }}
            />
          </div>

          {/* Gönder Butonu */}
          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "#AEDFF7",
                color: "white",
                padding: "12px 30px",
                fontSize: "1.1rem",
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#95d3f0"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#AEDFF7"}
            >
              Gönder
            </button>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ContactUs;