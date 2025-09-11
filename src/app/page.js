"use client";
import { useEffect, useState } from "react";
import TestCard from "./components/TestCard";

const parseDate = (dateStr) => {
  return new Date(dateStr.replace(" ", "T"));
};

export default function HomePage() {
  const [tests, setTests] = useState([]);
  const [title, setTitle] = useState("Mis Pruebas");

  useEffect(() => {
    fetch("/datos/pruebas.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("📌 Datos cargados:", data);

        const now = new Date();
        const upcoming = data.tests
          .map((t) => ({ ...t }))
          .filter((t) => {
            const fecha = parseDate(t.testDate);
            console.log("⏰ Revisando:", t.testDate, "=>", fecha);
            return fecha > now;
          })
          .sort(
            (a, b) => parseDate(a.testDate) - parseDate(b.testDate)
          );

        console.log("✅ Pruebas próximas:", upcoming);

        setTitle(data.pageTitle);
        setTests(upcoming);
      });
  }, []);

  return (
    <main style={{ maxWidth: "700px", margin: "0 auto", padding: "2rem" }}>
      <h1>{title}</h1>
      {tests.map((t) => (
        <TestCard key={t.subjectId} {...t} />
      ))}
    </main>
  );
}
