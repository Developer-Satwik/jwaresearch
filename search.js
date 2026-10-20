(() => {
  "use strict";
  const dialog = document.getElementById("research-search-dialog");
  const input = document.getElementById("research-search-input");
  const results = document.getElementById("research-search-results");
  const status = document.getElementById("research-search-status");
  const close = document.getElementById("research-search-close");
  if (!dialog || !input || !results) return;
  const study = window.JGA_DATA || {};
  const questions = window.JGA_QUESTION_BANK || [];
  const intelligence = window.JGA_INTELLIGENCE || {};
  const entries = [];
  function add(type,title,summary,url,keywords="") {
    entries.push({type,title,summary,url,search:(title+" "+summary+" "+keywords).toLowerCase()});
  }
  [
    ["Overview","Executive findings, headline recommendation rates and strongest/weakest areas","#/overview"],
    ["Executive report","Read or print a case-study executive report","#/report"],
    ["Hiring situations","Explore eleven commercial buyer situations","#/situations"],
    ["Competitors","Compare six specialist and broad-market recruiters","#/competitors"],
    ["Sources and citations","Ranked cited domains and source-ledger importer","#/sources"],
    ["Question explorer","Explore all 44 buyer questions and AI recommendation outcomes","#/evidence"],
    
    ["Action plan","Prioritised opportunities linked to hiring situations","#/actions"],
    ["JGA page blueprint","Employer-page draft, copy and implementation checklist","#/blueprint"],
    ["Methodology","Collection methods, restrictions and interpretation limits","#/methodology"],
    ["Downloads","Export comparison tables and the example report","#/downloads"]
  ].forEach(row => add("Page",...row));
  (study.situations || []).forEach(s => add("Hiring situation",s.id+" · "+s.name,s.summary+" · JGA recommended "+s.hits+" of 16 answers","#/situations/"+s.id,s.type+" "+s.region));
  questions.forEach(([id,bits,prompt]) => add("Exact question",id+" · "+prompt.slice(0,95)+(prompt.length>95?"…":""),prompt,"#/evidence/"+id,id.slice(0,3)));
  (study.competitors || []).filter(c=>c.id!=="jga").forEach(c=>add("Competitor",c.name,c.descriptor+" · "+c.angle,"#/competitors/"+c.id));
  (study.actions || []).forEach(a=>add("Recommended action",a.title,a.evidence+" · "+a.body,"#/actions",a.ids.join(" ")));
  const seen = new Set();
  Object.values(intelligence.sourceRankings || {}).forEach(rows => rows.forEach(([domain])=>{
    if (seen.has(domain)) return;
    seen.add(domain);
    add("Source domain",domain,"Supporting website appearing in AI answers","#/sources","cited website");
  }));
  const norm = q => q.toLowerCase().trim().replace(/\s+/g," ");
  function find(query) {
    const q = norm(query);
    if (!q) return ["Overview","Executive report","Hiring situations","Question explorer","Sources and citations","Action plan"]
      .map(title => entries.find(e=>e.type==="Page"&&e.title===title)).filter(Boolean);
    const terms = q.split(" ").filter(Boolean);
    return entries.filter(e => terms.every(t=>e.search.includes(t)))
      .map(e=>{
        const t=e.title.toLowerCase();
        const score=(t===q?100:t.startsWith(q)?65:t.includes(q)?35:0)
          +terms.filter(x=>t.includes(x)).length*9
          +({"Hiring situation":5,"Competitor":4,"Exact question":3,"Page":2}[e.type]||0);
        return {e,score};
      }).sort((a,b)=>b.score-a.score||a.e.title.localeCompare(b.e.title))
      .slice(0,14).map(x=>x.e);
  }
  function resultNode(entry){
    const a=document.createElement("a");
    a.href=entry.url;a.className="research-search-result";
    const icon=document.createElement("span");icon.className="research-search-result-type";icon.textContent=entry.type;
    const body=document.createElement("span");body.className="research-search-result-body";
    const title=document.createElement("strong");title.textContent=entry.title;
    const summary=document.createElement("small");summary.textContent=entry.summary;
    body.append(title,summary);
    const arrow=document.createElement("span");arrow.textContent="↗";arrow.className="research-search-result-arrow";arrow.setAttribute("aria-hidden","true");
    a.append(icon,body,arrow);
    return a;
  }
  function paint(){
    const list=find(input.value);
    results.replaceChildren();
    if(!list.length){
      const box=document.createElement("div");box.className="research-search-empty";
      const head=document.createElement("strong");head.textContent="No matching research found.";
      const p=document.createElement("p");p.textContent="Try a hiring role, recruiter, question ID (such as S03), or a broader phrase.";
      box.append(head,p);results.append(box);
    } else list.forEach(e=>results.append(resultNode(e)));
    status.textContent=input.value.trim()
      ? list.length+" matching destinations"+(list.length===14?" (showing closest matches)":"")+"."
      : "Start typing, or choose a commonly used destination.";
  }
  function openSearch(){
    if(!dialog.open){dialog.showModal();input.value="";paint();}
    input.focus();
  }
  function closeSearch(){if(dialog.open)dialog.close();}
  document.querySelectorAll("[data-open-search]").forEach(b=>b.addEventListener("click",openSearch));
  close.addEventListener("click",closeSearch);
  input.addEventListener("input",paint);
  dialog.addEventListener("click",e=>{
    if(e.target===dialog)closeSearch();
    else if(e.target.closest(".research-search-result"))closeSearch();
  });
  input.addEventListener("keydown",e=>{
    if(e.key==="ArrowDown"){
      const first=results.querySelector("a");
      if(first){e.preventDefault();first.focus();}
    } else if(e.key==="Enter"){
      const first=results.querySelector("a");
      if(first){e.preventDefault();first.click();}
    }
  });
  results.addEventListener("keydown",e=>{
    if(!["ArrowDown","ArrowUp"].includes(e.key))return;
    const links=[...results.querySelectorAll("a")];
    const at=links.indexOf(document.activeElement);
    if(at<0)return;
    e.preventDefault();
    const next=e.key==="ArrowDown"?(at+1)%links.length:(at-1+links.length)%links.length;
    links[next]?.focus();
  });
  document.addEventListener("keydown",e=>{
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){
      e.preventDefault();openSearch();
    }
  });
  window.JGA_QUICK_FIND={indexSize:entries.length};
})();