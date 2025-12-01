import React, { type FC, useEffect, useState } from "react";
import type { RemotiveJob } from "../../../shared/api";
import { Header } from "../../../shared/components";

const JobsPage: FC = () => {
  const [query, setQuery] = useState<string>("");
  const [jobs, setJobs] = useState<RemotiveJob[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [emptyMessage, setEmptyMessage] = useState<string>("");

  const searchJobs = async (q: string) => {
    const search = q.trim();
    setLoading(true);
    setEmptyMessage("");
    setJobs([]);

    try {
      const url = new URL("https://remotive.com/api/remote-jobs");
      if (search) {
        url.searchParams.set("search", search);
      }

      const r = await fetch(url.toString());
      const data = (await r.json()) as { jobs?: RemotiveJob[] };
      const list = data.jobs ?? [];

      if (!list.length) {
        setEmptyMessage("Ничего не найдено");
      }

      setJobs(list.slice(0, 30));
    } catch (e) {
      console.error(e);
      setEmptyMessage("Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchJobs(query);
  };

  useEffect(() => {
    searchJobs("frontend");
  }, []);

  return (
    <div className="container">
      <Header />

      <div className="panel">
        <form id="job-form" className="search" onSubmit={handleSubmit}>
          <input
            id="job-q"
            className="input"
            placeholder="Например: frontend, react, designer"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
          />
          <button className="button" type="submit">
            Искать
          </button>
        </form>

        <div id="job-loader" className={`loader ${loading ? "show" : ""}`}>
          Загрузка...
        </div>

        <div id="job-results" className="grid">
          {jobs.map((job) => (
            <div className="card" key={job.id ?? job.url}>
              <h3>{job.title}</h3>
              <div className="meta">
                <span className="badge">{job.company_name || "Компания"}</span>
                <span className="badge">
                  {job.candidate_required_location || "Remote"}
                </span>
                <span className="badge">{job.job_type || ""}</span>
              </div>
              <p>{job.category || ""}</p>
              <a href={job.url} target="_blank" rel="noreferrer">
                Откликнуться
              </a>
            </div>
          ))}
        </div>

        <div id="job-empty" className="empty">
          {!loading && emptyMessage}
        </div>

        <div className="footer">Источник: Remotive Jobs API</div>
      </div>
    </div>
  );
};

export default JobsPage;
