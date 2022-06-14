var ticketBooked = [];
var book = function (movieName, showTime, seatNumber, bookedDateTime) {
    var isSeatBooked = 0;
    if (ticketBooked.length <= 0) {
        var ticket = new Ticket(movieName, showTime, seatNumber, bookedDateTime);
        ticketBooked.push(ticket);
        createTicketCard(movieName, showTime, seatNumber, bookedDateTime);
    }
    else {
        for (var i = 0; i < ticketBooked.length; i++) {
            var tk = ticketBooked[i];
            if (tk.seatNumber == seatNumber) {
                isSeatBooked = 1;
            }
        }
        if (isSeatBooked == 0) {
            var ticket = new Ticket(movieName, showTime, seatNumber, bookedDateTime);
            ticketBooked.push(ticket);
            createTicketCard(movieName, showTime, seatNumber, bookedDateTime);
        }
        else {
            throw new Error("The seat is already booked!");
        }
    }
};
var findTicketIndex = function (movieName, showTime, seatNumber) {
    var index = -1;
    for (var i = 0; i < ticketBooked.length; i++) {
        var tk = ticketBooked[i];
        if (tk.movieName == movieName &&
            tk.showTime == showTime &&
            tk.seatNumber == seatNumber) {
            index = i;
            break;
        }
    }
    return index;
};
var remove = function (movieName, showTime, seatNumber) {
    var index = findTicketIndex(movieName, showTime, seatNumber);
    if (index >= 0) {
        ticketBooked.splice(index, 1);
        var allCard = document.querySelectorAll(".ticket-card");
        for (var i = 0; i < allCard.length; i++) {
            var card = allCard[i];
            if (card.getAttribute("data-name") == movieName &&
                card.getAttribute("data-time") == showTime.toDateString() &&
                card.getAttribute("data-seat") == seatNumber) {
                cardContainer.removeChild(card);
            }
        }
    }
    else {
        throw new Error("The ticket does not exist!");
    }
};
var heading = document.createElement("h1");
heading.textContent = "Ticket Booking";
document.body.appendChild(heading);
var form = document.createElement("div");
var movieLabel = document.createElement("label");
movieLabel.textContent = "Movie name";
var inputMovie = document.createElement("input");
inputMovie.type = "text";
inputMovie.required = true;
var showTimeLabel = document.createElement("label");
showTimeLabel.textContent = "Show time";
var inputShowTime = document.createElement("input");
inputShowTime.type = "date";
inputShowTime.required = true;
var seatLabel = document.createElement("label");
seatLabel.textContent = "Seat number";
var inputSeat = document.createElement("input");
inputSeat.type = "text";
inputSeat.required = true;
var bookingBtn = document.createElement("button");
// bookingBtn.type = "submit";
bookingBtn.textContent = "Book";
bookingBtn.addEventListener("click", function () {
    var movie = inputMovie.value;
    var show = new Date(inputShowTime.value);
    var seat = inputSeat.value;
    var bookTime = new Date();
    book(movie, show, seat, bookTime);
});
form.appendChild(movieLabel);
form.appendChild(inputMovie);
form.appendChild(showTimeLabel);
form.appendChild(inputShowTime);
form.appendChild(seatLabel);
form.appendChild(inputSeat);
form.appendChild(bookingBtn);
document.body.appendChild(form);
var h2 = document.createElement("h2");
h2.textContent = "List ticket";
var cardContainer = document.createElement("div");
document.body.appendChild(h2);
document.body.appendChild(cardContainer);
var createTicketCard = function (movieName, showTime, seatNumber, bookedDateTime) {
    var card = document.createElement("div");
    card.classList.add("ticket-card");
    card.dataset.name = movieName;
    card.dataset.time = showTime.toDateString();
    card.dataset.seat = seatNumber;
    var mName = document.createElement("p");
    mName.textContent = "Movie name: " + movieName;
    var sTime = document.createElement("p");
    sTime.textContent = "Show time: " + showTime.toDateString();
    var sNum = document.createElement("p");
    sNum.textContent = "Seat number: " + seatNumber;
    var bDate = document.createElement("p");
    bDate.textContent = "Booked date time: " + bookedDateTime.toDateString();
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
        remove(movieName, showTime, seatNumber);
    });
    card.appendChild(mName);
    card.appendChild(sTime);
    card.appendChild(sNum);
    card.appendChild(bDate);
    card.appendChild(deleteBtn);
    cardContainer.appendChild(card);
};
