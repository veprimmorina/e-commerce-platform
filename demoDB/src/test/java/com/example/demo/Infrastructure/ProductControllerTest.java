package com.example.demo.Infrastructure;

import com.example.demo.Domain.CheckOutVO;
import com.example.demo.Domain.Product;
import com.example.demo.Domain.ProductService;
import com.example.demo.Domain.Review;
import com.example.demo.Infrastructure.ProductController;
import com.itextpdf.text.DocumentException;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
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
    @Test
    void findByPrice_ValidPrice_ReturnsListOfProducts() {
        // Arrange
        double price = 10.0;
        List<Product> expectedProducts = new ArrayList<>();
        when(productService.findByPrice(eq(price))).thenReturn(expectedProducts);

        // Act
        List<Product> result = productController.findByPrice(price);

        // Assert
        assertEquals(expectedProducts, result);
        verify(productService).findByPrice(price);
    }

    @Test
    void countByName_ValidName_ReturnsCount() {
        // Arrange
        String name = "Test Product";
        int expectedCount = 5;
        when(productService.countByname(eq(name))).thenReturn(expectedCount);

        // Act
        int result = productController.countByName(name);

        // Assert
        assertEquals(expectedCount, result);
        verify(productService).countByname(name);
    }

    @Test
    void count_ReturnsTotalCount() {
        // Arrange
        long expectedCount = 10;
        when(productService.count()).thenReturn(expectedCount);

        // Act
        long result = productController.count();

        // Assert
        assertEquals(expectedCount, result);
        verify(productService).count();
    }

    @Test
    void getLastThree_ValidName_ReturnsListOfProducts() {
        // Arrange
        String name = "Test Product";
        List<Product> expectedProducts = new ArrayList<>();
        when(productService.getLastThree(eq(name))).thenReturn(expectedProducts);

        // Act
        List<Product> result = productController.getLastThree(name);

        // Assert
        assertEquals(expectedProducts, result);
        verify(productService).getLastThree(name);
    }
    @Test
    void deleteProduct_ValidId_ReturnsId() {
        // Arrange
        String id = "123";
        when(productService.deleteProduct(id)).thenReturn(id);

        // Act
        String result = productController.deleteProduct(id);

        // Assert
        assertEquals(id, result);
        verify(productService).deleteProduct(id);
    }

    @Test
    void countTotal_ReturnsTotalCount() {
        // Arrange
        long totalCount = 5;
        when(productService.countTotal()).thenReturn(totalCount);

        // Act
        long result = productController.countTotal();

        // Assert
        assertEquals(totalCount, result);
        verify(productService).countTotal();
    }

    @Test
    void countProductsByName_ValidName_ReturnsProductCount() {
        // Arrange
        String name = "ExampleProduct";
        long productCount = 3;
        when(productService.countProductsByName(name)).thenReturn(productCount);

        // Act
        long result = productController.countProductsByName(name);

        // Assert
        assertEquals(productCount, result);
        verify(productService).countProductsByName(name);
    }

    @Test
    void updateProduct_ValidIdAndProduct_ReturnsUpdatedProduct() {
        // Arrange
        String id = "123";
        Product product = new Product();
        when(productService.updateProduct(id, product)).thenReturn(product);

        // Act
        Product result = productController.updateProduct(id, product);

        // Assert
        assertEquals(product, result);
        verify(productService).updateProduct(id, product);
    }

    @Test
    void findTop3_ReturnsTop3Products() {
        // Arrange
        List<Product> top3Products = Arrays.asList(new Product(), new Product(), new Product());
        when(productService.findTop3()).thenReturn(top3Products);

        // Act
        List<Product> result = productController.findTop3();

        // Assert
        assertEquals(top3Products, result);
        verify(productService).findTop3();
    }
    @Test
    void getTopRated_ReturnsListOfProducts() {
        // Arrange
        List<Product> expectedProducts = List.of(new Product(), new Product());
        when(productService.getTopRated()).thenReturn(expectedProducts);

        // Act
        List<Product> result = productController.getTopRated();

        // Assert
        assertEquals(expectedProducts, result);
        verify(productService).getTopRated();
    }

    @Test
    void addReview_ValidProductIdAndReview_CallsServiceMethod() {
        // Arrange
        String productId = "123";
        Review review = new Review();
        // Set up any necessary properties of the review object

        // Act
        productController.addReview(productId, review);

        // Assert
        verify(productService).addReview(productId, review);
    }

    @Test
    void getProductById_ValidId_ReturnsProduct() {
        // Arrange
        String id = "123";
        Product expectedProduct = new Product();
        when(productService.getProductByid(id)).thenReturn(expectedProduct);

        // Act
        Product result = productController.getProductByid(id);

        // Assert
        assertEquals(expectedProduct, result);
        verify(productService).getProductByid(id);
    }

    @Test
    void getProductReviewById_ValidId_ReturnsListOfReviews() {
        // Arrange
        String id = "123";
        List<Review> expectedReviews = List.of(new Review(), new Review());
        when(productService.getProductReviewById(id)).thenReturn(expectedReviews);

        // Act
        List<Review> result = productController.getProductReviewById(id);

        // Assert
        assertEquals(expectedReviews, result);
        verify(productService).getProductReviewById(id);
    }
    @Test
    void createProduct_ValidProduct_CallsServiceMethod() {
        Product product = new Product();
        product.setProductName("Test");
        productController.createProduct(product);
        verify(productService).createProduct(product);
    }
    @Test
    void countProduct_ReturnsProductCount() {
        // Arrange
        long expectedCount = 10;
        when(productService.countProduct()).thenReturn(expectedCount);

        // Act
        long result = productController.countProduct();

        // Assert
        assertEquals(expectedCount, result);
        verify(productService).countProduct();
    }
    @Test
    void getByCategory_ValidSubcategory_ReturnsListOfProducts() {
        // Arrange
        String subcategory = "electronics";
        List<Product> expectedProducts = List.of(new Product(), new Product());
        when(productService.getByCategory(subcategory)).thenReturn(expectedProducts);

        // Act
        List<Product> result = productController.getByCategory(subcategory);

        // Assert
        assertEquals(expectedProducts, result);
        verify(productService).getByCategory(subcategory);
    }
    @Test
    void getNewestProducts_ReturnsListOfProducts() {
        // Arrange
        List<Product> expectedProducts = List.of(new Product(), new Product());
        when(productService.getNewestProducts()).thenReturn(expectedProducts);

        // Act
        List<Product> result = productController.getNewestProducts();

        // Assert
        assertEquals(expectedProducts, result);
        verify(productService).getNewestProducts();
    }
    @Test
    void searchProducts_ValidProduct_ReturnsListOfProducts() {
        // Arrange
        String product = "phone";
        List<Product> expectedProducts = List.of(new Product(), new Product());
        when(productService.searchProducts(product)).thenReturn(expectedProducts);

        // Act
        List<Product> result = productController.searchProducts(product);

        // Assert
        assertEquals(expectedProducts, result);
        verify(productService).searchProducts(product);
    }
    @Test
    void getAll_ReturnsListOfProducts() {
        // Arrange
        List<Product> expectedProducts = List.of(new Product(), new Product());
        when(productService.getAll()).thenReturn(expectedProducts);

        // Act
        List<Product> result = productController.getAll();

        // Assert
        assertEquals(expectedProducts, result);
        verify(productService).getAll();
    }

    @Test
    void changeProductSubCategory_ValidIdAndProduct_CallsServiceMethod() {
        // Arrange
        String id = "123";
        Product product = new Product();
        // Set up any necessary properties of the product object

        // Act
        productController.changeProductSubCategory(id, product);

        // Assert
        verify(productService).changeProductSubCategory(id, product);
    }

    @Test
    void addClicked_ValidId_CallsServiceMethod() {
        // Arrange
        String id = "123";

        // Act
        productController.addClicked(id);

        // Assert
        verify(productService).addClicked(id);
    }


}