// src/main/java/cl/duoc/levelup/controller/UsuarioController.java
package cl.duoc.levelup.authservice.controller;


import cl.duoc.levelup.authservice.model.Usuario;
import cl.duoc.levelup.authservice.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Tag(name = "Usuarios", description = "Controlador para gestión de usuarios")
@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Operation(
            summary = "Obtener lista de todos los usuarios",
            description = "Devuelve la lista completa de usuarios registrados.")
    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioService.findAll();
    }

    @Operation(
            summary = "Obtener usuario por ID",
            description = "Devuelve los detalles de un usuario específico usando su ID.")
    @GetMapping("/{id}")
    public Usuario getUsuarioById(@Parameter(description = "ID del usuario", required = true)
            @PathVariable Long id) {
        return usuarioService.findById(id);
    }
    @Operation(
            summary = "Crear nuevo usuario",
            description = "Crea un nuevo usuario en el sistema.")
    @PostMapping
    public Usuario createUsuario(@RequestBody Usuario usuario) {


        if (usuario.getRol() == null || usuario.getRol().isEmpty()) {
            usuario.setRol("USUARIO");
        }

        return usuarioService.save(usuario);
    }
    @Operation(
            summary = "Actualizar usuario existente",
            description = "Actualiza los datos de un usuario existente.")
    @PutMapping("/{id}")
    public Usuario updateUsuario(
            @Parameter(description = "ID del usuario a actualizar", required = true)
            @PathVariable Long id,
            @Parameter(description = "Datos actualizados del usuario", required = true)
            @RequestBody Usuario datos) {
        Usuario existente = usuarioService.findById(id);
        if (existente == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado");
        }

        if (datos.getNombre() != null) existente.setNombre(datos.getNombre());
        if (datos.getEmail() != null) existente.setEmail(datos.getEmail());
        if (datos.getEdad() != null) existente.setEdad(datos.getEdad());
        if (datos.getDireccion() != null) existente.setDireccion(datos.getDireccion());
        if (datos.getPreferencias() != null) existente.setPreferencias(datos.getPreferencias());

        if (datos.getPassword() != null && !datos.getPassword().isEmpty()) {
            existente.setPassword(datos.getPassword());
        }
        if (datos.getRol() != null && !datos.getRol().isEmpty()) {
            // aquí recibimos "ADMIN" o "USUARIO" (sin ROLE_)
            existente.setRol(datos.getRol());
        }

        return usuarioService.save(existente);
    }
    @Operation(
            summary = "Eliminar usuario",
            description = "Elimina un usuario por su ID.")
    @DeleteMapping("/{id}")
    public void deleteUsuario(
            @Parameter(description = "ID del usuario a eliminar", required = true)
            @PathVariable Long id) {
        usuarioService.delete(id);
    }
    @Operation(
            summary = "Login simple",
            description = "Permite login con email y password, retornando usuario.")
    @PostMapping("/login")
    public Usuario login(@RequestBody Usuario usuario) {
        return usuarioService.login(usuario.getEmail(), usuario.getPassword());
    }
}
