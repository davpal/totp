import React, { useEffect, useState } from "react";
import totp from "totp-generator";

const OtpCode = ({ secret, period, digits }) => {
  const [otpTimeLeft, setOtpTime] = useState(
    period - (Math.floor(Date.now() / 1000) % period)
  );

  const updateOtpTimeLeft = () => {
    const otpElapsed = Math.floor(Date.now() / 1000) % period || 0;
    setOtpTime(period - otpElapsed);
  };

  useEffect(() => {
    updateOtpTimeLeft();
  }, [secret, period, digits, otpTimeLeft]);

  useEffect(() => {
    const interval = setInterval(updateOtpTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [otpTimeLeft]);

  const percentage = Math.floor((otpTimeLeft / period) * 100) || 0;
  const progressColor = `hsl(${percentage}, 80%, 70%)`;
  const otp = totp(secret.replace(/\s/g, ""), { digits, period });

  return (
    <>
      <div className="otp-progress">
        <p className="progress-text">Updating in {otpTimeLeft} seconds</p>
        <span
          className="otp-progress-bar"
          style={{ width: percentage + "%", background: progressColor }}
        ></span>
      </div>
      <div className="otp">{otp}</div>;
    </>
  );
};

export default OtpCode;
