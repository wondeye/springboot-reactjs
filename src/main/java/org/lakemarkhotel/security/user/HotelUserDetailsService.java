package org.lakemarkhotel.security.user;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.lakemarkhotel.model.User;
import org.lakemarkhotel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class HotelUserDetailsService implements UserDetailsService {
   //private final static  String USER_NOT_FOUND_MESSAGE = "User with email %s not found";
    private final UserRepository userRepository;
   // HotelUserDetails hotelUserDetails;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
      User user = userRepository.findByEmail(email).
              orElseThrow(() -> new UsernameNotFoundException("User not found"));

         //orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MESSAGE, email)));
        return HotelUserDetails.buildUserDetails(user);
   /*     return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities(hotelUserDetails.getAuthorities())
                .build();
*/
    }
}
