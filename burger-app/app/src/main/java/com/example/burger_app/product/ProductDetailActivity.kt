package com.example.burger_app.product

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.TextView
import com.example.burger_app.R

class ProductDetailActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_product_detail)
        val name = findViewById<TextView?>(R.id.name)
        val description = findViewById<TextView?>(R.id.description)
        val price = findViewById<TextView?>(R.id.price)

        val product = intent.extras?.get("product") as ProductListActivity.Product

        name?.text = product.name
        description?.text = product.description
        price?.text = "${product.price}€"

        Log.d("toto", product.name)
    }
}
