package com.example.demo.Domain;

import com.example.demo.Application.ReviewInputPort;
import com.example.demo.Infrastructure.ReviewRepositoryAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReviewService implements ReviewInputPort {

    @Autowired
    private ReviewRepositoryAdapter reviewRepositoryAdapter;

    @Override
    public List<Review> getAll() {
        return this.reviewRepositoryAdapter.getAllReviews();
    }

    @Override
    public void createReview(Review review) {
        this.reviewRepositoryAdapter.createReview(review);
    }

}
