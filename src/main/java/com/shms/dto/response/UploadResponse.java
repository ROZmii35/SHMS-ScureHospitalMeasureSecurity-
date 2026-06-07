package com.shms.dto.response;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UploadResponse {
    private Long fileId;
    private String originalName;
    private String storedName;
    private String hash;
}