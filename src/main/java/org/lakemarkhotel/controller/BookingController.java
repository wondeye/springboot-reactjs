package org.lakemarkhotel.controller;

import lombok.RequiredArgsConstructor;
import org.lakemarkhotel.exception.InvalidBookingRequestException;
import org.lakemarkhotel.exception.ResourceNotFoundException;
import org.lakemarkhotel.model.BookedRoom;
import org.lakemarkhotel.model.Room;
import org.lakemarkhotel.response.BookingResponse;
import org.lakemarkhotel.response.RoomResponse;
import org.lakemarkhotel.service.IBookingService;
import org.lakemarkhotel.service.IRoomService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@RequiredArgsConstructor
@RestController
@CrossOrigin(origins ="http://localhost:3000")
@RequestMapping("/bookings")
public class BookingController {
    private final IRoomService roomService;
    private  final IBookingService bookingService;
    @GetMapping("/all-bookings")
    public ResponseEntity<List<BookingResponse>> getAllBookings(){
        List<BookedRoom> bookings = bookingService.getAllBookings();
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (BookedRoom booking : bookings) {
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }


    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?>getBookingByConfirmationCode(@PathVariable String confirmationCode){
        try {
            BookedRoom booking=bookingService.findByBookingConfirmationCode(confirmationCode);
BookingResponse bookingResponse=getBookingResponse(booking);
        return ResponseEntity.ok(bookingResponse);}
        catch (ResourceNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
@PostMapping("/room/{roomId}/booking")
    public  ResponseEntity<?> saveBooking(@PathVariable Long roomId, @RequestBody BookedRoom bookingRequest){
        try {
            String confirmationCode=bookingService.saveBooking(roomId, bookingRequest);
                    return ResponseEntity.ok("Room booked successfully, Your booking confirmation code is :" +  confirmationCode);
        }catch (InvalidBookingRequestException e)
        {
        return  ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @DeleteMapping("/booking/{bookingId}/delete")
    public void cancelBooking(@PathVariable Long bookingId)
    {
        bookingService.cancelBooking(bookingId);
    }

    @GetMapping("/user/{email}/bookings")
    public ResponseEntity<List<BookingResponse>> getBookingsByUserEmail(@PathVariable String email){
        List<BookedRoom> bookings = bookingService.getBookingsByUserEmail(email);
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for(BookedRoom booking: bookings){
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }



    @PostMapping ("/room/{roomId}/bookingss")
    public ResponseEntity<?>bookRoom(@PathVariable  String roomId){
        String message="Yaa12345adsfh";
        return ResponseEntity.ok(message);
    }


    private BookingResponse getBookingResponse(BookedRoom booking) {
     Room theRoom=roomService.getRoomById(booking.getRoom().getId()).get();
        RoomResponse room= new RoomResponse(
                theRoom.getId(),
                theRoom.getRoomType(),
                theRoom.getPrice());
        return new BookingResponse(booking.getBookingId(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.getGuestFullName(),
                booking.getGuestEmail(),
                booking.getNumberOfAdults(),
                booking.getNumberOfChildren(),
                booking.getTotalNumberOfGuests(),
                booking.getBookingConfirmationCode(),
                room);
    }

}
