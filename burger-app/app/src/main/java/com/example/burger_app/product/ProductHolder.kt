package com.example.burger_app.product

import android.content.Intent
import android.support.v7.widget.RecyclerView
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import com.example.burger_app.R


class ProductHolder(inflater: LayoutInflater, parent: ViewGroup) :
    RecyclerView.ViewHolder(
        inflater.inflate(R.layout.product_item, parent, false)
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

    fun bind(product: ProductListActivity.Product)
    {
        name?.text = product.name
        description?.text = product.description
        open?.text = "GO"

        open?.setOnClickListener {
            val intent = Intent(open?.context, ProductDetailActivity::class.java).apply {
                putExtra("product", product)
            }
            open?.context?.startActivity(intent)
        }
    }
}