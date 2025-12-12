package cl.duoc.levelup.authservice.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public class DatosBasicosDTO {

    @Schema(description = "Nombre del usuario", example = "Juan Pérez")
    private String nombre;

    @Schema(description = "Email del usuario", example = "juan.perez@example.com")
    private String email;

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
