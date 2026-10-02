import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../services/api";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const identifier = location.state?.identifier || "";

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(
    location.state?.message ||
      "Enter the verification code sent to your email."
  );
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!identifier) {
      setError(
        "Your reset session has expired. Please request a new verification code."
      );
      return;
    }

    if (!/^\d{6}$/.test(code.trim())) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    if (!password) {
      setError("Please enter your new password.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one capital letter.");
      return;
    }

    if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one number.");
      return;
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      setError("Password must contain at least one symbol.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/reset-password", {
        identifier,
        code: code.trim(),
        password,
      });

      setMessage(
        response.data?.message ||
          "Password reset successfully. Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Reset password error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to reset password. Please check your verification code and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "#f5f7fa",
        padding: "20px",
      }}
    >
      <div
        className="row w-100 shadow-lg overflow-hidden"
        style={{
          maxWidth: "950px",
          borderRadius: "20px",
          background: "#fff",
        }}
      >
        <div
          className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center text-white"
          style={{
            background:
              "linear-gradient(135deg, #0d6efd, #084298)",
            minHeight: "600px",
          }}
        >
          <div className="text-center px-5">
            <h1 className="fw-bold mb-3">SFPMS</h1>

            <h3 className="fw-bold mb-3">
              Verify Your Account
            </h3>

            <p className="mb-0">
              Enter the verification code sent to your
              email and create a new password for your
              account.
            </p>
          </div>
        </div>

        <div className="col-lg-6">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 p-md-5"
          >
            <div className="text-center mb-4">
              <h2 className="fw-bold">
                Reset Password
              </h2>

              <p className="text-muted">
                Enter the verification code sent to your
                email.
              </p>
            </div>

            {message && (
              <div className="alert alert-success">
                {message}
              </div>
            )}

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Verification Code
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  className="form-control form-control-lg text-center"
                  placeholder="Enter 6-digit code"
                  value={code}
                  onChange={(e) =>
                    setCode(
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6)
                    )
                  }
                  maxLength={6}
                  autoComplete="one-time-code"
                  required
                />

                <small className="text-muted">
                  Enter the 6-digit code received in your email.
                </small>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  New Password
                </label>

                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="new-password"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Confirm Password
                </label>

                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  autoComplete="new-password"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100"
                disabled={loading}
              >
                {loading
                  ? "Resetting Password..."
                  : "Reset Password"}
              </button>
            </form>

            <div className="text-center mt-4">
              <Link
                to="/login"
                className="text-decoration-none"
              >
                ← Back to Login
              </Link>
            </div>

            <div className="text-center mt-2">
              <Link
                to="/"
                className="text-muted text-decoration-none"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
