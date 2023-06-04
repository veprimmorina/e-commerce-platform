package com.example.PaymentService.Domain;

import javax.persistence.Embeddable;

@Embeddable
public class ProductDetails {

    private String id;


    public ProductDetails() {}

    public ProductDetails(String id) {
       this.id=id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;

    }
}



