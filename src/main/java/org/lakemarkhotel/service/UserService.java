package org.lakemarkhotel.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.lakemarkhotel.controller.AuthController;
import org.lakemarkhotel.exception.UserAlreadyExistException;
import org.lakemarkhotel.exception.UserNameNotFoundException;
import org.lakemarkhotel.model.Role;
import org.lakemarkhotel.model.User;
import org.lakemarkhotel.repository.RoleRepository;
import org.lakemarkhotel.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
@Service
@RequiredArgsConstructor

public class UserService implements IUserService{
   private final UserRepository userRepository;

   private final PasswordEncoder passwordEncoder;
   private final RoleRepository roleRepository;
    private static Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Override
    public User registerUser(User user) {

        if(userRepository.existsByEmail(user.getEmail())){
            throw new UserAlreadyExistException(user.getEmail() + "already exist");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        //user.setPassword(passwordEncoder.encode("123456789"));
        Role userRole = roleRepository.findByName("ROLE_ADMIN").orElse(null);;
        user.setRoles(Collections.singletonList(userRole));
        return userRepository.save(user);
    }

    @Override
    public List<User> getUsers() {

        return userRepository.findAll();
    }
    @Transactional
    @Override
    public void deleteUser(String email) {
        User theUser=getUser(email);
        if(theUser!=null){
            userRepository.deleteByEmail(email);

        }
    }

    @Override
    public User getUser(String email) {
        return userRepository.findByEmail(email).orElseThrow(()-> new UserNameNotFoundException("User not found!")) ;
    }
}
