import{r as B,b as a}from"./auth-B4AlU-wO.js";import{g as k,i as I,u as L,f as C,a as R}from"./navigation-D4F0E2Hf.js";import{s as i}from"./toast-CAg5ONpg.js";(async()=>{const v=await B();if(!v){window.location.href="/pages/login.html";return}document.getElementById("app").innerHTML=k("medical-records","Medical Records","View and manage patient medical records"),I("medical-records"),L(v);let n=[],s=[],c=[],r=null;function p(o){var e;return((e=s.find(t=>t.id===o))==null?void 0:e.full_name)||"Unknown"}function f(o){var e;return((e=c.find(t=>t.id===o))==null?void 0:e.full_name)||"Unknown"}function g(){const o=document.getElementById("page-body");o.innerHTML=`
        <div class="filter-bar">
          <div class="search-bar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" class="form-input" id="search-input" placeholder="Search records..." />
          </div>
          <button class="btn btn-primary" id="add-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Record
          </button>
        </div>

        <div class="card">
          <div class="card-body flush">
            <div class="table-wrapper">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Visit Date</th>
                    <th>Diagnosis</th>
                    <th>Treatment</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="records-tbody"></tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="modal-overlay" id="modal-overlay">
          <div class="modal" style="max-width:580px;">
            <div class="modal-header">
              <h3 id="modal-title">Add Medical Record</h3>
              <button class="modal-close" id="modal-close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div class="modal-body">
              <form id="record-form">
                <div class="form-row">
                  <div class="form-group">
                    <label for="patient_id">Patient *</label>
                    <select id="patient_id" class="form-select" required><option value="">Select Patient</option></select>
                  </div>
                  <div class="form-group">
                    <label for="doctor_id">Doctor *</label>
                    <select id="doctor_id" class="form-select" required><option value="">Select Doctor</option></select>
                  </div>
                </div>
                <div class="form-group">
                  <label for="visit_date">Visit Date *</label>
                  <input type="date" id="visit_date" class="form-input" required />
                </div>
                <div class="form-group">
                  <label for="diagnosis">Diagnosis *</label>
                  <input type="text" id="diagnosis" class="form-input" placeholder="Enter diagnosis" required />
                </div>
                <div class="form-group">
                  <label for="treatment">Treatment</label>
                  <textarea id="treatment" class="form-textarea" placeholder="Treatment plan"></textarea>
                </div>
                <div class="form-group">
                  <label for="prescription">Prescription</label>
                  <textarea id="prescription" class="form-textarea" placeholder="Medication & dosage"></textarea>
                </div>
                <div class="form-group">
                  <label for="notes">Notes</label>
                  <textarea id="notes" class="form-textarea" placeholder="Additional notes"></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" id="modal-cancel">Cancel</button>
              <button class="btn btn-primary" id="modal-save">Save Record</button>
            </div>
          </div>
        </div>
      `,h(),m(n),x()}function h(){const o=document.getElementById("patient_id"),e=document.getElementById("doctor_id");s.forEach(t=>{const d=document.createElement("option");d.value=t.id,d.textContent=t.full_name,o.appendChild(d)}),c.forEach(t=>{const d=document.createElement("option");d.value=t.id,d.textContent=`${t.full_name} - ${t.specialization||"General"}`,e.appendChild(d)})}function m(o){const e=document.getElementById("records-tbody");if(!o||o.length===0){e.innerHTML='<tr><td colspan="6"><div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg><h4>No medical records found</h4><p>Add your first medical record</p></div></td></tr>';return}e.innerHTML=o.map(t=>`
        <tr>
          <td>${p(t.patient_id)}</td>
          <td>${f(t.doctor_id)}</td>
          <td>${C(t.visit_date)}</td>
          <td>${t.diagnosis}</td>
          <td>${t.treatment||"-"}</td>
          <td>
            <div class="actions-cell">
              <button class="btn-icon edit" data-id="${t.id}" title="Edit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button class="btn-icon delete" data-id="${t.id}" title="Delete">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `).join(""),e.querySelectorAll(".btn-icon.edit").forEach(t=>t.addEventListener("click",()=>b(t.dataset.id))),e.querySelectorAll(".btn-icon.delete").forEach(t=>t.addEventListener("click",()=>w(t.dataset.id)))}function y(o="Add Medical Record"){document.getElementById("modal-title").textContent=o,document.getElementById("modal-overlay").classList.add("active")}function l(){document.getElementById("modal-overlay").classList.remove("active"),document.getElementById("record-form").reset(),r=null}function b(o){const e=n.find(t=>t.id===o);e&&(r=o,document.getElementById("patient_id").value=e.patient_id,document.getElementById("doctor_id").value=e.doctor_id,document.getElementById("visit_date").value=e.visit_date||"",document.getElementById("diagnosis").value=e.diagnosis||"",document.getElementById("treatment").value=e.treatment||"",document.getElementById("prescription").value=e.prescription||"",document.getElementById("notes").value=e.notes||"",y("Edit Medical Record"))}async function E(){const o={patient_id:document.getElementById("patient_id").value,doctor_id:document.getElementById("doctor_id").value,visit_date:document.getElementById("visit_date").value,diagnosis:document.getElementById("diagnosis").value.trim(),treatment:document.getElementById("treatment").value.trim()||null,prescription:document.getElementById("prescription").value.trim()||null,notes:document.getElementById("notes").value.trim()||null};if(!o.patient_id||!o.doctor_id||!o.visit_date||!o.diagnosis){i("Please fill in all required fields","error");return}try{if(r){const{error:e}=await a.from("medical_records").update(o).eq("id",r);if(e)throw e;i("Record updated","success")}else{const{error:e}=await a.from("medical_records").insert(o);if(e)throw e;i("Record added","success")}l(),await u()}catch(e){i(e.message||"Failed to save","error")}}async function w(o){if(await R("Delete Record","Are you sure you want to delete this medical record?"))try{const{error:t}=await a.from("medical_records").delete().eq("id",o);if(t)throw t;i("Record deleted","success"),await u()}catch(t){i(t.message||"Failed to delete","error")}}async function u(){const{data:o,error:e}=await a.from("medical_records").select("*").order("visit_date",{ascending:!1});if(e){i("Failed to load records","error");return}n=o||[],m(n)}async function _(){const[o,e]=await Promise.all([a.from("patients").select("id, full_name").order("full_name"),a.from("doctors").select("id, full_name, specialization").order("full_name")]);s=o.data||[],c=e.data||[]}function x(){document.getElementById("add-btn").addEventListener("click",()=>{r=null,y()}),document.getElementById("modal-close").addEventListener("click",l),document.getElementById("modal-cancel").addEventListener("click",l),document.getElementById("modal-save").addEventListener("click",E),document.getElementById("modal-overlay").addEventListener("click",o=>{o.target===o.currentTarget&&l()}),document.getElementById("search-input").addEventListener("input",o=>{const e=o.target.value.toLowerCase();m(n.filter(t=>{var d;return p(t.patient_id).toLowerCase().includes(e)||f(t.doctor_id).toLowerCase().includes(e)||((d=t.diagnosis)==null?void 0:d.toLowerCase().includes(e))}))})}await _(),g(),await u()})();
