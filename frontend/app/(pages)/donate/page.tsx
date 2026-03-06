'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  IconCheck,
  IconHeart,
  IconSchool,
  IconUsers,
  IconCreditCard,
  IconPhone,
  IconCash,
  IconArrowRight,
  IconChevronLeft,
  IconLoader2,
} from '@tabler/icons-react';

/* --------------------------- Helper utilities --------------------------- */
const UGX = (value: number | null) =>
  value === null ? '—' : new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX', maximumFractionDigits: 0 }).format(value);

const clamp = (v: number, a = 0, b = Number.MAX_SAFE_INTEGER) => Math.max(a, Math.min(b, v));

export default function DonateAllInOnePage(): JSX.Element {
  const PRIMARY = 'text-sky-700';
  const btnPrimary = 'bg-sky-700 hover:bg-sky-800 text-white';

  const impactTiers = [
    { amountUGX: 100_000, title: 'Textbooks for a Semester', desc: 'Covers essential textbooks for one student for a semester.', icon: IconSchool },
    { amountUGX: 500_000, title: 'Student Accommodation (2 months)', desc: 'Helps a student with safe accommodation for two months.', icon: IconUsers },
    { amountUGX: 2_000_000, title: 'Year of Support', desc: 'Supports living and tuition costs for a promising student for a year.', icon: IconHeart },
    { amountUGX: 0, title: 'Give What You Can', desc: 'Flexible support for general programs and mentorship.', icon: IconCheck },
  ];

  const bankDetails = { bankName: 'DFCU Bank', accountName: 'West Nile Education Trust Fund', accountNumber: '01171114199773', currency: 'UGX', branch: 'Lugogo' };

  const mobileMoney = { networks: [ { name: 'MTN Mobile Money', number: '+256 772 000000', ref: 'WNETF' }, { name: 'Airtel Money', number: '+256 755 000000', ref: 'WNETF' } ] };

  const [step, setStep] = useState<number>(1);
  const [amount, setAmount] = useState<number | null>(50_000);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'momo' | 'bank' | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const suggested = [10_000, 25_000, 50_000, 100_000, 500_000];

  useEffect(() => {
    if (customAmount === '') return;
    const cleaned = customAmount.replace(/[^0-9.]/g, '');
    const parsed = parseFloat(cleaned);
    setAmount(!isNaN(parsed) && parsed > 0 ? Math.round(parsed) : null);
  }, [customAmount]);

  const progressPercent = useMemo(() => clamp(((step - 1) / 5) * 100, 0, 100), [step]);

  const validStep = (s: number) => {
    if (s === 1) return amount !== null && amount > 0;
    if (s === 2) return frequency === 'one-time' || frequency === 'monthly';
    if (s === 3) return paymentMethod !== null;
    if (s === 4) return anonymous || (name.trim().length > 1 && /\S+@\S+\.\S+/.test(email));
    return true;
  };

  const goNext = () => { setError(null); if (!validStep(step)) { setError('Please complete the required fields before continuing.'); return; } setStep((s) => Math.min(6, s + 1)); };
  const goBack = () => { setError(null); setStep((s) => Math.max(1, s - 1)); };

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const handlePay = async () => {
    setError(null);
    if (!validStep(4)) { setStep(4); setError('Please fill donor information correctly.'); return; }
    setIsProcessing(true);
    try {
      const res = await fetch(`${API_BASE}/api/donate/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: anonymous ? 'Anonymous' : name,
          email: anonymous ? 'anonymous@wnetf.org' : email,
          phone,
          amount,
          currency: 'UGX',
          frequency: frequency === 'monthly' ? 'monthly' : 'once',
          message: note,
          is_anonymous: anonymous,
        }),
      });
      if (!res.ok) throw new Error('Submission failed. Please try again.');
      setCompleted(true);
      setStep(6);
    } catch (err: any) { setError(err?.message || 'Submission failed. Please try again.'); }
    finally { setIsProcessing(false); }
  };

  const resetAll = () => {
    setStep(1); setAmount(50_000); setCustomAmount(''); setFrequency('one-time'); setPaymentMethod(null);
    setName(''); setEmail(''); setPhone(''); setNote(''); setAnonymous(false); setCompleted(false); setError(null);
  };

  const AmountButton: React.FC<{ value: number; selected: boolean; onClick: () => void }> = ({ value, selected, onClick }) => (
    <button type="button" onClick={onClick} className={`w-full py-3 px-4 rounded-lg border ${selected ? 'border-sky-600 bg-sky-50' : 'border-slate-200'} text-left`} aria-pressed={selected}>
      <div className="flex items-center justify-between">
        <div className="font-semibold">{UGX(value)}</div>
        <div className="text-xs text-slate-500">Suggested</div>
      </div>
    </button>
  );

  const scrollToForm = () => document.getElementById('donor-form')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800">
      {/* HERO */}
        <header className="relative text-white overflow-hidden">
            {/* Background Image + Overlay */}
            <div className="absolute inset-0">
                <img
                src="/images/students-bg.jpg"
                alt="Students learning"
                className="w-full h-full object-cover opacity-10"
                />
                <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to right, #032B53, #064273)', // deep custom blue gradient
                }}
                ></div>
            </div>

            {/* Hero content */}
            <div className="relative max-w-7xl mx-auto px-4 py-20 lg:flex lg:items-center lg:justify-between">
                <div className="lg:w-1/2">
                <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
                    Invest in West Nile's Future
                </h1>
                <p className="mt-4 text-lg text-sky-100 max-w-2xl">
                    Every contribution supports scholarships, teacher training, and better school infrastructure in the West Nile region.
                </p>
                <div className="mt-6 flex gap-3">
                    <a href="#donor-form" className="inline-flex items-center gap-2 px-4 py-3 rounded-md shadow bg-[#032B53] hover:bg-[#064273] text-white">
                    Donate Now <IconArrowRight size={16} />
                    </a>
                    <a href="#impact" className="inline-flex items-center gap-2 px-4 py-3 rounded-md bg-white/10 hover:bg-white/20">
                    Our Impact
                    </a>
                </div>
                </div>

                <div className="hidden lg:block lg:w-1/3">
                <div className="w-64 h-64 rounded-full bg-white/10 flex items-center justify-center">
                    <IconHeart size={68} className="text-white/90" />
                </div>
                </div>
            </div>
            </header>

      {/* MAIN: Single-column flow */}
      <main className="max-w-7xl mx-auto px-4 py-12 space-y-10">
        {/* Impact Tiers */}
        <section id="impact">
          <h2 className="text-2xl font-bold mb-4">How your generosity translates to impact</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {impactTiers.map((tier, i) => {
              const Icon = tier.icon;
              return (
                <div key={i} className="p-5 rounded-xl shadow-sm bg-white border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-sky-50">
                      <Icon size={28} className="text-sky-700" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold" style={{ color: '#04506b' }}>
                        {tier.amountUGX > 0 ? UGX(tier.amountUGX) : 'Any Amount'}
                      </div>
                      <div className="text-sm text-slate-500">{tier.title}</div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{tier.desc}</p>
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        if (tier.amountUGX > 0) { setAmount(tier.amountUGX); setCustomAmount(''); } else { setAmount(null); setCustomAmount(''); }
                        scrollToForm();
                      }}
                      className="text-sm font-semibold text-sky-700 hover:underline"
                    >
                      Donate this amount →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* How to give */}
        <section id="methods">
          <h2 className="text-2xl font-bold mb-4">How to give</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl p-5 bg-white border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-sky-50"><IconCreditCard size={22} className="text-sky-700" /></div>
                <div>
                  <div className="font-semibold">Bank Transfer</div>
                  <div className="text-sm text-slate-500">{bankDetails.bankName} — {bankDetails.branch}</div>
                </div>
              </div>
              <ul className="mt-3 text-sm space-y-1">
                <li><strong>Account Name:</strong> {bankDetails.accountName}</li>
                <li><strong>Account No:</strong> <span className="font-mono">{bankDetails.accountNumber}</span></li>
                <li><strong>Currency:</strong> {bankDetails.currency}</li>
              </ul>
              <div className="mt-3 text-xs text-slate-400">Email proof of transfer to donations@wnetf.org for acknowledgement.</div>
            </div>

            <div className="rounded-xl p-5 bg-white border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-sky-50"><IconPhone size={22} className="text-sky-700" /></div>
                <div>
                  <div className="font-semibold">Mobile Money</div>
                  <div className="text-sm text-slate-500">MTN / Airtel (Uganda)</div>
                </div>
              </div>
              <div className="mt-3 text-sm space-y-1">
                {mobileMoney.networks.map((m, idx) => (
                  <div key={idx} className="p-2 rounded border border-slate-100">
                    <div className="font-medium">{m.name}</div>
                    <div className="font-mono">{m.number}</div>
                    <div className="text-xs text-slate-400">Use ref: <strong>{m.ref}</strong></div>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-xs text-slate-400">Use exact reference to ensure accurate allocation to the trust fund.</div>
            </div>
          </div>
        </section>

        {/* Donation Form */}
        <section id="donor-form" className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Donate to West Nile Education</h2>
              <div className="text-sm text-slate-500">Secure • Transparent • Local impact</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold">{UGX(amount)}</div>
              <div className="text-xs text-slate-400">{frequency === 'monthly' ? 'Monthly' : 'One-time'}</div>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${progressPercent}%`, background: 'linear-gradient(90deg,#0369a1,#0ea5a7)' }} />
            </div>
            <div className="flex justify-between text-xs mt-2 text-slate-400"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <label className="block text-sm font-medium mb-2">Choose an amount (UGX)</label>
              <div className="grid grid-cols-2 gap-3">
                {suggested.map((s) => <AmountButton key={s} value={s} selected={amount === s} onClick={() => { setAmount(s); setCustomAmount(''); }} />)}
                <div className="col-span-2 flex gap-3 mt-2">
                  <input type="text" inputMode="numeric" placeholder="Custom amount" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} className="flex-1 rounded-lg border p-3" />
                  <button type="button" onClick={() => setFrequency((f) => (f === 'one-time' ? 'monthly' : 'one-time'))} className={`px-3 py-2 rounded-lg border ${frequency === 'monthly' ? 'bg-sky-600 text-white' : 'bg-white'}`} aria-pressed={frequency === 'monthly'}>{frequency === 'monthly' ? 'Monthly' : 'One-time'}</button>
                </div>
                <div className="col-span-2 text-xs text-slate-400 mt-1">Tip: Recurring monthly support helps plan long-term programs.</div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <label className="block text-sm font-medium mb-2">Give as</label>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setFrequency('one-time')} className={`py-3 rounded-lg border ${frequency === 'one-time' ? 'border-sky-600 bg-sky-50' : 'border-slate-200'}`}>One-time<div className="text-xs text-slate-500 mt-1">Single contribution</div></button>
                <button onClick={() => setFrequency('monthly')} className={`py-3 rounded-lg border ${frequency === 'monthly' ? 'border-sky-600 bg-sky-50' : 'border-slate-200'}`}>Monthly<div className="text-xs text-slate-500 mt-1">Regular support</div></button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <label className="block text-sm font-medium mb-2">Choose payment method</label>
              <div className="space-y-3">
                <button onClick={() => setPaymentMethod('momo')} className={`w-full text-left rounded-lg border p-3 flex items-center gap-3 ${paymentMethod === 'momo' ? 'border-sky-600 bg-sky-50' : 'border-slate-200'}`}>
                  <IconPhone className="w-5 h-5 text-sky-600" />
                  <div><div className="font-medium">Mobile Money</div><div className="text-sm text-slate-500">Follow instructions on your phone</div></div>
                </button>
                <button onClick={() => setPaymentMethod('bank')} className={`w-full text-left rounded-lg border p-3 flex items-center gap-3 ${paymentMethod === 'bank' ? 'border-sky-600 bg-sky-50' : 'border-slate-200'}`}>
                  <IconCash className="w-5 h-5 text-sky-600" />
                  <div><div className="font-medium">Bank Transfer</div><div className="text-sm text-slate-500">Use the account details shown above</div></div>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div>
              <label className="block text-sm font-medium mb-2">Donor information</label>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
                  <label className="text-sm">Donate anonymously</label>
                </div>
                {!anonymous && <>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full rounded-lg border p-3" />
                  <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" type="email" className="w-full rounded-lg border p-3" />
                </>}
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)" type="tel" className="w-full rounded-lg border p-3" />
                <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Leave a note (optional)" className="w-full rounded-lg border p-3"></textarea>
              </div>
            </div>
          )}

          {/* Navigation */}
          {step < 6 && (
            <div className="mt-6 flex justify-between items-center">
              <button onClick={goBack} disabled={step === 1} className="text-slate-500 hover:text-slate-700 flex items-center gap-1"><IconChevronLeft /> Back</button>
              <button onClick={step === 5 ? handlePay : goNext} className={`px-6 py-3 rounded-lg ${btnPrimary} flex items-center gap-2`}>
                {isProcessing ? <IconLoader2 className="animate-spin" /> : (step === 5 ? 'Donate Now' : 'Next')}
              </button>
            </div>
          )}

          {error && <div className="mt-3 text-red-600 text-sm">{error}</div>}

          {completed && <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded text-green-800">Thank you for your generosity!</div>}
        </section>
      </main>
    </div>
  );
}
