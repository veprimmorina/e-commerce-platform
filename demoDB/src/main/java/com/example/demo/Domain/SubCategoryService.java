package com.example.demo.Domain;

import com.example.demo.Application.SubCategoryInputPort;
import com.example.demo.Infrastructure.SubCategoryRepositoryAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubCategoryService implements SubCategoryInputPort {

    @Autowired
    private SubCategoryRepositoryAdapter subCategoryRepositoryAdapter;
    @Override
    public List<SubCategory> getSubCategories() {
        return this.subCategoryRepositoryAdapter.getSubCategories();
    }

    @Override
    public List<Product> getSubCategoryProducts(String subcategory) {
        return this.subCategoryRepositoryAdapter.getSubCategoryProducts(subcategory);
    }

    @Override
    public void addProductsToSubcategory(String subCategoryId, String productId) {
        this.subCategoryRepositoryAdapter.addProductsToSubcategory(subCategoryId,productId);
    }

    @Override
    public void createSubCategory(SubCategory subCategory) {
        this.subCategoryRepositoryAdapter.createSubCategory(subCategory);
    }

    @Override
    public List<Product> outOfStockProducts(String id) {
        return this.subCategoryRepositoryAdapter.outOfStockProducts(id);
    }

    @Override
    public List<Product> sortByQuantity(String id) {
        return this.subCategoryRepositoryAdapter.sortByQuantity(id);
    }

    @Override
    public List<Product> getLastProducts(String id) {
        return this.subCategoryRepositoryAdapter.getLastProducts(id);
    }

    @Override
    public SubCategory getSubcategoryById(String id) {
        return this.subCategoryRepositoryAdapter.getSubcategoryById(id);
    }

    @Override
    public void changeCategoryForSubCategory(SubCategory[] subCategories) {
        this.subCategoryRepositoryAdapter.changeCategoryForSubCategory(subCategories);
    }


}
