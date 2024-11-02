package org.lakemarkhotel.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LonginRequest {
    @NotBlank
    private String email;
    @NotBlank
    private String password;
}
