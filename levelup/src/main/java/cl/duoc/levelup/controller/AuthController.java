package cl.duoc.levelup.controller;

import cl.duoc.levelup.model.Usuario;
import cl.duoc.levelup.repository.UsuarioRepository;
import cl.duoc.levelup.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");


        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );

        UserDetails principal = (UserDetails) auth.getPrincipal();


        Usuario usuario = usuarioRepository.findByEmail(email);


        String token = jwtUtil.generarToken(
                principal.getUsername(),
                usuario.getRol()
        );

        return Map.of(
                "token", token,
                "usuario", usuario
        );
    }
}
