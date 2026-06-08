import{r as y,b as e}from"./auth-B4AlU-wO.js";import{g,i as m,u as x,f as d,s as n}from"./navigation-D4F0E2Hf.js";(async()=>{const i=await y();if(!i){window.location.href="/pages/login.html";return}document.getElementById("app").innerHTML=g("dashboard","Dashboard","Overview of your clinic operations"),m("dashboard"),x(i);const o=document.getElementById("page-body"),[r,l,c,h]=await Promise.all([e.from("patients").select("id",{count:"exact"}),e.from("doctors").select("id",{count:"exact"}),e.from("appointments").select("*").order("appointment_date",{ascending:!1}).limit(5),e.from("lab_results").select("*").eq("status","pending").limit(5)]),v=r.count||0,p=l.count||0,s=c.data||[],a=h.data||[],u=s.filter(t=>t.status==="scheduled").length;o.innerHTML=`
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-card-icon blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div class="stat-card-info">
            <h4>Total Patients</h4>
            <div class="stat-value">${v}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card-icon green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
          </div>
          <div class="stat-card-info">
            <h4>Doctors</h4>
            <div class="stat-value">${p}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card-icon amber">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <div class="stat-card-info">
            <h4>Scheduled Today</h4>
            <div class="stat-value">${u}</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card-icon red">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>
          </div>
          <div class="stat-card-info">
            <h4>Pending Labs</h4>
            <div class="stat-value">${a.length}</div>
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
        <div class="card">
          <div class="card-header">
            <h3>Recent Appointments</h3>
            <a href="/pages/appointments.html" class="btn btn-sm btn-secondary">View All</a>
          </div>
          <div class="card-body flush">
            ${s.length===0?`
              <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <h4>No appointments yet</h4>
                <p>Create your first appointment to get started</p>
              </div>
            `:`
              <table class="data-table">
                <thead>
                  <tr><th>Date</th><th>Time</th><th>Status</th><th>Notes</th></tr>
                </thead>
                <tbody>
                  ${s.map(t=>`
                    <tr>
                      <td>${d(t.appointment_date)}</td>
                      <td>${t.appointment_time||"-"}</td>
                      <td>${n(t.status)}</td>
                      <td>${t.notes||"-"}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            `}
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3>Pending Lab Results</h3>
            <a href="/pages/lab-results.html" class="btn btn-sm btn-secondary">View All</a>
          </div>
          <div class="card-body flush">
            ${a.length===0?`
              <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>
                <h4>No pending labs</h4>
                <p>All lab results are up to date</p>
              </div>
            `:`
              <table class="data-table">
                <thead>
                  <tr><th>Test Name</th><th>Date</th><th>Status</th></tr>
                </thead>
                <tbody>
                  ${a.map(t=>`
                    <tr>
                      <td>${t.test_name}</td>
                      <td>${d(t.test_date)}</td>
                      <td>${n(t.status)}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            `}
          </div>
        </div>
      </div>

      <div style="margin-top:24px;">
        <div class="card">
          <div class="card-header">
            <h3>Quick Actions</h3>
          </div>
          <div class="card-body" style="display:flex;gap:12px;flex-wrap:wrap;">
            <a href="/pages/patients.html" class="btn btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Patient
            </a>
            <a href="/pages/doctors.html" class="btn btn-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Doctor
            </a>
            <a href="/pages/appointments.html" class="btn btn-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              New Appointment
            </a>
            <a href="/pages/lab-results.html" class="btn btn-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Lab Result
            </a>
          </div>
        </div>
      </div>
    `})();
