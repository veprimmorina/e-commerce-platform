package com.example.demo.Domain;

import com.example.demo.Application.WarrantyInputPort;
import com.example.demo.Infrastructure.WarrantyRepositoryAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WarrantyService implements WarrantyInputPort {


    @Autowired
    private WarrantyRepositoryAdapter warrantyRepository;

    @Override
    public Warranty getWarrantyByProductId(String productId) {
        return this.warrantyRepository.getWarrantyByProductId(productId);
    }

    @Override
    public void editWarranty(String warrantyId, Warranty warranty) {
        this.warrantyRepository.editWarranty(warrantyId,warranty);
    }

    public Warranty findWarranty(String warrantyId){
        return this.warrantyRepository.findWarranty(warrantyId);
    }

}
