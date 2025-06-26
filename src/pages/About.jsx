import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
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
          HAKKIMIZDA
        </h1>
        
        {/* Metin içeriği */}
        <div style={{
          color: "black",
          fontFamily: "Arial, sans-serif",
          fontSize: "1.1rem",
          lineHeight: "1.6",
          textAlign: "justify",
          textIndent: "30px" 
        }}>
          <p style={{ marginBottom: "20px" }}>
            ParkEase, şehir hayatındaki en büyük sorunlardan biri olan park yeri bulma zorluğuna çözüm getirmek amacıyla geliştirilmiş yenilikçi bir platformdur. Modern şehirlerde artan araç sayısı ve sınırlı park alanları nedeniyle sürücüler günlük hayatlarında büyük zaman kayıpları yaşamakta ve stres altında kalmaktadır.
          </p>
          
          <p style={{ marginBottom: "20px" }}>
            Misyonumuz, teknolojinin gücünden yararlanarak park yeri arama sürecini kolaylaştırmak ve sürücülerin zamanını daha verimli kullanmalarını sağlamaktır. ParkEase ile kullanıcılar, bulundukları konuma en yakın müsait park yerlerini hızlıca görüntüleyebilir, gerçek zamanlı doluluk durumlarını takip edebilir ve güvenli bir şekilde park işlemlerini gerçekleştirebilirler.
          </p>
          
          <p style={{ marginBottom: "20px" }}>
            Platformumuz, kullanıcı dostu arayüzü ve güvenilir harita entegrasyonu ile şehir içi mobiliteyi desteklemektedir. Amacımız, park yeri bulma stresini ortadan kaldırarak daha akıllı ve sürdürülebilir bir ulaşım ekosistemi oluşturmaktır. ParkEase ile park etmek artık çok daha kolay!
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
