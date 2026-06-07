package com.shms.controller;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.shms.service.LabResultService;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class LabResultController {
    private final LabResultService service;
    @GetMapping("/upload")
    public String uploadPage() {
        return "upload";
    }
    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file,Model model) {
        try {
            service.saveFile(file);
            model.addAttribute(
                "message",
                "Upload berhasil"
            );
        } catch (Exception e) {
            model.addAttribute(
                "message",
                e.getMessage()
            );
        }
        return "upload";
    }
}