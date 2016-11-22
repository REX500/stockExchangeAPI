var apiKey = 'f145e7744258176e27d5dde05027b5f9';

var apiLink = "http://52.57.228.6/man2API/php/BankPhp.php";

$(document).ready(function(){

    setInterval(getAccInfo, 10000);
    setInterval(seeOffers, 15000);
    seeExchangeRate();
    sellStocks();
    buyStocks();
});

var button = $("#expand");
$("#expand").click(function(){
  $("#offers").slideToggle('slow');

  if(button.text()=="See Offers"){
    button.text("Hide Offers");
  }
  else{
    button.text("See Offers");
  }
});

function buyStocks(){
  // ajax for buy function
    $("#buyButton").click(function(){
      var id = $("#buyField").val();
      if(id!=0){
        console.log("Id is not zero!");
        console.log("This is the ID:"+id);
        $.ajax({
          'url': apiLink,
          'type' : 'GET',
          'data':{
            'what':'buy',
            'offer': id,
            'apikey' : apiKey
          },
          'success':function(dataIn){
            console.log(dataIn);
            var out = JSON.parse(dataIn);
            console.log(out);
            // all the fields retrieved from
            var id = out.data.id;
            console.log(id);
            var oc = out.data.offerCurrency;
            var bc = out.data.buyCurrency;
            var amount = out.data.amount;
            var ot = out.data.offerTime;
            var bt = out.data.buyTime;

            var total = "Buy ID:"+id+" Offer:"+oc+" Buy:"+bc+" Amount:"+amount+" Offer Time:"+ot+" Buy Time:"+bt;
            $("#buyGood").append(total);
          }
        });
      }
      else{
        console.log("You need to enter a valid value");
      }
    });
}
function sellStocks(){
  $("#sellButton").click(function(){
    // ajax to sell stacks
    var money = $("#sellField").val();
    if(money!=0){
      $.ajax({
        'url': apiLink,
        'type' : 'GET',
        'data':{
          'what':'sell',
          'amount': money,
          'apikey' : apiKey
        },
        'success':function(dataIn){
          console.log(dataIn);
          var output = JSON.parse(dataIn);
          console.log(output);
          var id = output.data.id;
          var amount = output.data.amount;
          var currency = output.data.currency;
          var time = output.data.since;

          var total = "Offer ID: "+id+" Amount:"+amount+" Currency:"+currency+" Time:"+time;
          $("#sellGood").append(total);
        }
      });
    }
    else{
      console.log("Enter a valid value!");
    }
  });
}
function seeOffers(){
  // ajax code for the offer view
  $.ajax({
    'url': apiLink,
    'type' : 'GET',
    'data':{
      'what':'offers',
      'apikey' : apiKey
    },
    'success':function(dataIn){
      //console.log(dataIn);
      var out = JSON.parse(dataIn);
      //console.log(out);
      for(let i = 0 ; i < out.data.length; i++){
        var id = out.data[i].id;
        var amount = out.data[i].amount;
        var currency = out.data[i].currency;
        var since = out.data[i].since;
        $("#table ").append("<tr>"+ "<td>" +id+"</td>"+"<td>"+amount+"</td>"+"<td>"+currency+"</td>"+"<td>"+since+"</td>"+"</tr>");
      }
    }
  });
}
function getAccInfo(){
  // ajax call for account info bellow
  $.ajax({
  'url' : apiLink,
  // here we specify the type of the req we want to use
  'type':'GET',
  'data':{
      'apikey': apiKey,
      'what':'account_info'
    },
  'success':function(dataIn){
    //console.log(dataIn);
    var niceOutput = JSON.parse(dataIn);
    //console.log(niceOutput);

    var amount = niceOutput.data[0].amount;
    var name = niceOutput.data[0].currency;

    /*$('#userName').append(name);
    $('#balance').append(amount);*/

    $('#userName').html(name);
    $('#balance').html(amount);
  }
});
}
function seeExchangeRate(){
  // ajax call for the ability to see the exchange rate
  $("#checkButton").click(function(){
    var from = $("#fromInput").val();
    var to = $("#toInput").val();
    if(from!=0 && to!=0){
      $.ajax({
        'url': apiLink,
        'type' : 'GET',
        'data':{
          'what':'exchange_rate',
          'apikey' : apiKey,
          'from': from,
          'to':to
        },
        'success':function(dataIn){
          var out = JSON.parse(dataIn);
          console.log(out);
          var from = out.data.from;
          var to = out.data.to;
          var amount = out.data.amount;
          $("#exchange_rateParagraph").append("From:"+from+" To:"+to+" Amount: "+amount);
        }
      });
    }
    else {
      console.log("Enter a valid value!");
    }
  });
}
