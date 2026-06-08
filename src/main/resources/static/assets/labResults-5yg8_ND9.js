import{r as w,b as s}from"./auth-B4AlU-wO.js";import{g as k,i as L,u as I,f as x,s as C,a as R}from"./navigation-D4F0E2Hf.js";import{s as a}from"./toast-CAg5ONpg.js";(async()=>{const c=await w();if(!c){window.location.href="/pages/login.html";return}document.getElementById("app").innerHTML=k("lab-results","Lab Results","Track and manage laboratory test results"),L("lab-results"),I(c);let o=[],d=[],l=null;function m(n){var e;return((e=d.find(t=>t.id===n))==null?void 0:e.full_name)||"Unknown"}function y(){const n=document.getElementById("page-body");n.innerHTML=`
        <div class="filter-bar">
          <div class="search-bar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" class="form-input" id="search-input" placeholder="Search lab results..." />
          </div>
          <button class="btn btn-primary" id="add-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Lab Result
          </button>
        </div>

        <div class="card">
          <div class="card-body flush">
            <div class="table-wrapper">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Test Name</th>
                    <th>Result</th>
                    <th>Reference Range</th>
                    <th>Test Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="results-tbody"></tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="modal-overlay" id="modal-overlay">
          <div class="modal">
            <div class="modal-header">
              <h3 id="modal-title">Add Lab Result</h3>
              <button class="modal-close" id="modal-close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div class="modal-body">
              <form id="result-form">
                <div class="form-group">
                  <label for="patient_id">Patient *</label>
                  <select id="patient_id" class="form-select" required><option value="">Select Patient</option></select>
                </div>
                <div class="form-group">
                  <label for="test_name">Test Name *</label>
                  <select id="test_name" class="form-select" required>
                    <option value="">Select Test</option>
                    <option value="Complete Blood Count">Complete Blood Count (CBC)</option>
                    <option value="Blood Glucose">Blood Glucose</option>
                    <option value="Hemoglobin A1c">Hemoglobin A1c</option>
                    <option value="Lipid Panel">Lipid Panel</option>
                    <option value="Liver Function Test">Liver Function Test</option>
                    <option value="Kidney Function Test">Kidney Function Test</option>
                    <option value="Thyroid Panel">Thyroid Panel</option>
                    <option value="Urinalysis">Urinalysis</option>
                    <option value="Chest X-Ray">Chest X-Ray</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="result_value">Result Value</label>
                    <input type="text" id="result_value" class="form-input" placeholder="e.g. 120" />
                  </div>
                  <div class="form-group">
                    <label for="unit">Unit</label>
                    <input type="text" id="unit" class="form-input" placeholder="e.g. mg/dL" />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="reference_range">Reference Range</label>
                    <input type="text" id="reference_range" class="form-input" placeholder="e.g. 70-100" />
                  </div>
                  <div class="form-group">
                    <label for="status">Status</label>
                    <select id="status" class="form-select">
                      <option value="pending">Pending</option>
                      <option value="normal">Normal</option>
                      <option value="abnormal">Abnormal</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label for="test_date">Test Date *</label>
                  <input type="date" id="test_date" class="form-input" required />
                </div>
                <div class="form-group">
                  <label for="notes">Notes</label>
                  <textarea id="notes" class="form-textarea" placeholder="Additional notes"></textarea>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" id="modal-cancel">Cancel</button>
              <button class="btn btn-primary" id="modal-save">Save Result</button>
            </div>
          </div>
        </div>
      `,g(),r(o),B()}function g(){const n=document.getElementById("patient_id");d.forEach(e=>{const t=document.createElement("option");t.value=e.id,t.textContent=e.full_name,n.appendChild(t)})}function r(n){const e=document.getElementById("results-tbody");if(!n||n.length===0){e.innerHTML='<tr><td colspan="7"><div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg><h4>No lab results found</h4><p>Add your first lab result</p></div></td></tr>';return}e.innerHTML=n.map(t=>`
        <tr>
          <td>${m(t.patient_id)}</td>
          <td>${t.test_name}</td>
          <td>${t.result_value?`${t.result_value} ${t.unit||""}`:"-"}</td>
          <td>${t.reference_range||"-"}</td>
          <td>${x(t.test_date)}</td>
          <td>${C(t.status)}</td>
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
      `).join(""),e.querySelectorAll(".btn-icon.edit").forEach(t=>t.addEventListener("click",()=>b(t.dataset.id))),e.querySelectorAll(".btn-icon.delete").forEach(t=>t.addEventListener("click",()=>_(t.dataset.id)))}function v(n="Add Lab Result"){document.getElementById("modal-title").textContent=n,document.getElementById("modal-overlay").classList.add("active")}function i(){document.getElementById("modal-overlay").classList.remove("active"),document.getElementById("result-form").reset(),l=null}function b(n){const e=o.find(t=>t.id===n);e&&(l=n,document.getElementById("patient_id").value=e.patient_id,document.getElementById("test_name").value=e.test_name||"",document.getElementById("result_value").value=e.result_value||"",document.getElementById("unit").value=e.unit||"",document.getElementById("reference_range").value=e.reference_range||"",document.getElementById("status").value=e.status||"pending",document.getElementById("test_date").value=e.test_date||"",document.getElementById("notes").value=e.notes||"",v("Edit Lab Result"))}async function h(){const n={patient_id:document.getElementById("patient_id").value,test_name:document.getElementById("test_name").value,result_value:document.getElementById("result_value").value.trim()||null,unit:document.getElementById("unit").value.trim()||null,reference_range:document.getElementById("reference_range").value.trim()||null,status:document.getElementById("status").value,test_date:document.getElementById("test_date").value,notes:document.getElementById("notes").value.trim()||null};if(!n.patient_id||!n.test_name||!n.test_date){a("Please fill in all required fields","error");return}try{if(l){const{error:e}=await s.from("lab_results").update(n).eq("id",l);if(e)throw e;a("Lab result updated","success")}else{const{error:e}=await s.from("lab_results").insert(n);if(e)throw e;a("Lab result added","success")}i(),await u()}catch(e){a(e.message||"Failed to save","error")}}async function _(n){if(await R("Delete Lab Result","Are you sure you want to delete this lab result?"))try{const{error:t}=await s.from("lab_results").delete().eq("id",n);if(t)throw t;a("Lab result deleted","success"),await u()}catch(t){a(t.message||"Failed to delete","error")}}async function u(){const{data:n,error:e}=await s.from("lab_results").select("*").order("test_date",{ascending:!1});if(e){a("Failed to load results","error");return}o=n||[],r(o)}async function E(){const{data:n}=await s.from("patients").select("id, full_name").order("full_name");d=n||[]}function B(){document.getElementById("add-btn").addEventListener("click",()=>{l=null,v()}),document.getElementById("modal-close").addEventListener("click",i),document.getElementById("modal-cancel").addEventListener("click",i),document.getElementById("modal-save").addEventListener("click",h),document.getElementById("modal-overlay").addEventListener("click",n=>{n.target===n.currentTarget&&i()}),document.getElementById("search-input").addEventListener("input",n=>{const e=n.target.value.toLowerCase();r(o.filter(t=>{var p,f;return m(t.patient_id).toLowerCase().includes(e)||((p=t.test_name)==null?void 0:p.toLowerCase().includes(e))||((f=t.status)==null?void 0:f.includes(e))}))})}await E(),y(),await u()})();
