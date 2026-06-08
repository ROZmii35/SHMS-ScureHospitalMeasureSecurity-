package com.shms.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "Nama tidak boleh kosong")
    @Size(min = 2, max = 100, message = "Nama harus 2-100 karakter")
    @Pattern(regexp = "^[a-zA-Z\\s.'-]+$", message = "Nama hanya boleh huruf dan spasi")
    private String fullname;

    @NotBlank(message = "Email tidak boleh kosong")
    @Email(message = "Format email tidak valid")
    @Size(max = 255)
    private String email;

    @NotBlank(message = "Password tidak boleh kosong")
    @Size(min = 8, max = 128, message = "Password minimal 8 karakter")
    @Pattern(
        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",
        message = "Password harus mengandung huruf besar, huruf kecil, dan angka"
    )
    private String password;

    @NotBlank(message = "Role tidak boleh kosong")
    @Pattern(regexp = "^(ADMIN|DOKTER|PASIEN|APOTEKER|PERAWAT)$",
             message = "Role tidak valid")
    private String role;
}
