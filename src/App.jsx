import React, { useEffect, useState } from "react";

import "./App.scss";
import Input from "./components/Input";
import NumberInput from "./components/NumberInput";
import TotpQr from "./components/TotpQr";
import OtpCode from "./components/OtpCode";

const App = () => {
  const [secret, setSecret] = useState("ORXX AIDT MVRX EZLU");
  const [period, setPeriod] = useState(30);
  const [digits, setDigits] = useState(6);
  const [label, setLabel] = useState("generator");
  const [issuer, setIssuer] = useState("TOTP Generator");

  const onSecretChange = (e) => {
    const newSecret = e.target.value.toUpperCase();
    // allowing base32 string only
    setSecret((secret) =>
      /^[A-Z2-7 ]*=*$/.test(newSecret) ? newSecret : secret
    );
  };

  const onNumberChange = (e, setValue) => {
    let { value, max } = e.target;
    value = Math.min(Number(max), Number(value));
    setValue(value || "");
  };

  return (
    <div className="totp-generator">
      <h1>TOTP Generator</h1>
      <Input
        name="shared secret (base32)"
        value={secret}
        onChange={onSecretChange}
      />
      <NumberInput
        name="digits"
        value={digits}
        max="10"
        onChange={(e) => onNumberChange(e, setDigits)}
      />
      <NumberInput
        name="period"
        value={period}
        max="60"
        onChange={(e) => onNumberChange(e, setPeriod)}
      />
      <Input
        name="label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <Input
        name="issuer"
        value={issuer}
        onChange={(e) => setIssuer(e.target.value)}
      />
      <TotpQr {...{ secret, digits, period, label, issuer }} />
      <OtpCode {...{ secret, digits, period }} />
    </div>
  );
};

export default App;
