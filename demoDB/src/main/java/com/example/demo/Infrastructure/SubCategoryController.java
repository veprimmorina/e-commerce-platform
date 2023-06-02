package com.example.demo.Infrastructure;

import com.example.demo.Application.SubCategoryInputPort;
import com.example.demo.Domain.Product;
import com.example.demo.Domain.SubCategory;
import com.example.demo.Domain.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subCategory")
public class SubCategoryController implements SubCategoryInputPort {

    @Autowired
    private SubCategoryService subCategoryService;
    @Override
    @GetMapping("/get/all")
    public List<SubCategory> getSubCategories() {
        return this.subCategoryService.getSubCategories();
    }

    @Override
    @GetMapping("/get/by/subcategory/{pSubcategory}")
    public List<Product> getSubCategoryProducts(@PathVariable("pSubcategory") String subcategory) {
        return this.subCategoryService.getSubCategoryProducts(subcategory);
    }

    @Override
    @PostMapping("insert/product/to/list/{subcategory}/{product}")
    public void addProductsToSubcategory(@PathVariable("subcategory") String subcategory, @PathVariable("product") String product) {
        this.subCategoryService.addProductsToSubcategory(subcategory,product);
    }

    @Override
    @PostMapping("create/subcategory")
    public void createSubCategory(@RequestBody SubCategory subCategory) {
        this.subCategoryService.createSubCategory(subCategory);
    }

    @Override
    @GetMapping("get/outOfStock/products/{id}")
    public List<Product> outOfStockProducts(@PathVariable("id") String id) {
        return this.subCategoryService.outOfStockProducts(id);
    }

    @Override
    @GetMapping("sort/by/quantity/{id}")
    public List<Product> sortByQuantity(@PathVariable("id") String id) {
        return this.subCategoryService.sortByQuantity(id);
    }

    @Override
    @GetMapping("get/last/products/{id}")
    public List<Product> getLastProducts(@PathVariable("id") String id) {
        return this.subCategoryService.getLastProducts(id);
    }

    @Override
    @GetMapping("get/subcategory/by/id/{id}")
    public SubCategory getSubcategoryById(@PathVariable("id") String id) {
        return this.subCategoryService.getSubcategoryById(id);
    }

    @Override
    @PutMapping("change/subcategory")
    public void changeCategoryForSubCategory(@RequestBody SubCategory[] subCategories) {
        this.subCategoryService.changeCategoryForSubCategory(subCategories);
    }


}
