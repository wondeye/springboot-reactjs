package org.lakemarkhotel.service;

import lombok.RequiredArgsConstructor;
import org.lakemarkhotel.exception.InternalServerException;
import org.lakemarkhotel.exception.ResourceNotFoundException;
import org.lakemarkhotel.model.BookedRoom;
import org.lakemarkhotel.model.Room;
import org.lakemarkhotel.repository.RoomRepository;
import org.lakemarkhotel.response.RoomResponse;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements IRoomService {
    private final RoomRepository repository;
    @Override
    public Room addNewRoom(MultipartFile file, String roomType, BigDecimal roomPrice) throws IOException,
            SQLException {

        Room room = new Room();
        room.setRoomType(roomType);
        room.setPrice(roomPrice);
    if (!file.isEmpty()) {
         byte[] photoBytes = file.getBytes();
        Blob photoblob=new SerialBlob(photoBytes);
        room.setPhoto(photoblob);

    }
    return repository.save(room);
}

    @Override
    public List<Room> getAllRooms() {
        return repository.findAll();
    }

    @Override
    public byte[] getPhotoById(Long roomId) throws SQLException {
        Optional<Room> theRoom=repository.findById(roomId);
        if (theRoom.isEmpty()) {
            throw new ResourceNotFoundException("Sorry, Room not found");
        }
        Blob photoBlob = theRoom.get().getPhoto();
        if(photoBlob!=null) {
            return photoBlob.getBytes(1,(int) photoBlob.length());
        }
        return new byte[0];
    }

    @Override
    public List<BookedRoom> getBookedRoomById(Long id) {
        return List.of();
    }

    @Override
    public List<String> getAllRoomTypes() {
        return repository.findDistinctRoomTypes();
    }

    @Override
    public void deleteRoom(Long roomId) {
        Optional<Room> theRoom=repository.findById(roomId);
        if (theRoom.isPresent()) {
        repository.deleteById(roomId);}
    }



    @Override
    public Room updateRoom(Long roomId, String roomType, BigDecimal roomPrice, byte[] photoBytes) {

        Room room=repository.findById(roomId).
                orElseThrow(()->new ResourceNotFoundException("Sorry, Room not found"));
        if(roomType!=null)room.setRoomType(roomType);
        if(roomPrice!=null)room.setPrice(roomPrice);
        if(photoBytes!=null && photoBytes.length >0)
        {
            try {
                room.setPhoto(new SerialBlob(photoBytes));
                }
            catch (SQLException exception){
                throw new InternalServerException("Error Updating room");
            }
        }
        return repository.save(room);
    }

    @Override
    public Optional<Room> getRoomById(Long roomId) {
        return Optional.of(repository.findById(roomId).get());
    }

    @Override
    public List<Room> getAvailabelRooms(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
        return repository.findAvailableRoomsByDateAndType(checkInDate,
                checkOutDate, roomType);
    }
}
