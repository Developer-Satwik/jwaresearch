(function () {
  "use strict";
  const benefits = [
    ["01","Core UK hiring","S07: JGA 13/16; S11: JGA 16/16","Keep high-performing Payroll Manager and Senior Payroll Specialist coverage clear on the employer page.","S07","S11"],
    ["02","Senior / confidential search","S02: JGA 6/16","Clarify how senior and confidential hiring enquiries are handled. Do not imply a retained executive process without JGA confirmation.","S02","S10"],
    ["03","Transformation leadership","S04: JGA 6/16","Present genuine payroll change, systems-implementation and governance recruitment capabilities with verified proof.","S04","S06"],
    ["04","US domestic visibility","S03: JGA 3/16","Treat US Payroll Director recruitment as a separate US-site workstream, not a UK-page keyword insertion.","S03","S03"]
  ];
  const candidatePages = [
    {name:"Main payroll-recruitment service",path:"/payroll-recruitment/",count:7,decision:"Recommended draft target",reason:"The clearest employer-facing service page to refine. It explicitly states UK and global payroll recruitment but has comparatively little published detail about individual buyer situations."},
    {name:"Homepage",path:"/",count:26,decision:"Supporting navigation",reason:"The most frequently recorded JGA page citation. Protect its existing discovery role and link clearly to the fuller service explanation."},
    {name:"Meet the team",path:"/meet-the-team/",count:13,decision:"Credibility proof",reason:"Specialist team profiles can supply attributable evidence of payroll expertise. Validate individual roles and link relevant profiles."},
    {name:"Recruitment test",path:"/recruitment-test/",count:12,decision:"Review and reconcile",reason:"This accessible page lists many roles and regions; its stated combined-experience figure differs from the current main payroll service page. Confirm whether it is intended to remain public."}
  ];
  const checklist = [
    ["confirm","Confirm the /payroll-recruitment/ page owner, publication date and editing access"],
    ["claim","Resolve the 100+ versus 150+ combined-experience figures before publishing either"],
    ["roles","Validate which listed role families JGA currently recruits for: manager, specialist, director, transformation and interim"],
    ["geography","Verify UK/EMEA coverage; keep US domestic recruitment evidence on an appropriate US-facing page"],
    ["proof","Obtain 1–2 approved anonymised examples of relevant placements or search assignments, or omit the proof section"],
    ["team","Link to accurate current recruiter profiles and approved expertise statements"],
    ["content","Review the employer-first draft copy below with JGA's recruitment leadership"],
    ["links","Check internal links: homepage, team, existing payroll roles, contact/vacancy and approved relevant articles"],
    ["technical","Check indexability, canonical URL, title, description, headings, mobile reading and structured-data accuracy"],
    ["baseline","Archive unchanged benchmark inputs, source dates and the original page version"],
    ["publish","Deploy the reviewed improvements with documented changes and an approval record"],
    ["recheck","Run the agreed questions again under comparable conditions; report changes without guaranteeing causation"]
  ];
  const draft = {
    title:"Payroll recruitment for UK and international employers | JGA Recruitment",
    description:"Hiring a Payroll Manager, Senior Payroll Specialist or senior payroll leader? Explore JGA's specialist payroll recruitment across the UK and international teams.",
    h1:"Specialist payroll recruitment for the people who keep businesses running.",
    intro:"Whether you are replacing a Payroll Manager, growing a UK payroll team or appointing senior international payroll leadership, JGA Recruitment helps employers identify and assess payroll talent for the role and organisation.",
    sections:[
      {heading:"Recruiting across operational and senior payroll roles",body:"Recruitment requirements vary by employer. A small team hiring a Senior Payroll Specialist needs a different candidate profile from a multinational appointing a Head of EMEA Payroll. JGA's payroll recruitment conversations can start with the remit, location, reporting structure, systems environment and the payroll risks the role must address.",bullets:["Payroll Manager and Senior Payroll Specialist","Head of Payroll and payroll leadership","UK and international payroll roles","Payroll systems and transformation-related appointments"]},
      {heading:"When to speak with a specialist recruiter",body:"An employer might be replacing a departing payroll manager, adding capacity to a growing team, building oversight across several countries or hiring an experienced leader for a provider or systems change. Share the immediate hiring need, whether the position is permanent or interim, and the experience that matters most.",bullets:["Replacement and growth hiring","Senior payroll search and succession","Multi-country payroll leadership","Systems, provider and governance changes"]},
      {heading:"A clearer brief creates a more relevant search",body:"For an initial discussion, JGA can review the role requirements with the employer. The page should explain the confirmed steps JGA follows from briefing and candidate assessment to shortlist and handover; the final process wording must be approved by JGA.",bullets:["Role remit and business context","Geography, working model and payroll environment","Candidate skills and leadership requirements","Search timeline and review process"]},
      {heading:"Experience worth checking before appointing a recruiter",body:"Ask to see the experience most relevant to the role: operational payroll placements for growth hiring, discreet senior search for a confidential replacement, or multi-country change expertise for transformation leadership. Publish specific, approved supporting examples instead of broad unverified claims.",bullets:["Relevant anonymised placement examples [JGA to supply]","Specialist recruiter biographies [confirm links]","Approach to confidential searches [JGA to approve]","Candidate and client evidence [only with permission]"]}
    ],
    faqs:[
      ["Can JGA help recruit a permanent Payroll Manager?","JGA publicly lists Payroll Manager among the roles it recruits for. Confirm current service availability, region and lead consultant when discussing the vacancy."],
      ["Can JGA support senior international payroll hiring?","JGA publicly describes UK and global payroll recruitment and lists senior global payroll roles. Discuss the specific country scope, leadership responsibilities and required systems experience."],
      ["Does JGA recruit for payroll transformation roles?","JGA's public role inventory includes transformation and implementation-related positions. Verify current specialist delivery and relevant examples for the particular programme."],
      ["Who should I contact about a payroll vacancy?","Use JGA's current employer enquiry or submit-a-vacancy route to share the position, location, hiring timeline and core requirements."]
    ],
    cta:"Discuss your payroll hiring brief",
    disclaimer:"This is proposed copy for JGA review. It is not published JGA wording and must not be treated as evidence of an unverified service, client result, placement or hiring guarantee."
  };
  const refs = [
    ["Main employer page","https://jgarecruitment.com/payroll-recruitment/"],
    ["Broader role inventory","https://jgarecruitment.com/recruitment-test/"],
    ["Current team profiles","https://jgarecruitment.com/meet-the-team/"],
    ["US-facing recruitment site","https://jgarecruitmentinc.com/"],
    ["Google AI-search guidance","https://developers.google.com/search/docs/appearance/ai-features"]
  ];
  const e = value => String(value ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const pill = (value,kind="")=>'<span class="pill '+kind+'">'+e(value)+'</span>';
  const roleList = values => '<ul class="bp-list">'+values.map(v=>'<li>'+e(v)+'</li>').join("")+'</ul>';
  function draftText(){
    return [draft.h1,draft.intro,...draft.sections.flatMap(s=>[s.heading,s.body,...s.bullets.map(x=>"- "+x)]),"Frequently asked questions",...draft.faqs.flatMap(x=>[x[0],x[1]]),draft.cta,draft.disclaimer].join("\n\n");
  }
  function download(filename,body,type){
    const url=URL.createObjectURL(new Blob([body],{type:type+";charset=utf-8"}));
    const anchor=document.createElement("a");anchor.href=url;anchor.download=filename;document.body.append(anchor);anchor.click();anchor.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function render(){
    const pages=candidatePages.map(p=>'<article class="bp-page-card"><div class="bp-page-card-head"><span class="eyebrow">'+e(p.decision)+'</span>'+pill(p.count+" cited answers")+'</div><h3>'+e(p.name)+'</h3><p>'+e(p.reason)+'</p><a target="_blank" rel="noopener noreferrer" href="https://jgarecruitment.com'+e(p.path)+'">'+e(p.path)+' ↗</a></article>').join("");
    const benefitsHtml=benefits.map(x=>'<a class="bp-opportunity" href="#/situations/'+e(x[4])+'"><div class="bp-opportunity-index">'+e(x[0])+'</div><div><div class="eyebrow">'+e(x[2])+'</div><h3>'+e(x[1])+'</h3><p>'+e(x[3])+'</p><span class="bp-arrow">Review '+e(x[4])+' evidence ↗</span></div></a>').join("");
    const draftCards=draft.sections.map((s,i)=>'<section class="bp-draft-section"><div class="bp-section-n">'+String(i+1).padStart(2,"0")+'</div><div><h4>'+e(s.heading)+'</h4><p>'+e(s.body)+'</p>'+roleList(s.bullets)+'</div></section>').join("");
    const faq=draft.faqs.map(([question,answer])=>'<details class="bp-faq"><summary>'+e(question)+'</summary><p>'+e(answer)+'</p></details>').join("");
    const tasks=checklist.map(([id,label])=>'<label class="bp-task"><input type="checkbox" data-bp-task="'+e(id)+'"><span>'+e(label)+'</span></label>').join("");
    const links=refs.map(([title,url])=>'<a target="_blank" rel="noopener noreferrer" href="'+e(url)+'">'+e(title)+' <span aria-hidden="true">↗</span></a>').join("");
    return '<div class="page-top"><a href="#/actions" class="back-link">← Back to priority actions</a></div>'
    +'<section class="page-hero bp-hero"><div class="page-hero-inner"><div class="kicker">07 / IMPLEMENTATION BLUEPRINT</div><h1>Turn insight into <span class="serif">something useful.</span></h1><p>An evidence-informed working draft for JGA’s main payroll-recruitment page—with copy, content architecture, validation requirements and a plan to measure changes.</p><div class="hero-utility">'+pill("Working draft · approval required","warn")+pill("First-pass evidence")+pill("No guaranteed AI outcome")+'</div></div></section>'
    +'<nav class="bp-chapters" aria-label="Blueprint sections"><a href="#/blueprint" data-bp-jump="bp-context">01 / Page selection</a><a href="#/blueprint" data-bp-jump="bp-priorities">02 / Hiring gaps</a><a href="#/blueprint" data-bp-jump="bp-draft">03 / Draft copy</a><a href="#/blueprint" data-bp-jump="bp-technical">04 / Technical</a><a href="#/blueprint" data-bp-jump="bp-checklist">05 / Implementation</a></nav>'
    +'<section class="section bp-section" id="bp-context"><div class="split-heading"><div><div class="kicker">01 / PAGE SELECTION</div></div><div><h2>Fix the commercial page. <span class="serif">Keep the evidence intact.</span></h2><p class="intro-note">The final page selection should be confirmed after the second pass and source audit. For now, the existing payroll-recruitment page is the strongest employer-facing working candidate—not necessarily the most cited URL.</p></div></div><div class="bp-pages">'+pages+'</div><div class="note"><strong>Content discrepancy to resolve:</strong> the main payroll page mentions more than 100 years of combined expertise, while the separate recruitment-test page says more than 150. Do not repeat either figure until JGA confirms the current, evidenced calculation.</div></section>'
    +'<section class="section bp-section" id="bp-priorities"><div class="split-heading"><div><div class="kicker">02 / COMMERCIAL OPPORTUNITIES</div></div><div><h2>Start with the hiring decisions <span class="serif">that actually matter.</span></h2><p class="intro-note">The four areas below come from the selected first-pass question set. Observed differences are real classification counts, but proposed explanations and remedies are not proven causes.</p></div></div><div class="bp-opportunities">'+benefitsHtml+'</div></section>'
    +'<section class="section bp-section bp-draft-wrap" id="bp-draft"><div class="split-heading"><div><div class="kicker">03 / PROPOSED PAGE COPY</div></div><div><h2>Copy the team can <span class="serif">actually review.</span></h2><p class="intro-note">Specific, employer-first language rather than claims that algorithms can be forced to recommend a company. Every assertion requires a JGA content owner’s approval.</p></div></div><div class="bp-copy-toolbar"><div><span class="eyebrow">CONTENT DRAFT V0.1</span><p>Proposed main payroll recruitment page</p></div><div class="bp-copy-actions"><button type="button" data-bp-copy="draft">Copy page copy ↗</button><button type="button" data-bp-download="html">Download editable HTML ↓</button><button type="button" data-bp-print="1">Print / PDF ↓</button></div></div><div class="bp-preview"><div class="bp-preview-top"><span>JGA RECRUITMENT / WORKING COPY</span><span>NOT LIVE · APPROVAL REQUIRED</span></div><div class="bp-preview-body"><div class="eyebrow">PAYROLL / EMPLOYERS / UK & INTERNATIONAL</div><h3>'+e(draft.h1)+'</h3><p class="bp-lede">'+e(draft.intro)+'</p><div class="bp-cta-sample">'+e(draft.cta)+' <span aria-hidden="true">↗</span></div><div class="bp-copy-columns">'+draftCards+'</div><div class="bp-faq-block"><h4>Questions employers ask</h4>'+faq+'</div><p class="bp-caveat">'+e(draft.disclaimer)+'</p></div></div></section>'
    +'<section class="section bp-section" id="bp-technical"><div class="split-heading"><div><div class="kicker">04 / CONTENT + TECHNICAL FOUNDATION</div></div><div><h2>Readable for employers. <span class="serif">Clear to search systems.</span></h2><p class="intro-note">Google’s guidance emphasises people-first content, crawlable pages and accurate structured data—not a secret AEO tag. These are proposed review items, not claims of guaranteed ranking improvements.</p></div></div><div class="bp-technical-grid"><article class="surface"><span class="eyebrow">META TITLE · PROPOSED</span><h3>'+e(draft.title)+'</h3><button type="button" class="text-button" data-bp-copy="title">Copy title ↗</button></article><article class="surface"><span class="eyebrow">META DESCRIPTION · PROPOSED</span><p>'+e(draft.description)+'</p><button type="button" class="text-button" data-bp-copy="description">Copy description ↗</button></article><article class="surface"><span class="eyebrow">STRUCTURE</span><h3>One H1, useful subheadings, real role evidence.</h3><p>Keep service descriptions visible as HTML text; use descriptive internal links to role, team and hiring pages. Do not add schema types that misrepresent the page.</p></article><article class="surface"><span class="eyebrow">DISCOVERY CONDITIONS</span><h3>Verify crawl and index access.</h3><p>Check robots rules, canonical, server response, mobile navigation, sitemap/internal links and correct metadata before judging any before/after result.</p></article></div><div class="bp-technical-grid bp-callouts"><article class="surface"><span class="eyebrow">EDITORIAL / US</span><h3>Separate domestic US recruitment.</h3><p>JGA’s US-facing site describes payroll hiring across the US. The UK service draft should not claim domestic US Director-placement performance without evidence. Build a dedicated US proof workstream.</p><a href="https://jgarecruitmentinc.com/" target="_blank" rel="noopener noreferrer">Inspect JGA US ↗</a></article><article class="surface"><span class="eyebrow">MEASUREMENT / RECHECK</span><h3>Preserve the original test conditions.</h3><p>After publication, repeat the same buyer questions by tool with recorded dates, network location and session mode; compare recommendation and citations separately. An observed change cannot automatically be attributed to the page update.</p><a href="#/evidence">Inspect original questions ↗</a></article></div></section>'
    +'<section class="section bp-section" id="bp-checklist"><div class="split-heading"><div><div class="kicker">05 / IMPLEMENTATION PLAN</div></div><div><h2>Twelve checks before <span class="serif">calling it finished.</span></h2><p class="intro-note">Use this checklist during JGA review. Tick boxes track this browser session only; they do not change the published site or imply work has been approved.</p></div></div><div class="bp-check-layout"><div class="bp-check-items">'+tasks+'</div><aside class="bp-check-aside"><div class="eyebrow">PROGRESS IN THIS SESSION</div><strong id="bp-task-count">0/12</strong><div class="bp-progress-track"><span id="bp-task-fill"></span></div><p>Export your draft and approved checklist separately. Final publication requires JGA’s factual and editorial sign-off.</p><button type="button" data-bp-download="json" class="bp-secondary-btn">Download blueprint JSON ↓</button><button type="button" data-bp-download="checklist" class="bp-secondary-btn">Download checklist CSV ↓</button></aside></div><div class="bp-reference-list"><div class="eyebrow">SOURCES CONSULTED</div>'+links+'</div><div class="note"><strong>Method boundary:</strong> this is a draft based on the research’s selected first pass and current public JGA pages. It is not an independently reviewed final blueprint, and no source demonstrates that the proposed edits will cause AI recommendations to increase.</div></section>'
    +'<div class="bp-feedback" id="bp-feedback" role="status" aria-live="polite"></div>';
  }
  function draftHTML(){
    const groups=draft.sections.map(s=>'<section><h2>'+e(s.heading)+'</h2><p>'+e(s.body)+'</p><ul>'+s.bullets.map(b=>'<li>'+e(b)+'</li>').join("")+'</ul></section>').join("");
    const faqs=draft.faqs.map(p=>'<h3>'+e(p[0])+'</h3><p>'+e(p[1])+'</p>').join("");
    return '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>JGA payroll recruitment — working draft</title><style>body{font-family:Arial,sans-serif;color:#20372b;max-width:770px;margin:50px auto;padding:0 26px;line-height:1.65}h1{font-size:40px;line-height:1.08}h2{margin-top:36px}section{border-top:1px solid #dae5d7;padding-top:17px}small{color:#647467}li{margin:7px 0}</style></head><body><small>PROPOSED COPY / NOT PUBLISHED / JGA APPROVAL REQUIRED</small><h1>'+e(draft.h1)+'</h1><p>'+e(draft.intro)+'</p>'+groups+'<section><h2>Employer questions</h2>'+faqs+'</section><p><strong>Contact CTA:</strong> '+e(draft.cta)+'</p><hr><small>'+e(draft.disclaimer)+'</small></body></html>';
  }
  function init(){
    const root=document.getElementById("content");
    if(!root.querySelector(".bp-hero"))return;
    const feedback=root.querySelector("#bp-feedback");
    function show(message){feedback.textContent=message;feedback.classList.add("visible");}
    const clipboard={draft:draftText(),title:draft.title,description:draft.description};
    root.querySelectorAll("[data-bp-copy]").forEach(button=>button.addEventListener("click",async()=>{
      const text=clipboard[button.dataset.bpCopy];if(!text)return;
      try{await navigator.clipboard.writeText(text);show("Copied to clipboard.");}
      catch{show("Clipboard permission unavailable. Use the downloadable HTML instead.");}
    }));
    const inputs=[...root.querySelectorAll("[data-bp-task]")];
    const fill=root.querySelector("#bp-task-fill"),count=root.querySelector("#bp-task-count");
    const update=()=>{const n=inputs.filter(i=>i.checked).length;count.textContent=n+"/"+inputs.length;fill.style.width=(n/inputs.length*100)+"%";};
    inputs.forEach(i=>i.addEventListener("change",update));
    root.querySelectorAll("[data-bp-download]").forEach(button=>button.addEventListener("click",()=>{
      const type=button.dataset.bpDownload;
      if(type==="html")download("jga-payroll-recruitment-draft.html",draftHTML(),"text/html");
      if(type==="json")download("jga-improvement-blueprint-working.json",JSON.stringify({status:"draft - approval required",researchStatus:"first pass only",selectedPage:"https://jgarecruitment.com/payroll-recruitment/",candidatePages,opportunities:benefits,draft,checklist:checklist.map(([id,label])=>({id,label,checked:Boolean(root.querySelector('[data-bp-task="'+id+'"]')?.checked)})),references:refs},null,2),"application/json");
      if(type==="checklist")download("jga-implementation-checklist.csv","Task,Item,Completed\r\n"+checklist.map(([id,label])=>[id,label,root.querySelector('[data-bp-task="'+id+'"]')?.checked?"Yes":"No"].map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(",")).join("\r\n")+"\r\n","text/csv");
      show("File prepared. This is working material and requires JGA approval.");
    }));
    root.querySelector("[data-bp-print]")?.addEventListener("click",()=>window.print());
    root.querySelectorAll("[data-bp-jump]").forEach(link=>link.addEventListener("click",event=>{
      event.preventDefault();const target=document.getElementById(link.dataset.bpJump);
      if(target)target.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"start"});
    }));
  }
  window.JGA_BLUEPRINT={render,init};
})();