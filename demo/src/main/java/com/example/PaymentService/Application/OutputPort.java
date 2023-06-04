package com.example.PaymentService.Application;

import com.example.PaymentService.Domain.CheckOutModel;

public interface OutputPort {

    String makeOrder(CheckOutModel checkOutModel);
}
