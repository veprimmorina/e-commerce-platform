package com.example.demo.Infrastructure;

import com.example.demo.Application.SubCategoryInputPort;
import com.example.demo.Domain.Product;
import com.example.demo.Domain.SubCategory;
import com.example.demo.Domain.SubCategoryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class SubCategoryControllerTest {

    @Mock
    private SubCategoryService subCategoryService;

    @InjectMocks
    private SubCategoryController subCategoryController;

    @BeforeEach
    void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void getSubCategories_ReturnsListOfSubCategories() {
        // Arrange
        List<SubCategory> expectedSubCategories = new ArrayList<>();
        when(subCategoryService.getSubCategories()).thenReturn(expectedSubCategories);

        // Act
        List<SubCategory> result = subCategoryController.getSubCategories();

        // Assert
        assertEquals(expectedSubCategories, result);
        verify(subCategoryService).getSubCategories();
    }

    @Test
    void getSubCategoryProducts_ValidSubCategory_ReturnsListOfProducts() {
        // Arrange
        String subcategory = "subcategory";
        List<Product> expectedProducts = new ArrayList<>();
        when(subCategoryService.getSubCategoryProducts(subcategory)).thenReturn(expectedProducts);

        // Act
        List<Product> result = subCategoryController.getSubCategoryProducts(subcategory);

        // Assert
        assertEquals(expectedProducts, result);
        verify(subCategoryService).getSubCategoryProducts(subcategory);
    }

    @Test
    void addProductsToSubcategory_ValidSubCategoryAndProduct() {
        // Arrange
        String subcategory = "subcategory";
        String product = "product";

        // Act
        subCategoryController.addProductsToSubcategory(subcategory, product);

        // Assert
        verify(subCategoryService).addProductsToSubcategory(subcategory, product);
    }

    @Test
    void createSubCategory_ValidSubCategory() {
        // Arrange
        SubCategory subCategory = new SubCategory();

        // Act
        subCategoryController.createSubCategory(subCategory);

        // Assert
        verify(subCategoryService).createSubCategory(subCategory);
    }

    @Test
    void outOfStockProducts_ValidId_ReturnsListOfProducts() {
        // Arrange
        String id = "123";
        List<Product> expectedProducts = new ArrayList<>();
        when(subCategoryService.outOfStockProducts(id)).thenReturn(expectedProducts);

        // Act
        List<Product> result = subCategoryController.outOfStockProducts(id);

        // Assert
        assertEquals(expectedProducts, result);
        verify(subCategoryService).outOfStockProducts(id);
    }

    @Test
    void sortByQuantity_ValidId_ReturnsListOfProducts() {
        // Arrange
        String id = "123";
        List<Product> expectedProducts = new ArrayList<>();
        when(subCategoryService.sortByQuantity(id)).thenReturn(expectedProducts);

        // Act
        List<Product> result = subCategoryController.sortByQuantity(id);

        // Assert
        assertEquals(expectedProducts, result);
        verify(subCategoryService).sortByQuantity(id);
    }

    @Test
    void getLastProducts_ValidId_ReturnsListOfProducts() {
        // Arrange
        String id = "123";
        List<Product> expectedProducts = new ArrayList<>();
        when(subCategoryService.getLastProducts(id)).thenReturn(expectedProducts);

        // Act
        List<Product> result = subCategoryController.getLastProducts(id);

        // Assert
        assertEquals(expectedProducts, result);
        verify(subCategoryService).getLastProducts(id);
    }

    @Test
    void getSubcategoryById_ValidId_ReturnsSubCategory() {
        // Arrange
        String id = "123";
        SubCategory expectedSubCategory = new SubCategory();
        when(subCategoryService.getSubcategoryById(id)).thenReturn(expectedSubCategory);

        // Act
        SubCategory result = subCategoryController.getSubcategoryById(id);

        // Assert
        assertEquals(expectedSubCategory, result);
        verify(subCategoryService).getSubcategoryById(id);
    }

    @Test
    void changeCategoryForSubCategory_ValidSubCategories() {
        // Arrange
        SubCategory[] subCategories = new SubCategory[2];

        // Act
        subCategoryController.changeCategoryForSubCategory(subCategories);

        // Assert
        verify(subCategoryService).changeCategoryForSubCategory(subCategories);
    }
}
