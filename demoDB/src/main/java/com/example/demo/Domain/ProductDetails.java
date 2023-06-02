package com.example.demo.Domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "ProductDetails")
public class ProductDetails {
    @Id
    private String id;

    private String description;
    private int quantity;
    private double weight;
    private int dimensions;
    private int clicked;
    private int sold;

    public ProductDetails() {}

    public ProductDetails(String description, int quantity, double weight, int dimensions, int clicked, int sold) {
        this.description = description;
        this.quantity = quantity;
        this.weight = weight;
        this.dimensions = dimensions;
        this.clicked = clicked;
        this.sold = sold;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public int getProductDimensions() {
        return dimensions;
    }

    public void setProductDimensions(int productDimensions) {
        this.dimensions = productDimensions;
    }

    public int getClicked() {
        return clicked;
    }

    public void setClicked(int clicked) {
        this.clicked = clicked;
    }

    public int getSold() {
        return sold;
    }

    public void setSold(int sold) {
        this.sold = sold;
    }
}
