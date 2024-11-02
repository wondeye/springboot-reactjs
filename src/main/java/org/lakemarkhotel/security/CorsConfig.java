package org.lakemarkhotel.security;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//import org.springframework.web.filter.CorsFilter;




import java.util.Arrays;

@Configuration
@EnableWebMvc
public class CorsConfig  implements WebMvcConfigurer {

    @Bean
    public WebMvcConfigurer corsConfigurer() {

        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {

                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("POST", "GET", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);



            }
        };

    }





     /*
private static final Long MAX_AGE = 3600L;
private static final int CORS_FILTER_ORDER = -102;

@Bean
    public CorsFilter corsFilter() {

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowCredentials(true);
    config.addAllowedOrigin("http://localhost:3000");
    config.setAllowedHeaders(Arrays.asList(
            HttpHeaders.AUTHORIZATION,
            HttpHeaders.CONTENT_TYPE,
            HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS,
            HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN,
            HttpHeaders.ACCEPT));

    config.setAllowedMethods(Arrays.asList(
            HttpMethod.GET.name(),
            HttpMethod.PUT.name(),
            HttpMethod.POST.name(),
            HttpMethod.DELETE.name()));
    config.setMaxAge(MAX_AGE);
    source.registerCorsConfiguration("/**", config);
    //FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
    //bean.setOrder(CORS_FILTER_ORDER);
    //return bean;
    return new CorsFilter(source);

}*/

}

