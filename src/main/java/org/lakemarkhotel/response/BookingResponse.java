package org.lakemarkhotel.response;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.lakemarkhotel.model.Room;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BookingResponse {

    private Long id;

    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String guestFullName;
    private String guestEmail;

    private int numberOfAdults;
    private int numberOfChildren;
    private int totalNumberOfGuests;
    private String bookingConfirmationCode;

    private RoomResponse room;

    public BookingResponse(Long id, LocalDate checkInDate, LocalDate checkOutDate,
                           String bookingConfirmationCode) {
        this.id = id;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.bookingConfirmationCode = bookingConfirmationCode;
    }
}
