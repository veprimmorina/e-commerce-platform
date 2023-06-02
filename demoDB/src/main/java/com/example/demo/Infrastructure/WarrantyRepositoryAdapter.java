package com.example.demo.Infrastructure;

import com.example.demo.Application.WarrantyOutputPort;
import com.example.demo.Domain.Product;
import com.example.demo.Domain.Warranty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class WarrantyRepositoryAdapter implements WarrantyOutputPort {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public Warranty getWarrantyByProductId(String productId) {
         Product product = mongoTemplate.findById(productId, Product.class);
         return product.getWarranty();
    }

    @Override
    public void editWarranty(String warrantyId, Warranty warranty) {
        Warranty warranty1 = this.mongoTemplate.findById(warrantyId, Warranty.class);
        warranty1.setWarrantyDescription(warranty.getWarrantyDescription());
        warranty1.setWarrantyLength(warranty.getWarrantyLength());
        warranty1.setWarrantyCoverageDetails(warranty.getWarrantyCoverageDetails());
        this.mongoTemplate.save(warranty1);
    }

    @Override
    public Warranty findWarranty(String warrantyId) {
        return this.mongoTemplate.findById(warrantyId, Warranty.class);
    }
}
