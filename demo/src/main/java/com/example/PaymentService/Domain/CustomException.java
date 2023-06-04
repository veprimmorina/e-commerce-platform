package com.example.PaymentService.Domain;

public class CustomException extends Exception{
    public CustomException(String message){
        super(message);
    }
}
