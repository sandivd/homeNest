import PropertyImage from "./property-image";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { PremiumHeader, type HeaderProps } from "./premium-header";
import Icon from "./icons";
import PropertyDetailDialog from "./property-detail-dialog";
import type { HomeListing } from "../data/listings";

type FilterPanel = "price" | "beds" | "type" | "more" | null;
type SortOrder = "recommended" | "price-low" | "price-high";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function estimatedMonthly(home: HomeListing) {
  const principal = home.price * 0.8;
  const monthlyRate = 0.065 / 12;
  const months = 360;
  const mortgage = (principal * (monthlyRate * (1 + monthlyRate) ** months)) / ((1 + monthlyRate) ** months - 1);
  if (home.listingType === "rent") return home.price;
  return mortgage + home.monthlyTax + home.hoaMonthly + (home.price * 0.0035) / 12;
}

function shortPrice(price: number) {
  return price >= 1_000_000 ? `$${(price / 1_000_000).toFixed(price >= 10_000_000 ? 0 : 2).replace(/0+$/, "").replace(/\.$/, "")}m` : `$${Math.round(price / 1_000)}k`;
}

function ListingCard({
  home,
  isSaved,
  selected,
  onOpen,
  onToggleSave,
}: {
  home: HomeListing;
  isSaved: boolean;
  selected: boolean;
  onOpen: () => void;
  onToggleSave: () => void;
}) {
  return (
    <article id={`listing-card-${home.id}`} className={`listing-card ${selected ? "listing-card-selected" : ""}`}>
      <div className="listing-photo-wrap">
        <button type="button" className="listing-photo-button" onClick={onOpen} aria-label={`View ${home.address}`}>
          <PropertyImage src={home.imageUrl} alt={home.imageAlt} loading="lazy" />
        </button>
        <div className="photo-topline">
          {home.featuredLabel ? <span className={`listing-badge ${home.featuredLabel.toLowerCase().includes("price") ? "badge-warm" : ""}`}>{home.featuredLabel}</span> : <span />}
          <button
            type="button"
            className={`favorite-button ${isSaved ? "is-saved" : ""}`}
            onClick={onToggleSave}
            aria-label={isSaved ? `Remove ${home.address} from saved homes` : `Save ${home.address}`}
            aria-pressed={isSaved}
          >
            <Icon name="heart" size={19} />
          </button>
        </div>
        <span className="photo-count"><span className="photo-count-dots">● ● ●</span> Listing photo</span>
      </div>
      <div className="listing-card-body">
        <div className="card-price-row">
          <strong className="card-price">{money.format(home.price)}{home.listingType === "rent" && <small>/mo</small>}</strong>
          <span className="card-status"><i /> {home.status}</span>
        </div>
        <button type="button" className="card-address-button" onClick={onOpen}>{home.address}</button>
        <p className="card-city">{home.city}, {home.state} {home.zipCode}</p>
        <div className="card-specs" aria-label={`${home.bedrooms} bedrooms, ${home.bathrooms} bathrooms, ${home.squareFeet.toLocaleString()} square feet`}>
          <span><Icon name="bed" size={16} /><strong>{home.bedrooms}</strong><small>beds</small></span>
          <span><Icon name="bath" size={16} /><strong>{home.bathrooms}</strong><small>baths</small></span>
          <span><Icon name="area" size={16} /><strong>{home.squareFeet.toLocaleString()}</strong><small>sqft</small></span>
        </div>
        <div className="card-divider" />
        <div className="card-bottom-row">
          <div className="monthly-estimate"><strong>{money.format(estimatedMonthly(home))}<small>/mo</small></strong><span>{home.listingType === "rent" ? "monthly rent" : "est. monthly payment"}</span></div>
          <button type="button" className="card-open-link" onClick={onOpen} aria-label={`See details for ${home.address}`}>
            <Icon name="arrow-up" size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}

function NeighborhoodMap({
  homes,
  activeId,
  onSelect,
}: {
  homes: HomeListing[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const cities = Array.from(new Set(homes.map(h => h.city)));
  return <aside className="listing-map-pane" aria-label="Illustrative location overview">
    <div className="map-panel-heading"><strong>Explore by location</strong><span>Illustrative overview</span></div>
    <div className="location-overview">{cities.map(city => <div className="location-cluster" key={city}><Icon name="pin" /><strong>{city}</strong><div>{homes.filter(h => h.city === city).map(home => <button key={home.id} type="button" className={`location-price ${activeId === home.id ? "selected" : ""}`} aria-label={`Highlight ${home.address}`} onClick={() => onSelect(home.id)}>{shortPrice(home.price)}</button>)}</div></div>)}</div>
    <div className="map-footer">{homes.length} homes · Schematic city groups, not a geographic map</div>
  </aside>;
}

export default function HomeSearchExperience({ homes, ...headerProps }: { homes: HomeListing[] } & HeaderProps) {
  const [query, setQuery] = useState("");
  const [appliedQuery, setAppliedQuery] = useState("");
  const [filterPanel, setFilterPanel] = useState<FilterPanel>(null);
  const [maxPrice, setMaxPrice] = useState("any");
  const [minimumBeds, setMinimumBeds] = useState("any");
  const [homeType, setHomeType] = useState("any");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [priceImprovedOnly, setPriceImprovedOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>("recommended");
  const [showMap, setShowMap] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [activeMapId, setActiveMapId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(() => new Set());

  const [selectedHome, setSelectedHome] = useState<HomeListing | null>(null);
  const [toast, setToast] = useState("");


  const [searchParams, setSearchParams] = useSearchParams();
  const closeDetails = useCallback(() => { setSelectedHome(null); setSearchParams({}, { replace: true }); }, [setSearchParams]);
  const homeId = searchParams.get("home");
  useEffect(() => { setSelectedHome(homes.find(home => home.id === homeId) ?? null); }, [homeId, homes]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem("homenest-saved-homes") || "[]");
      if (Array.isArray(parsed)) setSavedIds(new Set(parsed.filter((id): id is string => typeof id === "string")));
    } catch { /* Keep favorites available in memory. */ }
  }, []);

  const visibleHomes = useMemo(() => {
    const searchParts = appliedQuery.toLowerCase().replace(/,/g, " ").split(/\s+/).filter(Boolean);
    const filtered = homes.filter((home) => {
      const searchable = `${home.address} ${home.city} ${home.state} ${home.zipCode} ${home.propertyType}`.toLowerCase();
      const label = home.featuredLabel?.toLowerCase() ?? "";
      if (searchParts.some((part) => !searchable.includes(part))) return false;
      if (maxPrice !== "any" && home.price > Number(maxPrice)) return false;
      if (minimumBeds !== "any" && home.bedrooms < Number(minimumBeds)) return false;
      if (homeType !== "any" && home.propertyType !== homeType) return false;
      if (featuredOnly && !label.includes("featured")) return false;
      if (priceImprovedOnly && !(home.history.length > 1 && [...home.history].sort((a,b) => b.eventDate.localeCompare(a.eventDate))[0].price < [...home.history].sort((a,b) => b.eventDate.localeCompare(a.eventDate))[1].price)) return false;
      if (showSavedOnly && !savedIds.has(home.id)) return false;
      return true;
    });
    return filtered.sort((left, right) => {
      if (sortOrder === "price-low") return left.price - right.price;
      if (sortOrder === "price-high") return right.price - left.price;
      return left.daysOnMarket - right.daysOnMarket;
    });
  }, [homes, appliedQuery, maxPrice, minimumBeds, homeType, featuredOnly, priceImprovedOnly, showSavedOnly, savedIds, sortOrder]);

  function notify(message: string) {
    setToast(message);
  }

  function runSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAppliedQuery(query.trim());
    setShowSavedOnly(false);
    setFilterPanel(null);
    document.getElementById("homes")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function choosePlace(place: string) {
    setQuery(place);
    setAppliedQuery(place);
    setShowSavedOnly(false);
    document.getElementById("homes")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function toggleSavedHomes() {
    setShowSavedOnly((current) => !current);
    document.getElementById("homes")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function toggleFavorite(listingId: string) {
    const alreadySaved = savedIds.has(listingId);
    setSavedIds((current) => {
      const updated = new Set(current);
      if (alreadySaved) updated.delete(listingId);
      else updated.add(listingId);
      try {
        window.localStorage.setItem("homenest-saved-homes", JSON.stringify(Array.from(updated)));
      } catch {
        // The in-memory state remains available for this visit.
      }
      return updated;
    });
    notify(alreadySaved ? "Removed from saved homes" : "Saved for later");

  }

  function openHome(home: HomeListing) {
    setSelectedHome(home);
    setSearchParams({ home: home.id });
  }

  function chooseMapHome(listingId: string) {
    setActiveMapId(listingId);
    window.setTimeout(() => {
      document.getElementById(`listing-card-${listingId}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 80);
  }

  const activeFilterCount = Number(maxPrice !== "any") + Number(minimumBeds !== "any") + Number(homeType !== "any") + Number(featuredOnly) + Number(priceImprovedOnly);

  return (
    <div className="site-page" id="top">
      <PremiumHeader {...headerProps} savedCount={savedIds.size} showSavedOnly={showSavedOnly} onToggleSaved={toggleSavedHomes} />

      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="hero-eyebrow"><span className="eyebrow-mark" /> A HOME SEARCH THAT FEELS DIFFERENT</div>
              <h1 id="hero-title">More than a place.<br /><em>A way to feel.</em></h1>
              <p className="hero-description">Find a home that fits the life you're making. Thoughtful listings, honest numbers, and a little more room to imagine.</p>
              <div className="hero-quick-facts">
                <span><i className="fact-icon"><Icon name="check" size={13} /></i> Carefully chosen homes</span>
                <span><i className="fact-icon"><Icon name="check" size={13} /></i> Clear monthly estimates</span>
              </div>
            </div>
            <div className="hero-visual">
              <PropertyImage
                src="https://images.pexels.com/photos/7031607/pexels-photo-7031607.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600&h=1200"
                alt="Sunlit contemporary home with glass doors, green garden, and an inviting outdoor path"
                fetchPriority="high"
              />
              <div className="hero-photo-shade" />
              <span className="hero-image-label"><i /> A QUIETER KIND OF SEARCH</span>
              <div className="hero-quote-card"><span className="quote-sparkle"><Icon name="sparkle" size={17} /></span><p>“It felt like ours before we even walked in.”</p><span>— A GOOD KIND OF FIRST IMPRESSION</span></div>
              <div className="hero-photo-caption"><span>Find your next chapter with HomeNest</span><Icon name="arrow-up" size={16} /></div>
            </div>
          </div>
          <div className="hero-grain" aria-hidden="true" />
        </section>

        <div className="search-stage">
          <form className="hero-search-card" onSubmit={runSearch}>
            <div className="search-card-topline"><span>{homes[0]?.listingType === "rent" ? "FIND YOUR NEXT RENTAL" : "LET’S FIND YOUR PLACE"}</span><span><i /> Across the US</span></div>
            <div className="search-card-controls">
              <label className="location-search-field" htmlFor="home-location">
                <span className="location-icon"><Icon name="pin" size={19} /></span>
                <span className="location-field-copy"><span>Where would you like to be?</span><input id="home-location" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="City, neighborhood, ZIP" autoComplete="off" /></span>
              </label>
              <div className="search-control-divider" />
              <button type="submit" className="hero-search-submit"><Icon name="search" size={18} /><span>Find my home</span><Icon name="arrow" size={17} /></button>
            </div>
            <div className="popular-searches"><span>POPULAR AROUND HERE</span>{["San Francisco", "Seattle", "Miami"].map((place) => <button key={place} type="button" onClick={() => choosePlace(place)}>{place}</button>)}</div>
          </form>
        </div>

        <section className="homes-section" id="homes" aria-labelledby="homes-title">
          <div className="content-container">
            <div className="section-topline">
              <div className="section-heading-copy">
                <p className="eyebrow">A THOUGHTFUL PLACE TO BEGIN</p>
                <h2 id="homes-title">{showSavedOnly ? <>Your saved <em>places.</em></> : appliedQuery ? <>Homes near <em>{appliedQuery}</em></> : <>A few worth picturing<br className="desktop-break" /> yourself <em>in.</em></>}</h2>
                <p className="section-intro">Real homes, useful details, and the little things that help a decision feel right.</p>
              </div>
              <div className="results-context">
                <span className="result-dot" />
                <div><strong>{visibleHomes.length} {visibleHomes.length === 1 ? "home" : "homes"}</strong><span>in our collection</span></div>
              </div>
            </div>

            <div className="listing-tools">
              <div className="filter-area">
                <div className="filter-chips" aria-label="Home filters">
                  <button type="button" className={`filter-chip ${maxPrice !== "any" ? "filter-chip-set" : ""}`} onClick={() => setFilterPanel((panel) => panel === "price" ? null : "price")} aria-expanded={filterPanel === "price"}>
                    Price <Icon name="chevron" size={14} />
                  </button>
                  <button type="button" className={`filter-chip ${minimumBeds !== "any" ? "filter-chip-set" : ""}`} onClick={() => setFilterPanel((panel) => panel === "beds" ? null : "beds")} aria-expanded={filterPanel === "beds"}>
                    {minimumBeds === "any" ? "Bedrooms" : `${minimumBeds}+ beds`} <Icon name="chevron" size={14} />
                  </button>
                  <button type="button" className={`filter-chip ${homeType !== "any" ? "filter-chip-set" : ""}`} onClick={() => setFilterPanel((panel) => panel === "type" ? null : "type")} aria-expanded={filterPanel === "type"}>
                    {homeType === "any" ? "Home type" : homeType} <Icon name="chevron" size={14} />
                  </button>
                  <button type="button" className={`filter-chip more-filter-chip ${activeFilterCount > 0 ? "filter-chip-set" : ""}`} onClick={() => setFilterPanel((panel) => panel === "more" ? null : "more")} aria-expanded={filterPanel === "more"}>
                    <Icon name="sliders" size={15} /> More {activeFilterCount > 0 && <span className="filter-count">{activeFilterCount}</span>}
                  </button>
                  {(maxPrice !== "any" || minimumBeds !== "any" || homeType !== "any" || featuredOnly || priceImprovedOnly) && (
                    <button type="button" className="clear-filters" onClick={() => { setMaxPrice("any"); setMinimumBeds("any"); setHomeType("any"); setFeaturedOnly(false); setPriceImprovedOnly(false); }}>
                      Clear all
                    </button>
                  )}
                </div>
                {filterPanel && (
                  <div className="filter-popover" role="group" aria-label="Listing filters">
                    {filterPanel === "price" && <>
                      <div className="popover-heading"><strong>Find your comfortable number</strong><button type="button" onClick={() => setFilterPanel(null)} aria-label="Close price filters"><Icon name="close" size={17} /></button></div>
                      <label htmlFor="max-price-select">Maximum price</label>
                      <select id="max-price-select" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)}>
                        <option value="any">No maximum</option>{(homes[0]?.listingType === "rent" ? [2500, 4000, 6000] : [500000, 900000, 1250000, 1600000]).map(price => <option key={price} value={price}>Up to {money.format(price)}</option>)}
                      </select>
                    </>}
                    {filterPanel === "beds" && <>
                      <div className="popover-heading"><strong>Room to make yourself at home</strong><button type="button" onClick={() => setFilterPanel(null)} aria-label="Close bedroom filters"><Icon name="close" size={17} /></button></div>
                      <span className="popover-label">Bedrooms</span>
                      <div className="choice-row">{["any", "2", "3", "4"].map((value) => <button type="button" key={value} className={minimumBeds === value ? "choice-active" : ""} onClick={() => setMinimumBeds(value)}>{value === "any" ? "Any" : `${value}+`}</button>)}</div>
                    </>}
                    {filterPanel === "type" && <>
                      <div className="popover-heading"><strong>What kind of place?</strong><button type="button" onClick={() => setFilterPanel(null)} aria-label="Close home type filters"><Icon name="close" size={17} /></button></div>
                      <label htmlFor="home-type-select">Property style</label>
                      <select id="home-type-select" value={homeType} onChange={(event) => setHomeType(event.target.value)}><option value="any">Any style</option><option value="Single-family">Single-family</option><option value="Apartment">Apartment</option><option value="Condo">Condo</option></select>
                    </>}
                    {filterPanel === "more" && <>
                      <div className="popover-heading"><strong>The details that matter to you</strong><button type="button" onClick={() => setFilterPanel(null)} aria-label="Close additional filters"><Icon name="close" size={17} /></button></div>
                      <label className="toggle-filter"><span><strong>Featured homes</strong><small>Only show featured listings</small></span><input type="checkbox" checked={featuredOnly} onChange={(event) => setFeaturedOnly(event.target.checked)} /><i /></label>
                      <label className="toggle-filter"><span><strong>Price improvements</strong><small>Show homes with an adjusted asking price</small></span><input type="checkbox" checked={priceImprovedOnly} onChange={(event) => setPriceImprovedOnly(event.target.checked)} /><i /></label>
                    </>}
                    <div className="filter-popover-footer"><span>Filters update your results as you choose.</span><button type="button" onClick={() => setFilterPanel(null)}>Done</button></div>
                  </div>
                )}
              </div>
              <div className="view-sort-tools">
                <label className="sort-select-wrap"><span>Sort:</span><select aria-label="Sort homes" value={sortOrder} onChange={(event) => setSortOrder(event.target.value as SortOrder)}><option value="recommended">Recommended</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select><Icon name="chevron" size={13} /></label>
                <span className="toolbar-divider" />
                <div className="view-switch" role="group" aria-label="Choose listing view">
                  <button type="button" className={!showMap ? "view-active" : ""} onClick={() => setShowMap(false)} aria-pressed={!showMap}><Icon name="list" size={16} /><span>List</span></button>
                  <button type="button" className={showMap ? "view-active" : ""} onClick={() => setShowMap(true)} aria-pressed={showMap}><Icon name="map" size={16} /><span>Map</span></button>
                </div>
              </div>
            </div>

            <div className="results-meta-line" aria-live="polite">
              <span>{showSavedOnly ? "A place to keep the homes you love." : appliedQuery ? `Showing homes matching “${appliedQuery}”` : "A handpicked look at places to call home."}</span>
              <span>{visibleHomes.length} {visibleHomes.length === 1 ? "result" : "results"}</span>
            </div>

            {visibleHomes.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon"><Icon name={showSavedOnly ? "heart" : "search"} size={25} /></span>
                <p className="eyebrow">A LITTLE RESET</p>
                <h3>{showSavedOnly ? "Your list is ready for a first favorite." : "No homes found with those details."}</h3>
                <p>{showSavedOnly ? "Tap the heart on any home that feels promising, and we'll keep it here for you." : "Try another neighborhood or loosen a filter. The right place has a way of showing up."}</p>
                <button type="button" className="text-action" onClick={() => { setAppliedQuery(""); setQuery(""); setShowSavedOnly(false); setMaxPrice("any"); setMinimumBeds("any"); setHomeType("any"); setFeaturedOnly(false); setPriceImprovedOnly(false); }}>Show all homes <Icon name="arrow" size={16} /></button>
              </div>
            ) : showMap ? (
              <div className="results-map-layout">
                <div className="map-list-column">
                  <div className="map-list-topline"><span>{visibleHomes.length} homes on the map</span><button type="button" onClick={() => { setShowMap(false); setActiveMapId(null); }}>Back to full list <Icon name="arrow" size={14} /></button></div>
                  <div className="listing-grid listing-grid-map">
                    {visibleHomes.map((home) => <ListingCard key={home.id} home={home} isSaved={savedIds.has(home.id)} selected={activeMapId === home.id} onOpen={() => openHome(home)} onToggleSave={() => toggleFavorite(home.id)} />)}
                  </div>
                </div>
                <NeighborhoodMap homes={visibleHomes} activeId={activeMapId} onSelect={chooseMapHome} />
              </div>
            ) : (
              <div className="listing-grid listing-grid-default">
                {visibleHomes.map((home) => <ListingCard key={home.id} home={home} isSaved={savedIds.has(home.id)} selected={false} onOpen={() => openHome(home)} onToggleSave={() => toggleFavorite(home.id)} />)}
              </div>
            )}

            <div className="market-note" id="market-note">
              <div className="market-note-icon"><Icon name="sparkle" size={21} /></div>
              <div><span>A NOTE ON THE NUMBERS</span><p>Monthly payments are estimates, not a loan offer. We use a 30-year fixed-rate assumption and include estimated taxes and insurance to help you compare thoughtfully.</p></div>
              <button type="button" onClick={() => notify("Open a home to explore its payment estimate.")}>How estimates work <Icon name="arrow-up" size={15} /></button>
            </div>
          </div>
        </section>

        <section className="neighborhood-section" id="neighborhoods" aria-labelledby="neighborhood-title">
          <div className="content-container neighborhood-inner">
            <div><p className="eyebrow">A FEEL FOR THE PLACE</p><h2 id="neighborhood-title">Different corners.<br /><em>Different kinds of home.</em></h2></div>
            <div className="neighborhood-links">
              {[{ name: "Seattle", note: "City energy, neighborhood soul" }, { name: "San Francisco", note: "City life, a place of your own" }, { name: "Miami", note: "A little sun, a little breathing room" }].map((place) => <button key={place.name} type="button" onClick={() => choosePlace(place.name)}><span><strong>{place.name}</strong><small>{place.note}</small></span><Icon name="arrow-up" size={17} /></button>)}
            </div>
          </div>
        </section>

        <section className="sell-section" id="sell">
          <div className="sell-inner content-container">
            <div className="sell-orbit" aria-hidden="true"><span /><span /><Icon name="home" size={29} /></div>
            <div><p className="eyebrow">WHEN IT'S TIME FOR WHAT'S NEXT</p><h2>Good moves start<br />with <em>good people.</em></h2><p>Whether you're finding your first home or getting ready for a next chapter, we can help you make a move that feels like yours.</p></div>
            <a className="sell-link" href="#/mortgage">Explore mortgage options <Icon name="arrow" size={17} /></a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner content-container">
          <button type="button" className="brand-lockup footer-brand" onClick={() => document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })}><span className="brand-symbol"><Icon name="home" size={17} /></span><span>HomeNest<span className="brand-period">.</span></span></button>
          <p>Find the place that feels like your own.</p>
          <div className="footer-links"><button type="button" onClick={() => document.getElementById("homes")?.scrollIntoView({ behavior: "smooth" })}>Explore homes</button><button type="button" onClick={() => document.getElementById("neighborhoods")?.scrollIntoView({ behavior: "smooth" })}>Neighborhoods</button><button type="button" onClick={() => document.getElementById("sell")?.scrollIntoView({ behavior: "smooth" })}>Say hello</button></div>
        </div>
        <div className="footer-legal content-container"><span>© {new Date().getFullYear()} HomeNest. Made for the next chapter.</span><span>Illustrative listings · Verify home details, availability, and estimates independently.</span></div>
      </footer>

      {selectedHome && <PropertyDetailDialog key={selectedHome.id} home={selectedHome} isSaved={savedIds.has(selectedHome.id)} onClose={closeDetails} onToggleSave={() => toggleFavorite(selectedHome.id)} onToast={notify} />}
      <div className={`toast-message ${toast ? "toast-visible" : ""}`} role="status" aria-live="polite"><span className="toast-check"><Icon name="check" size={15} /></span>{toast}</div>
    </div>
  );
}
