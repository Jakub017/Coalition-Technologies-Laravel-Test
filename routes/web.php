<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductsController;

Route::controller(ProductsController::class)->group(function(){
    Route::get('/', 'home')->name('home');
    Route::post('/store', 'store')->name('store');
});