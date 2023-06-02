package com.example.demo.Infrastructure;

import com.example.demo.Application.ReviewInputPort;
import com.example.demo.Domain.ProductService;
import com.example.demo.Domain.Review;
import com.example.demo.Domain.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
@RestController
@RequestMapping("/api/review")
public class ReviewController implements ReviewInputPort {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private ProductService productService;
    @Override
    @GetMapping("get/all")
    public List<Review> getAll() {
        return this.reviewService.getAll();
    }

    @Override
    @PostMapping("insert/review")
    public void createReview(@RequestBody Review review) {
        this.reviewService.createReview(review);
    }



}
