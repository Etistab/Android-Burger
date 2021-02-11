package com.example.burger_app.category

import android.content.Context
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.support.v7.widget.LinearLayoutManager
import android.util.Log
import com.example.burger_app.R
import com.example.burger_app.product.ProductListActivity
import com.google.gson.Gson
import kotlinx.android.synthetic.main.activity_menu.*
import org.jetbrains.anko.doAsync
import java.lang.Exception
import java.net.URL
import android.support.v7.app.AlertDialog
import com.example.burger_app.infrastructure.BurgerDatabase
import com.example.burger_app.infrastructure.Json
import org.jetbrains.anko.uiThread


class MenuActivity : AppCompatActivity() {

    data class Category(val id: Int, val name: String, val image: String, val description: String, val products: Array<ProductListActivity.Product>)

    private var categories: Array<Category> = arrayOf()

    private val baseURL = "http://10.0.2.2:3000"
    private val adapter = CategoryAdapter(categories)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_menu)

        recyclerView?.apply {
            layoutManager = LinearLayoutManager(this@MenuActivity)
            adapter = this@MenuActivity.adapter
        }

        getCategories{ categories: Array<Category> ->
            this.categories = categories
            this.adapter.updateData(this.categories)

            if(this.categories.isEmpty()) {
                printAlert("Aucune catégorie n'a été trouvée")
            }
        }
    }

    private fun getCategories(success: (Array<Category>) -> Unit) {
        if (isNetworkConnected()) {
            getCategoriesFromNetwork(success)

            Log.d("NETWORK", "NETWORK CONNECTED")
        } else {
            getCategoriesFromRoom(success)

            Log.d("NETWORK", "NETWORK DISCONNECTED")
            printAlert("Attention vous n'êtes pas connectés a Internet, vous n'aurez pas accès au dernier menu.")
        }
    }

    /// - NETWORK

    private fun isNetworkConnected(): Boolean  {
        val connectivityManager = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val activeNetwork = connectivityManager.activeNetwork
        val networkCapabilities = connectivityManager.getNetworkCapabilities(activeNetwork)

        return networkCapabilities != null
                && networkCapabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
    }

    private fun getCategoriesFromNetwork(success: (Array<Category>) -> Unit) {
        val url = URL("${baseURL}/api/categories")

        doAsync {
            try {
                val response = url.readText()

                // insert json into bdd room
                val jsonDao = BurgerDatabase.instance(applicationContext)?.jsonDao()
                jsonDao?.deleteAll()
                jsonDao?.insert(Json(json = response))

                // send categories to recycler view
                val categories = Gson().fromJson(response, Array<Category>::class.java)

                uiThread {
                    success(categories)
                }
            } catch (e: Exception) {
                Log.d("EXCEPTION", e.toString())
            }
        }
    }

    /// - ROOM

    private fun getCategoriesFromRoom(success: (Array<Category>) -> Unit) {
        doAsync {
            // get json from bdd room
            val jsonDao = BurgerDatabase.instance(applicationContext)?.jsonDao()
            val json = jsonDao?.get()?.json ?: ""

            // send categories to recycler view
            val categories = Gson().fromJson(json, Array<Category>::class.java)

            uiThread {
                success(categories)
            }
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