<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function home() {
        return view('home');
    }

    public function store(Request $request) {
        $data = $request->validate([
            'product_name' => 'required',
            'quantity_stock' => 'required|numeric',
            'price_per_item' => 'required|numeric',
        ]);

        $data['datetime_submitted'] = date('Y-m-d H:i:s');
        $data['total_value'] = $data['quantity_stock'] * $data['price_per_item'];

        $file_path = public_path('data/data.json');
        $file_data = file_exists($file_path) ? json_decode(file_get_contents($file_path), true) : [];
        $file_data[] = $data;
        file_put_contents($file_path, json_encode($file_data));

        return response()->json(['success' => true, 'data' => $data]);
    }
}
