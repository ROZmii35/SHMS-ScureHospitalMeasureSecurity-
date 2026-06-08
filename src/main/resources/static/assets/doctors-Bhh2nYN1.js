import{r as x,b as r}from"./auth-B4AlU-wO.js";import{g as k,i as B,u as I,a as L}from"./navigation-D4F0E2Hf.js";import{s as i}from"./toast-CAg5ONpg.js";(async()=>{const u=await x();if(!u){window.location.href="/pages/login.html";return}document.getElementById("app").innerHTML=k("doctors","Doctors","Manage doctor profiles and specializations"),B("doctors"),I(u);let l=[],n=null;function f(t){return(t==null?void 0:t.split(" ").map(e=>e[0]).join("").substring(0,2).toUpperCase())||"?"}function h(){const t=document.getElementById("page-body");t.innerHTML=`
        <div class="filter-bar">
          <div class="search-bar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" class="form-input" id="search-input" placeholder="Search doctors..." />
          </div>
          <button class="btn btn-primary" id="add-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Doctor
          </button>
        </div>

        <div class="card">
          <div class="card-body flush">
            <div class="table-wrapper">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Specialization</th>
                    <th>Phone</th>
                    <th>License No.</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="doctors-tbody"></tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="modal-overlay" id="modal-overlay">
          <div class="modal">
            <div class="modal-header">
              <h3 id="modal-title">Add Doctor</h3>
              <button class="modal-close" id="modal-close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div class="modal-body">
              <form id="doctor-form">
                <div class="form-group">
                  <label for="full_name">Full Name *</label>
                  <input type="text" id="full_name" class="form-input" placeholder="Dr. Full Name" required />
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="specialization">Specialization</label>
                    <select id="specialization" class="form-select">
                      <option value="">Select</option>
                      <option value="General Practice">General Practice</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Psychiatry">Psychiatry</option>
                      <option value="Surgery">Surgery</option>
                      <option value="Internal Medicine">Internal Medicine</option>
                      <option value="Obstetrics & Gynecology">Obstetrics & Gynecology</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="license_number">License Number</label>
                    <input type="text" id="license_number" class="form-input" placeholder="e.g. STR-12345" />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="phone">Phone</label>
                    <input type="tel" id="phone" class="form-input" placeholder="+62 xxx xxxx xxxx" />
                  </div>
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" class="form-input" placeholder="doctor@clinic.com" />
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" id="modal-cancel">Cancel</button>
              <button class="btn btn-primary" id="modal-save">Save Doctor</button>
            </div>
          </div>
        </div>
      `,d(l),E()}function d(t){const e=document.getElementById("doctors-tbody");if(!t||t.length===0){e.innerHTML='<tr><td colspan="5"><div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg><h4>No doctors found</h4><p>Add your first doctor to get started</p></div></td></tr>';return}e.innerHTML=t.map(o=>`
        <tr>
          <td>
            <div class="patient-info">
              <div class="avatar" style="background:var(--success-50);color:var(--success-600);">${f(o.full_name)}</div>
              <div class="patient-info-text">
                <div class="name">${o.full_name}</div>
                <div class="email">${o.email||"-"}</div>
              </div>
            </div>
          </td>
          <td>${o.specialization?`<span class="badge badge-blue">${o.specialization}</span>`:"-"}</td>
          <td>${o.phone||"-"}</td>
          <td>${o.license_number||"-"}</td>
          <td>
            <div class="actions-cell">
              <button class="btn-icon edit" data-id="${o.id}" title="Edit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button class="btn-icon delete" data-id="${o.id}" title="Delete">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `).join(""),e.querySelectorAll(".btn-icon.edit").forEach(o=>{o.addEventListener("click",()=>g(o.dataset.id))}),e.querySelectorAll(".btn-icon.delete").forEach(o=>{o.addEventListener("click",()=>w(o.dataset.id))})}function m(t="Add Doctor"){document.getElementById("modal-title").textContent=t,document.getElementById("modal-overlay").classList.add("active")}function a(){document.getElementById("modal-overlay").classList.remove("active"),document.getElementById("doctor-form").reset(),n=null}function g(t){const e=l.find(o=>o.id===t);e&&(n=t,document.getElementById("full_name").value=e.full_name||"",document.getElementById("specialization").value=e.specialization||"",document.getElementById("license_number").value=e.license_number||"",document.getElementById("phone").value=e.phone||"",document.getElementById("email").value=e.email||"",m("Edit Doctor"))}async function b(){const t={full_name:document.getElementById("full_name").value.trim(),specialization:document.getElementById("specialization").value||null,license_number:document.getElementById("license_number").value.trim()||null,phone:document.getElementById("phone").value.trim()||null,email:document.getElementById("email").value.trim()||null};if(!t.full_name){i("Full name is required","error");return}try{if(n){const{error:e}=await r.from("doctors").update(t).eq("id",n);if(e)throw e;i("Doctor updated successfully","success")}else{const{error:e}=await r.from("doctors").insert(t);if(e)throw e;i("Doctor added successfully","success")}a(),await s()}catch(e){i(e.message||"Failed to save doctor","error")}}async function w(t){if(await L("Delete Doctor","Are you sure you want to delete this doctor? This will also affect related appointments."))try{const{error:o}=await r.from("doctors").delete().eq("id",t);if(o)throw o;i("Doctor deleted","success"),await s()}catch(o){i(o.message||"Failed to delete doctor","error")}}async function s(){const{data:t,error:e}=await r.from("doctors").select("*").order("created_at",{ascending:!1});if(e){i("Failed to load doctors","error");return}l=t||[],d(l)}function E(){document.getElementById("add-btn").addEventListener("click",()=>{n=null,m()}),document.getElementById("modal-close").addEventListener("click",a),document.getElementById("modal-cancel").addEventListener("click",a),document.getElementById("modal-save").addEventListener("click",b),document.getElementById("modal-overlay").addEventListener("click",t=>{t.target===t.currentTarget&&a()}),document.getElementById("search-input").addEventListener("input",t=>{const e=t.target.value.toLowerCase(),o=l.filter(c=>{var p,v,y;return((p=c.full_name)==null?void 0:p.toLowerCase().includes(e))||((v=c.specialization)==null?void 0:v.toLowerCase().includes(e))||((y=c.email)==null?void 0:y.toLowerCase().includes(e))});d(o)})}h(),await s()})();
