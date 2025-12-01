import React, { type FC, useEffect, useState } from "react";
import type { GhibliMovie } from "../../../shared/api";
import { Header } from "../../../shared/components";

const MoviesPage: FC = () => {
  const [query, setQuery] = useState<string>("");
  const [allMovies, setAllMovies] = useState<GhibliMovie[]>([]);
  const [movies, setMovies] = useState<GhibliMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [emptyMessage, setEmptyMessage] = useState<string>("");

  const loadMovies = async () => {
    setLoading(true);
    setEmptyMessage("");
    setMovies([]);

    try {
      const r = await fetch("https://ghibliapi.vercel.app/films");
      const list = (await r.json()) as GhibliMovie[];

      if (!list.length) {
        setEmptyMessage("Ничего не найдено");
      }

      setAllMovies(list);
      setMovies(list);
    } catch (e) {
      console.error(e);
      setEmptyMessage("Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();

    if (!q) {
      setMovies(allMovies);
      setEmptyMessage(allMovies.length ? "" : "Ничего не найдено");
      return;
    }

    const filtered = allMovies.filter((x) => x.title.toLowerCase().includes(q));

    setMovies(filtered);
    setEmptyMessage(filtered.length ? "" : "Ничего не найдено");
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div className="container">
      <Header />

      <div className="panel">
        <form id="movie-form" className="search" onSubmit={handleSubmit}>
          <input
            id="movie-q"
            className="input"
            placeholder="Поиск по названию"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
          />
          <button className="button" type="submit">
            Искать
          </button>
        </form>

        <div id="movie-loader" className={`loader ${loading ? "show" : ""}`}>
          Загрузка...
        </div>

        <div id="movie-results" className="grid">
          {movies.map((m) => {
            const description = m.description
              ? String(m.description).slice(0, 160) + "…"
              : "";

            return (
              <div className="card" key={m.id ?? m.title}>
                <h3>{m.title}</h3>
                <div className="meta">
                  {m.original_title && (
                    <span className="badge">{m.original_title}</span>
                  )}
                  {m.release_date && (
                    <span className="badge">{m.release_date}</span>
                  )}
                  {m.running_time && (
                    <span className="badge">{m.running_time} мин.</span>
                  )}
                </div>
                {description && <p>{description}</p>}
                {m.url && (
                  <a href={m.url} target="_blank" rel="noreferrer">
                    Источник
                  </a>
                )}
              </div>
            );
          })}
        </div>

        <div id="movie-empty" className="empty">
          {!loading && emptyMessage}
        </div>

        <div className="footer">Источник: Studio Ghibli API</div>
      </div>
    </div>
  );
};

export default MoviesPage;
