package com.example.demo.Infrastructure;

import com.example.demo.Application.CategoryOutputPort;
import com.example.demo.Domain.Category;
import com.example.demo.Domain.SubCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CategoryRepositoryAdapter implements CategoryOutputPort {

    @Autowired
    private MongoTemplate mongoTemplate;
    @Override
    public void createCategory(Category category) {
        this.mongoTemplate.insert(category);
    }

    @Override
    public void addSubCategory(String CategoryId,SubCategory subCategory) {
        Category category = mongoTemplate.findById(CategoryId,Category.class);
        mongoTemplate.insert(subCategory);
        category.addSubcategory(subCategory);
        mongoTemplate.save(category);
    }

    @Override
    public List<Category> getAllCategories() {
        return this.mongoTemplate.findAll(Category.class);
    }

    @Override
    public Category getCategoryById(String id) {
        return this.mongoTemplate.findById(id,Category.class);
    }

    @Override
    public void editCategoryById(String id, Category category) {
        Category actualCategory = this.mongoTemplate.findById(id, Category.class);
        actualCategory.setCategoryName(category.getCategoryname());
        this.mongoTemplate.save(actualCategory);
    }


}
