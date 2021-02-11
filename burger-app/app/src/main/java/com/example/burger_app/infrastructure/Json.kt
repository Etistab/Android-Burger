package com.example.burger_app.infrastructure

import androidx.room.*


@Entity
data class Json(
    @PrimaryKey(autoGenerate = true) val id: Long? = null,
    @ColumnInfo val json: String?
)


@Dao
interface JsonDao {
    @Query("SELECT json FROM json")
    fun get(): Json

    @Insert
    fun insert(json: Json): Long

    @Query("DELETE FROM json")
    fun deleteAll()
}