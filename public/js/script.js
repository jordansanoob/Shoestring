$(document).ready(function () {
    $.ajax({
        url: '/chart-data',
        type: 'GET',
        success: function (data) {
            let myChart = document.getElementById('myChart').getContext('2d');
            var itemArray = [];
            var dataArray = [];
            data.forEach(function (item) {
                console.log(item);
                itemArray.push(item.itemName);
                dataArray.push(item.amountSold);
            })
            let barChart = new Chart(myChart, {
                type: 'bar',
                data: {
                    labels: itemArray,
                    datasets: [{
                        label: 'Amount Sold',
                        data: dataArray
                    }]
                },
                options: {

                }
            })
        },
        failure: function (data) {

        }
    })
})

