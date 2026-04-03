package com.example.demo.controller;

import com.example.demo.model.Room;
import com.example.demo.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @PostMapping("/hotel/{hotelId}")
    public ResponseEntity<Room> addRoom(@PathVariable Long hotelId, @RequestBody Room room) {
        try {
            Room savedRoom = roomService.addRoomToHotel(hotelId, room);
            return ResponseEntity.ok(savedRoom);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/hotel/{hotelId}")
    public ResponseEntity<List<Room>> getRoomsByHotel(@PathVariable Long hotelId) {
        return ResponseEntity.ok(roomService.getRoomsByHotel(hotelId));
    }

    @GetMapping("/hotel/{hotelId}/available")
    public ResponseEntity<List<Room>> getAvailableRoomsByHotel(@PathVariable Long hotelId) {
        return ResponseEntity.ok(roomService.getAvailableRoomsByHotel(hotelId));
    }
}
