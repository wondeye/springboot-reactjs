package org.lakemarkhotel.controller;

import lombok.RequiredArgsConstructor;
import org.lakemarkhotel.exception.UserNameNotFoundException;
import org.lakemarkhotel.model.User;
import org.lakemarkhotel.service.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final IUserService userService;

    @GetMapping("/all-users")
    @PreAuthorize("hasRole('ROLE_ADMIN')")

    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.FOUND);

    }
    @GetMapping("/{email}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")

    public ResponseEntity<?> getUserByEmail(@PathVariable("email")
                                                   String email) {
        try {
            User theUser=userService.getUser(email);
            return ResponseEntity.ok(theUser);

        }catch (UserNameNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching user");
        }
    }
    @DeleteMapping("/delete/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER') and #email =principal.username" )

    public ResponseEntity<String> deleteUser(@PathVariable("userId") String email){
        try {
            userService.deleteUser(email);
            return ResponseEntity.ok("User deleted successfully");
        }catch(UserNameNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (Exception e){

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching user");
        }
    }

}
