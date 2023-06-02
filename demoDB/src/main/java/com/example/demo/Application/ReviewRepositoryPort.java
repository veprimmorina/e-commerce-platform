package com.example.demo.Application;

import com.example.demo.Domain.Review;

import java.util.List;

public interface ReviewRepositoryPort {

    List<Review> getAllReviews();

    void createReview(Review review);
}
