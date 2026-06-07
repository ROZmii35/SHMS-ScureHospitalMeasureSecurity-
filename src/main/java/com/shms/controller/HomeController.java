package com.shms.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;

@RestController
public class HomeController {

    @GetMapping("/")
    public void redirectToIndex(HttpServletResponse response) throws IOException {
        response.sendRedirect("/index.html");
    }
}