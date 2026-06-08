package com.shms.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;
import java.util.Base64;

/**
 * Enkripsi data sensitif (nomor HP, alamat, dll.) menggunakan AES-128-CBC.
 * - Key diambil dari application.properties (bukan hardcoded)
 * - Setiap enkripsi menggunakan IV acak (cegah pattern attack)
 * - Format output: Base64(IV) + ":" + Base64(ciphertext)
 */
@Component
public class EncryptionUtil {

    private final byte[] keyBytes;
    private static final String ALGORITHM = "AES/CBC/PKCS5Padding";

    public EncryptionUtil(@Value("${encryption.key}") String encryptionKey) {
        // Pastikan tepat 16 byte (AES-128)
        byte[] raw = encryptionKey.getBytes();
        this.keyBytes = new byte[16];
        System.arraycopy(raw, 0, keyBytes, 0, Math.min(raw.length, 16));
    }

    public String encrypt(String value) {
        try {
            byte[] iv = new byte[16];
            new SecureRandom().nextBytes(iv); // IV acak setiap enkripsi

            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE,
                    new SecretKeySpec(keyBytes, "AES"),
                    new IvParameterSpec(iv));

            byte[] encrypted = cipher.doFinal(value.getBytes("UTF-8"));

            return Base64.getEncoder().encodeToString(iv)
                    + ":" +
                   Base64.getEncoder().encodeToString(encrypted);
        } catch (Exception e) {
            throw new RuntimeException("Encryption failed", e);
        }
    }

    public String decrypt(String encryptedValue) {
        try {
            String[] parts = encryptedValue.split(":");
            if (parts.length != 2) throw new IllegalArgumentException("Invalid format");

            byte[] iv        = Base64.getDecoder().decode(parts[0]);
            byte[] ciphertext = Base64.getDecoder().decode(parts[1]);

            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE,
                    new SecretKeySpec(keyBytes, "AES"),
                    new IvParameterSpec(iv));

            return new String(cipher.doFinal(ciphertext), "UTF-8");
        } catch (Exception e) {
            throw new RuntimeException("Decryption failed", e);
        }
    }
}
