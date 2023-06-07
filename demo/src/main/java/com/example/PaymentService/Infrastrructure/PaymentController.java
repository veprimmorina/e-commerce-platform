package com.example.PaymentService.Infrastrructure;

import com.example.PaymentService.Domain.CheckOutModel;
import com.example.PaymentService.Domain.CustomException;
import com.example.PaymentService.Domain.ProductVO;
import com.example.PaymentService.Domain.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import com.stripe.model.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private  StripeService stripeService;

    @Autowired
    private OutputAdapter outputAdapter;

    @PostMapping("/charge")
    public ResponseEntity<String> chargeCreditCard(@RequestBody CheckOutModel checkOutModel) throws CustomException {
        try {

            String validateCard = stripeService.validateCreditCard(checkOutModel.getCardNumber(), checkOutModel.getExpMonth(), checkOutModel.getExpYear(), checkOutModel.getCvc(), checkOutModel.getAmount(), checkOutModel.getDescription(), checkOutModel.getCustomerId(), checkOutModel.getUserEmail(), checkOutModel.getAddressLine1(), checkOutModel.getAddressLine2(), checkOutModel.getState(), checkOutModel.getPostalCode(), checkOutModel.getCountry(), checkOutModel.getName(), checkOutModel.getProductVOList());
            if(!validateCard.equals("Success")){
                return ResponseEntity.badRequest().body(validateCard);

            }
            else if(validateCard=="Success"){
                System.out.println("Valid data, now checking products");
                if(this.outputAdapter.makeOrder(checkOutModel).equals("success")) {
                    Charge charge = stripeService.chargeCreditCard(checkOutModel.getCardNumber(), checkOutModel.getExpMonth(), checkOutModel.getExpYear(), checkOutModel.getCvc(), checkOutModel.getAmount(), checkOutModel.getDescription(), checkOutModel.getCustomerId(), checkOutModel.getUserEmail(), checkOutModel.getAddressLine1(), checkOutModel.getAddressLine2(), checkOutModel.getState(), checkOutModel.getPostalCode(), checkOutModel.getCountry(), checkOutModel.getName(), checkOutModel.getProductVOList());
                    System.out.println("Completed");
                    return ResponseEntity.ok("Success");
                }else{
                    return ResponseEntity.badRequest().body("Unfortunately one of your product in cart is out of stock");
                }
            }else{
                return ResponseEntity.badRequest().body("Internal Error");
            }
            //return ResponseEntity.ok(charge.toJson());

           // if(this.outputAdapter.makeOrder(checkOutModel).equals("success")){
               // Charge charge = stripeService.chargeCreditCard(checkOutModel.getCardNumber(), checkOutModel.getExpMonth(), checkOutModel.getExpYear(), checkOutModel.getCvc(), checkOutModel.getAmount(), checkOutModel.getDescription(), checkOutModel.getCustomerId(), checkOutModel.getUserEmail(), checkOutModel.getAddressLine1(), checkOutModel.getAddressLine2(), checkOutModel.getState(), checkOutModel.getPostalCode(), checkOutModel.getCountry(), checkOutModel.getName(), checkOutModel.getProductVOList());
               // return "Success";
            //}else{
               // return "Unsuccesfully Order";
            //}


        } catch (StripeException e) {
            //return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            return ResponseEntity.ok("Unsuccesfully");
        }
    }
    @GetMapping("/get")
    public String get(){
        return "hello";
    }
    @PostMapping("/create/customer")
    public void createCustomer(@RequestParam String email,
                                   @RequestParam String name,
                                   @RequestParam String phone,
                                   @RequestParam String cardNumber,
                                   @RequestParam String expMonth,
                                   @RequestParam String expYear,
                                   @RequestParam String cvc)
    {
        try {
            stripeService.createCustomer(email,name,phone,cardNumber,expMonth,expYear,cvc);
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }

}
