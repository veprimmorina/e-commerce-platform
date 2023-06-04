package com.example.PaymentService.Domain;

import javax.persistence.Embeddable;

@Embeddable
public class ProductVO {

    private String id;
    private String productName;
    private String productImage;
    private double productPrice;

    private ProductDetails detail;

    private int quantity;



    public ProductVO() {
    }

    public ProductVO(String id,String productName, String productImage, double productPrice, String subCategoryId, int quantity, ProductDetails detail) {
        this.id=id;
        this.productName = productName;
        this.productImage = productImage;
        this.productPrice = productPrice;
        this.detail = detail;
        this.quantity=quantity;
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

    public int getQuantity() {
        return quantity;
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

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}


