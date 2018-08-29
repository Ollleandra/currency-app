$( document ).ready(function() {
    $('select').niceSelect();

    // App to get Currency

    let $bitcoin = $("#bitcoin");
    let $bitcoinPrice = $bitcoin.find(".price");
    let $bitcoinHour = $bitcoin.find(".hour");
    let $bitcoinDay = $bitcoin.find(".day");
    let $bitcoinWeek = $bitcoin.find(".week");
    let $bitcoinMonth = $bitcoin.find(".month");
    let $bitcoinCheckbox = $("#bitcoin-checkbox");


    let $etherium = $("#etherium");
    let $litecoin = $("#litecoin");

    var bitcoinResults;
    var currencySign;

    var bitcoinResultsUSD = $.ajax({
        url: 'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD',
        dataType: 'json',
        async: false,
        success: function (results) {
            let bitPrice = results.ask;
            let bitValChanges = results.changes.price;
            let hour = bitValChanges.hour;
            let day = bitValChanges.day;
            let week = bitValChanges.week;
            let month = bitValChanges.month;
            $bitcoinPrice.html("$" + bitPrice);

            $bitcoinHour.html(hour + "$").addClass(hour>0 ? "txt-green" : "txt-red");
            $bitcoinDay.html(day+ "$").addClass(day>0 ? "txt-green" : "txt-red");
            $bitcoinWeek.html(week + "$").addClass(week>0 ? "txt-green" : "txt-red");
            $bitcoinMonth.html(month + "$").addClass(month>0 ? "txt-green" : "txt-red");
        }
    }).responseJSON;

    bitcoinResults = bitcoinResultsUSD;
    currencySign = "$";

    var bitcoinResultsEur = $.ajax({
        url: 'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCEUR',
        dataType: 'json',
        async: false,
        success: function (results) {
        }
    }).responseJSON;

    $bitcoinCheckbox.change(function(){
        if($(this).is(":checked")) {
            console.log(bitcoinResults.changes);
            $bitcoinHour.html(bitcoinResults.changes.percent.hour + "%");
            $bitcoinDay.html(bitcoinResults.changes.percent.day + "%");
            $bitcoinWeek.html(bitcoinResults.changes.percent.week + "%");
            $bitcoinMonth.html(bitcoinResults.changes.percent.month + "%");
        }
        else{
            setSurrency();
        }
    });

    $(document).on("click", ".list li", function(){
        let currency = ($(this).attr("data-value"));

        if (currency === "eur") {
            currencySign = "€";
            bitcoinResults = bitcoinResultsEur;
            setSurrency();
        }
        if (currency === "usd") {
            currencySign = "$";
            bitcoinResults = bitcoinResultsUSD;
            setSurrency();
        }
    });

    function setSurrency(){
        $bitcoinPrice.html(currencySign + bitcoinResults.ask);
        $bitcoinHour.html(bitcoinResults.changes.price.hour + currencySign);
        $bitcoinDay.html(bitcoinResults.changes.price.day + currencySign);
        $bitcoinWeek.html(bitcoinResults.changes.price.week + currencySign);
        $bitcoinMonth.html(bitcoinResults.changes.price.month + currencySign);
    };
});