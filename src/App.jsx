import { useEffect, useState } from "react";
import Register from "./components/Register.jsx";
import Test from "./components/Test.jsx";
import Result from "./components/Result.jsx";
import { fetchResult } from "./api.js";
import { load, save, clear } from "./storage.js";
import { DURATION_MS } from "./questions.js";

export default function App() {
  const [session, setSession] = useState(() => load() || { stage: "register" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => save(session), [session]);

  // Page refresh ke baad result wapas laao
  useEffect(() => {
    if (session.stage === "result" && session.resultId) {
      setLoading(true);
      fetchResult(session.resultId)
        .then(setResult)
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startTest = (student) =>
    setSession({ stage: "test", student, answers: {}, current: 0, endsAt: Date.now() + DURATION_MS });

  const update = (patch) => setSession((s) => ({ ...s, ...patch }));

  const finish = (res) => {
    setResult(res);
    setSession({ stage: "result", resultId: res._id });
  };

  const reset = () => {
    clear();
    setResult(null);
    setError("");
    setSession({ stage: "register" });
  };

  return (
    <div className="app">
      <header className="topbar">
        <span className="brand">The WebEcho Innvoations</span>
        <span className="topbar-title">Aptitude Test</span>
      </header>
      <main>
        {session.stage === "register" && <Register onStart={startTest} />}
        {session.stage === "test" && <Test session={session} update={update} onFinish={finish} />}
        {session.stage === "result" && (
          <>
            {loading && <p className="status">Result load ho raha hai…</p>}
            {error && (
              <div className="sheet narrow">
                <p className="error">{error}</p>
                <button className="btn" onClick={reset}>Start over</button>
              </div>
            )}
            {result && <Result result={result} onReset={reset} />}
          </>
        )}
      </main>
    </div>
  );
}
