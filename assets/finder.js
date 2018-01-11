
    /*Global Variables
    ==============================================================*/
    var topics = ['cooking', 'physical', 'meme', 'finals'];
    var stillImgUrl = '';
    var animateImgUrl = '';
    var gifState = '';
    var stillUrl = '';
    var animateUrl = '';
    //Functions

    var createBtn = function() {
        //removes all elements within the btn-section
        $('#btn-section').empty();
        //Create buttons based on elements in array
        for (var i = 0; i < topics.length; i++) {
            //Creates new buttons
            var newBtn = $('<button>');
            //Give button an attribute // COME BACK TO THIS*********
            newBtn.attr('data-name', topics[i]);
            //Add class to button
            newBtn.attr('class', 'gif');
            //Give button name that reflect array
            newBtn.text(topics[i]);
            //Add button to DOM
            $('#btn-section').append(newBtn);
        }
    }

//When submit button is clicked
$('#submit-btn').on('click', function(event) {
    submit();
});

//When Enter is pressed.....
$(".search").keydown(function(event){
    if(event.keyCode == 13){
        console.log("working");
        submit();
        $('.search').val("");
        return false;
    }
});


    var submit = function() {
            event.preventDefault();
            //Get input text value
            var inputVal = $('#userInput').val();
            //push user input to array
            topics.push(inputVal);
            //Create new buttons
            createBtn();
            //Testing
            console.log(inputVal);
            console.log(topics);
    }
    var displayGif = function() {
        //Gets the value of the button that is clicked
        var btnVal = $(this).data('name');
        //Api URL and key
        var apiKey = 'QFzpod3mdsLrVVZ8CcbYlhFTZoW9Dh1A';
        var apiUrl = 'https://api.giphy.com/v1/gifs/search?q=' + btnVal + '&api_key=' + apiKey;
        $.ajax({
            url: apiUrl,
            method: 'GET'
        }).done(function(response) {
            //removes images when new btn is clicked
            $('.gifSection').empty();
            let newH1 = $('<h1>');
                newH1.html(btnVal);
                newH1.attr('class', 'text-center');
            $('.gifSection').append(newH1);

            for (var i = 0; i < 20; i++) {
                //Still & Animated Images
                stillImgUrl = response['data'][i]['images']['fixed_height_still']['url'];
                animateImgUrl = response['data'][i]['images']['fixed_height']['url'];
                //rating
                var rating = response['data'][i]['rating'];
                //Assign image element to newImg variable
                var newDiv = $('<div>'); //********
                var newP = $('<p>'); //*********
                var newImg = $('<img>');
                //Give img element stillImgUrl, animated  & src attribute
                newImg.attr('data-still', stillImgUrl);
                newImg.attr('data-animate', animateImgUrl);
                newImg.attr('src', stillImgUrl);
                newImg.attr('data-type', 'still');
                newImg.addClass('gifImage');
                //Give p element the rating texts
                newP.html('Giphy Rating: ' + rating);
                $(newP).appendTo(newDiv)
                $(newImg).appendTo(newDiv);
                $('.gifSection').append(newDiv); //**********
            }
        });
    }
    var gifAnimate = function() {
        //sets gifState to either still or animate
        gifState = $(this).data('type');
        stillUrl = $(this).data('still');
        animateUrl = $(this).data('animate');
        if (gifState === 'still') {
            //Changes the gif to an animated image by switching the URL
            $(this).attr('src', animateUrl);
            //Switch the data-type to animate
            $(this).data('type', 'animate');
            //Testing
            console.log(gifState);
        } else if (gifState == 'animate') {
            //Change src to still
            $(this).attr('src', stillUrl);
            //Switch the data-type to still
            $(this).data('type', 'still');
            //Testing
            console.log(gifState);
        }
    }

    /*Main
    ==============================================================*/
    createBtn();
    // submit();
    $(document).on('click', '.gif', displayGif);
    $(document).on('click', '.gifImage', gifAnimate);
