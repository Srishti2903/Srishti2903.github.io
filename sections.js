/* ============================================================
   Shared page sections — the single source for Experience,
   Certifications and Projects. Edit a role, certificate or
   project card here and it updates on index.html and on
   experience.html, certifications.html and projects.html.

   Usage: put <div data-section="experience"></div> (or
   "certifications" / "projects") inside the page's <section>,
   then load this file before script.js.
   Don't type a backtick ( ` ) inside the copy below.
   ============================================================ */
(function () {
  'use strict';

  const SECTIONS = {

    /* ===================== EXPERIENCE ===================== */
    experience: `
      <div class="section-head">
        <p class="eyebrow-tag flow">Experience</p>
        <a href="https://drive.google.com/file/d/1VO8sRzveUCqf3H1eBF_kj9z9wQum5QK_/view?usp=sharing" target="_blank" rel="noopener" class="resume-btn">Resume ↗</a>
      </div>
      <h2 class="home-h2 word-fade">Where I've <em>been</em><br>&amp; what I built.</h2>

      <div class="exp-list">
        <div class="exp-row exp-row--has-tooltip flow">
          <div class="exp-row-top">
            <span class="exp-org">Google Developer Student Club (GDSC)</span>
            <span class="exp-role">Marketing Associate | Freshmen Representative<span class="exp-dates">2021 — 2022 · 1 yr</span></span>
            <span class="exp-tag exp-tag--lead">Leadership</span>
          </div>
          <div class="exp-details">
            <div class="exp-details-inner">
              <ul>
                <li>Managed <b>marketing and communications</b> across first-year Discord servers, lectures, tutorials, and FSG channels, maintaining <b>consistent engagement</b> across student touchpoints.</li>
                <li>Coordinated and facilitated <b>online community events</b> including discussion panels, study hubs, and game nights, strengthening <b>member retention and participation</b>.</li>
                <li>Represented GDSC at <b>DeerHacks</b>, increasing <b>club visibility</b> and driving <b>new member engagement</b> through cross-org presence.</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="exp-row exp-row--has-tooltip flow">
          <div class="exp-row-top">
            <span class="exp-org">Mathematical and Computational Sciences Society (MCSS)</span>
            <span class="exp-role">VP of Marketing → VP of External Affairs<span class="exp-dates">2022 — 2024 · 2 yrs</span></span>
            <span class="exp-tag exp-tag--lead">Leadership</span>
          </div>
          <div class="exp-details">
            <div class="exp-details-inner">
              <ul>
                <li>Led <b>marketing efforts</b> that boosted <b>social media engagement</b> (450 on Instagram &amp; 870 on LinkedIn) using <b>data-driven strategies</b> and creating content that clicked with our audience.</li>
                <li>Strengthened <b>community engagement</b> by bringing in diverse <b>industry professionals</b> and reconnecting with alumni to host <b>workshops, panels, and networking events</b>.</li>
                <li><b>DeerHacks II and III</b> organizer 🦌</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="exp-row exp-row--has-tooltip flow">
          <div class="exp-row-top">
            <span class="exp-org">Milton Learna</span>
            <span class="exp-role">Math &amp; Statistics Tutor | Grades 9–12<span class="exp-dates">2023 — 2024 | 2025 — 2026 · 2 yrs</span></span>
            <span class="exp-tag exp-tag--teach">Teaching</span>
          </div>
          <div class="exp-details">
            <div class="exp-details-inner">
              <ul>
                <li>Identified where each student was struggling and created <b>customized study plans</b> for <b>3+ students per term</b>, helping them achieve an <b>average AP exam score of 4 or higher</b>.</li>
                <li>Provided <b>ongoing mentorship and feedback</b> beyond just the lessons, helping students to think <b>analytically</b>, manage their workload independently, and approach challenging material with <b>confidence</b>.</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="exp-row exp-row--has-tooltip flow">
          <div class="exp-row-top">
            <span class="exp-org">Vosyn AI</span>
            <span class="exp-role">Data Analytics &amp; Strategy Intern | Digital Marketing<span class="exp-dates">Summer 2024 · 4 mos</span></span>
            <span class="exp-tag exp-tag--coop">Co-op</span>
          </div>
          <div class="exp-details">
            <div class="exp-details-inner">
              <p class="exp-details-intro">Embedded within the Digital Marketing team to drive analytics and strategy initiatives across LinkedIn, web, and product channels.</p>
              <ul>
                <li><b>Increased investor engagement by 5%</b> by leading business analytics initiatives that optimized <b>LinkedIn and website performance</b> through data-driven insights.</li>
                <li>Identified <b>key usability gaps</b> by leveraging <b>Google Analytics</b> for user behavior analysis, translating findings into actionable <b>product and marketing recommendations</b>.</li>
                <li>Accelerated <b>executive decision-making</b> by designing and maintaining <b>Tableau dashboards</b> with real-time visibility into <b>marketing and product KPIs</b>.</li>
                <li>Drove <b>KPI alignment across 3 business units</b> by translating complex analytics into clear recommendations for <b>Business Development, Capital Markets, and Strategy</b> stakeholders.</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="exp-row exp-row--has-tooltip flow">
          <div class="exp-row-top">
            <span class="exp-org">Intuit Canada · TurboTax</span>
            <span class="exp-role">Digital &amp; Data Activation Intern | Digital Marketing<span class="exp-dates">Sept 2024 — Apr 2025 · 8 mos</span></span>
            <span class="exp-tag exp-tag--coop">Co-op</span>
          </div>
          <div class="exp-details">
            <div class="exp-details-inner">
              <p class="exp-details-intro">Worked on the Digital Marketing team supporting data activation across TurboTax's 5M+ user base. My work spanned Customer Data Platforms, mobile attribution, and campaign analytics.</p>
              <ul>
                <li>Optimized <b>data integration and user tracking</b> for <b>5M+ users</b> by providing cross-platform support for <b>CDP and Kochava</b> mobile attribution systems, improving <b>attribution accuracy</b> across large-scale campaigns.</li>
                <li>Increased <b>campaign targeting precision</b> by building and activating <b>segmented audiences</b> using <b>Segment CDP and Braze</b>, enabling data-informed marketing decisions at scale.</li>
                <li>Improved <b>performance insight delivery</b> by deploying and optimizing <b>Kochava SmartLinks</b>, supporting faster <b>attribution reporting</b> for cross-functional stakeholders.</li>
                <li>Strengthened <b>data integrity</b> across Marketing teams by leading <b>MarTech documentation</b> and standardizing <b>Claravine CID taxonomy</b>, streamlining workflows across teams.</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="exp-row flow">
          <span class="exp-org">Innovative Business Association (IBA)</span>
          <span class="exp-role">Marketing Project Manager | Professional Development<span class="exp-dates">2025 — 2026 · 1 yr</span></span>
          <span class="exp-tag exp-tag--lead">Leadership</span>
        </div>
      </div>
`,

    /* ===================== CERTIFICATIONS ===================== */
    certifications: `
      <h2 class="home-h2 spaced word-fade">Always <em>learning.</em></h2>
      <div class="cert-grid">
        <div class="cert-card flow">
          <p class="cert-eyebrow">Google</p>
          <h3 class="cert-title">Data Analytics Professional<br>Certificate</h3>
          <div class="cert-tags">
            <span class="cert-chip">Data Cleaning</span>
            <span class="cert-chip">SQL Querying</span>
            <span class="cert-chip">Exploratory Data Analysis</span>
            <span class="cert-chip">Tableau</span>
            <span class="cert-chip">Statistical Analysis (R)</span>
            <span class="cert-chip">Data Storytelling</span>
          </div>
          <a href="https://coursera.org/share/9d9e1e655838ba468bf9b7b5470ab7bb" target="_blank" rel="noopener" class="cert-credential-btn">Show credential ↗</a>
        </div>
        <div class="cert-card flow">
          <p class="cert-eyebrow">Google</p>
          <h3 class="cert-title">Advanced Data Analytics Professional Certificate</h3>
          <div class="cert-tags">
            <span class="cert-chip">Statistical Modeling</span>
            <span class="cert-chip">Applied Machine Learning</span>
            <span class="cert-chip">Logistic Regression</span>
            <span class="cert-chip">NumPy</span>
            <span class="cert-chip">Interactive Data Visualization</span>
            <span class="cert-chip">Data-Driven Decision-Making</span>
          </div>
          <a href="https://www.credly.com/badges/7b83b715-b708-48a5-b93d-1f8a5a06c5dd" target="_blank" rel="noopener" class="cert-credential-btn">Show credential ↗</a>
        </div>
        <div class="cert-card flow">
          <p class="cert-eyebrow">Aha!</p>
          <h3 class="cert-title">Product Management Professional Certificate</h3>
          <div class="cert-tags">
            <span class="cert-chip">Product Roadmapping</span>
            <span class="cert-chip">Feature Prioritization</span>
            <span class="cert-chip">User Stories</span>
            <span class="cert-chip">Product Metrics &amp; KPIs</span>
            <span class="cert-chip">Stakeholder Alignment</span>
            <span class="cert-chip">Agile Lifecycle</span>
          </div>
          <a href="https://www.linkedin.com/learning/certificates/69bdaf3c865cb7ef0c7bc39a142da9111da5304e577a6bb2269b3b4013a04b70" target="_blank" rel="noopener" class="cert-credential-btn">Show credential ↗</a>
        </div>
      </div>
`,

    /* ===================== PROJECTS ===================== */
    projects: `
      <p class="eyebrow-tag flow">Projects</p>
      <h2 class="home-h2 word-fade">Work that<br>made an <em>impact.</em></h2>
      <div class="proj-grid">
        <a href="rsm.html" class="proj-card neutral flow">
          <p class="proj-eyebrow">UTM IBA · Ready, Set, Market — Fall 2025</p>
          <h3 class="proj-title">"A Formula For You"</h3>
          <p class="proj-desc">Estée Lauder Repositioning</p>
          <div class="proj-tags">
            <span class="proj-chip">Technical Expert</span>
            <span class="proj-chip">Case Competition</span>
          </div>
          <p class="proj-foot">Team: Paris Phan, Kim Nguyen, Sandeepa Das</p>
        </a>
        <a href="deerhacks.html" class="proj-card maroon flow">
          <p class="proj-eyebrow">MCSS · 2022 — 2024</p>
          <h3 class="proj-title">DeerHacks II &amp; III</h3>
          <p class="proj-desc">From building a brand to building a community.</p>
          <div class="proj-tags">
            <span class="proj-chip">Organizer</span>
            <span class="proj-chip">Hackathon</span>
            <span class="proj-chip">Leadership</span>
          </div>
        </a>
      </div>
`
  };

  document.querySelectorAll('[data-section]').forEach((slot) => {
    const html = SECTIONS[slot.dataset.section];
    if (!html) return;
    const tpl = document.createElement('template');
    tpl.innerHTML = html.trim();
    slot.replaceWith(tpl.content);
  });
})();
