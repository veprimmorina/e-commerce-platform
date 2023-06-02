package com.example.demo.Infrastructure;

import com.example.demo.Application.SubCategoriesOutputPort;
import com.example.demo.Domain.Category;
import com.example.demo.Domain.Product;
import com.example.demo.Domain.SubCategory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Repository
public class SubCategoryRepositoryAdapter implements SubCategoriesOutputPort {


    private final MongoTemplate mongoTemplate;

    public SubCategoryRepositoryAdapter(MongoTemplate mongoTemplate){
        this.mongoTemplate=mongoTemplate;
    }
    @Override
    public List<SubCategory> getSubCategories() {
        return this.mongoTemplate.findAll(SubCategory.class);
    }

    @Override
    public List<Product> getSubCategoryProducts(String subcategory) {
        SubCategory subCategory = mongoTemplate.findById(subcategory,SubCategory.class);
        return subCategory.getProductList();
    }

    @Override
    public void addProductsToSubcategory(String SubcategoryId,String productId) {
        Query query = new Query(Criteria.where("id").is(SubcategoryId));
        SubCategory subCategory = this.mongoTemplate.findOne(query, SubCategory.class);
        Query queryProduct = new Query(Criteria.where("id").is(productId));
        Product product = this.mongoTemplate.findOne(queryProduct,Product.class);
        System.out.println(subCategory);
        System.out.println(product);
        subCategory.addToList(product);
        this.mongoTemplate.save(subCategory);
    }

    @Override
    public void createSubCategory(SubCategory subCategory) {
        String categoryId = subCategory.getCategoryId();
        Category category = this.mongoTemplate.findById(categoryId, Category.class);
        this.mongoTemplate.insert(subCategory);
        category.addSubcategory(subCategory);
        this.mongoTemplate.save(category);
    }

    @Override
    public List<Product> outOfStockProducts(String id) {
        SubCategory subCategory = this.mongoTemplate.findById(id, SubCategory.class);
        List <Product> products=subCategory.getProductList();
        List <Product> outOfStockProduct = new ArrayList<>();
        for(int i=0;i<products.size();i++){
            if(products.get(i).getDetail().getQuantity()==0){
                outOfStockProduct.add(products.get(i));
            }
        }
        return outOfStockProduct;
    }

    @Override
    public List<Product> sortByQuantity(String id) {
        SubCategory subCategory = this.mongoTemplate.findById(id, SubCategory.class);
        List<Product> products = subCategory.getProductList();

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
    public List<Product> getLastProducts(String id) {
        SubCategory subCategory = this.mongoTemplate.findById(id, SubCategory.class);
        List <Product> allProducts = subCategory.getProductList();
        List<Product> lastProducts = new ArrayList<>();

        int numProducts = Math.min(allProducts.size(), 5); // Limit to max 5 products
        for(int i = allProducts.size() - numProducts; i < allProducts.size(); i++) {
            lastProducts.add(allProducts.get(i));
        }

        return lastProducts;
    }

    @Override
    public SubCategory getSubcategoryById(String id) {
        return this.mongoTemplate.findById(id, SubCategory.class);
    }

    @Override
    public void changeCategoryForSubCategory(SubCategory[] subCategories) {
        for(int i=0;i<subCategories.length;i++){
            SubCategory subcategory = this.mongoTemplate.findById(subCategories[i].getId(), SubCategory.class);
            Category oldCategory = this.mongoTemplate.findById(subcategory.getCategoryId(), Category.class);
            oldCategory.removeFromList(subCategories[i]);
            Category newCategory = this.mongoTemplate.findById(subCategories[i].getCategoryId(), Category.class);
            newCategory.addSubcategory(subCategories[i]);
            subcategory.setCategoryId(subCategories[i].getCategoryId());
            this.mongoTemplate.save(oldCategory);
            this.mongoTemplate.save(newCategory);
            this.mongoTemplate.save(subcategory);
        }
    }


}
