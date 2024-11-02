package org.lakemarkhotel.service;

import org.lakemarkhotel.model.BookedRoom;

import java.util.List;

public interface IBookedRoomService {


    List<BookedRoom> getAllBookingsByRoomId(Long id);
}
