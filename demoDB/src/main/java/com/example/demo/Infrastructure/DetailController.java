package com.example.demo.Infrastructure;

import com.example.demo.Application.DetailInputPort;
import com.example.demo.Domain.DetailService;
import com.example.demo.Domain.Product;
import com.example.demo.Domain.ProductDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/detail")
public class DetailController implements DetailInputPort {

    @Autowired
    private DetailService detailService;

    @Override
    @PostMapping("/save")
    public void createProductDetail(@RequestBody ProductDetails productDetails) {
        this.detailService.createProductDetail(productDetails);
    }

    @Override
    @GetMapping("/add/click/{id}")
    public void addClick(@PathVariable("id") String id) {
        this.detailService.addClick(id);
    }

    @Override
    @GetMapping("/add/sold/{id}/{sold}")
    public void addSold(@PathVariable("id") String productId,@PathVariable("sold") int sold) {
        this.detailService.addSold(productId,sold);
    }

    @Override
    @GetMapping("/get/by/weight/{productWeight}")
    public List<Product> getByWeight(@PathVariable("productWeight") double weight) {
        return this.detailService.getByWeight(weight);
    }

    @Override
    @GetMapping("/get/most/solded")
    public List<Product> getMostSolded() {
        return this.detailService.getMostSolded();
    }

    @Override
    @GetMapping("/get/most/watched")
    public List<Product> getMostWatched() {
        return this.detailService.getMostWatched();
    }

    @Override
    @GetMapping("/get/product/details/{productId}")
    public ProductDetails getDetailsForProduct(@PathVariable("productId") String productId) {
        return this.detailService.getDetailsForProduct(productId);
    }

    @Override
    @PutMapping("/edit/by/id/{productId}")
    public void editProductDetails(@PathVariable("productId") String productId, @RequestBody  ProductDetails productDetails) {
        System.out.println(productDetails.getQuantity());
        this.detailService.editProductDetails(productId,productDetails);
    }

    @Override
    @GetMapping("/get/all/outOfStock")
    public List<Product> getAllOutOfStock() {
        return this.detailService.getAllOutOfStock();
    }

    @Override
    @GetMapping("/filter/all")
    public List<Product> filterByQuantityAllProducts() {
        return this.detailService.filterByQuantityAllProducts();
    }

    @Override
    @GetMapping("/get/top/10")
    public List<Product> getTop10() {
        return this.detailService.getTop10();
    }


}
