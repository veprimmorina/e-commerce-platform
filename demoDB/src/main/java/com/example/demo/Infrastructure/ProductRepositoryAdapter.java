package com.example.demo.Infrastructure;

import com.example.demo.Application.ProductRepositoryPort;
import com.example.demo.Domain.*;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class ProductRepositoryAdapter implements ProductRepositoryPort {

    private final MongoTemplate mongoTemplate;


    public ProductRepositoryAdapter(MongoTemplate mongoTemplate) {
        this.mongoTemplate=mongoTemplate;
    }

    @Override
    public void deleteProductTest(String id){
        Query query=new Query(Criteria.where("id").is(id));
        Product product = mongoTemplate.findOne(query, Product.class);
        Warranty warranty = this.mongoTemplate.findById(product.getWarranty().getWarrantyID(), Warranty.class);
        ProductDetails productDetails = this.mongoTemplate.findById(product.getProductDetails().getId(), ProductDetails.class);
        SubCategory productSubCategory = this.mongoTemplate.findById(product.getSubCategoryId(), SubCategory.class);
        productSubCategory.removeFromList(product);
        mongoTemplate.save(productSubCategory);
        mongoTemplate.remove(warranty);
        mongoTemplate.remove(productDetails);
        mongoTemplate.remove(query, Product.class);
    }

    @Override
    public long count() {
        return mongoTemplate.count(new Query(), Product.class);
    }

    @Override
    public long countByName(String name) {
        Query query=new Query(Criteria.where("productName").is(name));
        return mongoTemplate.count(query,Product.class);

    }

    @Override
    public void update(String id, Product product) {
        Product product1 = this.mongoTemplate.findById(id, Product.class);
        SubCategory oldSubcategory = this.mongoTemplate.findById( product1.getSubCategoryId(), SubCategory.class);
        oldSubcategory.removeFromList(product1); // Remove the original product from the list
        mongoTemplate.save(oldSubcategory);
        product1.setProductName(product.getProductName());
        product1.setProductPrice(product.getProductPrice());
        product1.setSubCategoryId(product.getSubCategoryId());
        SubCategory subCategory = this.mongoTemplate.findById(product1.getSubCategoryId(), SubCategory.class);
        ProductDetails detail = this.mongoTemplate.findById(product1.getDetail().getId(), ProductDetails.class);
        detail.setDescription(product.getProductDetails().getDescription());
        detail.setQuantity(product.getProductDetails().getQuantity());
        detail.setWeight(product.getProductDetails().getWeight());
        detail.setProductDimensions(product.getProductDetails().getProductDimensions());
        Warranty warranty = this.mongoTemplate.findById(product1.getWarranty().getWarrantyID(), Warranty.class);
        warranty.setWarrantyLength(product.getWarranty().getWarrantyLength());
        warranty.setWarrantyDescription(product.getWarranty().getWarrantyDescription());
        warranty.setWarrantyCoverageDetails(product.getWarranty().getWarrantyCoverageDetails());
        subCategory.addToList(product1);
        mongoTemplate.save(detail);
        mongoTemplate.save(warranty);
        mongoTemplate.save(product1);
        mongoTemplate.save(subCategory);
    }

    @Override
    public List<Product> findTop3() {
        Query query= new Query();
        query.limit(3);
        query.with(Sort.by(Sort.Direction.ASC,"productPrice"));
        return mongoTemplate.find(query,Product.class);
    }

    @Override
    public List<Product> findByRating(int rating) {
        Query query = new Query(Criteria.where("review.rating").is(rating));
        return mongoTemplate.find(query, Product.class);
    }

    @Override
    public List<Product> getTopRated() {
        Query query= new Query();
        query.with(Sort.by(Sort.Direction.ASC,"review.rating"));
        return mongoTemplate.find(query,Product.class);
    }

    @Override
    public void addReview(String productId, Review review) {
        Product p = mongoTemplate.findById(productId,Product.class);
        mongoTemplate.insert(review);
        p.addReview(review);
        mongoTemplate.save(p);
    }

    @Override
    public Product getProductById(String id) {
        return mongoTemplate.findById(id, Product.class);
    }

    @Override
    public List<Review> getProductReviewById(String id) {
        Query query = new Query(Criteria.where("id").is(id));
        Product product = mongoTemplate.findOne(query, Product.class);
        List<Review> reviews = product.getReviews();
        return reviews;
    }

    @Override
    public void create(Product product) {
        ProductDetails productDetails = new ProductDetails(product.getProductDetails().getDescription(),product.getProductDetails().getQuantity(), product.getProductDetails().getWeight(), product.getProductDetails().getProductDimensions(), 0,0);
        Warranty warranty = new Warranty(product.getWarranty().getWarrantyDescription(), product.getWarranty().getWarrantyLength(), product.getWarranty().getWarrantyCoverageDetails());
        String subCategoryId = product.getSubCategoryId();
        this.mongoTemplate.insert(productDetails);
        this.mongoTemplate.insert(warranty);
        product.setWarranty(warranty);
        product.setProductDetails(productDetails);
        this.mongoTemplate.insert(product);
        SubCategory subCategory = this.mongoTemplate.findById(subCategoryId,SubCategory.class);
        subCategory.addToList(product);
        this.mongoTemplate.save(subCategory);

    }

    @Override
    public long countProduct() {
        Query query = new Query();
        return mongoTemplate.count(query,Product.class);
    }

    @Override
    public List<Product> getByCategory(String category) {
        Query query = new Query();
        query.addCriteria(Criteria.where("subCategory.subCategoryName").is("Smart Phone"));
        List<Product> products = mongoTemplate.find(query, Product.class);
        return products;
    }

    @Override
    public List<Product> getNewestProducts() {
        Query query = new Query();
        query.with(Sort.by(Sort.Direction.DESC,"id"));
        List<Product> products = mongoTemplate.find(query, Product.class);
        return products;
    }

    @Override
    public List<Product> searchProducts(String product) {
        Query query = new Query(Criteria.where("productName").is(product));
        return this.mongoTemplate.find(query,Product.class);
    }

    @Override
    public String orderProducts(List<ProductEmbeddable> products) {
        if (products.size() <= 0) {
            return "Unsucessfull";
        } else {
            for (int i = 0; i < products.size(); i++) {
                Product product = this.mongoTemplate.findById(products.get(i).getId(), Product.class);

                ProductDetails productDetails = this.mongoTemplate.findById(product.getProductDetails().getId(), ProductDetails.class);
                int quantity = products.get(i).getQuantity();
                System.out.println(quantity);
                if (productDetails.getQuantity() - quantity < 0) {
                    return "Unsucessfull";
                } else {
                    productDetails.setQuantity(productDetails.getQuantity() - quantity);
                    productDetails.setSold(productDetails.getSold()+quantity);
                    this.mongoTemplate.save(productDetails);
                }
            }
            return "success";
        }
    }

    @Override
    public List<Product> getAll() {
        return this.mongoTemplate.findAll(Product.class);
    }

    @Override
    public void changeProductSubCategory(String id, Product product) {
        Product actualProduct = this.mongoTemplate.findById(id, Product.class);
        removeProductSubcategoryList(actualProduct);
        actualProduct.setSubCategoryId(product.getSubCategoryId());
        addProductSubcategoryList(actualProduct);
        this.mongoTemplate.save(actualProduct);
    }

    @Override
    public void addClicked(String id) {
        Product product = this.mongoTemplate.findById(id, Product.class);
        ProductDetails productDetails = this.mongoTemplate.findById(product.getProductDetails().getId(), ProductDetails.class);
        productDetails.setClicked(productDetails.getClicked()+1);
        this.mongoTemplate.save(productDetails);
    }

    public void removeProductSubcategoryList(Product product){
        SubCategory actualSubCategory = this.mongoTemplate.findById(product.getSubCategoryId(), SubCategory.class);
        actualSubCategory.removeFromList(product);
        this.mongoTemplate.save(actualSubCategory);
    }
    public void addProductSubcategoryList(Product product ){
        SubCategory newSubCategory = this.mongoTemplate.findById(product.getSubCategoryId(), SubCategory.class);
        newSubCategory.addToList(product);
        this.mongoTemplate.save(newSubCategory);
    }





}
