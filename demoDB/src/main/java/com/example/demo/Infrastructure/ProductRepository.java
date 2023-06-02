package com.example.demo.Infrastructure;

import com.example.demo.Domain.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {

    @Query(value="{ 'productName': ?0}", delete = true)
    void deleteByName(String name);

    @Query("{ 'productName': ?0 }")
    List <Product> getByName(String name, Sort sort);

    @Query("{ 'productPrice' : ?0 }")
    List<Product> findByPrice(double price, Sort sort);

    @Query(value = "{ 'productName' : ?0 }", count = true)
    int countByName(String name);

    @Query(value = "{ 'productName' : ?0 }")
    List<Product> getLastThree(String name, Pageable pageable);

}
