package com.example.burger_app.infrastructure

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase


@Database(entities = [Json::class], version = 1)
abstract class BurgerDatabase : RoomDatabase() {
    abstract fun jsonDao(): JsonDao

    companion object {
        private var database: BurgerDatabase? = null

        fun instance(context: Context): BurgerDatabase? {
            if (database != null) {
                return database
            }

            database = Room.databaseBuilder(
                context,
                BurgerDatabase::class.java, "burger"
            ).build()

            return database
        }
    }


}