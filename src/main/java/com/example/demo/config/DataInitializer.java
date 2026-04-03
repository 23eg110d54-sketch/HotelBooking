package com.example.demo.config;

import com.example.demo.model.Hotel;
import com.example.demo.model.Room;
import com.example.demo.model.User;
import com.example.demo.model.Role;
import com.example.demo.repository.HotelRepository;
import com.example.demo.repository.RoomRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.Arrays;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(HotelRepository hotelRepository, 
                                     RoomRepository roomRepository,
                                     UserRepository userRepository) {
        return args -> {
            // ── Pre-populate Admin & Customer ──
            if (userRepository.count() == 0) {
                User admin = new User();
                admin.setName("Admin User");
                admin.setEmail("admin@hotel.com");
                admin.setPassword("admin123");
                admin.setRole(Role.ADMIN);
                userRepository.save(admin);

                User customer = new User();
                customer.setName("John Doe");
                customer.setEmail("john@email.com");
                customer.setPassword("pass123");
                customer.setRole(Role.CUSTOMER);
                userRepository.save(customer);
            }

                // ── Pre-populate Famous Hyderabad Hotels ──
            if (hotelRepository.count() == 0) {
                // 5-Star Hotels
                Hotel taj = hotelRepository.save(createHotel("Taj Falaknuma Palace", "Engine Bowli, Hyderabad", 
                    "Experience royalty in this restored 19th-century palace hotel overlooking the city."));
                Hotel itc = hotelRepository.save(createHotel("ITC Kohenur", "HITEC City, Hyderabad", 
                    "A luxury collection hotel inspired by the Koh-I-Noor diamond, overlooking the Durgam Cheruvu lake."));
                Hotel hyatt = hotelRepository.save(createHotel("Park Hyatt Hyderabad", "Banjara Hills, Hyderabad", 
                    "Exquisite luxury hotel offering personalized service and elegant design in the heart of the city."));
                Hotel novotel = hotelRepository.save(createHotel("Novotel Hyderabad Convention Centre", "Kondapur, Hyderabad", 
                    "A leading business hotel with top-notch amenities near the convention centre."));
                
                // 3 & 4 Star Hotels
                // ── Pre-populate Famous Hotels from Different States ──
                Hotel tajMumbai = hotelRepository.save(createHotel("The Taj Mahal Palace", "Colaba, Mumbai, Maharashtra", 
                    "Iconic sea-facing landmark hotel in Mumbai offering world-class luxury and heritage since 1903."));
                Hotel leelaDelhi = hotelRepository.save(createHotel("The Leela Palace", "Diplomatic Enclave, New Delhi", 
                    "Experience stunning architecture and majestic elegance in the heart of India's capital."));
                Hotel rambagh = hotelRepository.save(createHotel("Rambagh Palace", "Bhawani Singh Road, Jaipur, Rajasthan", 
                    "A former residence of the Maharaja of Jaipur, offering unparalleled royal heritage and luxury."));
                Hotel blanketMunnar = hotelRepository.save(createHotel("Blanket Hotel & Spa", "Pallivasal, Munnar, Kerala", 
                    "A premium luxury resort surrounded by lush green tea gardens and beautiful waterfalls."));
                Hotel itcChennai = hotelRepository.save(createHotel("ITC Grand Chola", "Guindy, Chennai, Tamil Nadu", 
                    "A luxury collection hotel that honors the grandeur of the Chola Dynasty with its magnificent architecture."));

                // ── Add Sample Rooms for Hyderabad Hotels ──
                addSampleRooms(roomRepository, taj, 35000, 55000);
                addSampleRooms(roomRepository, itc, 12000, 22000);
                addSampleRooms(roomRepository, hyatt, 15000, 28000);
                addSampleRooms(roomRepository, novotel, 10000, 18000);

                // ── Add Sample Rooms for New Hotels ──
                addSampleRooms(roomRepository, tajMumbai, 20000, 45000);
                addSampleRooms(roomRepository, leelaDelhi, 18000, 35000);
                addSampleRooms(roomRepository, rambagh, 40000, 80000);
                addSampleRooms(roomRepository, blanketMunnar, 8000, 15000);
                addSampleRooms(roomRepository, itcChennai, 12000, 25000);
            }
        };
    }

    private Hotel createHotel(String name, String location, String description) {
        Hotel h = new Hotel();
        h.setName(name);
        h.setLocation(location);
        h.setDescription(description);
        return h;
    }

    private void addSampleRooms(RoomRepository repo, Hotel hotel, double minPrice, double maxPrice) {
        Room r1 = new Room();
        r1.setRoomNumber("101");
        r1.setType("Deluxe");
        r1.setPricePerNight(BigDecimal.valueOf(minPrice));
        r1.setAvailable(true);
        r1.setHotel(hotel);

        Room r2 = new Room();
        r2.setRoomNumber("201");
        r2.setType("Executive Suite");
        r2.setPricePerNight(BigDecimal.valueOf(maxPrice));
        r2.setAvailable(true);
        r2.setHotel(hotel);

        repo.saveAll(Arrays.asList(r1, r2));
    }
}
