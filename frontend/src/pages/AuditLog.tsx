// src/pages/AuditLog.tsx — tambahkan import dan useEffect ini

import { useEffect, useState } from 'react';
import { apiFetch } from '../utils/api';

// Di dalam komponen:
const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

useEffect(() => {
    apiFetch<AuditLog[]>("/api/audit-log")
        .then(setAuditLogs)
        .catch(console.error);
}, []);
