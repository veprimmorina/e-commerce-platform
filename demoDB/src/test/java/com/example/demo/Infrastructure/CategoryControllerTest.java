package com.example.demo.Infrastructure;

import com.example.demo.Application.CategoryInputPort;
import com.example.demo.Domain.Category;
import com.example.demo.Domain.CategoryService;
import com.example.demo.Domain.SubCategory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class CategoryControllerTest {

    @Mock
    private CategoryService categoryService;

    @InjectMocks
    private CategoryController categoryController;

    @BeforeEach
    void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void createCategory_ValidCategory() {
        // Arrange
        Category category = new Category();

        // Act
        categoryController.createCategory(category);

        // Assert
        verify(categoryService).createCategory(category);
    }

    @Test
    void addSubCategory_ValidCategoryIdAndSubCategory() {
        // Arrange
        String categoryId = "123";
        SubCategory subCategory = new SubCategory();

        // Act
        categoryController.addSubCategory(categoryId, subCategory);

        // Assert
        verify(categoryService).addSubCategory(categoryId, subCategory);
    }

    @Test
    void getAllCategories_ReturnsListOfCategories() {
        // Arrange
        List<Category> expectedCategories = new ArrayList<>();
        when(categoryService.getAllCategories()).thenReturn(expectedCategories);

        // Act
        List<Category> result = categoryController.getAllCategories();

        // Assert
        assertEquals(expectedCategories, result);
        verify(categoryService).getAllCategories();
    }

    @Test
    void getById_ValidId_ReturnsCategory() {
        // Arrange
        String id = "123";
        Category expectedCategory = new Category();
        when(categoryService.getById(id)).thenReturn(expectedCategory);

        // Act
        Category result = categoryController.getById(id);

        // Assert
        assertEquals(expectedCategory, result);
        verify(categoryService).getById(id);
    }

    @Test
    void editCategoryById_ValidIdAndCategory() {
        // Arrange
        String id = "123";
        Category category = new Category();

        // Act
        categoryController.editCategoryById(id, category);

        // Assert
        verify(categoryService).editCategoryById(id, category);
    }
}
