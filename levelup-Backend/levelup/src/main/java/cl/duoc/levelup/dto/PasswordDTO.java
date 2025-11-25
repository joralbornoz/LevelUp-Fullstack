package cl.duoc.levelup.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public class PasswordDTO {

    @Schema(description = "Nueva contraseña del usuario", example = "Secreto123")
    private String password;

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
