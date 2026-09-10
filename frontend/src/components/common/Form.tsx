'use client';

import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { FormProps } from '../../shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const Form = ({
  title,
  description,
  inputs,
  radioBtns,
  textarea,
  checkboxes,
  btn,
  btnPosition,
  containerClass,
}: FormProps) => {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [radioBtnValue, setRadioBtnValue] = useState('');
  const [textareaValues, setTextareaValues] = useState('');
  const [checkedState, setCheckedState] = useState<boolean[]>(new Array(checkboxes && checkboxes.length).fill(false));
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState('');
  const [submitErr, setSubmitErr] = useState(false);

  // Update the value of the entry fields
  const changeInputValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  // Update checked radio buttons
  const changeRadioBtnsHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioBtnValue(event.target.value);
  };

  // Update the textarea value
  const changeTextareaHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValues(event.target.value);
  };

  // Update checkbox radio buttons
  const changeCheckboxHandler = (index: number) => {
    setCheckedState((prevValues) => {
      const newValues = [...(prevValues as boolean[])];
      newValues.map(() => {
        newValues[index] = !checkedState[index];
      });
      return newValues;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMsg('');
    const vals: Record<string, string> = inputValues;
    const firstName = vals['name'] || '';
    const lastName = vals['lastName'] || '';
    try {
      const res = await fetch(`${API_BASE}/api/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email: vals['email'] || '',
          subject: radioBtnValue || 'General inquiry',
          message: textareaValues,
        }),
      });
      const data = await res.json();
      setSubmitErr(!res.ok);
      setSubmitMsg(data.message || (res.ok ? 'Message sent!' : 'Something went wrong.'));
    } catch {
      setSubmitErr(true);
      setSubmitMsg('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form id="contactForm" className={twMerge('', containerClass)} onSubmit={handleSubmit}>
      {title && <h2 className={`${description ? 'mb-2' : 'mb-6'} text-2xl sm:text-3xl font-extrabold text-[#032B53] tracking-tight`}>{title}</h2>}
      {description && <p className="mb-6 text-slate-600 text-sm sm:text-base leading-relaxed">{description}</p>}
      <div className="mb-8 space-y-5">
        {/* Inputs */}
        {inputs &&
          inputs.map(({ type, label, name, autocomplete, placeholder }, index) => (
            <div key={`item-input-${index}`} className="flex flex-col gap-1.5">
              <label htmlFor={name} className="block text-xs font-bold uppercase tracking-wider text-[#032B53]">
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                autoComplete={autocomplete}
                value={name ? (inputValues[name] || '') : (inputValues[String(index)] || '')}
                onChange={changeInputValueHandler}
                placeholder={placeholder}
                className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#032B53] focus:ring-4 focus:ring-[#032B53]/15 outline-none transition-all duration-200 shadow-sm font-medium text-sm sm:text-base"
              />
            </div>
          ))}

        {/* Radio buttons */}
        {radioBtns && (
          <div className="flex flex-col gap-2 pt-2">
            <span className="block text-xs font-bold uppercase tracking-wider text-[#032B53] mb-1">{radioBtns?.label}</span>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5">
              {radioBtns.radios.map(({ label }, index) => {
                const radioValue = `value${index}`;
                const isChecked = radioBtnValue === radioValue || radioBtnValue === label;
                return (
                  <label
                    key={`radio-btn-${index}`}
                    htmlFor={`radio-${index}`}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      isChecked
                        ? 'border-[#032B53] bg-[#032B53] text-white shadow-md'
                        : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:border-slate-300 hover:bg-slate-100/60'
                    }`}
                  >
                    <input
                      id={`radio-${index}`}
                      type="radio"
                      name="contactReason"
                      value={radioValue}
                      checked={isChecked}
                      onChange={(e) => {
                        setRadioBtnValue(e.target.value);
                      }}
                      className="sr-only"
                    />
                    <span>{label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Textarea */}
        {textarea && (
          <div className="flex flex-col gap-1.5 pt-2">
            <label htmlFor={textarea.name} className="block text-xs font-bold uppercase tracking-wider text-[#032B53]">
              {textarea.label}
            </label>
            <textarea
              id={textarea.name}
              name={textarea.name}
              cols={textarea.cols}
              rows={textarea.rows || 4}
              value={textareaValues}
              onChange={(e) => changeTextareaHandler(e)}
              placeholder={textarea.placeholder}
              className="w-full rounded-xl border border-slate-300 bg-slate-50/50 p-4 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#032B53] focus:ring-4 focus:ring-[#032B53]/15 outline-none transition-all duration-200 shadow-sm font-medium text-sm sm:text-base resize-y"
            />
          </div>
        )}

        {/* Checkboxes */}
        {checkboxes && (
          <div className="space-y-2 pt-2">
            {checkboxes.map(({ label }, index) => (
              <label key={`checkbox-${index}`} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium cursor-pointer">
                <input
                  id={label}
                  type="checkbox"
                  name={label}
                  checked={checkedState[index]}
                  onChange={() => changeCheckboxHandler(index)}
                  className="w-4 h-4 rounded border-slate-300 text-[#032B53] focus:ring-[#032B53] cursor-pointer"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {btn && (
        <div
          className={`${btnPosition === 'left' ? 'text-left' : btnPosition === 'right' ? 'text-right' : 'text-center'}`}
        >
          <button
            type={btn.type || 'submit'}
            disabled={submitting}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#032B53] hover:bg-[#064273] text-white font-bold text-base shadow-lg shadow-blue-900/20 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-50"
          >
            {submitting ? 'Sending...' : btn.title}
          </button>
        </div>
      )}

      {submitMsg && (
        <p className={`mt-4 text-sm font-semibold p-3 rounded-xl ${submitErr ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>{submitMsg}</p>
      )}
    </form>
  );
};

export default Form;
