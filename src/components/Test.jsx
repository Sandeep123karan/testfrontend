import { useEffect, useRef, useState } from "react";
import { QUESTIONS, DURATION_MS } from "../questions.js";
import { submitTest } from "../api.js";

const LETTERS = ["A", "B", "C", "D", "E"];

function fmt(ms) {
  const s = Math.ceil(ms / 1000);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export default function Test({ session, update, onFinish }) {
  const { student, answers, current, endsAt } = session;
  const [now, setNow] = useState(Date.now());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const submitting = useRef(false);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const remaining = Math.max(0, endsAt - now);
  const q = QUESTIONS[current];
  const answered = Object.keys(answers).length;

  async function submit(auto = false) {
    if (submitting.current) return;
    if (!auto) {
      const left = QUESTIONS.length - answered;
      const msg = left ? `${left} question(s) are still unanswered. Submit anyway?` : "Submit your test?";
      if (!window.confirm(msg)) return;
    }
    submitting.current = true;
    setBusy(true);
    setError("");
    try {
      const elapsed = Math.min(DURATION_MS, Math.max(0, DURATION_MS - (endsAt - Date.now())));
      const result = await submitTest({
        ...student,
        answers,
        score: 0, // backend section scores se total banata hai
        timeTaken: Math.round(elapsed / 1000),
      });
      onFinish(result);
    } catch (e) {
      setError(e.message);
      submitting.current = false;
      setBusy(false);
    }
  }

  useEffect(() => {
    if (remaining === 0) submit(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  const choose = (opt) => update({ answers: { ...answers, [current]: opt } });
  const clearAnswer = () => {
    const next = { ...answers };
    delete next[current];
    update({ answers: next });
  };
  const go = (i) => update({ current: Math.min(QUESTIONS.length - 1, Math.max(0, i)) });

  return (
    <div className="test">
      <section className="sheet question">
        <div className="q-head">
          <span>{q.category} · Question {current + 1} of {QUESTIONS.length}</span>
          <span className={`timer ${remaining < 5 * 60000 ? "low" : ""}`} role="timer" aria-label="Time left">
            {fmt(remaining)}
          </span>
        </div>

        <h2 className="q-text">{q.q}</h2>

        <div className="options" role="radiogroup" aria-label="Options">
          {q.options.map((opt, i) => {
            const selected = answers[current] === opt;
            return (
              <button
                key={opt}
                type="button"
                role="radio"
                aria-checked={selected}
                className={`option ${selected ? "selected" : ""}`}
                onClick={() => choose(opt)}
              >
                <span className="bubble">{LETTERS[i]}</span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        <div className="nav">
          <button className="btn" onClick={() => go(current - 1)} disabled={current === 0}>Previous</button>
          <button className="btn ghost" onClick={clearAnswer} disabled={answers[current] === undefined}>Clear answer</button>
          {current < QUESTIONS.length - 1 ? (
            <button className="btn primary" onClick={() => go(current + 1)}>Next</button>
          ) : (
            <button className="btn primary" onClick={() => submit(false)} disabled={busy}>
              {busy ? "Submitting…" : "Submit test"}
            </button>
          )}
        </div>
        {error && (
          <p className="error">
            {error}{" "}
            <button className="link" onClick={() => submit(true)}>Try again</button>
          </p>
        )}
      </section>

      <aside className="sheet palette">
        <h3>{answered} of {QUESTIONS.length} answered</h3>
        <div className="grid-palette">
          {QUESTIONS.map((_, i) => (
            <button
              key={i}
              className={`dot ${answers[i] !== undefined ? "done" : ""} ${i === current ? "current" : ""}`}
              onClick={() => go(i)}
              aria-label={`Question ${i + 1}${answers[i] !== undefined ? ", answered" : ""}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button className="btn primary full" onClick={() => submit(false)} disabled={busy}>
          {busy ? "Submitting…" : "Submit test"}
        </button>
      </aside>
    </div>
  );
}
