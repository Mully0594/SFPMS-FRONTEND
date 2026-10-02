import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../services/api";
import fieldLogo from "../../assets/field-logo-transparent.png";


function ForgotPassword() {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    const value = identifier.trim();

    if (!value) {
      setError("Please enter your Email or Username.");
      setMessage("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const response = await api.post("/auth/forgot-password", {
        identifier: value,
      });

      navigate("/reset-password", {
        state: {
          identifier: value,
          message:
            response?.message ||
            "A verification code has been sent to your email.",
        },
      });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Unable to process your request. Please try again.";

      setError(errorMessage);
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .forgot-page {
          min-height: 100vh;
          display: flex;
          overflow: hidden;
          font-family: 'Poppins', 'Inter', Arial, sans-serif;
          background: #eef1f3;
        }

        /* =========================
           LEFT BRANDING SIDE
        ========================== */

        .forgot-brand-side {
          width: 50%;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;

          background:
            linear-gradient(
              rgba(7, 26, 51, 0.9),
              rgba(18, 59, 104, 0.9)
            ),
            var(--forgot-field-logo);

          background-size: cover, 430px;
          background-position: center, center;
          background-repeat: no-repeat;
        }

        .forgot-brand-side::before {
          content: "";
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.08);
          top: -180px;
          left: -150px;
        }

        .forgot-brand-side::after {
          content: "";
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          border: 1px solid rgba(245,210,26,0.08);
          bottom: -250px;
          right: -200px;
        }

        .forgot-brand-content {
          width: 80%;
          max-width: 550px;
          text-align: center;
          color: white;
          position: relative;
          z-index: 2;
        }

        .forgot-logo {
          width: 145px;
          height: 145px;
          object-fit: contain;
          border-radius: 18px;
          background: white;
          padding: 10px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.30);
        }

        .forgot-title {
          font-size: 38px;
          line-height: 1.25;
          font-weight: 800;
          margin: 30px 0 20px;
          letter-spacing: -0.5px;
        }

        .forgot-description {
          font-size: 16px;
          line-height: 1.8;
          color: #dbeafe;
          max-width: 500px;
          margin: auto;
        }

        .forgot-brand-line {
          width: 80px;
          height: 4px;
          background: #f5d21a;
          border-radius: 20px;
          margin: 30px auto 20px;
        }

        .forgot-brand-footer {
          color: #f5d21a;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 4px;
        }

        /* =========================
           RIGHT FORM SIDE
        ========================== */

        .forgot-form-side {
          width: 50%;
          min-height: 100vh;
          padding: 40px 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          overflow-y: auto;
        }

        .forgot-card {
          width: 100%;
          max-width: 500px;
          background: white;
          border-radius: 20px;
          padding: 42px;
          border: 1px solid #e5e7eb;
          box-shadow:
            0 25px 70px rgba(15,23,42,0.10);
        }

        .forgot-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .forgot-header h2 {
          margin: 0 0 10px;
          color: #0b1f3a;
          font-size: 32px;
          font-weight: 800;
        }

        .forgot-header p {
          margin: 0;
          color: #64748b;
          font-size: 14px;
          line-height: 1.7;
        }

        .forgot-form-group {
          margin-bottom: 20px;
        }

        .forgot-label {
          display: block;
          margin-bottom: 8px;
          color: #334155;
          font-size: 14px;
          font-weight: 600;
        }

        .forgot-input {
          width: 100%;
          height: 52px;
          padding: 0 15px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          outline: none;
          font-size: 14px;
          color: #0f172a;
          background: white;
          transition: all 0.25s ease;
        }

        .forgot-input:focus {
          border-color: #2563eb;
          box-shadow:
            0 0 0 4px rgba(37,99,235,0.08);
        }

        .forgot-input:disabled {
          background: #f8fafc;
          cursor: not-allowed;
        }

        .forgot-submit {
          width: 100%;
          height: 54px;
          border: none;
          border-radius: 10px;

          background:
            linear-gradient(
              135deg,
              #0b1f3a,
              #123b68
            );

          color: white;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;

          box-shadow:
            0 10px 25px rgba(11,31,58,0.20);
        }

        .forgot-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* =========================
           MESSAGES
        ========================== */

        .forgot-success {
          margin-bottom: 20px;
          padding: 12px 14px;
          border-radius: 10px;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          color: #047857;
          font-size: 13px;
          line-height: 1.6;
        }

        .forgot-error {
          margin-bottom: 20px;
          padding: 12px 14px;
          border-radius: 10px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          font-size: 13px;
          line-height: 1.6;
        }

        /* =========================
           LINKS
        ========================== */

        .forgot-login {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 7px;
          margin-top: 25px;
          color: #64748b;
          font-size: 13px;
          flex-wrap: wrap;
        }

        .forgot-login a {
          color: #2563eb;
          font-weight: 700;
          text-decoration: none;
        }

        .forgot-home {
          text-align: center;
          margin-top: 20px;
        }

        .forgot-home a {
          color: #475569;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
        }

        /* =========================
           RESPONSIVE
        ========================== */

        @media (max-width: 900px) {
          .forgot-page {
            flex-direction: column;
            overflow: auto;
          }

          .forgot-brand-side,
          .forgot-form-side {
            width: 100%;
            min-height: auto;
          }

          .forgot-brand-side {
            min-height: 380px;
            order: 2;
            padding: 50px 20px;
          }

          .forgot-form-side {
            order: 1;
            padding: 30px 20px;
          }

          .forgot-title {
            font-size: 30px;
          }
        }

        @media (max-width: 600px) {
          .forgot-card {
            padding: 28px 20px;
            border-radius: 18px;
          }

          .forgot-header h2 {
            font-size: 27px;
          }

          .forgot-brand-side {
            min-height: 320px;
          }

          .forgot-logo {
            width: 105px;
            height: 105px;
          }

          .forgot-title {
            font-size: 25px;
            margin-top: 20px;
          }

          .forgot-description {
            font-size: 13px;
          }
        }
      `}</style>

      <div className="forgot-page">

        {/* =========================
            LEFT SIDE
        ========================== */}

        <motion.div
          className="forgot-brand-side"
          style={{
            "--forgot-field-logo":
              "url('/image/egaz-logo.jpg')",
          }}
          initial={{
            x: -80,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          <motion.div
            className="forgot-brand-content"
            initial={{
              opacity: 0,
              scale: 0.88,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.2,
              duration: 0.7,
            }}
          >

            <motion.img
              className="forgot-logo"
              src={fieldLogo}
              alt="Field Placement logo"
              initial={{
                opacity: 0,
                scale: 0.5,
                rotate: -8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                type: "spring",
                stiffness: 120,
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

            <motion.h1
              className="forgot-title"
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
                duration: 0.6,
              }}
            >
              Student Field Placement
              <br />
              Management System
            </motion.h1>

            <motion.p
              className="forgot-description"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.5,
                duration: 0.6,
              }}
            >
              Securely recover your account
              and regain access to your
              field placement management
              system.
            </motion.p>

            <motion.div
              className="forgot-brand-line"
              initial={{
                width: 0,
              }}
              animate={{
                width: 80,
              }}
              transition={{
                delay: 0.7,
                duration: 0.5,
              }}
            />

            <motion.p
              className="forgot-brand-footer"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.8,
              }}
            >
              SFPMS
            </motion.p>

          </motion.div>

        </motion.div>

        {/* =========================
            RIGHT SIDE
        ========================== */}

        <motion.div
          className="forgot-form-side"
          initial={{
            x: 80,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          <motion.div
            className="forgot-card"
            initial={{
              opacity: 0,
              y: 35,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              delay: 0.15,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            <div className="forgot-header">

              <h2>
                Forgot Password?
              </h2>

              <p>
                Enter your Email or Username
                and we will send you a password
                reset link.
              </p>

            </div>

            {message && (
              <div className="forgot-success">
                {message}
              </div>
            )}

            {error && (
              <div className="forgot-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="forgot-form-group">

                <label className="forgot-label">
                  Email / Username
                </label>

                <input
                  type="text"
                  value={identifier}
                  onChange={(e) =>
                    setIdentifier(e.target.value)
                  }
                  placeholder="Enter your Email or Username"
                  className="forgot-input"
                  autoComplete="username"
                  disabled={loading}
                  required
                />

              </div>

              <motion.button
                type="submit"
                className="forgot-submit"
                whileHover={{
                  scale: loading ? 1 : 1.02,
                  y: loading ? 0 : -2,
                }}
                whileTap={{
                  scale: loading ? 1 : 0.98,
                }}
                disabled={loading}
              >
                {loading
                  ? "Sending Reset Link..."
                  : "Send Reset Link"}
              </motion.button>

            </form>

            <div className="forgot-login">

              <span>
                Remember your password?
              </span>

              <motion.div
                whileHover={{
                  x: 4,
                }}
              >
                <Link to="/login">
                  Back to Login
                </Link>
              </motion.div>

            </div>

            <div className="forgot-home">

              <Link to="/">
                Back to Home
              </Link>

            </div>

          </motion.div>

        </motion.div>

      </div>
    </>
  );
}

export default ForgotPassword;