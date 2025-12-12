// src/main/java/cl/duoc/levelup/security/UserDetailsServiceImpl.java
package cl.duoc.levelup.authservice.security;

import cl.duoc.levelup.authservice.model.Usuario;
import cl.duoc.levelup.authservice.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario u = usuarioRepository.findByEmail(email);
        if (u == null) {
            throw new UsernameNotFoundException("Usuario no encontrado: " + email);
        }

        String rolSpring = "ROLE_" + u.getRol();

        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(rolSpring);

        return new User(
                u.getEmail(),
                u.getPassword(),
                List.of(authority)
        );
    }
}
