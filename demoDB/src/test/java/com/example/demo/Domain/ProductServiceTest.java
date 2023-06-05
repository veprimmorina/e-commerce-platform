package com.example.demo.Domain;

import com.example.demo.Infrastructure.ProductRepositoryAdapter;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

class ProductServiceTest {
    ProductRepositoryAdapter productRepositoryAdapter = mock(ProductRepositoryAdapter.class);

    @Test
    void addClicked() {
        ProductService productService = new ProductService(productRepositoryAdapter);
        String productId = "123";
        productService.addClicked(productId);
        verify(productRepositoryAdapter).addClicked(productId);
        System.out.println("Successfully added ");
    }


}