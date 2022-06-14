let ticketBooked: {
  movieName: string;
  showTime: Date;
  seatNumber: string;
  bookedDateTime: Date;
}[] = [];
let book: (
  movieName: string,
  showTime: Date,
  seatNumber: string,
  bookedDateTime: Date
) => void = function (
  movieName: string,
  showTime: Date,
  seatNumber: string,
  bookedDateTime: Date
) {
  let isSeatBooked = 0;
  if (ticketBooked.length <= 0) {
    let ticket = new Ticket(movieName, showTime, seatNumber, bookedDateTime);
    ticketBooked.push(ticket);
    createTicketCard(movieName, showTime, seatNumber, bookedDateTime);
  } else {
    for (let i = 0; i < ticketBooked.length; i++) {
      const tk = ticketBooked[i];
      if (tk.seatNumber == seatNumber) {
        isSeatBooked = 1;
      }
    }
    if (isSeatBooked == 0) {
      let ticket = new Ticket(movieName, showTime, seatNumber, bookedDateTime);
      ticketBooked.push(ticket);
      createTicketCard(movieName, showTime, seatNumber, bookedDateTime);
    } else {
      throw new Error("The seat is already booked!");
    }
  }
};
let findTicketIndex: (
  movieName: string,
  showTime: Date,
  seatNumber: string
) => number = function (movieName: string, showTime: Date, seatNumber: string) {
  let index: number = -1;
  for (let i = 0; i < ticketBooked.length; i++) {
    const tk = ticketBooked[i];
    if (
      tk.movieName == movieName &&
      tk.showTime == showTime &&
      tk.seatNumber == seatNumber
    ) {
      index = i;
      break;
    }
  }
  return index;
};

let remove: (movieName: string, showTime: Date, seatNumber: string) => void =
  function (movieName: string, showTime: Date, seatNumber: string) {
    let index = findTicketIndex(movieName, showTime, seatNumber);
    if (index >= 0) {
      ticketBooked.splice(index, 1);
      let allCard = document.querySelectorAll(".ticket-card");
      for (let i = 0; i < allCard.length; i++) {
        const card = allCard[i];
        if (
          card.getAttribute("data-name") == movieName &&
          card.getAttribute("data-time") == showTime.toDateString() &&
          card.getAttribute("data-seat") == seatNumber
        ) {
          cardContainer.removeChild(card);
        }
      }
    } else {
      throw new Error("The ticket does not exist!");
    }
  };

let heading = document.createElement("h1");
heading.textContent = "Ticket Booking";
document.body.appendChild(heading);
let form = document.createElement("div");
let movieLabel = document.createElement("label");
movieLabel.textContent = "Movie name";
let inputMovie = document.createElement("input");
inputMovie.type = "text";
inputMovie.required = true;
let showTimeLabel = document.createElement("label");
showTimeLabel.textContent = "Show time";
let inputShowTime = document.createElement("input");
inputShowTime.type = "date";
inputShowTime.required = true;
let seatLabel = document.createElement("label");
seatLabel.textContent = "Seat number";
let inputSeat = document.createElement("input");
inputSeat.type = "text";
inputSeat.required = true;
let bookingBtn = document.createElement("button");
// bookingBtn.type = "submit";
bookingBtn.textContent = "Book";
bookingBtn.addEventListener("click", () => {
  let movie: string = inputMovie.value;
  let show: Date = new Date(inputShowTime.value);
  let seat: string = inputSeat.value;
  let bookTime: Date = new Date();
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

let h2 = document.createElement("h2");
h2.textContent = "List ticket";
let cardContainer = document.createElement("div");
document.body.appendChild(h2);
document.body.appendChild(cardContainer);

let createTicketCard: (
  movieName: string,
  showTime: Date,
  seatNumber: string,
  bookedDateTime: Date
) => void = function (
  movieName: string,
  showTime: Date,
  seatNumber: string,
  bookedDateTime: Date
) {
  let card = document.createElement("div");
  card.classList.add("ticket-card");
  card.dataset.name = movieName;
  card.dataset.time = showTime.toDateString();
  card.dataset.seat = seatNumber;
  let mName = document.createElement("p");
  mName.textContent = "Movie name: " + movieName;
  let sTime = document.createElement("p");
  sTime.textContent = "Show time: " + showTime.toDateString();
  let sNum = document.createElement("p");
  sNum.textContent = "Seat number: " + seatNumber;
  let bDate = document.createElement("p");
  bDate.textContent = "Booked date time: " + bookedDateTime.toDateString();
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    remove(movieName, showTime, seatNumber);
  });
  card.appendChild(mName);
  card.appendChild(sTime);
  card.appendChild(sNum);
  card.appendChild(bDate);
  card.appendChild(deleteBtn);
  cardContainer.appendChild(card);
};
