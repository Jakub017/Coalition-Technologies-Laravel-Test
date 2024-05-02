$(document).ready(function () {
    $('#product-form').submit(function (e) {
        e.preventDefault();
        const formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: formData,
            success: function (response) {
                if (response.success) {
                    const newRow = `<tr>
                        <td>${response.data.product_name}</td>
                        <td>${response.data.quantity_stock}</td>
                        <td>$${response.data.price_per_item}</td>
                        <td>${response.data.datetime_submitted}</td>
                        <td>$${response.data.total_value}</td>
                        <td><button class="btn btn-info edit-btn">Edit</button></td>
                    </tr>`;
                    $('table tbody').append(newRow);
                    updateTotalSum();
                }
            },
            error: function () {
                alert('There was an error! Please try again.');
            }
        });
    });
});
