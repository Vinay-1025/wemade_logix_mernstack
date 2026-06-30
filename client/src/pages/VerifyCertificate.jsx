import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, ShieldAlert, Award, Calendar, ExternalLink, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import axios from 'axios';

const VerifyCertificate = () => {
  const { certId } = useParams();
  const [loading, setLoading] = useState(true);
  const [verification, setVerification] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkVerification = async () => {
      try {
        const res = await axios.get(`/api/auth/verify-certificate/${certId}`);
        setVerification(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Certificate verification failed');
      } finally {
        setLoading(false);
      }
    };
    if (certId) {
      checkVerification();
    }
  }, [certId]);

  return (
    <div className="verify-container">
      <div className="verify-background-grid"></div>
      
      <header className="verify-header">
        <div className="verify-logo">
          <span className="logo-accent">WeMade</span> Logix
        </div>
        <div className="protocol-badge">
          <ShieldCheck size={14} color="#00D1D1" />
          <span>Trust Verification Protocol</span>
        </div>
      </header>

      <main className="verify-card-container">
        {loading ? (
          <div className="verify-card loading-state">
            <div className="spinner"></div>
            <h3>Securing Verification Payload...</h3>
            <p>Querying cryptographic certificate registry on the blockchain...</p>
          </div>
        ) : error || !verification?.isValid ? (
          <div className="verify-card error-state">
            <div className="status-icon-badge error">
              <ShieldAlert size={48} color="#ef4444" />
            </div>
            
            <h1 className="error-title">Verification Refused</h1>
            <div className="error-banner">
              <AlertCircle size={18} />
              <span>{error || verification?.message || 'This certificate has been locked or is invalid.'}</span>
            </div>

            <div className="details-box">
              <p className="details-desc">
                The WeMade Logix cryptographic verification protocol could not validate the integrity of this credential.
              </p>
              <div className="details-row">
                <span className="details-label">Requested ID</span>
                <span className="details-val cert-id-code">{certId}</span>
              </div>
              <div className="details-row">
                <span className="details-label">Status</span>
                <span className="status-badge-failed">UNTRUSTED / LOCKED</span>
              </div>
            </div>

            <p className="contact-help">
              If you believe this is a system error, please contact support at <a href="mailto:support@wemadelogix.com">support@wemadelogix.com</a>
            </p>

            <Link to="/login" className="action-button-btn secondary">
              <span>Return to Login Portal</span>
            </Link>
          </div>
        ) : (
          <div className="verify-card success-state">
            <div className="gold-ribbon-seal">
              <div className="seal-star">🏆</div>
            </div>

            <div className="status-icon-badge success">
              <CheckCircle2 size={48} color="#10b981" />
            </div>

            <span className="trust-stamp">OFFICIAL VERIFIED CREDENTIAL</span>
            <h1 className="success-title">Certificate Validated</h1>
            
            <div className="success-banner">
              <span>This certificate is trusted and officially issued by WeMade Logix.</span>
            </div>

            <div className="student-profile-info">
              <div className="profile-initial">{verification.student?.name?.charAt(0)}</div>
              <div>
                <h2>{verification.student?.name}</h2>
                <p className="student-email">{verification.student?.email}</p>
              </div>
            </div>

            <div className="verification-details-table">
              <div className="v-row">
                <div className="v-label">
                  <Award size={16} />
                  <span>Program</span>
                </div>
                <div className="v-val highlight">{verification.course}</div>
              </div>
              <div className="v-row">
                <div className="v-label">
                  <Calendar size={16} />
                  <span>Issued Date</span>
                </div>
                <div className="v-val">
                  {new Date(verification.issueDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
              <div className="v-row">
                <div className="v-label">
                  <FileText size={16} />
                  <span>Certificate ID</span>
                </div>
                <div className="v-val cert-id-code">{certId}</div>
              </div>
              <div className="v-row">
                <div className="v-label">
                  <ShieldCheck size={16} />
                  <span>Issuer</span>
                </div>
                <div className="v-val font-semibold text-teal">WeMade Logix Management</div>
              </div>
            </div>

            <div className="integrity-badge">
              <ShieldCheck size={14} color="#10b981" />
              <span>Cryptographic Signature Matches Registered Records</span>
            </div>

            <div className="verify-actions">
              <a href="https://wemadelogix.com" target="_blank" rel="noopener noreferrer" className="action-button-btn">
                <span>About WeMade Academy</span>
                <ExternalLink size={14} />
              </a>
              <Link to="/login" className="action-button-btn secondary">
                <span>Student Portal</span>
              </Link>
            </div>
          </div>
        )}
      </main>

      <footer className="verify-footer">
        <p>© {new Date().getFullYear()} WeMade Logix Inc. All rights reserved. Secure cryptographic signatures protect this credential.</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .verify-container {
          min-height: 100vh;
          background-color: #0b0f19;
          color: #e2e8f0;
          font-family: 'Inter', -apple-system, sans-serif;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 24px;
          overflow-x: hidden;
        }

        .verify-background-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(0, 209, 209, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 209, 209, 0.03) 1px, transparent 1px);
          background-size: 30px 30px;
          pointer-events: none;
          z-index: 0;
        }

        .verify-header {
          width: 100%;
          max-width: 600px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1;
          margin-bottom: 24px;
        }

        .verify-logo {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .logo-accent {
          color: #00D1D1;
        }

        .protocol-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(0, 209, 209, 0.08);
          border: 1px solid rgba(0, 209, 209, 0.15);
          padding: 6px 12px;
          border-radius: 9999px;
          font-size: 0.75rem;
          color: #00D1D1;
          font-weight: 600;
        }

        .verify-card-container {
          width: 100%;
          max-width: 600px;
          z-index: 1;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .verify-card {
          width: 100%;
          background: rgba(17, 24, 39, 0.85);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05);
          position: relative;
          overflow: hidden;
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 60px 40px;
        }

        .spinner {
          width: 48px;
          height: 48px;
          border: 4px solid rgba(0, 209, 209, 0.1);
          border-left-color: #00D1D1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 24px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .status-icon-badge {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px auto;
        }

        .status-icon-badge.success {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.1);
        }

        .status-icon-badge.error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.1);
        }

        .trust-stamp {
          display: block;
          text-align: center;
          font-size: 0.75rem;
          color: #d97706;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 8px;
        }

        .success-title {
          font-size: 1.85rem;
          font-weight: 800;
          text-align: center;
          color: #ffffff;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }

        .error-title {
          font-size: 1.85rem;
          font-weight: 800;
          text-align: center;
          color: #ef4444;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }

        .success-banner {
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.15);
          color: #34d399;
          padding: 12px 16px;
          border-radius: 8px;
          text-align: center;
          font-size: 0.9rem;
          margin-bottom: 28px;
        }

        .error-banner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.15);
          color: #fca5a5;
          padding: 12px 16px;
          border-radius: 8px;
          text-align: center;
          font-size: 0.9rem;
          margin-bottom: 28px;
        }

        .student-profile-info {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .profile-initial {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--brand-gradient, linear-gradient(135deg, #00D1D1 0%, #0047AB 100%));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
        }

        .student-profile-info h2 {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 2px 0;
        }

        .student-email {
          font-size: 0.85rem;
          color: #94a3b8;
          margin: 0;
        }

        .verification-details-table {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 24px;
        }

        .v-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .v-row:last-child {
          border-bottom: none;
        }

        .v-label {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #94a3b8;
          font-size: 0.875rem;
        }

        .v-val {
          font-size: 0.875rem;
          font-weight: 600;
          color: #f1f5f9;
          text-align: right;
        }

        .v-val.highlight {
          color: #00D1D1;
        }

        .cert-id-code {
          font-family: monospace;
          background: rgba(255, 255, 255, 0.06);
          padding: 2px 8px;
          border-radius: 4px;
          color: #cbd5e1 !important;
        }

        .integrity-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 0.75rem;
          color: #10b981;
          margin-bottom: 32px;
          font-weight: 600;
        }

        .verify-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .action-button-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--brand-gradient, linear-gradient(135deg, #00D1D1 0%, #0047AB 100%));
          border: none;
          color: #ffffff;
          padding: 14px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.2s, opacity 0.2s;
        }

        .action-button-btn:hover {
          opacity: 0.95;
          transform: translateY(-1px);
        }

        .action-button-btn.secondary {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #e2e8f0;
        }

        .action-button-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .gold-ribbon-seal {
          position: absolute;
          top: -10px;
          right: 30px;
          width: 50px;
          height: 70px;
          background: linear-gradient(135deg, #d97706 0%, #fbbf24 100%);
          border-radius: 0 0 6px 6px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }

        .seal-star {
          font-size: 1.25rem;
        }

        .details-box {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .details-desc {
          font-size: 0.85rem;
          color: #94a3b8;
          margin: 0 0 16px 0;
          line-height: 1.5;
        }

        .details-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .details-row:last-child {
          border-bottom: none;
        }

        .details-label {
          font-size: 0.85rem;
          color: #94a3b8;
        }

        .details-val {
          font-size: 0.85rem;
          font-weight: 600;
        }

        .status-badge-failed {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #f87171;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .contact-help {
          text-align: center;
          font-size: 0.8rem;
          color: #64748b;
          margin-bottom: 28px;
          line-height: 1.5;
        }

        .contact-help a {
          color: #00D1D1;
          text-decoration: none;
        }

        .verify-footer {
          width: 100%;
          max-width: 600px;
          text-align: center;
          z-index: 1;
          margin-top: 24px;
        }

        .verify-footer p {
          font-size: 0.75rem;
          color: #475569;
          line-height: 1.5;
        }

        .text-teal {
          color: #00D1D1 !important;
        }

        @media (max-width: 480px) {
          .verify-actions {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .verify-card {
            padding: 24px;
          }
          .verify-header {
            flex-direction: column;
            gap: 12px;
            align-items: center;
          }
          .success-title, .error-title {
            font-size: 1.5rem;
          }
        }
      `}} />
    </div>
  );
};

export default VerifyCertificate;
