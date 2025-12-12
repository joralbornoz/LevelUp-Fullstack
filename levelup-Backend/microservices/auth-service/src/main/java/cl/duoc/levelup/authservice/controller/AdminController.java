package cl.duoc.levelup.authservice.controller;


import cl.duoc.levelup.authservice.dto.DatosBasicosDTO;
import cl.duoc.levelup.authservice.dto.PasswordDTO;
import cl.duoc.levelup.authservice.dto.RolDTO;
import cl.duoc.levelup.authservice.model.Usuario;
import cl.duoc.levelup.authservice.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
@Tag(name = "Administración de Usuarios", description = "Operaciones administrativas para gestión de usuarios")
public class AdminController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/usuarios")
    @Operation(
            summary = "Listar todos los usuarios",
            description = "Retorna una lista de todos los usuarios registrados en el sistema.",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Lista de usuarios obtenida exitosamente",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = Usuario.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "403",
                            description = "Acceso no autorizado",
                            content = @Content(mediaType = "application/json")
                    )
            }
    )
    public List<Usuario> listarUsuarios() {
        return usuarioService.findAll();
    }


    @PutMapping("/usuarios/{id}/datos")
    @Operation(summary = "Actualizar nombre y email del usuario",
            description = "Permite modificar el nombre y/o email de un usuario existente.")
    public Usuario actualizarDatosBasicos(
            @Parameter(description = "ID del usuario", required = true)
            @PathVariable Long id,
            @RequestBody DatosBasicosDTO dto
    ) {
        Usuario u = usuarioService.findById(id);
        if (u == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado");
        }

        if (dto.getNombre() != null && !dto.getNombre().isBlank()) {
            u.setNombre(dto.getNombre());
        }
        if (dto.getEmail() != null && !dto.getEmail().isBlank()) {
            u.setEmail(dto.getEmail());
        }

        return usuarioService.save(u);
    }

    @PutMapping("/usuarios/{id}/rol")
    @Operation(summary = "Actualizar rol del usuario",
            description = "Permite cambiar el rol de un usuario (ejemplo: USER, ADMIN).")
    public Usuario actualizarRol(
            @Parameter(description = "ID del usuario", required = true)
            @PathVariable Long id,
            @RequestBody RolDTO dto
    ) {
        Usuario u = usuarioService.findById(id);
        if (u == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado");
        }

        if (dto.getRol() == null || dto.getRol().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Rol inválido");
        }

        u.setRol(dto.getRol());
        return usuarioService.save(u);
    }

    @PutMapping("/usuarios/{id}/password")
    @Operation(summary = "Actualizar password del usuario",
            description = "Permite modificar la contraseña de un usuario, asegurando que cumpla con los requisitos mínimos.")
    public Usuario actualizarPassword(
            @Parameter(description = "ID del usuario", required = true)
            @PathVariable Long id,
            @RequestBody PasswordDTO dto
    ) {
        Usuario u = usuarioService.findById(id);
        if (u == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado");
        }

        if (dto.getPassword() == null || dto.getPassword().length() < 6) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password inválida");
        }

        u.setPassword(dto.getPassword());
        return usuarioService.save(u);
    }

    @DeleteMapping("/usuarios/{id}")
    @Operation(summary = "Eliminar usuario",
            description = "Elimina un usuario del sistema por su ID.")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminarUsuario(
            @Parameter(description = "ID del usuario", required = true)
            @PathVariable Long id) {

        Usuario u = usuarioService.findById(id);
        if (u == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado");
        }

        // 1️⃣ Borrar compras del usuario en catalog-service
        String urlCatalogo = "http://localhost:8082/api/compras/usuario/" + id;
        try {
            restTemplate.delete(urlCatalogo);
        } catch (Exception e) {
            System.out.println("⚠️ Error al borrar compras del catálogo: " + e.getMessage());
            // opcional: podrías lanzar error aquí si el profe quiere consistencia estricta
        }

        // 2️⃣ Borrar el usuario en auth-service
        usuarioService.delete(id);
    }

}
