package com.example.demo.Domain;

import com.example.demo.Infrastructure.ProductRepository;
import com.example.demo.Infrastructure.ProductRepositoryAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService  {

    @Autowired
    private ProductRepository productRepository;

    private final ProductRepositoryAdapter productRepositoryAdapter;

    public ProductService(ProductRepositoryAdapter productRepository) {
        this.productRepositoryAdapter = productRepository;
    }

    public void saveDataModel(Product dataModel) {
        productRepository.insert(dataModel);
    }

    public Product getDataModelById(String id) {
        return productRepository.findById(id).orElse(null);
    }


    public void deleteById(String id){
        productRepository.deleteById(id);
    }

    public void deleteByname(String name){
        productRepository.deleteByName(name);
    }

    public List<Product> getByname(String name){
        Sort sort = Sort.by(Sort.Direction.ASC, "productPrice");
       return productRepository.getByName(name, sort);
    }



    public List<Product> findByPrice(double price){
        Sort sort = Sort.by(Sort.Direction.DESC, "price");
        return this.productRepository.findByPrice(price, sort);
    }

    public int countByname(String name){
        return this.productRepository.countByName(name);
    }

    public long count(){
        return this.productRepository.count();
    }

    public List<Product> getLastThree(String name){
        Pageable pageable=PageRequest.of(0,3);
        return this.productRepository.getLastThree(name,pageable);
    }


    public String deleteProduct(String id) {
        this.productRepositoryAdapter.deleteProductTest(id);
        return "";
    }

    public long countTotal() {
        return this.productRepositoryAdapter.count();
    }

    public long countProductsByName(String name) {
        return this.productRepositoryAdapter.countByName(name);
    }

    public Product updateProduct(String id, Product product) {
        this.productRepositoryAdapter.update(id, product);
        return product;
    }

    public List<Product> findTop3() {
        return this.productRepositoryAdapter.findTop3();
    }

    public List<Product> findByRating(int id) {
        return this.productRepositoryAdapter.findByRating(id);
    }

    public List<Product> getTopRated() {
        return this.productRepositoryAdapter.getTopRated();
    }

    public void addReview(String productId, Review review) {
        this.productRepositoryAdapter.addReview(productId,review);
    }

    public Product getProductByid(String id) {
        return this.productRepositoryAdapter.getProductById(id);
    }

    public List<Review> getProductReviewById(String id) {
        return this.productRepositoryAdapter.getProductReviewById(id);
    }

    public void createProduct(Product product) {
        this.productRepositoryAdapter.create(product);
    }

    public long countProduct() {
        return this.productRepositoryAdapter.countProduct();
    }

    public List<Product> getByCategory(String category) {
        return this.productRepositoryAdapter.getByCategory(category);
    }

    public List<Product> getNewestProducts() {
        return this.productRepositoryAdapter.getNewestProducts();
    }

    public List<Product> searchProducts(String product) {
        return this.productRepositoryAdapter.searchProducts(product);
    }

    public String orderProducts(List<ProductEmbeddable> products) {
        return this.productRepositoryAdapter.orderProducts(products);
    }

    public List<Product> getAll(){
        return this.productRepositoryAdapter.getAll();
    }

    public void changeProductSubCategory(String id, Product product){
        this.productRepositoryAdapter.changeProductSubCategory(id,product);
    }
    public void addClicked(String id){
        this.productRepositoryAdapter.addClicked(id);
    }


}
