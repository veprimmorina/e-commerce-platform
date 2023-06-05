package com.example.demo.Infrastructure;

import com.example.demo.Domain.Product;
import com.example.demo.Domain.ProductService;
import com.example.demo.Domain.Review;
import com.example.demo.Infrastructure.ProductController;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class ProductControllerTest {

    @Mock
    private ProductService productService;

    @InjectMocks
    private ProductController productController;

    @BeforeEach
    void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void saveDataModel_ValidProduct_ReturnsProduct() {
        // Arrange
        Product product = new Product();

        // Act
        Product result = productController.saveDataModel(product);
        result.setProductName("Test name");
        // Assert
        assertEquals(product, result);
        verify(productService).saveDataModel(product);
        System.out.println("Successfully added product with name: "+ result.getProductName());
    }

    @Test
    void deleteByName_ValidName_ReturnsName() {
        // Arrange
        String name = "Test Product";
        //when(productService.deleteByname(eq(name))).thenReturn(true);

        // Act
        String result = productController.deleteByName(name);

        // Assert
        assertEquals(name, result);
        verify(productService).deleteByname(name);
        System.out.println("Succesfully deleted "+result);
    }
    @Test
    void findByName_ValidName_ReturnsListOfProducts() {
        // Arrange
        String name = "Test Product";
        List<Product> expectedProducts = new ArrayList<>();
        when(productService.getByname(eq(name))).thenReturn(expectedProducts);

        // Act
        List<Product> result = productController.findByName(name);

        // Assert
        assertEquals(expectedProducts, result);
        verify(productService).getByname(name);
    }
}