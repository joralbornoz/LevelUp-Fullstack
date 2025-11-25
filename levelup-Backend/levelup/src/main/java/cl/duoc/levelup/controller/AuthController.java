package cl.duoc.levelup.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import cl.duoc.levelup.model.Usuario;
import cl.duoc.levelup.repository.UsuarioRepository;
import cl.duoc.levelup.security.JwtUtil;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Tag(name = "Autenticación", description = "Controlador para autenticación y login")
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

    @Operation(
            summary = "Iniciar sesión y obtener un token JWT",
            description = "Permite a un usuario autenticarse usando email y password, devolviendo un token JWT.")
    @PostMapping("/login")
    public Map<String, Object> login(@Parameter(description = "Datos de inicio de sesión", required = true)
            @RequestBody Map<String, String> body) {
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
