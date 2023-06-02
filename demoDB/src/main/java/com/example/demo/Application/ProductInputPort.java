package com.example.demo.Application;

import com.example.demo.Domain.CheckOutVO;
import com.example.demo.Domain.Product;
import com.example.demo.Domain.Review;
import com.itextpdf.text.DocumentException;
import jakarta.mail.MessagingException;


import java.io.IOException;
import java.util.List;

public interface ProductInputPort {

    String deleteProduct(String id);

    long countTotal();

    long countProductsByName(String name);

    Product updateProduct(String id, Product product);

    List<Product> findTop3();

    List<Product> findByRating(int id);

    List<Product> getTopRated();

    void addReview(String productId, Review review);

    Product getProductByid(String id);

    List<Review> getProductReviewById(String id);

    void createProduct(Product product);
    long countProduct();
    List<Product> getByCategory(String category);

    List<Product> getNewestProducts();
    List<Product> searchProducts(String product);
    String orderProducts(CheckOutVO checkOutVOs) throws MessagingException, DocumentException, IOException;

    List<Product> getAll();
    void changeProductSubCategory(String id, Product product);
    void addClicked(String id);

}
