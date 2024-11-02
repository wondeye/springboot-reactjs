package org.lakemarkhotel.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data

@NoArgsConstructor

public class JwtResponse {
    Long id;
    String email;
    String token;
    String type="Bearer";
    List<String>roles;

    public JwtResponse(Long id, String email,String token, List<String> roles) {
        this.id = id;
        this.token = token;
        this.roles = roles;
    }
}
