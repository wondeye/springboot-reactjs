package org.lakemarkhotel.model;

import jakarta.persistence.*;
import lombok.*;
import org.lakemarkhotel.model.Room;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class BookedRoom {
    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )

    private Long bookingId;
    @Column(name = "check_In")
    private LocalDate checkInDate;
    @Column(name = "check_Out")

    private LocalDate checkOutDate;
    @Column(name = "guest_FullName")

    private String guestFullName;
    @Column(name = "guest_Email")
    private String guestEmail;
    @Column(name = "adults")

    private int numberOfAdults;
    @Column(name = "children")

    private int numberOfChildren;
    @Column(name = "total_Guest")

    private int totalNumberOfGuests;

    @Column(name = "confirmation_code")
    private String bookingConfirmationCode;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_Id")

    private Room room;


    public void calculateNumberOfGuests() {
        this.totalNumberOfGuests = this.numberOfAdults + this.numberOfChildren;
    }

    public void setNumberOfChildren(int numberOfChildren) {
        this.numberOfChildren = numberOfChildren;
        calculateNumberOfGuests();
    }

    public void setNumberOfAdults(int numberOfAdults) {
        this.numberOfAdults = numberOfAdults;
        calculateNumberOfGuests();
    }

    public void setBookingConfirmationCode(String bookingConfirmationCode) {
        this.bookingConfirmationCode = bookingConfirmationCode;
    }

}
