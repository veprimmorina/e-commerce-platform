package com.example.demo.Domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "Category")
public class Category {
     @Id
     private String categoryID;
     private String categoryName;
     @DBRef
     private List<SubCategory> subCategories = new ArrayList<>();


     public Category(){

     }

    public Category(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryID(){
         return this.categoryID;
    }
    public String getCategoryname(){
        return this.categoryName;
    }
    public List<SubCategory> getSubCategories() {
        return this.subCategories;
    }

    public void setCategoryName(String categoryName){
         this.categoryName=categoryName;
    }

    public void removeFromList(SubCategory subCategory) {
        this.subCategories.remove(subCategory);

    }
    public void addSubcategory(SubCategory subCategory) {
        String subCategoryId = subCategory.getId();
        boolean exists = false;

        for (SubCategory existingSubCategory : this.subCategories) {
            if (existingSubCategory.getId().equals(subCategoryId)) {
                exists = true;
                break;
            }
        }

        if (!exists) {
            this.subCategories.add(subCategory);
        }
    }


    public void setSubCategories(List<SubCategory> subCategories) {
        this.subCategories = subCategories;
    }

}
