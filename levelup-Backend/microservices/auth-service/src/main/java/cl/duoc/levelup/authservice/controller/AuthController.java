package cl.duoc.levelup.authservice.controller;

import cl.duoc.levelup.authservice.model.Usuario;
import cl.duoc.levelup.authservice.repository.UsuarioRepository;
import cl.duoc.levelup.authservice.security.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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
            description = "Permite a un usuario autenticarse usando email y password, devolviendo un token JWT.",
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Autenticación exitosa",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = Map.class)
                            )
                    ),
                    @ApiResponse(
                            responseCode = "403",
                            description = "Credenciales inválidas o acceso denegado",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(implementation = Map.class)
                            )
                    )
            }
    )
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
