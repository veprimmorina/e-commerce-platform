package com.example.demo.Application;

import com.example.demo.Domain.Category;
import com.example.demo.Domain.SubCategory;

import java.util.List;

public interface CategoryInputPort {
    void createCategory(Category category);
    void addSubCategory(String categoryId, SubCategory subCategory);
    List<Category> getAllCategories();
    Category getById(String id);
    void editCategoryById(String id, Category category);


}
