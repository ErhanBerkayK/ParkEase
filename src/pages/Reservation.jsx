import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import GoogleMap from "../components/GoogleMap";
import Footer from "../components/Footer";
import parkAreaPhoto from "../images/park_area_photo.png";

const Reservation = ({ onReservationComplete }) => {
  const [showParkingArea, setShowParkingArea] = useState(false);
  const [counterData, setCounterData] = useState({ empty_count: 0, empty_slots: [] });
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const parkingAreaRef = useRef(null);

  const handleMarkerClick = () => {
    setShowParkingArea(true);
    setTimeout(() => {
      if (parkingAreaRef.current) {
        parkingAreaRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  const handleReservation = (slotNumber) => {
    setSelectedSlot(slotNumber);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSlot(null);
    setEmail('');
    setPhone('');
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); 
    if (value.length <= 11) {
      setPhone(value);
    }
  };

  const handleCompleteReservation = () => {
    if (email.trim() === '' || phone.length !== 11) {
      alert('Lütfen tüm alanları doğru şekilde doldurunuz. Telefon numarası 11 haneli olmalıdır.');
      return;
    }
    
    
    closeModal();
    if (onReservationComplete) {
      onReservationComplete();
    }
  };


  useEffect(() => {
    let intervalId;
    if (showParkingArea) {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:5050/status");
          if (response.ok) {
            const data = await response.json();
            setCounterData(data);
          }
        } catch (error) {
          
        }
      };
      fetchData(); 
      intervalId = setInterval(fetchData, 1000); 
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [showParkingArea]);

  return (
    <div style={{ backgroundColor: "white" }}>
      <Header />
      <div style={{
        marginTop: "140px",
        padding: "0 170px",
        paddingBottom: "40px"
      }}>
        <GoogleMap onMarkerClick={handleMarkerClick} />
        {showParkingArea && (
          <div ref={parkingAreaRef}>
            <div style={{ height: "32px" }} />
            <h2 style={{
              color: "#7EC8E3",
              textAlign: "center",
              fontWeight: 700,
              fontSize: "2rem",
              letterSpacing: "2px",
              margin: 0,
              marginBottom: "24px"
            }}>
              OTOPARK ALANI
            </h2>
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "40px 0",
            }}>
              <img
                src={parkAreaPhoto}
                alt="Otopark Alanı"
                style={{
                  maxWidth: "100%",
                  width: "700px",
                  height: "auto",
                  borderRadius: "16px",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                  border: "2px solid #AEDFF7",
                  background: "white"
                }}
              />
            </div>
            {/* Sayaç kutusu */}
            <div style={{
              background: "#7EC8E3",
              borderRadius: "14px",
              padding: "28px 32px",
              maxWidth: "500px",
              margin: "0 auto",
              marginTop: "24px",
              fontFamily: "Arial, sans-serif",
              color: "#fff",
              fontSize: "1.2rem",
              fontWeight: 600,
              textAlign: "center",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
            }}>
              <div>Toplam Boş Olan Park Alanı Sayısı: {counterData.empty_count}</div>
              <div style={{ marginTop: "12px" }}>
                Boş Olan Park Alanlarının Numaraları: {counterData.empty_slots.length > 0 ? counterData.empty_slots.join(", ") : "Yok"}
              </div>
            </div>
            {/* Boş park alanı bilgi kutucukları */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "24px",
              marginTop: "32px"
            }}>
              {counterData.empty_slots.map((slot) => (
                <div key={slot} style={{
                  background: "#B3E3FA",
                  borderRadius: "16px",
                  padding: "24px 32px",
                  minWidth: "220px",
                  maxWidth: "260px",
                  fontFamily: "Arial, sans-serif",
                  color: "#222",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  textAlign: "left",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start"
                }}>
                  <div style={{
                    fontWeight: 700,
                    fontSize: "1.3rem",
                    color: "#2196F3",
                    marginBottom: "10px"
                  }}>{`BOŞ PARK ALANI ${slot}`}</div>
                  <div>- Ücret : Ücretsiz</div>
                  <div>- Elektrikli Şarj Kısmı : -</div>
                  <div>- Düz / Engelli : Düz</div>
                  <button
                    onClick={() => handleReservation(slot)}
                    style={{
                      backgroundColor: "#2196F3",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      padding: "12px 24px",
                      fontSize: "1rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      marginTop: "16px",
                      alignSelf: "center",
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 8px rgba(33, 150, 243, 0.2)"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#1976D2";
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 4px 12px rgba(33, 150, 243, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#2196F3";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 2px 8px rgba(33, 150, 243, 0.2)";
                    }}
                  >
                    Rezervasyon Yap
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Modal Pencere */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#B3E3FA',
            padding: '40px',
            width: '400px',
            maxWidth: '90%',
            position: 'relative',
            fontFamily: 'Arial, sans-serif'
          }}>
            {/* X Butonu */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '15px',
                left: '15px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                fontWeight: 'bold',
                cursor: 'pointer',
                color: '#333',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
            
            {/* Başlık */}
            <h2 style={{
              color: '#2196F3',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: '1.8rem',
              letterSpacing: '2px',
              margin: '0 0 30px 0'
            }}>
              RANDEVU
            </h2>
            
            {/* E-mail Input */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 600,
                color: '#333'
              }}>
                E-mail:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #7EC8E3',
                  borderRadius: '6px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                placeholder="E-mail adresinizi giriniz"
              />
            </div>
            
            {/* Telefon Input */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 600,
                color: '#333'
              }}>
                Cep Telefonu:
              </label>
              <input
                type="text"
                value={phone}
                onChange={handlePhoneChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #7EC8E3',
                  borderRadius: '6px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
                placeholder="Telefon numaranızı giriniz (11 hane)"
                maxLength="11"
              />
            </div>
            
            {/* Randevuyu Tamamla Butonu */}
            <button
              onClick={handleCompleteReservation}
              style={{
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '14px 28px',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer',
                width: '100%',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(33, 150, 243, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1976D2';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(33, 150, 243, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#2196F3';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 8px rgba(33, 150, 243, 0.2)';
              }}
            >
              Randevuyu Tamamla
            </button>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Reservation;