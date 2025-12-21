package com.petadoption.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/images")
public class ImageController {

    private static final String IMAGE_DIR = "D:/pet-images/";

    @GetMapping("/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename)
            throws IOException {

        Path filePath = Paths.get(IMAGE_DIR).resolve(filename).normalize();
        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        MediaType mediaType = MediaType.parseMediaType(
                Files.probeContentType(filePath));

        return ResponseEntity.ok()
                .contentType(mediaType)
                .body(resource);
    }
}
