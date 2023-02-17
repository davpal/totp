import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

const TotpQr = (props) => {
  const [qrData, setQrData] = useState('');
  const [error, setError] = useState();

  useEffect(() => {
    const { secret, digits, period, label, issuer } = props;
    const uri = `otpauth://totp/${label}?secret=${secret}&digits=${digits}\
      &period=${period}&issuer=${issuer}`;
    QRCode.toDataURL(uri)
      .then((d) => {
        setQrData(d)
        setError(null);
      })
      .catch((e) => setError(e.message));
  }, [props]);

  return (
    <div className="qr">
      { !error ? <img src={qrData} /> : <p>{error}</p> }
    </div>
  );
};

export default TotpQr;
