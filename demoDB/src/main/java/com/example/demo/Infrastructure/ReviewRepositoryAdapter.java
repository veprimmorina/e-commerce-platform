package com.example.demo.Infrastructure;

import com.example.demo.Application.ReviewRepositoryPort;
import com.example.demo.Domain.Review;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ReviewRepositoryAdapter implements ReviewRepositoryPort {

    private final MongoTemplate mongoTemplate;

    public ReviewRepositoryAdapter(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }


    @Override
    public List<Review> getAllReviews() {
        return this.mongoTemplate.findAll(Review.class);
    }

    @Override
    public void createReview(Review review) {
        this.mongoTemplate.insert(review);
    }
}
