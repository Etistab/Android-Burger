package com.example.burger_app.category

import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup

class CategoryAdapter(private var categories: Array<MenuActivity.Category>) : RecyclerView.Adapter<CategoryHolder>()
{
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CategoryHolder
    {
        val inflater = LayoutInflater.from(parent.context)
        return CategoryHolder(inflater, parent)
    }

    override fun onBindViewHolder(holder: CategoryHolder, position: Int)
    {
        val user: MenuActivity.Category = categories[position]
        holder.bind(user)
    }

    override fun getItemCount(): Int = categories.size

    fun updateData(data: Array<MenuActivity.Category>) {
        categories = data
        notifyDataSetChanged()
    }
}