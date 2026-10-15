import { SECTIONS, SECTION_TOTALS, QUESTIONS } from "../questions.js";

const SCORE_KEY = { Aptitude: "aptitudeScore", Reasoning: "reasoningScore", English: "englishScore" };
const SHOW_REVIEW = true; // false karoge to students ko correct answers nahi dikhenge

function verdict(p) {
  if (p >= 80) return "Excellent work.";
  if (p >= 60) return "Good score. A little more practice will take you higher.";
  if (p >= 40) return "Decent start. Practise the weaker sections below.";
  return "Needs more practice. Start with the section where you scored lowest.";
}

export default function Result({ result, onReset }) {
  const scores = SECTIONS.map((s) => ({ name: s, got: result[SCORE_KEY[s]] || 0, total: SECTION_TOTALS[s] }));
  const total = scores.reduce((a, s) => a + s.got, 0);
  const max = QUESTIONS.length;
  const percent = Math.round((total / max) * 100);
  const details = result.answerDetails || [];

  return (
    <div className="result">
      <section className="sheet score">
        <p className="muted">Result for {result.name}</p>
        <div className="big">
          <span className="big-num">{total}</span>
          <span className="big-of">/ {max}</span>
          <span className="big-pct">{percent}%</span>
        </div>
        <p>{verdict(percent)}</p>

        <div className="bars">
          {scores.map((s) => (
            <div key={s.name} className="bar-row">
              <span>{s.name}</span>
              <div className="bar" role="img" aria-label={`${s.name}: ${s.got} of ${s.total}`}>
                <div style={{ width: `${(s.got / s.total) * 100}%` }} />
              </div>
              <span>{s.got}/{s.total}</span>
            </div>
          ))}
        </div>

        <div className="actions">
          <button className="btn" onClick={() => window.print()}>Print result</button>
          <button className="btn ghost" onClick={onReset}>New candidate</button>
        </div>
      </section>

      {SHOW_REVIEW && details.length > 0 && (
        <section className="sheet review">
          <h2>Your answers</h2>
          <ol>
            {details.map((d) => (
              <li key={d.questionIndex} className={d.isCorrect ? "right" : "wrong"}>
                <p className="r-q">{QUESTIONS[d.questionIndex]?.q || d.question}</p>
                <p>
                  Your answer: <strong>{d.selectedAnswer || "Not answered"}</strong>
                  {!d.isCorrect && (
                    <>
                      {" "}· Correct: <strong>{d.correctAnswer}</strong>
                    </>
                  )}
                </p>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
