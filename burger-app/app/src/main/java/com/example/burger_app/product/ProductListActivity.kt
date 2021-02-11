package com.example.burger_app.product

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v7.app.AlertDialog
import android.support.v7.widget.LinearLayoutManager
import com.example.burger_app.R
import kotlinx.android.synthetic.main.activity_menu.*
import java.io.Serializable

class ProductListActivity : AppCompatActivity() {
    data class Product (val name: String, val price: String, val description: String): Serializable

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_product_list)

        val products = intent.extras?.get("products") as Array<Product>

        recyclerView?.apply {
            layoutManager = LinearLayoutManager(this@ProductListActivity)
            adapter = ProductAdapter(products)
        }

        if(products.isEmpty()) {
            printAlert("Aucun produit n'a été trouvé")
        }
    }

    /// - ALERT

    private fun printAlert(message: String){
        AlertDialog.Builder(this)
            .setMessage(message)
            .setPositiveButton(android.R.string.yes, null)
            .setIcon(android.R.drawable.ic_dialog_alert)
            .show()
    }
}
