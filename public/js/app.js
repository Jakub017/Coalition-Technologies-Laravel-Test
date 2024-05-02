$(document).ready(function () {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

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

    $(document).on('click', '.edit-btn', function () {
        const $row = $(this).closest('tr');
        const product_name = $row.find('td:eq(0)').text();
        const quantity_stock = $row.find('td:eq(1)').text();
        const price_per_item = $row.find('td:eq(2)').text().slice(1);

        $row.find('td:eq(0)').html(`<input type="text" class="form-control" value="${product_name}">`);
        $row.find('td:eq(1)').html(`<input type="number" class="form-control" value="${quantity_stock}">`);
        $row.find('td:eq(2)').html(`<input type="text" class="form-control" value="${price_per_item}">`);

        $(this).text('Save').removeClass('btn-info').addClass('btn-success').addClass('save-btn').removeClass('edit-btn');
    });

    $(document).on('click', '.save-btn', function () {
        const $row = $(this).closest('tr');
        const product_name = $row.find('input:eq(0)').val();
        const quantity_stock = $row.find('input:eq(1)').val();
        const price_per_item = $row.find('input:eq(2)').val();

        $.ajax({
            type: 'POST',
            url: '/update',
            data: {
                product_name: product_name,
                quantity_stock: quantity_stock,
                price_per_item: price_per_item,
            },
            success: function (response) {
                if (response.success) {
                    $row.find('td:eq(0)').text(product_name);
                    $row.find('td:eq(1)').text(quantity_stock);
                    $row.find('td:eq(2)').text(`$${price_per_item}`);
                    $row.find('td:eq(4)').text(`$${quantity_stock * price_per_item}`);

                    $row.find('.save-btn').text('Edit').addClass('btn-info').removeClass('btn-success').removeClass('save-btn').addClass('edit-btn');

                    updateTotalSum();
                }
            },
            error: function () {
                alert('Error updating data. Please try again.');
            }
        });

    });

    function updateTotalSum() {
        let totalSum = 0;
        $('table tbody tr').each(function () {
            const quantity = parseFloat($(this).find('td:eq(1)').text());
            const pricePerItem = parseFloat($(this).find('td:eq(2)').text().substring(1));
            const totalValue = quantity * pricePerItem;
            totalSum += totalValue;
            const roundedTotalValue = totalValue.toFixed(2);
            $(this).find('td:eq(4)').text(`$${roundedTotalValue}`);
        });
        const roundedTotalSum = totalSum.toFixed(2);
        $('#totalSum').text(`$${roundedTotalSum}`);
    }

});
