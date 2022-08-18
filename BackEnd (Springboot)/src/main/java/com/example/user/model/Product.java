package com.example.user.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/* @Entity annotation which means that this class is mapped to the table in the database */
@Entity
@Table(name = "products")
public class Product {

	@Id // @Id to the data member which will behave as the primary key attribute in the
		// table
	@GeneratedValue(strategy = GenerationType.IDENTITY) // to auto generate primary keys
	private long id;

	/* @Column annotation to map it to table and columns in the database */
	@Column(name = "Product_Name")
	private String productName;

	@Column(name = "Product_Category")
	private String category;

	@Column(name = "Product_Date")
	private String date;
	
	@Column(name = "Product_Condition")
	private String condition;
	
	@Column(name = "Product_Price")
	private String price;
	
	@Column(name = "Product_Comments")
	private String comments;
	
	public Product() {}

	public Product(String productName, String category, String date, String condition, String price, String comments) {
		super();
		this.productName = productName;
		this.category = category;
		this.date = date;
		this.condition = condition;
		this.price = price;
		this.comments = comments;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	

}
