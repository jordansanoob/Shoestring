$(document).ready(function () {
    $(".sidebar a, footer a[href='#myPage'], header a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {

            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 500, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
    $.ajax({
        url: '/chart-data',
        type: 'GET',
        success: function (data) {

            var barItemArray = [];
            var barDataArray = [];
            var pieBackgroundRGB = [
                'rgba(135, 127, 13, 0.6)',
                'rgba(0, 140, 186, 0.6)',
                'rgba(109, 103, 5, 0.6)',
                'rgba(25, 78, 109, 0.6)',
                'rgba(197, 85, 88, 0.6)',
                'rgba(61, 140, 186, 0.6)',
                'rgba(135, 133, 31, 0.6)',
                'rgba(197, 20, 67, 0.6)',
                'rgba(11, 85, 109, 0.6)',
                'rgba(109, 108, 30, 0.6)',
                'rgba(84, 72, 109, 0.6)',
                'rgba(197, 183, 169, 0.6)',
                'rgba(155, 140, 186, 0.6)',
                'rgba(88, 135, 95, 0.6)',
                'rgba(77, 109, 82, 0.6)'
            ]
            var barBackgroundRGB = [
                'rgba(0, 140, 186, 0.6)',
                'rgba(135, 127, 13, 0.6)',
                'rgba(109, 103, 5, 0.6)',
                'rgba(197, 20, 67, 0.6)',
                'rgba(11, 85, 109, 0.6)'
            ]
            console.log(data);

            data.bar[0].forEach(function (item) {
                console.log(item);
                barItemArray.push(item.itemName);
                barDataArray.push(item.amountSold);
            });

            var pieItemArray = [];
            var pieDataArray = [];

            data.pie[0].forEach(function (item) {
                console.log(item);
                pieItemArray.push(item.itemName);
                pieDataArray.push(item.amountSold);
            })

            var barData = {
                type: 'bar',
                data: {
                    labels: barItemArray,
                    datasets: [{
                        label: 'Amount Sold',
                        data: barDataArray,
                        backgroundColor: barBackgroundRGB
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: "Best Selling Items",
                        fontSize: 24
                    },
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            stacked: true,
                            gridLines: {
                                display: false
                            }
                        }],
                        xAxes: [{
                            gridLines: {
                                display: false
                            }
                        }]
                    }
                }
            }

            var pieData = {
                type: 'pie',
                data: {
                    labels: pieItemArray,
                    datasets: [{
                        label: 'Amount Sold',
                        data: pieDataArray,
                        backgroundColor: pieBackgroundRGB
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: "Percent of Individual Items Sold",
                        fontSize: 24
                    },
                    legend: {
                        display: false
                    }
                }
            }

            Chart.defaults.global.animationEasing = "easeOutBounce";

            let myChart = document.getElementById('myChart').getContext('2d');
            let barChart = new Chart(myChart, barData);

            let myChart2 = document.getElementById('myChart2').getContext('2d');
            let pieChart = new Chart(myChart2, pieData);
        },
        failure: function (data) {

        }
    })
})

