// src/pages/UploadLab.tsx — tambahkan fungsi ini di dalam komponen

const handleUpload = async () => {
    if (!selectedFile) {
        showToast("Pilih file terlebih dahulu", "error");
        return;
    }
    const token = sessionStorage.getItem("authToken");
    if (!token) {
        showToast("Anda belum login", "error");
        return;
    }
    const formData = new FormData();
    // metadata sebagai JSON part
    formData.append(
        "metadata",
        new Blob([JSON.stringify({ patientId: 1, category: "LAB", description: "Lab result" })],
                 { type: "application/json" })
    );
    formData.append("file", selectedFile);
    try {
        const res = await fetch("http://localhost:8080/api/upload", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
            // NOTE: Jangan set Content-Type manual agar browser set boundary otomatis
        });
        if (!res.ok) throw new Error(await res.text());
        showToast("Upload berhasil!", "success");
        setSelectedFile(null);
    } catch (e: unknown) {
        showToast((e as Error).message, "error");
    }
};
