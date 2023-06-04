package com.example.PaymentService.Infrastrructure;

import com.example.PaymentService.Application.OutputPort;
import com.example.PaymentService.Domain.CheckOutModel;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OutputAdapter implements OutputPort {
    @Override
    public String makeOrder(CheckOutModel checkOutModel) {
        RestTemplate restTemplate = new RestTemplate();
        String completeOrderUrl = "http://127.0.0.1:8080/api/product/order";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<CheckOutModel> requestEntity = new HttpEntity<>(checkOutModel, headers);

        ResponseEntity<String> responseEntity = restTemplate.postForEntity(completeOrderUrl, requestEntity, String.class);
        String message = responseEntity.getBody();
        return message;
    }

}
