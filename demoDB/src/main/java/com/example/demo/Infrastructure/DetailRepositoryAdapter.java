package com.example.demo.Infrastructure;

import com.example.demo.Application.DetailOutputPort;
import com.example.demo.Domain.Product;
import com.example.demo.Domain.ProductDetails;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Repository
public class DetailRepositoryAdapter implements DetailOutputPort {

    private final MongoTemplate mongoTemplate;


    public DetailRepositoryAdapter(MongoTemplate mongoTemplate) {
        this.mongoTemplate=mongoTemplate;
    }

    @Override
    public void create(ProductDetails productDetails) {
        this.mongoTemplate.insert(productDetails);
    }

    @Override
    public void addClick(String id) {
        Query query=new Query(Criteria.where("id").is(id));
        Product product = mongoTemplate.findOne(query, Product.class);
        ProductDetails productDetails=product.getProductDetails();
        productDetails.setClicked(productDetails.getClicked()+1);
        mongoTemplate.save(productDetails);
        mongoTemplate.save(product);
    }

    @Override
    public void addSold(String productId, int sold) {
        Query query=new Query(Criteria.where("id").is(productId));
        Product product = mongoTemplate.findOne(query, Product.class);
        ProductDetails productDetails=product.getProductDetails();
        productDetails.setSold(productDetails.getSold()+sold);
        mongoTemplate.save(productDetails);
        mongoTemplate.save(product);
    }

    @Override
    public List<Product> getByWeight(double weight) {
        Query query=new Query(Criteria.where("productDetails.weight").is(Double.valueOf(weight)));
        return this.mongoTemplate.find(query,Product.class);
    }

    @Override
    public List<Product> getMostSolded() {
        List<Product> products = this.mongoTemplate.findAll(Product.class);

        Collections.sort(products, new Comparator<Product>() {
            @Override
            public int compare(Product p1, Product p2) {
                int q1 = p1.getDetail().getSold();
                int q2 = p2.getDetail().getSold();
                return q2 - q1;
            }
        });

        return products;
    }

    @Override
    public List<Product> getMostWatched() {
        List<Product> products = this.mongoTemplate.findAll(Product.class);

        Collections.sort(products, new Comparator<Product>() {
            @Override
            public int compare(Product p1, Product p2) {
                int q1 = p1.getDetail().getClicked();
                int q2 = p2.getDetail().getClicked();
                return q2 - q1;
            }
        });

        return products;
    }

    @Override
    public ProductDetails getDetailsForProduct(String id) {
        Product product = this.mongoTemplate.findById(id,Product.class);
        return product.getProductDetails();
    }

    @Override
    public void editProductDetails(String id, ProductDetails productDetails) {
        Product product = this.mongoTemplate.findById(id,Product.class);
        ProductDetails productDetails1 = product.getProductDetails();
        productDetails1.setQuantity(productDetails.getQuantity());
        //productDetails1.setWeight(productDetails.getWeight());
        this.mongoTemplate.save(productDetails1);
    }

    @Override
    public List<Product> getOutOfStockAll() {
       List <Product> products = this.mongoTemplate.findAll(Product.class);
       List <Product> outOfStockProducts = new ArrayList<>();
        for (int i=0;i<products.size();i++) {
            if(products.get(i).getDetail().getQuantity()==0){
                outOfStockProducts.add(products.get(i));
            }
        }
        return outOfStockProducts;
    }

    @Override
    public List<Product> filterByQuantityAllProducts() {
            List<Product> products = this.mongoTemplate.findAll(Product.class);

            Collections.sort(products, new Comparator<Product>() {
                @Override
                public int compare(Product p1, Product p2) {
                    int q1 = p1.getDetail().getQuantity();
                    int q2 = p2.getDetail().getQuantity();
                    return q2 - q1;
                }
            });

            return products;
        }

    @Override
    public List<Product> getTop10() {
        List<Product> products = this.mongoTemplate.findAll(Product.class);

        Collections.sort(products, new Comparator<Product>() {
            @Override
            public int compare(Product p1, Product p2) {
                int q1 = p1.getDetail().getSold();
                int q2 = p2.getDetail().getSold();
                return q2 - q1;
            }
        });
        List <Product> topProducts = products.subList(0,Math.min(products.size(), 10));
        return topProducts;
    }

}
