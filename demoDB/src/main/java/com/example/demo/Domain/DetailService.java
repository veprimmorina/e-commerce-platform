package com.example.demo.Domain;

import com.example.demo.Application.DetailInputPort;
import com.example.demo.Infrastructure.DetailRepositoryAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetailService implements DetailInputPort {

    @Autowired
    private DetailRepositoryAdapter detailRepositoryAdapter;

    @Override
    public void createProductDetail(ProductDetails productDetails) {
        this.detailRepositoryAdapter.create(productDetails);
    }

    @Override
    public void addClick(String id) {
        this.detailRepositoryAdapter.addClick(id);
    }

    @Override
    public void addSold(String productId, int sold) {
        this.detailRepositoryAdapter.addSold(productId,sold);
    }

    @Override
    public List<Product> getByWeight(double weight) {
        return this.detailRepositoryAdapter.getByWeight(weight);
    }

    @Override
    public List<Product> getMostSolded() {
        return this.detailRepositoryAdapter.getMostSolded();
    }

    @Override
    public List<Product> getMostWatched() {
        return this.detailRepositoryAdapter.getMostWatched();
    }

    @Override
    public ProductDetails getDetailsForProduct(String id) {
        return this.detailRepositoryAdapter.getDetailsForProduct(id);
    }

    @Override
    public void editProductDetails(String id, ProductDetails productDetails) {
        this.detailRepositoryAdapter.editProductDetails(id,productDetails);
    }

    @Override
    public List<Product> getAllOutOfStock() {
        return this.detailRepositoryAdapter.getOutOfStockAll();
    }

    @Override
    public List<Product> filterByQuantityAllProducts() {
        return this.detailRepositoryAdapter.filterByQuantityAllProducts();
    }

    @Override
    public List<Product> getTop10() {
        return this.detailRepositoryAdapter.getTop10();
    }
}
