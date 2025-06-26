import React from "react";

const FeaturesSection = () => {
  const steps = [
    "Menü çubuğundan Rezervasyon sekmesine gidin.",
    "Sayfada bulunan harita üzerinden aracınızı park etmek istediğiniz otoparkı seçin.",
    "Seçim yaptıktan sonra boş olan park alanının bilgilerine ulaşın.",
    "Bilgileri kontrol ettikten sonra aracınızı park etmek istediğiniz park alanını seçin.",
    "Çıkan ekranda istenilen bilgileri doldurun ve eğer park alanı ücretliyse ödemeyi yapın, en önemlisi 20 dakika içerisinde park alanına yetişmeyi unutmayın. (20 dakika içerisinde park alanına ulaşamazsanız rezervasyonunuz düşer)."
  ];

  return (
    <section 
      id="features-section"
      style={{
        padding: "60px 40px",
        backgroundColor: "white",
        marginTop: "90px",
        marginBottom: "40px"
      }}
    >
      <h2 style={{
        color: "#AEDFF7",
        fontFamily: "Arial, sans-serif",
        fontSize: "36px",
        fontWeight: "bold",
        textAlign: "center",
        margin: "-70px 0 50px 0"
      }}>
        PARK ALANI REZERVASYONU NASIL YAPILIR?
      </h2>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "30px",
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        {steps.map((step, index) => (
          <div key={index} style={{
            display: "flex",
            alignItems: "flex-start",
            flex: "1",
            gap: "15px",
            backgroundColor: "#AEDFF7",
            padding: "20px",
            borderRadius: "10px"
          }}>
            <div style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "black",
              fontFamily: "Arial, sans-serif",
              lineHeight: "1",
              flexShrink: 0
            }}>
              {index + 1}
            </div>
            <div style={{
              color: "black",
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
              lineHeight: "1.5",
              textAlign: "left"
            }}>
              {step}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;