package com.shms.util;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class EncryptionUtil {
    private static final String SECRET =
            "1234567890123456";
    public static String encrypt(
            String value
    ){
        try{
            SecretKeySpec key =
                    new SecretKeySpec(
                            SECRET.getBytes(),
                            "AES"
                    );
            Cipher cipher =
                    Cipher.getInstance(
                            "AES"
                    );
            cipher.init(
                    Cipher.ENCRYPT_MODE,
                    key
            );
            return Base64.getEncoder()
                    .encodeToString(
                            cipher.doFinal(
                                    value.getBytes()
                            )
                    );
        }catch(Exception e){
            throw new RuntimeException(e);
        }
    }
}