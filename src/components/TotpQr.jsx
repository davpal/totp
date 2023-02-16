import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

const TotpQr = (props) => {
  const { secret, digits, period, label, issuer } = props;
  const [qrData, setQrData] = useState();

  useEffect(() => {
    const uri = `otpauth://totp/${label}?secret=${secret}&digits=${digits}\
    &period=${period}&issuer=${issuer}`;
    QRCode.toDataURL(uri).then(setQrData);
    console.log("Render QR");
  }, [props]);

  return (
    <div className="qr">
      <img src={qrData} />
    </div>
  );
};

export default TotpQr;
