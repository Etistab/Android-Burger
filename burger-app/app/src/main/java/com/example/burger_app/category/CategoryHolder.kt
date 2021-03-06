package com.example.burger_app.category

import android.content.Intent
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import com.example.burger_app.product.ProductListActivity
import com.example.burger_app.R


class CategoryHolder(inflater: LayoutInflater, parent: ViewGroup) :
    RecyclerView.ViewHolder(
        inflater.inflate(R.layout.category_item, parent, false)
    )
{
    var name: TextView? = null
    var description: TextView? = null
    var open: Button? = null


    init
    {
        name = itemView.findViewById(R.id.name)
        description = itemView.findViewById(R.id.description)
        open = itemView.findViewById(R.id.open)
    }

    fun bind(category: MenuActivity.Category)
    {
        name?.text = category.name
        description?.text = category.description
        open?.text = "GO"

        open?.setOnClickListener {
            val intent = Intent(open?.context, ProductListActivity::class.java).apply {
                putExtra("products", category.products)
            }
            open?.context?.startActivity(intent)
        }
    }
}