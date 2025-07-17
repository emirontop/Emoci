import React, { useEffect, useRef, useState } from "react";

const eyesOptions = [
  { label: "Yuvarlak", type: "circle" },
  { label: "Kare", type: "square" },
  { label: "Yarım Ay", type: "semiCircle" },
  { label: "Üzgün", type: "sad" },
];

const mouthsOptions = [
  { label: "Gülümseme", type: "smile" },
  { label: "Somurtma", type: "frown" },
  { label: "Düz Çizgi", type: "straight" },
  { label: "Açık Ağız", type: "open" },
];

export default function EmojiMaker() {
  const canvasRef = useRef(null);
  const [eyeType, setEyeType] = useState("circle");
  const [mouthType, setMouthType] = useState("smile");
  const [bgColor, setBgColor] = useState("#FFD93B");
  const [size, setSize] = useState(300);

  // LocalStorage yükle
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("emojiData"));
    if (saved) {
      if (saved.eyeType) setEyeType(saved.eyeType);
      if (saved.mouthType) setMouthType(saved.mouthType);
      if (saved.bgColor) setBgColor(saved.bgColor);
      if (saved.size) setSize(saved.size);
    }
  }, []);

  // LocalStorage kaydet
  useEffect(() => {
    localStorage.setItem(
      "emojiData",
      JSON.stringify({ eyeType, mouthType, bgColor, size })
    );
  }, [eyeType, mouthType, bgColor, size]);

  // Çizim fonksiyonları
  function drawEyes(ctx, canvasSize, type) {
    const eyeY = canvasSize / 3;
    const eyeOffsetX = canvasSize / 6;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;

    // Sol göz
    ctx.beginPath();
    switch (type) {
      case "circle":
        ctx.ellipse(canvasSize / 2 - eyeOffsetX, eyeY, 30, 40, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.ellipse(canvasSize / 2 - eyeOffsetX, eyeY, 12, 18, 0, 0, Math.PI * 2);
        ctx.fill();
        break;
      case "square":
        ctx.fillRect(canvasSize / 2 - eyeOffsetX - 25, eyeY - 25, 50, 50);
        ctx.fillStyle = "black";
        ctx.fillRect(canvasSize / 2 - eyeOffsetX - 12, eyeY - 12, 25, 25);
        break;
      case "semiCircle":
        ctx.arc(canvasSize / 2 - eyeOffsetX, eyeY + 10, 30, Math.PI, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(canvasSize / 2 - eyeOffsetX, eyeY + 10, 12, 0, Math.PI * 2);
        ctx.fill();
        break;
      case "sad":
        ctx.ellipse(
          canvasSize / 2 - eyeOffsetX,
          eyeY + 10,
          30,
          20,
          Math.PI / 4,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.ellipse(canvasSize / 2 - eyeOffsetX, eyeY + 10, 12, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        break;
      default:
        break;
    }

    // Sağ göz (aynı şekiller)
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.beginPath();

    switch (type) {
      case "circle":
        ctx.ellipse(canvasSize / 2 + eyeOffsetX, eyeY, 30, 40, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.ellipse(canvasSize / 2 + eyeOffsetX, eyeY, 12, 18, 0, 0, Math.PI * 2);
        ctx.fill();
        break;
      case "square":
        ctx.fillRect(canvasSize / 2 + eyeOffsetX - 25, eyeY - 25, 50, 50);
        ctx.fillStyle = "black";
        ctx.fillRect(canvasSize / 2 + eyeOffsetX - 12, eyeY - 12, 25, 25);
        break;
      case "semiCircle":
        ctx.arc(canvasSize / 2 + eyeOffsetX, eyeY + 10, 30, Math.PI, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(canvasSize / 2 + eyeOffsetX, eyeY + 10, 12, 0, Math.PI * 2);
        ctx.fill();
        break;
      case "sad":
        ctx.ellipse(
          canvasSize / 2 + eyeOffsetX,
          eyeY + 10,
          30,
          20,
          Math.PI / 4,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.ellipse(canvasSize / 2 + eyeOffsetX, eyeY + 10, 12, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        break;
      default:
        break;
    }
  }

  function drawMouth(ctx, canvasSize, type) {
    const mouthY = (canvasSize / 3) * 2;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";

    ctx.beginPath();
    switch (type) {
      case "smile":
        ctx.arc(canvasSize / 2, mouthY, 60, 0, Math.PI, false);
        break;
      case "frown":
        ctx.arc(canvasSize / 2, mouthY + 50, 60, Math.PI, 0, false);
        break;
      case "straight":
        ctx.moveTo(canvasSize / 2 - 60, mouthY);
        ctx.lineTo(canvasSize / 2 + 60, mouthY);
        break;
      case "open":
        ctx.ellipse(canvasSize / 2, mouthY, 50, 70, 0, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.stroke();
        return;
      default:
        break;
    }
    ctx.stroke();
  }

  // Canvas çizimi
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = size;
    canvas.height = size;

    // Arka plan
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();

    // Gözler
    drawEyes(ctx, size, eyeType);

    // Ağız
    drawMouth(ctx, size, mouthType);
  }, [eyeType, mouthType, bgColor, size]);

  // Kopyala fonksiyonu
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
      } catch {
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
        padding: 20,
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ marginBottom: 20 }}>Emoji Tasarla</h1>

      <canvas
        ref={canvasRef}
        style={{
          borderRadius: "50%",
          boxShadow: "0 0 20px rgba(255,165,0,0.7)",
          marginBottom: 20,
          maxWidth: "90vw",
          height: "auto",
        }}
        width={size}
        height={size}
      />

      {/* Seçenekler satırı */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 20,
          maxWidth: 600,
          width: "100%",
          marginBottom: 20,
        }}
      >
        {/* Göz */}
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          Göz:
          <select
            value={eyeType}
            onChange={(e) => setEyeType(e.target.value)}
            style={{ padding: 6, fontSize: 16 }}
          >
            {eyesOptions.map(({ label, type }) => (
              <option key={type} value={type}>
                {label}
              </option>
            ))}
          </select>
        </label>

        {/* Ağız */}
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          Ağız:
          <select
            value={mouthType}
            onChange={(e) => setMouthType(e.target.value)}
            style={{ padding: 6, fontSize: 16 }}
          >
            {mouthsOptions.map(({ label, type }) => (
              <option key={type} value={type}>
                {label}
              </option>
            ))}
          </select>
        </label>

        {/* Arka Plan */}
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          Arka Plan:
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            style={{ width: 50, height: 30, border: "none", cursor: "pointer" }}
          />
        </label>

        {/* Boyut */}
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          Boyut: {size}px
          <input
            type="range"
            min="150"
            max="500"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            style={{ cursor: "pointer" }}
          />
        </label>
      </div>

      <button
        onClick={copyCanvasImage}
        style={{
          padding: "14px 40px",
          fontSize: 20,
          fontWeight: "bold",
          backgroundColor: "#ff9900",
          border: "none",
          borderRadius: 10,
          cursor: "pointer",
          color: "#111",
          boxShadow: "0 0 20px #ff9900",
          transition: "background-color 0.3s ease",
          userSelect: "none",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#cc7a00")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff9900")}
      >
        Kopyala (PNG)
      </button>
    </div>
  );
}