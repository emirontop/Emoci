import React, { useEffect, useRef, useState } from "react";


const eyesOptions = [
  { label: "Yuvarlak", type: "circle" },
  { label: "Kare", type: "square" },
  { label: "Yarım Ay", type: "semiCircle" },
  { label: "Üzgün", type: "sad" },
  { label: "Kapalı", type: "closed" },
  { label: "Yıldız", type: "star" },
  { label: "Nokta", type: "dot" },
  { label: "Büyük Yuvarlak", type: "bigCircle" },
  { label: "Üçgen", type: "triangle" },
  { label: "Elmas", type: "diamond" },
  { label: "Çizgi", type: "line" },
  { label: "Daire + Çizgi", type: "circleLine" },
  { label: "İki Nokta", type: "twoDots" },
  { label: "Göz Kırpma", type: "blink" },
  { label: "Dalgalı", type: "wave" },
];

const mouthsOptions = [
  { label: "Gülümseme", type: "smile" },
  { label: "Somurtma", type: "frown" },
  { label: "Düz Çizgi", type: "straight" },
  { label: "Açık Ağız", type: "open" },
];

// Yıldız çizme fonksiyonu
function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

// Göz şekillerini çizen fonksiyon
function drawEyeShape(ctx, cx, cy, type) {
  switch (type) {
    case "circle":
      ctx.beginPath();
      ctx.ellipse(cx, cy, 30, 40, 0, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, cy, 12, 18, 0, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();
      break;

    case "square":
      ctx.fillStyle = "white";
      ctx.fillRect(cx - 25, cy - 25, 50, 50);
      ctx.fillStyle = "black";
      ctx.fillRect(cx - 12, cy - 12, 25, 25);
      break;

    case "semiCircle":
      ctx.beginPath();
      ctx.arc(cx, cy + 10, 30, Math.PI, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy + 10, 12, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();
      break;

    case "sad":
      ctx.beginPath();
      ctx.ellipse(cx, cy + 10, 30, 20, Math.PI / 4, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, cy + 10, 12, 10, 0, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();
      break;

    case "closed":
      ctx.strokeStyle = "black";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(cx - 25, cy);
      ctx.lineTo(cx + 25, cy);
      ctx.stroke();
      break;

    case "star":
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      drawStar(ctx, cx, cy, 5, 30, 15);
      break;

    case "dot":
      ctx.beginPath();
      ctx.arc(cx, cy, 15, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();
      break;

    case "bigCircle":
      ctx.beginPath();
      ctx.ellipse(cx, cy, 40, 50, 0, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, cy, 18, 25, 0, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();
      break;

    case "triangle":
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, cy - 30);
      ctx.lineTo(cx - 25, cy + 30);
      ctx.lineTo(cx + 25, cy + 30);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.moveTo(cx, cy - 15);
      ctx.lineTo(cx - 12, cy + 15);
      ctx.lineTo(cx + 12, cy + 15);
      ctx.closePath();
      ctx.fill();
      break;

    case "diamond":
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, cy - 30);
      ctx.lineTo(cx - 20, cy);
      ctx.lineTo(cx, cy + 30);
      ctx.lineTo(cx + 20, cy);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.moveTo(cx, cy - 15);
      ctx.lineTo(cx - 10, cy);
      ctx.lineTo(cx, cy + 15);
      ctx.lineTo(cx + 10, cy);
      ctx.closePath();
      ctx.fill();
      break;

    case "line":
      ctx.strokeStyle = "black";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(cx - 25, cy);
      ctx.lineTo(cx + 25, cy);
      ctx.stroke();
      break;

    case "circleLine":
      ctx.beginPath();
      ctx.ellipse(cx, cy, 30, 40, 0, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.strokeStyle = "black";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx - 20, cy);
      ctx.lineTo(cx + 20, cy);
      ctx.stroke();
      break;

    case "twoDots":
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(cx - 10, cy, 6, 0, Math.PI * 2);
      ctx.arc(cx + 10, cy, 6, 0, Math.PI * 2);
      ctx.fill();
      break;

    case "blink":
      ctx.strokeStyle = "black";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(cx - 25, cy);
      ctx.quadraticCurveTo(cx, cy + 10, cx + 25, cy);
      ctx.stroke();
      break;

    case "wave":
      ctx.strokeStyle = "black";
      ctx.lineWidth = 4;
      ctx.beginPath();
      const waveSize = 15;
      ctx.moveTo(cx - 30, cy);
      for (let i = -30; i < 30; i += 10) {
        ctx.quadraticCurveTo(cx + i + 5, cy - waveSize, cx + i + 10, cy);
      }
      ctx.stroke();
      break;

    default:
      ctx.beginPath();
      ctx.ellipse(cx, cy, 30, 40, 0, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, cy, 12, 18, 0, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();
      break;
  }
}

function drawEyes(ctx, canvasSize, type) {
  const eyeY = canvasSize / 3;
  const eyeOffsetX = canvasSize / 6;

  drawEyeShape(ctx, canvasSize / 2 - eyeOffsetX, eyeY, type);
  drawEyeShape(ctx, canvasSize / 2 + eyeOffsetX, eyeY, type);
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

export default function EmojiMaker() {
  const canvasRef = useRef(null);
  const [eyeType, setEyeType] = useState("circle");
  const [mouthType, setMouthType] = useState("smile");
  const [bgColor, setBgColor] = useState("#FFD93B");
  const [size, setSize] = useState(300);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("emojiData"));
    if (saved) {
      if (saved.eyeType) setEyeType(saved.eyeType);
      if (saved.mouthType) setMouthType(saved.mouthType);
      if (saved.bgColor) setBgColor(saved.bgColor);
      if (saved.size) setSize(saved.size);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "emojiData",
      JSON.stringify({ eyeType, mouthType, bgColor, size })
    );
  }, [eyeType, mouthType, bgColor, size]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    // Arka plan
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();

    drawEyes(ctx, size, eyeType);
    drawMouth(ctx, size, mouthType);
  }, [eyeType, mouthType, bgColor, size]);

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
        maxWidth: 420,
        margin: "20px auto",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 12,
        boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>Emoji Maker</h1>

      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          margin: "0 auto 20px auto",
          borderRadius: "50%",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          backgroundColor: "#fff",
        }}
        width={size}
        height={size}
      />

      <div style={{ marginBottom: 15 }}>
        <label htmlFor="eyeSelect" style={{ fontWeight: "bold" }}>
          Göz Tipi:
        </label>
        <select
          id="eyeSelect"
          value={eyeType}
          onChange={(e) => setEyeType(e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: 5, borderRadius: 6 }}
        >
          {eyesOptions.map((eye) => (
            <option key={eye.type} value={eye.type}>
              {eye.label}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 15 }}>
        <label htmlFor="mouthSelect" style={{ fontWeight: "bold" }}>
          Ağız Tipi:
        </label>
        <select
          id="mouthSelect"
          value={mouthType}
          onChange={(e) => setMouthType(e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: 5, borderRadius: 6 }}
        >
          {mouthsOptions.map((mouth) => (
            <option key={mouth.type} value={mouth.type}>
              {mouth.label}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 15 }}>
        <label htmlFor="bgColor" style={{ fontWeight: "bold" }}>
          Arka Plan Rengi:
        </label>
        <input
          type="color"
          id="bgColor"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          style={{ width: "100%", height: 40, border: "none", marginTop: 5, cursor: "pointer" }}
        />
      </div>

      <div style={{ marginBottom: 25 }}>
        <label htmlFor="sizeRange" style={{ fontWeight: "bold" }}>
          Boyut: {size}px
        </label>
        <input
          type="range"
          id="sizeRange"
          min={150}
          max={600}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          style={{ width: "100%", marginTop: 5 }}
        />
      </div>

      <button
        onClick={copyCanvasImage}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#FF6F61",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: 16,
          boxShadow: "0 4px 8px rgba(255,111,97,0.4)",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#FF3B2E")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#FF6F61")}
        title="Emoji resmini kopyala"
      >
        Emoji Resmini Kopyala
      </button>
    </div>
  );
}
