package com.example.PaymentService.Domain;

import java.util.List;

public class CheckOutModel {

    private String cardNumber;
    private int expMonth;
    private int expYear;
    private int cvc;
    private int amount;
    private String description;
    private String customerId;
    private String userEmail;
    private String addressLine1;
    private String addressLine2;
    private String state;
    private String postalCode;
    private String country;
    private String name;
    private List<ProductVO> productVOList;

    public CheckOutModel(){

    }
    public CheckOutModel(String cardNumber, int expMonth, int expYear, int cvc, int amount, String description, String customerId, String userEmail, String addressLine1, String addressLine2, String state, String postalCode, String country, String name, List<ProductVO> productVOList){
        this.cardNumber=cardNumber;
        this.amount=amount;
        this.expMonth=expMonth;
        this.expYear=expYear;
        this.description=description;
        this.customerId=customerId;
        this.cvc=cvc;
        this.addressLine1=addressLine1;
        this.addressLine2=addressLine2;
        this.userEmail=userEmail;
        this.state=state;
        this.postalCode=postalCode;
        this.country=country;
        this.productVOList=productVOList;
        this.name=name;
    }

    public int getAmount() {
        return amount;
    }

    public int getCvc() {
        return cvc;
    }

    public int getExpMonth() {
        return expMonth;
    }

    public int getExpYear() {
        return expYear;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public String getCustomerId() {
        return customerId;
    }

    public String getDescription() {
        return description;
    }

    public String getAddressLine1() {
        return addressLine1;
    }

    public String getAddressLine2() {
        return addressLine2;
    }



    public String getCountry() {
        return country;
    }

    public String getName() {
        return name;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public String getState() {
        return state;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public List<ProductVO> getProductVOList() {
        return productVOList;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public void setCvc(int cvc) {
        this.cvc = cvc;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setExpMonth(int expMonth) {
        this.expMonth = expMonth;
    }

    public void setExpYear(int expYear) {
        this.expYear = expYear;
    }

    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    public void setAddressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
    }


    public void setCountry(String country) {
        this.country = country;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public void setProductVOList(List<ProductVO> productVOList) {
        this.productVOList = productVOList;
    }
}
