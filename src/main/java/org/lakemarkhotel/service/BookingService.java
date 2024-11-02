package org.lakemarkhotel.service;

import lombok.RequiredArgsConstructor;
import org.lakemarkhotel.exception.InvalidBookingRequestException;
import org.lakemarkhotel.exception.ResourceNotFoundException;
import org.lakemarkhotel.model.BookedRoom;
import org.lakemarkhotel.model.Room;
import org.lakemarkhotel.repository.BookingRepository;
import org.lakemarkhotel.response.BookingResponse;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class BookingService implements IBookingService{
    private final BookingRepository bookingRepository;
    private final IRoomService roomService;
    @Override
    public List<BookedRoom> getAllBookings() {
        return bookingRepository.findAll();
    }


    @Override
    public BookedRoom findByBookingConfirmationCode(String confirmationCode) {
        return bookingRepository.findByBookingConfirmationCode(confirmationCode)
                .orElseThrow(() -> new ResourceNotFoundException("No booking found with booking code : " + confirmationCode));
    }

    @Override
    public String saveBooking(Long roomId, BookedRoom bookingRequest) {
        if(bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())){
            throw new InvalidBookingRequestException("Checkout date should be before checkIn date");
        }
        Room room = roomService.getRoomById(roomId).get();
        List<BookedRoom> existingBookings=room.getBookings();
        boolean roomIsAvailable = roomIsAvailable(bookingRequest, existingBookings);
       if(roomIsAvailable){
           room.addBooking(bookingRequest);
           bookingRepository.save(bookingRequest);
       }
       else{
           throw new InvalidBookingRequestException("Sorry, This room is not available for the selected dates");
       }

       return bookingRequest.getBookingConfirmationCode();
    }



    @Override
    public void cancelBooking(Long bookingId) {
bookingRepository.deleteById(bookingId);
    }
    @Override
    public List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return bookingRepository.findByRoomId(roomId);
    }


    @Override
    public List<BookedRoom> getBookingsByUserEmail(String email) {
        return bookingRepository.findByGuestEmail(email);
    }



    private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings) {
        return existingBookings.stream()
                .noneMatch(existingBooking ->
                        bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                                || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
                                || (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                                && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))
                );
    }
}
