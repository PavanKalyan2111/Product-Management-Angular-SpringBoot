package com.example.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.user.model.Product;

@Repository
public interface productRepository extends JpaRepository<Product, Long>{

}
