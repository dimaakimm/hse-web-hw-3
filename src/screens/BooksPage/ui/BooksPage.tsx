import React, { type FC, useEffect, useState } from "react";
import { Header } from "../../../shared/components";
import type { GoogleBookItem, GoogleBookVolumeInfo } from "../../../shared/api";

const BooksPage: FC = () => {
  const [query, setQuery] = useState<string>("");
  const [books, setBooks] = useState<GoogleBookItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [emptyMessage, setEmptyMessage] = useState<string>("");

  const searchBooks = async (q: string) => {
    const search = q.trim() || "javascript";
    setLoading(true);
    setEmptyMessage("");
    setBooks([]);

    try {
      const url = new URL("https://www.googleapis.com/books/v1/volumes");
      url.searchParams.set("q", search);
      url.searchParams.set("maxResults", "20");

      const r = await fetch(url.toString());
      const data = (await r.json()) as { items?: GoogleBookItem[] };
      const list = data.items ?? [];

      if (!list.length) {
        setEmptyMessage("Ничего не найдено");
      }

      setBooks(list);
    } catch (e) {
      console.error(e);
      setEmptyMessage("Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchBooks(query);
  };

  useEffect(() => {
    searchBooks("javascript");
  }, []);

  const renderVolume = (v: GoogleBookVolumeInfo | undefined) => {
    if (!v) return null;

    const authors = (v.authors ?? []).join(", ");
    const thumb = v.imageLinks?.thumbnail ?? "";
    const description = v.description
      ? String(v.description).slice(0, 160) + "…"
      : "";

    return (
      <>
        <h3>{v.title || "Без названия"}</h3>
        <div className="meta">
          <span className="badge">{authors || "Автор не указан"}</span>
          {v.publishedDate && <span className="badge">{v.publishedDate}</span>}
        </div>
        {description && <p>{description}</p>}
        {thumb && (
          <img
            src={thumb}
            alt=""
            style={{
              width: "100%",
              borderRadius: "10px",
              border: "1px solid #1b2134",
            }}
          />
        )}
        {v.infoLink && (
          <a href={v.infoLink} target="_blank" rel="noreferrer">
            Подробнее
          </a>
        )}
      </>
    );
  };

  return (
    <div className="container">
      <Header />

      <div className="panel">
        <form id="book-form" className="search" onSubmit={handleSubmit}>
          <input
            id="book-q"
            className="input"
            placeholder="Автор, название или тема"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
          />
          <button className="button" type="submit">
            Искать
          </button>
        </form>

        <div id="book-loader" className={`loader ${loading ? "show" : ""}`}>
          Загрузка...
        </div>

        <div id="book-results" className="grid">
          {books.map((item) => (
            <div className="card" key={item.id ?? item.volumeInfo?.title}>
              {renderVolume(item.volumeInfo)}
            </div>
          ))}
        </div>

        <div id="book-empty" className="empty">
          {!loading && emptyMessage}
        </div>

        <div className="footer">Источник: Google Books API</div>
      </div>
    </div>
  );
};

export default BooksPage;
