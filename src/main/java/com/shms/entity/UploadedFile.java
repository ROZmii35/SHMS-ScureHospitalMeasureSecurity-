package com.shms.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="uploaded_files")
@Getter
@Setter
public class UploadedFile {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long fileId;
    @ManyToOne
    private User uploader;
    private String originalName;
    private String storedName;
    private String fileHash;
    private String mimeType;
    private Boolean isScanned;
    private Long patientId;

    private Long medicalRecordId;

    private String category;

    private String description;
    public void setFileSize(long size) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setFileSize'");
    }
}
