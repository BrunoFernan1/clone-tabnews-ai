"use client";

import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

export default function Confetti() {
  const [size, setSize] = useState(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    // Depois que a animação termina não há mais canvas para redimensionar.
    if (finished) {
      return;
    }

    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [finished]);

  if (finished || !size) {
    return null;
  }

  return (
    <ReactConfetti
      width={size.width}
      height={size.height}
      recycle={false}
      // Remove o canvas, que ocupa a tela inteira, quando o último confete cai.
      onConfettiComplete={() => setFinished(true)}
      style={{ position: "fixed" }}
    />
  );
}
