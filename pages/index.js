import React, { useEffect, useRef, useState } from "react";

const eyesOptions = [
  { label: "Yuvarlak Göz", type: "circle" },
  { label: "Kare Göz", type: "square" },
  { label: "Yarım Ay Göz", type: "semiCircle" },
  { label: "Üzgün Göz", type: "sad" },
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
  const [bgColor, setBgColor] = useState("#FFD93B"); // sarı emoji renk
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

  // Canvas çizim fonksiyonları
  function drawEyes(ctx, canvasSize, type) {
    const eyeY = canvasSize / 3;
    const eyeOffsetX = canvasSize / 6;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;

    // Sol göz
    ctx.beginPath();
    if (type === "circle") {
      ctx.ellipse(
        canvasSize / 2 - eyeOffsetX,
        eyeY,
        30,
        40,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.stroke();

      // Pupil
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.ellipse(canvasSize / 2 - eyeOffsetX, eyeY, 12, 18, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === "square") {
      ctx.fillRect(canvasSize / 2 - eyeOffsetX - 25, eyeY - 25, 50, 50);
      ctx.fillStyle = "black";
      ctx.fillRect(canvasSize / 2 - eyeOffsetX - 12, eyeY - 12, 25, 25);
    } else if (type === "semiCircle") {
      ctx.beginPath();
      ctx.arc(canvasSize / 2 - eyeOffsetX, eyeY + 10, 30, Math.PI, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.arc(canvasSize / 2 - eyeOffsetX, eyeY + 10, 12, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === "sad") {
      ctx.beginPath();
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
    }
    // Sağ göz aynısı
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;

    ctx.beginPath();
    if (type === "circle") {
      ctx.ellipse(
        canvasSize / 2 + eyeOffsetX,
        eyeY,
        30,
        40,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.stroke();

      // Pupil
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.ellipse(canvasSize / 2 + eyeOffsetX, eyeY, 12, 18, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === "square") {
      ctx.fillRect(canvasSize / 2 + eyeOffsetX - 25, eyeY - 25, 50, 50);
      ctx.fillStyle = "black";
      ctx.fillRect(canvasSize / 2 + eyeOffsetX - 12, eyeY - 12, 25, 25);
    } else if (type === "semiCircle") {
      ctx.beginPath();
      ctx.arc(canvasSize / 2 + eyeOffsetX, eyeY + 10, 30, Math.PI, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.arc(canvasSize / 2 + eyeOffsetX, eyeY + 10, 12, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === "sad") {
      ctx.beginPath();
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
    }
  }

  function drawMouth(ctx, canvasSize, type) {
    const mouthY = (canvasSize / 3) * 2;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";

    ctx.beginPath();
    if (type === "smile") {
      ctx.arc(canvasSize / 2, mouthY, 60, 0, Math.PI, false); // gülümseme
    } else if (type === "frown") {
      ctx.arc(canvasSize / 2, mouthY + 50, 60, Math.PI, 0, false); // somurtma
    } else if (type === "straight") {
      ctx.moveTo(canvasSize / 2 - 60, mouthY);
      ctx.lineTo(canvasSize / 2 + 60, mouthY); // düz çizgi
    } else if (type === "open") {
      ctx.ellipse(canvasSize / 2, mouthY, 50, 70, 0, 0, Math.PI * 2); // açık ağız
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.stroke();
      return;
    }
    ctx.stroke();
  }

  // Çizim
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

    // Göz çiz
    drawEyes(ctx, size, eyeType);

    // Ağız çiz
    drawMouth(ctx, size, mouthType);
  }, [eyeType, mouthType, bgColor, size]);

  // Kopyala - canvas PNG olarak
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 20,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: 10 }}>Kendi Emojini Çiz</h1>

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
          Göz Seç:
          <select
            value={eyeType}
            onChange={(e) => setEyeType(e.target.value)}
            style={{ marginLeft: 10, padding: 5, fontSize: 16 }}
          >
            {eyesOptions.map(({ label, type }) => (
              <option key={type} value={type}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          Ağız Seç:
          <select
            value={mouthType}
            onChange={(e) => setMouthType(e.target.value)}
            style={{ marginLeft: 10, padding: 5, fontSize: 16 }}
          >
            {mouthsOptions.map(({ label, type }) => (
              <option key={type} value={type}>
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