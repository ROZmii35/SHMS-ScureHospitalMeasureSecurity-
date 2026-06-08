import{r as I,b as a}from"./auth-B4AlU-wO.js";import{g as L,i as A,u as C,f as S,s as q,a as D}from"./navigation-D4F0E2Hf.js";import{s as i}from"./toast-CAg5ONpg.js";(async()=>{const u=await I();if(!u){window.location.href="/pages/login.html";return}document.getElementById("app").innerHTML=L("appointments","Appointments","Schedule and manage patient appointments"),A("appointments"),C(u);let d=[],r=[],c=[],l=null;function b(){const e=document.getElementById("page-body");e.innerHTML=`
        <div class="filter-bar">
          <div class="search-bar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" class="form-input" id="search-input" placeholder="Search appointments..." />
          </div>
          <button class="btn btn-primary" id="add-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New Appointment
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
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Notes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="appointments-tbody"></tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="modal-overlay" id="modal-overlay">
          <div class="modal">
            <div class="modal-header">
              <h3 id="modal-title">New Appointment</h3>
              <button class="modal-close" id="modal-close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div class="modal-body">
              <form id="appointment-form">
                <div class="form-group">
                  <label for="patient_id">Patient *</label>
                  <select id="patient_id" class="form-select" required>
                    <option value="">Select Patient</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="doctor_id">Doctor *</label>
                  <select id="doctor_id" class="form-select" required>
                    <option value="">Select Doctor</option>
                  </select>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="appointment_date">Date *</label>
                    <input type="date" id="appointment_date" class="form-input" required />
                  </div>
                  <div class="form-group">
                    <label for="appointment_time">Time *</label>
                    <input type="time" id="appointment_time" class="form-input" required />
                  </div>
                </div>
                <div class="form-group">
                  <label for="status">Status</label>
                  <select id="status" class="form-select">
                    <option value="scheduled">Scheduled</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="notes">Notes</label>
                  <textarea id="notes" class="form-textarea" placeholder="Optional notes"></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" id="modal-cancel">Cancel</button>
              <button class="btn btn-primary" id="modal-save">Save Appointment</button>
            </div>
          </div>
        </div>
      `,w(),m(d),x()}function w(){const e=document.getElementById("patient_id"),t=document.getElementById("doctor_id");r.forEach(n=>{const o=document.createElement("option");o.value=n.id,o.textContent=n.full_name,e.appendChild(o)}),c.forEach(n=>{const o=document.createElement("option");o.value=n.id,o.textContent=`${n.full_name} - ${n.specialization||"General"}`,t.appendChild(o)})}function v(e){const t=r.find(n=>n.id===e);return(t==null?void 0:t.full_name)||"Unknown"}function f(e){const t=c.find(n=>n.id===e);return(t==null?void 0:t.full_name)||"Unknown"}function m(e){const t=document.getElementById("appointments-tbody");if(!e||e.length===0){t.innerHTML='<tr><td colspan="7"><div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><h4>No appointments found</h4><p>Schedule your first appointment</p></div></td></tr>';return}t.innerHTML=e.map(n=>`
        <tr>
          <td>${v(n.patient_id)}</td>
          <td>${f(n.doctor_id)}</td>
          <td>${S(n.appointment_date)}</td>
          <td>${n.appointment_time||"-"}</td>
          <td>${q(n.status)}</td>
          <td>${n.notes||"-"}</td>
          <td>
            <div class="actions-cell">
              <button class="btn-icon edit" data-id="${n.id}" title="Edit">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button class="btn-icon delete" data-id="${n.id}" title="Delete">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `).join(""),t.querySelectorAll(".btn-icon.edit").forEach(n=>{n.addEventListener("click",()=>E(n.dataset.id))}),t.querySelectorAll(".btn-icon.delete").forEach(n=>{n.addEventListener("click",()=>B(n.dataset.id))})}function y(e="New Appointment"){document.getElementById("modal-title").textContent=e,document.getElementById("modal-overlay").classList.add("active")}function s(){document.getElementById("modal-overlay").classList.remove("active"),document.getElementById("appointment-form").reset(),l=null}function E(e){const t=d.find(n=>n.id===e);t&&(l=e,document.getElementById("patient_id").value=t.patient_id,document.getElementById("doctor_id").value=t.doctor_id,document.getElementById("appointment_date").value=t.appointment_date||"",document.getElementById("appointment_time").value=t.appointment_time||"",document.getElementById("status").value=t.status||"scheduled",document.getElementById("notes").value=t.notes||"",y("Edit Appointment"))}async function _(){const e={patient_id:document.getElementById("patient_id").value,doctor_id:document.getElementById("doctor_id").value,appointment_date:document.getElementById("appointment_date").value,appointment_time:document.getElementById("appointment_time").value,status:document.getElementById("status").value,notes:document.getElementById("notes").value.trim()||null};if(!e.patient_id||!e.doctor_id||!e.appointment_date||!e.appointment_time){i("Please fill in all required fields","error");return}try{if(l){const{error:t}=await a.from("appointments").update(e).eq("id",l);if(t)throw t;i("Appointment updated","success")}else{const{error:t}=await a.from("appointments").insert(e);if(t)throw t;i("Appointment created","success")}s(),await p()}catch(t){i(t.message||"Failed to save appointment","error")}}async function B(e){if(await D("Delete Appointment","Are you sure you want to delete this appointment?"))try{const{error:n}=await a.from("appointments").delete().eq("id",e);if(n)throw n;i("Appointment deleted","success"),await p()}catch(n){i(n.message||"Failed to delete","error")}}async function p(){const{data:e,error:t}=await a.from("appointments").select("*").order("appointment_date",{ascending:!1});if(t){i("Failed to load appointments","error");return}d=e||[],m(d)}async function k(){const[e,t]=await Promise.all([a.from("patients").select("id, full_name").order("full_name"),a.from("doctors").select("id, full_name, specialization").order("full_name")]);r=e.data||[],c=t.data||[]}function x(){document.getElementById("add-btn").addEventListener("click",()=>{l=null,y()}),document.getElementById("modal-close").addEventListener("click",s),document.getElementById("modal-cancel").addEventListener("click",s),document.getElementById("modal-save").addEventListener("click",_),document.getElementById("modal-overlay").addEventListener("click",e=>{e.target===e.currentTarget&&s()}),document.getElementById("search-input").addEventListener("input",e=>{const t=e.target.value.toLowerCase(),n=d.filter(o=>{var h,g;return v(o.patient_id).toLowerCase().includes(t)||f(o.doctor_id).toLowerCase().includes(t)||((h=o.status)==null?void 0:h.includes(t))||((g=o.notes)==null?void 0:g.toLowerCase().includes(t))});m(n)})}await k(),b(),await p()})();
