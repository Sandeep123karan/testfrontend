import { useState } from "react";
import { QUESTIONS, SECTIONS, SECTION_TOTALS, DURATION_MS } from "../questions.js";

const FIELDS = [
  { name: "name", label: "Full name", autoComplete: "name" },
  { name: "fatherName", label: "Father's name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "mobile", label: "Mobile number", type: "tel", autoComplete: "tel", hint: "10 digits" },
  { name: "collegeName", label: "College name" },
  { name: "batch", label: "Batch", hint: "e.g. 2022-2026" },
  { name: "semester", label: "Semester", select: ["1", "2", "3", "4", "5", "6", "7", "8"] },
  { name: "address", label: "Address", wide: true },
];

function validate(v) {
  const e = {};
  FIELDS.forEach((f) => {
    if (!String(v[f.name] || "").trim()) e[f.name] = `${f.label} is required`;
  });
  if (!e.email && !/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = "Enter a valid email address";
  if (!e.mobile && !/^[6-9]\d{9}$/.test(v.mobile.trim())) e.mobile = "Enter a valid 10-digit mobile number";
  return e;
}

export default function Register({ onStart }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const change = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate(values);
    setErrors(e);
    if (Object.keys(e).length) return;
    const clean = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, String(v).trim()]));
    onStart({ ...clean, email: clean.email.toLowerCase() });
  };

  return (
    <div className="register">
      <section className="intro">
        <h1>Check your aptitude in {DURATION_MS / 60000} minutes</h1>
        <p>
          {QUESTIONS.length} multiple-choice questions. Your score shows up as soon as you submit.
        </p>
        <ul className="sections">
          {SECTIONS.map((s) => (
            <li key={s}>
              <strong>{s}</strong>
              <span>{SECTION_TOTALS[s]} questions</span>
            </li>
          ))}
        </ul>
        <p className="muted">
          The timer starts when you press Start test. If time runs out, your answers are submitted automatically.
        </p>
      </section>

      <form className="sheet" onSubmit={submit} noValidate>
        <h2>Your details</h2>
        <div className="grid">
          {FIELDS.map((f) => (
            <div key={f.name} className={`field ${f.wide ? "wide" : ""}`}>
              <label htmlFor={f.name}>{f.label}</label>
              {f.select ? (
                <select id={f.name} value={values[f.name] || ""} onChange={(e) => change(f.name, e.target.value)}>
                  <option value="">Select</option>
                  {f.select.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              ) : (
                <input
                  id={f.name}
                  type={f.type || "text"}
                  placeholder={f.hint || ""}
                  autoComplete={f.autoComplete}
                  value={values[f.name] || ""}
                  onChange={(e) => change(f.name, e.target.value)}
                />
              )}
              {errors[f.name] && <span className="error">{errors[f.name]}</span>}
            </div>
          ))}
        </div>
        <button className="btn primary" type="submit">Start test</button>
      </form>
    </div>
  );
}
