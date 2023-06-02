package com.example.demo.Domain;



import javax.persistence.Embeddable;
@Embeddable
public class ProductEmbeddable {

    private String id;
    private String productName;
    private String productImage;
    private double productPrice;
    private ProductDetails detail;
    private int quantity;

    public ProductEmbeddable(String id, String productName, String productImage, double productPrice, ProductDetails detail, int quantity){
        this.id=id;
        this.productImage= productImage;
        this.productName=productName;
        this.productPrice=productPrice;
        this.detail = detail;
        this.quantity=quantity;
    }

    public ProductEmbeddable() {}


    public int getQuantity() {
        return quantity;
    }

    public String getId() {
        return id;
    }

    public ProductDetails getDetail() {
        return detail;
    }

    public double getProductPrice() {
        return productPrice;
    }

    public String getProductImage() {
        return productImage;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductImage(String productImage) {
        this.productImage = productImage;
    }
}
