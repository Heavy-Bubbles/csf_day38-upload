package sg.edu.nus.iss.uploadserver.controllers;

import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import jakarta.json.Json;
import jakarta.json.JsonObject;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import sg.edu.nus.iss.uploadserver.repositories.AudioRepo;

@Controller
public class AudioUploadController {
    
    @Autowired
    private AudioRepo audioRepo;

    @GetMapping(path = "/audio/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> getUrl(@PathVariable String id) {
        String url = audioRepo.getURL(id);
        JsonObject resp = Json.createObjectBuilder()
            .add("url", url)
            .build();
        //TODO: set media type
        return ResponseEntity.ok(resp.toString());
    }

    @PostMapping(path = "/audio", consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> postAudio(@RequestPart MultipartFile audio){
        try{
            String contentType = audio.getContentType();
            InputStream is = audio.getInputStream();
            String id = audioRepo.upload(contentType, is);
            JsonObject resp = Json.createObjectBuilder()
                .add("id", id)
                .build();
            return ResponseEntity.ok(resp.toString());
        } catch (Exception ex) {
            JsonObject resp = Json.createObjectBuilder()
                .add("error", ex.getMessage())
                .build();
            return ResponseEntity.status(HttpStatusCode.valueOf(500))
                .body(resp.toString());
        }
    }
}
