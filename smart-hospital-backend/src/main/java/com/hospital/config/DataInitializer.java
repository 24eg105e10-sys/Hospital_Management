package com.hospital.config;

import com.hospital.entity.User;
import com.hospital.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        log.info("Checking and initializing default hospital users...");
        initUser("System Administrator", "admin@hospital.com", "AdminPassword123!", User.Role.ADMIN, "+15550001111");
        initUser("Dr. Sarah Connor", "dr.sarah@hospital.com", "AdminPassword123!", User.Role.DOCTOR, "+15550002222");
        initUser("Dr. Robert Bruce", "dr.robert@hospital.com", "AdminPassword123!", User.Role.DOCTOR, "+15550003333");
        initUser("Emily Watson (Reception)", "reception@hospital.com", "AdminPassword123!", User.Role.RECEPTIONIST, "+15550004444");
        log.info("Default users initialization completed successfully.");
    }

    private void initUser(String name, String email, String rawPassword, User.Role role, String phone) {
        Optional<User> existing = userRepository.findByEmail(email);
        if (existing.isPresent()) {
            User user = existing.get();
            // Re-encode and update password to guarantee working credentials
            user.setPassword(passwordEncoder.encode(rawPassword));
            user.setActive(true);
            userRepository.save(user);
            log.info("Refreshed password for user: {}", email);
        } else {
            User newUser = User.builder()
                    .name(name)
                    .email(email)
                    .password(passwordEncoder.encode(rawPassword))
                    .role(role)
                    .phone(phone)
                    .active(true)
                    .build();
            userRepository.save(newUser);
            log.info("Created default user: {}", email);
        }
    }
}
