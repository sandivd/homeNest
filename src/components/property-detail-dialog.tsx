import PropertyImage from "./property-image";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { HomeListing } from "../data/listings";
import Icon from "./icons";

type PropertyDetailDialogProps = {
  home: HomeListing;
  isSaved: boolean;
  onClose: () => void;
  onToggleSave: () => void;
  onToast: (message: string) => void;
};

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const tourTimes = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM"];

function monthlyPayment(price: number, downPercent: number, interestRate: number, tax: number, hoa: number) {
  const principal = price * (1 - downPercent / 100);
  const monthlyRate = interestRate / 100 / 12;
  const term = 360;
  const principalAndInterest =
    monthlyRate === 0
      ? principal / term
      : (principal * (monthlyRate * (1 + monthlyRate) ** term)) / ((1 + monthlyRate) ** term - 1);
  const insurance = (price * 0.0035) / 12;
  return { principalAndInterest, insurance, total: principalAndInterest + tax + hoa + insurance };
}

function prettyDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T12:00:00Z`),
  );
}

export default function PropertyDetailDialog({
  home,
  isSaved,
  onClose,
  onToggleSave,
  onToast,
}: PropertyDetailDialogProps) {
  const dialogRef = useRef<HTMLElement>(null);
  const isRental = home.listingType === "rent";
  const [downPercent, setDownPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [activePhoto, setActivePhoto] = useState(0);
  const [tourOpen, setTourOpen] = useState(false);
  const [tourDate, setTourDate] = useState(() => new Date(Date.now() + 86_400_000).toISOString().slice(0, 10));
  const [tourTime, setTourTime] = useState("12:00 PM");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [tourMessage, setTourMessage] = useState("");
  const [tourSubmitted, setTourSubmitted] = useState(false);
  const [tourSubmitting, setTourSubmitting] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const photos = [
    { url: home.imageUrl, alt: home.imageAlt },
  ];
  const payment = monthlyPayment(home.price, downPercent, interestRate, home.monthlyTax, home.hoaMonthly);
  const orderedHistory = [...home.history].sort((left, right) => left.eventDate.localeCompare(right.eventDate));
  const historyPrices = orderedHistory.map((entry) => entry.price);
  const lowPrice = Math.min(...historyPrices);
  const highPrice = Math.max(...historyPrices);
  const priceRange = Math.max(highPrice - lowPrice, 1);
  const chartPoints = orderedHistory.map((entry, index) => {
    const x = orderedHistory.length < 2 ? 220 : 34 + ((Date.parse(entry.eventDate) - Date.parse(orderedHistory[0].eventDate)) / Math.max(1, Date.parse(orderedHistory[orderedHistory.length - 1].eventDate) - Date.parse(orderedHistory[0].eventDate))) * 372;
    const y = 166 - ((entry.price - lowPrice) / priceRange) * 112;
    return { ...entry, x, y };
  });
  const chartLine = chartPoints.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const chartArea = `${chartLine} L ${chartPoints.at(-1)?.x ?? 406} 174 L ${chartPoints[0]?.x ?? 34} 174 Z`;

  useEffect(() => {
    try {
      const stored: unknown = JSON.parse(localStorage.getItem("homenest-tour-plans") || "[]");
      if (!Array.isArray(stored)) return;
      const plan = stored.slice().reverse().find(entry => entry && entry.listingId === home.id);
      if (!plan) return;
      if (typeof plan.tourDate === "string" && plan.tourDate >= new Date().toISOString().slice(0, 10)) setTourDate(plan.tourDate);
      if (tourTimes.includes(plan.tourTime)) setTourTime(plan.tourTime);
      if (typeof plan.fullName === "string") setFullName(plan.fullName);
      if (typeof plan.email === "string") setEmail(plan.email);
      if (typeof plan.phone === "string") setPhone(plan.phone);
      if (typeof plan.note === "string") setNote(plan.note);
    } catch { /* The planner still works without a previously saved plan. */ }
  }, [home.id]);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const nodes = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input, select, textarea') ?? []).filter(el => el.getClientRects().length > 0);
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLButtonElement>(".detail-close")?.focus();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  async function requestTour(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTourMessage("");
    setTourSubmitting(true);

    try {
      if (tourDate < today) { setTourMessage("Choose today or a future date."); return; }
      const key = "homenest-tour-plans";
      const previous: unknown = JSON.parse(localStorage.getItem(key) || "[]");
      const plans = Array.isArray(previous) ? previous : [];
      localStorage.setItem(key, JSON.stringify([...plans, { listingId: home.id, address: home.address, fullName, email, phone, tourDate, tourTime, note }]));
      setTourSubmitted(true);
      setTourMessage("Tour plan saved on this device. No request has been sent. Contact the listing agent separately to arrange a visit.");
      onToast("Tour plan saved on this device");
    } catch {
      setTourMessage("We couldn't save on this device. Check that browser storage is available.");
    } finally {
      setTourSubmitting(false);
    }
  }

  async function shareHome() {
    const shareUrl = `${window.location.origin}${window.location.pathname}#/${home.listingType}?home=${encodeURIComponent(home.id)}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: home.address, text: `${money.format(home.price)} · ${home.city}, ${home.state}`, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setShareCopied(true);
        window.setTimeout(() => setShareCopied(false), 2200);
      }
    } catch {
      onToast("Unable to share automatically. Copy this page’s address to share the home.");
      setShareCopied(false);
    }
  }

  return (
    <div
      className="detail-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section ref={dialogRef} className="detail-dialog" role="dialog" aria-modal="true" aria-labelledby="detail-title">
        <header className="detail-dialog-header">
          <a href={`#/${home.listingType}`} className="detail-brand" onClick={onClose} aria-label="HomeNest home">
            <span className="brand-symbol"><Icon name="home" size={17} /></span>
            <span>HomeNest<span className="brand-period">.</span></span>
          </a>
          <div className="detail-header-actions">
            <button type="button" className="detail-icon-button" onClick={shareHome} aria-label="Share this home">
              <Icon name="share" size={19} />
              <span className="share-label">{shareCopied ? "Copied" : "Share"}</span>
            </button>
            <button
              type="button"
              className={`detail-icon-button ${isSaved ? "detail-saved" : ""}`}
              onClick={onToggleSave}
              aria-pressed={isSaved}
              aria-label={isSaved ? "Remove from saved homes" : "Save this home"}
            >
              <Icon name="heart" size={19} />
              <span className="share-label">{isSaved ? "Saved" : "Save"}</span>
            </button>
            <button type="button" className="detail-close" onClick={onClose} aria-label="Close home details">
              <Icon name="close" size={21} />
            </button>
          </div>
        </header>

        <div className="detail-scroll-area">
          <div className="detail-content-wrap">
            <div className="detail-gallery">
              <button
                type="button"
                className="detail-gallery-main"
                onClick={() => setActivePhoto((current) => (current + 1) % photos.length)}
                aria-label="View next property photo"
              >
                <PropertyImage src={photos[activePhoto].url} alt={photos[activePhoto].alt} />
                <span className="gallery-count">{activePhoto + 1} / {photos.length} photos</span>
              </button>
              <div className="detail-gallery-side">
                {photos.map((photo, index) => (
                  <button
                    key={`${photo.url}-${index}`}
                    type="button"
                    className={`detail-gallery-thumb ${activePhoto === index ? "active" : ""}`}
                    onClick={() => setActivePhoto(index)}
                    aria-label={`View photo ${index + 1}`}
                  >
                    <PropertyImage src={photo.url} alt={photo.alt} />
                  </button>
                ))}
              </div>
              <span className="detail-status"><i /> {home.status}</span>
            </div>

            <div className="detail-main-grid">
              <div className="detail-primary-column">
                <div className="detail-heading-block">
                  <p className="detail-kicker">{home.propertyType} <span>·</span> Illustrative listing</p>
                  <h1 id="detail-title">{money.format(home.price)}{isRental && <small> / month</small>}</h1>
                  <p className="detail-address">{home.address}, {home.city}, {home.state} {home.zipCode}</p>
                  <div className="detail-stats">
                    <span><Icon name="bed" size={19} /><strong>{home.bedrooms}</strong> beds</span>
                    <span><Icon name="bath" size={19} /><strong>{home.bathrooms}</strong> baths</span>
                    <span><Icon name="area" size={19} /><strong>{home.squareFeet.toLocaleString()}</strong> sqft</span>
                    <span className="detail-lot-stat"><Icon name="building" size={18} />{home.lotSize}</span>
                  </div>
                </div>

                <section className="detail-section" aria-labelledby="about-home-heading">
                  <div className="section-heading-row">
                    <div>
                      <p className="section-eyebrow">THE GOOD STUFF</p>
                      <h2 id="about-home-heading">A little more about this home</h2>
                    </div>
                    <span className="year-built">Built {home.yearBuilt}</span>
                  </div>
                  <p className="detail-description">{home.description}</p>
                  <div className="highlight-grid">
                    {home.highlights.map((highlight) => (
                      <span key={highlight}><i><Icon name="check" size={14} /></i>{highlight}</span>
                    ))}
                  </div>
                  <div className="facts-grid">
                    <div><span>Home type</span><strong>{home.propertyType}</strong></div>
                    <div><span>Year built</span><strong>{home.yearBuilt}</strong></div>
                    <div><span>Lot size</span><strong>{home.lotSize}</strong></div>
                    <div><span>Availability</span><strong>Sample listing</strong></div>
                  </div>
                </section>

                <section className="detail-section history-section" aria-labelledby="price-history-heading">
                  <div className="section-heading-row">
                    <div>
                      <p className="section-eyebrow">THE STORY SO FAR</p>
                      <h2 id="price-history-heading">{isRental ? "Rent history" : "Price & tax history"}</h2>
                    </div>
                    <span className="history-currency">USD</span>
                  </div>
                  <div className="history-chart-card">
                    <div className="history-chart-topline">
                      <span>{isRental ? "Monthly rent over time" : "Sale price over time"}</span>
                      <strong>{money.format(home.price)}</strong>
                    </div>
                    <svg className="price-chart" viewBox="0 0 440 210" role="img" aria-label={`Price history for ${home.address}`}>
                      <defs>
                        <linearGradient id={`chart-fill-${home.id}`} x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#82a99b" stopOpacity=".30" />
                          <stop offset="100%" stopColor="#82a99b" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {[54, 94, 134, 174].map((line) => <line key={line} x1="30" x2="410" y1={line} y2={line} className="chart-grid-line" />)}
                      <path d={chartArea} fill={`url(#chart-fill-${home.id})`} />
                      <path d={chartLine} className="chart-line" />
                      {chartPoints.map((point) => (
                        <circle key={point.id} cx={point.x} cy={point.y} r="4.5" className="chart-dot">
                          <title>{prettyDate(point.eventDate)}: {money.format(point.price)}</title>
                        </circle>
                      ))}
                    </svg>
                    <div className="history-chart-years">
                      <span>{orderedHistory[0] ? prettyDate(orderedHistory[0].eventDate) : ""}</span>
                      <span>{orderedHistory.at(-1) ? prettyDate(orderedHistory.at(-1)!.eventDate) : ""}</span>
                    </div>
                  </div>
                  <div className="history-table" role="table" aria-label="Home price history">
                    <div className="history-table-header" role="row"><span role="columnheader">Date</span><span role="columnheader">Event</span><span role="columnheader">Price</span></div>
                    {[...home.history].sort((left, right) => right.eventDate.localeCompare(left.eventDate)).map((entry) => (
                      <div className="history-table-row" role="row" key={entry.id}>
                        <span role="cell">{prettyDate(entry.eventDate)}</span>
                        <span role="cell">{entry.event}</span>
                        <strong role="cell">{money.format(entry.price)}</strong>
                      </div>
                    ))}
                  </div>
                  <p className="tiny-disclaimer">Price history is provided for context and may not include every transaction.</p>
                </section>

                {home.taxHistory.length > 0 && <section className="detail-section"><h2>Property tax history</h2><table className="tax-table"><thead><tr><th>Year</th><th>Annual tax</th><th>Assessment</th></tr></thead><tbody>{home.taxHistory.map(entry => <tr key={entry.year}><td>{entry.year}</td><td>{money.format(entry.tax)}</td><td>{money.format(entry.assessment)}</td></tr>)}</tbody></table></section>}
                <section className="detail-section"><h2>Interior & practical details</h2><div className="highlight-grid">{home.interior.map((item, i) => <span key={i}><Icon name="check" size={14} />{item}</span>)}</div><h3>Nearby cities & estimated drive times</h3><div className="highlight-grid">{home.nearbyCities.map(city => <span key={city.name}>{city.name} · {city.time}</span>)}</div></section>
                <section className="detail-section schools-section" aria-labelledby="nearby-schools-heading">
                  <div className="section-heading-row">
                    <div>
                      <p className="section-eyebrow">AROUND THE CORNER</p>
                      <h2 id="nearby-schools-heading">Nearby schools</h2>
                    </div>
                    <span className="school-rating-note">Ratings are out of 10</span>
                  </div>
                  <div className="school-list">
                    {home.schools.map((school) => (
                      <div className="school-row" key={school.id}>
                        <span className="school-score">{school.rating.toFixed(0)}<small>/10</small></span>
                        <div className="school-info"><strong>{school.name}</strong><span>Confirm grades and enrollment with the district</span></div>
                        <span className="school-distance">{school.distance}</span>
                      </div>
                    ))}
                  </div>
                  <p className="tiny-disclaimer">School information is an estimate. Confirm enrollment boundaries with the district.</p>
                </section>
              </div>

              <aside className="detail-sidebar">
                <div className="mortgage-card">
                  {!isRental ? <>
                  <p className="section-eyebrow">A HELPFUL STARTING POINT</p>
                  <h2>Make the numbers feel real.</h2>
                  <div className="monthly-total"><strong>{money.format(payment.total)}</strong><span>/ month est.</span></div>
                  <div className="calculator-control">
                    <label htmlFor="down-payment">Down payment <strong>{downPercent}% · {money.format(home.price * downPercent / 100)}</strong></label>
                    <input id="down-payment" type="range" min="5" max="50" step="5" value={downPercent} onChange={(event) => setDownPercent(Number(event.target.value))} />
                    <div className="range-ends"><span>5%</span><span>50%</span></div>
                  </div>
                  <div className="calculator-control rate-control">
                    <label htmlFor="interest-rate">Interest rate <strong>{interestRate.toFixed(2)}%</strong></label>
                    <input id="interest-rate" type="range" min="4" max="9" step="0.125" value={interestRate} onChange={(event) => setInterestRate(Number(event.target.value))} />
                    <div className="range-ends"><span>4%</span><span>9%</span></div>
                  </div>
                  <div className="payment-breakdown">
                    <div><span>Principal & interest</span><strong>{money.format(payment.principalAndInterest)}</strong></div>
                    <div><span>Property taxes</span><strong>{money.format(home.monthlyTax)}</strong></div>
                    <div><span>Home insurance</span><strong>{money.format(payment.insurance)}</strong></div>
                    {home.hoaMonthly > 0 && <div><span>HOA fees</span><strong>{money.format(home.hoaMonthly)}</strong></div>}
                  </div>
                  <p className="mortgage-disclaimer">Estimate assumes a 30-year fixed loan. Taxes and insurance are estimates; actual terms vary.</p>
                  </> : <><p className="section-eyebrow">YOUR NEXT CHAPTER</p><h2>A place to settle in.</h2><div className="monthly-total"><strong>{money.format(home.price)}</strong><span>/ month rent</span></div><p className="mortgage-disclaimer">Rent shown excludes any deposit, utilities, or additional fees. Confirm terms and availability with the listing agent.</p></>}
                  <button type="button" className="tour-cta" onClick={() => { setTourOpen((open) => !open); setTourSubmitted(false); setTourMessage(""); }}>
                    <Icon name="calendar" size={18} /> {tourOpen ? "Close tour planner" : "Plan a private tour"}
                  </button>
                  <p className="tour-helper"><Icon name="clock" size={14} /> No pressure. Just come see if it feels right.</p>
                  {tourOpen && (
                    <div className="tour-form-wrap">
                      {tourSubmitted ? (
                        <div className="tour-success" role="status">
                          <span className="tour-success-icon"><Icon name="check" size={18} /></span>
                          <strong>Your plan is saved.</strong>
                          <p>{tourMessage}</p>
                          <button type="button" className="quiet-action" onClick={() => { setTourSubmitted(false); setTourMessage(""); }}>Plan another time</button>
                        </div>
                      ) : (
                        <form className="tour-form" onSubmit={requestTour}>
                          <div className="tour-form-heading"><strong>Plan a time to take a look</strong><span>Saved on this device only; not sent to an agent. Your last plan fills this form.</span></div>
                          <label htmlFor="tour-date">Preferred date</label>
                          <input id="tour-date" type="date" min={today} value={tourDate} onChange={(event) => setTourDate(event.target.value)} required />
                          <label htmlFor="tour-time">A time that works</label>
                          <select id="tour-time" value={tourTime} onChange={(event) => setTourTime(event.target.value)} required>
                            {tourTimes.map((time) => <option key={time} value={time}>{time}</option>)}
                          </select>
                          <label htmlFor="tour-name">Your name</label>
                          <input id="tour-name" autoComplete="name" value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="First and last name" required minLength={2} maxLength={100} />
                          <label htmlFor="tour-email">Email address</label>
                          <input id="tour-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required maxLength={254} />
                          <label htmlFor="tour-phone">Phone <span>(optional)</span></label>
                          <input id="tour-phone" type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="(206) 555-0123" maxLength={30} />
                          <label htmlFor="tour-note">Anything you'd like us to know? <span>(optional)</span></label>
                          <textarea id="tour-note" value={note} onChange={(event) => setNote(event.target.value)} rows={2} maxLength={500} placeholder="A question about the home, or what you're looking for..." />
                          {tourMessage && <p className="tour-error" role="alert">{tourMessage}</p>}
                          <button type="submit" className="tour-submit" disabled={tourSubmitting}>
                            {tourSubmitting ? "Saving your plan…" : "Save tour plan"}
                            {!tourSubmitting && <Icon name="arrow" size={17} />}
                          </button>
                          <p className="tour-privacy">This demo stores your plan locally in this browser. Contact the listing agent separately to book.</p>
                        </form>
                      )}
                    </div>
                  )}
                </div>
                <div className="local-advisor-card">
                  <div className="advisor-mark"><Icon name="sparkle" size={18} /></div>
                  <div><strong>Have a question?</strong><p>Keep your questions in a local tour plan for when you contact the listing agent.</p></div>
                  <button type="button" aria-label="Open the local tour planner" onClick={() => { setTourOpen(true); setTourMessage(""); }}><Icon name="arrow-up" size={17} /></button>
                </div>
                <div className="detail-safe-note"><Icon name="shield" size={17} /><span>Your home search is private. Save this place to come back whenever you like.</span></div>
              </aside>
            </div>
            <div className="detail-bottom-note"><Icon name="info" size={15} /> Listing details, availability, and school information should be independently verified.</div>
          </div>
        </div>
      </section>
    </div>
  );
}
