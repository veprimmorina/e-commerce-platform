package com.example.demo.Domain;

import com.example.demo.Application.CategoryInputPort;
import com.example.demo.Infrastructure.CategoryRepositoryAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements CategoryInputPort {


    @Autowired
    private CategoryRepositoryAdapter categoryRepositoryAdapter;
    @Override
    public void createCategory(Category category) {
        categoryRepositoryAdapter.createCategory(category);
    }

    @Override
    public void addSubCategory(String categoryId, SubCategory subCategory) {
        this.categoryRepositoryAdapter.addSubCategory(categoryId,subCategory);
    }

    @Override
    public List<Category> getAllCategories() {
        return this.categoryRepositoryAdapter.getAllCategories();
    }

    @Override
    public Category getById(String id) {
        return this.categoryRepositoryAdapter.getCategoryById(id);
    }

    @Override
    public void editCategoryById(String id, Category category) {
        this.categoryRepositoryAdapter.editCategoryById(id,category);
    }
}
