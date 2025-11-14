import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

/**
 * Minimal POC editor using fabric.js
 * Usage: include this component in a Create React App / Vite project.
 * npm i fabric
 */

export default function Editor() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [fillColor, setFillColor] = useState("#000000");

  useEffect(() => {
    const c = new fabric.Canvas("editor-canvas", {
      width: 1000,
      height: 700,
      backgroundColor: "#ffffff",
    });
    setCanvas(c);

    // sample template background
    const bg = new fabric.Rect({
      left: 20,
      top: 20,
      width: 960,
      height: 660,
      fill: "#ffffff",
      stroke: "#ddd",
      selectable: false,
    });
    c.add(bg);

    // add starter text
    const text = new fabric.Textbox("Klik om tekst te bewerken", {
      left: 120,
      top: 120,
      fontSize: 36,
      fill: fillColor,
      editable: true,
    });
    c.add(text);

    return () => c.dispose();
  }, []); // eslint-disable-line

  const addText = () => {
    if (!canvas) return;
    const t = new fabric.Textbox("Nieuwe tekst", {
      left: 100,
      top: 100,
      fontSize: 30,
      fill: fillColor,
    });
    canvas.add(t).setActiveObject(t);
  };

  const addImageFromFile = (ev) => {
    const file = ev.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (f) {
      fabric.Image.fromURL(f.target.result, function (img) {
        img.set({
          left: 150,
          top: 150,
          scaleX: 0.6,
          scaleY: 0.6,
        });
        canvas.add(img).setActiveObject(img);
      });
    };
    reader.readAsDataURL(file);
  };

  const downloadPNG = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({ format: "png", multiplier: 2 });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "design.png";
    link.click();
  };

  const exportForServer = async () => {
    if (!canvas) return;
    const svg = canvas.toSVG();
    const res = await fetch("/api/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ svg }),
    });
    if (!res.ok) {
      alert("Export failed");
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "design_highres.png";
    a.click();
  };

  return (
    <div style={{ padding: 12 }}>
      <div style={{ marginBottom: 10 }}>
        <button onClick={addText}>Voeg tekst toe</button>
        <input
          type="color"
          value={fillColor}
          onChange={(e) => setFillColor(e.target.value)}
          title="Tekstkleur"
          style={{ marginLeft: 8 }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={addImageFromFile}
          style={{ marginLeft: 8 }}
        />
        <button onClick={downloadPNG} style={{ marginLeft: 8 }}>
          Download snel PNG
        </button>
        <button onClick={exportForServer} style={{ marginLeft: 8 }}>
          Export hoge-res via server
        </button>
      </div>
      <canvas id="editor-canvas" ref={canvasRef} />
    </div>
  );
}