// src/main/java/cl/duoc/levelup/controller/UsuarioController.java
package cl.duoc.levelup.controller;

import cl.duoc.levelup.model.Usuario;
import cl.duoc.levelup.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioService.findAll();
    }

    @GetMapping("/{id}")
    public Usuario getUsuarioById(@PathVariable Long id) {
        return usuarioService.findById(id);
    }

    @PostMapping
    public Usuario createUsuario(@RequestBody Usuario usuario) {

        // rol por defecto: USUARIO (sin prefijo)
        if (usuario.getRol() == null || usuario.getRol().isEmpty()) {
            usuario.setRol("USUARIO");
        }

        return usuarioService.save(usuario);
    }

    @PutMapping("/{id}")
    public Usuario updateUsuario(@PathVariable Long id, @RequestBody Usuario datos) {
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

    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable Long id) {
        usuarioService.delete(id);
    }

    // (si aún usas este login simple)
    @PostMapping("/login")
    public Usuario login(@RequestBody Usuario usuario) {
        return usuarioService.login(usuario.getEmail(), usuario.getPassword());
    }
}
