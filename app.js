(() => {
  "use strict";
  const D = window.JGA_DATA;
  const root = document.getElementById("content");
  const routeBase = () => (location.hash.replace(/^#\/?/, "").split("/")[0] || "overview");
  const escape = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const pct = (n, total=16) => `${(n * 100 / total).toFixed(1)}%`;
  const k = s => `<div class="kicker">${escape(s)}</div>`;
  const pill = (text, kind="") => `<span class="pill ${kind}">${escape(text)}</span>`;
  const editorial = (number, kicker, title, note="") => `<div class="split-heading" style="margin-bottom:37px"><div>${k(`${number} / ${kicker}`)}</div><div><h2>${title}</h2>${note ? `<p class="intro-note">${escape(note)}</p>` : ""}</div></div>`;
  const btn = (text,href) => `<a class="section-cta" href="${href}">${escape(text)} <span class="cta-arrow" aria-hidden="true">↗</span></a>`;
  const note = (text) => `<div class="note"><strong>Research status.</strong> ${escape(text)}</div>`;
  const bar = (name,val,denom=44,href=null,muted=false) => `<${href?"a":"div"} class="bar-row" ${href?`href="${escape(href)}"`:""} aria-label="${escape(name)}: ${val} out of ${denom}"><span class="bar-label">${escape(name)}</span><span class="bar-track"><span class="bar-fill ${muted?"muted-bar":""}" style="display:block;width:${val / denom * 100}%"></span></span><span class="bar-value">${val} / ${denom}</span></${href?"a":"div"}>`;
  const titleHero = (eyebrow,title,summary) => `<section class="page-hero"><div class="page-hero-inner">${k(eyebrow)}<h1>${title}</h1><p>${escape(summary)}</p><div class="hero-utility">${pill("Round 1 / provisional","warn")}${pill("Research collected 18–20 Oct 2026")}</div></div></section>`;
  function setActive() {
    const active = routeBase();
    document.querySelectorAll("[data-nav]").forEach(a=>{const current=a.dataset.nav===active;a.classList.toggle("active",current);if(current)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");});
    const toggle=document.getElementById("mobile-toggle"),mobile=document.getElementById("mobile-nav");
    toggle.setAttribute("aria-expanded","false");mobile.hidden=true;
  }
  function metric(label,value,foot="",accent=false) {return `<div class="metric ${accent?"accent":""}"><span class="metric-label">${escape(label)}</span><strong>${escape(value)}</strong><span class="metric-foot">${escape(foot)}</span></div>`;}
  function overview(){
    return `<section class="hero"><div class="hero-inner"><div class="hero-top"><span class="hero-label">The AI recommendation landscape</span><span class="hero-issue">A RESEARCH REPORT · ISSUE 01 / 2026</span></div><div class="hero-main"><h1>Where AI<br>recommends <span class="serif">JGA.</span></h1><p class="hero-sub">And where it doesn't. An evidence-led look at how employers discover payroll recruiters across ChatGPT, Gemini, Perplexity and Claude.</p><div class="hero-utility">${pill("176 first-pass responses","good")}${pill("11 buyer situations")}${pill("Provisional analysis","warn")}</div></div><div class="hero-bottom"><a class="hero-scroll" href="#findings"><span class="round-arrow" aria-hidden="true">↘</span> Explore the findings</a><span class="hero-note">Prepared for JGA Recruitment Group.<br>18–20 October 2026 · Riseklix Media</span></div></div></section>
    <section class="section section-border" id="findings">${editorial("01","The overview","A strong UK foundation.<br><span class='serif'>A more uneven</span> specialist picture.","The first pass reveals where JGA enters hiring shortlists consistently—and where competitors are recommended more often.")}
      <div class="metric-grid">${metric("JGA recommended","109","of 176 selected responses",true)}${metric("First-pass coverage","176 / 176","one run per exact prompt and tool")}${metric("Buyer situations","11","44 unique questions")}${metric("Final target","352","two independent runs per tool")}</div>
      <div style="margin-top:22px">${note("These are selected first-pass, internally classified observations—not the completed benchmark. Two historical pilot duplicates are excluded; scoring and citations remain under review.")}</div>
    </section>
    <section class="section section-border">${editorial("02","The findings","Three things the first pass <span class='serif'>makes clear.</span>")}
      <div class="findings">
        <a class="finding featured" href="#/situations/S11"><div class="finding-n">01 / CORE STRENGTH</div><div><h3>Every selected growth-hire answer recommended JGA.</h3><p>16 of 16 answers for a UK Senior Payroll Specialist joining a small, growing team.</p></div><div class="arrow-corner">↗</div></a>
        <a class="finding" href="#/situations/S03"><div class="finding-n">02 / CLEAR WEAKNESS</div><div><h3>US domestic hiring is a different story.</h3><p>JGA: 3/16. Robert Half: 13/16 in this selected situation.</p></div><div class="arrow-corner">↗</div></a>
        <a class="finding" href="#/situations/S02"><div class="finding-n">03 / COMPETITIVE GAP</div><div><h3>Confidential search is less consistent.</h3><p>JGA: 6/16. Frazer Jones: 14/16 in a discreet senior replacement search.</p></div><div class="arrow-corner">↗</div></a>
      </div>
    </section>
    <section class="section section-border">${editorial("03","Four AI products","Visibility changes depending on <span class='serif'>where buyers ask.</span>","Each product was presented with the same 44 question wordings in the selected first pass.")}
      <div class="chart-box"><div class="chart-heading"><div><h3>JGA recommendations by platform</h3><p>Responses explicitly recommending JGA. Each tool has 44 selected first-pass answers; differences may reflect product behaviour and collection conditions.</p></div><div class="mini-key">Recommended answers</div></div><div class="bars">${D.tools.map(t=>bar(t.id,t.count,44,"#/methodology")).join("")}</div><p class="chart-foot">Each bar links to the methodology. More granular response-level exploration will arrive with the reviewed evidence import.</p></div>
    </section>
    <section class="section section-border">${editorial("04","Hiring situations","Not all buyer questions <span class='serif'>are equal.</span>","All 11 situations are shown below. Select any row to inspect JGA's provisional performance, leading competitors and proposed investigation areas.")}
      <div class="chart-box"><div class="chart-heading"><div><h3>Where JGA entered the shortlist</h3><p>Each situation comprises four prompt types across four products: 16 first-pass answers.</p></div><div class="mini-key">JGA recommended</div></div>${heatmap(D.situations)}<p class="chart-foot">Dark cells show the aggregate count of recommendations for each situation, not individual model runs. Exact question-level evidence is still being prepared for client release.</p></div>${btn("Explore all hiring situations","#/situations")}
    </section>
    <section class="section section-border">${editorial("05","Competitive context","Some firms appear <span class='serif'>far more often</span> in certain decisions.","In the selected question set, Frazer Jones led total observed shortlist appearances; Robert Half was especially prominent for the US domestic appointment.")}
      <div class="chart-box"><div class="chart-heading"><div><h3>Recruiter appearances across 176 answers</h3><p>Multiple recruiters can appear in one answer. These are not exclusive market shares or a general ranking of recruitment quality.</p></div></div><div class="bars">${D.competitors.map(c=>bar(c.name,c.hits,176,"#/competitors")).join("")}</div><p class="chart-foot">Based on original working-graph classifications; independent review pending.</p></div>${btn("Compare the recruiters","#/competitors")}
    </section>
    <section class="section section-border">${editorial("06","So what","The research only matters if it <span class='serif'>changes a decision.</span>")}
      <div class="statements"><div class="statement">${k("01 / US POSITIONING")}<h3>Investigate US-specific recruitment proof.</h3><p>JGA's presence in the US does not consistently translate into domestic US Payroll Director recommendations in this first pass.</p><a class="back-link" href="#/actions">See the recommendation ↗</a></div><div class="statement">${k("02 / CONFIDENTIAL SEARCH")}<h3>Make specialist executive-search evidence easier to verify.</h3><p>Confidential leadership and interim succession scenarios show stronger competing shortlist appearances.</p><a class="back-link" href="#/actions">See the recommendation ↗</a></div><div class="statement">${k("03 / CORE HIRING")}<h3>Protect what currently works.</h3><p>Routine UK replacement and growth hiring are strengths in this sample. Understand the supporting evidence before changing it.</p><a class="back-link" href="#/actions">See the recommendation ↗</a></div></div>${btn("Read the action plan","#/actions")}
    </section>
    <section class="section tight"><div class="split-heading"><div>${k("07 / Research transparency")}</div><div><h2>Follow the evidence.<br><span class="serif">Not just the headline.</span></h2><p class="intro-note">See the original research method, recorded source-domain patterns and the planned full response archive. This working site shows clearly what is and isn't ready.</p>${btn("Method & evidence","#/methodology")}</div></div></section>`;
  }
  function heatmap(rows) {
    return `<div class="heatmap" role="list" aria-label="JGA recommendations by hiring situation">${rows.map(s=>`<a class="heatrow" role="listitem" href="#/situations/${s.id}" aria-label="${escape(s.id+" "+s.name+": "+s.hits+" of 16 recommendations")}"><span class="heatid">${s.id}</span><span class="heatname">${escape(s.name)}</span><span class="heatcells" aria-hidden="true">${Array.from({length:16},(_,i)=>`<i class="${i<s.hits?"on":""}"></i>`).join("")}</span><span class="heatvalue">${s.hits}/16</span></a>`).join("")}</div>`;
  }
  function situations() {
    return titleHero("02 / Buyer-situation analysis","What happens when employers <span class='serif'>ask for a recruiter?</span>","Eleven real-world hiring decisions—from routine UK replacements to global leadership and a US domestic appointment.")
      + `<section class="section tight"><div class="filter-line"><input id="situation-search" class="search-input" type="search" placeholder="Search hiring situations" aria-label="Search hiring situations"><select id="region-filter" class="filter-select" aria-label="Filter by country"><option value="all">All regions</option><option value="UK">UK scenarios</option><option value="US">US scenarios</option></select><select id="sort-filter" class="filter-select" aria-label="Sort situations"><option value="order">Study order</option><option value="low">Fewest recommendations first</option><option value="high">Most recommendations first</option></select></div><div id="situation-cards" class="items-grid"></div><div style="margin-top:24px">${note("Each card shows recommendations among 16 selected first-pass responses. Regional controls reflect recorded collection conditions, not identical model interpretation.")}</div></section>`;
  }
  function situationCards(rows){
    return rows.map(s=>`<a class="item-card" href="#/situations/${s.id}"><div class="card-head"><span class="eyebrow">${s.id} / ${escape(s.region)}</span><span class="tag ${s.hits<8?"attention":""}">${s.hits<8?"Lower frequency":s.hits>=13?"Strong observed":"Mixed"}</span></div><h3>${escape(s.name)}</h3><p>${escape(s.summary)}</p><div class="card-bottom"><span class="big-number">${s.hits}<small>/16</small></span><span aria-hidden="true" style="font-size:23px">↗</span></div></a>`).join("");
  }
  function detail(s){
    const comps=Object.entries(s.competitors).sort((a,b)=>b[1]-a[1]);
    return `<div class="page-top"><a href="#/situations" class="back-link">← All hiring situations</a></div>${titleHero(`Buyer situation ${s.id} / ${s.region}`,escape(s.name),s.summary)}
      <section class="section tight"><div class="detail-grid"><div class="stack"><div class="surface"><div class="chapter-head"><div>${k("First-pass recommendation frequency")}<h2 style="margin-top:12px">JGA: ${s.hits} of 16 answers</h2></div>${pill(pct(s.hits),"good")}</div><div class="bars">${bar("JGA",s.hits,16)}${comps.map(([name,n])=>bar(name,n,16,null,true)).join("")}</div><p class="chart-foot">The same response can recommend several recruiters. Counts do not imply exclusive share or relative recruiting quality.</p></div><div class="surface"><h2>Four exact hiring questions</h2><p>Each question was checked once in each of the four AI products during the selected first pass. Select one to compare recorded outcomes by platform.</p><ul class="list-clean">${(window.JGA_QUESTION_BANK||[]).filter(q=>q[0].startsWith(s.id)).map(q=>`<li><a href="#/evidence/${q[0]}">${q[0]} · ${escape(q[2].slice(0,108))}${q[2].length>108?"…":""} ↗</a></li>`).join("")}</ul></div><div class="surface"><h2>What this situation tests</h2><p>${escape(s.summary)}</p><h3>What to investigate</h3><p>${escape(s.focus)}</p><div class="note"><strong>Interpretation limit.</strong> These are possible areas to investigate, not established reasons why individual AI models selected or omitted a company.</div></div></div><aside class="stack"><div class="surface"><div class="side-stat"><strong>${pct(s.hits)}</strong><span>JGA recommendation frequency in this selected situation</span></div><div style="margin-top:22px">${k("Research design")}<ul class="list-clean"><li>4 question variants</li><li>4 AI products</li><li>1 selected run per question/product</li><li>16 selected responses</li><li>Second round not yet included</li></ul></div></div><div class="surface"><h3>Related proposed actions</h3><ul class="list-clean">${D.actions.filter(a=>a.ids.includes(s.id)).map(a=>`<li><a href="#/actions">${escape(a.title)} ↗</a></li>`).join("") || "<li>Cross-cutting research and source review</li>"}</ul></div></aside></div></section>`;
  }
  function competitors(){
    return titleHero("03 / Competitive intelligence","The firms entering the <span class='serif'>same shortlists.</span>","A provisional comparison of six named recruiters against JGA, grounded in selected model responses—not general recruitment-industry market share.")
    + `<section class="section tight"><div class="chart-box"><div class="chart-heading"><div><h3>Observed recruiter recommendations</h3><p>Total first-pass answers naming each firm as a recommended provider.</p></div></div><div class="bars">${D.competitors.map(c=>bar(c.name,c.hits,176,`#/competitors/${c.id}`)).join("")}</div><p class="chart-foot">Firm matching follows the current working classifications and is pending independent review.</p></div><div style="height:35px"></div><div class="items-grid">${D.competitors.filter(c=>c.id!=="jga").map(c=>`<a class="item-card" href="#/competitors/${c.id}"><div class="card-head"><span class="eyebrow">COMPARATOR / 2026</span><span aria-hidden="true">↗</span></div><h3>${escape(c.name)}</h3><p>${escape(c.descriptor)}. ${escape(c.angle)}</p><div class="card-bottom"><span class="big-number">${c.hits}<small>/176</small></span></div></a>`).join("")}</div><p style="margin-top:25px" class="small-meta">These are provisional summaries, not yet the six independently reviewed full comparator dossiers required for final handover.</p></section>`;
  }
  function competitorDetail(c){
    const coverage=D.situations.filter(s=>s.competitors[c.name]!==undefined).sort((a,b)=>(b.competitors[c.name]-b.hits)-(a.competitors[c.name]-a.hits));
    return `<div class="page-top"><a href="#/competitors" class="back-link">← All competitors</a></div>${titleHero("Recruiter comparison",escape(c.name),c.descriptor)}
      <section class="section tight"><div class="metric-grid">${metric("Recommended answers",String(c.hits),"out of 176 selected")}${metric("JGA comparison","109","same 176 responses")}${metric("Situation coverage",String(coverage.length),"out of 11 scenarios")}${metric("Status","Round 1","review pending",true)}</div><div style="height:30px"></div><div class="chart-box"><div class="chart-heading"><div><h3>When this firm appears against JGA</h3><p>Blue-green = JGA; light green = ${escape(c.name)}. Each scenario has 16 selected first-pass answers.</p></div></div><div class="stack">${coverage.map(s=>`<div><div style="display:flex;justify-content:space-between;gap:15px;margin-bottom:8px"><a class="back-link" href="#/situations/${s.id}">${s.id} · ${escape(s.name)} ↗</a><span class="small-meta">JGA ${s.hits} · ${escape(c.name)} ${s.competitors[c.name]}</span></div><div style="display:flex;gap:5px"><span style="background:#315d4b;height:14px;width:${s.hits/16*100}%;border-radius:3px"></span><span style="background:#a1bea7;height:14px;width:${s.competitors[c.name]/16*100}%;border-radius:3px"></span></div></div>`).join("")}</div></div><div style="height:24px"></div>${note("This is a first-pass quantitative comparator view. The six final detailed comparator reviews—including public page checks, observed citations and recommendations for JGA—remain in production.")}</section>`;
  }
  function sources(){
    return titleHero("04 / Citation intelligence","The websites behind <span class='serif'>the answers.</span>","Which domains AI tools referenced when supporting their payroll-recruitment responses, shown separately from recruiter links or retrieval-only search results.")
    + `<section class="section tight"><div class="tool-tabs" role="tablist" aria-label="Select AI tool">${D.tools.map(t=>`<button class="tool-tab" type="button" role="tab" aria-selected="${t.id==="ChatGPT"}" data-tool="${t.id}">${t.id}</button>`).join("")}</div><div class="chart-box" id="sources-chart"></div><div style="height:26px"></div><div class="chart-box"><div class="chart-heading"><div><h3>Frequently cited JGA website pages</h3><p>Unique selected responses with recorded supporting citations to these pages across all tools. One answer may cite several pages.</p></div></div><div class="source-list">${D.jgaPages.map(s=>`<div class="source-item"><a href="https://jgarecruitment.com${s.path}" target="_blank" rel="noopener noreferrer">${escape(s.path)} ↗</a><strong>${s.count} responses</strong></div>`).join("")}</div><p class="chart-foot">These pages are citation observations, not evidence that a specific page caused JGA to be recommended.</p></div><div style="margin-top:22px">${note("The current preview shows leading supporting-citation domains only, not the complete ranked ledger. Source attribution, domain normalisation and citation quality still require review. The final tool-specific domain tables will include exact URLs.")}</div></section>`;
  }
  function sourceChart(tool){
    const rows=(window.JGA_INTELLIGENCE?.sourceRankings?.[tool]||[]);
    const graph=rows.slice(0,8).map(r=>bar(r[0],r[1],44,null,r[0]!=="jgarecruitment.com")).join("");
    const table=rows.map((r,i)=>'<tr><td>'+(i+1)+'</td><td><a target="_blank" rel="noopener noreferrer" href="https://'+escape(r[0])+'">'+escape(r[0])+' ↗</a></td><td class="num">'+r[1]+' / 44</td><td class="num">'+r[2]+'</td></tr>').join("");
    return '<div class="chart-heading"><div><div class="eyebrow">SUPPORTING CITATIONS / '+escape(tool)+'</div><h3>Which source domains appear most often?</h3><p>Ranked by unique first-pass answers containing the domain. A second column preserves the number of captured URL events.</p></div><div class="mini-key">Unique answers</div></div><div class="bars">'+graph+'</div><div class="table-scroll source-rank-table"><table class="data-table"><thead><tr><th scope="col">Rank</th><th scope="col">Source domain</th><th scope="col" class="num">Answers / 44</th><th scope="col" class="num">Cited URLs</th></tr></thead><tbody>'+table+'</tbody></table></div><p class="chart-foot">Domain links open the respective website—not the exact source-event URL. Supporting citations are distinct from recruiter links, retrieved search results and recommendations. Full original citations are in the separate evidence handover.</p>';
  }
  function evidence(){
  return titleHero("05 / Original questions","44 questions. <span class='serif'>176 first-pass checks.</span>","Search the exact employer wording and compare whether each AI product recommended JGA. The full original answers and source-event records are available in the separate evidence handover.")
  + `<section class="section tight">
      <div class="metric-grid">
        ${metric("Exact question texts","44","unaltered locked question bank")}
        ${metric("Selected first-pass checks","176","44 questions × 4 AI products")}
        ${metric("JGA recommendations","109","provisional classification")}
        ${metric("Second-pass records","0 / 176","not yet collected",true)}
      </div>
      <div style="height:27px"></div>
      ${note("The matrix below contains the exact 44 prompt texts and one recorded, provisionally classified result per AI product. It does not substitute for the full original answer transcript. The separate offline evidence archive includes full texts and recorded supporting citations.")}
      <div class="filter-line">
        <input id="question-search" class="search-input" type="search" aria-label="Search exact questions" placeholder="Search exact question wording…">
        <select id="question-situation" class="filter-select" aria-label="Filter by situation"><option value="all">All 11 situations</option>${D.situations.map(s=>`<option value="${s.id}">${s.id} · ${escape(s.name)}</option>`).join("")}</select>
        <select id="question-outcome" class="filter-select" aria-label="Filter JGA outcomes"><option value="all">All outcomes</option><option value="recommended">Recommended in any tool</option><option value="absent">Not recommended in any tool</option><option value="mixed">Mixed across tools</option></select>
      </div>
      <div class="matrix-legend"><span class="legend-dot yes"></span> JGA recommended <span class="legend-dot no"></span> Not recommended <span class="small-meta">Product order: ChatGPT · Gemini · Perplexity · Claude</span></div>
      <div id="question-index" class="question-list" aria-live="polite"></div>
      <div style="margin-top:25px">${btn("Open complete response reader","#/full-evidence")}</div><div style="margin-top:12px"><a class="back-link" href="#/methodology">How outcomes were classified ↗</a></div>
    </section>`;
}
  function questionCards(rows){
  return rows.map(q=>{
    const id=q[0], bits=q[1], prompt=q[2], sum=[...bits].filter(x=>x==="1").length;
    return `<a class="question-card" href="#/evidence/${id}">
       <div class="question-head"><span class="eyebrow">${escape(id)} / ${id.startsWith("S03")?"US":"UK"} · First pass</span><span class="question-count">${sum}/4 products recommend JGA <span aria-hidden="true">↗</span></span></div>
       <p class="question-prompt">${escape(prompt)}</p>
       <div class="question-flags" aria-label="JGA recommendation by product">${JGA_TOOL_ORDER.map((tool,i)=>`<span class="question-flag ${bits[i]==="1"?"recommended":"not-recommended"}"><span aria-hidden="true">${bits[i]==="1"?"✓":"–"}</span> ${escape(tool)}</span>`).join("")}</div>
    </a>`;
  }).join("");
}
  function questionDetail(q){
  const [id,bits,prompt]=q, s=D.situations.find(s=>s.id===id.slice(0,3));
  const sum=[...bits].filter(x=>x==="1").length;
  return `<div class="page-top"><a class="back-link" href="#/evidence">← All exact questions</a></div>${titleHero(`${escape(id)} / First-pass prompt`,`${escape(s?.name||"Buyer question")}`,`Exact buyer question ${id}. Compare the four platform-level provisional JGA outcomes.`)}
  <section class="section tight">
    <div class="detail-grid"><div class="stack">
      <article class="surface">${k("Exact prompt / unchanged")}<h2 class="question-detail-title">${escape(prompt)}</h2><div class="question-flags">${JGA_TOOL_ORDER.map((tool,i)=>`<span class="question-flag ${bits[i]==="1"?"recommended":"not-recommended"}">${escape(tool)}: ${bits[i]==="1"?"JGA recommended":"JGA not recommended"}</span>`).join("")}</div></article>
      <article class="surface"><h2>What the four results show</h2><p>JGA was recommended by ${sum} of the four AI products for this exact question in the selected first pass.</p><div class="stack">${JGA_TOOL_ORDER.map((tool,i)=>`<div class="question-result"><div><span class="eyebrow">${escape(tool)} · Round 1</span><h3>${bits[i]==="1"?"JGA included in recommendation":"JGA not included in recommendation"}</h3></div><span class="tag ${bits[i]==="1"?"":"attention"}">${bits[i]==="1"?"Recommended":"Not recommended"}</span></div>`).join("")}</div><p class="small-meta" style="margin-top:15px">These indicators are derived from the archived working classifications. They do not describe all firms named in each answer. The full answer texts and citation events remain in the separately generated original evidence archive.</p></article>
      <article class="surface">${k("What to verify")}<h2>Go beyond the recommendation flag</h2><p>Review the original response, the recruiter shortlist, the dates, the observed platform mode, citations and any unresolved capture notes before inferring a cause.</p>${btn("See source-ranking context","#/sources")}</article>
    </div><aside class="stack"><div class="surface"><div class="side-stat"><strong>${sum}<span style="font-size:26px;color:#71907b"> / 4</span></strong><span>AI products provisionally recommending JGA for this exact wording</span></div><div style="margin-top:17px">${pill(s?.region||"UK")}${pill("Second pass pending","warn")}</div></div><div class="surface"><h3>Hiring situation</h3><p>${escape(s?.summary||"")}</p><a class="back-link" href="#/situations/${s?.id||"S01"}">View entire situation ↗</a></div></aside></div>
  </section>`;
}
    function fullEvidence(){
  return titleHero("05 / Original answer library","The complete answer, <span class='serif'>not a screenshot of a chart.</span>","Load the separately supplied first-pass evidence JSON to read all 176 exact original model answers, their source records and recorded collection conditions in the interactive website.")
  + `<section class="section tight"><div class="detail-grid"><div class="stack">
  <div class="surface"><div class="chapter-head"><div>${k("Private local import")}<h2>Open the original research</h2></div>${pill("Runs in your browser","good")}</div><p>Choose <strong>JGA-Full-First-Pass-Evidence-2026-10-20.json</strong> from the evidence handover ZIP. The website reads the file locally into your browser; it is not uploaded to a server.</p><label class="evidence-upload-label" for="evidence-file">Choose evidence JSON <span aria-hidden="true">↑</span></label><input id="evidence-file" type="file" accept=".json,application/json" aria-describedby="evidence-import-status"><p id="evidence-import-status" class="small-meta" role="status">No evidence file loaded. The 44-question comparison remains available without importing.</p></div>
  <div class="surface"><h2>Search imported responses</h2><div class="filter-line"><input type="search" id="response-search" class="search-input" aria-label="Search full original answer text" placeholder="Search original answers and prompts…" disabled><select id="response-tool" class="filter-select" aria-label="Filter original response by product" disabled><option value="all">All products</option>${D.tools.map(t=>`<option>${t.id}</option>`).join("")}</select><select id="response-outcome" class="filter-select" aria-label="Filter original response by JGA recommendation" disabled><option value="all">All JGA outcomes</option><option value="yes">JGA recommended</option><option value="no">JGA not recommended</option></select></div><div id="response-count" class="small-meta" aria-live="polite"></div><div id="response-index" class="response-index"><div class="empty-panel"><h3>Evidence ready to load</h3><p>Import the JSON archive above to inspect original full-text answers, recommendations and captured citation links.</p></div></div></div>
  </div><aside class="stack"><div class="surface"><h3>What the imported file contains</h3><ul class="list-clean"><li>44 exact original buyer questions</li><li>176 selected first-pass responses</li><li>Full untruncated response text</li><li>Dates, platform, conditions and modes</li><li>Recorded recommended recruiter names</li><li>Observed supporting-citation URLs</li><li>Original answer SHA-256 hashes</li></ul></div><div class="surface">${k("Status")}<p>Original source text is preserved, but classifications and cited-claim support still require independent review. The second pass is not included.</p>${btn("Browse the question matrix","#/evidence")}</div></aside></div><div style="height:24px"></div><article id="response-detail" class="surface" hidden><div class="eyebrow" id="response-meta"></div><h2 id="response-title">Original response</h2><p id="response-prompt" class="question-prompt"></p><div id="response-providers" class="small-meta"></div><h3>Complete recorded answer</h3><pre id="response-text" class="raw-answer"></pre><h3>Recorded supporting citations</h3><div id="response-sources" class="source-list"></div><p id="response-review" class="small-meta"></p></article></section>`;
}
    function actions(){
    return titleHero("06 / Prioritised actions","What JGA should <span class='serif'>look at next.</span>","Practical research-led opportunities, arranged by the commercial relevance of the gaps and strengths observed so far. Explanations are hypotheses until further verified.")
    + `<section class="section tight"><div class="chapter-head"><div>${k("Priorities / first pass")}<p class="body-text">A proposed investigation roadmap. Page edits or content changes cannot guarantee particular AI recommendations.</p></div>${pill("Blueprint page not finalised","warn")}</div>${D.actions.map(a=>`<article class="action-card"><div class="action-number">${String(a.rank).padStart(2,"0")}</div><div><div class="action-tags"><span class="tag ${a.rank<=3?"attention":""}">${escape(a.category)}</span><span class="tag light">Effort: ${escape(a.effort)}</span><span class="tag light">${escape(a.evidence)}</span></div><h3>${escape(a.title)}</h3><p>${escape(a.body)}</p><div style="display:flex;gap:14px;flex-wrap:wrap">${a.ids.map(id=>`<a class="back-link" href="#/situations/${id}">See ${id} evidence ↗</a>`).join("")}</div></div></article>`).join("")}<div style="margin-top:28px">${note("This is an interim action roadmap, not the complete drafted improvements for the evidence-selected JGA page. The final blueprint will include copy, technical changes, internal linking and an implementation checklist after source review.")}</div></section>`;
  }
  function methodology(){
    const m=D.methodology;
    return titleHero("Research method / transparency","How the study <span class='serif'>was collected.</span>","Scope, definitions, geographic conditions, counting rules and the limits of interpreting AI recommendations.")
      + `<section class="section tight"><div class="detail-grid"><div class="stack"><div class="surface"><h2>The question structure</h2><p>${escape(m.intended)}</p><p>Each buyer situation contains an anchor question, wording variant, due-diligence question and a decision-constraint question. Recruitment firms are not named in the prompts.</p></div><div class="surface"><h2>Recorded collection conditions</h2><p>${escape(m.conditions)}</p><p>${escape(m.limitations)}</p></div><div class="surface"><h2>How we count</h2><p>A recommendation is an answer explicitly suggesting a recruitment firm as a provider to contact. A passing mention or a linked source alone does not qualify as the same thing. Multiple firms may appear in one answer.</p><p>${escape(m.sources)}</p></div><div class="surface"><h2>What this study cannot establish</h2><p>These scenarios were deliberately selected for JGA's buyer situations. The data is not a probability sample of all employers or a measure of recruitment market share. Differences between AI tools do not, by themselves, establish an algorithmic cause. Public-page improvements cannot guarantee changes in recommendations.</p></div></div><aside class="stack"><div class="surface"><h3>Coverage</h3><div class="side-stat"><strong>176<span style="font-size:23px;color:#7e9584"> / 352</span></strong><span>collected selected first-pass responses / full target</span></div><p class="small-meta">The dataset also contains two duplicate historical pilot responses; those are not part of the selected 176.</p></div><div class="surface"><h3>Review status</h3><p>${escape(m.current)}</p>${pill("Independent classification review pending","warn")}</div></aside></div></section>`;
  }
  function downloads(){
    return titleHero("07 / Research handover","Take the findings <span class='serif'>with you.</span>","Export provisional structured summaries now. The complete dated raw-response package, source ledger, six detailed competitor reviews and final PDF blueprint will be added when independently reviewed.")
    + `<section class="section tight"><div class="items-grid"><div class="item-card"><div class="card-head">${k("Structured / CSV")}<span>↧</span></div><h3>Hiring situations</h3><p>11 situations, JGA counts, region and study interpretations.</p><button type="button" class="section-cta" data-export="situations">Download CSV <span class="cta-arrow" aria-hidden="true">↓</span></button></div><div class="item-card"><div class="card-head">${k("Structured / CSV")}<span>↧</span></div><h3>Source rankings</h3><p>Top recorded domains by tool, with unique response counts.</p><button type="button" class="section-cta" data-export="sources">Download CSV <span class="cta-arrow" aria-hidden="true">↓</span></button></div><div class="item-card"><div class="card-head">${k("Structured / JSON")}<span>↧</span></div><h3>Provisional data</h3><p>First-pass aggregates and interpretation notes for offline review.</p><button type="button" class="section-cta" data-export="data">Download JSON <span class="cta-arrow" aria-hidden="true">↓</span></button></div></div><div style="height:25px"></div><div class="surface"><h2>Exact question bank and observed outcomes</h2><p>All 44 unaltered buyer questions with the provisional JGA recommendation flag for each of the four products.</p><button type="button" class="section-cta" data-export="questions">Download 44-question CSV <span class="cta-arrow" aria-hidden="true">↓</span></button></div><div style="height:25px"></div><div class="surface"><h2>Still being assembled for final client delivery</h2><p>The executive PDF, full 44-question bank, all original dated responses and screenshots, source-level CSV, complete six-competitor dossiers, and implementation-ready page blueprint are outstanding. They are not presented here as completed downloads.</p><p>${pill("Raw response archive · pending")}${pill("Full source ledger · pending")}${pill("Executive PDF · pending")}${pill("JGA page blueprint · pending")}</p></div></section>`;
  }
  const csv=(rows)=>rows.map(row=>row.map(v=>'"'+String(v??"").replace(/"/g,'""')+'"').join(",")).join("\r\n")+"\r\n";
  function download(kind){
    let content,name,type;
    if(kind==="data"){content=JSON.stringify(D,null,2);name="jga-first-pass-provisional.json";type="application/json"}
    else if(kind==="questions"){const rows=[["Question ID","Exact buyer question","Collection region","ChatGPT JGA recommended","Gemini JGA recommended","Perplexity JGA recommended","Claude JGA recommended"]];(window.JGA_QUESTION_BANK||[]).forEach(([id,bits,prompt])=>rows.push([id,prompt,id.startsWith("S03")?"US":"UK",...[...bits].map(x=>x==="1"?"yes":"no")]));content=csv(rows);name="jga-exact-questions-first-pass.csv";type="text/csv"}
    else if(kind==="sources"){let rows=[["AI tool","Source domain","Responses citing domain","Tool responses","Status"]];Object.entries(D.sources).forEach(([tool,sources])=>sources.forEach(([domain,n])=>rows.push([tool,domain,n,44,"provisional"] )));content=csv(rows);name="jga-leading-source-domains-provisional.csv";type="text/csv"}
    else {let rows=[["Situation ID","Hiring situation","Collection region","JGA recommendations","Selected responses","Description","Status"]];D.situations.forEach(s=>rows.push([s.id,s.name,s.region,s.hits,16,s.summary,"provisional"]));content=csv(rows);name="jga-buyer-situations-provisional.csv";type="text/csv"}
    const blob=new Blob([content],{type:type+";charset=utf-8"}),url=URL.createObjectURL(blob),anchor=document.createElement("a");anchor.href=url;anchor.download=name;document.body.appendChild(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
  }
  function afterRender(path){
    if(path==="situations"){
      const input=document.getElementById("situation-search"),region=document.getElementById("region-filter"),sort=document.getElementById("sort-filter"),out=document.getElementById("situation-cards");
      const paint=()=>{let q=input.value.toLowerCase().trim();let rows=D.situations.filter(s=>(region.value==="all"||region.value===s.region)&&(!q||(`${s.name} ${s.summary} ${s.id} ${s.type}`).toLowerCase().includes(q)));if(sort.value==="low")rows.sort((a,b)=>a.hits-b.hits);if(sort.value==="high")rows.sort((a,b)=>b.hits-a.hits);out.innerHTML=rows.length?situationCards(rows):`<div class="empty-panel"><h3>No matching situations</h3><p>Try a different role or regional filter.</p></div>`};
      [input,region,sort].forEach(e=>e.addEventListener(e===input?"input":"change",paint));paint();
    }
    if(path==="evidence"&&!window.location.hash.split("/")[2]){
      const input=document.getElementById("question-search"),region=document.getElementById("question-situation"),outcome=document.getElementById("question-outcome"),list=document.getElementById("question-index");
      const renderQuestions=()=>{
        const q=input.value.toLowerCase().trim();
        const filtered=(window.JGA_QUESTION_BANK||[]).filter(rec=>{
          const [id,bits,prompt]=rec,sum=[...bits].filter(x=>x==="1").length;
          return (region.value==="all"||id.startsWith(region.value)) &&
            (!q||(`${id} ${prompt}`).toLowerCase().includes(q)) &&
            (outcome.value==="all"||(outcome.value==="recommended"&&sum>0)||(outcome.value==="absent"&&sum===0)||(outcome.value==="mixed"&&sum>0&&sum<4));
        });
        list.innerHTML=filtered.length?questionCards(filtered):'<div class="empty-panel"><h3>No matching questions</h3><p>Try another query or filter.</p></div>';
      };
      [input,region,outcome].forEach(element=>element.addEventListener(element===input?"input":"change",renderQuestions));
      renderQuestions();
    }

    if(path==="full-evidence"){
      const input=document.getElementById("evidence-file"),status=document.getElementById("evidence-import-status"),search=document.getElementById("response-search"),tool=document.getElementById("response-tool"),outcome=document.getElementById("response-outcome"),index=document.getElementById("response-index"),count=document.getElementById("response-count");
      let records=[];
      const safe=(value)=>escape(value);
      const renderRecord=record=>{
        const button=document.createElement("button");button.type="button";button.className="response-row";
        const t=document.createElement("strong");t.textContent=record.questionId+" · "+record.tool;
        const sub=document.createElement("span");sub.textContent=(record.jgaRecommended?"JGA recommended":"JGA not recommended")+" · "+(record.runTimestamp||"Date not recorded")+" · "+(record.recommendedProviders||[]).slice(0,3).join(", ");
        const arr=document.createElement("span");arr.textContent="↗";arr.setAttribute("aria-hidden","true");
        button.append(t,sub,arr);button.addEventListener("click",()=>openRecord(record));return button;
      };
      const openRecord=record=>{
        const panel=document.getElementById("response-detail");panel.hidden=false;
        document.getElementById("response-title").textContent=record.questionId+" · "+record.tool;
        document.getElementById("response-meta").textContent=[record.runTimestamp,record.networkCountry,record.authentication,record.mode].filter(Boolean).join(" · ");
        document.getElementById("response-prompt").textContent=record.prompt||"";
        document.getElementById("response-providers").textContent="Recorded provider shortlist: "+(record.recommendedProviders||[]).join(" · ");
        document.getElementById("response-text").textContent=record.fullResponse||"";
        document.getElementById("response-review").textContent="Original response ID: "+record.responseId+" · Source capture: "+record.sourceCaptureStatus+" · Review: "+record.reviewStatus;
        const urls=document.getElementById("response-sources");urls.replaceChildren();
        (record.sources||[]).forEach(source=>{
          const item=document.createElement("div");item.className="source-item";
          const link=document.createElement("a");
          const u=String(source.url||"");
          if(/^https?:\/\//i.test(u)){link.href=u;link.target="_blank";link.rel="noopener noreferrer";}
          link.textContent=source.title||u||"Source URL not recorded";
          const meta=document.createElement("small");meta.textContent=source.verification||"Unreviewed";
          item.append(link,meta);urls.append(item);
        });
        if(!record.sources?.length)urls.textContent="No native supporting-citation URLs recorded for this response.";
        panel.scrollIntoView({behavior:"smooth",block:"start"});
      };
      const draw=()=>{
        const q=search.value.trim().toLowerCase(),t=tool.value,oc=outcome.value;
        const list=records.filter(r=>(t==="all"||r.tool===t)&&(oc==="all"||(oc==="yes")===Boolean(r.jgaRecommended))&&(!q||[r.questionId,r.prompt,r.fullResponse,(r.recommendedProviders||[]).join(" ")].some(x=>String(x||"").toLowerCase().includes(q))));
        count.textContent=list.length+" of "+records.length+" original selected responses";
        index.replaceChildren(...list.map(renderRecord));
      };
      input.addEventListener("change",async()=>{
        const file=input.files?.[0];if(!file)return;
        status.textContent="Reading and validating the file…";
        try{
          const data=JSON.parse(await file.text());
          if(!Array.isArray(data.records)||data.records.length!==176||data.records.some(r=>!r.questionId||!r.tool||typeof r.fullResponse!=="string"||!r.responseId))throw Error("The selected first-pass evidence file format or response count is invalid.");
          const unique=new Set(data.records.map(r=>r.questionId+"|"+r.tool));
          if(unique.size!==176)throw Error("Duplicate question/product records found.");
          records=data.records;
          [search,tool,outcome].forEach(e=>e.disabled=false);
          status.textContent="Loaded "+records.length+" original first-pass responses locally. The file has not been sent to a server.";
          document.getElementById("response-detail").hidden=true;draw();
        }catch(e){records=[];status.textContent="Could not load evidence: "+e.message;index.innerHTML='<div class="empty-panel"><h3>Import unsuccessful</h3><p>Please select the unmodified JSON file from the evidence handover.</p></div>';count.textContent="";}
      });
      [search,tool,outcome].forEach(e=>e.addEventListener(e===search?"input":"change",draw));
    }
    if(path==="sources"){const tabs=[...document.querySelectorAll("[data-tool]")],out=document.getElementById("sources-chart");const paint=(tool)=>{out.innerHTML=sourceChart(tool);tabs.forEach(b=>{b.classList.toggle("active",b.dataset.tool===tool);b.setAttribute("aria-selected",String(b.dataset.tool===tool))})};tabs.forEach(b=>b.addEventListener("click",()=>paint(b.dataset.tool)));paint("ChatGPT");}
    document.querySelectorAll("[data-export]").forEach(b=>b.addEventListener("click",()=>download(b.dataset.export)));
  }
  function render(){
    const seg=(location.hash.replace(/^#\/?/,"")||"overview").split("/");const path=seg[0],item=seg[1];
    let html;
    if(path==="overview")html=overview();
    else if(path==="situations"&&item){let s=D.situations.find(s=>s.id===item);html=s?detail(s):situations();}
    else if(path==="situations")html=situations();
    else if(path==="competitors"&&item){let c=D.competitors.find(c=>c.id===item);html=c?competitorDetail(c):competitors();}
    else if(path==="competitors")html=competitors();
    else if(path==="sources")html=sources();
    else if(path==="evidence"&&item){const q=(window.JGA_QUESTION_BANK||[]).find(x=>x[0]===item);html=q?questionDetail(q):evidence();}
    else if(path==="evidence")html=evidence();
    else if(path==="full-evidence")html=fullEvidence();
    else if(path==="actions")html=actions();
    else if(path==="methodology")html=methodology();
    else if(path==="downloads")html=downloads();
    else html=titleHero("Not found","We couldn't find that page.","Choose an area from the navigation above.")+`<section class="section tight">${btn("Return to overview","#/overview")}</section>`;
    root.innerHTML=html;document.title=(path==="overview"?"The AI Recommendation Landscape":path[0].toUpperCase()+path.slice(1).replace("-"," "))+" — JGA Intelligence";
    setActive();afterRender(path); if(window.location.hash&&!window.location.hash.includes("#findings"))window.scrollTo({top:0,behavior:"instant"});
  }
  document.addEventListener("click", event => { const jump=event.target.closest('a[href="#findings"]'); if(jump){event.preventDefault();document.getElementById("findings")?.scrollIntoView({behavior:"smooth"});} });
  window.addEventListener("hashchange",render);
  document.getElementById("mobile-toggle").addEventListener("click",()=>{const nav=document.getElementById("mobile-nav"),button=document.getElementById("mobile-toggle");nav.hidden=!nav.hidden;button.setAttribute("aria-expanded",String(!nav.hidden));button.setAttribute("aria-label",nav.hidden?"Open navigation":"Close navigation");});
  document.getElementById("mobile-nav").addEventListener("click",e=>{if(e.target.closest("a"))document.getElementById("mobile-nav").hidden=true;});
  render();
})();
