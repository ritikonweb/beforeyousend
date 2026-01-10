import React from 'react';

export default function PrivacyPolicy() {
  const effectiveDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 font-sans text-gray-800">
      <header className="mb-10 border-b pb-6">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy for Before You Send</h1>
        <p className="text-gray-600">Effective Date: {effectiveDate}</p>
      </header>

      <section className="space-y-8">
        {/* 1. Introduction */}
        <article>
          <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
          <p className="leading-relaxed">
            <strong>Before You Send</strong> ("we," "us," or "our") is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, and safeguard your information when you use our 
            Chrome Extension.
          </p>
          <p className="mt-2 leading-relaxed">
            Our extension serves a <strong>single purpose</strong>: to instantly audit your Gmail drafts for 
            grammar and professional tone before they are sent, ensuring your communication is clear and effective.
          </p>
        </article>

        {/* 2. Data Collection */}
        <article>
          <h2 className="text-2xl font-semibold mb-3">2. Data We Collect</h2>
          <p className="leading-relaxed mb-4">
            To provide our core functionality, we require access to specific permissions. We only process data 
            essential to the execution of the extension's features:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Personal Communications (Email Drafts):</strong> We access the subject line and body text 
              of the email you are currently drafting only when you initiate the send action.
            </li>
            <li>
              <strong>Website Content (Gmail Interface):</strong> We interact with the Gmail DOM (Document Object Model) 
              to detect when the "Send" button is clicked and to display our audit suggestions within your view.
            </li>
          </ul>
        </article>

        {/* 3. Data Processing & Security */}
        <article>
          <h2 className="text-2xl font-semibold mb-3">3. How We Process Your Data</h2>
          <p className="leading-relaxed mb-4">
            We prioritize the security and integrity of your data during processing:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Secure Transmission:</strong> When an audit is triggered, your draft content is transmitted 
              via an encrypted (HTTPS/TLS) connection.
            </li>
            <li>
              <strong>AI Analysis:</strong> The data is sent securely to the <strong>Google Gemini API</strong> for real-time 
              analysis of grammar, tone, and clarity. Google Gemini processes this data solely to return the analysis 
              results to you.
            </li>
          </ul>
        </article>

        {/* 4. Data Retention */}
        <article>
          <h2 className="text-2xl font-semibold mb-3">4. Data Retention (Ephemeral Processing)</h2>
          <p className="leading-relaxed">
            We adhere to a strict <strong>Zero-Retention Policy</strong> regarding your email content:
          </p>
          <div className="bg-gray-50 border-l-4 border-blue-500 p-4 mt-3">
            <p className="font-medium">
              We do not store, save, archive, or log the content of your emails on our servers.
            </p>
            <p className="mt-2 text-sm">
              Your email data is processed in-memory for the duration of the audit (seconds) and is immediately 
              discarded once the analysis is returned to your browser.
            </p>
          </div>
        </article>

        {/* 5. Information Sharing & Disclosure */}
        <article>
          <h2 className="text-2xl font-semibold mb-3">5. Information Sharing & Disclosure</h2>
          <p className="leading-relaxed mb-4">
            We are transparent about how your data is handled regarding third parties:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>No Sale of Data:</strong> We do <strong>not</strong> sell, trade, or transfer user data to third 
              parties for marketing, advertising, or creditworthiness purposes.
            </li>
            <li>
              <strong>Service Providers:</strong> We share data with Google (via the Gemini API) strictly for the 
              purpose of generating the analysis. Google is contractually prohibited from using this data for their 
              own model training or other purposes outside of fulfilling our API request.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose information only if required by law, such as to 
              comply with a subpoena or similar legal process.
            </li>
          </ul>
        </article>

        {/* 6. Limited Use Policy Compliance */}
        <article>
          <h2 className="text-2xl font-semibold mb-3">6. Google Limited Use Policy</h2>
          <p className="leading-relaxed">
            Before You Send's use and transfer to any other app of information received from Google APIs will 
            adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer" className="text-blue-600 underline">Google API Services User Data Policy</a>, 
            including the Limited Use requirements.
          </p>
        </article>

        {/* 7. User Control */}
        <article>
          <h2 className="text-2xl font-semibold mb-3">7. User Control & Consent</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Explicit Trigger:</strong> The audit process only begins when you physically click the "Send" button. 
              We do not passively scan your drafts while you type.
            </li>
            <li>
              <strong>Bypass Option:</strong> You retain full control over your workflow. If you wish to send an email 
              without an audit, you may use the "Skip Audit" or "Send Anyway" feature provided within the extension interface.
            </li>
            <li>
              <strong>Uninstallation:</strong> You may revoke access at any time by uninstalling the extension from your 
              Chrome browser.
            </li>
          </ul>
        </article>

        {/* 8. Contact Us */}
        <article>
          <h2 className="text-2xl font-semibold mb-3">8. Contact Us</h2>
          <p className="leading-relaxed">
            If you have any questions or concerns regarding this Privacy Policy, please contact us at:
          </p>
          <p className="mt-2 font-medium">
            <a href="mailto:support@beforeyousend.com" className="text-blue-600 hover:underline">
              support@beforeyousend.com
            </a>
          </p>
        </article>
      </section>

      <footer className="mt-12 pt-6 border-t text-sm text-gray-500 text-center">
        &copy; {new Date().getFullYear()} Before You Send. All rights reserved.
      </footer>
    </main>
  );
}
