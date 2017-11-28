$(document).ready(function () {
    $.ajax({
        url: '/chart-data',
        type: 'GET',
        success: function (data) {
            console.log(url.value);
        },
        failure: function (data) {

        }
    })
})

