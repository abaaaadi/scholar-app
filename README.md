<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Scholar — Academic Research Assistant</title>
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet">
<style>
:root{
  --navy:#0d1b2a;--nvm:#1b2e42;--nvl:#243b55;
  --gold:#c9a84c;--gll:#e8c97a;--glp:#f5e9c8;
  --cream:#faf8f2;--crm:#f0ead8;
  --td:#1a1a1a;--tm:#4a4a4a;--tl:#7a7a7a;
  --bdr:#e0d8c8;
  --ibg:#eef4fb;--ibr:#b8d4f0;--itx:#1a4a7a;
  --sbg:#eaf5ef;--sbr:#9fd8b8;--stx:#2d6a4f;
  --wbg:#fef9ec;--wbr:#f5d88a;--wtx:#7a4a00;
  --ebg:#fef0f0;--ebr:#f5b8b8;--etx:#8b1a1a;
  --serif:'Libre Baskerville',Georgia,serif;
  --sans:'DM Sans',system-ui,sans-serif;
  --r:10px;
}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:var(--sans);background:var(--cream);color:var(--td);min-height:100vh;font-size:15px;line-height:1.65}

/* ── HEADER ── */
header{background:var(--navy);position:sticky;top:0;z-index:100;border-bottom:2px solid var(--gold)}
.hdr{max-width:1200px;margin:0 auto;padding:0 1.5rem;display:flex;align-items:center;justify-content:space-between;height:58px;gap:1rem}
.logo{font-family:var(--serif);font-size:1.2rem;color:var(--gold);letter-spacing:.04em;display:flex;align-items:center;gap:7px;white-space:nowrap;cursor:pointer}
.dot{width:8px;height:8px;background:var(--gold);border-radius:50%}
nav{display:flex;list-style:none}
nav li{padding:0 .85rem;height:58px;display:flex;align-items:center;cursor:pointer;font-size:.75rem;letter-spacing:.06em;text-transform:uppercase;font-weight:500;color:rgba(255,255,255,.5);border-bottom:2px solid transparent;margin-bottom:-2px;transition:all .2s;user-select:none;white-space:nowrap}
nav li:hover{color:rgba(255,255,255,.85)}
nav li.on{color:var(--gold);border-bottom-color:var(--gold)}
.hdr-right{display:flex;align-items:center;gap:10px;flex-shrink:0}
.user-pill{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.08);border:1px solid rgba(201,168,76,.3);border-radius:20px;padding:.3rem .8rem;cursor:pointer;transition:background .2s}
.user-pill:hover{background:rgba(255,255,255,.14)}
.user-avatar{width:26px;height:26px;border-radius:50%;background:var(--gold);display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:700;color:var(--navy)}
.user-name{font-size:.78rem;color:rgba(255,255,255,.85);max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.plan-badge{font-size:.62rem;padding:.1rem .4rem;border-radius:10px;font-weight:600;text-transform:uppercase}
.plan-free{background:rgba(255,255,255,.15);color:rgba(255,255,255,.6)}
.plan-pro{background:var(--gold);color:var(--navy)}

/* ── PAGES ── */
.pg{display:none}.pg.on{display:block}
.wrap{max-width:1100px;margin:0 auto;padding:2.5rem 1.5rem}

/* ── AUTH MODAL ── */
.modal-bg{position:fixed;inset:0;background:rgba(13,27,42,.75);z-index:200;display:flex;align-items:center;justify-content:center;padding:1rem}
.modal-bg.hide{display:none}
.modal{background:#fff;border-radius:14px;padding:2rem;width:100%;max-width:420px;position:relative}
.modal h2{font-family:var(--serif);color:var(--navy);font-size:1.4rem;margin-bottom:.3rem}
.modal p.sub{color:var(--tl);font-size:.85rem;margin-bottom:1.5rem}
.modal-close{position:absolute;top:1rem;right:1rem;background:none;border:none;font-size:1.3rem;cursor:pointer;color:var(--tl);line-height:1}
.modal-close:hover{color:var(--td)}
.tab-row{display:flex;border-bottom:1px solid var(--bdr);margin-bottom:1.5rem}
.tab-btn{padding:.6rem 1.2rem;font-size:.88rem;cursor:pointer;color:var(--tl);border-bottom:2px solid transparent;margin-bottom:-1px;background:none;border-top:none;border-left:none;border-right:none;font-family:var(--sans);font-weight:500;transition:all .15s}
.tab-btn.on{color:var(--navy);border-bottom-color:var(--navy)}

/* ── FORMS ── */
.fld{margin-bottom:1rem}
.lbl{font-size:.76rem;font-weight:600;color:var(--navy);letter-spacing:.04em;text-transform:uppercase;display:block;margin-bottom:.4rem}
input[type=text],input[type=email],input[type=password],select,textarea{width:100%;padding:.7rem 1rem;border:1.5px solid var(--bdr);border-radius:8px;font-family:var(--sans);font-size:.92rem;color:var(--td);background:#fff;outline:none;transition:border-color .2s}
input:focus,select:focus,textarea:focus{border-color:var(--navy)}
textarea{resize:vertical;min-height:160px;line-height:1.65}
select{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%234a4a4a'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;padding-right:2rem}

/* ── BUTTONS ── */
.btn{padding:.68rem 1.3rem;border-radius:8px;font-family:var(--sans);font-size:.87rem;font-weight:500;cursor:pointer;border:none;outline:none;transition:all .2s;display:inline-flex;align-items:center;gap:6px}
.btn:disabled{opacity:.4;cursor:not-allowed}
.bp{background:var(--navy);color:var(--gold);width:100%;justify-content:center}.bp:hover:not(:disabled){background:var(--nvm)}
.bi{background:var(--navy);color:var(--gold)}.bi:hover:not(:disabled){background:var(--nvm)}
.bs{background:#fff;color:var(--navy);border:1.5px solid var(--bdr)}.bs:hover:not(:disabled){background:var(--crm)}
.bg{background:var(--gold);color:var(--navy)}.bg:hover:not(:disabled){background:var(--gll)}
.bsm{padding:.32rem .78rem;font-size:.77rem;border-radius:6px}
.row{display:flex;gap:8px;flex-wrap:wrap;align-items:flex-start}
.full{width:100%;justify-content:center}

/* ── ALERTS ── */
.al{padding:.82rem 1rem;border-radius:8px;font-size:.85rem;margin-bottom:1rem}
.ai{background:var(--ibg);color:var(--itx);border:1px solid var(--ibr)}
.ao{background:var(--sbg);color:var(--stx);border:1px solid var(--sbr)}
.aw{background:var(--wbg);color:var(--wtx);border:1px solid var(--wbr)}
.ae{background:var(--ebg);color:var(--etx);border:1px solid var(--ebr)}

/* ── LOADER ── */
.ldr{display:inline-flex;align-items:center;gap:8px;color:var(--tl);font-size:.84rem;padding:.4rem 0}
.sp{width:16px;height:16px;border:2px solid var(--bdr);border-top-color:var(--navy);border-radius:50%;animation:sp .7s linear infinite;flex-shrink:0}
@keyframes sp{to{transform:rotate(360deg)}}

/* ── CARD ── */
.card{background:#fff;border:1px solid var(--bdr);border-radius:var(--r);padding:1.4rem 1.5rem;margin-bottom:1.2rem}
.ch{font-family:var(--serif);font-size:1rem;color:var(--navy);margin-bottom:.5rem;display:flex;align-items:center;gap:8px}
.sn{width:24px;height:24px;border-radius:50%;background:var(--navy);color:var(--gold);font-size:.75rem;font-weight:600;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}
.card p{color:var(--tm);font-size:.88rem;margin-bottom:.5rem}
ul.t{list-style:none;padding:0;margin-top:.6rem}
ul.t li{padding:.3rem 0 .3rem 1.1rem;position:relative;color:var(--tm);font-size:.85rem}
ul.t li::before{content:'—';position:absolute;left:0;color:var(--gold);font-weight:700}

/* ── STATS ── */
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:2rem}
.stat{background:#fff;border:1px solid var(--bdr);border-radius:var(--r);padding:1rem;text-align:center}
.stn{font-family:var(--serif);font-size:1.8rem;color:var(--navy);font-weight:700;line-height:1}
.stl{font-size:.74rem;color:var(--tl);text-transform:uppercase;letter-spacing:.07em;margin-top:4px}

/* ── IMRaD ── */
.imrad{display:grid;grid-template-columns:160px 1fr;border:1px solid var(--bdr);border-radius:var(--r);overflow:hidden;background:#fff;margin-bottom:1.5rem}
.il{background:var(--navy);color:var(--gold);padding:.8rem 1rem;font-family:var(--serif);font-size:.83rem;border-bottom:1px solid var(--nvm);display:flex;align-items:center}
.iv{padding:.8rem 1rem;font-size:.82rem;color:var(--tm);border-bottom:1px solid var(--bdr)}
.il:last-of-type,.iv:last-child{border-bottom:none}

/* ── PULL QUOTE ── */
.pq{border-left:3px solid var(--gold);padding:.75rem 1.1rem;background:var(--glp);border-radius:0 8px 8px 0;font-family:var(--serif);font-style:italic;font-size:.92rem;color:var(--navy);margin:1.2rem 0}

/* ── USAGE METER ── */
.usage-bar-wrap{margin-bottom:1rem}
.usage-label{display:flex;justify-content:space-between;font-size:.8rem;margin-bottom:.3rem}
.usage-bar{height:8px;background:var(--crm);border-radius:4px;overflow:hidden}
.usage-fill{height:100%;border-radius:4px;background:var(--navy);transition:width .5s}
.usage-fill.warn{background:#e09000}
.usage-fill.full{background:var(--etx)}

/* ── DASHBOARD GRID ── */
.dash-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.5rem}
.dash-card{background:#fff;border:1px solid var(--bdr);border-radius:var(--r);padding:1.2rem;text-align:center}
.dash-n{font-family:var(--serif);font-size:2rem;color:var(--navy);font-weight:700}
.dash-l{font-size:.78rem;color:var(--tl);text-transform:uppercase;letter-spacing:.06em;margin-top:4px}
.dash-sub{font-size:.75rem;color:var(--tl);margin-top:2px}

/* ── PLAN CARDS ── */
.plan-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:1rem}
.plan-card{border:1.5px solid var(--bdr);border-radius:var(--r);padding:1.4rem;background:#fff}
.plan-card.pro{border-color:var(--gold);background:linear-gradient(135deg,#fff 60%,var(--glp))}
.plan-name{font-family:var(--serif);font-size:1.1rem;color:var(--navy);margin-bottom:.3rem}
.plan-price{font-size:1.5rem;font-weight:700;color:var(--navy);margin-bottom:.8rem}
.plan-price span{font-size:.85rem;font-weight:400;color:var(--tl)}
.plan-features{list-style:none;padding:0;margin-bottom:1rem}
.plan-features li{font-size:.84rem;color:var(--tm);padding:.25rem 0;display:flex;align-items:center;gap:6px}
.plan-features li::before{content:'✓';color:var(--stx);font-weight:700;flex-shrink:0}

/* ── PAPER CARD ── */
.pc{background:#fff;border:1px solid var(--bdr);border-radius:var(--r);padding:1.1rem 1.3rem;margin-bottom:.85rem;transition:border-color .2s}
.pc:hover{border-color:var(--nvl)}
.pt2{font-family:var(--serif);font-size:.96rem;color:var(--navy);margin-bottom:.3rem;line-height:1.4}
.pt2 a{color:inherit;text-decoration:none}.pt2 a:hover{color:var(--gold)}
.pm{display:flex;gap:.85rem;flex-wrap:wrap;font-size:.77rem;color:var(--tl);margin-bottom:.55rem}
.cb{background:var(--ibg);color:var(--itx);border:1px solid var(--ibr);padding:.1rem .48rem;border-radius:12px;font-size:.71rem;font-weight:600}
.ab{font-size:.82rem;color:var(--tm);line-height:1.6;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.ab.ex{-webkit-line-clamp:unset}
.tg{background:var(--crm);color:var(--nvl);padding:.16rem .52rem;border-radius:4px;font-size:.72rem;font-weight:500}
.pa{display:flex;gap:7px;margin-top:.75rem;flex-wrap:wrap}

/* ── WRITE ── */
.wg{display:grid;grid-template-columns:255px 1fr;gap:1.5rem;align-items:start}
.sb{position:sticky;top:76px}
.sb-btn{width:100%;text-align:left;padding:.6rem .88rem;border:1px solid var(--bdr);border-radius:8px;background:#fff;font-family:var(--sans);font-size:.84rem;cursor:pointer;margin-bottom:5px;color:var(--tm);display:flex;align-items:center;gap:8px;transition:all .15s}
.sb-btn:hover{background:var(--crm);color:var(--navy)}
.sb-btn.on{background:var(--navy);color:var(--gold);border-color:var(--navy)}

/* ── AI BOX ── */
.aib{background:var(--navy);color:rgba(255,255,255,.9);border-radius:var(--r);padding:1.3rem 1.4rem;font-size:.87rem;line-height:1.82;margin-top:.85rem;white-space:pre-wrap}
.aih{display:flex;align-items:center;gap:8px;margin-bottom:.85rem;padding-bottom:.65rem;border-bottom:1px solid rgba(201,168,76,.3)}
.ail{font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);font-weight:600}

/* ── CHIPS ── */
.chips{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:1.3rem}
.chip{padding:.28rem .82rem;border-radius:20px;font-size:.77rem;cursor:pointer;border:1px solid var(--bdr);background:#fff;color:var(--tm);transition:all .15s;font-weight:500}
.chip:hover,.chip.on{background:var(--navy);color:var(--gold);border-color:var(--navy)}
.kchip{background:var(--glp);color:var(--navy);border:1px solid var(--gold);padding:.28rem .82rem;border-radius:20px;font-size:.78rem;cursor:pointer;font-weight:500;transition:all .15s}
.kchip:hover{background:var(--gold)}

/* ── SAVED ── */
.si{padding:.75rem .95rem;border:1px solid var(--bdr);border-radius:8px;background:#fff;margin-bottom:7px;display:flex;align-items:flex-start;justify-content:space-between;gap:10px}
.sr{background:none;border:none;color:var(--tl);cursor:pointer;font-size:15px;padding:0;line-height:1}
.sr:hover{color:var(--etx)}
hr.dv{border:none;border-top:1px solid var(--bdr);margin:1.5rem 0}
.tw{position:relative}
.cc{position:absolute;bottom:9px;right:10px;font-size:.71rem;color:var(--tl)}
h1.pt{font-family:var(--serif);font-size:1.7rem;color:var(--navy);margin-bottom:.3rem}
p.ps{color:var(--tl);font-size:.9rem;margin-bottom:2rem}

/* ── LOCK SCREEN ── */
.lock{text-align:center;padding:4rem 2rem;background:#fff;border:1px solid var(--bdr);border-radius:var(--r)}
.lock-icon{font-size:3rem;margin-bottom:1rem}
.lock h3{font-family:var(--serif);color:var(--navy);font-size:1.2rem;margin-bottom:.5rem}
.lock p{color:var(--tl);font-size:.88rem;margin-bottom:1.5rem}

@media(max-width:720px){
  .wg{grid-template-columns:1fr}.sb{position:static}
  .stats,.dash-grid{grid-template-columns:1fr 1fr}
  .plan-grid{grid-template-columns:1fr}
  .imrad{grid-template-columns:1fr}.il{background:var(--nvm)}
  nav li{padding:0 .5rem;font-size:.68rem;letter-spacing:.02em}
  .hdr{height:auto;padding:.5rem 1rem;flex-wrap:wrap}
}
</style>
</head>
<body>

<!-- ══ AUTH MODAL ══════════════════════════════════════════════ -->
<div class="modal-bg" id="authModal">
  <div class="modal">
    <button class="modal-close" onclick="closeModal()">✕</button>
    <h2 id="modalTitle">Welcome to Scholar</h2>
    <p class="sub" id="modalSub">Sign in to your account to continue</p>

    <div class="tab-row">
      <button class="tab-btn on" id="loginTab" onclick="switchAuthTab('login')">Log In</button>
      <button class="tab-btn" id="registerTab" onclick="switchAuthTab('register')">Register</button>
    </div>

    <!-- Login Form -->
    <div id="loginForm">
      <div class="fld"><label class="lbl">Email</label>
        <input type="email" id="loginEmail" placeholder="your@email.com"></div>
      <div class="fld"><label class="lbl">Password</label>
        <input type="password" id="loginPass" placeholder="••••••••"></div>
      <div id="loginErr"></div>
      <button class="btn bp" onclick="doLogin()" id="loginBtn">Log In</button>
      <p style="text-align:center;font-size:.82rem;color:var(--tl);margin-top:1rem">
        No account? <a href="#" onclick="switchAuthTab('register');return false" style="color:var(--navy)">Register free</a>
      </p>
    </div>

    <!-- Register Form -->
    <div id="registerForm" style="display:none">
      <div class="fld"><label class="lbl">Full Name</label>
        <input type="text" id="regName" placeholder="Your name"></div>
      <div class="fld"><label class="lbl">Email</label>
        <input type="email" id="regEmail" placeholder="your@email.com"></div>
      <div class="fld"><label class="lbl">Password</label>
        <input type="password" id="regPass" placeholder="At least 6 characters"></div>
      <div id="regErr"></div>
      <button class="btn bp" onclick="doRegister()" id="regBtn">Create Free Account</button>
      <p style="text-align:center;font-size:.82rem;color:var(--tl);margin-top:1rem">
        Already have an account? <a href="#" onclick="switchAuthTab('login');return false" style="color:var(--navy)">Log in</a>
      </p>
    </div>
  </div>
</div>

<!-- ══ HEADER ══════════════════════════════════════════════════ -->
<header>
  <div class="hdr">
    <div class="logo" onclick="gotoTab('guide')"><span class="dot"></span>Scholar</div>
    <nav id="mainNav">
      <li class="on" data-p="guide">📚 Guide</li>
      <li data-p="dashboard">📊 Dashboard</li>
      <li data-p="discover">🔍 Discover</li>
      <li data-p="analyze">🧠 Analyze</li>
      <li data-p="write">✍️ Write</li>
      <li data-p="saved">🗂 Saved</li>
    </nav>
    <div class="hdr-right" id="hdrRight">
      <button class="btn bs bsm" onclick="showModal()" style="color:var(--navy)">Log In</button>
      <button class="btn bg bsm" onclick="showModal('register')">Register Free</button>
    </div>
  </div>
</header>

<!-- ══ GUIDE ═══════════════════════════════════════════════════ -->
<div class="pg on" id="p-guide"><div class="wrap">
  <h1 class="pt">How to Research &amp; Publish Academic Papers</h1>
  <p class="ps">Complete methodology from idea to publication — then use the tools above to do it.</p>
  <div class="stats">
    <div class="stat"><div class="stn">8</div><div class="stl">Research Phases</div></div>
    <div class="stat"><div class="stn">5–12</div><div class="stl">Months Average</div></div>
    <div class="stat"><div class="stn">IMRaD</div><div class="stl">Core Structure</div></div>
  </div>
  <div class="pq">"Research is formalized curiosity. It is poking and prying with a purpose." — Zora Neale Hurston</div>
  <div class="card"><div class="ch"><span class="sn">1</span>Identify a Research Gap</div>
    <p>Every great paper begins with a gap — something the literature doesn't explain or a contradiction to resolve.</p>
    <ul class="t"><li>Read 20–30 recent papers to map the current landscape</li><li>Look for "future work" or "open questions" in paper conclusions</li><li>Define your research question in one precise sentence before proceeding</li></ul>
  </div>
  <div class="card"><div class="ch"><span class="sn">2</span>Systematic Literature Review</div>
    <p>A critical synthesis that situates your work. Not a summary — a structured argument from the literature.</p>
    <ul class="t"><li>Use Google Scholar, Semantic Scholar, PubMed, IEEE Xplore</li><li>Boolean operators: AND, OR, NOT</li><li>Use Zotero (free) for citation management</li><li>Group papers thematically, not chronologically</li></ul>
  </div>
  <div class="card"><div class="ch"><span class="sn">3</span>Design Your Methodology</div>
    <ul class="t"><li><b>Quantitative:</b> experiments, surveys, statistical analysis</li><li><b>Qualitative:</b> interviews, case studies, ethnography</li><li><b>Mixed methods:</b> combines both for triangulation</li><li>Must be detailed enough for full replication</li></ul>
  </div>
  <div class="card"><div class="ch"><span class="sn">4</span>Collect &amp; Analyze Data</div>
    <ul class="t"><li>Keep a detailed research journal throughout</li><li>Use reproducible, version-controlled workflows</li><li>Negative results are still publishable — report them honestly</li></ul>
  </div>
  <hr class="dv">
  <h2 style="font-family:var(--serif);color:var(--navy);font-size:1.1rem;margin-bottom:1rem">📄 The IMRaD Paper Structure</h2>
  <div class="imrad">
    <div class="il">Title &amp; Abstract</div><div class="iv">Hook + question + method + finding + significance. Abstract ≤ 250 words; must stand alone.</div>
    <div class="il">Introduction</div><div class="iv">Broad → specific problem → gap → solution → paper outline (funnel shape).</div>
    <div class="il">Literature Review</div><div class="iv">Thematic synthesis. End by showing your gap and how you fill it.</div>
    <div class="il">Methodology</div><div class="iv">Design, participants, instruments, procedure, analysis. Enough detail to replicate.</div>
    <div class="il">Results</div><div class="iv">Objective findings only. No interpretation. Tables, figures, exact statistics.</div>
    <div class="il">Discussion</div><div class="iv">Interpret results, compare with literature, explain surprises, acknowledge limits.</div>
    <div class="il">Conclusion</div><div class="iv">Summarize contributions, answer the research question, suggest future work.</div>
    <div class="il">References</div><div class="iv">Every citation in text must appear here. One consistent style throughout.</div>
  </div>
  <div class="card"><div class="ch"><span class="sn">5</span>Writing Principles</div>
    <ul class="t"><li>Write results first, then introduction — frame what you already know</li><li>Active voice: "We analyzed…" not "It was analyzed…"</li><li>Every claim needs data or a citation</li></ul>
  </div>
  <div class="card"><div class="ch"><span class="sn">6</span>Choosing a Journal</div>
    <ul class="t"><li>Use Scimago (SJR) to find journals by quartile (Q1 = best)</li><li>Match your scope and audience exactly to the journal</li><li>Top journals reject 80–95% — prepare to resubmit</li></ul>
  </div>
</div></div>

<!-- ══ DASHBOARD ════════════════════════════════════════════════ -->
<div class="pg" id="p-dashboard"><div class="wrap">
  <h1 class="pt">My Dashboard</h1>
  <p class="ps">Track your usage and manage your account.</p>
  <div id="dashContent">
    <div class="lock">
      <div class="lock-icon">📊</div>
      <h3>Sign in to see your dashboard</h3>
      <p>Track your searches, analyses, and writing sessions.</p>
      <button class="btn bi" onclick="showModal()">Log In</button>
    </div>
  </div>
</div></div>

<!-- ══ DISCOVER ═════════════════════════════════════════════════ -->
<div class="pg" id="p-discover"><div class="wrap">
  <h1 class="pt">Discover Academic Papers</h1>
  <p class="ps">Search real published papers by keyword — powered by Claude AI.</p>
  <div id="discoverGate">
    <div class="lock">
      <div class="lock-icon">🔍</div>
      <h3>Log in to search papers</h3>
      <p>Free plan: 5 searches/day. Pro: unlimited.</p>
      <button class="btn bi" onclick="showModal()">Log In / Register Free</button>
    </div>
  </div>
  <div id="discoverApp" style="display:none">
    <div class="fld">
      <label class="lbl">Search Keywords</label>
      <div class="row">
        <input type="text" id="sq" placeholder="e.g. machine learning healthcare, quantum computing…" style="flex:1;min-width:180px">
        <select id="yf" style="width:130px;flex-shrink:0"><option value="">Any year</option><option value="2024">2024+</option><option value="2022">2022+</option><option value="2020">2020+</option><option value="2018">2018+</option></select>
        <button class="btn bi" onclick="doSearch()" id="sBtn">🔍 Search</button>
      </div>
    </div>
    <div class="chips">
      <span class="chip" onclick="qs('artificial intelligence ethics')">AI Ethics</span>
      <span class="chip" onclick="qs('deep learning medical imaging')">Medical Imaging AI</span>
      <span class="chip" onclick="qs('large language models NLP')">LLMs &amp; NLP</span>
      <span class="chip" onclick="qs('climate change adaptation policy')">Climate Policy</span>
      <span class="chip" onclick="qs('quantum computing algorithms')">Quantum Computing</span>
      <span class="chip" onclick="qs('blockchain supply chain')">Blockchain</span>
      <span class="chip" onclick="qs('renewable energy battery storage')">Energy Storage</span>
      <span class="chip" onclick="qs('mental health social media')">Mental Health</span>
    </div>
    <div id="searchUsage"></div>
    <div id="ss"></div>
    <div id="sr"></div>
  </div>
</div></div>

<!-- ══ ANALYZE ══════════════════════════════════════════════════ -->
<div class="pg" id="p-analyze"><div class="wrap">
  <h1 class="pt">Analyze Thesis Chapter</h1>
  <p class="ps">Paste research text — AI extracts themes, keywords, and finds related papers.</p>
  <div id="analyzeGate">
    <div class="lock"><div class="lock-icon">🧠</div><h3>Log in to analyze text</h3><p>Free plan: 3 analyses/day. Pro: unlimited.</p><button class="btn bi" onclick="showModal()">Log In / Register Free</button></div>
  </div>
  <div id="analyzeApp" style="display:none">
    <div class="fld"><label class="lbl">Your Text</label>
      <div class="tw"><textarea id="tt" rows="8" placeholder="Paste your thesis chapter, abstract, or any academic text here…"></textarea><span class="cc" id="cc">0</span></div>
    </div>
    <div class="row" style="margin-bottom:1.5rem">
      <button class="btn bi" onclick="doAnalyze()" id="aBtn">🧠 Analyze with AI</button>
      <button class="btn bs" onclick="loadEx()">Load Example</button>
      <button class="btn bs" onclick="clearA()">Clear</button>
    </div>
    <div id="analyzeUsage"></div>
    <div id="as2"></div><div id="ar"></div><div id="ap"></div>
  </div>
</div></div>

<!-- ══ WRITE ════════════════════════════════════════════════════ -->
<div class="pg" id="p-write"><div class="wrap">
  <h1 class="pt">Academic Paper Writing Assistant</h1>
  <p class="ps">AI guidance for every section of your paper.</p>
  <div id="writeGate">
    <div class="lock"><div class="lock-icon">✍️</div><h3>Log in to use the writing assistant</h3><p>Free plan: 5 sections/day. Pro: unlimited.</p><button class="btn bi" onclick="showModal()">Log In / Register Free</button></div>
  </div>
  <div id="writeApp" style="display:none">
    <div class="wg">
      <div class="sb">
        <label class="lbl" style="margin-bottom:.6rem;display:block">Paper Section</label>
        <button class="sb-btn on" data-s="title"   onclick="selS(this,'title')">🏷 Title &amp; Abstract</button>
        <button class="sb-btn"    data-s="intro"   onclick="selS(this,'intro')">📖 Introduction</button>
        <button class="sb-btn"    data-s="litrev"  onclick="selS(this,'litrev')">📚 Literature Review</button>
        <button class="sb-btn"    data-s="method"  onclick="selS(this,'method')">🔬 Methodology</button>
        <button class="sb-btn"    data-s="results" onclick="selS(this,'results')">📊 Results</button>
        <button class="sb-btn"    data-s="discuss" onclick="selS(this,'discuss')">💬 Discussion</button>
        <button class="sb-btn"    data-s="concl"   onclick="selS(this,'concl')">✅ Conclusion</button>
        <button class="sb-btn"    data-s="refs"    onclick="selS(this,'refs')">📝 References</button>
        <hr class="dv">
        <label class="lbl" style="margin-bottom:.4rem;display:block">Field</label>
        <select id="rf"><option>Computer Science</option><option>Biology &amp; Medicine</option><option>Social Sciences</option><option>Engineering</option><option>Physics</option><option>Economics</option><option>Linguistics</option><option>Environmental Science</option><option>Psychology</option><option>Law &amp; Politics</option></select>
      </div>
      <div>
        <div id="wt" style="font-family:var(--serif);font-size:1.1rem;color:var(--navy);font-weight:700;margin-bottom:.3rem"></div>
        <div id="wd" style="font-size:.82rem;color:var(--tl);margin-bottom:1rem"></div>
        <div class="fld"><label class="lbl">Describe your paper / paste draft</label>
          <textarea id="wi" rows="5" placeholder="Describe your research topic or paste your draft text…"></textarea></div>
        <div class="row" style="margin-bottom:1rem">
          <button class="btn bi" onclick="genS()" id="gBtn">✨ Generate Guidance</button>
          <button class="btn bs" onclick="impS()">🔄 Improve Draft</button>
          <button class="btn bs" onclick="exS()">❓ Explain Section</button>
        </div>
        <div id="writeUsage"></div>
        <div id="ws"></div><div id="wo"></div>
      </div>
    </div>
  </div>
</div></div>

<!-- ══ SAVED ════════════════════════════════════════════════════ -->
<div class="pg" id="p-saved"><div class="wrap">
  <h1 class="pt">Saved Papers</h1>
  <p class="ps">Papers you have bookmarked for reference.</p>
  <div id="si2" class="al ai"></div>
  <div id="sl"></div>
  <div id="ex"></div>
</div></div>

<script>
// ══ STATE ═══════════════════════════════════════════════════════
let token    = localStorage.getItem('sch_token') || '';
let user     = JSON.parse(localStorage.getItem('sch_user') || 'null');
let saved    = JSON.parse(localStorage.getItem('sch_saved') || '[]');
let curSec   = 'title';

// ══ HELPERS ═════════════════════════════════════════════════════
const $ = id => document.getElementById(id);
function set(id,h){ $(id).innerHTML = h; }
function esc(s){ if(!s)return''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

async function api(path, body, requireAuth = true) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = 'Bearer ' + token;
  const r = await fetch(path, { method: 'POST', headers, body: JSON.stringify(body) });
  const d = await r.json();
  if (d.error && (d.error.includes('log in') || d.error.includes('authenticated'))) {
    showModal();
    throw new Error(d.error);
  }
  if (d.error) throw new Error(d.error);
  return d;
}

// ══ AUTH ═════════════════════════════════════════════════════════
function showModal(tab) {
  $('authModal').classList.remove('hide');
  if (tab === 'register') switchAuthTab('register');
  else switchAuthTab('login');
}

function closeModal() {
  $('authModal').classList.add('hide');
}

function switchAuthTab(tab) {
  $('loginTab').classList.toggle('on', tab === 'login');
  $('registerTab').classList.toggle('on', tab === 'register');
  $('loginForm').style.display = tab === 'login' ? 'block' : 'none';
  $('registerForm').style.display = tab === 'register' ? 'block' : 'none';
  $('modalTitle').textContent = tab === 'login' ? 'Welcome back' : 'Create free account';
  $('modalSub').textContent = tab === 'login' ? 'Sign in to your account' : 'Free: 5 searches/day · No credit card needed';
}

async function doLogin() {
  const email = $('loginEmail').value.trim();
  const pass  = $('loginPass').value;
  if (!email || !pass) { set('loginErr', '<div class="al ae">Please enter email and password</div>'); return; }
  const btn = $('loginBtn'); btn.disabled = true; btn.textContent = 'Logging in…';
  set('loginErr', '');
  try {
    const d = await api('/api/login', { email, password: pass }, false);
    token = d.token; user = d.user;
    localStorage.setItem('sch_token', token);
    localStorage.setItem('sch_user', JSON.stringify(user));
    closeModal();
    updateHeader();
    unlockFeatures();
    loadDashboard();
  } catch(e) {
    set('loginErr', `<div class="al ae">${esc(e.message)}</div>`);
  } finally { btn.disabled = false; btn.textContent = 'Log In'; }
}

async function doRegister() {
  const name  = $('regName').value.trim();
  const email = $('regEmail').value.trim();
  const pass  = $('regPass').value;
  if (!email || !pass) { set('regErr', '<div class="al ae">Please fill in all fields</div>'); return; }
  const btn = $('regBtn'); btn.disabled = true; btn.textContent = 'Creating account…';
  set('regErr', '');
  try {
    const d = await api('/api/register', { name, email, password: pass }, false);
    token = d.token; user = d.user;
    localStorage.setItem('sch_token', token);
    localStorage.setItem('sch_user', JSON.stringify(user));
    closeModal();
    updateHeader();
    unlockFeatures();
    gotoTab('dashboard');
  } catch(e) {
    set('regErr', `<div class="al ae">${esc(e.message)}</div>`);
  } finally { btn.disabled = false; btn.textContent = 'Create Free Account'; }
}

function logout() {
  token = ''; user = null;
  localStorage.removeItem('sch_token');
  localStorage.removeItem('sch_user');
  updateHeader();
  lockFeatures();
  gotoTab('guide');
}

function updateHeader() {
  const el = $('hdrRight');
  if (user) {
    const initials = (user.name || user.email).substring(0,2).toUpperCase();
    el.innerHTML = `
      <div class="user-pill" onclick="gotoTab('dashboard')">
        <div class="user-avatar">${esc(initials)}</div>
        <span class="user-name">${esc(user.name || user.email)}</span>
        <span class="plan-badge ${user.plan === 'pro' ? 'plan-pro' : 'plan-free'}">${user.plan}</span>
      </div>
      <button class="btn bs bsm" onclick="logout()">Log Out</button>`;
  } else {
    el.innerHTML = `
      <button class="btn bs bsm" onclick="showModal()">Log In</button>
      <button class="btn bg bsm" onclick="showModal('register')">Register Free</button>`;
  }
}

function unlockFeatures() {
  $('discoverGate').style.display = 'none';   $('discoverApp').style.display = 'block';
  $('analyzeGate').style.display  = 'none';   $('analyzeApp').style.display  = 'block';
  $('writeGate').style.display    = 'none';   $('writeApp').style.display    = 'block';
}

function lockFeatures() {
  $('discoverGate').style.display = 'block';  $('discoverApp').style.display = 'none';
  $('analyzeGate').style.display  = 'block';  $('analyzeApp').style.display  = 'none';
  $('writeGate').style.display    = 'block';  $('writeApp').style.display    = 'none';
  set('dashContent', `<div class="lock"><div class="lock-icon">📊</div><h3>Sign in to see your dashboard</h3><p>Track your usage and manage your account.</p><button class="btn bi" onclick="showModal()">Log In</button></div>`);
}

// ══ DASHBOARD ════════════════════════════════════════════════════
async function loadDashboard() {
  if (!user) return;
  set('dashContent', '<div class="ldr"><div class="sp"></div>Loading your stats…</div>');
  try {
    const d = await fetch('/api/me', { headers: { Authorization: 'Bearer ' + token } }).then(r => r.json());
    if (d.error) throw new Error(d.error);

    const isPro = d.user.plan === 'pro';
    const memberSince = new Date(d.user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    function meter(action, label, icon) {
      const today = d.today[action] || 0;
      const limit = isPro ? 999 : (d.limits[action] || 5);
      const pct   = isPro ? 20 : Math.min(100, Math.round(today / limit * 100));
      const cls   = pct >= 100 ? 'full' : pct >= 70 ? 'warn' : '';
      return `<div class="usage-bar-wrap">
        <div class="usage-label"><span>${icon} ${label}</span><span>${today}${isPro ? '' : ' / ' + limit} today</span></div>
        <div class="usage-bar"><div class="usage-fill ${cls}" style="width:${pct}%"></div></div>
      </div>`;
    }

    set('dashContent', `
      <div class="dash-grid">
        <div class="dash-card"><div class="dash-n">${d.total.search||0}</div><div class="dash-l">Total Searches</div></div>
        <div class="dash-card"><div class="dash-n">${d.total.analyze||0}</div><div class="dash-l">Analyses Done</div></div>
        <div class="dash-card"><div class="dash-n">${d.total.write||0}</div><div class="dash-l">Sections Written</div></div>
      </div>

      <div class="card">
        <div class="ch">👤 Account</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem">
          <div><span class="lbl">Name</span><div style="font-size:.9rem">${esc(d.user.name||'—')}</div></div>
          <div><span class="lbl">Email</span><div style="font-size:.9rem">${esc(d.user.email)}</div></div>
          <div><span class="lbl">Plan</span><span class="plan-badge ${isPro?'plan-pro':'plan-free'}" style="display:inline-block;margin-top:4px">${d.user.plan}</span></div>
          <div><span class="lbl">Member since</span><div style="font-size:.9rem">${memberSince}</div></div>
        </div>
      </div>

      <div class="card">
        <div class="ch">📊 Today's Usage</div>
        ${meter('search',  'Paper Searches', '🔍')}
        ${meter('analyze', 'Thesis Analyses', '🧠')}
        ${meter('write',   'Writing Sections', '✍️')}
        ${isPro ? '<div class="al ao" style="margin-top:1rem">✅ Pro plan — unlimited usage</div>' : ''}
      </div>

      ${!isPro ? `
      <div class="card">
        <div class="ch">⚡ Upgrade to Pro</div>
        <p style="color:var(--tm);font-size:.88rem;margin-bottom:1rem">Remove daily limits and unlock unlimited access to all features.</p>
        <div class="plan-grid">
          <div class="plan-card">
            <div class="plan-name">Free</div>
            <div class="plan-price">$0 <span>/month</span></div>
            <ul class="plan-features">
              <li>5 paper searches/day</li>
              <li>3 thesis analyses/day</li>
              <li>5 writing sections/day</li>
              <li>Save papers</li>
              <li>APA citations export</li>
            </ul>
            <button class="btn bs full" disabled>Current Plan</button>
          </div>
          <div class="plan-card pro">
            <div class="plan-name">Pro ⭐</div>
            <div class="plan-price">$9 <span>/month</span></div>
            <ul class="plan-features">
              <li>Unlimited searches</li>
              <li>Unlimited analyses</li>
              <li>Unlimited writing</li>
              <li>Priority AI responses</li>
              <li>All future features</li>
            </ul>
            <button class="btn bg full" onclick="alert('Stripe payments coming soon! Contact us to upgrade.')">Upgrade to Pro →</button>
          </div>
        </div>
      </div>` : ''}
    `);
  } catch(e) {
    set('dashContent', `<div class="al ae">Error loading dashboard: ${esc(e.message)}</div>`);
  }
}

// ══ NAV ══════════════════════════════════════════════════════════
document.querySelectorAll('#mainNav li').forEach(li => {
  li.addEventListener('click', () => gotoTab(li.dataset.p));
});

function gotoTab(p) {
  document.querySelectorAll('#mainNav li').forEach(l => l.classList.remove('on'));
  document.querySelectorAll('.pg').forEach(pg => pg.classList.remove('on'));
  const li = document.querySelector(`[data-p="${p}"]`);
  if (li) li.classList.add('on');
  const pg = $('p-' + p);
  if (pg) pg.classList.add('on');
  if (p === 'saved') renderSaved();
  if (p === 'dashboard') loadDashboard();
}

// Enter key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
  if (e.key === 'Enter' && !$('authModal').classList.contains('hide')) {
    if ($('loginForm').style.display !== 'none') doLogin();
    else doRegister();
  }
});

// ══ DISCOVER ═════════════════════════════════════════════════════
function qs(term) { $('sq').value = term; gotoTab('discover'); doSearch(); }

async function doSearch() {
  const q  = $('sq').value.trim();
  if (!q) { alert('Enter keywords to search.'); return; }
  const yr  = $('yf').value;
  const btn = $('sBtn'); btn.disabled = true; btn.textContent = 'Searching…';
  set('ss', `<div class="ldr"><div class="sp"></div>Finding papers for "<em>${esc(q)}</em>" — ~10 sec…</div>`);
  set('sr', '');
  try {
    const d = await api('/api/search', { query: q, yearFilter: yr });
    if (d.usage) set('searchUsage', usageBanner(d.usage, 'search'));
    set('ss', `<div class="al ao">✅ <strong>${d.papers.length}</strong> papers found for "<em>${esc(q)}</em>"</div>`);
    renderPapers(d.papers, 'sr');
  } catch(e) {
    set('ss', `<div class="al ae">❌ ${esc(e.message)}</div>`);
  } finally { btn.disabled = false; btn.textContent = '🔍 Search'; }
}
$('sq') && $('sq').addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

// ══ RENDER PAPERS ════════════════════════════════════════════════
function renderPapers(papers, cid) {
  const c = $(cid);
  c.querySelectorAll('.pc').forEach(el => el.remove());
  papers.forEach((p, i) => {
    const uid  = cid + '_' + i;
    const au   = (p.authors||[]).slice(0,3).map(a=>a.name).join(', ')+((p.authors||[]).length>3?` +${p.authors.length-3}`:'');
    const abs  = p.abstract || 'No abstract available.';
    const href = p.url || '#';
    const isSv = saved.some(s => s.title === p.title);
    const el   = document.createElement('div'); el.className = 'pc';
    el.innerHTML = `
      <div class="pt2"><a href="${esc(href)}" target="_blank" rel="noopener">${esc(p.title||'Untitled')}</a></div>
      <div class="pm">
        <span>👤 ${esc(au||'Unknown')}</span>
        ${p.year?`<span>📅 ${p.year}</span>`:''}
        ${p.journal&&p.journal.name?`<span>📰 ${esc(p.journal.name.substring(0,45))}</span>`:''}
        ${typeof p.citationCount==='number'?`<span><span class="cb">📌 ${p.citationCount.toLocaleString()} citations</span></span>`:''}
      </div>
      <div class="ab" id="ab${uid}">${esc(abs)}</div>
      ${abs.length>200?`<a href="#" style="font-size:.77rem;color:var(--navy);margin-top:3px;display:inline-block" onclick="togA('${uid}');return false" id="tg${uid}">Show more ↓</a>`:''}
      <div class="pa">
        <a href="${esc(href)}" target="_blank" rel="noopener" class="btn bs bsm">🔗 Open</a>
        <button class="btn bsm ${isSv?'bg':'bs'}" id="sv${uid}" onclick="togSv('${uid}',${JSON.stringify(p).replace(/"/g,'&quot;')})">${isSv?'✅ Saved':'🔖 Save'}</button>
        <button class="btn bs bsm" onclick="cpAPA(${JSON.stringify(p).replace(/"/g,'&quot;')})">📋 APA</button>
      </div>`;
    c.appendChild(el);
  });
}

function togA(uid){const a=$('ab'+uid),t=$('tg'+uid);a.classList.toggle('ex');t.textContent=a.classList.contains('ex')?'Show less ↑':'Show more ↓';}
function togSv(uid,p){const idx=saved.findIndex(s=>s.title===p.title);const btn=$('sv'+uid);if(idx>-1){saved.splice(idx,1);btn.textContent='🔖 Save';btn.className='btn bs bsm';}else{saved.push(p);btn.textContent='✅ Saved';btn.className='btn bg bsm';}localStorage.setItem('sch_saved',JSON.stringify(saved));}
function cpAPA(p){const a=(p.authors||[]).map(x=>{const pts=x.name.split(' ');return pts.length<2?x.name:pts[pts.length-1]+', '+pts.slice(0,-1).map(n=>n[0]+'.').join(' ');}).join(', ');const ref=`${a} (${p.year||'n.d.'}). ${p.title}. ${p.journal&&p.journal.name?p.journal.name:''}. ${p.url||''}`;navigator.clipboard.writeText(ref).then(()=>alert('✅ APA citation copied!\n\n'+ref));}

// ══ ANALYZE ══════════════════════════════════════════════════════
$('tt') && $('tt').addEventListener('input', function(){ $('cc').textContent = this.value.length.toLocaleString()+' chars'; });

function loadEx(){$('tt').value=`This chapter investigates transformer-based neural architectures for low-resource multilingual machine translation. Traditional sequence-to-sequence models rely on large parallel corpora, which are scarce for many African and South Asian languages. We propose a cross-lingual transfer learning approach using mBERT and XLM-R pretrained embeddings to bootstrap translation quality for five under-resourced languages: Swahili, Wolof, Igbo, Sindhi, and Pashto. Our experiments demonstrate that fine-tuning on as few as 10,000 sentence pairs yields BLEU improvements of 8–14 points over baseline models.`;$('cc').textContent=$('tt').value.length.toLocaleString()+' chars';}
function clearA(){$('tt').value='';$('cc').textContent='0';set('as2','');set('ar','');set('ap','');set('analyzeUsage','');}

async function doAnalyze(){
  const txt=$('tt').value.trim();
  if(!txt||txt.length<50){alert('Paste at least a paragraph.');return;}
  const btn=$('aBtn');btn.disabled=true;btn.textContent='⏳ Analyzing…';
  set('as2',`<div class="ldr"><div class="sp"></div>Analyzing your text…</div>`);
  set('ar','');set('ap','');
  try{
    const a=await api('/api/analyze',{text:txt});
    if(a.usage)set('analyzeUsage',usageBanner(a.usage,'analyze'));
    set('as2','');
    set('ar',`<div class="card"><div class="ch">🎓 AI Analysis</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem">
        <div><span class="lbl">Field</span><div style="color:var(--tm);font-size:.87rem">${esc(a.field||'—')}</div></div>
        <div><span class="lbl">Methodology</span><div style="color:var(--tm);font-size:.87rem">${esc(a.methodology||'—')}</div></div>
      </div>
      <div style="margin-bottom:.8rem"><span class="lbl">Research Question</span><div class="pq" style="margin-top:.4rem">${esc(a.research_question||'—')}</div></div>
      <div style="margin-bottom:.8rem"><span class="lbl">Research Gap</span><div style="color:var(--tm);font-size:.87rem">${esc(a.gap||'—')}</div></div>
      <div style="margin-bottom:.8rem"><span class="lbl">Themes</span><div class="chips" style="margin-bottom:0">${(a.themes||[]).map(t=>`<span class="tg">${esc(t)}</span>`).join('')}</div></div>
      <div><span class="lbl">Click keyword → search related papers ↓</span>
        <div class="chips" style="margin-top:.4rem;margin-bottom:0">
          ${(a.keywords||[]).map(k=>`<span class="kchip" onclick="skw('${esc(k)}')">${esc(k)}</span>`).join('')}
          ${(a.search_queries||[]).map(q=>`<span class="kchip" style="border-style:dashed" onclick="skw('${esc(q)}')">${esc(q)}</span>`).join('')}
        </div></div>
    </div>`);
    if(a.search_queries&&a.search_queries.length)await skw(a.search_queries[0]);
  }catch(e){set('as2',`<div class="al ae">❌ ${esc(e.message)}</div>`);}
  finally{btn.disabled=false;btn.textContent='🧠 Analyze with AI';}
}

async function skw(kw){
  set('ap',`<div class="ldr"><div class="sp"></div>Searching papers for "${esc(kw)}"…</div>`);
  try{const d=await api('/api/search',{query:kw});$('ap').innerHTML=`<h3 style="font-family:var(--serif);color:var(--navy);font-size:1rem;margin-bottom:.7rem">📖 Papers: "${esc(kw)}"</h3>`;renderPapers(d.papers,'ap');}
  catch(e){set('ap',`<div class="al ae">${esc(e.message)}</div>`);}
}

// ══ WRITE ════════════════════════════════════════════════════════
const SD={
  title:{t:'Title & Abstract',d:'Abstract ≤ 250 words; cover purpose, method, results, conclusion. Title: specific and searchable.',p:(t,f)=>`You are a senior ${f} researcher. For paper on: "${t}" — generate: (1) Three title options, (2) Structured abstract: Background/Objective/Methods/Results/Conclusion, (3) Five indexing keywords.`},
  intro:{t:'Introduction',d:'Funnel: broad context → problem → gap → solution → paper overview.',p:(t,f)=>`You are a senior ${f} researcher. Write an introduction framework for: "${t}". Include: opening hook, background, problem statement, research gap, research question, methodology preview, contributions, section overview.`},
  litrev:{t:'Literature Review',d:'Organize thematically. Synthesize multiple sources per paragraph.',p:(t,f)=>`You are a senior ${f} researcher. Help structure a literature review for: "${t}". Provide: thematic structure, talking points, transition phrases, sample synthesizing paragraph, gap-identification closing.`},
  method:{t:'Methodology',d:'Detailed enough for full replication.',p:(t,f)=>`You are a senior ${f} researcher. Write a complete methodology framework for: "${t}". Include: design justification, participants/data, instruments, procedure, analysis, validity/reliability, ethics, limitations.`},
  results:{t:'Results',d:'Objective findings only. No interpretation. Report exact statistics.',p:(t,f)=>`You are a senior ${f} researcher. Guide writing the Results section for: "${t}". Cover: structure, introducing results, referencing figures, statistical conventions, example paragraph, what NOT to include.`},
  discuss:{t:'Discussion',d:'Reverse funnel: specific → broad. Interpret results vs. literature.',p:(t,f)=>`You are a senior ${f} researcher. Discussion framework for: "${t}". Cover: opening, interpreting findings, comparison with literature, explaining surprises, implications, limitations, future directions.`},
  concl:{t:'Conclusion',d:'Summarize contributions. Answer the research question. No new information.',p:(t,f)=>`You are a senior ${f} researcher. Conclusion section for: "${t}". Include: big-picture opening, key contributions, direct answer to research question, implications, future work, closing. Plus: 5 things a conclusion must NEVER do.`},
  refs:{t:'References & Citations',d:'Every in-text citation must appear in the list and vice versa.',p:(t,f)=>`You are a senior ${f} researcher. Complete citations guide for a ${f} paper on: "${t}". Cover: standard style, in-text patterns, reference formats for journal/book/conference/website/preprint, Zotero tips, plagiarism avoidance, example references.`}
};

function selS(btn,s){document.querySelectorAll('.sb-btn').forEach(b=>b.classList.remove('on'));btn.classList.add('on');curSec=s;$('wt').textContent=SD[s].t;$('wd').textContent=SD[s].d;set('wo','');set('ws','');}
selS(document.querySelector('.sb-btn'),'title');

async function genS(){const t=$('wi').value.trim(),f=$('rf').value;if(!t){alert('Describe your paper topic.');return;}await callW(SD[curSec].p(t,f),'AI Guidance: '+SD[curSec].t);}
async function impS(){const t=$('wi').value.trim(),f=$('rf').value;if(!t){alert('Paste your draft.');return;}await callW(`You are a senior ${f} editor. Improve this ${SD[curSec].t} draft:\n\n"${t}"\n\nProvide: improved version, problems found, better sentences, missing elements, vocabulary upgrades.`,'Improvement Suggestions');}
async function exS(){const f=$('rf').value;await callW(`Explain the ${SD[curSec].t} section of an academic paper in ${f}. Cover: purpose, structure, length, tense/voice conventions, 3 example openings, most common novice mistakes.`,'About: '+SD[curSec].t);}

async function callW(prompt,label){
  const btn=$('gBtn');btn.disabled=true;
  set('ws',`<div class="ldr"><div class="sp"></div>Generating guidance…</div>`);set('wo','');
  try{
    const d=await api('/api/write',{prompt});
    if(d.usage)set('writeUsage',usageBanner(d.usage,'write'));
    set('ws','');
    set('wo',`<div class="aib"><div class="aih"><span style="font-size:17px">🤖</span><span class="ail">${esc(label)}</span></div><div style="white-space:pre-wrap;line-height:1.82">${esc(d.text)}</div></div>
    <div class="row" style="margin-top:.7rem"><button class="btn bs bsm" onclick="navigator.clipboard.writeText(document.querySelector('.aib div:last-child').textContent).then(()=>alert('Copied!'))">📋 Copy</button><button class="btn bs bsm" onclick="genS()">🔄 Regenerate</button></div>`);
  }catch(e){set('ws',`<div class="al ae">❌ ${esc(e.message)}</div>`);}
  finally{btn.disabled=false;}
}

// ══ USAGE BANNER ═════════════════════════════════════════════════
function usageBanner(usage, action) {
  if (usage.plan === 'pro') return '';
  const pct = Math.round(usage.today / usage.limit * 100);
  const cls = pct >= 100 ? 'ae' : pct >= 80 ? 'aw' : 'ai';
  const msg = pct >= 100
    ? `🚫 Daily limit reached (${usage.limit}/${usage.limit}). <a href="#" onclick="gotoTab('dashboard');return false" style="color:inherit;font-weight:600">Upgrade to Pro →</a>`
    : `📊 ${usage.today} of ${usage.limit} daily ${action}s used`;
  return `<div class="al ${cls}" style="margin-bottom:.8rem">${msg}</div>`;
}

// ══ SAVED ════════════════════════════════════════════════════════
function renderSaved(){
  const info=$('si2'),list=$('sl'),exp=$('ex');
  if(!saved.length){info.textContent='No saved papers yet.';list.innerHTML=`<div style="text-align:center;padding:3rem;color:var(--tl)"><div style="font-size:2rem;margin-bottom:.5rem">📂</div>Search and bookmark papers to see them here.</div>`;exp.innerHTML='';return;}
  info.textContent=`📚 ${saved.length} paper${saved.length!==1?'s':''} saved`;
  list.innerHTML='';
  saved.forEach((p,i)=>{
    const au=(p.authors||[]).slice(0,2).map(a=>a.name).join(', ');
    const el=document.createElement('div');el.className='si';
    el.innerHTML=`<div style="flex:1"><div style="font-size:.87rem;color:var(--navy);font-weight:500;line-height:1.35">${esc(p.title||'Untitled')}</div><div style="font-size:.75rem;color:var(--tl);margin-top:2px">${esc(au)}${p.year?' · '+p.year:''}</div></div>
    <div class="row" style="align-items:center;flex-shrink:0">${p.url?`<a href="${esc(p.url)}" target="_blank" class="btn bs bsm">Open</a>`:''}<button class="sr" onclick="rmSv(${i})">✕</button></div>`;
    list.appendChild(el);
  });
  exp.innerHTML=`<button class="btn bs" onclick="expRefs()" style="margin-top:.5rem">📋 Export APA References</button><div id="eo" style="margin-top:1rem"></div>`;
}

function rmSv(i){saved.splice(i,1);localStorage.setItem('sch_saved',JSON.stringify(saved));renderSaved();}
function expRefs(){const txt=saved.map((p,i)=>{const a=(p.authors||[]).map(x=>{const pts=x.name.split(' ');return pts.length<2?x.name:pts[pts.length-1]+', '+pts.slice(0,-1).map(n=>n[0]+'.').join(' ');}).join(', ');const j=p.journal&&p.journal.name?p.journal.name:'';return`[${i+1}] ${a} (${p.year||'n.d.'}). ${p.title}. ${j}. ${p.url||''}`;}).join('\n\n');$('eo').innerHTML=`<pre style="background:#fff;border:1px solid var(--bdr);border-radius:8px;padding:1rem;font-size:.79rem;white-space:pre-wrap;color:var(--td)">${esc(txt)}</pre><button class="btn bs bsm" style="margin-top:.4rem" onclick="navigator.clipboard.writeText(atob('${btoa(unescape(encodeURIComponent(txt)))')).then(()=>alert('Copied!'))">📋 Copy All</button>`;}

// ══ INIT ═════════════════════════════════════════════════════════
(function init() {
  closeModal(); // hide modal by default
  updateHeader();
  if (user && token) {
    unlockFeatures();
  } else {
    lockFeatures();
  }
})();
</script>
</body>
</html>
