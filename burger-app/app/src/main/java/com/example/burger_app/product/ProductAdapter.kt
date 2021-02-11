package com.example.burger_app.product

import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup

class ProductAdapter(private val products: Array<ProductListActivity.Product>) : RecyclerView.Adapter<ProductHolder>()
{
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProductHolder
    {
        val inflater = LayoutInflater.from(parent.context)
        return ProductHolder(inflater, parent)
    }

    override fun onBindViewHolder(holder: ProductHolder, position: Int)
    {
        val user: ProductListActivity.Product = products[position]
        holder.bind(user)
    }

    override fun getItemCount(): Int = products.size
}