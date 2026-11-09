import { connection } from "next/server";
import Confetti from "./confetti";

const TABNEWS_URL = "https://www.tabnews.com.br";

// A estratégia "new" conta todos os conteúdos publicados. A padrão ("relevant")
// conta só os que estão em destaque.
async function getTotalContents() {
  try {
    const response = await fetch(
      `${TABNEWS_URL}/api/v1/contents?strategy=new&per_page=1`,
      { cache: "no-store", signal: AbortSignal.timeout(5000) },
    );

    if (!response.ok) {
      return null;
    }

    const total = Number(response.headers.get("x-pagination-total-rows") ?? NaN);
    return Number.isInteger(total) ? total : null;
  } catch {
    return null;
  }
}

export default async function Home() {
  // Garante que a página seja renderizada a cada acesso, e não só no build.
  await connection();
  const totalContents = await getTotalContents();

  return (
    <main
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "64px 16px",
        fontFamily: "system-ui, sans-serif",
        lineHeight: 1.5,
        textAlign: "center",
      }}
    >
      <Confetti />
      <h1>Em Construção</h1>
      <p>
        Estamos neste exato momento reconstruindo o Tabnews, um lugar na
        internet para quem trabalha com tecnologia e precisa consumir conteúdos
        com valor concreto
      </p>
      <p>
        {totalContents === null
          ? "Não foi possível carregar o total de conteúdos publicados no TabNews agora."
          : `Conteúdos publicados no TabNews: ${totalContents.toLocaleString("pt-BR")}`}
      </p>
      <p>
        <a href={TABNEWS_URL}>Visite o site oficial do TabNews</a>
      </p>
    </main>
  );
}
