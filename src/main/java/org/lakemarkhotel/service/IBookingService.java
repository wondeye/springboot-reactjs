package org.lakemarkhotel.service;

import org.lakemarkhotel.model.BookedRoom;
import org.lakemarkhotel.response.BookingResponse;

import java.util.List;

public interface IBookingService {
    List<BookedRoom> getAllBookings();

    BookedRoom findByBookingConfirmationCode(String confirmationCode);


    String saveBooking(Long roomId, BookedRoom bookingRequest);

    void cancelBooking(Long bookingId);
    List<BookedRoom> getAllBookingsByRoomId(Long id);

    List<BookedRoom> getBookingsByUserEmail(String email);
}
