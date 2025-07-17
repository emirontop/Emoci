import React, { useEffect, useRef, useState } from "react";

const eyesOptions = [
  { label: "Göz 1 👀", shape: "👀" },
  { label: "Göz 2 😎", shape: "😎" },
  { label: "Göz 3 🫣", shape: "🫣" },
  { label: "Göz 4 🤓", shape: "🤓" },
  { label: "Göz 5 🥸", shape: "🥸" },
];

const mouthsOptions = [
  { label: "Ağız 1 😁", shape: "😁" },
  { label: "Ağız 2 😡", shape: "😡" },
  { label: "Ağız 3 😐", shape: "😐" },
  { label: "Ağız 4 🥶", shape: "🥶" },
  { label: "Ağız 5 🤩", shape: "🤩" },
];

export default function EmojiMaker() {
  const canvasRef = useRef(null);
  const [eye, setEye] = useState(eyesOptions[0].shape);
  const [mouth, setMouth] = useState(mouthsOptions[0].shape);
  const [bgColor, setBgColor] = useState("#222222");
  const [size, setSize] = useState(300);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("emojiData"));
    if (saved) {
      if (saved.eye) setEye(saved.eye);
      if (saved.mouth) setMouth(saved.mouth);
      if (saved.bgColor) setBgColor(saved.bgColor);
      if (saved.size) setSize(saved.size);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(
      "emojiData",
      JSON.stringify({ eye, mouth, bgColor, size })
    );
  }, [eye, mouth, bgColor, size]);

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const canvasSize = size;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background circle
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.arc(canvasSize / 2, canvasSize / 2, canvasSize / 2, 0, Math.PI * 2);
    ctx.fill();

    // Setup emoji font size relative
    const emojiFontSize = canvasSize / 2;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${emojiFontSize}px serif`;

    // Draw eyes (upper part)
    ctx.fillText(eye, canvasSize / 2, canvasSize / 3);

    // Draw mouth (lower part)
    ctx.fillText(mouth, canvasSize / 2, (canvasSize / 3) * 2);
  }, [eye, mouth, bgColor, size]);

  // Copy canvas as PNG to clipboard
  async function copyCanvasImage() {
    const canvas = canvasRef.current;
    canvas.toBlob(async (blob) => {
      try {
        await navigator.clipboard.write([
          new window.ClipboardItem({
            [blob.type]: blob,
          }),
        ]);
        alert("Emoji resmi kopyalandı! İstersen yapıştır.");
      } catch (e) {
        alert("Kopyalama başarısız, tarayıcı desteklemiyor olabilir.");
      }
    });
  }

  return (
    <div
      style={{
        backgroundColor: "#121212",
        color: "#eee",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 20,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: 10 }}>Kendi Emojini Yap</h1>

      <canvas
        ref={canvasRef}
        style={{
          borderRadius: "50%",
          boxShadow: "0 0 20px rgba(255,165,0,0.7)",
          marginBottom: 20,
        }}
        width={size}
        height={size}
      ></canvas>

      <div style={{ marginBottom: 10 }}>
        <label>
          Göz:
          <select
            value={eye}
            onChange={(e) => setEye(e.target.value)}
            style={{ marginLeft: 10, padding: 5, fontSize: 16 }}
          >
            {eyesOptions.map(({ label, shape }) => (
              <option key={shape} value={shape}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          Ağız:
          <select
            value={mouth}
            onChange={(e) => setMouth(e.target.value)}
            style={{ marginLeft: 10, padding: 5, fontSize: 16 }}
          >
            {mouthsOptions.map(({ label, shape }) => (
              <option key={shape} value={shape}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          Arka Plan Rengi:
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            style={{ marginLeft: 10, padding: 5, width: 60, height: 30 }}
          />
        </label>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>
          Boyut: {size}px
          <input
            type="range"
            min="150"
            max="500"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            style={{ marginLeft: 10 }}
          />
        </label>
      </div>

      <button
        onClick={copyCanvasImage}
        style={{
          padding: "12px 30px",
          fontSize: 18,
          fontWeight: "bold",
          backgroundColor: "#ff9900",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          color: "#111",
          boxShadow: "0 0 15px #ff9900",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#cc7a00")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff9900")}
      >
        Kopyala (PNG)
      </button>
    </div>
  );
}