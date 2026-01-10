
'use client';

import React from 'react';

export default function Home() {
  const downloadUrl = "/extension.zip"; // Ensure extension.zip is in vercel/public/

  const steps = [
    {
      title: "1. Download & Unzip",
      desc: "Click the button above to get the extension package. Extract the ZIP file to a folder on your computer.",
      icon: "📥"
    },
    {
      title: "2. Open Extensions",
      desc: "In Chrome, navigate to chrome://extensions/ and toggle 'Developer mode' in the top right corner.",
      icon: "⚙️"
    },
    {
      title: "3. Load Unpacked",
      desc: "Click 'Load unpacked' and select the folder you just extracted. Before You Send is now active!",
      icon: "🛡️"
    }
  ];

  return (
    <div style={{ 
      backgroundColor: '#f8f9fa', 
      minHeight: '100vh', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#202124',
      overflowX: 'hidden'
    }}>
      {/* Mesh Background Effect */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 0,
        background: 'radial-gradient(circle at 10% 20%, rgba(26, 115, 232, 0.05) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(26, 115, 232, 0.05) 0%, transparent 40%)',
        pointerEvents: 'none'
      }} />

      {/* Hero Section */}
      <header style={{ 
        padding: '100px 20px 60px', 
        textAlign: 'center', 
        position: 'relative', 
        zIndex: 1,
        perspective: '1000px'
      }}>
        <div style={{
          display: 'inline-block',
          fontSize: '5rem',
          marginBottom: '30px',
          transform: 'rotateY(-15deg) rotateX(10deg)',
          filter: 'drop-shadow(20px 20px 30px rgba(0,0,0,0.15))',
          animation: 'float 4s ease-in-out infinite'
        }}>
          🛡️
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes float {
            0%, 100% { transform: rotateY(-15deg) rotateX(10deg) translateY(0px); }
            50% { transform: rotateY(-5deg) rotateX(5deg) translateY(-20px); }
          }
        `}} />
        
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: '800', 
          margin: '0 0 20px', 
          background: 'linear-gradient(135deg, #1a73e8 0%, #1557b0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-1px'
        }}>
          Before You Send
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#5f6368', 
          maxWidth: '600px', 
          margin: '0 auto 40px',
          lineHeight: '1.6'
        }}>
          Instantly audit Gmail drafts for grammar, tone, and clarity using Gemini AI. Professional integrity, delivered with one click.
        </p>

        <a 
          href={downloadUrl}
          download
          style={{
            display: 'inline-block',
            backgroundColor: '#1a73e8',
            color: '#fff',
            padding: '18px 36px',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: '600',
            textDecoration: 'none',
            boxShadow: '0 10px 25px rgba(26, 115, 232, 0.3)',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 15px 30px rgba(26, 115, 232, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(26, 115, 232, 0.3)';
          }}
        >
          Download Extension (.zip)
        </a>
      </header>

      {/* Installation Guide */}
      <section style={{ 
        maxWidth: '1000px', 
        margin: '0 auto', 
        padding: '60px 20px', 
        position: 'relative', 
        zIndex: 1 
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '2rem', fontWeight: '700' }}>
          Installation Instructions
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '30px' 
        }}>
          {steps.map((step, i) => (
            <div key={i} style={{
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              padding: '40px 30px',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              textAlign: 'center',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>{step.icon}</div>
              <h3 style={{ margin: '0 0 15px', color: '#1a73e8' }}>{step.title}</h3>
              <p style={{ margin: 0, color: '#5f6368', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Security Proof Section */}
      <section style={{ 
        maxWidth: '800px', 
        margin: '60px auto', 
        padding: '60px 40px',
        backgroundColor: '#fff',
        borderRadius: '32px',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
        border: '1px solid #f1f3f4'
      }}>
        <h3 style={{ color: '#1a73e8', marginBottom: '20px' }}>Privacy & Security First</h3>
        <p style={{ color: '#5f6368', fontSize: '1rem', lineHeight: '1.7' }}>
          We understand that your emails are private. <strong>Before You Send</strong> processes your data in-memory for real-time analysis and never stores your communications. We strictly preserve your formatting, including complex signatures and tables.
        </p>
        <div style={{ marginTop: '30px' }}>
          <a href="/privacy" style={{ color: '#1a73e8', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
            View Full Privacy Policy →
          </a>
        </div>
      </section>

      <footer style={{ 
        padding: '60px 20px', 
        textAlign: 'center', 
        color: '#9aa0a6', 
        fontSize: '0.85rem' 
      }}>
        &copy; {new Date().getFullYear()} Before You Send. Built with excellence by <a href="https://www.linkedin.com/in/yadavritik" target="_blank" style={{ color: '#1a73e8', textDecoration: 'none', fontWeight: 'bold' }}>Ritik</a>.
      </footer>
    </div>
  );
}
