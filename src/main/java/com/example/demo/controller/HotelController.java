package com.example.demo.controller;

import com.example.demo.model.Hotel;
import com.example.demo.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @PostMapping
    public ResponseEntity<Hotel> addHotel(@RequestBody Hotel hotel) {
        Hotel savedHotel = hotelService.addHotel(hotel);
        return ResponseEntity.ok(savedHotel);
    }

    @GetMapping
    public ResponseEntity<List<Hotel>> getAllHotels() {
        return ResponseEntity.ok(hotelService.getAllHotels());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hotel> getHotelById(@PathVariable Long id) {
        try {
            Hotel hotel = hotelService.getHotelById(id);
            return ResponseEntity.ok(hotel);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
