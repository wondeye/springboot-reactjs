package org.lakemarkhotel.repository;

import org.lakemarkhotel.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository

public interface RoomRepository extends JpaRepository<Room, Long> {
    public Room findById(long id);
@Query("SELECT DISTINCT r.roomType FROM Room  r")
    List<String> findDistinctRoomTypes();






@Query(" SELECT r FROM Room r " +
        " WHERE r.roomType LIKE %:roomType%" +
        " AND r.Id NOT IN (" +
        " SELECT br.room.Id FROM BookedRoom br " +
        " WHERE ((br.checkInDate <= :checkOutDate) AND (br.checkOutDate >= :checkInDate))" +
        " )")
    List<Room> findAvailableRoomsByDateAndType(LocalDate checkInDate,
                                               LocalDate checkOutDate,
                                               String roomType);
}
