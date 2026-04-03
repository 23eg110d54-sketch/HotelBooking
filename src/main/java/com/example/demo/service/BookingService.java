package com.example.demo.service;

import com.example.demo.model.Booking;
import com.example.demo.model.Room;
import com.example.demo.model.User;
import com.example.demo.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private RoomService roomService;

    public Booking createBooking(Long userId, Long roomId, Booking booking) {
        User user = userService.getUserById(userId);
        Room room = roomService.getRoomById(roomId);

        if (!room.isAvailable()) {
            throw new RuntimeException("Room is not available");
        }

        long days = ChronoUnit.DAYS.between(booking.getCheckInDate(), booking.getCheckOutDate());
        if(days <= 0) {
            throw new RuntimeException("Check-out date must be after check-in date");
        }

        BigDecimal totalPrice = room.getPricePerNight().multiply(BigDecimal.valueOf(days));

        booking.setUser(user);
        booking.setRoom(room);
        booking.setTotalPrice(totalPrice);
        booking.setStatus(Booking.BookingStatus.CONFIRMED);

        Booking savedBooking = bookingRepository.save(booking);

        roomService.updateRoomAvailability(roomId, false);

        return savedBooking;
    }

    public List<Booking> getBookingsByUser(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}
