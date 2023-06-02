package com.example.demo.Application;

import com.example.demo.Domain.Product;
import com.example.demo.Domain.ProductEmbeddable;
import com.example.demo.Domain.Review;

import java.util.List;

public interface ProductRepositoryPort {

    void deleteProductTest(String id);
    long count();
    long countByName(String name);
    void update(String id, Product product);
    List<Product> findTop3();
    List<Product> findByRating(int rating);
    List<Product> getTopRated();
    void addReview(String productId, Review review);
    Product getProductById(String id);
    List<Review> getProductReviewById(String id);
    void create(Product product);
    long countProduct();
    List<Product> getByCategory(String category);
    List<Product> getNewestProducts();
    List<Product> searchProducts(String product);
    String orderProducts(List<ProductEmbeddable> products);
    List<Product> getAll();
    void changeProductSubCategory(String id, Product product);
    void addClicked(String id);





}
