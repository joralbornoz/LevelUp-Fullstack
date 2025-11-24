package cl.duoc.levelup.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "LevelUp Gamer API",
                version = "1.0.0",
                description = """
                        API REST del proyecto **LevelUp Gamer**.
                        Incluye módulos de autenticación (JWT), productos,
                        compras, gestión de usuarios y panel de administración.
                        """,
                contact = @Contact(
                        name = "Soporte LevelUp",
                        url = "https://github.com/joralbornoz"

                ),
                license = @License(
                        name = "Uso Académico DUOC UC",
                        url = "https://www.duoc.cl"
                )
        ),
        servers = {
                @Server(
                        description = "Servidor local",
                        url = "http://localhost:8080"
                )
        },
        security = {
                @SecurityRequirement(name = "bearerAuth")
        }
)
@SecurityScheme(
        name = "bearerAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT"
)
public class OpenApiConfig {

}
