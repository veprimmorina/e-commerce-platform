package com.example.demo.Domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Document(collection = "SubCategory")
public class SubCategory {
    @Id
    private String id;
    private String subCategoryName;
    @DBRef
    private List<Product> productList = new ArrayList<>();
    private String categoryId;

    public SubCategory(){

    }
    public SubCategory(String subCategoryName, String categoryId){
        this.subCategoryName=subCategoryName;
        this.categoryId=categoryId;
    }

    public void setSubCategoryName(String subCategoryName) {
        this.subCategoryName = subCategoryName;
    }

    public String getSubCategoryName() {
        return subCategoryName;
    }

    public String getId() {
        return id;
    }

    public List<Product> getProductList() {
        return productList;
    }

    public void setProductList(List<Product> productList) {
        this.productList = productList;
    }
    public void addToList(Product product){
        this.productList.add(product);
    }
    public void removeFromList(Product product) {
        for(int i=0;i<productList.size();i++){
            if(productList.get(i).getId().equals(product.getId())){
                this.productList.remove(i);
            }
        }
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryId() {
        return categoryId;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        SubCategory other = (SubCategory) obj;
        return Objects.equals(id, other.id);
    }
}
