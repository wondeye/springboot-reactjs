package org.lakemarkhotel.service;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.lakemarkhotel.model.BookedRoom;
import org.lakemarkhotel.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookedRoomServiceImpl implements IBookedRoomService {
    private final RoomRepository roomRepository;


    @Override
    public List<BookedRoom> getAllBookingsByRoomId(Long id) {
        return List.of();
    }
}
