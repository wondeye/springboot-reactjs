package org.lakemarkhotel.response;

import jakarta.persistence.Lob;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.lakemarkhotel.model.BookedRoom;

import java.math.BigDecimal;
import java.sql.Blob;
import java.util.List;
@Data
@NoArgsConstructor

public class RoomResponse {

    private Long Id;
    private String roomType;
    private BigDecimal price;
    private String photo;
    private boolean isBooked=false;


    private List<BookingResponse> bookings;  //this list of variable keeps the history of the room

    public RoomResponse(Long id, String roomType, BigDecimal price) {
        Id = id;
        this.roomType = roomType;
        this.price = price;
    }

    public RoomResponse(Long id, String roomType, BigDecimal price,
                        byte[] photoBytes, boolean isBooked) {
        Id = id;
        this.roomType = roomType;
        this.price = price;
        this.photo = photoBytes!=null? Base64.encodeBase64String(photoBytes) :null;
        this.isBooked = isBooked;
        //this.bookings = bookings;
    }

    public RoomResponse(String roomType) {
    }
}
