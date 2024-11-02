package org.lakemarkhotel.security;

import lombok.RequiredArgsConstructor;
import org.lakemarkhotel.security.jwt.AuthTokenFilter;
import org.lakemarkhotel.security.jwt.JwtAuthEntryPoint;
import org.lakemarkhotel.security.user.HotelUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled = true, prePostEnabled = true, jsr250Enabled = true)
public class HotelSecurityConfig {
    private final   HotelUserDetailsService hotelUserDetailsService;
    private  final JwtAuthEntryPoint jwtAuthEntryPoint;
@Bean
public AuthTokenFilter authTokenFilter() {

        return new AuthTokenFilter();
    }
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(hotelUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfiguration) throws Exception {
        return authConfiguration.getAuthenticationManager();

    }

    @Bean
   public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
       http.cors(Customizer.withDefaults());
        http.csrf(AbstractHttpConfigurer ::disable)
                .exceptionHandling(
                        exception->exception.authenticationEntryPoint(jwtAuthEntryPoint))
                .sessionManagement(session-> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth->auth
                        .requestMatchers("/auth/**","/rooms/**","/bookings/**")
                        .permitAll().requestMatchers("/roles/**").hasRole("ADMIN")
                        .anyRequest().authenticated());
        http.headers(headers->headers.frameOptions(frameOptions->frameOptions.sameOrigin()));

        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(authTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();


    }
}
