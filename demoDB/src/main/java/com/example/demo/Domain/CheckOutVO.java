package com.example.demo.Domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CheckOutVO {

    private int amount;
    private String description;
    private String userEmail;
    private String addressLine1;
    private String addressLine2;
    private String state;
    private String postalCode;
    private String country;
    private String name;
    private List<ProductEmbeddable> productVOList;
}
