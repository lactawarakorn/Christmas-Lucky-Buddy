import { useState } from "react";

function Password({ checkMatching }) {
  const [typing, setTyping] = useState("");

  const onTyping = (e) => {
    const word = e.target.value;
    setTyping(word);
  };

  return (
    <div className="password">
      <h3>Enter Your Password</h3>
      <input type="text" onChange={onTyping} value={typing} />
      <button onClick={() => checkMatching(typing)}>OK</button>
    </div>
  );
}

export default Password;
