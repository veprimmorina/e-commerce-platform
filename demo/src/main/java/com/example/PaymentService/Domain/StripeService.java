package com.example.PaymentService.Domain;

import com.stripe.Stripe;
import com.stripe.exception.CardException;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.param.TokenCreateParams;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StripeService {




    private String secretKey = "sk_test_51MLWWkFWmkgNDU7NmjQd8wBvopbHNBSc36tn2Nn9sNb6AV0xoCMc51WAspQiZSgJrhpJSiWyxELssOOWJWSuIc5i00Lki0ske7";

    public String validateCreditCard(String cardNumber, int expMonth, int expYear, int cvc, int amount, String description, String customerId, String userEmail, String addressLine1, String addressLine2, String state, String postalCode, String country, String name, List<ProductVO> productVOList) throws CustomException {
        Stripe.apiKey = secretKey;
        TokenCreateParams.Card cardParams = TokenCreateParams.Card.builder()
                .setNumber(cardNumber)
                .setExpMonth(String.valueOf(expMonth))
                .setExpYear(String.valueOf(expYear))
                .setCvc(String.valueOf(cvc))
                .build();

        TokenCreateParams tokenParams = TokenCreateParams.builder()
                .setCard(cardParams)
                .build();

        try {
            Token token = Token.create(tokenParams);
            return "Success";
        }catch (CardException e){
            return "Invalid card data!";
        }catch (StripeException e){
            return "Stripe error";
        }
    }

    public Charge chargeCreditCard(String cardNumber, int expMonth, int expYear, int cvc, int amount, String description, String customerId, String userEmail, String addressLine1, String addressLine2, String state, String postalCode, String country, String name, List<ProductVO> productVOList) throws StripeException {
        Stripe.apiKey = secretKey;
        TokenCreateParams.Card cardParams = TokenCreateParams.Card.builder()
                .setNumber(cardNumber)
                .setExpMonth(String.valueOf(expMonth))
                .setExpYear(String.valueOf(expYear))
                .setCvc(String.valueOf(cvc))
                .build();

        TokenCreateParams tokenParams = TokenCreateParams.builder()
                .setCard(cardParams)
                .build();

        try {
            Token token = Token.create(tokenParams);
            Map<String, Object> chargeParams = new HashMap<>();
            chargeParams.put("amount", amount*100);
            chargeParams.put("currency", "eur");
            chargeParams.put("description", description);
            chargeParams.put("source", token.getId()); // Use the token ID as the source
            chargeParams.put("receipt_email",userEmail);
            chargeParams.put("shipping",Map.of(
                    "address", Map.of(
                            "line1", addressLine1,
                            "line2", addressLine2,
                            "city", country,
                            "state", state,
                            "postal_code", postalCode,
                            "country", country
                    ),
                    "name", name
            ));
            return Charge.create(chargeParams);
        }catch (CardException e){

            throw new IllegalArgumentException("Invalid card data: "+e.getMessage());
        }catch (StripeException e){
            throw new IllegalArgumentException("Stripe error");
        }
    }
    public void createCustomer(String email, String name, String phone, String cardNumber, String expMonth, String expYear, String cvc) throws StripeException {
        Stripe.apiKey = secretKey;

        // Create a customer without the card information
        Map<String, Object> cardParams = new HashMap<>();
        cardParams.put("number", cardNumber);
        cardParams.put("exp_month", expMonth);
        cardParams.put("exp_year", expYear);
        cardParams.put("cvc", cvc);

        Token token = Token.create(Map.of("card", cardParams));

        // Create a customer with the token as the default source
        Map<String, Object> customerParams = new HashMap<>();
        customerParams.put("email", email);
        customerParams.put("name", name);
        customerParams.put("phone", phone);
        customerParams.put("source", token.getId());

        Customer.create(customerParams);

    }


}
