// src/main/java/cl/duoc/levelup/service/UsuarioService.java
package cl.duoc.levelup.authservice.service;

import cl.duoc.levelup.authservice.model.Usuario;
import cl.duoc.levelup.authservice.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Usuario findById(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    public Usuario save(Usuario usuario) {

        if (usuario.getRol() == null || usuario.getRol().isEmpty()) {
            usuario.setRol("USUARIO");
        }
        return usuarioRepository.save(usuario);
    }

    public void delete(Long id) {
        usuarioRepository.deleteById(id);
    }

    public Usuario login(String email, String password) {
        Usuario u = usuarioRepository.findByEmail(email);
        if (u != null && u.getPassword().equals(password)) {
            return u;
        }
        return null;
    }

    public Usuario actualizarRol(Long id, String rol) {
        Usuario u = usuarioRepository.findById(id).orElseThrow();

        u.setRol(rol);
        return usuarioRepository.save(u);
    }

    public Usuario actualizarPassword(Long id, String password) {
        Usuario u = usuarioRepository.findById(id).orElseThrow();
        u.setPassword(password);
        return usuarioRepository.save(u);
    }

}
