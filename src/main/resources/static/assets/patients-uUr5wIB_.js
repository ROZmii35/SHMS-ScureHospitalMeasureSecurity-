import{r as w,b as i}from"./auth-B4AlU-wO.js";import{g as x,i as _,u as k,f as I,a as A}from"./navigation-D4F0E2Hf.js";import{s as a}from"./toast-CAg5ONpg.js";(async()=>{const u=await w();if(!u){window.location.href="/pages/login.html";return}document.getElementById("app").innerHTML=x("patients","Patients","Manage your patient records"),_("patients"),k(u);let n=[],l=null;function y(t){return(t==null?void 0:t.split(" ").map(e=>e[0]).join("").substring(0,2).toUpperCase())||"?"}function h(){const t=document.getElementById("page-body");t.innerHTML=`
        <div class="filter-bar">
          <div class="search-bar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" class="form-input" id="search-input" placeholder="Search patients..." />
          </div>
          <button class="btn btn-primary" id="add-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Patient
          </button>
        </div>

        <div class="card">
          <div class="card-body flush">
            <div class="table-wrapper">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Gender</th>
                    <th>Date of Birth</th>
                    <th>Phone</th>
                    <th>Blood Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="patients-tbody">
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- MODAL -->
        <div class="modal-overlay" id="modal-overlay">
          <div class="modal">
            <div class="modal-header">
              <h3 id="modal-title">Add Patient</h3>
              <button class="modal-close" id="modal-close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div class="modal-body">
              <form id="patient-form">
                <div class="form-group">
                  <label for="full_name">Full Name *</label>
                  <input type="text" id="full_name" class="form-input" placeholder="Enter full name" required />
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="date_of_birth">Date of Birth</label>
                    <input type="date" id="date_of_birth" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label for="gender">Gender</label>
                    <select id="gender" class="form-select">
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="phone">Phone</label>
                    <input type="tel" id="phone" class="form-input" placeholder="+62 xxx xxxx xxxx" />
                  </div>
                  <div class="form-group">
                    <label for="blood_type">Blood Type</label>
                    <select id="blood_type" class="form-select">
                      <option value="">Select</option>
                      <option value="A+">A+</option><option value="A-">A-</option>
                      <option value="B+">B+</option><option value="B-">B-</option>
                      <option value="AB+">AB+</option><option value="AB-">AB-</option>
                      <option value="O+">O+</option><option value="O-">O-</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" class="form-input" placeholder="patient@email.com" />
                </div>
                <div class="form-group">
                  <label for="address">Address</label>
                  <textarea id="address" class="form-textarea" placeholder="Enter address"></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" id="modal-cancel">Cancel</button>
              <button class="btn btn-primary" id="modal-save">Save Patient</button>
            </div>
          </div>
        </div>
      `,r(n),E()}function r(t){const e=document.getElementById("patients-tbody");if(!t||t.length===0){e.innerHTML='<tr><td colspan="6"><div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><h4>No patients found</h4><p>Add your first patient to get started</p></div></td></tr>';return}e.innerHTML=t.map(o=>`
        <tr>
          <td>
            <div class="patient-info">
              <div class="avatar">${y(o.full_name)}</div>
              <div class="patient-info-text">
                <div class="name">${o.full_name}</div>
                <div class="email">${o.email||"-"}</div>
              </div>
            </div>
          </td>
          <td>${o.gender||"-"}</td>
          <td>${I(o.date_of_birth)}</td>
          <td>${o.phone||"-"}</td>
          <td>${o.blood_type?`<span class="badge badge-red">${o.blood_type}</span>`:"-"}</td>
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
      `).join(""),e.querySelectorAll(".btn-icon.edit").forEach(o=>{o.addEventListener("click",()=>g(o.dataset.id))}),e.querySelectorAll(".btn-icon.delete").forEach(o=>{o.addEventListener("click",()=>B(o.dataset.id))})}function m(t="Add Patient"){document.getElementById("modal-title").textContent=t,document.getElementById("modal-overlay").classList.add("active")}function d(){document.getElementById("modal-overlay").classList.remove("active"),document.getElementById("patient-form").reset(),l=null}function g(t){const e=n.find(o=>o.id===t);e&&(l=t,document.getElementById("full_name").value=e.full_name||"",document.getElementById("date_of_birth").value=e.date_of_birth||"",document.getElementById("gender").value=e.gender||"",document.getElementById("phone").value=e.phone||"",document.getElementById("email").value=e.email||"",document.getElementById("blood_type").value=e.blood_type||"",document.getElementById("address").value=e.address||"",m("Edit Patient"))}async function b(){const t={full_name:document.getElementById("full_name").value.trim(),date_of_birth:document.getElementById("date_of_birth").value||null,gender:document.getElementById("gender").value||null,phone:document.getElementById("phone").value.trim()||null,email:document.getElementById("email").value.trim()||null,blood_type:document.getElementById("blood_type").value||null,address:document.getElementById("address").value.trim()||null};if(!t.full_name){a("Full name is required","error");return}try{if(l){const{error:e}=await i.from("patients").update(t).eq("id",l);if(e)throw e;a("Patient updated successfully","success")}else{const{error:e}=await i.from("patients").insert(t);if(e)throw e;a("Patient added successfully","success")}d(),await s()}catch(e){a(e.message||"Failed to save patient","error")}}async function B(t){if(await A("Delete Patient","Are you sure you want to delete this patient? This will also delete related records."))try{const{error:o}=await i.from("patients").delete().eq("id",t);if(o)throw o;a("Patient deleted","success"),await s()}catch(o){a(o.message||"Failed to delete patient","error")}}async function s(){const{data:t,error:e}=await i.from("patients").select("*").order("created_at",{ascending:!1});if(e){a("Failed to load patients","error");return}n=t||[],r(n)}function E(){document.getElementById("add-btn").addEventListener("click",()=>{l=null,m()}),document.getElementById("modal-close").addEventListener("click",d),document.getElementById("modal-cancel").addEventListener("click",d),document.getElementById("modal-save").addEventListener("click",b),document.getElementById("modal-overlay").addEventListener("click",t=>{t.target===t.currentTarget&&d()}),document.getElementById("search-input").addEventListener("input",t=>{const e=t.target.value.toLowerCase(),o=n.filter(c=>{var p,v,f;return((p=c.full_name)==null?void 0:p.toLowerCase().includes(e))||((v=c.email)==null?void 0:v.toLowerCase().includes(e))||((f=c.phone)==null?void 0:f.includes(e))});r(o)})}h(),await s()})();
