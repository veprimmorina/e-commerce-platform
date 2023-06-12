package com.example.demo.Infrastructure;

import com.example.demo.Application.DetailInputPort;
import com.example.demo.Domain.DetailService;
import com.example.demo.Domain.Product;
import com.example.demo.Domain.ProductDetails;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class DetailControllerTest {

    @Mock
    private DetailService detailService;

    @InjectMocks
    private DetailController detailController;

    @BeforeEach
    void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void createProductDetail_ValidProductDetails() {
        // Arrange
        ProductDetails productDetails = new ProductDetails();

        // Act
        detailController.createProductDetail(productDetails);

        // Assert
        verify(detailService).createProductDetail(productDetails);
    }

    @Test
    void addClick_ValidId() {
        // Arrange
        String id = "123";

        // Act
        detailController.addClick(id);

        // Assert
        verify(detailService).addClick(id);
    }

    @Test
    void addSold_ValidProductIdAndSold() {
        // Arrange
        String productId = "123";
        int sold = 5;

        // Act
        detailController.addSold(productId, sold);

        // Assert
        verify(detailService).addSold(productId, sold);
    }

    @Test
    void getByWeight_ValidWeight_ReturnsListOfProducts() {
        // Arrange
        double weight = 10.0;
        List<Product> expectedProducts = new ArrayList<>();
        when(detailService.getByWeight(weight)).thenReturn(expectedProducts);

        // Act
        List<Product> result = detailController.getByWeight(weight);

        // Assert
        assertEquals(expectedProducts, result);
        verify(detailService).getByWeight(weight);
    }

    @Test
    void getMostSolded_ReturnsListOfProducts() {
        // Arrange
        List<Product> expectedProducts = new ArrayList<>();
        when(detailService.getMostSolded()).thenReturn(expectedProducts);

        // Act
        List<Product> result = detailController.getMostSolded();

        // Assert
        assertEquals(expectedProducts, result);
        verify(detailService).getMostSolded();
    }

    @Test
    void getMostWatched_ReturnsListOfProducts() {
        // Arrange
        List<Product> expectedProducts = new ArrayList<>();
        when(detailService.getMostWatched()).thenReturn(expectedProducts);

        // Act
        List<Product> result = detailController.getMostWatched();

        // Assert
        assertEquals(expectedProducts, result);
        verify(detailService).getMostWatched();
    }

    @Test
    void getDetailsForProduct_ValidProductId_ReturnsProductDetails() {
        // Arrange
        String productId = "123";
        ProductDetails expectedProductDetails = new ProductDetails();
        when(detailService.getDetailsForProduct(productId)).thenReturn(expectedProductDetails);

        // Act
        ProductDetails result = detailController.getDetailsForProduct(productId);

        // Assert
        assertEquals(expectedProductDetails, result);
        verify(detailService).getDetailsForProduct(productId);
    }

    @Test
    void editProductDetails_ValidProductIdAndProductDetails() {
        // Arrange
        String productId = "123";
        ProductDetails productDetails = new ProductDetails();

        // Act
        detailController.editProductDetails(productId, productDetails);

        // Assert
        verify(detailService).editProductDetails(productId, productDetails);
    }

    @Test
    void getAllOutOfStock_ReturnsListOfProducts() {
        // Arrange
        List<Product> expectedProducts = new ArrayList<>();
        when(detailService.getAllOutOfStock()).thenReturn(expectedProducts);

        // Act
        List<Product> result = detailController.getAllOutOfStock();

        // Assert
        assertEquals(expectedProducts, result);
        verify(detailService).getAllOutOfStock();
    }

    @Test
    void filterByQuantityAllProducts_ReturnsListOfProducts() {
        // Arrange
        List<Product> expectedProducts = new ArrayList<>();
        when(detailService.filterByQuantityAllProducts()).thenReturn(expectedProducts);

        // Act
        List<Product> result = detailController.filterByQuantityAllProducts();

        // Assert
        assertEquals(expectedProducts, result);
        verify(detailService).filterByQuantityAllProducts();
    }

    @Test
    void getTop10_ReturnsListOfProducts() {
        // Arrange
        List<Product> expectedProducts = new ArrayList<>();
        when(detailService.getTop10()).thenReturn(expectedProducts);

        // Act
        List<Product> result = detailController.getTop10();

        // Assert
        assertEquals(expectedProducts, result);
        verify(detailService).getTop10();
    }
}
