class Ticket {
    movieName: string;
    showTime: Date;
    seatNumber: string;
    bookedDateTime: Date;

    constructor(movieName: string, showTime: Date, seatNumber: string, bookedDateTime: Date) {
        this.movieName = movieName;
        this.showTime = showTime;
        this.seatNumber = seatNumber;
        this.bookedDateTime = bookedDateTime;
    }
}

// let ticketBooked: (Ticket)[];
