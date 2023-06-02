package com.example.demo.Application;

import com.example.demo.Domain.Review;

import java.util.List;

public interface ReviewInputPort {
    List<Review> getAll();
    void createReview(Review review);

}
