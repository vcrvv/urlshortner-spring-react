package com.urlshortener.backend.controller;

import com.urlshortener.backend.dto.UrlRequest;
import com.urlshortener.backend.model.Url;
import com.urlshortener.backend.service.UrlService;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class UrlController {

    private final UrlService urlService;

    public UrlController(UrlService urlService) {
        this.urlService = urlService;
    }

    @PostMapping("/shorten")
    public ResponseEntity<Url> createUrl(@Valid @RequestBody UrlRequest urlRequest) {
        Url url = urlService.createUrl(urlRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(url);
    }

    @GetMapping("/{shortUrl}")
    public ResponseEntity<Void> redirect(@PathVariable String shortUrl) {
        Url url = urlService.getUrl(shortUrl);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(java.net.URI.create(url.getLongUrl()));
        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }

    @GetMapping("/")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("OK");
    }
}
