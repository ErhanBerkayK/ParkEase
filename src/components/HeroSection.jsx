import React, { useState, useEffect } from "react";

const images = [
  { id: 1, url: "https://i.ibb.co/Z6gHf5HB/Hero-Section-Image1.png", alt: "Resim 1" },
  { id: 2, url: "https://i.ibb.co/5h0nX6PM/Hero-Section-Image2.png", alt: "Resim 2" },
  { id: 3, url: "https://i.ibb.co/wZ7cxfNN/Hero-Section-Image3.png", alt: "Resim 3" },
];

const HeroSection = ({ showSuccessMessage, onMessageClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        if (onMessageClose) {
          onMessageClose();
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage, onMessageClose]);

  return (
    <section style={{ position: "relative", fontFamily: "Arial, sans-serif" }}>
      <img
        src={images[currentIndex].url}
        alt={images[currentIndex].alt}
        style={{
          width: "100%",
          height: "775px",
          objectFit: "cover",
          objectPosition: "center center",
          borderRadius: "10px"
        }}
      />
      <div style={{
        position: "absolute",
        bottom: "15px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        gap: "10px"
      }}>
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: idx === currentIndex ? "#AEDFF7" : "white",
              cursor: "pointer",
            }}
            aria-label={`Resim ${idx + 1}`}
          />
        ))}
      </div>
      
      {/* Başarı Mesajı */}
      {showSuccessMessage && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '30px 40px',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          maxWidth: '600px',
          width: '90%',
          textAlign: 'center',
          fontSize: '1.1rem',
          fontWeight: 600,
          lineHeight: '1.5',
          zIndex: 1000,
          animation: 'fadeInOut 5s ease-in-out'
        }}>
          <div style={{
            fontSize: '1.3rem',
            marginBottom: '10px',
            fontWeight: 700
          }}>
            ✓ Randevu İşleminiz Tamamlandı
          </div>
          <div>
            Lütfen 20 Dakika İçerisinde Park Alanında Olunuz<br />
            Aksi Takdirde Randevunuz İptal Edilecektir.
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          10% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          90% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;