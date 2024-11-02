package org.lakemarkhotel.security.jwt;

//import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.lakemarkhotel.security.user.HotelUserDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Jwts;

import java.security.Key;
import java.util.Date;
import java.util.List;


import org.springframework.stereotype.Component;

import static io.jsonwebtoken.Jwts.builder;

// static io.jsonwebtoken.Jwts.*;


@Component
public class JwtUtils {

    public static Logger logger= LoggerFactory.getLogger(JwtUtils.class);

    @Value("${auth.token.jwtSecret}")
    private String jwtSecret;
    @Value("${auth.token.expirationTime}")
    private int jwtExpirationTime;

      //private String aa= System.getenv("AA");    this method gets secret jwt code from .env file created just like environmental variables

    public String generateJwtTokenForUser(Authentication authentication) {
        HotelUserDetails userPrincipal=(HotelUserDetails) authentication.getPrincipal();
        List<String> roles =userPrincipal.getAuthorities()
                .stream().map(GrantedAuthority::getAuthority ).toList();
        return builder()
                .setSubject(userPrincipal.getUsername())
                .claim("roles", roles)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime()+jwtExpirationTime))
                .signWith(key(), SignatureAlgorithm.HS256).compact();

    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
//        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }



    public String getUsernameForToken(String token){
        return Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token).getBody().getSubject();
    }




    public  boolean validateToken(String token) {
  try {
      Jwts.parserBuilder().setSigningKey(key()).build().parse(token);
      return true;
  }catch (MalformedJwtException e){
      logger.error("Invalid JWT token :{}", e.getMessage());
  }catch (ExpiredJwtException e){
      logger.error("Expired token :{}", e.getMessage());
  }catch (UnsupportedJwtException e){
      logger.error("This token is not supported :{}", e.getMessage());
  }catch (IllegalArgumentException e)
  {
      logger.error("JWT claims string is empty :{}", e.getMessage());
  }
return  false;
    }
}
