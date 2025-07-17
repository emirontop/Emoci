import { useEffect, useState } from "react";

export default function Home() {
  const [eye, setEye] = useState("👀");
  const [mouth, setMouth] = useState("😁");
  const [bgColor, setBgColor] = useState("#222222");
  const [size, setSize] = useState(100);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("emojiData"));
    if (saved) {
      setEye(saved.eye);
      setMouth(saved.mouth);
      setBgColor(saved.bgColor);
      setSize(saved.size);
    }
  }, []);

  useEffect(() => {
    const data = { eye, mouth, bgColor, size };
    localStorage.setItem("emojiData", JSON.stringify(data));
  }, [eye, mouth, bgColor, size]);

  const combinedEmoji = `${eye}${mouth}`;

  const copyEmoji = async () => {
    try {
      await navigator.clipboard.writeText(combinedEmoji);
      alert("Emoji kopyalandı!");
    } catch {
      alert("Kopyalama başarısız!");
    }
  };

  return (
    <div className="container">
      <div
        className="emoji-box"
        style={{
          background: bgColor,
          fontSize: `${size}px`
        }}
      >
        {combinedEmoji}
      </div>

      <div>
        <label>Göz:</label>
        <select value={eye} onChange={(e) => setEye(e.target.value)}>
          <option>👀</option>
          <option>😎</option>
          <option>🥸</option>
          <option>🤓</option>
          <option>🫣</option>
        </select>
      </div>

      <div>
        <label>Ağız:</label>
        <select value={mouth} onChange={(e) => setMouth(e.target.value)}>
          <option>😁</option>
          <option>😡</option>
          <option>😐</option>
          <option>🥶</option>
          <option>🤩</option>
        </select>
      </div>

      <div>
        <label>Arka Plan Rengi:</label>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
      </div>

      <div>
        <label>Emoji Boyutu: {size}px</label>
        <input
          type="range"
          min="50"
          max="300"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
      </div>

      <button onClick={copyEmoji}>Kopyala</button>
    </div>
  );
}