package com.example.demo.Domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "Product")
public class Product {
    @Id
    private String id;
    private String productName;
    private String productImage;
    private double productPrice;
    @DBRef
    private List<Review> reviews = new ArrayList<>();
    @DBRef
    private ProductDetails detail;
    @DBRef
    private Warranty warranty;
    private String subCategoryId;

    public Product() {
    }

    public Product(String productName, String productImage, double productPrice, String subCategoryId, ProductDetails detail, Warranty warranty) {
        this.productName = productName;
        this.productImage = productImage;
        this.productPrice = productPrice;
        this.subCategoryId=subCategoryId;
        this.detail = detail;
        this.warranty=warranty;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public ProductDetails getDetail() {
        return detail;
    }

    public void setDetail(ProductDetails detail) {
        this.detail = detail;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductImage() {
        return productImage;
    }

    public void setProductImage(String productImage) {
        this.productImage = productImage;
    }

    public double getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(double productPrice) {
        this.productPrice = productPrice;
    }

    public Warranty getWarranty() {
        return warranty;
    }

    public void setWarranty(Warranty warranty) {
        this.warranty = warranty;
    }

    public List<Review> getReviews() {
        return reviews;
    }
    public ProductDetails getProductDetails(){
        return this.detail;
    }
    public void setProductDetails(ProductDetails productDetails){
        this.detail = productDetails;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }
    public void addReview(Review review){
        if (this.reviews == null) {
            System.out.println("reviews list is null");
            this.reviews = new ArrayList<>();
        }
        this.reviews.add(review);
    }

    public String getSubCategoryId() {
        return subCategoryId;
    }

    public void setSubCategoryId(String subCategoryId) {
        this.subCategoryId = subCategoryId;
    }


}

