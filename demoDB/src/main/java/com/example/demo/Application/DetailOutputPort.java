package com.example.demo.Application;

import com.example.demo.Domain.Product;
import com.example.demo.Domain.ProductDetails;

import java.util.List;

public interface DetailOutputPort {
    void create(ProductDetails productDetails);
    void addClick(String id);
    void addSold(String productId, int sold);
    List<Product> getByWeight(double weight);
    List<Product> getMostSolded();
    List<Product> getMostWatched();
    ProductDetails getDetailsForProduct(String id);
    void editProductDetails(String id, ProductDetails productDetails);
    List<Product> getOutOfStockAll();
    List<Product> filterByQuantityAllProducts();
    List<Product> getTop10();




}
