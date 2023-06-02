package com.example.demo.Application;

import com.example.demo.Domain.Warranty;

public interface WarrantyOutputPort {
    Warranty getWarrantyByProductId(String productId);
    void editWarranty(String warrantyId, Warranty warranty);
    Warranty findWarranty(String warrantyId);

}
