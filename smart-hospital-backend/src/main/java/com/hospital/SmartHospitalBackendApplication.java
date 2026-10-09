package com.hospital;

import com.hospital.entity.User;
import com.hospital.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class SmartHospitalBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartHospitalBackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner initDefaultAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			if (!userRepository.existsByEmail("admin@hospital.com")) {
				User admin = User.builder()
						.name("System Administrator")
						.email("admin@hospital.com")
						.password(passwordEncoder.encode("AdminPassword123!"))
						.role(User.Role.ADMIN)
						.phone("+15550001111")
						.active(true)
						.build();
				userRepository.save(admin);
				System.out.println("Default Admin User Initialized Successfully!");
			}
		};
	}
}
