package com.example.demo.Application;

import com.example.demo.Domain.Warranty;

public interface WarrantyInputPort {
    Warranty getWarrantyByProductId(String productId);
    void editWarranty(String warrantyId, Warranty warranty);

}
