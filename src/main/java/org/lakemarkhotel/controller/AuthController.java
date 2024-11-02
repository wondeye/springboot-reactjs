package org.lakemarkhotel.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.lakemarkhotel.exception.UserAlreadyExistException;
import org.lakemarkhotel.model.User;
import org.lakemarkhotel.request.LonginRequest;
import org.lakemarkhotel.response.JwtResponse;
import org.lakemarkhotel.security.jwt.JwtUtils;
import org.lakemarkhotel.security.user.HotelUserDetails;
import org.lakemarkhotel.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserService userService;

    private static Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/register-user")
    public ResponseEntity<?> registerUser(@RequestBody  User user) {

        try{

            userService.registerUser(user);
            return ResponseEntity.ok("Registration successful");
        }catch (UserAlreadyExistException e)
        {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
        //catch (Exception e){
          //  return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error registering user");
        //}

    }
@PostMapping("/login")
public ResponseEntity<?> authenticateUser(@Valid @RequestBody LonginRequest request) {

    Authentication authentication=authenticationManager
            .authenticate(new UsernamePasswordAuthenticationToken(
                    request.getEmail(), request.getPassword()));
    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt=jwtUtils.generateJwtTokenForUser(authentication);
    HotelUserDetails userDetails=(HotelUserDetails) authentication.getPrincipal();
    List<String> roles=userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
    return ResponseEntity.ok(new JwtResponse(
            userDetails.getId(),
            userDetails.getEmail(),
            jwt,
            roles));

}
}
