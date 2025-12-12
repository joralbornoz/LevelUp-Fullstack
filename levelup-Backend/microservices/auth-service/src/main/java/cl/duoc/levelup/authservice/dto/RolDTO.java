package cl.duoc.levelup.authservice.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public class RolDTO {

    @Schema(description = "Rol del usuario", example = "ADMIN")
    private String rol;

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
}
