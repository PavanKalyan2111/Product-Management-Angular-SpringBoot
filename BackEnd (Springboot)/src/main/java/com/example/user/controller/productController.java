package com.example.user.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.user.exception.productException;
import com.example.user.model.Product;
import com.example.user.repository.productRepository;


@CrossOrigin(origins ="*")
@RestController
@RequestMapping("/api")
public class productController {
	
	@Autowired
	private productRepository ProductRepository;
	
	@GetMapping("/products")
	public java.util.List<Product> getAllProducts() {
		return ProductRepository.findAll();
	}
	
	@PostMapping("/postproduct")
	public Product postProduct(@RequestBody Product product) {
		return ProductRepository.save(product);
	}
	
	@GetMapping("/products/{id}")
	public ResponseEntity<Product> getProductsById(@PathVariable Long id){
		Product product=ProductRepository.findById(id)
				.orElseThrow(() -> new productException("Product Not Found with Id :"+id));
		return ResponseEntity.ok(product); 	
	}
	
	@PutMapping("/updateproduct/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails){
		Product product = ProductRepository.findById(id)
				.orElseThrow(()-> new productException("Product Not Found with Id :" + id));
		product.setProductName(productDetails.getProductName());
		product.setCategory(productDetails.getCategory());
		product.setDate(productDetails.getDate());
		product.setCondition(productDetails.getCondition());
		product.setPrice(productDetails.getPrice());
		product.setComments(productDetails.getComments());
		
		Product updatedProduct = ProductRepository.save(product);
		return ResponseEntity.ok(updatedProduct);
	}
	
	@DeleteMapping("/deleteproduct/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteProduct(@PathVariable Long id){
		Product product = ProductRepository.findById(id)
				.orElseThrow(() -> new productException("Product Not Found with Id :" +id));
		
		ProductRepository.delete(product);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
		
	}
}
