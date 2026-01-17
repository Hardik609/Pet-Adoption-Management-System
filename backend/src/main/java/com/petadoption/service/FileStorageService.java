package com.petadoption.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    public String savePendingPetImage(MultipartFile file) throws IOException {

        Path folderPath = Paths.get(uploadDir, "pets");
        Files.createDirectories(folderPath);

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = folderPath.resolve(fileName);

        Files.copy(file.getInputStream(), filePath);

        // IMPORTANT: return relative path
        return "/pets/" + fileName;
    }
}
