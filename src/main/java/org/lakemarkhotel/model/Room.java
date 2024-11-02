package org.lakemarkhotel.model;

import jakarta.persistence.*;
import lombok.*;
import org.apache.commons.lang.RandomStringUtils;

import java.math.BigDecimal;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;
@Entity
@AllArgsConstructor
@Data
@Getter
@Setter

public class Room {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private String roomType;
    private BigDecimal price;

    @Lob
    private Blob photo;
    private boolean isBooked=false;

    @OneToMany(mappedBy="room",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BookedRoom> bookings;  //this list of variable keeps the history of the room

    public Room() {
        this.bookings = new ArrayList<BookedRoom>();
    }

    public void addBooking(BookedRoom booking) {
        if (bookings == null){
            bookings = new ArrayList<>();
    }
        this.bookings.add(booking);
        booking.setRoom(this);
        isBooked=true;
        String bookingCode= RandomStringUtils.randomNumeric(10);
        booking.setBookingConfirmationCode(bookingCode);

    }
}
