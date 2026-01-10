
export default function PrivacyPolicy() {
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px', color: '#3c4043', lineHeight: '1.6', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ color: '#1a73e8', fontSize: '2.5rem', marginBottom: '10px' }}>Privacy Policy</h1>
      <p style={{ color: '#70757a', marginBottom: '40px' }}>Last Updated: October 2023</p>

      <section style={{ marginBottom: '30px' }}>
        <h2>1. Single Purpose</h2>
        <p><strong>Before You Send</strong> is designed with a single, narrow purpose: to provide high-precision grammar and professional tone auditing for Gmail drafts before they are dispatched.</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>2. Data Collection & Usage</h2>
        <p>To provide our service, we collect and process the following data:</p>
        <ul>
          <li><strong>Personal Communications:</strong> The text content (Subject and Body) of your email drafts.</li>
          <li><strong>Website Content:</strong> Structural elements of the Gmail interface necessary to capture the draft and apply improvements.</li>
        </ul>
        <p>This data is processed exclusively to perform the audit you requested. We do not use this data for any other purpose.</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>3. Data Transmission & Retention</h2>
        <p>All draft data is transmitted securely via HTTPS to our processing endpoint. We utilize the Google Gemini API for professional analysis. <strong>Crucially:</strong></p>
        <ul>
          <li>We do NOT store your email content on our servers.</li>
          <li>Data is processed in real-time and immediately discarded after the audit results are sent back to your browser.</li>
          <li>We do NOT maintain logs of your private communications.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>4. Data Disclosure Certifications</h2>
        <p>In accordance with the Chrome Web Store Developer Programme Policies:</p>
        <ul>
          <li>We do NOT sell or transfer user data to third parties.</li>
          <li>We do NOT use or transfer user data for purposes unrelated to the extension's single purpose.</li>
          <li>We do NOT use or transfer user data to determine creditworthiness or for lending purposes.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>5. Contact</h2>
        <p>For questions regarding this policy, please contact us via our developer profile on the Chrome Web Store.</p>
      </section>
      
      <footer style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <a href="/" style={{ color: '#1a73e8', textDecoration: 'none' }}>Back to Home</a>
      </footer>
    </main>
  );
}
