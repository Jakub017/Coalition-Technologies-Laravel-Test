@extends('layouts.app')
@section('content')
<div class="container p-4">
    <div class="row">
        <h1 class="text-center uppercase">Coalition Technologies Laravel test</h1>
        <form id="product-form" action="{{route('store')}}" method="POST">
            @csrf
            <div class="row">
                <div class="col-12 col-md-4 mt-3">
                    <label for="product_name" class="form-label">Product name</label>
                    <input type="text" class="form-control" id="product_name" name="product_name"
                        placeholder="Type product name...">
                </div>
                <div class="col-12 col-md-4 mt-3">
                    <label for="quantity_stock" class="form-label">Quantity in stock</label>
                    <input type="number" class="form-control" id="quantity_stock" name="quantity_stock"
                        placeholder="Enter quantity...">
                </div>
                <div class="col-12 col-md-4 mt-3">
                    <label for="price_per_item" class="form-label">Price per item</label>
                    <div class="input-group">
                        <span class="input-group-text">$</span>
                        <input type="text" class="form-control" id="price_per_item" name="price_per_item"
                            placeholder="Enter price per item...">
                    </div>
                </div>
                <div class="col-12 mt-3 text-center">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
    </div>
    <div class="row mt-4">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Product name</th>
                    <th scope="col">Quantity in stock</th>
                    <th scope="col">Price per item</th>
                    <th scope="col">Datetime submitted</th>
                    <th scope="col">Total value number</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
            <tfoot>
                <tr>
                    <th colspan="4">SUM:</th>
                    <th id="totalSum">$0</th>
                    <th></th>
                </tr>
            </tfoot>
        </table>


    </div>
</div>

@endsection
