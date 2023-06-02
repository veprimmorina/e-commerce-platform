package com.example.demo.Infrastructure;


import com.example.demo.Application.CategoryInputPort;
import com.example.demo.Domain.Category;
import com.example.demo.Domain.CategoryService;
import com.example.demo.Domain.SubCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/api/category")
public class CategoryController implements CategoryInputPort {

    @Autowired
    private CategoryService categoryService;
    @Override
    @PostMapping("/create/category")
    public void createCategory(@RequestBody Category category) {
        this.categoryService.createCategory(category);
    }

    @Override
    @PostMapping("/add/subcategories/{categoryId}")
    public void addSubCategory(@PathVariable("categoryId") String categoryId, @RequestBody SubCategory subcategory) {
        this.categoryService.addSubCategory(categoryId,subcategory);
    }

    @Override
    @GetMapping("/get/all")
    public List<Category> getAllCategories() {
        return this.categoryService.getAllCategories();
    }

    @Override
    @GetMapping("/get/by/id/{id}")
    public Category getById(@PathVariable("id") String id) {
        return this.categoryService.getById(id);
    }

    @Override
    @PutMapping("/edit/by/id/{id}")
    public void editCategoryById(@PathVariable("id") String id,@RequestBody Category category) {
        this.categoryService.editCategoryById(id,category);
    }

}
