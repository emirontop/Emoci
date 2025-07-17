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
  { label: "Kalp", type: "heart" },
  { label: "Kedi Gözü", type: "cat" },
  { label: "Şaşkın", type: "surprised" },
  { label: "Gülen", type: "laughing" },
  { label: "Robot", type: "robot" },
];

const mouthsOptions = [
  { label: "Gülümseme", type: "smile" },
  { label: "Somurtma", type: "frown" },
  { label: "Düz Çizgi", type: "straight" },
  { label: "Açık Ağız", type: "open" },
  { label: "Küçük Gülümseme", type: "smallSmile" },
  { label: "Dişler", type: "teeth" },
  { label: "Dudak Bükme", type: "pout" },
  { label: "Oh!", type: "oh" },
  { label: "Kalp", type: "heartMouth" },
  { label: "Tongue Out", type: "tongue" },
];

const faceShapes = [
  { label: "Yuvarlak", type: "circle" },
  { label: "Kare", type: "square" },
  { label: "Oval", type: "oval" },
  { label: "Yumurta", type: "egg" },
  { label: "Yuvarlatılmış Kare", type: "roundedSquare" },
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

// Kalp çizme fonksiyonu
function drawHeart(ctx, cx, cy, width, height) {
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.bezierCurveTo(
    cx,
    cy - height / 2,
    cx - width / 2,
    cy - height,
    cx - width,
    cy - height / 3
  );
  ctx.bezierCurveTo(
    cx - width * 1.5,
    cy + height / 4,
    cx,
    cy + height,
    cx,
    cy + height
  );
  ctx.bezierCurveTo(
    cx,
    cy + height,
    cx + width * 1.5,
    cy + height / 4,
    cx + width,
    cy - height / 3
  );
  ctx.bezierCurveTo(
    cx + width / 2,
    cy - height,
    cx,
    cy - height / 2,
    cx,
    cy
  );
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

    case "heart":
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      drawHeart(ctx, cx, cy, 60, 60);
      ctx.fillStyle = "black";
      drawHeart(ctx, cx, cy, 30, 30);
      break;

    case "cat":
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 25, 35, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, cy, 15, 25, 0, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();

      // Kedi gözü çizgileri
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - 25, cy - 15);
      ctx.lineTo(cx - 35, cy - 25);
      ctx.moveTo(cx + 25, cy - 15);
      ctx.lineTo(cx + 35, cy - 25);
      ctx.stroke();
      break;

    case "surprised":
      ctx.beginPath();
      ctx.ellipse(cx, cy, 35, 45, 0, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, cy, 15, 20, 0, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();
      break;

    case "laughing":
      ctx.beginPath();
      ctx.ellipse(cx, cy, 30, 20, 0, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, cy, 15, 10, 0, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();
      break;

    case "robot":
      ctx.fillStyle = "white";
      ctx.fillRect(cx - 25, cy - 25, 50, 50);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.strokeRect(cx - 25, cy - 25, 50, 50);

      ctx.fillStyle = "black";
      for (let i = -15; i <= 15; i += 10) {
        ctx.fillRect(cx + i - 5, cy - 5, 10, 10);
      }
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
    case "smallSmile":
      ctx.arc(canvasSize / 2, mouthY, 40, 0, Math.PI, false);
      break;
    case "teeth":
      ctx.ellipse(canvasSize / 2, mouthY, 50, 30, 0, 0, Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.stroke();
      
      // Dişler
      ctx.fillStyle = "white";
      const teethWidth = 10;
      for (let i = -50; i < 50; i += teethWidth * 2) {
        ctx.beginPath();
        ctx.moveTo(canvasSize / 2 + i, mouthY);
        ctx.lineTo(canvasSize / 2 + i + teethWidth, mouthY - 15);
        ctx.lineTo(canvasSize / 2 + i + teethWidth * 2, mouthY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      return;
    case "pout":
      ctx.arc(canvasSize / 2, mouthY + 20, 40, Math.PI * 0.8, Math.PI * 0.2, false);
      break;
    case "oh":
      ctx.ellipse(canvasSize / 2, mouthY, 30, 40, 0, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.stroke();
      return;
    case "heartMouth":
      ctx.fillStyle = "black";
      drawHeart(ctx, canvasSize / 2, mouthY, 80, 60);
      return;
    case "tongue":
      ctx.ellipse(canvasSize / 2, mouthY, 50, 30, 0, 0, Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.stroke();
      
      // Dil
      ctx.fillStyle = "pink";
      ctx.beginPath();
      ctx.ellipse(canvasSize / 2, mouthY + 20, 30, 20, 0, 0, Math.PI);
      ctx.fill();
      ctx.stroke();
      return;
    default:
      break;
  }
  ctx.stroke();
}

function drawFaceShape(ctx, canvasSize, type) {
  ctx.fillStyle = "black";
  ctx.lineWidth = 5;
  
  switch (type) {
    case "square":
      ctx.beginPath();
      ctx.rect(5, 5, canvasSize - 10, canvasSize - 10);
      ctx.fill();
      break;
    case "oval":
      ctx.beginPath();
      ctx.ellipse(canvasSize / 2, canvasSize / 2, canvasSize / 2.5, canvasSize / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "egg":
      ctx.beginPath();
      ctx.ellipse(canvasSize / 2, canvasSize / 2 + canvasSize / 10, canvasSize / 2.2, canvasSize / 2.5, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "roundedSquare":
      ctx.beginPath();
      const radius = 30;
      ctx.moveTo(radius, 5);
      ctx.lineTo(canvasSize - radius, 5);
      ctx.quadraticCurveTo(canvasSize - 5, 5, canvasSize - 5, radius);
      ctx.lineTo(canvasSize - 5, canvasSize - radius);
      ctx.quadraticCurveTo(canvasSize - 5, canvasSize - 5, canvasSize - radius, canvasSize - 5);
      ctx.lineTo(radius, canvasSize - 5);
      ctx.quadraticCurveTo(5, canvasSize - 5, 5, canvasSize - radius);
      ctx.lineTo(5, radius);
      ctx.quadraticCurveTo(5, 5, radius, 5);
      ctx.closePath();
      ctx.fill();
      break;
    default: // circle
      ctx.beginPath();
      ctx.arc(canvasSize / 2, canvasSize / 2, canvasSize / 2 - 5, 0, Math.PI * 2);
      ctx.fill();
      break;
  }
}

export default function EmojiMaker() {
  const canvasRef = useRef(null);
  const [eyeType, setEyeType] = useState("circle");
  const [mouthType, setMouthType] = useState("smile");
  const [faceShape, setFaceShape] = useState("circle");
  const [bgColor, setBgColor] = useState("#FFD93B");
  const [size, setSize] = useState(300);
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("emojiData"));
    if (saved) {
      if (saved.eyeType) setEyeType(saved.eyeType);
      if (saved.mouthType) setMouthType(saved.mouthType);
      if (saved.faceShape) setFaceShape(saved.faceShape);
      if (saved.bgColor) setBgColor(saved.bgColor);
      if (saved.size) setSize(saved.size);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "emojiData",
      JSON.stringify({ eyeType, mouthType, faceShape, bgColor, size })
    );
  }, [eyeType, mouthType, faceShape, bgColor, size]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    // Arka plan maskesi
    drawFaceShape(ctx, size, faceShape);
    ctx.globalCompositeOperation = "source-in";
    
    // Arka plan rengi
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);
    
    // Reset composite operation
    ctx.globalCompositeOperation = "source-over";

    drawEyes(ctx, size, eyeType);
    drawMouth(ctx, size, mouthType);
  }, [eyeType, mouthType, faceShape, bgColor, size]);

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

  function downloadCanvasImage() {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'emoji.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "20px auto",
        padding: 25,
        backgroundColor: "#f8f9fa",
        borderRadius: 15,
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ 
        textAlign: "center", 
        marginBottom: 25,
        color: "#333",
        fontSize: "2.2rem",
        fontWeight: "600",
        textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
      }}>
        🎨 Emoji Maker
      </h1>

      <div style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: 25,
        gap: 20
      }}>
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            borderRadius: "50%",
            boxShadow: "0 0 15px rgba(0,0,0,0.15)",
            backgroundColor: "#fff",
            border: "5px solid #fff",
            transition: "all 0.3s ease"
          }}
          width={size}
          height={size}
        />
      </div>

      <div style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}>
        <div style={{ marginBottom: 15 }}>
          <label htmlFor="eyeSelect" style={{ 
            fontWeight: "600",
            display: "block",
            marginBottom: 8,
            color: "#555"
          }}>
            👁️ Göz Tipi:
          </label>
          <select
            id="eyeSelect"
            value={eyeType}
            onChange={(e) => setEyeType(e.target.value)}
            style={{ 
              width: "100%", 
              padding: "10px 12px", 
              borderRadius: 8,
              border: "1px solid #ddd",
              backgroundColor: "#f8f9fa",
              fontSize: "0.95rem",
              cursor: "pointer"
            }}
          >
            {eyesOptions.map((eye) => (
              <option key={eye.type} value={eye.type}>
                {eye.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 15 }}>
          <label htmlFor="mouthSelect" style={{ 
            fontWeight: "600",
            display: "block",
            marginBottom: 8,
            color: "#555"
          }}>
            👄 Ağız Tipi:
          </label>
          <select
            id="mouthSelect"
            value={mouthType}
            onChange={(e) => setMouthType(e.target.value)}
            style={{ 
              width: "100%", 
              padding: "10px 12px", 
              borderRadius: 8,
              border: "1px solid #ddd",
              backgroundColor: "#f8f9fa",
              fontSize: "0.95rem",
              cursor: "pointer"
            }}
          >
            {mouthsOptions.map((mouth) => (
              <option key={mouth.type} value={mouth.type}>
                {mouth.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 15 }}>
          <label htmlFor="faceShape" style={{ 
            fontWeight: "600",
            display: "block",
            marginBottom: 8,
            color: "#555"
          }}>
            🖼️ Yüz Şekli:
          </label>
          <select
            id="faceShape"
            value={faceShape}
            onChange={(e) => setFaceShape(e.target.value)}
            style={{ 
              width: "100%", 
              padding: "10px 12px", 
              borderRadius: 8,
              border: "1px solid #ddd",
              backgroundColor: "#f8f9fa",
              fontSize: "0.95rem",
              cursor: "pointer"
            }}
          >
            {faceShapes.map((shape) => (
              <option key={shape.type} value={shape.type}>
                {shape.label}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 15 }}>
          <label htmlFor="bgColor" style={{ 
            fontWeight: "600",
            display: "block",
            marginBottom: 8,
            color: "#555"
          }}>
            🎨 Arka Plan Rengi:
          </label>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10
          }}>
            <input
              type="color"
              id="bgColor"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              style={{ 
                width: 50, 
                height: 50, 
                border: "2px solid #ddd",
                borderRadius: 8,
                cursor: "pointer"
              }}
            />
            <span style={{
              backgroundColor: "#f8f9fa",
              padding: "8px 12px",
              borderRadius: 8,
              fontFamily: "monospace"
            }}>
              {bgColor.toUpperCase()}
            </span>
          </div>
        </div>

        <div style={{ marginBottom: 15 }}>
          <label htmlFor="sizeRange" style={{ 
            fontWeight: "600",
            display: "block",
            marginBottom: 8,
            color: "#555"
          }}>
            📏 Boyut: {size}px
          </label>
          <input
            type="range"
            id="sizeRange"
            min={150}
            max={600}
            step={10}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            style={{ 
              width: "100%", 
              height: 8,
              borderRadius: 4,
              background: "#e9ecef",
              outline: "none",
              cursor: "pointer",
              WebkitAppearance: "none"
            }}
          />
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.8rem",
            color: "#777",
            marginTop: 5
          }}>
            <span>150px</span>
            <span>600px</span>
          </div>
        </div>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#e9ecef",
            color: "#333",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "0.9rem",
            marginBottom: showAdvanced ? 15 : 0,
            transition: "all 0.3s"
          }}
        >
          {showAdvanced ? "▲ Gelişmiş Ayarları Gizle" : "▼ Gelişmiş Ayarları Göster"}
        </button>

        {showAdvanced && (
          <div style={{
            backgroundColor: "#f8f9fa",
            padding: 15,
            borderRadius: 8,
            marginBottom: 15,
            border: "1px solid #eee"
          }}>
            <h3 style={{
              marginTop: 0,
              marginBottom: 10,
              color: "#555",
              fontSize: "1rem"
            }}>
              Gelişmiş Ayarlar
            </h3>
            <p style={{
              margin: 0,
              color: "#777",
              fontSize: "0.85rem"
            }}>
              Daha fazla özelleştirme seçeneği yakında eklenecek!
            </p>
          </div>
        )}
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 15
      }}>
        <button
          onClick={copyCanvasImage}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#4a6bff",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "1rem",
            boxShadow: "0 4px 8px rgba(74,107,255,0.3)",
            transition: "background-color 0.3s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#3a5bef")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4a6bff")}
          title="Emoji resmini kopyala"
        >
          <span>📋</span> Kopyala
        </button>

        <button
          onClick={downloadCanvasImage}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "1rem",
            boxShadow: "0 4px 8px rgba(40,167,69,0.3)",
            transition: "background-color 0.3s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
          title="Emoji resmini indir"
        >
          <span>💾</span> İndir
        </button>
      </div>

      <div style={{
        marginTop: 20,
        textAlign: "center",
        fontSize: "0.8rem",
        color: "#999"
      }}>
        Emoji Maker v1.2 • Özelleştirilebilir emoji oluşturucu
      </div>
    </div>
  );
}