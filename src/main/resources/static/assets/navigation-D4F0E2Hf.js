import{c as m,d as g,e as h}from"./auth-B4AlU-wO.js";function f(e){document.querySelectorAll(".sidebar-nav-item").forEach(t=>{t.classList.remove("active"),t.dataset.page===e&&t.classList.add("active"),t.addEventListener("click",()=>{const s=t.dataset.href;s&&(window.location.href=s)})});const a=document.getElementById("logout-btn");a&&a.addEventListener("click",async()=>{try{await m()}catch(t){console.error("Logout failed",t)}});const n=document.getElementById("mobile-menu-btn"),r=document.getElementById("sidebar"),o=document.getElementById("sidebar-overlay");n&&r&&o&&(n.addEventListener("click",()=>{r.classList.toggle("open"),o.classList.toggle("active")}),o.addEventListener("click",()=>{r.classList.remove("open"),o.classList.remove("active")}))}function y(e){const i=document.getElementById("user-avatar"),a=document.getElementById("user-name"),n=document.getElementById("user-email");i&&(i.textContent=g(e==null?void 0:e.email)),a&&(a.textContent=h(e)),n&&(n.textContent=(e==null?void 0:e.email)||"")}function x(e){return e?new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):"-"}function k(e){return`<span class="badge ${{scheduled:"badge-blue",completed:"badge-green",cancelled:"badge-red","in-progress":"badge-amber",pending:"badge-amber",normal:"badge-green",abnormal:"badge-red"}[e]||"badge-gray"}">${e}</span>`}function u(){return`
    <div class="sidebar-brand">
      <div class="sidebar-brand-icon">M</div>
      <div class="sidebar-brand-text">
        <h2>MedClinic</h2>
        <span>Management System</span>
      </div>
    </div>
    <nav class="sidebar-nav">
      <div class="sidebar-nav-section">
        <div class="sidebar-nav-section-title">Main</div>
        <a href="/pages/dashboard.html" class="sidebar-nav-item" data-page="dashboard" data-href="/pages/dashboard.html">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          Dashboard
        </a>
      </div>
      <div class="sidebar-nav-section">
        <div class="sidebar-nav-section-title">Management</div>
        <a href="/pages/patients.html" class="sidebar-nav-item" data-page="patients" data-href="/pages/patients.html">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Patients
        </a>
        <a href="/pages/doctors.html" class="sidebar-nav-item" data-page="doctors" data-href="/pages/doctors.html">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
          Doctors
        </a>
        <a href="/pages/appointments.html" class="sidebar-nav-item" data-page="appointments" data-href="/pages/appointments.html">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Appointments
        </a>
      </div>
      <div class="sidebar-nav-section">
        <div class="sidebar-nav-section-title">Records</div>
        <a href="/pages/medical-records.html" class="sidebar-nav-item" data-page="medical-records" data-href="/pages/medical-records.html">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          Medical Records
        </a>
        <a href="/pages/lab-results.html" class="sidebar-nav-item" data-page="lab-results" data-href="/pages/lab-results.html">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>
          Lab Results
        </a>
      </div>
    </nav>
    <div class="sidebar-footer">
      <div class="sidebar-user">
        <div class="sidebar-user-avatar" id="user-avatar">U</div>
        <div class="sidebar-user-info">
          <p id="user-name">User</p>
          <span id="user-email">user@email.com</span>
        </div>
      </div>
      <button id="logout-btn" class="sidebar-nav-item" style="margin-top:8px;width:100%;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Logout
      </button>
    </div>
  `}function p(){return`
    <div class="confirm-overlay" id="confirm-overlay">
      <div class="confirm-dialog">
        <h3 id="confirm-title">Confirm Delete</h3>
        <p id="confirm-message">Are you sure you want to delete this item? This action cannot be undone.</p>
        <div class="btn-row">
          <button class="btn btn-secondary" id="confirm-cancel">Cancel</button>
          <button class="btn btn-danger" id="confirm-ok">Delete</button>
        </div>
      </div>
    </div>
  `}function w(e,i){return new Promise(a=>{const n=document.getElementById("confirm-overlay"),r=document.getElementById("confirm-title"),o=document.getElementById("confirm-message"),t=document.getElementById("confirm-cancel"),s=document.getElementById("confirm-ok");r&&(r.textContent=e),o&&(o.textContent=i),n&&n.classList.add("active");const d=v=>{n&&n.classList.remove("active"),t==null||t.removeEventListener("click",l),s==null||s.removeEventListener("click",c),a(v)},l=()=>d(!1),c=()=>d(!0);t==null||t.addEventListener("click",l),s==null||s.addEventListener("click",c)})}function E(e,i,a){return`
    <div class="sidebar-overlay" id="sidebar-overlay"></div>
    <div class="app-layout">
      <aside class="sidebar" id="sidebar">
        ${u()}
      </aside>
      <div class="main-content">
        <header class="page-header">
          <div class="page-header-left">
            <button class="mobile-menu-btn" id="mobile-menu-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <div>
              <h1>${i}</h1>
              <p>${a}</p>
            </div>
          </div>
        </header>
        <main class="page-body" id="page-body">
        </main>
      </div>
    </div>
    ${p()}
  `}export{w as a,x as f,E as g,f as i,k as s,y as u};
