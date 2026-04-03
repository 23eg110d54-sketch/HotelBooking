package com.example.demo.service;

import com.example.demo.model.Hotel;
import com.example.demo.model.Room;
import com.example.demo.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private HotelService hotelService;

    public Room addRoomToHotel(Long hotelId, Room room) {
        Hotel hotel = hotelService.getHotelById(hotelId);
        room.setHotel(hotel);
        return roomRepository.save(room);
    }

    public List<Room> getRoomsByHotel(Long hotelId) {
        return roomRepository.findByHotelId(hotelId);
    }

    public List<Room> getAvailableRoomsByHotel(Long hotelId) {
        return roomRepository.findByHotelIdAndIsAvailableTrue(hotelId);
    }
    
    public Room getRoomById(Long roomId) {
        return roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));
    }
    
    public void updateRoomAvailability(Long roomId, boolean isAvailable) {
        Room room = getRoomById(roomId);
        room.setAvailable(isAvailable);
        roomRepository.save(room);
    }
}
