// src/main/java/cl/duoc/levelup/controller/AdminController.java
package cl.duoc.levelup.controller;

import cl.duoc.levelup.model.Usuario;
import cl.duoc.levelup.model.Compra;
import cl.duoc.levelup.service.UsuarioService;
import cl.duoc.levelup.service.CompraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private CompraService compraService;

    @GetMapping("/usuarios")
    public List<Usuario> listarUsuarios() {
        return usuarioService.findAll();
    }

    // 🆕 actualizar solo nombre y email
    @PutMapping("/usuarios/{id}/datos")
    public Usuario actualizarDatosBasicos(
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
    public Usuario actualizarRol(
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
    public Usuario actualizarPassword(
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
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminarUsuario(@PathVariable Long id) {
        Usuario u = usuarioService.findById(id);
        if (u == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado");
        }
        usuarioService.delete(id);
    }

    @GetMapping("/usuarios/{id}/compras")
    public List<Compra> comprasUsuario(@PathVariable Long id) {
        return compraService.obtenerComprasUsuario(id);
    }

    public static class DatosBasicosDTO {
        private String nombre;
        private String email;

        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = nombre; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }

    public static class RolDTO {
        private String rol;

        public String getRol() { return rol; }
        public void setRol(String rol) { this.rol = rol; }
    }

    public static class PasswordDTO {
        private String password;

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
