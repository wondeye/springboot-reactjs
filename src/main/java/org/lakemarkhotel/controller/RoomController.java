package org.lakemarkhotel.controller;

import lombok.RequiredArgsConstructor;
import org.lakemarkhotel.exception.PhotoRetreivalException;
import org.lakemarkhotel.exception.PhotoRetrievalException;
import org.lakemarkhotel.exception.ResourceNotFoundException;
import org.lakemarkhotel.model.BookedRoom;
import org.lakemarkhotel.model.Room;
import org.lakemarkhotel.response.RoomResponse;
import org.lakemarkhotel.service.IBookedRoomService;
import org.lakemarkhotel.service.IRoomService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor  //constructor level injection for iroomservice
@RestController
//@CrossOrigin(origins ="http://localhost:3000")
@RequestMapping("/rooms")

public class RoomController {

     final IRoomService roomService;
      final IBookedRoomService bookedRoomService;
    @PostMapping("/addNewRoom")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<RoomResponse> addNewRoom(@RequestParam("photo") MultipartFile photo,
                                                @RequestParam("roomType") String roomType ,
                                                @RequestParam("roomPrice") BigDecimal roomPrice )
                                                throws SQLException, IOException {

        Room savedRoom = roomService.addNewRoom(photo, roomType, roomPrice);
        RoomResponse response= new RoomResponse(savedRoom.getId(), savedRoom.getRoomType(), savedRoom.getPrice());
        return ResponseEntity.ok(response);
    }
    @GetMapping("/getAllRoomTypes")

    public List<String> getAllRoomTypes() throws SQLException{
        return roomService.getAllRoomTypes();

    }

    @GetMapping("/getAllRooms")
    public ResponseEntity<List<RoomResponse>> getAllRooms() throws SQLException, PhotoRetreivalException {
        List<Room> getRooms = roomService.getAllRooms();
        List<RoomResponse> roomResponses=new ArrayList<>();
        for (Room room : getRooms) {
            byte[] photoBytes=roomService.getPhotoById(room.getId());
            if(photoBytes!=null && photoBytes.length>0) {
                String base64photo= Base64.getEncoder().encodeToString(photoBytes);
                        //encodeBase64String(photoBytes);
                RoomResponse response=getRoomResponse(room);
                response.setPhoto(base64photo);

                roomResponses.add(response);}
        }


        return ResponseEntity.ok(roomResponses);

    }

    @GetMapping("/getSingleRoom/{roomId}")
    public  ResponseEntity<Optional<RoomResponse>> getRoomById(@PathVariable Long roomId)throws SQLException, PhotoRetreivalException {
        Optional<Room> theRoom=roomService.getRoomById(roomId);

        return theRoom.map(room->{
                    RoomResponse response = getRoomResponse(room);
                    return ResponseEntity.ok(Optional.of(response));})
                .orElseThrow(()-> new ResourceNotFoundException("Room not found"));
    }







    @DeleteMapping("/deleteRoom/{roomId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    public ResponseEntity<Void> deleteRoom(@PathVariable("roomId") Long roomId) throws SQLException{
          roomService.deleteRoom(roomId);
          return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PutMapping("/update/{roomId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    public ResponseEntity<RoomResponse> updateRoom(@PathVariable("roomId") Long roomId,
                                               @RequestParam(required = false) String roomType,
                                               @RequestParam(required = false) BigDecimal roomPrice,
                                               @RequestParam(required = false) MultipartFile photo) throws IOException, SQLException, PhotoRetreivalException {

        byte [] photoBytes= photo!=null && !photo.isEmpty() ?
                photo.getBytes() : roomService.getPhotoById(roomId);
        Blob photoBlob=photoBytes!=null && photoBytes.length > 0 ? new SerialBlob(photoBytes) : null;

        Room theRoom= roomService.updateRoom(roomId, roomType, roomPrice, photoBytes);
        theRoom.setPhoto(photoBlob);
        RoomResponse response=getRoomResponse(theRoom);
        return ResponseEntity.ok(response);

}



@GetMapping("/available-rooms")
public ResponseEntity<List<RoomResponse>> getAvailabelRooms(
        @RequestParam("checkInDate") @DateTimeFormat(iso=DateTimeFormat.ISO.DATE) LocalDate checkInDate,
        @RequestParam("checkOutDate")  @DateTimeFormat(iso=DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
        @RequestParam("roomType") String roomType) throws SQLException,
        PhotoRetreivalException {
    List<Room> availableRooms = roomService.getAvailabelRooms(checkInDate, checkOutDate, roomType);
    List<RoomResponse> roomResponses = new ArrayList<>();
    for (Room room : availableRooms) {
        byte[] photoBytes = roomService.getPhotoById(room.getId());
        if (photoBytes != null && photoBytes.length > 0) {
            String base64photo = Base64.getEncoder().encodeToString(photoBytes);
            RoomResponse response = getRoomResponse(room);
            response.setPhoto(base64photo);
            roomResponses.add(response);

        }
    }
        if (roomResponses.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(roomResponses);
        }

}


private RoomResponse getRoomResponse(Room room)  {

        //     List<BookedRoom> bookings=getAllBookingsByRoomId(room.getId());
     /*List<BookingResponse> bookingInfo=bookings.stream()
             .map(booking-> new BookingResponse(booking.getBookingId(),
                     booking.getCheckInDate(),
                     booking.getCheckOutDate(),
                     booking.getBookingConfirmationCode())).toList(); */

        byte[] photoBytes = null;
        Blob photoblob = room.getPhoto();
        if(photoblob!=null) {
            try {
                photoBytes = photoblob.getBytes(1, (int) photoblob.length());
            }
            catch (SQLException e) {
                throw new PhotoRetrievalException("Error retrieving photo");            }
        }
        return  new RoomResponse(room.getId(), room.getRoomType(),
                room.getPrice(), photoBytes, room.isBooked());
    }}

   // private List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
      //  return bookedRoomService.getAllBookingsByRoomId(roomId);
   // }




