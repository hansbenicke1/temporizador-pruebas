"use client";
import { useEffect, useMemo, useState } from "react";

// Soporta "YYYY-MM-DD HH:mm:ss" y "YYYY-MM-DDTHH:mm:ss"
const parseDate = (s) => new Date(s.replace(" ", "T"));
const pad2 = (n) => String(n).padStart(2, "0");

const formatLeft = (ms) => {
  if (ms <= 0) return "0 días, 0:0:0";
  const s = Math.floor(ms / 1000);
  const days = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${days} días, ${pad2(h)}:${pad2(m)}:${pad2(sec)}`;
};

export default function TestCard({ subjectId, subjectName, testDate }) {
  const target = useMemo(() => parseDate(testDate), [testDate]);
  const [left, setLeft] = useState(() => target - new Date());

  useEffect(() => {
    const tick = () => setLeft(target - new Date());
    tick(); // inicial
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const lessThan7Days = left > 0 && left < 7 * 24 * 60 * 60 * 1000;

  return (
    <article
      style={{
        border: "1px solid #333",
        borderRadius: 12,
        padding: "1rem",
        margin: "1rem 0",
        background: "#111",
        color: "#fff",
      }}
    >
      <h3 style={{ margin: 0, fontWeight: 800 }}>{subjectId}</h3>
      <p style={{ margin: "4px 0 8px", color: "#ddd" }}>{subjectName}</p>

      <p style={{ margin: "0 0 6px", color: lessThan7Days ? "#ff6b6b" : "#c7d2fe" }}>
        <strong>Fecha:</strong>{" "}
        {target.toLocaleString("es-CL", {
          dateStyle: "short",
          timeStyle: "short",
        })}
      </p>

      <div style={{ fontWeight: 800, color: lessThan7Days ? "#ff6b6b" : "#eafff7" }}>
        {formatLeft(left)}
      </div>
    </article>
  );
}
