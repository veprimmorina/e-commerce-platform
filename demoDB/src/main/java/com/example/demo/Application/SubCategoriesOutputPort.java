package com.example.demo.Application;

import com.example.demo.Domain.Product;
import com.example.demo.Domain.SubCategory;

import java.util.List;

public interface SubCategoriesOutputPort {
    List<SubCategory> getSubCategories();
    List<Product> getSubCategoryProducts(String subcategory);
    void addProductsToSubcategory(String subCategoryId,String productId);
    void createSubCategory(SubCategory subCategory);
    List<Product> outOfStockProducts(String id);
    List<Product> sortByQuantity(String id);

    List<Product> getLastProducts(String id);
    SubCategory getSubcategoryById(String id);
    void changeCategoryForSubCategory(SubCategory [] subCategories);

}
